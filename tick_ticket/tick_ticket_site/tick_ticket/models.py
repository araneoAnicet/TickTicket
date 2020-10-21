from django.db import models
from datetime import datetime
from django.contrib.auth.models import AbstractUser, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, username='', email=None, password=None, **extra_fields):
        if not email:
            raise ValueError('Email field must be provided!')
        if not password:
            raise ValueError('Password field must be provided!')
        
        user = self.model(username=username, email=email)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email=email, password=password)
        user.is_admin = True
        user.has_perm = True
        user.save(using=self._db)
        return user

    def get_by_natural_key(self, email):
        return self.get(email=email)

class User(AbstractUser):
    username = models.CharField(blank=True, max_length=180)
    email = models.EmailField(max_length=255, unique=True)
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [
        'password'
        ]

    objects = UserManager()

    def get_short_name(self):
        return self.email

    def get_full_name(self):
        return self.email

    def has_perms(self, perm, ob=None):
        return True

    def has_perm(self, obj=None):
        if self.is_admin:
            return True
        return False

    def has_module_perms(self, app_label):
        return True

    def natural_key(self):
        return self.email
    
    @property
    def is_staff(self):
        return self.is_admin

class CreditCard(models.Model):
    number = models.DecimalField(null=True, decimal_places=15, max_digits=16)
    name_on_card = models.CharField(null=True, max_length=60)
    expire_date = models.DateField(null=True)
    owner = models.ForeignKey(User, null=True, related_name='credit_card', on_delete=models.CASCADE)

class City(models.Model):
    name = models.CharField(blank=True, max_length=85)

class Carrier(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=360)
    icon = models.ImageField(upload_to='carrier_icons/')

class Ticket(models.Model):
    transport_name = models.CharField(default='any', blank=True, max_length=20)
    departure_time = models.TimeField()
    arrive_time = models.TimeField()
    departure_date = models.DateField(default=datetime.now)
    arrive_date = models.DateField(default=datetime.now)
    available_until = models.DateField(default=datetime.now)
    departure_city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='departure_tickets')
    arrive_city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='arrive_tickets')
    carrier = models.ForeignKey(Carrier, on_delete=models.CASCADE, related_name='tickets')
    price = models.FloatField(default=0)
    currency_name = models.CharField(max_length=3, default='USD')
    number_of_available = models.IntegerField(default=0)
    published_on = models.DateField(default=datetime.now)


class BoughtTicket(models.Model):
    ticket = models.ForeignKey(Ticket, null=True, on_delete=models.CASCADE, related_name='shopping_information')
    owner = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name='bought_ticket')
    bought_on_date = models.DateField(default=datetime.now)
    bought_on_time = models.TimeField(default=datetime.now)
