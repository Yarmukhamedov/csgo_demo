"use client";

import React, { useState, useEffect } from "react";
import { MatchData } from "@/types/demo";
import { Play, Pause, RotateCcw, Map, Eye, Shield, Skull, Zap } from "lucide-react";

interface Radar2DProps {
  match: MatchData;
}

interface PlayerDot {
  id: string;
  name: string;
  team: "CT" | "T";
  x: number;
  y: number;
  isAlive: boolean;
  weapon: string;
}

export const Radar2D: React.FC<Radar2DProps> = ({ match }) => {
  const [selectedRound, setSelectedRound] = useState(18); // Default to round 18 (ACE)
  const [roundTime, setRoundTime] = useState(45); // 0 to 115 seconds
  const [isPlaying, setIsPlaying] = useState(false);

  // Playback timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setRoundTime((prev) => {
        if (prev >= 115) {
          setIsPlaying(false);
          return 115;
        }
        return prev + 1;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Dynamic positions calculation based on round time
  const tTimeRatio = roundTime / 115;

  // Mock player positions animated across Mirage
  const ctPlayers: PlayerDot[] = [
    {
      id: "ct-1",
      name: "S1Mple_UZ",
      team: "CT",
      x: 68 - tTimeRatio * 10,
      y: 35 + tTimeRatio * 8,
      isAlive: true,
      weapon: "AWP",
    },
    {
      id: "ct-2",
      name: "Tashkent_Sniper",
      team: "CT",
      x: 48 + tTimeRatio * 6,
      y: 42 + tTimeRatio * 4,
      isAlive: roundTime < 80,
      weapon: "M4A1-S",
    },
    {
      id: "ct-3",
      name: "Samarkand_Ace",
      team: "CT",
      x: 30 + tTimeRatio * 5,
      y: 70 - tTimeRatio * 10,
      isAlive: roundTime < 65,
      weapon: "M4A1-S",
    },
    {
      id: "ct-4",
      name: "Bukhara_Entry",
      team: "CT",
      x: 72,
      y: 40,
      isAlive: roundTime < 45,
      weapon: "MP9",
    },
    {
      id: "ct-5",
      name: "Cyber_Navoi",
      team: "CT",
      x: 35,
      y: 65,
      isAlive: roundTime < 35,
      weapon: "Famas",
    },
  ];

  const tPlayers: PlayerDot[] = [
    {
      id: "t-1",
      name: "Shox_Fergana",
      team: "T",
      x: 40 + tTimeRatio * 20,
      y: 40 - tTimeRatio * 4,
      isAlive: roundTime < 95,
      weapon: "AK-47",
    },
    {
      id: "t-2",
      name: "Andijan_Beast",
      team: "T",
      x: 55 + tTimeRatio * 10,
      y: 30 + tTimeRatio * 8,
      isAlive: roundTime < 88,
      weapon: "AK-47",
    },
    {
      id: "t-3",
      name: "Namangan_Clutcher",
      team: "T",
      x: 62 + tTimeRatio * 4,
      y: 38,
      isAlive: roundTime < 75,
      weapon: "Galil AR",
    },
    {
      id: "t-4",
      name: "Khiva_Ghost",
      team: "T",
      x: 45 + tTimeRatio * 15,
      y: 28,
      isAlive: roundTime < 60,
      weapon: "AK-47",
    },
    {
      id: "t-5",
      name: "Nukus_Shadow",
      team: "T",
      x: 35 + tTimeRatio * 25,
      y: 35,
      isAlive: roundTime < 40,
      weapon: "Mac-10",
    },
  ];

  const allPlayers = [...ctPlayers, ...tPlayers];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="rounded-2xl bg-[#0c101d] border border-slate-800 p-6 shadow-2xl space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
              <Map className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-black text-white">
              2D Xarita & Radar Replay (de_mirage)
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
              INTERAKTIV
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Raund davomidagi barcha o&apos;yinchilar joylashuvi, granatalar va kill chiziqlarini ko&apos;ring.
          </p>
        </div>

        {/* Round selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-400">Raund:</label>
          <select
            value={selectedRound}
            onChange={(e) => {
              setSelectedRound(Number(e.target.value));
              setRoundTime(30);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-amber-400 focus:outline-none focus:border-amber-400"
          >
            {[1, 4, 8, 11, 14, 18, 21, 23].map((r) => (
              <option key={r} value={r}>
                Raund {r} {r === 18 ? "(🔥 ACE 5K)" : r === 4 ? "(⚡ 1v3 Clutch)" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2D Tactical Map Box */}
      <div className="relative w-full max-w-2xl mx-auto aspect-square rounded-2xl bg-[#080c16] border-2 border-slate-800 overflow-hidden shadow-2xl">
        {/* Grid pattern background */}
        <div className="absolute inset-0 cs-grid-bg opacity-40" />

        {/* Tactical zones drawing (Mirage blueprint mock) */}
        {/* A Site */}
        <div className="absolute top-[28%] right-[25%] w-24 h-24 rounded-2xl border-2 border-dashed border-amber-500/30 bg-amber-500/5 flex items-center justify-center pointer-events-none">
          <span className="text-sm font-black text-amber-400/60 tracking-wider">A SITE</span>
        </div>

        {/* B Site */}
        <div className="absolute bottom-[22%] left-[20%] w-24 h-24 rounded-2xl border-2 border-dashed border-amber-500/30 bg-amber-500/5 flex items-center justify-center pointer-events-none">
          <span className="text-sm font-black text-amber-400/60 tracking-wider">B SITE</span>
        </div>

        {/* Mid Corridor */}
        <div className="absolute top-[40%] left-[42%] w-28 h-20 border border-slate-700/60 bg-slate-900/30 rounded-xl flex items-center justify-center pointer-events-none">
          <span className="text-xs font-bold text-slate-500 tracking-wider">MID</span>
        </div>

        {/* Palace */}
        <div className="absolute top-[18%] right-[15%] text-[10px] font-mono text-slate-500">
          PALACE
        </div>

        {/* Connector */}
        <div className="absolute top-[38%] right-[38%] text-[10px] font-mono text-slate-500">
          CONN
        </div>

        {/* Apartments */}
        <div className="absolute bottom-[35%] left-[12%] text-[10px] font-mono text-slate-500">
          B APTS
        </div>

        {/* Smoke Granade simulation */}
        {roundTime > 25 && roundTime < 85 && (
          <div className="absolute top-[35%] right-[32%] w-16 h-16 rounded-full bg-slate-400/25 blur-sm border border-slate-400/40 pointer-events-none animate-pulse flex items-center justify-center text-[9px] font-bold text-slate-300">
            SMOKE
          </div>
        )}

        {/* Bomb planted indicator */}
        {roundTime > 40 && (
          <div className="absolute top-[33%] right-[28%] w-5 h-5 rounded-full bg-rose-500 border border-rose-300 animate-ping" />
        )}

        {/* Kill line ray (S1mple_UZ shooting) */}
        {roundTime > 42 && roundTime < 50 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <line
              x1="65%"
              y1="38%"
              x2="55%"
              y2="34%"
              stroke="#00d2ff"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
          </svg>
        )}

        {/* Player Dots */}
        {allPlayers.map((p) => {
          if (!p.isAlive) {
            return (
              <div
                key={p.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 opacity-40 z-10"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <Skull className="w-3.5 h-3.5 text-rose-500" />
              </div>
            );
          }

          const isCT = p.team === "CT";
          return (
            <div
              key={p.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer transition-all duration-300"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              {/* Dot */}
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center text-[8px] font-black ${
                  isCT
                    ? "bg-sky-500 border-white text-black shadow-lg shadow-sky-500/50"
                    : "bg-orange-500 border-white text-black shadow-lg shadow-orange-500/50"
                }`}
              >
                {p.name[0]}
              </div>

              {/* Tooltip on hover */}
              <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 rounded bg-black/90 border border-slate-700 text-[10px] text-white whitespace-nowrap shadow-xl z-30">
                <span className={isCT ? "text-sky-400 font-bold" : "text-orange-400 font-bold"}>
                  {p.name}
                </span>{" "}
                ({p.weapon})
              </div>
            </div>
          );
        })}
      </div>

      {/* Scrubber Timeline Controls */}
      <div className="space-y-3 max-w-2xl mx-auto bg-slate-950/80 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">Raund Vaqti:</span>
          <span className="font-bold text-amber-400 text-sm">{formatTime(roundTime)} / 01:55</span>
        </div>

        {/* Range slider */}
        <input
          type="range"
          min="0"
          max="115"
          value={roundTime}
          onChange={(e) => setRoundTime(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />

        {/* Action buttons */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setRoundTime(0)}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
            title="Boshiga qaytish"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-md shadow-amber-500/20"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" /> To&apos;xtatish
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-black" /> Raundni Ko&apos;rish
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
