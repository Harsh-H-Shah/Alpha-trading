import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTrading } from '@/context/TradingContext';
import { Microscope, X, TrendingUp, Activity } from 'lucide-react';

export default function StockChart() {
  const { symbol, setPrice } = useTrading();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const [interval, setInterval] = useState('1d');
  const [period, setPeriod] = useState('1mo');

  const handleAnalyze = async () => {
      setShowAnalysis(true);
      if (analysis && analysis.symbol === symbol) return; // Cache hit
      
      setAnalyzing(true);
      try {
          const res = await fetch(`http://localhost:8000/api/analyze/${symbol}`);
          const json = await res.json();
          setAnalysis(json);
      } catch (e) {
          console.error(e);
      } finally {
          setAnalyzing(false);
      }
  };

  const timeframes = [
    { label: '1M', value: '1m', p: '1d' }, 
    { label: '5M', value: '5m', p: '5d' },
    { label: '15M', value: '15m', p: '5d' },
    { label: '1H', value: '60m', p: '1mo' },
    { label: '1D', value: '1d', p: '1mo' },
    { label: '1W', value: '1wk', p: '1y' },
  ];

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:8000/api/history/${symbol}?period=${period}&interval=${interval}`);
        if (!res.ok) throw new Error("Backend connection failed");
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        setData(json);
        if (json.length > 0) {
           setPrice(json[json.length - 1].price);
        }
      } catch (e) {
        console.error("Failed to fetch chart data", e);
        setData([]);
        setError("Unable to connect to Trading Engine (Backend). Ensure 'uvicorn' is running.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [symbol, interval, period]);

  // Reset analysis when symbol changes
  useEffect(() => { setAnalysis(null); setShowAnalysis(false); }, [symbol]);

  if (loading) return <div className="h-full w-full flex items-center justify-center text-gray-500 animate-pulse">Loading Market Data...</div>;
  if (error) return <div className="h-full w-full flex items-center justify-center text-red-500 font-mono text-sm">{error}</div>;

  const isGreen = data.length > 0 && data[data.length - 1].price >= data[0].price;
  const color = isGreen ? '#22C55E' : '#EF4444';

  return (
    <div className="w-full h-full min-h-[300px] flex flex-col relative">
       {/* Analysis Modal */}
       {showAnalysis && (
           <div className="absolute inset-0 z-50 bg-[#020617]/90 backdrop-blur-sm flex items-center justify-center p-8 transition-all animate-fade-in">
               <div className="bg-[#0F172A] border border-[#1E293B] p-6 rounded-2xl max-w-md w-full shadow-2xl relative">
                  <button 
                    onClick={() => setShowAnalysis(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                  >
                      <X className="w-5 h-5" />
                  </button>
                  
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                     <Microscope className="w-6 h-6 text-blue-500" />
                     Technical Analysis
                  </h3>

                  {analyzing ? (
                      <div className="py-12 flex flex-col items-center justify-center gap-3 text-blue-400">
                          <span className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          <span>Scanning Indicators...</span>
                      </div>
                  ) : analysis ? (
                      <div className="space-y-4">
                          <div className="p-4 bg-[#1E293B]/50 rounded-xl border border-[#1E293B]">
                             <pre className="font-sans text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                                {analysis.summary}
                             </pre>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                             <div className="p-3 bg-[#1E293B] rounded-lg">
                                <span className="text-xs text-gray-400 uppercase">Trend</span>
                                <div className={`font-bold ${analysis.trend === 'Bullish' ? 'text-green-400' : 'text-red-400'}`}>{analysis.trend}</div>
                             </div>
                             <div className="p-3 bg-[#1E293B] rounded-lg">
                                <span className="text-xs text-gray-400 uppercase">RSI</span>
                                <div className="font-bold text-white">{analysis.rsi ? analysis.rsi.toFixed(2) : 'N/A'}</div>
                             </div>
                          </div>
                      </div>
                  ) : (
                      <div className="text-red-400">Analysis Unavailable</div>
                  )}
               </div>
           </div>
       )}

       <div className="flex gap-2 mb-4 justify-between items-center">
         <div className="flex gap-2">
            {timeframes.map((tf) => (
                <button
                key={tf.label}
                onClick={() => { setInterval(tf.value); setPeriod(tf.p); }}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                    interval === tf.value 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
                >
                {tf.label}
                </button>
            ))}
         </div>
         
         <button 
           onClick={handleAnalyze}
           className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-md text-xs font-bold flex items-center gap-1 shadow-lg shadow-purple-500/20 transition-all"
         >
            <Microscope className="w-3 h-3" />
            Analyze
         </button>
       </div>

      <div className="flex-1 w-full min-h-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#94A3B8" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false} 
            minTickGap={30}
          />
          <YAxis 
            stroke="#94A3B8" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false} 
            domain={['auto', 'auto']}
            tickFormatter={(val) => `$${val.toFixed(0)}`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', color: '#fff', borderRadius: '8px' }} 
            itemStyle={{ color: color }}
            formatter={(value: any) => {
              if (typeof value === 'number') return [`$${value.toFixed(2)}`, 'Price'];
              return [value, 'Price'];
            }}
            labelStyle={{ color: '#94A3B8' }}
          />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke={color} 
            strokeWidth={2} 
            fillOpacity={1} 
            fill="url(#colorPrice)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}
