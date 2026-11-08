"use client";

import React from "react";
import { 
  BarChart3, LayoutGrid, Box, Video, 
  Backpack, Trophy, Sparkles, CheckCircle2,
  Tv2
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  matchesCount?: number;
  uploadedCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab,
  matchesCount = 43,
  uploadedCount = 3 
}) => {
  // Navigation Menu matching CSDEMO left sidebar structure
  // Explicitly omitting 'Explore' and 'Get the app' sections as requested
  const menuItems = [
    {
      id: "stats",
      label: "Stats",
      icon: BarChart3,
    },
    {
      id: "matches",
      label: "Matches",
      icon: LayoutGrid,
      badge: `${uploadedCount}/${matchesCount}`,
    },
    {
      id: "radar",
      label: "3D Demo View",
      icon: Box,
    },
    {
      id: "studio",
      label: "Clips",
      icon: Video,
      badge: "60 FPS",
    },
    {
      id: "loadouts",
      label: "Loadouts",
      icon: Backpack,
    },
    {
      id: "records",
      label: "Records",
      icon: Trophy,
    },
  ];

  return (
    <aside className="w-56 shrink-0 hidden md:block select-none">
      <div className="sticky top-20 space-y-4">
        {/* Main Navigation Panel (CSDEMO layout in Steam Aesthetic) */}
        <div className="bg-[#181d24]/95 border border-[#2a475e]/80 p-2.5 rounded-2xl shadow-xl backdrop-blur-md">
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                    isActive
                      ? "bg-gradient-to-r from-[#2c1d18] to-[#1f2937] text-[#ff7733] border border-[#ff5500]/50 shadow-md shadow-[#ff5500]/10"
                      : "text-[#8f98a0] hover:text-white hover:bg-[#203248]/50 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? "text-[#ff7733]" : "text-[#8f98a0]"
                      }`}
                    />
                    <span className={isActive ? "text-white" : ""}>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ${
                        isActive
                          ? "bg-[#ff5500] text-black"
                          : "bg-[#2a475e]/60 text-[#66c0f4]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* CS2 HLAE Recording Companion Mini Status Card */}
        <div className="bg-[#181d24]/90 border border-[#2a475e]/60 p-3 rounded-2xl text-[11px] text-[#8f98a0] space-y-2.5 shadow-lg">
          <div className="flex items-center justify-between text-white font-bold">
            <div className="flex items-center gap-1.5">
              <Tv2 className="w-3.5 h-3.5 text-[#a4d007]" />
              <span className="text-xs">Movie Engine</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[9px] text-[#a4d007] bg-[#a4d007]/10 px-1.5 py-0.5 rounded-full font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a4d007] animate-pulse" />
              ONLINE
            </span>
          </div>
          <p className="text-[10px] text-[#8f98a0] leading-relaxed">
            HLAE 60 FPS va CS2 `-insecure` kinematoqrafik videoni to&apos;g&apos;ridan-to&apos;g&apos;ri yozib olishga tayyor.
          </p>
          <div className="pt-1 border-t border-[#2a475e]/40 flex items-center justify-between text-[10px]">
            <span className="text-slate-400">FPS: <strong className="text-white">60</strong></span>
            <span className="text-slate-400">Sifat: <strong className="text-[#66c0f4]">1080p</strong></span>
            <span className="text-slate-400">VAC: <strong className="text-[#a4d007]">Xavfsiz</strong></span>
          </div>
        </div>
      </div>
    </aside>
  );
};
