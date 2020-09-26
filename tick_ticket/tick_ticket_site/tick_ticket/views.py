from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, CitySerializer, CarrierSerializer, TicketSerializer
from .models import User, City, Carrier, Ticket


class TicketsViewSet(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()

class SearchersViewSet(viewsets.ViewSet):
    def list(self, request):
        query = Ticket.objects.all()
        departur_city = request.data.get('departureCity')
        arrive_city = request.data.get('arriveCity')
        departure_date = request.data.get('departureDate')
        arrive_date = request.data.get('arriveDate')
        is_round_trip = request.data.get('isRoundTrip')

        if departur_city:
            query = query.filter(departur_city=departur_city)
        if arrive_city:
            query = query.filter(arrive_city=arrive_city)
        if departure_date:
            query = query.filter(departur_date=departur_date)
        if arrive_date:
            query = query.fitler(arrive_date=arrive_date)
        
        serializer = TicketSerializer(query, many=True)
        return Response(serializer.data)

class CitiesViewSet(viewsets.ViewSet):
    def list(self, request):
        query = City.objects.all()
        serializer = CitySerializer(query, many=True)
        return Response(serializer.data)

