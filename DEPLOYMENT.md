# Deployment Guide: Alpha Trading

Since this application uses a hybrid stack (Next.js Frontend + FastAPI Python Backend), it requires a specific hosting strategy. Simple static hosting (GitHub Pages) is **not sufficient** for the backend logic (AI predictions, Live News, Pattern Scanner).

## Recommended Strategy: Separate Hosting

We separate the frontend and backend deployment. This is the most robust and scalable approach.

### 1. Frontend (Vercel)
Vercel is the creators of Next.js and offers the best hosting for it.

1.  Push your code to GitHub.
2.  Go to [Vercel](https://vercel.com) and "Add New Project".
3.  Import your repository.
4.  **Configure Project**:
    *   **Root Directory**: `frontend`
    *   **Framework Preset**: Next.js
    *   **Build Command**: `next build` (default)
    *   **Output Directory**: `.next` (default)
5.  **Environment Variables**:
    *   You will need to tell the frontend where the backend lives.
    *   Add `NEXT_PUBLIC_API_URL` = `https://your-backend-url.onrender.com` (See step 2).
    *   *Note: You may need to update the frontend code to use this variable instead of `localhost:8000`.*

### 2. Backend (Render / Railway)
We need a hosting provider that supports Python and installing dependencies like `torch`.

#### Option A: Render (Easiest Free Tier)
1.  Go to [Render](https://render.com).
2.  Create a **New Web Service**.
3.  Connect your GitHub repo.
4.  **Configure**:
    *   **Root Directory**: `backend`
    *   **Runtime**: Python 3
    *   **Build Command**: `pip install -r requirements.txt`
    *   **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5.  **Environment Variables**:
    *   Add any API keys if we add them later.
    *   **Important**: In `backend/main.py`, you need to update the `origins` list in CORS settings to include your new Vercel frontend domain (e.g., `https://alpha-trading.vercel.app`), otherwise the frontend cannot talk to the backend.

## Alternative: Docker (Advanced)

If you prefer to containerize everything, you can use the provided `Dockerfile` (to be created) and deploy to any container orchestrator (AWS ECS, Fly.io, DigitalOcean).

### Backend Dockerfile (Example)
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Checklist Before Deploying
- [ ] Update `backend/main.py`: Add production domains to `origins` (CORS).
- [ ] Update Frontend API Calls: Replace `http://localhost:8000` with `process.env.NEXT_PUBLIC_API_URL`.
- [ ] Ensure `requirements.txt` has all dependencies (`torch` is large, might need CPU-only version for free tiers to save space).
