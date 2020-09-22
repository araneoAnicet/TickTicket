from rest_framework import viewsets
from .serializers import UserSerializer, CitySerializer
from .models import User, City

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class CityViweSet(viewsets.ModelViewSet):
    serializer_class = CitySerializer
    queryset = City.objects.all()
