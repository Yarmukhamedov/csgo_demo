"use client";

import React, { useState, useEffect } from "react";
import { MatchData } from "@/types/demo";
import { 
  Play, Pause, RotateCcw, Map, Eye, Shield, Skull, Zap, 
  Flame, Crosshair, FastForward, Activity, Layers, Radio, Award
} from "lucide-react";
import { CS2_MAPS, SAMPLE_HEATMAP, SAMPLE_OPENING_DUELS } from "@/lib/maps-data";

interface Radar2DProps {
  match: MatchData;
}

interface PlayerDot {
  id: string;
  name: string;
  team: "CT" | "T";
  x: number;
  y: number;
  hp: number;
  isAlive: boolean;
  weapon: string;
}

export const Radar2D: React.FC<Radar2DProps> = ({ match }) => {
  const [selectedMapKey, setSelectedMapKey] = useState<string>("de_mirage");
  const [selectedRound, setSelectedRound] = useState(18); // Default round 18 (ACE)
  const [roundTime, setRoundTime] = useState(38); // 0 to 115 seconds
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 2 | 4>(1);

  // Layer toggles
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showUtilities, setShowUtilities] = useState(true);
  const [showCallouts, setShowCallouts] = useState(true);
  const [showKillRays, setShowKillRays] = useState(true);
  const [activeTab, setActiveTab] = useState<"radar" | "duels">("radar");

  const currentMap = CS2_MAPS[selectedMapKey] || CS2_MAPS["de_mirage"];

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
    }, 150 / playbackSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const tTimeRatio = roundTime / 115;

  // Animated players based on round time
  const ctPlayers: PlayerDot[] = [
    {
      id: "ct-1",
      name: "S1Mple_UZ",
      team: "CT",
      x: 68 - tTimeRatio * 12,
      y: 34 + tTimeRatio * 8,
      hp: 100,
      isAlive: true,
      weapon: "AWP",
    },
    {
      id: "ct-2",
      name: "Tashkent_Sniper",
      team: "CT",
      x: 48 + tTimeRatio * 8,
      y: 42 + tTimeRatio * 5,
      hp: roundTime > 75 ? 0 : 68,
      isAlive: roundTime < 75,
      weapon: "M4A1-S",
    },
    {
      id: "ct-3",
      name: "Samarkand_Ace",
      team: "CT",
      x: 30 + tTimeRatio * 6,
      y: 70 - tTimeRatio * 12,
      hp: roundTime > 62 ? 0 : 45,
      isAlive: roundTime < 62,
      weapon: "M4A1-S",
    },
    {
      id: "ct-4",
      name: "Bukhara_Entry",
      team: "CT",
      x: 74,
      y: 38,
      hp: roundTime > 42 ? 0 : 90,
      isAlive: roundTime < 42,
      weapon: "MP9",
    },
    {
      id: "ct-5",
      name: "Cyber_Navoi",
      team: "CT",
      x: 35,
      y: 65,
      hp: roundTime > 32 ? 0 : 100,
      isAlive: roundTime < 32,
      weapon: "FAMAS",
    },
  ];

  const tPlayers: PlayerDot[] = [
    {
      id: "t-1",
      name: "Shox_Fergana",
      team: "T",
      x: 42 + tTimeRatio * 20,
      y: 40 - tTimeRatio * 5,
      hp: roundTime > 92 ? 0 : 85,
      isAlive: roundTime < 92,
      weapon: "AK-47",
    },
    {
      id: "t-2",
      name: "Andijan_Beast",
      team: "T",
      x: 54 + tTimeRatio * 12,
      y: 32 + tTimeRatio * 8,
      hp: roundTime > 84 ? 0 : 100,
      isAlive: roundTime < 84,
      weapon: "AK-47",
    },
    {
      id: "t-3",
      name: "Namangan_Clutcher",
      team: "T",
      x: 64 + tTimeRatio * 4,
      y: 38,
      hp: roundTime > 72 ? 0 : 50,
      isAlive: roundTime < 72,
      weapon: "Galil AR",
    },
    {
      id: "t-4",
      name: "Khiva_Ghost",
      team: "T",
      x: 46 + tTimeRatio * 15,
      y: 28,
      hp: roundTime > 58 ? 0 : 100,
      isAlive: roundTime < 58,
      weapon: "AK-47",
    },
    {
      id: "t-5",
      name: "Nukus_Shadow",
      team: "T",
      x: 36 + tTimeRatio * 25,
      y: 36,
      hp: roundTime > 38 ? 0 : 35,
      isAlive: roundTime < 38,
      weapon: "MAC-10",
    },
  ];

  const ctAliveCount = ctPlayers.filter((p) => p.isAlive).length;
  const tAliveCount = tPlayers.filter((p) => p.isAlive).length;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const isBombPlanted = roundTime >= 40;
  const bombCountdown = Math.max(0, 40 - (roundTime - 40));

  return (
    <div className="rounded-2xl bg-[#0b0f19] border border-slate-800 p-6 shadow-2xl space-y-6">
      {/* Top Header & Map Selection */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-sky-500/20 text-sky-400">
              <Map className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                2D Taktik Radar & Replay Studio
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  FAZA 3
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                O&apos;yinchilar marshruti, tutunlar, olovlar va otishmalar nuqtasi (Heatmap).
              </p>
            </div>
          </div>
        </div>

        {/* Map Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {Object.keys(CS2_MAPS).map((mapKey) => {
            const m = CS2_MAPS[mapKey];
            const isSelected = selectedMapKey === mapKey;
            return (
              <button
                key={mapKey}
                onClick={() => setSelectedMapKey(mapKey)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isSelected
                    ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                    : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {m.displayName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-nav: Radar vs Opening Duels analytics */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("radar")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "radar"
                ? "bg-slate-800 text-white border border-slate-700"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-sky-400" />
            Interaktiv Xarita
          </button>
          <button
            onClick={() => setActiveTab("duels")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "duels"
                ? "bg-slate-800 text-white border border-slate-700"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Crosshair className="w-3.5 h-3.5 text-amber-400" />
            Opening Duels (Entry Killar)
          </button>
        </div>

        {/* Layer Toggles */}
        {activeTab === "radar" && (
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                showHeatmap
                  ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              <Activity className="w-3 h-3 text-rose-400" />
              Heatmap
            </button>

            <button
              onClick={() => setShowUtilities(!showUtilities)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                showUtilities
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              <Flame className="w-3 h-3 text-emerald-400" />
              Granatalar
            </button>

            <button
              onClick={() => setShowCallouts(!showCallouts)}
              className={`hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                showCallouts
                  ? "bg-sky-500/20 text-sky-300 border-sky-500/40"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              <Layers className="w-3 h-3 text-sky-400" />
              Pozitsiyalar
            </button>
          </div>
        )}
      </div>

      {activeTab === "radar" ? (
        /* Radar View */
        <div className="space-y-4">
          {/* Top HUD: CT vs T Status Bar */}
          <div className="flex items-center justify-between gap-4 bg-slate-950/90 border border-slate-800/80 px-4 py-3 rounded-2xl">
            {/* CT Side */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {ctPlayers.map((p) => (
                  <div
                    key={p.id}
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center text-[10px] font-black ${
                      p.isAlive
                        ? "bg-sky-500/20 border-sky-400 text-sky-300"
                        : "bg-slate-900 border-slate-800 text-slate-600 opacity-40"
                    }`}
                    title={`${p.name} (${p.hp} HP)`}
                  >
                    {p.name[0]}
                  </div>
                ))}
              </div>
              <span className="text-xs font-black text-sky-400 hidden sm:inline">
                {ctAliveCount} CT Tirik
              </span>
            </div>

            {/* Center Bomb / Round Timer */}
            <div className="text-center">
              {isBombPlanted ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-black animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  BOMBA EKO: {bombCountdown}s
                </div>
              ) : (
                <div className="text-xs font-mono font-bold text-slate-300">
                  Raund {selectedRound} • {formatTime(roundTime)}
                </div>
              )}
            </div>

            {/* T Side */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-orange-400 hidden sm:inline">
                {tAliveCount} T Tirik
              </span>
              <div className="flex items-center gap-1">
                {tPlayers.map((p) => (
                  <div
                    key={p.id}
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center text-[10px] font-black ${
                      p.isAlive
                        ? "bg-orange-500/20 border-orange-400 text-orange-300"
                        : "bg-slate-900 border-slate-800 text-slate-600 opacity-40"
                    }`}
                    title={`${p.name} (${p.hp} HP)`}
                  >
                    {p.name[0]}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2D Canvas Container */}
          <div className="relative w-full max-w-2xl mx-auto aspect-square rounded-2xl bg-[#080c14] border-2 border-slate-800 overflow-hidden shadow-2xl">
            {/* Grid background */}
            <div className="absolute inset-0 cs-grid-bg opacity-30" />

            {/* Sites Zones */}
            {currentMap.sites.map((s, idx) => (
              <div
                key={idx}
                className="absolute border-2 border-dashed rounded-2xl flex items-center justify-center pointer-events-none transition-all"
                style={{
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  width: `${s.w}%`,
                  height: `${s.h}%`,
                  borderColor: `${s.color || "#f59e0b"}40`,
                  backgroundColor: `${s.color || "#f59e0b"}10`,
                }}
              >
                <span
                  className="text-[11px] font-black tracking-wider drop-shadow"
                  style={{ color: s.color || "#f59e0b" }}
                >
                  {s.name}
                </span>
              </div>
            ))}

            {/* Callouts */}
            {showCallouts &&
              currentMap.callouts.map((c, i) => (
                <div
                  key={i}
                  className="absolute text-[9px] font-mono text-slate-500 pointer-events-none drop-shadow -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${c.x}%`, top: `${c.y}%` }}
                >
                  {c.name}
                </div>
              ))}

            {/* Heatmap Overlay (if enabled) */}
            {showHeatmap && (
              <div className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300">
                {SAMPLE_HEATMAP.map((pt, i) => (
                  <div
                    key={i}
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-md opacity-70 animate-pulse"
                    style={{
                      left: `${pt.x}%`,
                      top: `${pt.y}%`,
                      width: `${pt.intensity * 50}px`,
                      height: `${pt.intensity * 50}px`,
                      backgroundColor: pt.team === "CT" ? "rgba(0, 210, 255, 0.45)" : "rgba(249, 115, 22, 0.5)",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Utilities: Smoke, Molotov, Flashbang */}
            {showUtilities && (
              <>
                {/* Smoke Granade at A Site / Jungle */}
                {roundTime > 25 && roundTime < 90 && (
                  <div
                    className="absolute top-[34%] right-[32%] w-16 h-16 rounded-full bg-slate-300/30 blur-sm border border-slate-300/50 pointer-events-none animate-pulse flex items-center justify-center text-[9px] font-black text-slate-200 z-10"
                    title="Smoke Granata"
                  >
                    SMOKE
                  </div>
                )}

                {/* Molotov Fire on Tetris */}
                {roundTime > 30 && roundTime < 55 && (
                  <div
                    className="absolute top-[38%] right-[22%] w-12 h-12 rounded-full bg-orange-600/40 blur-[3px] border border-amber-500/60 pointer-events-none animate-ping z-10 flex items-center justify-center text-[8px] font-black text-amber-200"
                    title="Molotov Olovi"
                  >
                    FIRE
                  </div>
                )}
              </>
            )}

            {/* Bomb Icon */}
            {isBombPlanted && (
              <div
                className="absolute top-[32%] right-[27%] w-5 h-5 rounded-full bg-rose-500 border border-white animate-ping z-20"
                title="Bomba o'rnatildi!"
              />
            )}

            {/* Kill Ray (Laser line between shooter and victim) */}
            {showKillRays && roundTime > 40 && roundTime < 48 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <line
                  x1="62%"
                  y1="38%"
                  x2="52%"
                  y2="34%"
                  stroke="#00d2ff"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                />
              </svg>
            )}

            {/* Players Dots on Map */}
            {[...ctPlayers, ...tPlayers].map((p) => {
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
                    • {p.weapon} ({p.hp} HP)
                  </div>
                </div>
              );
            })}
          </div>

          {/* Timeline & Controls Bar */}
          <div className="space-y-3 max-w-2xl mx-auto bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Raund Xronologiyasi:</span>
              <span className="font-bold text-amber-400 text-sm">
                {formatTime(roundTime)} / 01:55
              </span>
            </div>

            {/* Slider */}
            <input
              type="range"
              min="0"
              max="115"
              value={roundTime}
              onChange={(e) => setRoundTime(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />

            {/* Action buttons & Speed */}
            <div className="flex items-center justify-between pt-1">
              {/* Reset */}
              <button
                onClick={() => setRoundTime(0)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
                title="Boshiga qaytish"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Play / Pause */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs shadow-md shadow-amber-500/20 active:scale-95 transition-all"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" /> To&apos;xtatish
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-black" /> Replayni Ko&apos;rish
                  </>
                )}
              </button>

              {/* Speed Buttons */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                {([1, 2, 4] as const).map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                      playbackSpeed === spd
                        ? "bg-amber-500 text-black"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Opening Duels Analytics Tab */
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white">Opening Duels (Birinchi Qotilliklar)</div>
              <div className="text-[11px] text-slate-400">
                Raund taqdirini 75% ehtimollik bilan hal qiluvchi birinchi qon duellari.
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <Award className="w-3.5 h-3.5" /> S1Mple_UZ: 5-0 (100% Win)
            </div>
          </div>

          <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Raund</th>
                  <th className="py-3 px-3">G&apos;olib (Entry Kill)</th>
                  <th className="py-3 px-3">Qurol</th>
                  <th className="py-3 px-3">Mag&apos;lub</th>
                  <th className="py-3 px-3">Vaqt</th>
                  <th className="py-3 px-4 text-right">Pozitsiya</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {SAMPLE_OPENING_DUELS.map((d, i) => (
                  <tr key={i} className="hover:bg-slate-900/40">
                    <td className="py-2.5 px-4 font-bold text-amber-400">
                      Raund {d.round}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={d.winnerTeam === "CT" ? "text-sky-400 font-bold" : "text-orange-400 font-bold"}>
                        {d.winner}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">{d.weapon}</td>
                    <td className="py-2.5 px-3 text-slate-500 line-through">
                      {d.loser}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">00:{d.timeSec < 10 ? "0" : ""}{d.timeSec}</td>
                    <td className="py-2.5 px-4 text-right text-slate-300 font-sans">
                      {d.location}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
