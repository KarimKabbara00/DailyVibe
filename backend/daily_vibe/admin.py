from django.contrib import admin
from .models import DailyVibe

class DailyVibeAdmin(admin.ModelAdmin):
    list_display = ('mood', 'date')

# Register your models here.

admin.site.register(DailyVibe, DailyVibeAdmin)