from django.urls import path, include
from . import views
#from rest_framework import routers


urlpatterns = [
    path('tickets/', views.TicketsAPI.as_view()),
    path('cities/', views.CitiesAPI.as_view())
]
