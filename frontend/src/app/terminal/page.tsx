"use client";

import { useState } from 'react';
import { useTrading } from '@/context/TradingContext';
import StockChart from '@/components/StockChart';
import TradePanel from '@/components/TradePanel';
import { useAuth } from '@/context/AuthContext';
import { ArrowUpRight, TrendingUp, DollarSign } from 'lucide-react';

export default function TerminalPage() {
  const { symbol, price, portfolio } = useTrading();
  const { user } = useAuth();
  const [selectedInterval, setSelectedInterval] = useState('1d');
  
  // Calculate PnL for current symbol
  const position = portfolio?.positions?.find((p: any) => p.symbol === symbol);
  const pnl = position ? (price - position.avg_price) * position.qty : 0;
  const pnlPercent = position ? ((price - position.avg_price) / position.avg_price) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#111315] text-white p-8 pb-32">
       {/* Header */}
       <div className="flex justify-between items-center mb-8">
          <div>
              <div className="flex items-center gap-3">
                 <h1 className="text-3xl font-bold text-white">{symbol}</h1>
                 <span className="bg-[#272B30] text-gray-400 px-2 py-1 rounded text-sm">USD</span>
              </div>
              <div className="flex items-baseline gap-3 mt-1">
                 <span className="text-4xl font-bold">${price.toFixed(2)}</span>
                 <span className="text-green-500 font-bold flex items-center gap-1">
                    <ArrowUpRight className="w-4 h-4" />
                    +1.24%
                 </span>
              </div>
          </div>
          
          <div className="flex gap-4">
               {/* Stats Cards */}
               <div className="bg-[#1A1D1F] p-4 rounded-xl border border-gray-800 min-w-[200px]">
                   <div className="text-gray-400 text-xs mb-1">Your Position</div>
                   <div className="font-bold text-lg">{position ? `${position.qty} ${symbol}` : '0.00'}</div>
                   <div className={`text-xs font-bold ${pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                       {pnl >= 0 ? '+' : ''}{pnl.toFixed(2)} USD ({pnlPercent.toFixed(2)}%)
                   </div>
               </div>
               
               <div className="bg-[#1A1D1F] p-4 rounded-xl border border-gray-800 min-w-[200px]">
                   <div className="text-gray-400 text-xs mb-1">Market Cap</div>
                   <div className="font-bold text-lg text-white">$2.4T</div>
                   <div className="text-xs text-blue-500 font-bold">High Volatility</div>
               </div>
          </div>
       </div>

       {/* Main Grid */}
       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
           {/* Chart Section */}
           <div className="lg:col-span-3 bg-[#1A1D1F] rounded-2xl border border-gray-800 p-6 flex flex-col h-[600px]">
               <div className="flex justify-between items-center mb-6">
                   <div className="flex gap-2">
                       {['1m', '5m', '15m', '1h', '1d', '1w'].map((int) => (
                           <button 
                             key={int}
                             onClick={() => setSelectedInterval(int)}
                             className={`px-3 py-1 rounded-lg text-sm font-bold transition-all ${selectedInterval === int ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-gray-400'}`}
                           >
                              {int.toUpperCase()}
                           </button>
                       ))}
                   </div>
                   <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-[#272B30] hover:bg-white/10 rounded-lg text-xs font-bold transition-colors">
                            <TrendingUp className="w-4 h-4" />
                            Indicators
                        </button>
                   </div>
               </div>
               
               <div className="flex-1 w-full relative">
                   {/* We pass the selected interval to the chart */}
                   <StockChart />
               </div>
           </div>

           {/* Trading Panel Sidebar */}
           <div className="lg:col-span-1 space-y-6">
               <div className="bg-[#1A1D1F] p-6 rounded-2xl border border-gray-800">
                   <h3 className="font-bold text-lg mb-4">Order Book</h3>
                   {/* Simplified Order Book Visualization */}
                   <div className="space-y-1 mb-6">
                       {[...Array(5)].map((_, i) => (
                           <div key={`ask-${i}`} className="flex justify-between text-xs relative">
                               <span className="text-red-400 font-mono">{(price + (5-i)*0.05).toFixed(2)}</span>
                               <span className="text-gray-400">{Math.floor(Math.random()*100)}</span>
                               <div className="absolute right-0 top-0 bottom-0 bg-red-500/10 w-[30%]"></div>
                           </div>
                       ))}
                       <div className="py-2 border-y border-gray-800 flex justify-center text-xl font-bold">
                           {price.toFixed(2)}
                       </div>
                       {[...Array(5)].map((_, i) => (
                           <div key={`bid-${i}`} className="flex justify-between text-xs relative">
                               <span className="text-green-400 font-mono">{(price - (i+1)*0.05).toFixed(2)}</span>
                               <span className="text-gray-400">{Math.floor(Math.random()*100)}</span>
                               <div className="absolute right-0 top-0 bottom-0 bg-green-500/10 w-[40%]"></div>
                           </div>
                       ))}
                   </div>

                   <h3 className="font-bold text-lg mb-4">Execute Trade</h3>
                   <TradePanel />
                   
                   <div className="mt-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                       <div className="text-xs text-blue-400 mb-1">Buying Power</div>
                       <div className="text-xl font-bold flex items-center gap-1">
                           <DollarSign className="w-4 h-4" />
                           {portfolio?.balance?.toLocaleString()}
                       </div>
                   </div>
               </div>
           </div>
       </div>
    </div>
  );
}
