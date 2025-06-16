# CodeGuardAI

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**AI-Powered Code Review & Quality Insights Platform**

**CodeGuardAI** automatically analyzes GitHub Pull Requests with a local Hugging Face CodeGen model, providing actionable suggestions, bug flags, and maintainability improvements—all surfaced in a modern React UI.

---

## 📋 Table of Contents

1. [Features](#-features)  
2. [Architecture](#-architecture)  
3. [Tech Stack](#-tech-stack)  
4. [Getting Started](#-getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Environment Variables](#environment-variables)  
   - [Backend Setup (Django & Celery)](#backend-setup-django--celery)  
   - [Frontend Setup (React & MUI)](#frontend-setup-react--mui)  
5. [Usage](#-usage)  
6. [Testing & CI/CD](#-testing--cicd)  
7. [GitHub Webhook Configuration](#-github-webhook-configuration)  
8. [Project Structure](#-project-structure)  
9. [Contributing](#-contributing)  
10. [License](#-license)  

---

## 🛠 Features

- **Automated PR Analysis**: Enqueue and analyze new or updated PRs via GitHub Webhooks.  
- **AI Suggestions**: Leverages Hugging Face CodeGen for pinpointed code improvement recommendations.  
- **Asynchronous Processing**: Fast diff fetching & model inference with Celery + Redis.  
- **Modern UI**: React + Material-UI frontend with syntax‑highlighted diff viewer.  
- **Scalable**: Easily swap in larger models, add lint/security scans, or extend rules.  
- **CI/CD**: GitHub Actions for backend testing & frontend builds.

---

## 🔗 Architecture

```
GitHub Webhook → Django API → Celery Task Queue (Redis)
                   ↓
           CodeGen Model Inference
                   ↓
        Results stored in PostgreSQL (or SQLite)
                   ↓
              React Frontend
```

---

## 💻 Tech Stack

- **Backend**: Python 3.10+, Django 5.x, Django REST Framework, Celery, Redis  
- **AI**: 🤗 Transformers (Salesforce/codegen-350M-multi), PyTorch  
- **Frontend**: React 18, Material-UI v5, Axios, diff2html  
- **DevOps**: GitHub Actions, ESLint, Prettier

---

## 🚀 Getting Started

### Prerequisites

- Python ≥3.10  
- Node.js ≥18 & npm  
- Redis server (local or remote)  
- GitHub account & repo with webhook permissions  
- Hugging Face account & API token  

### Environment Variables

In **backend/**, create `.env` (don’t commit):

```dotenv
GITHUB_WEBHOOK_SECRET=<your-webhook-secret>
DJANGO_SECRET_KEY=<your-django-secret>
HF_TOKEN=<hf_your-huggingface-token>
```

### Backend Setup (Django & Celery)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export $(grep -v '^#' .env | xargs)

# Migrate DB
python manage.py makemigrations
python manage.py migrate

# Start Redis (e.g., brew services start redis)

# In one terminal: start Celery
celery -A code_review_platform worker --loglevel=info

# In another terminal: run the server
python manage.py runserver 0.0.0.0:8000
```

### Frontend Setup (React & MUI)

```bash
cd ../frontend
npm install
echo "GENERATE_SOURCEMAP=false" > .env
# add proxy to package.json: "proxy": "http://localhost:8000"
npm start
```

---

## 🎯 Usage

1. Browse to `http://localhost:3000` to view PR dashboard.  
2. When new PRs are opened, Celery automatically fetches diffs, runs inference, and updates the UI.  
3. Click any PR card to see a syntax-highlighted diff and AI recommendations.

---

## ✅ Testing & CI/CD

- **Backend Tests**:
  ```bash
  cd backend
  python manage.py test
  ```
- **Frontend Build**:
  ```bash
  cd frontend
  npm run build
  ```
- **GitHub Actions** workflows run on every push & PR to `main`.

---

## 🔧 GitHub Webhook Configuration

1. Go to **Settings → Webhooks → Add webhook** in your repo.  
2. **Payload URL**: `http://<your-host>/api/webhook/github/`  
3. **Content type**: `application/json`  
4. **Secret**: your `GITHUB_WEBHOOK_SECRET`  
5. **Events**: select **Pull requests** (and **Push** if desired).  

---

## 📂 Project Structure

```
codeguardai/
├── backend/
│   ├── .env
│   ├── requirements.txt
│   ├── manage.py
│   ├── code_review_platform/
│   └── review_app/
└── frontend/
    ├── .env
    ├── package.json
    └── src/
```

---

## 🤝 Contributing

1. Fork & clone repo  
2. Create a branch (`git checkout -b feat/awesome`)  
3. Commit your changes & push  
4. Open a Pull Request—incorporating tests & documentation!

---

## 📜 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for details.