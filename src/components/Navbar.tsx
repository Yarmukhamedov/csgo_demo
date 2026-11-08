"use client";

import React, { useState } from "react";
import { Crosshair, Video, BarChart3, Map, Sparkles, Send, ShieldCheck, Flame } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenUpload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenUpload }) => {
  const [steamConnected, setSteamConnected] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#07090e]/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab("overview")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Crosshair className="w-6 h-6 stroke-[2.5]" />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#07090e]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-wider text-white">
                  CSDEMO<span className="text-amber-400">.UZ</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  BETA
                </span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-1 hidden sm:block">
                CS2 Highlight & Match Rolik Maker
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "overview"
                  ? "bg-amber-500 text-black shadow-sm shadow-amber-500/20"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Match Tahlili
            </button>

            <button
              onClick={() => setActiveTab("studio")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "studio"
                  ? "bg-amber-500 text-black shadow-sm shadow-amber-500/20"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              Rolik Studio (Reels)
              <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                PRO
              </span>
            </button>

            <button
              onClick={() => setActiveTab("radar")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "radar"
                  ? "bg-amber-500 text-black shadow-sm shadow-amber-500/20"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              2D Xarita Replay
            </button>

            <button
              onClick={() => setActiveTab("roadmap")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "roadmap"
                  ? "bg-amber-500 text-black shadow-sm shadow-amber-500/20"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              Roadmap
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenUpload}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:brightness-110 active:scale-95 transition-all shadow-md shadow-amber-500/20"
            >
              <Sparkles className="w-3.5 h-3.5 fill-black" />
              <span className="hidden sm:inline">Demo Yuklash</span>
              <span className="sm:hidden">Yuklash</span>
            </button>

            <button
              onClick={() => setSteamConnected(!steamConnected)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                steamConnected
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600"
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">
                {steamConnected ? "S1Mple_UZ (Steam)" : "Steam Bilan Kirish"}
              </span>
            </button>

            <a
              href="https://t.me/csdemouz"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 border border-sky-500/20 transition-all"
              title="Telegram Bot"
            >
              <Send className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
