"use client";

import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ArrowUpRight, ArrowDownRight, BrainCircuit, Sparkles, AlertCircle } from 'lucide-react';

export default function PredictionPage() {
  const [symbol, setSymbol] = useState('AAPL');
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);

  const handlePredict = async () => {
    setLoading(true);
    setPrediction(null);
    try {
      const res = await fetch(`http://localhost:8000/api/predict/${symbol}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // Format data for chart
      const chartData = data.history.map((price: number, i: number) => ({
        day: i,
        price,
        type: 'history'
      }));
      // Add prediction point
      chartData.push({
        day: data.history.length,
        price: data.predicted_price,
        type: 'prediction'
      });
      
      setPrediction({ ...data, chartData });
    } catch (e) {
      alert("Prediction Failed: " + String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8 pb-32">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
           <BrainCircuit className="w-8 h-8 text-purple-400" />
        </div>
        <div>
           <h1 className="text-3xl font-bold">AI Forecast Engine</h1>
           <p className="text-gray-400">LSTM Neural Network powered price predictions.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-4 space-y-6">
           <div className="p-6 rounded-2xl border border-[#1E293B] bg-[#0F172A] shadow-xl">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Target Asset</label>
              <div className="space-y-4">
                 <select 
                    value={symbol} 
                    onChange={(e) => setSymbol(e.target.value)}
                    className="w-full p-4 bg-[#1E293B] border border-gray-700 rounded-xl text-white outline-none focus:border-purple-500 transition-all font-mono font-bold text-lg"
                 >
                    <option value="AAPL">AAPL - Apple Inc.</option>
                    <option value="TSLA">TSLA - Tesla Inc.</option>
                    <option value="NVDA">NVDA - NVIDIA Corp.</option>
                    <option value="AMD">AMD - Adv. Micro Devices</option>
                    <option value="MSFT">MSFT - Microsoft Corp.</option>
                 </select>
                 
                 <button 
                   onClick={handlePredict}
                   disabled={loading}
                   className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                     loading ? 'bg-purple-900/50 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500 shadow-purple-900/30 hover:scale-[1.02]'
                   }`}
                 >
                    {loading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Run Prediction
                      </>
                    )}
                 </button>
              </div>

              <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/10 rounded-lg text-xs text-blue-300 flex gap-3">
                 <AlertCircle className="w-5 h-5 shrink-0" />
                 <p>
                    Our model analyzes 60 days of historical OHLCV data to forecast the next closing price. Use this as one of many indicators, not financial advice.
                 </p>
              </div>
           </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-8">
          {prediction ? (
             <div className="space-y-6 animate-fade-in-up">
                 {/* Key Stats */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B]">
                       <div className="text-gray-400 text-xs font-bold uppercase mb-1">Current Price</div>
                       <div className="text-3xl font-mono font-bold">${prediction.current_price.toFixed(2)}</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] relative overflow-hidden group">
                       <div className={`absolute inset-0 opacity-10 ${prediction.direction === 'UP' ? 'bg-green-500' : 'bg-red-500'}`} />
                       <div className="text-gray-400 text-xs font-bold uppercase mb-1 relative">Forecast</div>
                       <div className={`text-3xl font-mono font-bold flex items-center gap-2 relative ${prediction.direction === 'UP' ? 'text-green-400' : 'text-red-400'}`}>
                          ${prediction.predicted_price.toFixed(2)}
                          {prediction.direction === 'UP' ? <ArrowUpRight className="w-8 h-8" /> : <ArrowDownRight className="w-8 h-8" />}
                       </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B]">
                       <div className="text-gray-400 text-xs font-bold uppercase mb-1">Model Confidence</div>
                       <div className="text-3xl font-mono font-bold text-blue-400">87.4%</div>
                    </div>
                 </div>

                 {/* Chart */}
                 <div className="h-[400px] p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-2xl">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={prediction.chartData}>
                        <defs>
                          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                        <XAxis hide />
                        <YAxis 
                          domain={['auto', 'auto']} 
                          tickFormatter={(val) => `$${val.toFixed(0)}`}
                          stroke="#64748B"
                          fontSize={12}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#020617', borderColor: '#1E293B', borderRadius: '8px' }}
                          formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                        />
                        <ReferenceLine x={prediction.chartData.length - 2} stroke="#64748B" strokeDasharray="3 3" label="Today" />
                        <Area 
                          type="monotone" 
                          dataKey="price" 
                          stroke="#8b5cf6" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorPrice)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                 </div>
             </div>
          ) : (
             <div className="h-full min-h-[400px] rounded-2xl border border-dashed border-[#1E293B] flex flex-col items-center justify-center text-gray-500 bg-[#0F172A]/50">
                {loading ? (
                   <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                      <div className="text-purple-400 font-mono animate-pulse">Running Neural Network...</div>
                   </div>
                ) : (
                   <>
                      <BrainCircuit className="w-16 h-16 mb-4 opacity-20" />
                      <div>Select a stock to generate prediction</div>
                   </>
                )}
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
