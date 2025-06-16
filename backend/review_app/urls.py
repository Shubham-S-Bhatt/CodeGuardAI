from django.urls import path
from .views import GitHubWebhookView, PRListView, PRDetailView

urlpatterns = [
    path('webhook/github/', GitHubWebhookView.as_view(), name='github-webhook'),
    path('prs/', PRListView.as_view(), name='pr-list'),
    path('prs/<int:pk>/', PRDetailView.as_view(), name='pr-detail'),
]