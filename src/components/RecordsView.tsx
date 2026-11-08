"use client";

import React from "react";
import { FaceitMatchItem } from "@/types/faceit";
import { Trophy, Flame, Zap, Award, Target, Crosshair, Crown } from "lucide-react";

interface RecordsViewProps {
  matches: FaceitMatchItem[];
}

export const RecordsView: React.FC<RecordsViewProps> = ({ matches }) => {
  const records = [
    {
      title: "Bir Matchda Eng Ko'p Kill",
      value: "38 Kills",
      match: "de_mirage (16:14)",
      date: "28 Oktabr 2026",
      icon: Trophy,
      badge: "KARYERA REKORDI",
      color: "#ffaa00",
    },
    {
      title: "Eng Yuqori HLTV 2.1 Reytingi",
      value: "2.14 Rating",
      match: "de_dust2 (13:3)",
      date: "02 Noyabr 2026",
      icon: Crown,
      badge: "GOD MODE",
      color: "#a4d007",
    },
    {
      title: "Eng Ko'p Ace (1v5 / 5 Kills)",
      value: "14 Aces",
      match: "CS2 Karyerasi",
      date: "2026 Mavsum",
      icon: Flame,
      badge: "HIGHLIGHT MACHINE",
      color: "#ff5500",
    },
    {
      title: "Eng Uzoq G'alaba Seriyasi",
      value: "8 Ketma-ket Win",
      match: "FACEIT Level 10 ELO",
      date: "15-22 Oktabr 2026",
      icon: Zap,
      badge: "UNSTOPPABLE",
      color: "#66c0f4",
    },
    {
      title: "Eng Yuqori ADR (O'rtacha Ziyon)",
      value: "142.6 ADR",
      match: "de_ancient (13:5)",
      date: "25 Oktabr 2026",
      icon: Target,
      badge: "DAMAGE LEADER",
      color: "#ec4899",
    },
    {
      title: "1vX Clutch G'alabalari",
      value: "32 Ta Yutilgan Clutch",
      match: "1v1, 1v2, 1v3 holatlari",
      date: "2026 Mavsum",
      icon: Award,
      badge: "CLUTCH MASTER",
      color: "#8b5cf6",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-black text-white tracking-wide">Player Records & Achievements</h1>
        <p className="text-xs text-[#8f98a0] mt-1 font-mono">
          CS2 va FACEIT rasmiy o&apos;yinlaridagi eng oliy shaxsiy natijalar
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {records.map((r, idx) => {
          const Icon = r.icon;

          return (
            <div
              key={idx}
              className="bg-[#181d24] border border-[#2a475e]/80 rounded-2xl p-5 shadow-xl hover:border-[#66c0f4] transition-all relative overflow-hidden group"
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-[9px] font-black px-2 py-0.5 rounded-full font-mono uppercase tracking-wider"
                  style={{ backgroundColor: `${r.color}20`, color: r.color }}
                >
                  {r.badge}
                </span>

                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${r.color}20` }}
                >
                  <Icon className="w-4 h-4" style={{ color: r.color }} />
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs text-[#8f98a0] font-bold">
                  {r.title}
                </div>
                <div className="text-2xl font-black text-white font-mono mt-1">
                  {r.value}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-[#2a475e]/50 flex items-center justify-between text-[11px] text-[#8f98a0]">
                <span>{r.match}</span>
                <span className="font-mono">{r.date}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
