"use client";

import { ArrowUpRight, ArrowDownRight, CreditCard, RefreshCw, Wallet, Bitcoin, Activity, TrendingUp } from 'lucide-react';
import { useTrading } from '@/context/TradingContext';

export function PortfolioSummary() {
  const { portfolio } = useTrading();
  // Mock data for visual match if portfolio is empty
  const balance = portfolio?.balance ?? 24518.92;
  const profit = 4912.77;
  const profitPercent = 9.50;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Value */}
      <div className="bg-[#1A1D1F] p-6 rounded-2xl border border-gray-800">
        <div className="text-gray-400 text-sm font-medium mb-2">Total Crypto Value</div>
        <div className="text-3xl font-bold text-white mb-2">${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        <div className="flex items-center gap-2 text-[#58BD7D] text-sm font-bold bg-[#58BD7D]/10 w-fit px-2 py-1 rounded-lg">
          <ArrowUpRight className="w-4 h-4" />
          <span>5.23%</span>
        </div>
      </div>

      {/* Total Purchased */}
      <div className="bg-[#1A1D1F] p-6 rounded-2xl border border-gray-800">
        <div className="text-gray-400 text-sm font-medium mb-2">Total Purchased</div>
        <div className="text-3xl font-bold text-white mb-2">$8,420.15</div>
        <div className="flex items-center gap-2 text-[#FF6838] text-sm font-bold bg-[#FF6838]/10 w-fit px-2 py-1 rounded-lg">
          <ArrowDownRight className="w-4 h-4" />
          <span>12.10%</span>
        </div>
      </div>

      {/* Total Profit */}
      <div className="bg-[#1A1D1F] p-6 rounded-2xl border border-gray-800">
        <div className="text-gray-400 text-sm font-medium mb-2">Total Profit</div>
        <div className="text-3xl font-bold text-white mb-2">${profit.toLocaleString()}</div>
        <div className="flex items-center gap-2 text-[#58BD7D] text-sm font-bold bg-[#58BD7D]/10 w-fit px-2 py-1 rounded-lg">
          <ArrowUpRight className="w-4 h-4" />
          <span>{profitPercent}%</span>
        </div>
      </div>
    </div>
  );
}

