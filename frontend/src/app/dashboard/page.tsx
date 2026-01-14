"use client";

import { ArrowUpRight, TrendingUp, Wallet, Clock, MoreHorizontal } from 'lucide-react';
import { useTrading } from '@/context/TradingContext';
import StockChart from '@/components/StockChart';
import TradePanel from '@/components/TradePanel';
import CompanyStats from '@/components/CompanyStats';

export default function DashboardPage() {
  const { symbol, setSymbol, price, portfolio } = useTrading();

  return (
    <div className="flex flex-col h-screen bg-[#0F172A] text-white overflow-hidden">
      {/* Top Header */}
      <header className="h-16 border-b border-[#1E293B] flex items-center justify-between px-6 bg-[#0F172A]">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-white tracking-tight">{symbol}</h1>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             <span className="text-green-400 font-mono text-sm font-bold">${price.toFixed(2)}</span>
             <ArrowUpRight className="w-4 h-4 text-green-500" />
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="font-mono">Market Open</span>
           </div>
           <button className="p-2 hover:bg-white/5 rounded-lg transition">
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
           </button>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Column (Chart & Positions) */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-[#1E293B]">
           {/* Chart Area */}
           <div className="flex-1 relative bg-[#0B1221]">
              <div className="absolute inset-0 p-4">
                 <StockChart />
              </div>
           </div>

           {/* Positions Table (Collapsible) */}
           <div className="h-48 border-t border-[#1E293B] bg-[#0F172A] flex flex-col">
              <div className="px-4 py-2 border-b border-[#1E293B] flex items-center gap-4 bg-[#1E293B]/30">
                 <button className="text-sm font-medium text-blue-400 border-b-2 border-blue-400 pb-2 -mb-2.5">Open Positions</button>
              </div>
              <div className="flex-1 overflow-auto">
                 <table className="w-full text-left text-sm">
                    <thead className="text-gray-500 font-medium sticky top-0 bg-[#0F172A] border-b border-[#1E293B]">
                       <tr>
                          <th className="px-4 py-2 font-normal">Ticker</th>
                          <th className="px-4 py-2 font-normal">Side</th>
                          <th className="px-4 py-2 font-normal">Size</th>
                          <th className="px-4 py-2 font-normal">Avg Price</th>
                          <th className="px-4 py-2 font-normal">Market Value</th>
                       </tr>
                    </thead>
                    <tbody className="text-gray-300 divide-y divide-[#1E293B]">
                       {portfolio?.positions.length === 0 && (
                          <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No open positions. Use the panel to trade.</td></tr>
                       )}
                       {portfolio?.positions.map((pos) => (
                         <tr key={pos.symbol} className="hover:bg-white/5 transition">
                            <td className="px-4 py-3 font-bold">{pos.symbol}</td>
                            <td className="px-4 py-3 text-green-400">Long</td>
                            <td className="px-4 py-3">{pos.qty}</td>
                            <td className="px-4 py-3 font-mono">${pos.avg_price.toFixed(2)}</td>
                            <td className="px-4 py-3 font-mono text-white">${(pos.qty * (pos.symbol === symbol ? price : pos.avg_price)).toFixed(2)}</td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        {/* Right Column (Order Panel & Watchlist) */}
        <div className="w-80 flex flex-col bg-[#0F172A]">
           <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="p-4">
                  <div className="bg-[#1E293B]/30 rounded-xl p-4 mb-4 border border-[#1E293B]">
                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                          <Wallet className="w-4 h-4" />
                          <span>Buying Power</span>
                      </div>
                      <div className="text-2xl font-bold text-white font-mono">
                          ${portfolio?.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? '---'}
                      </div>
                  </div>
                  <TradePanel />
                  <div className="mt-4">
                     <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Fundamentals</h3>
                     <CompanyStats />
                  </div>
              </div>

              <div className="px-4 pb-4">
                 <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Watchlist</h3>
                 <div className="space-y-2">
                    {['TSLA', 'NVDA', 'AMD', 'MSFT', 'GME', 'AMZN'].map(sym => (
                       <div 
                         key={sym} 
                         onClick={() => setSymbol(sym)}
                         className={`flex justify-between items-center p-3 rounded-lg transition cursor-pointer border ${symbol === sym ? 'bg-blue-600/20 border-blue-500/50' : 'bg-[#1E293B]/20 border-transparent hover:bg-[#1E293B]/50 hover:border-slate-700'}`}
                       >
                          <div>
                             <div className="font-bold">{sym}</div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  )
}
