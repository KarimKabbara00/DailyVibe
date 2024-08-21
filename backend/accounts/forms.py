from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User

class RegisterForm(UserCreationForm):
    class Meta:
        model = User
        #password 2 is confirm password
        fields = ['username', 'password1', 'password2']

class SignInForm(AuthenticationForm):
    pass