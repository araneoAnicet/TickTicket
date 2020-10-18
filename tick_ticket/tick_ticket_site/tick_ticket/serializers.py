from rest_framework import serializers
from .models import User, City, Carrier, Ticket, BoughtTicket

class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False, max_length=360)
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

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=360)
    password = serializers.CharField(max_length=360)

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

    carrier = CarrierSerializer(read_only=True)
    arrive_city = CitySerializer()
    departure_city = CitySerializer()
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

class BoughtTicketSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    ticket = TicketSerializer(read_only=True)
    class Meta:
        model = BoughtTicket
        fields = '__all__'

class SearchersSerializer(serializers.Serializer):
    mode = serializers.BooleanField()
    from_city = serializers.CharField(max_length=85)
    to_city = serializers.CharField(max_length=85)
    one_way_date = serializers.DateField()
    round_trip_date = serializers.DateField()
    transport_name = serializers.CharField(max_length=20)
