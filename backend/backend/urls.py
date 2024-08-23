from django.urls import path, re_path
from django.views.generic import TemplateView
from daily_vibe import views as daily_vibe_views
from accounts import views as account_views
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('api/signup/', account_views.register, name="signup"),
    path('api/signin/', TokenObtainPairView.as_view(), name="get_token"),
    path('api/data/get_all_vibes/', daily_vibe_views.get_all_vibes, name="all_vibes"),
    path('api/data/submit_vibe/', daily_vibe_views.submit_vibe, name="submit_vibes"),
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]