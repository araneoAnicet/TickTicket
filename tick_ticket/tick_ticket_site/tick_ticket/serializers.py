from rest_framework import serializers
from .models import User, City, Carrier, Ticket

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'email'
        ]

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = [
            'name'
        ]

class CarrierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrier
        fields = [
            'name',
            'description'
        ]

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = [
            'id',
            'departure_time',
            'arrive_time',
            'departure_date',
            'arrive_date',
            'available_until',
            'departure_city',
            'arrive_city',
            'carrier',
            'price',
            'currency_name',
            'number_of_available',
            'published_on'
        ]
