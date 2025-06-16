from celery import shared_task
from .models import PullRequest
from .utils.analysis import analyze_diff

@shared_task
def analyze_pr_task(pr_obj_id, diff_url):
    pr = PullRequest.objects.get(id=pr_obj_id)
    # fetch diff
    import requests
    diff_text = requests.get(diff_url).text
    suggestion = analyze_diff(diff_text)
    pr.analysis = suggestion
    pr.save()
