"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { LayoutDashboard, Newspaper, GraduationCap, Activity, BrainCircuit, Settings, LogOut, Globe } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Terminal", icon: LayoutDashboard },
    { href: "/explorer", label: "Markets", icon: Globe },
    { href: "/news", label: "Market Pulse", icon: Newspaper },
    { href: "/learn", label: "Academy", icon: GraduationCap },
    { href: "/patterns", label: "Patterns", icon: Activity },
    { href: "/prediction", label: "AI Forecast", icon: BrainCircuit },
  ];

  if (pathname === '/' || pathname === '/login' || pathname === '/signup') return null;

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-20 lg:w-64 bg-[#0F172A] border-r border-[#1E293B] flex flex-col z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shrink-0">
          A
        </div>
        <span className="font-bold text-xl tracking-tight hidden lg:block text-white">
          Alpha<span className="text-blue-500">Trading</span>
        </span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-blue-600/10 text-blue-500" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className={clsx("w-5 h-5", isActive ? "text-blue-500" : "text-gray-400 group-hover:text-white")} />
              <span className={clsx("font-medium hidden lg:block", isActive ? "text-white" : "")}>
                {link.label}
              </span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 hidden lg:block shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#1E293B]">
        <button className="flex items-center gap-3 px-3 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl w-full transition-colors group">
          <Settings className="w-5 h-5" />
          <span className="hidden lg:block font-medium">Settings</span>
        </button>
        <button className="flex items-center gap-3 px-3 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl w-full transition-colors mt-1 group">
          <LogOut className="w-5 h-5" />
          <span className="hidden lg:block font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
