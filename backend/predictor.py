import yfinance as yf
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

def fetch_data(symbol, period="1y"): 
    # Fetch last 1 year data
    ticker = yf.Ticker(symbol)
    df = ticker.history(period=period)
    if 'Close' not in df.columns:
        return np.array([])
    return df['Close'].values

def prepare_data(data, lookback):
    x, y = [], []
    if len(data) <= lookback:
        return np.array([]), np.array([])
        
    for i in range(len(data) - lookback):
        x.append(data[i:(i+lookback)])
        y.append(data[i+lookback])
    return np.array(x), np.array(y)

def train_and_predict(symbol):
    lookback = 30 # Reduced lookback for simpler model
    data_raw = fetch_data(symbol)
    
    if len(data_raw) < lookback + 10:
        return {"error": "Not enough data"}

    # Prepare features (X) and target (y)
    # X = window of prices, y = next price
    X, y = prepare_data(data_raw, lookback)
    
    if len(X) == 0:
        return {"error": "Not enough data to train"}

    # Train a lightweight Random Forest
    # n_estimators=100 is fast and low memory
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X, y)
    
    # Predict next day
    last_sequence = data_raw[-lookback:].reshape(1, -1)
    predicted_price = model.predict(last_sequence)[0]
    
    current_price = data_raw[-1]
    
    # Prepare history for visualization (last 30 points)
    last_30_days = data_raw[-30:].tolist()
    
    return {
        "symbol": symbol,
        "current_price": float(current_price),
        "predicted_price": float(predicted_price),
        "direction": "UP" if predicted_price > current_price else "DOWN",
        "history": last_30_days
    }
