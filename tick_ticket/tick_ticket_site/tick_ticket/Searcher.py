from django.db.models import Q
from .models import Ticket, City
from .serializers import CitySerializer, TicketSerializer


class SearcherMode:
    _model_class = Ticket
    _from_city = None
    _to_city = None
    _one_way_date = None
    _round_trip_date = None
    _transport_name = 'any'
    _query = Ticket.objects.all()

    def from_city(self, from_city):
        self._from_city = from_city
        return self

    def to_city(self, to_city):
        self._to_city = to_city
        return self

    def one_way_date(self, one_way_date):
        self._one_way_date = one_way_date
        return self

    def round_trip_date(self, round_trip_date):
        self._round_trip_date = round_trip_date
        return self

    def transport_name(self, transport_name):
        self._transport_name = transport_name
        return self

    def search(self):
        pass

class RoundTripModeSearch(SearcherMode):
    def search(self):
        subquery_1 = self._model_class.objects.none()
        subquery_2 = self._model_class.objects.none()
        subquery_3 = self._model_class.objects.none()
        subquery_4 = self._model_class.objects.none()
        dates_were_filtered = False
        cities_were_filtered = False
        
        if self._transport_name and self._transport_name != 'any':
            self._query = self._query.filter(transport_name=self._transport_name)

        if self._one_way_date:
            subquery_3 = self._query.filter(departure_date=self._one_way_date)
            dates_were_filtered = True
        
        if self._round_trip_date:
            subquery_4 = self._query.filter(departure_date=self._round_trip_date)
            dates_were_filtered = True

        if dates_were_filtered:
            self._query = subquery_3 | subquery_4

        if self._from_city:
            subquery_1 = self._query.filter(
                Q(
                    Q(departure_city=self._from_city) |
                    Q(arrive_city=self._from_city)
                )
            )
            cities_were_filtered = True
        if self._to_city:
            subquery_2 = self._query.filter(
                Q(
                    Q(departure_city=self._to_city) |
                    Q(arrive_city=self._to_city)
                )
            )
            cities_were_filtered = True

        if cities_were_filtered:
            self._query = subquery_1 | subquery_2

        return self._query
    
class OneWayTripModeSearcher(SearcherMode):
    def search(self):
        if self._transport_name and self._transport_name != 'any':
            self._query = self._query.filter(transport_name=self._transport_name)
        if self._one_way_date:
            self._query = self._query.filter(departure_date=self._one_way_date)
        if self._from_city:
            self._query = self._query.filter(departure_city=self._from_city)
        if self._to_city:
            self._query = self._query.filter(arrive_city=self._to_city)
        return self._query


class Searcher:
    @staticmethod
    def mode(mode):
        if mode:
            return RoundTripModeSearch()
        return OneWayTripModeSearcher()
