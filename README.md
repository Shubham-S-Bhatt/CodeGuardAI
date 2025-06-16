# CodeGuardAI


# AI-Powered Code Review & Quality Insights Platform

An end-to-end, open-source system that automatically analyzes GitHub Pull Requests using a local Hugging Face code model, surfaces AI-driven suggestions, and presents everything in a polished React UI.

---

## Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Prerequisites](#prerequisites)  
4. [Getting Started](#getting-started)  
   - [Environment Variables](#environment-variables)  
   - [Backend Setup (Django + Celery)](#backend-setup-django--celery)  
   - [Frontend Setup (React + MUI)](#frontend-setup-react--mui)  
5. [Running the App](#running-the-app)  
6. [Testing](#testing)  
7. [GitHub Webhook Configuration](#github-webhook-configuration)  
8. [Project Structure](#project-structure)  
9. [Contributing](#contributing)  
10. [License](#license)  

---

## Features

- 🐍 **Django REST API** for PR metadata storage  
- 🔄 **GitHub Webhooks** to auto‐enqueue new/updated PRs  
- 🤖 **Celery + Redis** for async diff fetching & AI analysis  
- 🧠 **Hugging Face CodeGen** model for code suggestions  
- ⚛️ **React + Material-UI** frontend with diff viewer  
- 🔍 **Diff2Html** for beautiful unified-diff rendering  
- 📋 **CI/CD** via GitHub Actions (backend tests + frontend build)  

---

## Tech Stack

- **Backend:** Python 3.10+, Django 5.x, Django REST Framework, Celery, Redis  
- **AI:** Transformers (Salesforce/codegen-350M-multi), PyTorch  
- **Frontend:** React 18, Material-UI v5, Axios, diff2html  
- **Dev Tools:** GitHub Actions, ESLint, Prettier  

---

## Prerequisites

- **Python** ≥ 3.10  
- **Node.js** ≥ 18 & **npm**  
- **Redis** server running locally (for Celery broker)  
- A **Hugging Face** account & API token  
- A **GitHub** repository you can configure webhooks on  

---

## Getting Started

### Environment Variables

Create a `.env` file in the **backend/** directory (and add it to `.gitignore`):

```dotenv
# backend/.env
GITHUB_WEBHOOK_SECRET=your_github_webhook_secret_here
DJANGO_SECRET_KEY=your_django_secret_key_here
HF_TOKEN=hf_your_huggingface_token_here
```

> **Note:** Never commit `.env` to version control.

---

### Backend Setup (Django & Celery)

1. **Create & activate** a virtual environment:
   ```bash
   cd backend
   python3 -m venv .venv
   source .venv/bin/activate
   ```
2. **Install** dependencies:
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```
3. **Load** your environment variables into your shell:
   ```bash
   export $(grep -v '^#' .env | xargs)
   ```
4. **Run** database migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
5. **Start** Redis (if not already running):
   - **macOS:** `brew services start redis`  
   - **Ubuntu:** `sudo systemctl enable --now redis`
6. **Launch** Celery worker (in one terminal):
   ```bash
   celery -A code_review_platform worker --loglevel=info
   ```
7. **Run** Django dev server (in another terminal):
   ```bash
   python manage.py runserver 0.0.0.0:8000
   ```

Your API is now available at `http://localhost:8000/api/`.

---

### Frontend Setup (React & MUI)

1. **Switch** to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. **Install** dependencies:
   ```bash
   npm install
   ```
3. **Disable** source-map warnings (optional):
   ```bash
   echo "GENERATE_SOURCEMAP=false" > .env
   ```
4. **Configure** proxy (in `package.json`), so `/api` → `localhost:8000`:
   ```diff
     {
       "name": "code-review-ui",
       "version": "1.0.0",
       "private": true,
   +   "proxy": "http://localhost:8000",
       "dependencies": { … }
     }
   ```
5. **Start** the React dev server:
   ```bash
   npm start
   ```

The UI will launch at `http://localhost:3000`.

---

## Running the App

1. **Backend**  
   - Celery worker  
   - Django server on port **8000**  
2. **Frontend**  
   - React dev server on port **3000** (proxying `/api/*`)  

Open your browser at **`http://localhost:3000`** and you’ll see live PR cards. Clicking a card shows the unified diff and AI suggestions.

---

## Testing

- **Backend tests** (Django):
  ```bash
  cd backend
  python manage.py test
  ```
- **Frontend build**:
  ```bash
  cd frontend
  npm run build
  ```

---

## GitHub Webhook Configuration

1. In your GitHub repo, go to **Settings → Webhooks → Add webhook**.  
2. **Payload URL:**  
   ```
   http://<your-domain>/api/webhook/github/
   ```
3. **Content type:** `application/json`  
4. **Secret:** use the same `GITHUB_WEBHOOK_SECRET` from your `.env`.  
5. **Which events:**  
   - Select **Pull requests** (and **Push** if desired).  
   - Click **Add webhook**.

GitHub will now POST to your backend, and Celery will enqueue each new or updated PR for AI analysis.

---

## Project Structure

```
code-review-platform/
├── backend/
│   ├── .env                # your secrets
│   ├── requirements.txt
│   ├── manage.py
│   ├── code_review_platform/
│   │   ├── settings.py
│   │   ├── celery.py
│   │   └── urls.py
│   └── review_app/
│       ├── models.py
│       ├── views.py
│       ├── tasks.py
│       └── utils/analysis.py
└── frontend/
    ├── .env                # optional CRA config
    ├── package.json
    └── src/
        ├── App.js
        ├── components/
        │   ├── Navbar.js
        │   ├── PRList.js
        │   └── PRDetail.js
        └── index.js
```

---

## Contributing

1. Fork the repo & create a feature branch  
2. Commit your changes with clear messages  
3. Open a Pull Request and describe your improvements  
4. We’ll review and merge!

---

## License

This project is released under the **MIT License**.  
Feel free to use, modify, and distribute!