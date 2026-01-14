import yfinance as yf
import pandas as pd
import numpy as np

def calculate_rsi(data, periods=14):
    delta = data.diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=periods).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=periods).mean()
    rs = gain / loss
    return 100 - (100 / (1 + rs))

def scan_symbol(symbol):
    try:
        ticker = yf.Ticker(symbol)
        df = ticker.history(period="1mo")
        
        if len(df) < 15:
            return None

        current_price = df['Close'].iloc[-1]
        rsi = calculate_rsi(df['Close']).iloc[-1]
        
        # Simple Pattern Logic
        patterns = []
        
        # 1. RSI
        if rsi < 30:
            patterns.append("RSI Oversold (Potential Buy)")
        elif rsi > 70:
            patterns.append("RSI Overbought (Risk)")
            
        # 2. Daily Change
        change_pct = ((df['Close'].iloc[-1] - df['Close'].iloc[-2]) / df['Close'].iloc[-2]) * 100
        if change_pct > 5:
            patterns.append("Big Mover (+5%)")
        elif change_pct < -5:
            patterns.append("Panic Sell (-5%)")
            
        # 3. SMA Crossover (Simple Golden Cross Proxy)
        sma20 = df['Close'].rolling(window=20).mean().iloc[-1]
        if current_price > sma20:
             patterns.append("Uptrend (Above 20 SMA)")
        else:
             patterns.append("Downtrend (Below 20 SMA)")

        return {
            "symbol": symbol,
            "price": current_price,
            "rsi": rsi,
            "patterns": patterns,
            "sentiment": "Bullish" if rsi < 40 or current_price > sma20 else "Bearish"
        }
    except:
        return None

def run_market_scan(symbols):
    results = []
    for sym in symbols:
        res = scan_symbol(sym)
        if res:
            results.append(res)
    return results

def analyze_stock(symbol):
    try:
        ticker = yf.Ticker(symbol)
        df = ticker.history(period="3mo")
        if len(df) < 20: return {"error": "Insufficient Data"}

        current_price = df['Close'].iloc[-1]
        rsi = calculate_rsi(df['Close']).iloc[-1]
        sma50 = df['Close'].rolling(window=50).mean().iloc[-1]
        sma20 = df['Close'].rolling(window=20).mean().iloc[-1]
        
        support = df['Low'].tail(30).min()
        resistance = df['High'].tail(30).max()
        
        trend = "Bullish" if current_price > sma50 else "Bearish"
        
        txt = f"Analysis for {symbol}:\n"
        txt += f"The stock is in a {trend} trend (Price vs 50SMA).\n"
        txt += f"RSI is at {rsi:.2f}. "
        if rsi > 70: txt += "Overbought conditions detected.\n"
        elif rsi < 30: txt += "Oversold conditions detected.\n"
        else: txt += "Neutral momentum.\n"
        
        txt += f"Immediate Support: ${support:.2f}\n"
        txt += f"Immediate Resistance: ${resistance:.2f}\n"

        return {
            "symbol": symbol,
            "trend": trend,
            "rsi": rsi,
            "support": support,
            "resistance": resistance,
            "summary": txt
        }
    except Exception as e:
        return {"error": str(e)}
