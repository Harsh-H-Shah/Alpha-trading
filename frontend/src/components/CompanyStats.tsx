"use client";

import { Info } from 'lucide-react';

export default function CompanyStats() {
  const stats = [
    { label: "Market Cap", value: "2.5T" },
    { label: "P/E Ratio", value: "28.5" },
    { label: "Div Yield", value: "0.5%" },
    { label: "Avg Vol", value: "52M" },
    { label: "Sector", value: "Tech" },
    { label: "Beta", value: "1.2" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border-t border-[#1E293B] bg-[#0F172A]">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-[#1E293B]/30 rounded-lg p-3 border border-[#1E293B]">
          <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
             {stat.label}
             <Info className="w-3 h-3 text-gray-600" />
          </div>
          <div className="text-sm font-bold text-white font-mono">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}
