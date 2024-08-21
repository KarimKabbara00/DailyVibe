from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from daily_vibe import views as daily_vibe_views
from accounts import views as account_views
from rest_framework_simplejwt.views import TokenObtainPairView

router = routers.DefaultRouter()
router.register(r'myVibe', daily_vibe_views.DailyVibeView, 'my_vibe')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/signup/', account_views.register, name="signup"),
    path('api/signin/', TokenObtainPairView.as_view(), name="get_token"),
]