export function WalletCard() {
  return (
    <div className="bg-[#1A1D1F] p-6 rounded-2xl border border-gray-800 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg">Crypto Wallet</h3>
        <div className="flex gap-2">
            <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400"><ArrowDownRight/></button>
            <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400"><ArrowUpRight/></button>
        </div>
      </div>

      <div className="relative h-48 rounded-2xl bg-gradient-to-br from-[#1F2128] to-[#111315] p-6 border border-gray-700 overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
                <div className="text-2xl font-bold italic tracking-wider">VISA</div>
                <CreditCard className="w-8 h-8 text-white/50" />
            </div>
            
            <div className="space-y-4">
                <div>
                   <div className="text-gray-400 text-xs mb-1">Portfolio Balance</div>
                   <div className="text-2xl font-mono font-bold">$14,528.00</div>
                </div>
                <div className="flex justify-between items-end">
                    <div>
                        <div className="text-gray-400 text-xs mb-1">Wallet Address</div>
                        <div className="font-mono text-sm text-gray-300">0xA9F3...D21C</div>
                    </div>
                     <div className="w-10 h-6 bg-yellow-500/20 rounded-md border border-yellow-500/40 opacity-50"></div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export function QuickTradeWidget() {
   return (
    <div className="bg-[#1A1D1F] p-6 rounded-2xl border border-gray-800 h-full">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Quick Trade</h3>
            <span className="text-sm text-blue-500 cursor-pointer">Instant Swap</span>
        </div>

        <div className="flex gap-4 mb-6">
            <div className="flex-1 bg-[#272B30] p-4 rounded-xl flex items-center gap-3 border border-transparent hover:border-blue-500/50 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                    <Bitcoin className="w-6 h-6 text-white" />
                </div>
                <div>
                    <div className="font-bold">BTC Wallet</div>
                    <div className="text-xs text-gray-400">0.523 BTC</div>
                </div>
            </div>
            <div className="flex-1 bg-[#272B30] p-4 rounded-xl flex items-center gap-3 border border-transparent hover:border-blue-500/50 transition-colors cursor-pointer ring-1 ring-blue-500">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                    <div className="font-bold">ETH Wallet</div>
                    <div className="text-xs text-gray-400">3.28 ETH</div>
                </div>
            </div>
        </div>

        <div className="space-y-4">
            <div className="bg-[#111315] p-4 rounded-xl border border-gray-800">
                <div className="text-xs text-gray-500 mb-2">Enter Trade Amount</div>
                <div className="flex justify-between items-center">
                    <input className="bg-transparent text-xl font-bold w-full outline-none" placeholder="0.00" />
                    <span className="text-sm font-bold text-gray-400">USD</span>
                </div>
            </div>
            
            <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                Start Trading <ArrowUpRight className="w-4 h-4" />
            </button>
        </div>
    </div>
   )
}

export function MarketInsights() {
    return (
        <div className="bg-[#1A1D1F] p-6 rounded-2xl border border-gray-800 h-full relative overflow-hidden">
            <div className="flex justify-between items-center mb-4 relative z-10">
                <h3 className="font-bold text-lg">Market Insights</h3>
                <div className="flex gap-2">
                    <span className="px-2 py-1 bg-[#272B30] rounded text-xs text-gray-400">1H</span>
                    <span className="px-2 py-1 bg-blue-600 rounded text-xs text-white">24H</span>
                    <span className="px-2 py-1 bg-[#272B30] rounded text-xs text-gray-400">1W</span>
                </div>
            </div>
            
            {/* Simple SVG Chart visual */}
            <div className="h-40 w-full relative z-10">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <path d="M0,80 C30,70 60,90 90,50 C120,10 150,60 180,50 C210,40 240,20 270,30 C300,40 330,20 360,10" 
                          fill="none" stroke="#3772FF" strokeWidth="3" />
                    <circle cx="120" cy="30" r="4" fill="#3772FF" className="animate-ping" />
                    <circle cx="120" cy="30" r="4" fill="white" />
                </svg>
                <div className="absolute top-[10%] left-[30%] bg-black/80 px-3 py-1 rounded-lg border border-gray-700 text-xs font-mono">
                    BTC: $42,611
                </div>
            </div>
             <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#3772FF]/10 to-transparent pointer-events-none"></div>
        </div>
    )
}

export function RecentTradesCard() {
    return (
        <div className="bg-[#1A1D1F] p-6 rounded-2xl border border-gray-800 h-full">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Recent Trades</h3>
                <span className="text-sm text-gray-400 cursor-pointer hover:text-white">View all</span>
            </div>
            
            <div className="space-y-4">
                {[
                    { name: 'Bitcoin Buy', date: 'Apr 05 2023 at 21:46', amt: '+0.012 BTC', val: '($525.12)', type: 'buy' },
                    { name: 'Ethereum Sell', date: 'Mar 14 2023 at 08:10', amt: '-0.45 ETH', val: '(-$847.33)', type: 'sell' },
                    { name: 'USDT Transfer', date: 'Feb 20 2023 at 19:24', amt: '+150.00', val: '', type: 'transfer' },
                ].map((trade, i) => (
                    <div key={i} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${trade.type === 'buy' ? 'bg-orange-500/20 text-orange-500' : trade.type === 'sell' ? 'bg-blue-500/20 text-blue-500' : 'bg-green-500/20 text-green-500'}`}>
                                {trade.type === 'buy' ? <Bitcoin className="w-5 h-5" /> : trade.type === 'sell' ? <Activity className="w-5 h-5" /> : <RefreshCw className="w-5 h-5" />}
                            </div>
                            <div>
                                <div className="font-bold text-sm">{trade.name}</div>
                                <div className="text-xs text-gray-500">{trade.date}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className={`font-bold text-sm ${trade.type === 'sell' ? 'text-red-400' : 'text-green-400'}`}>{trade.amt}</div>
                            <div className="text-xs text-gray-500">{trade.val}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
