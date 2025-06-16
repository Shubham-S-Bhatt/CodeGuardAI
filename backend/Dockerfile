FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
ENV PYTHONUNBUFFERED=1
CMD ["bash","-c","celery -A code_review_platform worker --loglevel=info & gunicorn code_review_platform.wsgi:application --bind 0.0.0.0:8000"]
