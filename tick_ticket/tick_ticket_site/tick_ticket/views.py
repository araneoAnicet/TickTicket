from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, CitySerializer, CarrierSerializer, TicketSerializer
from .models import User, City, Carrier, Ticket
from django.db.models import Q
import jwt
from .config import SECRET_KEY

class TicketsViewSet(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()

class SearchersViewSet(viewsets.ViewSet):
    def list(self, request):
        query = Ticket.objects.all()
        departure_city = request.data.get('departureCity')
        arrive_city = request.data.get('arriveCity')
        trip_date = request.data.get('tripDate')
        is_round_trip = request.data.get('isRoundTrip')
        round_trip_date = request.data.get('roundTripDate')

        if is_round_trip:
            query = query.filter(
                Q(
                    Q(departure_city=departure_city &
                        Q(arrive_city=arrive_city) &
                        Q(departure_date=trip_date)) |
                    Q(departure_city=arrive_city &
                        Q(arrive_city=departure_city) &
                        Q(departure_date=round_trip_date))
                )
            )
        else:
            query = query.filter(
                Q(
                    departure_city=departure_city &
                    Q(arrive_city=arrive_city) &
                    Q(departure_date=trip_date)
                )
            )
            
        serializer = TicketSerializer(query, many=True)
        return Response(serializer.data)

class CitiesViewSet(viewsets.ViewSet):
    def list(self, request):
        query = City.objects.all()
        serializer = CitySerializer(query, many=True)
        return Response(serializer.data)

@api_view(['POST'])
def user_sign_up(request):
    name = request.data.get('name')
    email = request.data.get('email')
    password = request.data.get('password')
    if name and email and password:
        searched_user = User.objects.filter(email=email).first()
        if searched_user:
            return Response({
                'message': 'User with this e-mail already exists.',
                'token': None
            })
        new_user = User(name=name, email=email, password=password)
        new_user.save()
        encoded_jwt = jwt.encode(
            {
                'email': email,
                'isUser': True
            },
            SECRET_KEY,
            algorithm='HS256'
        )
        return Response({
            'message': 'OK',
            'token': encoded_jwt
        })
    return Response(
        {
            'message': 'Some of these fields are not provided: name, email, password.',
            'token': None
        }
    )

@api_view(['POST'])
def user_sing_in(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if email and password:
        searched_user = User.objects.filter(email=email).first()
        if searched_user:
            encoded_jwt = jwt.encode({
                'email': email,
                'isUser': True
            },
            SECRET_KEY,
            algorithm='HS256'
            )
            return Response({
                'message': 'OK',
                'token': encoded_jwt
            })
        return Response({
            'message': 'Wrong e-mail or password',
            'token': None
        })
    return Response({
        'message': 'Some of these fields are missing: email, password',
        'token': None
    })
