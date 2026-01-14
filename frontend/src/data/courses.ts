export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  modules: { title: string; content: string }[];
}

export const courses: Course[] = [
  {
    id: "intro-trading",
    title: "Introduction to Trading",
    description: "Learn the basics of stock markets, candlesticks, and how to place your first trade.",
    level: "Beginner",
    duration: "2 Hours",
    modules: [
        { title: "What is the Stock Market?", content: "The stock market is a venue where buyers and sellers..." },
        { title: "Understanding Price Action", content: "Price action refers to the movement of a security's price..." }
    ]
  },
  {
    id: "technical-analysis",
    title: "Technical Analysis Masterclass",
    description: "Master charts, indicators (RSI, MAXD), and price patterns.",
    level: "Intermediate",
    duration: "4 Hours",
    modules: [
        { title: "Candlestick Patterns", content: "Doji, Hammer, Engulfing patterns explain market sentiment..." },
        { title: "Trendlines & Channels", content: "Drawing trendlines helps identify support and resistance..." }
    ]
  },
  {
    id: "risk-management",
    title: "Risk Management & Psychology",
    description: "Protect your capital and master the mental game of trading.",
    level: "Advanced",
    duration: "3 Hours",
    modules: [
        { title: "Position Sizing", content: "Never risk more than 1-2% of your capital on a single trade..." },
        { title: "Trading Psychology", content: "FOMO and revenge trading are the biggest enemies of a trader..." }
    ]
  }
];
