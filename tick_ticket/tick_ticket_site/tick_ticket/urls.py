from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'cities', views.CitiesViewSet, basename='city')
router.register(r'tickets', views.TicketsViewSet)


urlpatterns = router.urls
