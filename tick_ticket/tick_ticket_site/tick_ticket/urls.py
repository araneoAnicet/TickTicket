from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'cities', views.CitiesViewSet, basename='city')
router.register(r'search_tickets', views.SearchersViewSet, basename='search_ticket')
router.register(r'tickets', views.TicketsViewSet)

urlpatterns = [
    path('', include(router.urls))
]
