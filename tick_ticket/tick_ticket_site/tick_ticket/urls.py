from django.urls import path, include
from . import views
from rest_framework import routers
from rest_framework.authtoken import views as rest_views


urlpatterns = [
    path('payments', views.PaymentsViewSet.as_view()),
    path('buy_tickets', views.buy_ticket),
    path('auth/registration', views.registration),
    path('auth', views.Auth.as_view()),
    path('check_token', views.check_token),
    path('search_tickets', views.search_tickets),
    path('image/<str:carrier_name>/', views.image),
    path('history', views.get_bought_tickets),
    path('list_cities', views.get_cities),
]
