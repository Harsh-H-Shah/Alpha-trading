import yfinance as yf
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import torch
import torch.nn as nn
from backend.model import LSTMModel
import os

scaler = MinMaxScaler(feature_range=(-1, 1))

def fetch_data(symbol, period="1y"): # Fetch last 1 year data
    ticker = yf.Ticker(symbol)
    df = ticker.history(period=period)
    return df['Close'].values.reshape(-1, 1)

def prepare_data(data, lookback):
    x, y = [], []
    for i in range(len(data) - lookback):
        x.append(data[i:(i+lookback)])
        y.append(data[i+lookback])
    return np.array(x), np.array(y)

def train_and_predict(symbol):
    lookback = 60 # Look back 60 days
    data_raw = fetch_data(symbol)
    
    if len(data_raw) < lookback + 10:
        return {"error": "Not enough data"}

    data_scaled = scaler.fit_transform(data_raw)
    
    x_train, y_train = prepare_data(data_scaled, lookback)
    
    x_train = torch.from_numpy(x_train).type(torch.Tensor)
    y_train = torch.from_numpy(y_train).type(torch.Tensor)
    
    input_dim = 1
    hidden_dim = 32
    num_layers = 2
    output_dim = 1
    
    model = LSTMModel(input_dim, hidden_dim, num_layers, output_dim)
    criterion = nn.MSELoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=0.01)
    
    num_epochs = 50 # Train quickly for demo
    for epoch in range(num_epochs):
        y_train_pred = model(x_train)
        loss = criterion(y_train_pred, y_train)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        
    # Predict next day
    last_sequence = data_scaled[-lookback:]
    last_sequence = torch.from_numpy(last_sequence).type(torch.Tensor).view(1, lookback, 1)
    
    with torch.no_grad():
        future_pred_scaled = model(last_sequence)
        
    future_pred = scaler.inverse_transform(future_pred_scaled.numpy())
    current_price = data_raw[-1][0]
    predicted_price = future_pred[0][0]
    
    # Prepare history for visualization (last 30 points)
    last_30_days = data_raw[-30:].flatten().tolist()
    
    return {
        "symbol": symbol,
        "current_price": float(current_price),
        "predicted_price": float(predicted_price),
        "direction": "UP" if predicted_price > current_price else "DOWN",
        "history": last_30_days
    }
