from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, CitySerializer, CarrierSerializer, TicketSerializer
from .models import User, City, Carrier, Ticket


class TicketsAPI(APIView):
    def post(self, request):
        query = Ticket.objects.all()
        arrive_city = request.data.get('arriveCity')
        departure_city = request.data.get('departureCity')
        arrive_date = request.data.get('arriveDate')
        departure_date = request.data.get('departureDate')
        
        if arrive_city:
            query = query.filter(arrive_city=arrive_city)
        if departure_city:
            query = query.filter(departure_city=departure_city)
        if arrive_date:
            query = query.filter(arrive_date=arrive_date)
        if departure_date:
            query = query.filter(departure_date=departure_date)

        serializer = TicketSerializer(query, many=True)
        return Response(serializer.data)

class CitiesAPI(APIView):
    def post(self, request):
        query = City.objects.all()
        if request.data.get('name'):
            query = query.filter(name=request.data['name'])
        serializer = CitySerializer(query, many=True)
        return Response(serializer.data)
