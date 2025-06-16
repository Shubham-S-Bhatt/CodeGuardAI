from django.contrib import admin
from django.urls import path, include
from review_app.views import github_webhook

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/webhook/', github_webhook),
    path('api/reviews/', include('review_app.urls')),
]