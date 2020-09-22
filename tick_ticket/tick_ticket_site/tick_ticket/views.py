from rest_framework import viewsets
from .serializers import UserSerializer, CitySerializer, CarrierSerializer
from .models import User, City, Carrier

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class CityViweSet(viewsets.ModelViewSet):
    serializer_class = CitySerializer
    queryset = City.objects.all()

class CarrierViewSet(viewsets.ModelViewSet):
    serializer_class = CarrierSerializer
    queryset = Carrier.objects.all()

