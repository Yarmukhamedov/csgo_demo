"use client";

import React from "react";
import { Download, Bell, MessageSquare, ShieldCheck, Flame, ChevronDown, Gamepad2 } from "lucide-react";
import { FaceitPlayer } from "@/types/faceit";

interface SteamHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: FaceitPlayer;
  onOpenSteamAuth: () => void;
  onOpenFaceitAuth: () => void;
}

export const SteamHeader: React.FC<SteamHeaderProps> = ({
  activeTab,
  setActiveTab,
  user,
  onOpenSteamAuth,
  onOpenFaceitAuth,
}) => {
  return (
    <header className="bg-[#171a21] border-b border-[#2a475e]/60 sticky top-0 z-50 shadow-xl">
      {/* Top Steam Utility bar (Install Steam / Notifications) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between text-[11px] text-[#b8b6b4] border-b border-[#212c3d]/60">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[#66c0f4]">
            <span className="w-2 h-2 rounded-full bg-[#a4d007] animate-pulse" />
            CS2 Demo Manager & Movie Studio
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Steam Cloud & FACEIT API bilan sinxronlangan</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onOpenFaceitAuth}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#ff5500]/20 hover:bg-[#ff5500]/30 text-[#ff7733] border border-[#ff5500]/40 font-bold transition-all text-[11px]"
          >
            <span className="w-2 h-2 rounded-full bg-[#ff5500]" />
            FACEIT Akkauntni O&apos;zgartirish
          </button>

          <a
            href="https://store.steampowered.com/about/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#212c3d] hover:bg-[#2a475e] text-[#b8b6b4] hover:text-white transition-colors"
          >
            <Download className="w-3 h-3 text-[#66c0f4]" />
            Steam&apos;ni O&apos;rnatish
          </a>
        </div>
      </div>

      {/* Main Steam Community Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Steam Logo & Main Links */}
          <div className="flex items-center gap-8">
            {/* Steam Logo Icon */}
            <div
              onClick={() => setActiveTab("matches")}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2a475e] to-[#171a21] border border-[#66c0f4]/40 flex items-center justify-center text-[#66c0f4] shadow-md group-hover:border-[#66c0f4] transition-all">
                <Gamepad2 className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-widest text-white uppercase font-sans">
                  STEAM<span className="text-[#66c0f4]"> COMMUNITY</span>
                </span>
                <div className="text-[10px] tracking-wider text-[#8f98a0] uppercase -mt-1 font-semibold">
                  CS2 Match & Highlight Manager
                </div>
              </div>
            </div>

            {/* Navigation Tabs (Steam-Style All-Caps) */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-bold tracking-wider uppercase">
              <button
                onClick={() => setActiveTab("matches")}
                className={`py-2 transition-colors border-b-2 ${
                  activeTab === "matches"
                    ? "text-[#66c0f4] border-[#66c0f4]"
                    : "text-[#b8b6b4] hover:text-white border-transparent"
                }`}
              >
                Matchlar (FACEIT)
              </button>

              <button
                onClick={() => setActiveTab("studio")}
                className={`py-2 transition-colors border-b-2 flex items-center gap-1.5 ${
                  activeTab === "studio"
                    ? "text-[#66c0f4] border-[#66c0f4]"
                    : "text-[#b8b6b4] hover:text-white border-transparent"
                }`}
              >
                <span>Rolik Studio</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-[#ff5500] text-black font-extrabold">
                  HOT
                </span>
              </button>

              <button
                onClick={() => setActiveTab("radar")}
                className={`py-2 transition-colors border-b-2 ${
                  activeTab === "radar"
                    ? "text-[#66c0f4] border-[#66c0f4]"
                    : "text-[#b8b6b4] hover:text-white border-transparent"
                }`}
              >
                2D Taktik Radar
              </button>

              <button
                onClick={() => setActiveTab("roadmap")}
                className={`py-2 transition-colors border-b-2 ${
                  activeTab === "roadmap"
                    ? "text-[#66c0f4] border-[#66c0f4]"
                    : "text-[#b8b6b4] hover:text-white border-transparent"
                }`}
              >
                Roadmap
              </button>
            </nav>
          </div>

          {/* Right Section: User Profile Card (Steam In-Game Avatar Box) */}
          <div className="flex items-center gap-4">
            {user.is_logged_in ? (
              <div className="flex items-center gap-3 bg-[#1b2838] p-2 pr-3 rounded-sm border border-[#2a475e] shadow-md">
                {/* Avatar with In-Game Green Border */}
                <div className="relative">
                  <div className="w-10 h-10 rounded-sm steam-in-game-border overflow-hidden bg-[#171a21]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={user.avatar}
                      alt={user.nickname}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 px-1 py-0.2 text-[8px] font-black bg-[#ff5500] text-white rounded">
                    {user.skill_level}
                  </span>
                </div>

                {/* Nickname & In-Game Status */}
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white hover:text-[#66c0f4] cursor-pointer">
                      {user.nickname}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#2a475e] text-[#66c0f4] font-mono font-bold">
                      {user.faceit_elo} ELO
                    </span>
                  </div>
                  <div className="text-[10px] text-[#a4d007] font-semibold flex items-center gap-1">
                    <span>O&apos;yinda: Counter-Strike 2</span>
                  </div>
                </div>

                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
            ) : (
              <button
                onClick={onOpenSteamAuth}
                className="btn-steam-green px-4 py-2 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Steam Bilan Kirish</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
