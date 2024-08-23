from django.db import models
from django.contrib.auth.models import User

class DailyVibe(models.Model):
    mood = models.CharField(max_length=20)
    journal = models.TextField(blank=True, null=True)
    date = models.DateField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)