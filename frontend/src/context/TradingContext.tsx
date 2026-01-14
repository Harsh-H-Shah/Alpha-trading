"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Portfolio {
  balance: number;
  positions: { symbol: string; qty: number; avg_price: number }[];
  history: any[];
}

interface TradingContextType {
  symbol: string;
  setSymbol: (s: string) => void;
  price: number;
  setPrice: (p: number) => void;
  portfolio: Portfolio | null;
  refreshPortfolio: () => void;
}

const TradingContext = createContext<TradingContextType | undefined>(undefined);

export function TradingProvider({ children }: { children: React.ReactNode }) {
  const [symbol, setSymbol] = useState('AAPL');
  const [price, setPrice] = useState(0);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshPortfolio = () => setRefreshTrigger(prev => prev + 1);

  useEffect(() => {
    fetch('http://localhost:8000/api/portfolio')
      .then(res => res.json())
      .then(data => setPortfolio(data))
      .catch(err => console.error("Failed to fetch portfolio", err));
  }, [refreshTrigger]);

  return (
    <TradingContext.Provider value={{ symbol, setSymbol, price, setPrice, portfolio, refreshPortfolio }}>
      {children}
    </TradingContext.Provider>
  );
}

export function useTrading() {
  const context = useContext(TradingContext);
  if (context === undefined) {
    throw new Error('useTrading must be used within a TradingProvider');
  }
  return context;
}
