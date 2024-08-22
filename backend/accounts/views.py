from django.http import JsonResponse
from django.contrib.auth import authenticate, login as auth_login, logout
from .forms import RegisterForm, SignInForm
from rest_framework.decorators import api_view

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.data) # pass entered data

        if form.is_valid():
            user = form.save()      # save to db
            return JsonResponse({
                'status': 'success',
                'username': user.username,
            }, status=200)
        else:
            return JsonResponse({
                'status': 'error',
                'error': form.errors,
            }, status=400)

@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        form = SignInForm(data=request.data)

        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            
            user = authenticate(username=username, password=password)

            # exit if bad creds
            if user is None:
                return JsonResponse({
                    'status': 'error',
                    'error': "Invalid Credentials",
                }, status=400)  

            auth_login(request, user)
            return JsonResponse({
                'status': 'success',
                'username': user.username,
            }, status=200)

        else:
            return JsonResponse({
                'status': 'error',
                'error': form.errors,
            }, status=400)  