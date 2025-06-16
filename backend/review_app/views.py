import hmac, hashlib, json
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import PullRequest
from .serializers import PullRequestSerializer
from .tasks import analyze_pr_task

class GitHubWebhookView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        signature = request.META.get('HTTP_X_HUB_SIGNATURE_256', '')
        body = request.body
        mac = hmac.new(settings.GITHUB_WEBHOOK_SECRET.encode(), body, hashlib.sha256)
        if not hmac.compare_digest(f"sha256={mac.hexdigest()}", signature):
            return Response(status=status.HTTP_403_FORBIDDEN)

        event = request.META.get('HTTP_X_GITHUB_EVENT')
        payload = json.loads(body)
        if event == 'pull_request' and payload['action'] in ('opened','synchronize'):
            pr = payload['pull_request']
            obj, created = PullRequest.objects.update_or_create(
                pr_id=pr['number'],
                repo_full_name=payload['repository']['full_name'],
                defaults={
                    'title': pr['title'],
                    'url': pr['html_url'],
                    'created_at': pr['created_at']
                }
            )
            analyze_pr_task.delay(obj.id, pr['diff_url'])
        return Response(status=status.HTTP_200_OK)

class PRListView(APIView):
    def get(self, request):
        prs = PullRequest.objects.all().order_by('-created_at')
        return Response(PullRequestSerializer(prs, many=True).data)

class PRDetailView(APIView):
    def get(self, request, pk):
        pr = PullRequest.objects.get(pk=pk)
        return Response(PullRequestSerializer(pr).data)
