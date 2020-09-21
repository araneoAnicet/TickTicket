from django.db import models

class City(models.Model):
    name = models.CharField(max_length=85)

class Carrier(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=360)
    icon = models.ImageField(upload_to='carrier_icons/')

class Ticket(models.Model):
    departure_time = models.TimeField()
    arrive_time = models.TimeField()
    departure_date = models.DateField()
    arrive_date = models.DateField()
    departure_city = models.ForeignKey('City', on_delete=models.CASCADE, related_name='departure_tickets')
    arrive_city = models.ForeignKey('City', on_delete=models.CASCADE, related_name='arrive_tickets')
    carrier = models.ForeignKey('Carrier', on_delete=models.CASCADE, related_name='tickets')
    price = models.FloatField(default=0)
    currency_name = models.CharField(max_length=3, default='USD')
    number_of_available = models.DecimalField(default=1, decimal_places=3, max_digits=5)
    published_on = models.DateField(auto_now=True)
