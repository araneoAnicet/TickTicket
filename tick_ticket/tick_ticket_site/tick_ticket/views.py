from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, CitySerializer, CarrierSerializer, TicketSerializer
from .models import User, City, Carrier, Ticket, BoughtTicket
from django.db.models import Q
import datetime


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
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def buy_ticket(request):
    user = request.user
    tickets = request.data.get('tickets')
    if not tickets:
        return Response({
            'message': 'tickets field is missing.',
            'payload': {
                'request': {
                    'body': request.data,
                    'path': request.path,
                    'method': request.method
                }
            }
        })
    
    for ticket in tickets:
        searched_ticket = Ticket.objects.filter(id=ticket.id).first()
        if not searched_ticket or searched_ticket.number_of_available == 0:
            return Response({
                'message': 'Some tickets are missing.',
                'payload': {
                    'request': {
                        'body': request.data,
                        'path': request.path,
                        'method': request.method
                    }
                }
            })
        new_bought_ticket = BoughtTicket(
            departure_time = searched_ticket.departure_time,
            arrive_time = searched_ticket.arrive_time,
            departure_date = searched_ticket.departure_date,
            arrive_date = searched_ticket.arrive_date,
            available_until = searched_ticket.available_until,
            departure_city = searched_ticket.departure_city,
            arrive_city = searched_ticket.arrive_city,
            carrier = searched_ticket.carrier,
            price = searched_ticket.price,
            currency_name = searched_ticket.currency_name,
            number_of_available = searched_ticket.number_of_available,
            published_on = searched_ticket.published_on,
            owner = user,
            bought_on = datetime.datetime.now
        )
        searched_ticket.number_of_available -= 1
        searched_ticket.save()
        new_bought_ticket.save()
    return Response({
        'message': 'OK',
        'payload': {
            'request': {
                'body': request.data,
                'path': request.path,
                'method': request.method
            }
        }
    })
