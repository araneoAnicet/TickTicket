from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, CitySerializer, CarrierSerializer, TicketSerializer
from .models import User, City, Carrier, Ticket
from django.db.models import Q


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
            if departure_city:
                query = query.filter(Q(departure_city=departure_city) | Q(departure_city=arrive_city))
            if arrive_city:
                query = query.filter(Q(arrive_city=arrive_city) | Q(arrive_city=departure_city))
            if trip_date:
                query = query.filter(depature_date=trip_date)
            elif round_trip_date:
                query = query.filter(depature_date=round_trip_date)
            elif trip_date and round_trip_date:
                query = query.filter(Q(depature_date=trip_date) | Q(depature_date=round_trip_date))
        else:
            if departure_city:
                query = query.filter(departure_city=departure_city)
            if arrive_city:
                query = query.filter(arrive_city=arrive_city)
            if trip_date:
                query = query.filter(departure_date=departure_date)
            
        serializer = TicketSerializer(query, many=True)
        return Response(serializer.data)

class CitiesViewSet(viewsets.ViewSet):
    def list(self, request):
        query = City.objects.all()
        serializer = CitySerializer(query, many=True)
        return Response(serializer.data)

