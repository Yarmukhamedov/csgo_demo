"use client";

import React, { useState } from "react";
import { MatchData, PlayerStats } from "@/types/demo";
import { Trophy, Star, Target, Shield, Skull, Zap, ChevronRight, Video } from "lucide-react";

interface ScoreboardProps {
  match: MatchData;
  onSelectPlayerForReel: (playerName: string) => void;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ match, onSelectPlayerForReel }) => {
  const [activeSide, setActiveSide] = useState<"ALL" | "CT" | "T">("ALL");

  const ctPlayers = match.players.filter((p) => p.team === "CT");
  const tPlayers = match.players.filter((p) => p.team === "T");

  const renderPlayerRow = (p: PlayerStats, index: number) => {
    const isMvp = index === 0;
    return (
      <tr
        key={p.id}
        className="border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors group"
      >
        {/* Player Name & Team */}
        <td className="py-3 px-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500 w-4">{index + 1}</span>
            <div className="relative">
              {/* Avatar placeholder / image */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs border ${
                  p.team === "CT"
                    ? "bg-sky-950/60 border-sky-500/40 text-sky-400"
                    : "bg-amber-950/60 border-amber-500/40 text-amber-400"
                }`}
              >
                {p.name.slice(0, 2).toUpperCase()}
              </div>
              {p.team === "CT" ? (
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-sky-500 rounded-full border border-[#0e131f]" />
              ) : (
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border border-[#0e131f]" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                  {p.name}
                </span>
                {isMvp && (
                  <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-black bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Trophy className="w-2.5 h-2.5" /> MVP
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className={p.team === "CT" ? "text-sky-400 font-semibold" : "text-orange-400 font-semibold"}>
                  {p.team === "CT" ? "Counter-Terrorist" : "Terrorist"}
                </span>
                {p.premierRating && (
                  <span suppressHydrationWarning>• {p.premierRating.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} CS-Rating</span>
                )}
                {p.faceitLevel && (
                  <span>• Faceit Lvl {p.faceitLevel}</span>
                )}
              </div>
            </div>
          </div>
        </td>

        {/* K / D / A */}
        <td className="py-3 px-3 text-center">
          <div className="text-sm font-black text-white font-mono">
            {p.kills} <span className="text-slate-500 text-xs font-normal">/</span> {p.deaths}{" "}
            <span className="text-slate-500 text-xs font-normal">/</span> {p.assists}
          </div>
          <div className="text-[10px] text-slate-400">
            K/D: <span className={(p.kills / Math.max(1, p.deaths)) >= 1 ? "text-emerald-400 font-bold" : "text-rose-400"}>
              {(p.kills / Math.max(1, p.deaths)).toFixed(2)}
            </span>
          </div>
        </td>

        {/* ADR */}
        <td className="py-3 px-3 text-center">
          <span className="text-sm font-bold font-mono text-slate-200">{p.adr.toFixed(1)}</span>
        </td>

        {/* HS % */}
        <td className="py-3 px-3 text-center">
          <span className="text-sm font-bold font-mono text-slate-300">{p.hsPercentage}%</span>
        </td>

        {/* MVPs */}
        <td className="py-3 px-3 text-center">
          <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{p.mvps}</span>
          </div>
        </td>

        {/* HLTV 2.1 Rating */}
        <td className="py-3 px-3 text-center">
          <span
            className={`inline-block px-2.5 py-1 rounded-lg text-xs font-black font-mono ${
              p.hltvRating >= 1.3
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                : p.hltvRating >= 1.05
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "bg-slate-800 text-slate-400"
            }`}
          >
            {p.hltvRating.toFixed(2)}
          </span>
        </td>

        {/* Quick Reel Action */}
        <td className="py-3 px-4 text-right">
          <button
            onClick={() => onSelectPlayerForReel(p.name)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all"
            title="Ushbu o'yinchi uchun video rolik tayyorlash"
          >
            <Video className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Rolik Yasash</span>
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="space-y-6">
      {/* Match Banner Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d1424] via-[#11192e] to-[#1c1214] border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Map info */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700/80 flex items-center justify-center font-black text-xl text-amber-400 shadow-inner">
              DE
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-white tracking-wide">{match.mapDisplay}</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {match.gameMode}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Sana: {match.date} • Davomiyligi: {match.duration}
              </p>
            </div>
          </div>

          {/* Match Score Display */}
          <div className="flex items-center gap-6 bg-slate-950/70 px-6 py-3 rounded-2xl border border-slate-800">
            {/* CT Team */}
            <div className="text-right">
              <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                {match.teamCtName}
              </div>
              <div className="text-3xl font-black text-sky-300 font-mono">{match.scoreCt}</div>
            </div>

            <div className="text-slate-600 font-black text-xl">:</div>

            {/* T Team */}
            <div className="text-left">
              <div className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                {match.teamTName}
              </div>
              <div className="text-3xl font-black text-orange-300 font-mono">{match.scoreT}</div>
            </div>
          </div>

          {/* Top highlight badge */}
          <div className="hidden lg:flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 px-4 py-3 rounded-xl">
            <Zap className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-xs font-bold text-amber-300">5 ta Highlight aniqlandi</div>
              <div className="text-[11px] text-slate-400">1x Ace, 1x Clutch, 2x Multi-kill</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveSide("ALL")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSide === "ALL"
              ? "bg-slate-800 text-white border border-slate-700"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Barcha O&apos;yinchilar (10)
        </button>
        <button
          onClick={() => setActiveSide("CT")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSide === "CT"
              ? "bg-sky-500/20 text-sky-400 border border-sky-500/40"
              : "text-slate-400 hover:text-sky-400"
          }`}
        >
          Counter-Terrorists ({match.scoreCt})
        </button>
        <button
          onClick={() => setActiveSide("T")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSide === "T"
              ? "bg-orange-500/20 text-orange-400 border border-orange-500/40"
              : "text-slate-400 hover:text-orange-400"
          }`}
        >
          Terrorists ({match.scoreT})
        </button>
      </div>

      {/* Scoreboard Table */}
      <div className="overflow-x-auto rounded-2xl bg-[#0b101d] border border-slate-800/80 shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">O&apos;yinchi</th>
              <th className="py-3 px-3 text-center">K / D / A</th>
              <th className="py-3 px-3 text-center">ADR</th>
              <th className="py-3 px-3 text-center">HS %</th>
              <th className="py-3 px-3 text-center">MVP</th>
              <th className="py-3 px-3 text-center">HLTV 2.1</th>
              <th className="py-3 px-4 text-right">Rolik</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {(activeSide === "ALL" || activeSide === "CT") && (
              <>
                <tr className="bg-sky-950/20 text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                  <td colSpan={7} className="py-2 px-4">
                    🛡️ Counter-Terrorists • G&apos;alaba ({match.scoreCt} Raund)
                  </td>
                </tr>
                {ctPlayers.map((p, i) => renderPlayerRow(p, i))}
              </>
            )}

            {(activeSide === "ALL" || activeSide === "T") && (
              <>
                <tr className="bg-orange-950/20 text-[11px] font-bold text-orange-400 uppercase tracking-wider">
                  <td colSpan={7} className="py-2 px-4">
                    💣 Terrorists ({match.scoreT} Raund)
                  </td>
                </tr>
                {tPlayers.map((p, i) => renderPlayerRow(p, i + ctPlayers.length))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
