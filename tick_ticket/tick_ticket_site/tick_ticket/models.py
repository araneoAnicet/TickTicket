from django.db import models

class City(models.Model):
    name = models.CharField(max_length=85)

class Carrier(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=360)
    icon = models.ImageField(upload_to='carrier_icons/')