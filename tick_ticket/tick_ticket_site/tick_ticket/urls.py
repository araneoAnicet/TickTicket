from django.urls import path, include
from . import views
from rest_framework import routers
from rest_framework.authtoken import views as rest_views

router = routers.DefaultRouter()
router.register(r'cities', views.CitiesViewSet, basename='city')
router.register(r'search_tickets', views.SearchersViewSet, basename='search_ticket')
router.register(r'tickets', views.TicketsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('sign_up', views.user_sign_up),
    path('sign_in', rest_views.obtain_auth_token),
#    path('buy_tickets', views.buy_ticket)
]
