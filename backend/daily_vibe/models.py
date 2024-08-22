from django.db import models

# Create your models here.

class DailyVibe(models.Model):
    mood = models.CharField(max_length=20)
    journal = models.TextField(blank=True, null=True)
    date = models.DateField(auto_now_add=True)