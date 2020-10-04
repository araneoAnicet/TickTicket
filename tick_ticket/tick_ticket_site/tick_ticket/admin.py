from django.contrib import admin
from .models import City, Carrier, Ticket, User, BoughtTicket


admin.site.register(City)
admin.site.register(Carrier)
admin.site.register(Ticket)
admin.site.register(BoughtTicket)
admin.site.register(User)

