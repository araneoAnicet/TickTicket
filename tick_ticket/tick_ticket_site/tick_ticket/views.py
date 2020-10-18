from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated
from .models import User, City, Carrier, Ticket, BoughtTicket
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
    SearchersSerializer
    )


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
        serializer = TicketSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        domain_url = DOMAIN_URL
        stripe.api_key = STRIPE_SECRET_KEY
        try:
            checkout_session = stripe.checkout.Session.create(
                success_url=domain_url + 'success?session_id={CHECKOUT_SESSION_ID}',
                cancel_url=domain_url + 'cancelled',
                payment_method_types=['card'],
                mode='payment',
                line_items=serializer.data
            )
            return Response({
                'message': 'OK',
                'purchased_items': serializer.data,
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

class TicketsViewSet(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()

@api_view(['POST'])
def search_tickets(request):
    query = Ticket.objects.all()
    searchers_serializer = SearchersSerializer(data=request.data, many=True)
    searchers_serializer.is_valid(raise_exception=True)
    departure_city = searchers_serializer.data['city_from']
    arrive_city = searchers_serializer.data['city_to']
    trip_date = searchers_serializer.data['one_way_date']
    is_round_trip = searchers_serializer.data['mode']
    round_trip_date = searchers_serializer.data['round_trip_date']

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


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def buy_ticket(request):
    user = request.user
    received_tickets_serializer = TicketSerializer(data=request.data, many=True)
    received_tickets_serializer.is_valid(raise_exception=True)
    ticket_ids = [
        ticket['id'] for ticket in request.data
    ]
    tickets = Ticket.objects.all().filter(pk__in=ticket_ids)
    #serializer = BoughtTicketSerializer(tickets, many=True)
    bought_tickets = []
    for ticket in tickets:
        ticket.number_of_available -= 1
        ticket.save()
        bought_ticket = BoughtTicket(ticket=ticket, owner=user)
        bought_ticket.save()
        bought_tickets.append(bought_ticket)
    serializer = BoughtTicketSerializer(bought_tickets, many=True)
    return Response({
        'message': 'OK',
        'tickets': serializer.data,
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
