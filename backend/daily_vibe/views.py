from rest_framework import viewsets
from .serializers import DailyVibeSerializer
from .models import DailyVibe

# Create your views here.

class DailyVibeView(viewsets.ModelViewSet):
    serializer_class = DailyVibeSerializer
    queryset = DailyVibe.objects.all()