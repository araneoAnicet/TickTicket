from django.urls import path, include
from . import views
from rest_framework import routers
from rest_framework.authtoken import views as rest_views


router = routers.DefaultRouter()
router.register(r'cities', views.CitiesViewSet, basename='city')
router.register(r'tickets', views.TicketsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('payments', views.PaymentsViewSet.as_view()),
    path('buy_tickets', views.buy_ticket),
    path('auth/registration', views.registration),
    path('auth', views.Auth.as_view()),
    path('check_token', views.check_token),
    path('search_tickets', views.search_tickets)
]
