"use client";

import { useEffect, useState } from 'react';
import { Newspaper, ExternalLink, Clock } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  publisher: string;
  link: string;
  pubDate: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const symbols = ['AAPL', 'NVDA', 'TSLA', 'MSFT'];
        const allNews: NewsItem[] = [];
        
        for (const sym of symbols) {
            const res = await fetch(`${API_URL}/api/news/${sym}`);
            const json = await res.json();
            if (Array.isArray(json)) {
                // Map yfinance structure to our interface
                const mapped = json.map((item: any) => {
                   // Some items might be directly the article (old yf) or nested in content (new yf)
                   const art = item.content || item;
                   return {
                       id: art.id || Math.random().toString(),
                       title: art.title,
                       publisher: art.provider?.displayName || 'Unknown',
                       link: art.clickThroughUrl?.url || art.canonicalUrl?.url || '#',
                       pubDate: art.pubDate || new Date().toISOString()
                   };
                });
                allNews.push(...mapped);
            }
        }

        const uniqueNews = Array.from(new Map(allNews.map(item => [item.title, item])).values());
        uniqueNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
        
        setNews(uniqueNews);
      } catch (e) {
        console.error("Failed to fetch news", e);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="p-8 pb-32">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Market Pulse</h1>
        <p className="text-gray-400">Real-time financial headlines from major networks.</p>
      </div>

      {loading ? (
          <div className="grid gap-4">
             {[1,2,3,4].map(i => (
                 <div key={i} className="h-24 bg-[#1E293B]/50 animate-pulse rounded-xl border border-[#1E293B]" />
             ))}
          </div>
      ) : (
          <div className="grid gap-4">
            {news.map((item) => (
              <a 
                key={item.id || item.title} 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-[#1E293B]/30 border border-[#1E293B] rounded-xl p-6 hover:bg-[#1E293B]/50 transition-all hover:border-blue-500/30 group"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-blue-400 mb-2 font-medium uppercase tracking-wider">
                      <Newspaper className="w-3 h-3" />
                      {item.publisher}
                    </div>
                    <h2 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {item.title}
                    </h2>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-4">
                       <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(item.pubDate).toLocaleString()}
                       </span>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors shrink-0" />
                </div>
              </a>
            ))}
            {news.length === 0 && <div className="text-center text-gray-500">No news available at the moment.</div>}
          </div>
      )}
    </div>
  );
}
