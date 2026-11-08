"use client";

import React, { useState } from "react";
import { 
  FaceitMatchItem, FaceitPlayer, FaceitMatchPlayer 
} from "@/types/faceit";
import { 
  Download, Trophy, Star, RefreshCw, CheckCircle, 
  Video, Eye, Filter, Flame, Shield, ArrowUpRight, 
  Crosshair, Skull, Award
} from "lucide-react";
import confetti from "canvas-confetti";

interface FaceitMatchBrowserProps {
  user: FaceitPlayer;
  matches: FaceitMatchItem[];
  onSelectMatchForStudio: (match: FaceitMatchItem) => void;
  onSelectMatchForRecord: (match: FaceitMatchItem) => void;
}

export const FaceitMatchBrowser: React.FC<FaceitMatchBrowserProps> = ({
  user,
  matches,
  onSelectMatchForStudio,
  onSelectMatchForRecord,
}) => {
  const [selectedMatch, setSelectedMatch] = useState<FaceitMatchItem>(matches[0]);
  const [filterResult, setFilterResult] = useState<"ALL" | "WIN" | "LOSS">("ALL");
  const [isSyncing, setIsSyncing] = useState(false);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  // Sync matches button simulation
  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.3 },
        colors: ["#66c0f4", "#ff5500"],
      });
    }, 1000);
  };

  // Direct 1-Click Demo Download Trigger
  const handleDownloadDemo = (match: FaceitMatchItem) => {
    setDownloadSuccessMessage(`${match.map_display} demo fayli (.dem) yuklanmoqda...`);

    // Create a real download trigger in the browser
    const link = document.createElement("a");
    link.href = match.demo_url;
    link.download = `${match.match_id}.dem.zst`;
    link.target = "_blank";
    link.rel = "noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadSuccessMessage(`✓ ${match.map_display} demo fayli muvaffaqiyatli yuklandi!`);
      setTimeout(() => setDownloadSuccessMessage(null), 3000);
    }, 1500);
  };

  const filteredMatches = matches.filter((m) => {
    if (filterResult === "WIN") return m.result === "WIN";
    if (filterResult === "LOSS") return m.result === "LOSS";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Steam Community Profile & Faceit ELO Banner */}
      <div className="bg-[#1b2838] border border-[#2a475e] p-5 rounded-sm shadow-xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-[#ff5500]/10 to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          {/* User info */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-sm steam-in-game-border overflow-hidden bg-[#171a21]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={user.avatar} alt={user.nickname} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded bg-[#ff5500] text-black text-[9px] font-black shadow-md">
                LVL {user.skill_level}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-black text-white">{user.nickname}</h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#ff5500]/20 text-[#ff7733] border border-[#ff5500]/40">
                  FACEIT LEVEL {user.skill_level}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2a475e] text-[#66c0f4]">
                  SteamID: {user.steam_id_64}
                </span>
              </div>
              <p className="text-xs text-[#8f98a0] mt-1">
                Sinxronlangan rasmiy matchlar va demolar boshqaruvi
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#171a21] p-3 rounded-sm border border-[#2a475e]/80 text-center">
            <div className="px-3">
              <div className="text-[10px] text-[#8f98a0] uppercase font-bold">FACEIT ELO</div>
              <div className="text-base font-black text-[#66c0f4] font-mono">{user.faceit_elo}</div>
            </div>
            <div className="px-3 border-l border-[#2a475e]">
              <div className="text-[10px] text-[#8f98a0] uppercase font-bold">G&apos;alaba Foizi</div>
              <div className="text-base font-black text-[#a4d007] font-mono">{user.win_rate}%</div>
            </div>
            <div className="px-3 border-l border-[#2a475e]">
              <div className="text-[10px] text-[#8f98a0] uppercase font-bold">O&apos;rtacha K/D</div>
              <div className="text-base font-black text-white font-mono">{user.kd_ratio}</div>
            </div>
            <div className="px-3 border-l border-[#2a475e]">
              <div className="text-[10px] text-[#8f98a0] uppercase font-bold">Seriya</div>
              <div className="text-base font-black text-[#ff7733] font-mono">{user.current_streak} Win 🔥</div>
            </div>
          </div>

          {/* Sync Button */}
          <div>
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="btn-steam-blue px-4 py-2.5 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md w-full lg:w-auto justify-center"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
              <span>{isSyncing ? "Sinxronlanmoqda..." : "Matchlarni Sinxronlash"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Download Alert Notification */}
      {downloadSuccessMessage && (
        <div className="bg-[#1f382b] border border-[#a4d007]/60 text-[#a4d007] p-3 rounded-sm text-xs font-bold flex items-center justify-between animate-fade-in shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#a4d007]" />
            <span>{downloadSuccessMessage}</span>
          </div>
          <button onClick={() => setDownloadSuccessMessage(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Main 2-Column Section: Left (Matches List), Right (Faceit Detailed Scoreboard) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Match History List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Header & Filter */}
          <div className="flex items-center justify-between text-xs border-b border-[#2a475e] pb-2">
            <div className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>Sinxronlangan Matchlar</span>
              <span className="text-[#66c0f4]">({filteredMatches.length})</span>
            </div>

            <div className="flex items-center gap-1 bg-[#171a21] p-0.5 rounded-sm border border-[#2a475e]">
              <button
                onClick={() => setFilterResult("ALL")}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-sm ${
                  filterResult === "ALL" ? "bg-[#2a475e] text-white" : "text-[#8f98a0] hover:text-white"
                }`}
              >
                Hammasi
              </button>
              <button
                onClick={() => setFilterResult("WIN")}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-sm ${
                  filterResult === "WIN" ? "bg-[#5c7e10] text-white" : "text-[#8f98a0] hover:text-[#a4d007]"
                }`}
              >
                G&apos;alaba
              </button>
              <button
                onClick={() => setFilterResult("LOSS")}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-sm ${
                  filterResult === "LOSS" ? "bg-[#8f3d3d] text-white" : "text-[#8f98a0] hover:text-rose-400"
                }`}
              >
                Mag&apos;lubiyat
              </button>
            </div>
          </div>

          {/* Matches List Items */}
          <div className="space-y-2.5">
            {filteredMatches.map((m) => {
              const isSelected = selectedMatch.match_id === m.match_id;
              const isWin = m.result === "WIN";

              return (
                <div
                  key={m.match_id}
                  onClick={() => setSelectedMatch(m)}
                  className={`p-3.5 rounded-sm border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-[#1f2f42] border-[#66c0f4] shadow-lg shadow-[#66c0f4]/10"
                      : "bg-[#1b2838] border-[#2a475e]/80 hover:bg-[#203248] hover:border-[#2a475e]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    {/* Left result & map */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-10 rounded-xs ${
                          isWin ? "bg-[#a4d007]" : "bg-[#8f3d3d]"
                        }`}
                      />

                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-black px-1.5 py-0.2 rounded-xs uppercase ${
                              isWin
                                ? "bg-[#5c7e10] text-[#d2efa9]"
                                : "bg-[#8f3d3d] text-[#ffcaca]"
                            }`}
                          >
                            {m.result}
                          </span>
                          <span className="font-bold text-sm text-white">
                            {m.map_display}
                          </span>
                          <span className="font-mono text-xs text-slate-300">
                            {m.score_team1} - {m.score_team2}
                          </span>
                        </div>

                        <div className="text-[11px] text-[#8f98a0] mt-0.5">
                          {m.date_formatted} • {m.duration}
                        </div>
                      </div>
                    </div>

                    {/* Right performance & ELO diff */}
                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-white">
                        {m.personal_stats.kills} <span className="text-[#8f98a0] font-normal">/</span> {m.personal_stats.deaths}
                      </div>
                      <div className="text-[10px] text-[#8f98a0]">
                        K/D: <span className={m.personal_stats.kd >= 1 ? "text-[#a4d007] font-bold" : "text-rose-400 font-bold"}>{m.personal_stats.kd}</span>
                        <span className="mx-1">•</span>
                        <span className={isWin ? "text-[#a4d007] font-bold" : "text-rose-400 font-bold"}>
                          {isWin ? `+${m.elo_diff}` : `${m.elo_diff}`} ELO
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action row */}
                  <div className="mt-2.5 pt-2 border-t border-[#2a475e]/60 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-[#8f98a0]">
                      ADR: <strong className="text-slate-200">{m.personal_stats.adr}</strong> • HS: <strong className="text-slate-200">{m.personal_stats.hs_percent}%</strong>
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadDemo(m);
                      }}
                      className="text-[10px] font-bold text-[#66c0f4] hover:text-white flex items-center gap-1 hover:underline"
                      title="Demoni (.dem) to'g'ridan-to'g'ri yuklab olish"
                    >
                      <Download className="w-3 h-3" />
                      Demoni Yuklash ({m.demo_size_mb} MB)
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Match View (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Match Banner Card */}
          <div className="bg-[#1b2838] border border-[#2a475e] p-5 rounded-sm shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2a475e] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-white">{selectedMatch.map_display}</span>
                  <span className={`text-xs font-black px-2 py-0.5 rounded-xs ${
                    selectedMatch.result === "WIN" ? "bg-[#5c7e10] text-[#d2efa9]" : "bg-[#8f3d3d] text-white"
                  }`}>
                    {selectedMatch.result === "WIN" ? "G'ALABA (VICTORY)" : "MAG'LUBIYAT (DEFEAT)"}
                  </span>
                </div>
                <p className="text-xs text-[#8f98a0] mt-0.5">
                  Sana: {selectedMatch.date_formatted} • Davomiyligi: {selectedMatch.duration} • ID: {selectedMatch.match_id.slice(0, 16)}...
                </p>
              </div>

              {/* Score Box */}
              <div className="flex items-center gap-4 bg-[#171a21] px-5 py-2.5 rounded-sm border border-[#2a475e]">
                <div className="text-center">
                  <div className="text-[10px] font-bold text-[#66c0f4] uppercase">Faction 1</div>
                  <div className="text-2xl font-black text-white font-mono">{selectedMatch.score_team1}</div>
                </div>
                <span className="text-[#8f98a0] font-black">:</span>
                <div className="text-center">
                  <div className="text-[10px] font-bold text-[#ff7733] uppercase">Faction 2</div>
                  <div className="text-2xl font-black text-white font-mono">{selectedMatch.score_team2}</div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS: Download Demo & Record Movie */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => handleDownloadDemo(selectedMatch)}
                className="btn-steam-green py-2.5 px-4 font-black text-xs uppercase flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Demoni Yuklab Olish (.dem.zst)</span>
              </button>

              <button
                onClick={() => onSelectMatchForStudio(selectedMatch)}
                className="btn-steam-blue py-2.5 px-4 font-black text-xs uppercase flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-all"
              >
                <Video className="w-4 h-4" />
                <span>Ushbu O&apos;yindan Rolik Yasash</span>
              </button>
            </div>
          </div>

          {/* Full FACEIT Scoreboard Table */}
          <div className="bg-[#1b2838] border border-[#2a475e] rounded-sm overflow-hidden shadow-xl">
            <div className="bg-[#171a21] px-4 py-2.5 border-b border-[#2a475e] flex items-center justify-between text-xs font-bold text-white uppercase tracking-wider">
              <span>FACEIT Scoreboard</span>
              <span className="text-[#66c0f4]">HLTV 2.1 Tahlili</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#171a21]/60 text-[10px] font-bold text-[#8f98a0] uppercase border-b border-[#2a475e]">
                    <th className="py-2.5 px-3">O&apos;yinchi</th>
                    <th className="py-2.5 px-2 text-center">Lvl</th>
                    <th className="py-2.5 px-2 text-center">K - D - A</th>
                    <th className="py-2.5 px-2 text-center">K/D</th>
                    <th className="py-2.5 px-2 text-center">ADR</th>
                    <th className="py-2.5 px-2 text-center">HS%</th>
                    <th className="py-2.5 px-2 text-center">Entry</th>
                    <th className="py-2.5 px-3 text-right">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a475e]/60 font-mono text-[11px]">
                  {/* Faction 1 Roster */}
                  <tr className="bg-[#1e2f42] text-[10px] font-bold text-[#66c0f4] uppercase tracking-wider font-sans">
                    <td colSpan={8} className="py-1.5 px-3">
                      🛡️ {selectedMatch.teams.faction1.name} ({selectedMatch.teams.faction1.score})
                    </td>
                  </tr>
                  {selectedMatch.teams.faction1.roster.map((p, idx) => (
                    <tr key={p.player_id} className="hover:bg-[#203248] transition-colors">
                      <td className="py-2 px-3 font-sans">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 w-3 text-[10px]">{idx + 1}</span>
                          <span className={`font-bold ${p.nickname === user.nickname ? "text-[#66c0f4]" : "text-white"}`}>
                            {p.nickname}
                          </span>
                          {p.is_mvp && (
                            <span className="text-[9px] px-1 py-0.2 rounded bg-[#ff5500]/20 text-[#ff7733] border border-[#ff5500]/30 font-bold">
                              MVP
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-2 px-2 text-center">
                        <span className="text-[9px] px-1 py-0.2 rounded bg-[#ff5500] text-black font-black">
                          {p.skill_level}
                        </span>
                      </td>
                      <td className="py-2 px-2 text-center font-bold text-white">
                        {p.kills} - {p.deaths} - {p.assists}
                      </td>
                      <td className="py-2 px-2 text-center">
                        <span className={p.kd >= 1 ? "text-[#a4d007] font-bold" : "text-rose-400 font-bold"}>
                          {p.kd.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-2 px-2 text-center text-slate-300">{p.adr.toFixed(0)}</td>
                      <td className="py-2 px-2 text-center text-slate-300">{p.hs_percent}%</td>
                      <td className="py-2 px-2 text-center text-slate-400">{p.first_kills}</td>
                      <td className="py-2 px-3 text-right">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          p.hltv_rating >= 1.3 ? "bg-[#ff5500]/20 text-[#ff7733]" : p.hltv_rating >= 1.0 ? "text-[#a4d007]" : "text-slate-400"
                        }`}>
                          {p.hltv_rating.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {/* Faction 2 Roster */}
                  <tr className="bg-[#2a241f] text-[10px] font-bold text-[#ff7733] uppercase tracking-wider font-sans">
                    <td colSpan={8} className="py-1.5 px-3">
                      💣 {selectedMatch.teams.faction2.name} ({selectedMatch.teams.faction2.score})
                    </td>
                  </tr>
                  {selectedMatch.teams.faction2.roster.map((p, idx) => (
                    <tr key={p.player_id} className="hover:bg-[#203248] transition-colors">
                      <td className="py-2 px-3 font-sans">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 w-3 text-[10px]">{idx + 1}</span>
                          <span className="font-bold text-white">{p.nickname}</span>
                          {p.is_mvp && (
                            <span className="text-[9px] px-1 py-0.2 rounded bg-[#ff5500]/20 text-[#ff7733] border border-[#ff5500]/30 font-bold">
                              MVP
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-2 px-2 text-center">
                        <span className="text-[9px] px-1 py-0.2 rounded bg-[#ff5500] text-black font-black">
                          {p.skill_level}
                        </span>
                      </td>
                      <td className="py-2 px-2 text-center font-bold text-white">
                        {p.kills} - {p.deaths} - {p.assists}
                      </td>
                      <td className="py-2 px-2 text-center">
                        <span className={p.kd >= 1 ? "text-[#a4d007] font-bold" : "text-rose-400 font-bold"}>
                          {p.kd.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-2 px-2 text-center text-slate-300">{p.adr.toFixed(0)}</td>
                      <td className="py-2 px-2 text-center text-slate-300">{p.hs_percent}%</td>
                      <td className="py-2 px-2 text-center text-slate-400">{p.first_kills}</td>
                      <td className="py-2 px-3 text-right">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          p.hltv_rating >= 1.3 ? "bg-[#ff5500]/20 text-[#ff7733]" : p.hltv_rating >= 1.0 ? "text-[#a4d007]" : "text-slate-400"
                        }`}>
                          {p.hltv_rating.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
