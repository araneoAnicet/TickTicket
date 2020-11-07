from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated
from .models import User, City, Carrier, Ticket, BoughtTicket
from .Searcher import Searcher
from django.http import HttpResponse
from django.db.models import Q
from django.contrib.auth import authenticate
import datetime
import stripe
from .config import STRIPE_SECRET_KEY, STRIPE_PUBLIC_KEY, DOMAIN_URL
from .serializers import (
    UserSerializer,
    CitySerializer,
    CarrierSerializer,
    TicketSerializer,
    RegisterSerializer,
    LoginSerializer,
    BoughtTicketSerializer,
    SearchersSerializer,
    CarrierSerializer,
    PaymentSerializer
    )

@api_view(['GET'])
def image(request, carrier_name):
    
    carrier = Carrier.objects.filter(name=carrier_name).first()
    if not carrier:
        return Response({
            'message': 'Carrier was not found',
            'payload': {
                'request': {
                    'path': request.path,
                    'body': request.data,
                    'method': request.method
                }
            }
        })

    with open(f'./{carrier.icon}', 'rb') as image_file:
        return HttpResponse(image_file.read(), content_type='image/png')

class PaymentsViewSet(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):  # get_publishable_key
        return Response({
        'message': 'OK',
        'publishable_key': STRIPE_PUBLIC_KEY,
        'payload': {
            'request': {
                'body': request.data,
                'path': request.path,
                'method': request.method
            }
        }
    })

    def post(self, request):  # create checkout session
        serializer = PaymentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        domain_url = DOMAIN_URL
        stripe.api_key = STRIPE_SECRET_KEY
        try:
            customer = stripe.Customer.create(
                email=request.user.email,
                name=request.user.username,
                source=serializer.validated_data.get('stripe_token')
            )
            total_price = 0
            for ticket_id in serializer.validated_data.get('ticket_ids'):
                ticket = Ticket.objects.get(id=ticket_id)
                total_price += ticket.price
                BoughtTicket.objects.create(
                    ticket=ticket,
                    owner=request.user,
                    bought_on_date=datetime.datetime.now(),
                    bought_on_time=datetime.datetime.now()
                )
                ticket.number_of_available -= 1
                ticket.save()

            charge = stripe.Charge.create(
                customer=customer,
                amount=round(total_price * 100),
                currency='usd',
                description='purchace: tickets on tickticket.com'
            )
            return Response({
                'message': 'OK',
                'purchased_items': None,
                'payload': {
                    'request': {
                        'body': request.data,
                        'path': request.path,
                        'method': request.method
                    }
                }
            })
        except Exception as exception:
            return Response({
                'message': 'Error occured',
                'error': str(exception),
                'payload': {
                    'request': {
                        'body': request.data,
                        'path': request.path,
                        'method': request.method
                    }
                }
            })

@api_view(['POST'])
def search_tickets(request):
    searchers_serializer = SearchersSerializer(data=request.data, many=True)
    searchers_serializer.is_valid(raise_exception=True)
    query = Ticket.objects.none()
    for searcher in searchers_serializer.validated_data:
        departure_city = City.objects.filter(name=searcher.get('from_city').get('name')).first()
        arrive_city = City.objects.filter(name=searcher.get('to_city').get('name')).first()
        transport_name = searcher.get('transport_name')
        trip_date = searcher.get('one_way_date')
        is_round_trip = searcher.get('mode')
        round_trip_date = searcher.get('round_trip_date')

        query = query | Searcher.mode(is_round_trip).from_city(
            departure_city
            ).to_city(
                arrive_city
                ).one_way_date(
                    trip_date
                    ).round_trip_date(
                        round_trip_date
                        ).transport_name(
                            transport_name
                        ).search()

    serializer = TicketSerializer(query, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_cities(request):
    cities = City.objects.all()
    serializer = CitySerializer(cities, many=True)
    return Response(serializer.data)

class Auth(ObtainAuthToken):

    serializer_class = LoginSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data,
            context={
                'request': request
            }
        )
        serializer.is_valid(raise_exception=True)
        user = authenticate(
            email=serializer.validated_data['email'],
            password=serializer.validated_data['password']
            )
        if not user:
            return Response({
                'message': 'Wrong e-mail or password',
                'payload': {
                    'request': {
                        'body': request.data,
                        'path': request.path,
                        'method': request.method
                    }
                }
            })
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'message': f'Hello, {user.username}',
            'token': token.key,
            'payload': {
                'request': {
                    'body': request.data,
                    'path': request.path,
                    'method': request.method
                }
            }
        })

@api_view(['POST'])
def registration(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token = Token.objects.create(user=user)
        return Response({
            'message': 'A new user has been created!',
            'token': token.key,
            'payload': {
                'reuqest': {
                    'body': request.data,
                    'path': request.path,
                    'method': request.method
                }
            }
        })
    return Response({
        'message': serializer.error_messages,
        'errors': serializer.errors,
        'payload': {
            'request': {
                'body': request.data,
                'path': request.path,
                'method': request.method
            }
        }
    })

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def check_token(request):
    return Response({
        'message': 'OK',
        'email': request.user.email,
        'payload': {
            'request': {
                'path': request.path,
                'body': request.data,
                'method': request.method
            }
        }
    })

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_bought_tickets(request):
    tickets = request.user.bought_ticket
    serializer = BoughtTicketSerializer(tickets, many=True)
    return Response({
        'message': 'OK',
        'bought_tickets': serializer.data,
        'payload': {
            'request': {
                'path': request.path,
                'body': request.data,
                'method': request.method
            }
        }
    })
