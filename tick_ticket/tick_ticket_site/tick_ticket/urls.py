from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('users', views.UserViewSet)
router.register('cities', views.CityViweSet)
router.register('carriers', views.CarrierViewSet)
router.register('tickets', views.TicketViewSet)

urlpatterns = [
    path('', include(router.urls))
]
