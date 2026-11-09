"use client";

import React from "react";
import { 
  Send, Bell, Globe, ChevronDown, Gamepad2, 
  Coins, ShieldCheck, Flame, UploadCloud 
} from "lucide-react";
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
    <header className="bg-[#171a21] border-b border-[#2a475e]/80 sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand Logo matching CSDEMO + Steam Style */}
          <div
            onClick={() => setActiveTab("matches")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Hexagonal Crosshair Logo Icon */}
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff5500] to-[#e64a00] text-black shadow-md shadow-[#ff5500]/20 group-hover:scale-105 transition-transform">
              <Gamepad2 className="w-5 h-5 stroke-[2.5]" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#a4d007] rounded-full border-2 border-[#171a21]" />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-wider text-white">
                CSDEMO<span className="text-[#66c0f4]">.UZ</span>
              </span>
              <span className="hidden sm:inline text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#2a475e] text-[#66c0f4] border border-[#66c0f4]/30 uppercase font-mono">
                STEAM EDITION
              </span>
            </div>
          </div>

          {/* Right: Actions bar exactly matching user screenshot */}
          <div className="flex items-center gap-3">
            {/* Telegram Pill Button */}
            <a
              href="https://t.me/csdemouz"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1b2838] hover:bg-[#203248] text-[#66c0f4] border border-[#2a475e] text-xs font-bold transition-all shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Our Telegram</span>
            </a>

            {/* Notification Bell */}
            <button
              onClick={() => alert("Barcha yangi matchlar sinxronlandi!")}
              className="p-2 rounded-full bg-[#1b2838] hover:bg-[#203248] text-[#8f98a0] hover:text-white border border-[#2a475e] transition-colors relative"
              title="Xabarnomalar"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ff5500] rounded-full" />
            </button>

            {/* Coin / ELO Counter Pill */}
            <div
              onClick={onOpenFaceitAuth}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1b2838] border border-[#2a475e] text-xs font-mono font-bold cursor-pointer hover:border-[#ff5500]/50 transition-colors"
              title="FACEIT ELO ochkolari"
            >
              <span className="w-3.5 h-3.5 rounded-full bg-[#ffaa00] flex items-center justify-center text-[9px] font-black text-black">
                ★
              </span>
              <span className="text-amber-400">{user.faceit_elo}</span>
            </div>

            {/* Language Switcher */}
            <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded-full bg-[#1b2838] border border-[#2a475e] text-[11px] text-[#8f98a0]">
              <span>🇺🇿</span>
              <span className="font-bold text-white">UZ</span>
            </div>

            {/* User Profile Badge (Steam In-Game Green Border) or Sign In button */}
            {user.is_logged_in ? (
              <div
                onClick={onOpenSteamAuth}
                className="flex items-center gap-2 bg-[#1b2838] hover:bg-[#203248] p-1.5 pr-3 rounded-full border border-[#2a475e] cursor-pointer transition-all shadow-md group"
              >
                {/* Avatar with In-Game Green Border */}
                <div className="w-7 h-7 rounded-full steam-in-game-border overflow-hidden bg-[#171a21]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user.avatar}
                    alt={user.nickname}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-white group-hover:text-[#66c0f4] transition-colors">
                    {user.nickname}
                  </span>
                  <ChevronDown className="w-3 h-3 text-[#8f98a0]" />
                </div>
              </div>
            ) : (
              <button
                onClick={onOpenSteamAuth}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1b2838] hover:bg-[#203248] border border-[#66c0f4]/50 text-white text-xs font-bold shadow-md hover:border-[#66c0f4] transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-[#a4d007]" />
                <span>Steam orqali kirish</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
