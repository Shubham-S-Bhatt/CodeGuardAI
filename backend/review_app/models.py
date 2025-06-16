from django.db import models

class PullRequest(models.Model):
    pr_id = models.IntegerField(unique=True)
    repo_full_name = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    url = models.URLField()
    created_at = models.DateTimeField()
    analysis = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.repo_full_name}#{self.pr_id}"
