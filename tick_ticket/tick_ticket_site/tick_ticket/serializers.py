from rest_framework import serializers
from .models import User, City

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
