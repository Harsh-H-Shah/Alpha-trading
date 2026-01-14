import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { TradingProvider } from "@/context/TradingContext";

const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: "Alpha Trading",
  description: "Master the markets with AI and education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased bg-[#020617]`}>
        <TradingProvider>
          <Sidebar />
          <div className="lg:pl-64 min-h-screen text-white selection:bg-blue-500/30">
              {children}
          </div>
        </TradingProvider>
      </body>
    </html>
  );
}
