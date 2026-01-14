# Alpha Trading Platform (v2.0)

A next-generation stock trading and learning platform featuring real-time market simulation, AI-based price predictions (LSTM), and interactive educational courses.

## Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.12+)
- **ML Model**: PyTorch (LSTM)
- **Data**: yfinance

## Project Structure

```bash
alpha-trading/
├── frontend/          # Next.js web application
│   ├── src/app/       # App Directory (Routes)
│   ├── src/components/# React Components
├── backend/           # Python FastAPI backend
│   ├── main.py        # API Entry point
│   ├── model.py       # LSTM Model Architecture
│   ├── predictor.py   # Training & Inference Logic
└── legacy_v1/         # Old React 17 codebase (archived)
```

## Getting Started

### 1. Backend Setup

The backend requires Python 3.12+ and dependencies.

```bash
# Install dependencies (if not already done)
pip install -r backend/requirements.txt

# Run the server
python3 -m uvicorn backend.main:app --reload
```
The API will run at `http://localhost:8000`.

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
The web app will run at `http://localhost:3000`.

## Features
- **Mock Trading Dashboard**: Buy/Sell stocks with a virtual portfolio.
- **AI Predictions**: Compare your market view with our LSTM model's forecast.
- **Charts & Patterns**: Learn technical analysis with interactive modules.
- **News Feed**: Real-time market news aggregation.
