from rest_framework import serializers
from .models import DailyVibe

class DailyVibeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyVibe
        fields = ('id', 'mood', 'journal', 'date')

    def validate(self, data):
        if not data['mood']:
            raise serializers.ValidationError("No mood entered.")
        elif not data['date']:
            raise serializers.ValidationError("No date entered.")
        return data