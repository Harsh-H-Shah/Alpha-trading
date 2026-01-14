"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/news", label: "News" },
    { href: "/learn", label: "Learn" },
    { href: "/patterns", label: "Patterns" },
    { href: "/prediction", label: "AI Prediction" },
  ];

  if (pathname === '/' || pathname === '/login' || pathname === '/signup') return null;

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className="glass-card rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl shadow-blue-900/10">
        <Link href="/" className="font-bold text-lg tracking-tight hover:opacity-80 transition">
          Alpha<span className="text-blue-500">.ai</span>
        </Link>
        <div className="flex gap-1 bg-white/5 p-1 rounded-full border border-white/5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
                pathname === link.href 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold border border-white/10 shadow-inner">
            HS
        </div>
      </div>
    </nav>
  );
}
