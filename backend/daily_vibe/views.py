from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import DailyVibeSerializer
from .models import DailyVibe

# Create your views here.

class DailyVibeView(viewsets.ModelViewSet):
    serializer_class = DailyVibeSerializer
    queryset = DailyVibe.objects.all()


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_vibes(request):
    user_id = request.user.id

    if not user_id:
        return JsonResponse({
            'status': 'error',
            'message': 'User not found'
            }, status=400) 


    all_user_vibes = DailyVibe.objects.filter(id=user_id)

    data = []
    for vibe in all_user_vibes:
        data.append({
            "mood": vibe.mood,
            "journal": vibe.journal,
            "date": vibe.date
        })
    
    return JsonResponse({
            'status': 'success',
            "data": data,
            }, status=200)  
