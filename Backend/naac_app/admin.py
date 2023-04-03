from django.contrib import admin
from .models import Criteria, User, Evidence, KeyIdentifiers, Location, Metrics, Year

# Register your models here.

admin.site.register(Criteria)
admin.site.register(User)
admin.site.register(Evidence)
admin.site.register(KeyIdentifiers)
admin.site.register(Location)
admin.site.register(Metrics)
admin.site.register(Year)
