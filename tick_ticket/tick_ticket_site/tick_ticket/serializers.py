from rest_framework import serializers
from .models import User, City, Carrier, Ticket

class RegisterSerializer(serializers.ModelSerializer):
    repeat_password = serializers.CharField(max_length=360)
    
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'repeat_password'
        ]
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }
    
    def save(self):
        user = User(
            username=self.validated_data['username'],
            email=self.validated_data['email']
        )

        password = self.validated_data['password']
        repeat_password = self.validated_data['repeat_password']
        if password != repeat_password:
            raise serializers.ValidationError({
            'message': 'These fields must be equal: password, repeat_password'
        })
        user.set_password(self.validated_data['password'])
        user.save()
        return user

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
