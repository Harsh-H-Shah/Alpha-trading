"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface Position {
  symbol: string;
  qty: number;
  avg_price: number;
}

interface Portfolio {
  balance: number;
  positions: Position[];
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

export function TradingProvider({ children }: { children: ReactNode }) {
  const [symbol, setSymbol] = useState('AAPL');
  const [price, setPrice] = useState(0);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

  const refreshPortfolio = () => {
    fetch(`${API_URL}/api/portfolio`)
      .then(res => res.json())
      .then(data => setPortfolio(data))
      .catch(err => console.error("Failed to fetch portfolio", err));
  };

  // Initial fetch when component mounts
  useEffect(() => {
    refreshPortfolio();
  }, []);

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
