from django.urls import path, include
from . import views
from rest_framework import routers
from rest_framework.authtoken import views as rest_views
#from django.views.decorators.csrf import csrf_exempt

router = routers.DefaultRouter()
router.register(r'cities', views.CitiesViewSet, basename='city')
router.register(r'search_tickets', views.SearchersViewSet, basename='search_ticket')
router.register(r'tickets', views.TicketsViewSet)

payments_router = routers.DefaultRouter()
payments_router.register(r'get_publishable_key', views.get_stripe_publishable_key)
payments_router.register(r'create_checkout_session', views.create_checkout_session)

urlpatterns = [
    path('', include(router.urls)),
    path('payments', include(payments_router.urls)),
    path('buy_tickets', views.buy_ticket),
    path('auth/registration', views.registration),
    path('auth', views.Auth.as_view())
]
