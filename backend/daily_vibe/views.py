from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets
from .forms import SubmitVibeForm
from .models import DailyVibe

def format_date(date):
    date_split = str(date).split("-")
    return f"{date_split[1]}-{date_split[2]}-{date_split[0][2:]}"

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_vibe(request):

    form = SubmitVibeForm(data=request.data)

    if form.is_valid():
        daily_vibe = form.save(commit=False)
        daily_vibe.user_id = request.user.id
        daily_vibe.save()
        return JsonResponse({
            'status': 'success',
            'message': 'Success'
            }, status=200)
    else:
        return JsonResponse({
            'status': 'error',
            'message': form.errors
            }, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_vibes(request):
    user_id = request.user.id
    username = request.user.username

    print("here!")
    if not user_id or not username:
        return JsonResponse({
            'status': 'error',
            'message': 'User not found'
            }, status=400) 


    all_user_vibes = DailyVibe.objects.filter(user_id=user_id)

    all_vibes = []
    for vibe in all_user_vibes:
        all_vibes.append({
            "mood": vibe.mood,
            "journal": vibe.journal,
            "date": format_date(vibe.date)
        })
    
    return JsonResponse({
        'status': 'success',
        "all_vibes": all_vibes,
        "username": username,
        }, status=200)  
