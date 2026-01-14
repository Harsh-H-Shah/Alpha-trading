"use client";

import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

export default function MarketExplorer() {
  const sectors = [
    { name: "Technology", change: "+1.5%", isPositive: true },
    { name: "Finance", change: "-0.4%", isPositive: false },
    { name: "Healthcare", change: "+0.2%", isPositive: true },
    { name: "Energy", change: "+2.1%", isPositive: true },
    { name: "Consumer", change: "-1.1%", isPositive: false },
  ];

  const movers = [
      { sym: 'NVDA', name: 'NVIDIA Corp', price: '450.20', change: '+5.4%', isPositive: true },
      { sym: 'AMD', name: 'Adv Micro Dev', price: '120.50', change: '+3.2%', isPositive: true },
      { sym: 'TSLA', name: 'Tesla Inc', price: '240.10', change: '-1.5%', isPositive: false },
      { sym: 'GME', name: 'GameStop', price: '24.50', change: '+12.4%', isPositive: true },
  ];

  return (
    <div className="p-8 space-y-8 bg-[#020617] min-h-screen">
      <div>
        <h1 className="text-3xl font-bold mb-2">Market Explorer</h1>
        <p className="text-gray-400">Discover top moving assets and sector performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sector Heatmap-ish */}
        <div className="glass-card p-6 rounded-2xl">
           <div className="flex items-center gap-2 mb-6">
              <Activity className="text-blue-500" />
              <h2 className="text-xl font-bold">Sector Performance</h2>
           </div>
           <div className="grid grid-cols-2 gap-4">
              {sectors.map(sector => (
                 <div key={sector.name} className={`p-4 rounded-xl flex justify-between items-center border border-white/5 ${sector.isPositive ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                    <span className="font-medium">{sector.name}</span>
                    <span className={`font-bold ${sector.isPositive ? 'text-green-400' : 'text-red-400'}`}>{sector.change}</span>
                 </div>
              ))}
           </div>
        </div>

        {/* Top Movers */}
        <div className="glass-card p-6 rounded-2xl">
           <h2 className="text-xl font-bold mb-6">Top Movers</h2>
           <div className="space-y-4">
              {movers.map(mover => (
                 <div key={mover.sym} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition border border-transparent hover:border-white/10">
                    <div className="flex items-center gap-4">
                       <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${mover.isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {mover.sym[0]}
                       </div>
                       <div>
                          <div className="font-bold">{mover.sym}</div>
                          <div className="text-xs text-gray-500">{mover.name}</div>
                       </div>
                    </div>
                    <div className="text-right">
                       <div className="font-mono font-bold">${mover.price}</div>
                       <div className={`text-sm flex items-center justify-end gap-1 ${mover.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                          {mover.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {mover.change}
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
