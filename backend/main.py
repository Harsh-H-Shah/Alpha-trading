from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/history/{symbol}")
def get_stock_history(symbol: str, period: str = "1mo", interval: str = "1d"):
    import yfinance as yf
    try:
        ticker = yf.Ticker(symbol)
        df = ticker.history(period=period, interval=interval)
        history = []
        for index, row in df.iterrows():
            history.append({
                "time": index.strftime("%Y-%m-%d %H:%M") if interval in ["1m", "2m", "5m", "15m", "60m"] else index.strftime("%Y-%m-%d"),
                "price": row['Close'],
                "open": row['Open'],
                "high": row['High'],
                "low": row['Low'],
                "volume": row['Volume']
            })
        return history
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/news/{symbol}")
def get_stock_news(symbol: str):
    import yfinance as yf
    try:
        ticker = yf.Ticker(symbol)
        news = ticker.news
        return news
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/predict/{symbol}")
def predict_stock(symbol: str):
    from backend.predictor import train_and_predict
    return train_and_predict(symbol)

@app.get("/api/scan")
def scan_market():
    from backend.scanner import run_market_scan
    # Scan a mix of tech and meme stocks
    symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'AMD', 'GME', 'COIN']
    return run_market_scan(symbols)

@app.get("/api/analyze/{symbol}")
def analyze_stock_endpoint(symbol: str):
    from backend.scanner import analyze_stock
    return analyze_stock(symbol)

# --- Game State / Portfolio API ---
from backend.gamestate import game
from pydantic import BaseModel

class TradeRequest(BaseModel):
    symbol: str
    type: str # 'buy' or 'sell'
    qty: int
    price: float

@app.get("/api/portfolio")
def get_portfolio():
    return game.get_portfolio()

@app.post("/api/trade")
def execute_trade(trade: TradeRequest):
    try:
        return game.execute_trade(trade.symbol, trade.type, trade.qty, trade.price)
    except ValueError as e:
        return {"error": str(e)}




@app.get("/")
def read_root():
    return {"Hello": "Alpha Trading API"}

@app.get("/api/health")
def health_check():
    return {"status": "ok"}
