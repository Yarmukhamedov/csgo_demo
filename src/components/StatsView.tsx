"use client";

import React from "react";
import { FaceitPlayer, FaceitMatchItem } from "@/types/faceit";
import { 
  BarChart3, Trophy, Flame, Target, Shield, 
  TrendingUp, Crosshair, Award, ArrowUpRight 
} from "lucide-react";
import { getMapThumbnail } from "@/lib/maps-data";

interface StatsViewProps {
  user: FaceitPlayer;
  matches: FaceitMatchItem[];
}

export const StatsView: React.FC<StatsViewProps> = ({ user, matches }) => {
  const mapStats = [
    { name: "Dust2", matches: 124, winRate: 71, kd: 1.42, color: "#f59e0b" },
    { name: "Mirage", matches: 182, winRate: 68, kd: 1.38, color: "#38bdf8" },
    { name: "Inferno", matches: 96, winRate: 62, kd: 1.25, color: "#ef4444" },
    { name: "Ancient", matches: 58, winRate: 60, kd: 1.29, color: "#10b981" },
    { name: "Nuke", matches: 42, winRate: 55, kd: 1.18, color: "#6366f1" },
    { name: "Anubis", matches: 34, winRate: 50, kd: 1.21, color: "#ec4899" },
  ];

  const weaponStats = [
    { name: "AK-47", kills: 1482, hsRate: 64, accuracy: 24.2, icon: "🎯" },
    { name: "AWP", kills: 980, hsRate: 18, accuracy: 76.5, icon: "🔭" },
    { name: "M4A1-S", kills: 745, hsRate: 58, accuracy: 28.1, icon: "⚡" },
    { name: "Desert Eagle", kills: 312, hsRate: 82, accuracy: 31.4, icon: "💥" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-wide">Player Statistics</h1>
        <p className="text-xs text-[#8f98a0] mt-1">
          {user.nickname} ning FACEIT va CS2 karyera ko&apos;rsatkichlari tahlili
        </p>
      </div>

      {/* Overview 4-Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#181d24] border border-[#2a475e]/80 p-4 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="text-[11px] font-bold text-[#8f98a0] uppercase tracking-wider flex items-center justify-between">
            <span>FACEIT ELO</span>
            <span className="text-[#ff5500] font-black text-xs">LVL 10</span>
          </div>
          <div className="text-3xl font-black text-white font-mono mt-2">
            {user.faceit_elo}
          </div>
          <div className="text-[11px] text-[#a4d007] mt-1 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Top 0.8% O&apos;zbekiston</span>
          </div>
        </div>

        <div className="bg-[#181d24] border border-[#2a475e]/80 p-4 rounded-2xl shadow-lg">
          <div className="text-[11px] font-bold text-[#8f98a0] uppercase tracking-wider">
            G&apos;alaba Foizi (Winrate)
          </div>
          <div className="text-3xl font-black text-[#a4d007] font-mono mt-2">
            {user.win_rate}%
          </div>
          <div className="text-[11px] text-[#8f98a0] mt-1">
            Jami {user.total_matches} ta o&apos;yindan
          </div>
        </div>

        <div className="bg-[#181d24] border border-[#2a475e]/80 p-4 rounded-2xl shadow-lg">
          <div className="text-[11px] font-bold text-[#8f98a0] uppercase tracking-wider">
            O&apos;rtacha K/D
          </div>
          <div className="text-3xl font-black text-[#66c0f4] font-mono mt-2">
            {user.kd_ratio}
          </div>
          <div className="text-[11px] text-slate-300 mt-1">
            +0.12 so&apos;nggi 20 o&apos;yinda
          </div>
        </div>

        <div className="bg-[#181d24] border border-[#2a475e]/80 p-4 rounded-2xl shadow-lg">
          <div className="text-[11px] font-bold text-[#8f98a0] uppercase tracking-wider">
            Headshot Foizi
          </div>
          <div className="text-3xl font-black text-[#ffaa00] font-mono mt-2">
            58.4%
          </div>
          <div className="text-[11px] text-[#ff7733] mt-1 font-bold">
            {user.current_streak} o&apos;yinlik g&apos;alaba seriyasi 🔥
          </div>
        </div>
      </div>

      {/* Map Pool Breakdown */}
      <div className="bg-[#181d24] border border-[#2a475e]/80 p-5 rounded-2xl shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#2a475e]/60 pb-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Target className="w-4 h-4 text-[#66c0f4]" />
            <span>Map Pool Tahlili</span>
          </div>
          <span className="text-xs text-[#8f98a0]">Faol xaritalar bo&apos;yicha</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mapStats.map((map) => (
            <div key={map.name} className="bg-[#13171e] p-3.5 rounded-xl border border-[#2a475e]/50 space-y-2 group/stat hover:border-[#66c0f4]/50 transition-colors">
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg overflow-hidden border border-[#2a475e]/80 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getMapThumbnail(map.name)}
                      alt={map.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span>{map.name}</span>
                </div>
                <span className="font-mono text-[#a4d007]">{map.winRate}% Win</span>
              </div>
              <div className="w-full bg-[#171a21] h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${map.winRate}%`, backgroundColor: map.color }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#8f98a0]">
                <span>{map.matches} ta match</span>
                <span>K/D: <strong className="text-slate-200">{map.kd}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weapons Efficiency */}
      <div className="bg-[#181d24] border border-[#2a475e]/80 p-5 rounded-2xl shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#2a475e]/60 pb-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Crosshair className="w-4 h-4 text-[#ff5500]" />
            <span>Eng Ko&apos;p O&apos;ldirilgan Qurollar (Top Weapons)</span>
          </div>
          <span className="text-xs text-[#8f98a0]">CS2 StatTrak hisoboti</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {weaponStats.map((w) => (
            <div key={w.name} className="bg-[#13171e] p-4 rounded-xl border border-[#2a475e]/50 space-y-1 text-center">
              <div className="text-2xl mb-1">{w.icon}</div>
              <div className="font-bold text-white text-sm">{w.name}</div>
              <div className="text-lg font-black text-[#66c0f4] font-mono">{w.kills} kills</div>
              <div className="text-[11px] text-[#8f98a0] pt-1 border-t border-[#2a475e]/40 flex justify-between">
                <span>HS: <strong className="text-white">{w.hsRate}%</strong></span>
                <span>Aniq: <strong className="text-white">{w.accuracy}%</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
