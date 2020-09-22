from rest_framework import serializers
from .models import User, City, Carrier

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'name',
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
