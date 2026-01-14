"use client";

import { Search, Bell, ChevronDown } from 'lucide-react';
import { useTrading } from '@/context/TradingContext';
import { useAuth } from '@/context/AuthContext';
import { PortfolioSummary, WalletCard, QuickTradeWidget, MarketInsights, RecentTradesCard } from '@/components/DashboardWidgets';

export default function DashboardPage() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-[#111315] text-white p-8 pb-32">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
         <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">Cryptosphere</h1>
         </div>

         <div className="flex-1 flex justify-center">
            <div className="bg-[#1A1D1F] border border-gray-800 rounded-xl flex items-center px-4 py-3 w-96 gap-3">
               <Search className="w-5 h-5 text-gray-500" />
               <input 
                 type="text" 
                 placeholder="Search..." 
                 className="bg-transparent text-sm w-full outline-none text-white placeholder-gray-500"
               />
            </div>
         </div>

         <div className="flex-1 flex justify-end items-center gap-6">
             <button className="relative p-2 rounded-full border border-gray-800 bg-[#1A1D1F] hover:bg-gray-800 transition-colors">
                 <Bell className="w-5 h-5 text-gray-400" />
                 <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#111315]"></span>
             </button>
             
             <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border-2 border-[#1A1D1F]"></div>
                 <div className="hidden lg:block">
                     <div className="text-sm font-bold">{user?.name || 'Alex Trader'}</div>
                     <div className="text-xs text-gray-500 truncate max-w-[100px]">{user?.email || 'alex@cryptosphere.com'}</div>
                 </div>
                 <ChevronDown className="w-4 h-4 text-gray-500" />
             </div>
         </div>
      </header>

      {/* Welcome Section */}
      <div className="mb-8 flex justify-between items-center">
          <div>
              <h2 className="text-3xl font-bold mb-1">Welcome Back, {user?.name || 'Trader'}!</h2>
              <p className="text-gray-400">Manage your crypto portfolio with confidence.</p>
          </div>
          <div className="flex gap-3">
              <button className="px-6 py-2.5 bg-[#1A1D1F] border border-gray-800 hover:bg-gray-800 rounded-xl font-bold text-sm transition-all">
                  Add Payment +
              </button>
              <button className="p-2.5 bg-[#1A1D1F] border border-gray-800 hover:bg-gray-800 rounded-xl transition-all">
                  <span className="text-2xl leading-none px-1">...</span>
              </button>
          </div>
      </div>

      {/* Portfolio Stats */}
      <PortfolioSummary />

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (Wallet & Market) */}
          <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[260px]">
                  <WalletCard />
                  <div className="h-full">
                     {/* Placeholder for future growth or just utilize space for now */}
                     <QuickTradeWidget />
                  </div>
              </div>
              <div className="h-[300px]">
                  <MarketInsights />
              </div>
          </div>

          {/* Right Column (Recent Trades) */}
          <div className="lg:col-span-4 h-full">
               <RecentTradesCard />
          </div>
      </div>
    </div>
  )
}
