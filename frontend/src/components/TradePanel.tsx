import { useState } from 'react';
import { useTrading } from '@/context/TradingContext';

export default function TradePanel() {
  const { symbol, price, refreshPortfolio } = useTrading();
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'buy' | 'sell'>('buy');
  const [loading, setLoading] = useState(false);

  const handleTrade = async () => {
    if (!amount) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/trade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol,
          type,
          qty: parseInt(amount),
          price
        })
      });
      const data = await res.json();
      if (data.error) {
        alert("Trade Failed: " + data.error);
      } else {
        alert("Trade Executed Successfully!");
        setAmount('');
        refreshPortfolio();
      }
    } catch (e) {
      alert("Network Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#1E293B]/20 p-4 mb-4">
      <div className="flex gap-2 mb-4 bg-[#0F172A] p-1 rounded-lg border border-[#1E293B]">
        <button
          onClick={() => setType('buy')}
          className={`flex-1 py-2 rounded-md font-semibold text-sm transition-all ${
            type === 'buy' 
              ? 'bg-green-600 text-white shadow-lg shadow-green-900/20' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Buy {symbol}
        </button>
        <button
          onClick={() => setType('sell')}
          className={`flex-1 py-2 rounded-md font-semibold text-sm transition-all ${
            type === 'sell' 
              ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Sell {symbol}
        </button>
      </div>

      <div className="space-y-4">
        <div>
           <div className="flex justify-between text-xs text-gray-400 mb-1">
              <label>Order Type</label>
              <span>Market @ ${price.toFixed(2)}</span>
           </div>
           <select className="w-full bg-[#0F172A] border border-[#1E293B] rounded-lg p-2.5 text-white text-sm focus:border-blue-500 outline-none appearance-none">
              <option>Market Order</option>
           </select>
        </div>

        <div>
           <div className="flex justify-between text-xs text-gray-400 mb-1">
              <label>Quantity</label>
           </div>
           <div className="relative">
             <input
               type="number"
               value={amount}
               onChange={(e) => setAmount(e.target.value)}
               className="w-full bg-[#0F172A] border border-[#1E293B] rounded-lg p-2.5 text-white text-sm font-mono focus:border-blue-500 outline-none"
               placeholder="0"
             />
             <span className="absolute right-3 top-2.5 text-xs text-gray-500 font-bold">SHARES</span>
           </div>
        </div>

        <div className="pt-2">
           <div className="flex justify-between text-xs mb-2">
              <span className="text-gray-400">Est. Cost</span>
              <span className="font-mono font-bold text-white">${(Number(amount) * price).toFixed(2)}</span>
           </div>
           <button
             onClick={handleTrade}
             disabled={loading}
             className={`w-full py-3 rounded-lg font-bold text-white text-sm transition-all shadow-lg hover:brightness-110 active:scale-[0.98] ${
               type === 'buy' ? 'bg-green-600 shadow-green-900/30' : 'bg-red-600 shadow-red-900/30'
             } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
           >
             {loading ? 'PROCESSING...' : (type === 'buy' ? 'CONFIRM BUY' : 'CONFIRM SELL')}
           </button>
        </div>
      </div>
    </div>
  );
}
