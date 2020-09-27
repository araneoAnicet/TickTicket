from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, CitySerializer, CarrierSerializer, TicketSerializer
from .models import User, City, Carrier, Ticket, BoughtTicket
from django.db.models import Q
import jwt
import bcrypt
from .config import SECRET_KEY
import datetime
from functools import wraps

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

def requires_auth(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return Response({
                'message': 'Token is not provided'
            })
        try:
            decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            return func(*args, **kwargs)
        except:
            return Response({
                'message': 'token validation error'
            })
    return wrapper


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
        new_user = User(name=name, email=email, password=bcrypt.hashpw(password, bcrypt.gensalt()))
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
        if searched_user and bcrypt.checkpw(password, searched_user.password):
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

@requires_auth
@api_view(['POST'])
def buy_ticket(request):
    owner_email = jwt.decode(request.headers.get('Authorization'), SECRET_KEY, algorithms=['HS256'])
    owner = User.filter(email=owner_email).first()
    tickets = request.data.get('tickets')
    for ticket in tickets:
        temp_ticket = Ticket.objects.get(id=ticket.id)
        if not temp_ticket:
            return Response({
                'message': f'Some tickets from cart are missing: {ticket.id}'
            })
        new_bought_ticket = BoughtTicket(
            departure_time=temp_ticket.departure_time,
            arrive_time=temp_ticket.arrive_time,
            departure_city=temp_ticket.departure_city,
            arrive_city=temp_ticket.arrive_city,
            departure_date=temp_ticket.departure_date,
            arrive_date=temp_ticket.arrive_date,
            available_until=temp_ticket.available_until,
            carrier=temp_ticket.carrier,
            price=temp_ticket.price,
            currency_name=temp_ticket.currency_name,
            published_on=temp_ticket.published_on,
            number_of_available=temp_ticket.number_of_available,
            bought_on=datetime.datetime.now,
            owner=owner
        )
        temp_ticket.number_of_available =- 1
        temp_ticket.save()
        new_bought_ticket.save()
    return Response({
        'message': 'OK',
        'tickets': tickets
    })
