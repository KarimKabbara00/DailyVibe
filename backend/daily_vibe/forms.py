from django import forms
from .models import DailyVibe

class SubmitVibeForm(forms.ModelForm):
    class Meta:
        model = DailyVibe
        fields = ['mood', 'journal']