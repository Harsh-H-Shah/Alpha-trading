"use client";

import { useState } from 'react';
import { Radar, ScanLine, ArrowRight, Zap, TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface ScanResult {
  symbol: string;
  price: number;
  rsi: number;
  patterns: string[];
  sentiment: 'Bullish' | 'Bearish';
}

export default function PatternsPage() {
  const [results, setResults] = useState<ScanResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleScan = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/scan');
      const data = await res.json();
      setResults(data);
      setScanned(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <ScanLine className="w-8 h-8 text-cyan-400" />
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Pattern Scanner</h1>
           </div>
           <p className="text-gray-400 text-lg">Real-time technical analysis and anomaly detection.</p>
        </div>
        
        <button 
           onClick={handleScan}
           disabled={loading}
           className={`px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-cyan-900/20 border border-cyan-500/30 transition-all flex items-center gap-3 group ${loading ? 'bg-cyan-950/50 cursor-not-allowed text-gray-500' : 'bg-cyan-900/20 hover:bg-cyan-500 hover:text-white'}`}
        >
           {loading ? (
             <>
               <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
               Scanning Market...
             </>
           ) : (
             <>
               <Radar className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
               Run Market Scan
             </>
           )}
        </button>
      </div>

      {!scanned && (
         <div className="text-center py-24 border border-dashed border-[#1E293B] rounded-3xl bg-[#0F172A]/50">
            <Activity className="w-20 h-20 text-gray-700 mx-auto mb-6 opacity-30" />
            <h3 className="text-xl font-bold text-gray-500">No Scan Data</h3>
            <p className="text-gray-600">Initiate a scan to detect live patterns.</p>
         </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((res) => (
          <div key={res.symbol} className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 hover:border-cyan-500/50 transition-all group shadow-xl">
             <div className="flex justify-between items-start mb-6">
                <div>
                   <h2 className="text-2xl font-bold font-mono tracking-tight">{res.symbol}</h2>
                   <div className="text-cyan-400 font-mono text-lg">${res.price.toFixed(2)}</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${res.sentiment === 'Bullish' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                   {res.sentiment}
                </div>
             </div>

             <div className="space-y-3 mb-6">
                {res.patterns.map((pat, i) => (
                   <div key={i} className="flex items-center gap-2 text-sm text-gray-300 bg-[#1E293B] p-2 rounded-lg">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      {pat}
                   </div>
                ))}
                {res.patterns.length === 0 && <div className="text-sm text-gray-600 italic">No strong sign</div>}
             </div>

             <div className="flex items-center justify-between pt-4 border-t border-[#1E293B]">
                <div className="text-xs text-gray-500">
                   RSI: <span className={res.rsi > 70 || res.rsi < 30 ? "text-white font-bold" : "text-gray-400"}>{res.rsi.toFixed(1)}</span>
                </div>
                <button className="text-cyan-400 hover:text-white transition-colors flex items-center gap-1 text-sm font-bold">
                   Analyze <ArrowRight className="w-4 h-4" />
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
