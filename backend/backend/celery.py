import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'code_review_platform.settings')
app = Celery('code_review_platform', broker='redis://redis:6379/0')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
