"use client";

import React, { useState } from "react";
import { 
  FaceitMatchItem, FaceitPlayer, FaceitMatchPlayer 
} from "@/types/faceit";
import { 
  Download, Trophy, RefreshCw, CheckCircle, 
  Video, Eye, Filter, Flame, Shield, ArrowUpRight, 
  Crosshair, Skull, Award, ChevronDown, ChevronRight,
  UploadCloud, Coins, Play, Sparkles, MapPin, 
  ArrowUpDown, Layers, Check, ExternalLink, Zap
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
  // State for segmented tabs: "ALL" (43) | "UPLOADED" (3) | "UNUPLOADED" (40)
  const [statusFilter, setStatusFilter] = useState<"ALL" | "UPLOADED" | "UNUPLOADED">("ALL");
  
  // State for mode filter: "all" | "faceit" | "premier" | "competitive" | "community"
  const [modeFilter, setModeFilter] = useState<string>("all");
  
  // State for map filter
  const [mapFilter, setMapFilter] = useState<string>("all");
  
  // State for sort
  const [sortMode, setSortMode] = useState<"recent" | "kills" | "rating">("recent");

  // Selected match for detailed Faceit scoreboard inspection
  const [selectedMatch, setSelectedMatch] = useState<FaceitMatchItem | null>(matches[0]);
  
  // Accordion collapsed state for date groups
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  // Sync state & notifications
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedText, setLastSyncedText] = useState<string>("1 min ago");
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  // Manual Demo Upload Modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [isImportingMatchId, setIsImportingMatchId] = useState<string | null>(null);

  // Group toggling
  const toggleGroup = (groupDate: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupDate]: !prev[groupDate]
    }));
  };

  // Sync handler
  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncedText("hozirgina (just now)");
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.3 },
        colors: ["#66c0f4", "#ff5500"],
      });
    }, 900);
  };

  // 1-Click .dem direct download
  const handleDownloadDemo = (match: FaceitMatchItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDownloadSuccessMessage(`${match.map_display} demo fayli (.dem.zst) yuklanmoqda...`);

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
      setTimeout(() => setDownloadSuccessMessage(null), 3500);
    }, 1500);
  };

  // Demo Import Simulation (deducts 2 coins and marks as uploaded)
  const handleImportDemo = (match: FaceitMatchItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsImportingMatchId(match.match_id);
    
    setTimeout(() => {
      match.uploaded = true;
      setIsImportingMatchId(null);
      setSelectedMatch(match);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.4 },
        colors: ["#ffaa00", "#a4d007"],
      });
      setDownloadSuccessMessage(`✓ ${match.map_display} matchi muvaffaqiyatli import qilindi va tahlil qilindi!`);
      setTimeout(() => setDownloadSuccessMessage(null), 3500);
    }, 1200);
  };

  // Filter calculation
  const uploadedCount = matches.filter(m => m.uploaded).length;
  const unuploadedCount = matches.filter(m => !m.uploaded).length;

  const filteredMatches = matches.filter(m => {
    if (statusFilter === "UPLOADED" && !m.uploaded) return false;
    if (statusFilter === "UNUPLOADED" && m.uploaded) return false;
    if (modeFilter !== "all" && m.game_mode !== modeFilter) return false;
    if (mapFilter !== "all" && m.map_name !== mapFilter) return false;
    return true;
  }).sort((a, b) => {
    if (sortMode === "kills") return b.personal_stats.kills - a.personal_stats.kills;
    if (sortMode === "rating") return b.personal_stats.hltv_rating - a.personal_stats.hltv_rating;
    return 0; // Recent default
  });

  // Group by date_group (e.g. "07.11.2026", "06.11.2026", "05.11.2026")
  const dateGroups: { date: string; items: FaceitMatchItem[] }[] = [];
  filteredMatches.forEach(m => {
    const groupKey = m.date_group || "07.11.2026";
    const existing = dateGroups.find(g => g.date === groupKey);
    if (existing) {
      existing.items.push(m);
    } else {
      dateGroups.push({ date: groupKey, items: [m] });
    }
  });

  return (
    <div className="space-y-6">
      {/* 1. Header with Matches Title & Action Buttons matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-wide">Matches</h1>
          <p className="text-xs text-[#8f98a0] mt-1 font-mono">
            Matches analyzed: <span className="text-[#a4d007] font-bold">{uploadedCount}</span> · last synced {lastSyncedText}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Sync Button */}
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1b2838] hover:bg-[#203248] border border-[#2a475e] text-xs font-bold text-white transition-all shadow-md active:scale-95"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#66c0f4] ${isSyncing ? "animate-spin" : ""}`} />
            <span>Sync</span>
          </button>

          {/* Upload Demo Button (Orange pill matching CSDEMO / Steam) */}
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#e64a00] hover:from-[#ff661a] hover:to-[#ff5500] text-black font-black text-xs transition-all shadow-lg shadow-[#ff5500]/20 active:scale-95"
          >
            <UploadCloud className="w-4 h-4 text-black stroke-[2.5]" />
            <span>Upload Demo</span>
          </button>
        </div>
      </div>

      {/* Download Alert Toast */}
      {downloadSuccessMessage && (
        <div className="bg-[#1f382b] border border-[#a4d007]/60 text-[#a4d007] p-3 rounded-xl text-xs font-bold flex items-center justify-between animate-fade-in shadow-xl">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#a4d007]" />
            <span>{downloadSuccessMessage}</span>
          </div>
          <button onClick={() => setDownloadSuccessMessage(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* 2. Primary Segmented Pill Filter: All 43 | Uploaded 3 | Unuploaded 40 */}
      <div className="bg-[#141820] p-1.5 rounded-2xl border border-[#2a475e]/70 flex items-center gap-1.5 shadow-md">
        <button
          onClick={() => setStatusFilter("ALL")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            statusFilter === "ALL"
              ? "bg-[#2a475e] text-white shadow-sm"
              : "text-[#8f98a0] hover:text-white hover:bg-[#1b2838]/60"
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-[#66c0f4]" />
          <span>All</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#171a21] text-slate-300 font-mono font-bold">
            {matches.length}
          </span>
        </button>

        <button
          onClick={() => setStatusFilter("UPLOADED")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            statusFilter === "UPLOADED"
              ? "bg-[#2a475e] text-white shadow-sm"
              : "text-[#8f98a0] hover:text-white hover:bg-[#1b2838]/60"
          }`}
        >
          <CheckCircle className="w-3.5 h-3.5 text-[#a4d007]" />
          <span>Uploaded</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#1f382b] text-[#a4d007] font-mono font-bold">
            {uploadedCount}
          </span>
        </button>

        <button
          onClick={() => setStatusFilter("UNUPLOADED")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            statusFilter === "UNUPLOADED"
              ? "bg-[#2a475e] text-white shadow-sm"
              : "text-[#8f98a0] hover:text-white hover:bg-[#1b2838]/60"
          }`}
        >
          <UploadCloud className="w-3.5 h-3.5 text-[#ff7733]" />
          <span>Unuploaded</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#171a21] text-[#8f98a0] font-mono font-bold">
            {unuploadedCount}
          </span>
        </button>
      </div>

      {/* 3. Secondary Filter Bar: Mode Pills & Dropdowns (Screenshot aligned) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        {/* Left: Mode selector pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setModeFilter("all")}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors ${
              modeFilter === "all"
                ? "bg-[#2a475e] text-white border border-[#66c0f4]/50"
                : "bg-[#181d24] text-[#8f98a0] hover:text-white border border-[#2a475e]/60"
            }`}
          >
            <span>All</span>
            <span className="text-[10px] opacity-75 font-mono">{matches.length}</span>
          </button>

          <button
            onClick={() => setModeFilter("faceit")}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors ${
              modeFilter === "faceit"
                ? "bg-[#ff5500]/20 text-[#ff7733] border border-[#ff5500]"
                : "bg-[#181d24] text-[#8f98a0] hover:text-[#ff7733] border border-[#2a475e]/60"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#ff5500]" />
            <span>Faceit</span>
            <span className="text-[10px] opacity-75 font-mono">
              {matches.filter(m => m.game_mode === "faceit").length}
            </span>
          </button>

          <button
            onClick={() => setModeFilter("premier")}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors ${
              modeFilter === "premier"
                ? "bg-[#66c0f4]/20 text-[#66c0f4] border border-[#66c0f4]"
                : "bg-[#181d24] text-[#8f98a0] hover:text-[#66c0f4] border border-[#2a475e]/60"
            }`}
          >
            <Shield className="w-3 h-3 text-[#66c0f4]" />
            <span>Premier</span>
            <span className="text-[10px] opacity-75 font-mono">
              {matches.filter(m => m.game_mode === "premier").length}
            </span>
          </button>

          <button
            onClick={() => setModeFilter("competitive")}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors opacity-60 hover:opacity-100 ${
              modeFilter === "competitive"
                ? "bg-[#2a475e] text-white border border-[#66c0f4]"
                : "bg-[#181d24] text-[#8f98a0] border border-[#2a475e]/60"
            }`}
          >
            <span>Competitive</span>
            <span className="text-[10px] opacity-75 font-mono">0</span>
          </button>

          <button
            onClick={() => setModeFilter("community")}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors opacity-60 hover:opacity-100 ${
              modeFilter === "community"
                ? "bg-[#2a475e] text-white border border-[#66c0f4]"
                : "bg-[#181d24] text-[#8f98a0] border border-[#2a475e]/60"
            }`}
          >
            <span>Community</span>
            <span className="text-[10px] opacity-75 font-mono">0</span>
          </button>
        </div>

        {/* Right: Map and Sort Dropdowns */}
        <div className="flex items-center gap-2">
          {/* Map Dropdown */}
          <div className="relative">
            <select
              value={mapFilter}
              onChange={(e) => setMapFilter(e.target.value)}
              className="appearance-none bg-[#181d24] border border-[#2a475e]/80 text-[#c6d4df] px-3.5 py-1.5 pr-8 rounded-xl text-xs font-bold cursor-pointer hover:border-[#66c0f4] focus:outline-none focus:border-[#66c0f4]"
            >
              <option value="all">Map: All maps</option>
              <option value="de_dust2">Dust2</option>
              <option value="de_mirage">Mirage</option>
              <option value="de_ancient">Ancient</option>
              <option value="de_nuke">Nuke</option>
              <option value="de_inferno">Inferno</option>
              <option value="de_anubis">Anubis</option>
              <option value="de_vertigo">Vertigo</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#8f98a0] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value as any)}
              className="appearance-none bg-[#181d24] border border-[#2a475e]/80 text-[#c6d4df] px-3.5 py-1.5 pr-8 rounded-xl text-xs font-bold cursor-pointer hover:border-[#66c0f4] focus:outline-none focus:border-[#66c0f4]"
            >
              <option value="recent">Sort: Most recent</option>
              <option value="kills">Sort: Highest kills</option>
              <option value="rating">Sort: HLTV Rating</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-[#8f98a0] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 4. Table Header Row (Map | Time | Score | K / D / A | HLTV Rating 2.1 | Your rank | Clips) */}
      <div className="hidden lg:grid grid-cols-12 gap-4 px-4 py-2 text-[11px] font-bold text-[#8f98a0] uppercase tracking-wider border-b border-[#2a475e]/60">
        <div className="col-span-3">Map</div>
        <div className="col-span-2">Time</div>
        <div className="col-span-1 text-center">Score</div>
        <div className="col-span-2 text-center">K / D / A</div>
        <div className="col-span-2 text-center">HLTV Rating 2.1</div>
        <div className="col-span-1 text-center">Your rank</div>
        <div className="col-span-1 text-right">Clips / Demo</div>
      </div>

      {/* 5. Grouped Matches by Date (Screenshot matched: 07.11.2026, 06.11.2026) */}
      <div className="space-y-6">
        {dateGroups.map((group) => {
          const isCollapsed = collapsedGroups[group.date];

          return (
            <div key={group.date} className="space-y-2">
              {/* Date Group Accordion Header */}
              <button
                onClick={() => toggleGroup(group.date)}
                className="flex items-center gap-2 text-xs font-bold text-[#8f98a0] hover:text-white px-2 py-1 transition-colors group"
              >
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCollapsed ? "-rotate-90" : ""}`} />
                <span className="text-white group-hover:text-[#66c0f4] transition-colors">{group.date}</span>
                <span className="text-slate-500 font-normal">· {group.items.length} matches</span>
              </button>

              {/* Match Items in Group */}
              {!isCollapsed && (
                <div className="space-y-2">
                  {group.items.map((m) => {
                    const isWin = m.result === "WIN";
                    const isSelected = selectedMatch?.match_id === m.match_id;

                    // Uploaded Match Row (Row 1 style from screenshot)
                    if (m.uploaded) {
                      return (
                        <div
                          key={m.match_id}
                          onClick={() => setSelectedMatch(isSelected ? null : m)}
                          className={`bg-[#181d24]/90 border rounded-2xl p-3.5 transition-all cursor-pointer hover:bg-[#1f2834] ${
                            isSelected
                              ? "border-[#ff5500] shadow-lg shadow-[#ff5500]/10 bg-[#1e2632]"
                              : "border-[#2a475e]/70 hover:border-[#66c0f4]/60"
                          }`}
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
                            {/* Map name & Mode badge (col 3) */}
                            <div className="lg:col-span-3 flex items-center gap-3">
                              {/* Map Thumbnail / Icon */}
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2a475e] to-[#171a21] border border-[#2a475e] flex items-center justify-center font-black text-xs text-[#66c0f4] shadow-inner uppercase overflow-hidden shrink-0">
                                {m.map_display.slice(0, 3)}
                              </div>

                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-black text-white text-sm">{m.map_display}</span>
                                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded font-mono uppercase ${
                                    m.game_mode === "premier"
                                      ? "bg-[#66c0f4]/20 text-[#66c0f4] border border-[#66c0f4]/40"
                                      : "bg-[#ff5500]/20 text-[#ff7733] border border-[#ff5500]/40"
                                  }`}>
                                    {m.game_mode === "premier" ? "Premier" : "Faceit"}
                                  </span>
                                </div>
                                <div className="text-[11px] text-[#8f98a0]">
                                  {m.duration} · {isWin ? `+${m.elo_diff} ELO` : `${m.elo_diff} ELO`}
                                </div>
                              </div>
                            </div>

                            {/* Time (col 2) */}
                            <div className="lg:col-span-2 text-xs text-[#8f98a0] font-mono">
                              {m.exact_time || m.date_formatted}
                            </div>

                            {/* Score (col 1) */}
                            <div className="lg:col-span-1 text-center font-mono font-black text-base">
                              <span className={isWin ? "text-[#a4d007]" : "text-rose-400"}>
                                {m.score_team1}:{m.score_team2}
                              </span>
                            </div>

                            {/* K / D / A (col 2) */}
                            <div className="lg:col-span-2 text-center text-xs font-mono font-bold text-white">
                              {m.personal_stats.kills} <span className="text-slate-500 font-normal">/</span> {m.personal_stats.deaths} <span className="text-slate-500 font-normal">/</span> {m.personal_stats.assists}
                            </div>

                            {/* HLTV Rating 2.1 with Underline Progress Bar (col 2) */}
                            <div className="lg:col-span-2 flex flex-col items-center justify-center">
                              <span className="text-xs font-black font-mono text-white">
                                {m.personal_stats.hltv_rating}
                              </span>
                              {/* Rating Progress line */}
                              <div className="w-16 h-1 rounded-full bg-[#171a21] mt-1 overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    m.personal_stats.hltv_rating >= 1.2
                                      ? "bg-[#a4d007]"
                                      : m.personal_stats.hltv_rating >= 1.0
                                      ? "bg-amber-400"
                                      : "bg-rose-400"
                                  }`}
                                  style={{
                                    width: `${Math.min(100, (m.personal_stats.hltv_rating / 2.0) * 100)}%`,
                                  }}
                                />
                              </div>
                            </div>

                            {/* Rank Badge (col 1) */}
                            <div className="lg:col-span-1 flex items-center justify-center">
                              <div className="w-7 h-7 rounded-full bg-[#ff5500]/20 border border-[#ff5500] flex items-center justify-center text-[10px] font-black text-[#ff7733] shadow-sm">
                                {m.rank_badge || "10"}
                              </div>
                            </div>

                            {/* Clips / Demo Buttons (col 1) */}
                            <div className="lg:col-span-1 flex items-center justify-end gap-2">
                              {m.clips_count && m.clips_count > 0 ? (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectMatchForStudio(m);
                                  }}
                                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ff5500]/20 border border-[#ff5500]/60 hover:bg-[#ff5500] hover:text-black text-[#ff7733] text-[10px] font-black transition-all"
                                  title="Ushbu matchdagi videoni ko'rish"
                                >
                                  <Play className="w-2.5 h-2.5 fill-current" />
                                  <span>{m.clips_count}</span>
                                  <ChevronRight className="w-3 h-3" />
                                </button>
                              ) : (
                                <button
                                  onClick={(e) => handleDownloadDemo(m, e)}
                                  className="p-1.5 rounded-lg bg-[#1b2838] hover:bg-[#203248] text-[#66c0f4] border border-[#2a475e] transition-colors"
                                  title="Demoni (.dem) yuklab olish"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Expanded Full Faceit Scoreboard for Uploaded Match */}
                          {isSelected && (
                            <div className="mt-4 pt-4 border-t border-[#2a475e]/60 space-y-4 animate-fade-in" onClick={e => e.stopPropagation()}>
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#13171e] p-3 rounded-xl border border-[#2a475e]/60">
                                <div className="flex items-center gap-2">
                                  <Trophy className="w-4 h-4 text-amber-400" />
                                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                                    Faceit Scoreboard & Match Stats
                                  </span>
                                  <span className="text-[10px] font-mono text-[#8f98a0]">
                                    (ID: {m.match_id.slice(0, 16)}...)
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  {/* 1-Click .dem direct download */}
                                  <button
                                    onClick={(e) => handleDownloadDemo(m, e)}
                                    className="btn-steam-green px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 shadow-md"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                    <span>Demoni Yuklash (.dem)</span>
                                  </button>

                                  {/* Create movie rolik */}
                                  <button
                                    onClick={() => onSelectMatchForStudio(m)}
                                    className="btn-steam-blue px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 shadow-md"
                                  >
                                    <Video className="w-3.5 h-3.5 text-[#66c0f4]" />
                                    <span>Rolik Yasash</span>
                                  </button>
                                </div>
                              </div>

                              {/* Faction 1 & Faction 2 Rosters */}
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
                                {/* Faction 1 */}
                                <div className="bg-[#141820] rounded-xl border border-[#2a475e]/60 overflow-hidden">
                                  <div className="bg-[#1a222e] px-3 py-2 border-b border-[#2a475e]/60 flex items-center justify-between">
                                    <span className="font-bold text-[#66c0f4]">{m.teams.faction1.name}</span>
                                    <span className="font-mono font-black text-white">{m.score_team1}</span>
                                  </div>
                                  <div className="divide-y divide-[#2a475e]/30">
                                    {m.teams.faction1.roster.map((player) => (
                                      <div key={player.player_id} className="p-2.5 flex items-center justify-between hover:bg-[#1b2838]/50">
                                        <div className="flex items-center gap-2">
                                          {/* eslint-disable-next-line @next/next/no-img-element */}
                                          <img src={player.avatar} alt={player.nickname} className="w-6 h-6 rounded-md bg-[#171a21]" />
                                          <span className="font-bold text-white">{player.nickname}</span>
                                          {player.is_mvp && (
                                            <span className="text-[9px] px-1 rounded bg-amber-400/20 text-amber-400 font-bold">MVP</span>
                                          )}
                                        </div>
                                        <div className="flex items-center gap-3 font-mono text-[11px]">
                                          <span className="text-white font-bold">{player.kills}/{player.deaths}</span>
                                          <span className="text-slate-400">ADR: {player.adr}</span>
                                          <span className={player.hltv_rating >= 1.1 ? "text-[#a4d007] font-bold" : "text-slate-400"}>
                                            {player.hltv_rating}
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Faction 2 */}
                                <div className="bg-[#141820] rounded-xl border border-[#2a475e]/60 overflow-hidden">
                                  <div className="bg-[#1a222e] px-3 py-2 border-b border-[#2a475e]/60 flex items-center justify-between">
                                    <span className="font-bold text-[#ff7733]">{m.teams.faction2.name}</span>
                                    <span className="font-mono font-black text-white">{m.score_team2}</span>
                                  </div>
                                  <div className="divide-y divide-[#2a475e]/30">
                                    {m.teams.faction2.roster.map((player) => (
                                      <div key={player.player_id} className="p-2.5 flex items-center justify-between hover:bg-[#1b2838]/50">
                                        <div className="flex items-center gap-2">
                                          {/* eslint-disable-next-line @next/next/no-img-element */}
                                          <img src={player.avatar} alt={player.nickname} className="w-6 h-6 rounded-md bg-[#171a21]" />
                                          <span className="font-bold text-white">{player.nickname}</span>
                                          {player.is_mvp && (
                                            <span className="text-[9px] px-1 rounded bg-amber-400/20 text-amber-400 font-bold">MVP</span>
                                          )}
                                        </div>
                                        <div className="flex items-center gap-3 font-mono text-[11px]">
                                          <span className="text-white font-bold">{player.kills}/{player.deaths}</span>
                                          <span className="text-slate-400">ADR: {player.adr}</span>
                                          <span className={player.hltv_rating >= 1.1 ? "text-[#a4d007] font-bold" : "text-slate-400"}>
                                            {player.hltv_rating}
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    }

                    // Unuploaded Match Row (Row 2, 3, 4 style from screenshot)
                    return (
                      <div
                        key={m.match_id}
                        onClick={() => setSelectedMatch(isSelected ? null : m)}
                        className={`bg-[#181d24]/60 border rounded-2xl p-3.5 transition-all cursor-pointer hover:bg-[#1f2834] ${
                          isSelected
                            ? "border-[#2a475e] bg-[#1c2430]"
                            : "border-[#2a475e]/40 hover:border-[#2a475e]"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          {/* Left: Map avatar, Score & Date */}
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#141820] border border-[#2a475e]/60 flex items-center justify-center font-bold text-xs text-slate-400 uppercase">
                              {m.map_display.slice(0, 3)}
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white text-sm">
                                  {m.map_display} <span className="font-mono text-xs text-slate-300">{m.score_team1}-{m.score_team2}</span>
                                </span>
                              </div>
                              <div className="text-[11px] text-[#8f98a0]">
                                <span className="text-[#ff7733] font-bold">Faceit</span> {m.exact_time || m.date_formatted}
                              </div>
                            </div>
                          </div>

                          {/* Right: "Import demo 2" & "Upload the demo manually" buttons */}
                          <div className="flex items-center gap-2 flex-wrap">
                            {/* Import demo button with coin icon */}
                            <button
                              onClick={(e) => handleImportDemo(m, e)}
                              disabled={isImportingMatchId === m.match_id}
                              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#34241e] hover:bg-[#452f27] border border-[#ff7733]/40 text-[#ffaa00] text-xs font-bold transition-all shadow-sm active:scale-95"
                            >
                              <Coins className="w-3 h-3 text-[#ffaa00]" />
                              <span>{isImportingMatchId === m.match_id ? "Importing..." : "Import demo"}</span>
                              <span className="font-mono font-black text-white text-[10px] bg-black/40 px-1.5 py-0.2 rounded">
                                2
                              </span>
                            </button>

                            {/* Direct Download .dem button */}
                            <button
                              onClick={(e) => handleDownloadDemo(m, e)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1b2838] hover:bg-[#203248] border border-[#2a475e] text-[#66c0f4] text-xs font-bold transition-all"
                              title="Demoni (.dem) to'g'ridan-to'g'ri bepul yuklash"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>.dem</span>
                            </button>

                            {/* Upload manually */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsUploadModalOpen(true);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-[#181d24] hover:bg-[#203248] border border-[#2a475e]/70 text-[#8f98a0] hover:text-white text-xs font-bold transition-colors"
                            >
                              Upload the demo manually
                            </button>
                          </div>
                        </div>

                        {/* Collapsible details for unuploaded match if user clicks */}
                        {isSelected && (
                          <div className="mt-3 pt-3 border-t border-[#2a475e]/40 text-xs flex items-center justify-between text-[#8f98a0] animate-fade-in" onClick={e => e.stopPropagation()}>
                            <span>Ushbu matchning demo hajmi: <strong className="text-white">{m.demo_size_mb} MB</strong></span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => handleDownloadDemo(m, e)}
                                className="text-[#66c0f4] hover:underline font-bold flex items-center gap-1"
                              >
                                <Download className="w-3 h-3" />
                                Demoni yuklab olish
                              </button>
                              <span>•</span>
                              <button
                                onClick={() => onSelectMatchForStudio(m)}
                                className="text-[#ff7733] hover:underline font-bold flex items-center gap-1"
                              >
                                <Video className="w-3 h-3" />
                                Highlight yasash
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Manual Demo Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#2a475e] pb-3">
              <div className="flex items-center gap-2 text-white font-black text-base">
                <UploadCloud className="w-5 h-5 text-[#ff5500]" />
                <span>CS2 .dem Faylini Yuklash</span>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-[#8f98a0] hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#8f98a0] leading-relaxed">
              Kompyuteringizdagi <code className="text-[#66c0f4]">.dem</code> yoki <code className="text-[#66c0f4]">.dem.zst</code> faylini tanlang. Sayt avtomatik ravishda barcha killfeed, k/d va highlightlarni tahlil qiladi.
            </p>

            <div
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = ".dem,.zst,.gz";
                input.onchange = (e: any) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setIsUploadModalOpen(false);
                    setDownloadSuccessMessage(`✓ "${file.name}" muvaffaqiyatli yuklandi va tahlil qilindi!`);
                    confetti({
                      particleCount: 80,
                      spread: 60,
                      origin: { y: 0.3 },
                      colors: ["#66c0f4", "#a4d007"],
                    });
                    setTimeout(() => setDownloadSuccessMessage(null), 4000);
                  }
                };
                input.click();
              }}
              className="border-2 border-dashed border-[#2a475e] hover:border-[#66c0f4] rounded-2xl p-8 text-center cursor-pointer transition-colors bg-[#171a21]/50 group"
            >
              <UploadCloud className="w-10 h-10 text-[#8f98a0] group-hover:text-[#66c0f4] mx-auto transition-colors" />
              <div className="text-sm font-bold text-white mt-3">
                Faylni tanlash uchun bu yerga bosing
              </div>
              <div className="text-[11px] text-[#8f98a0] mt-1">
                Yoki .dem faylini bu yerga sudrab olib keling (Drag & Drop)
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] text-[#8f98a0]">
                Maksimal hajm: 500 MB · Bepul
              </span>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-[#2a475e] hover:bg-[#32536e] text-white text-xs font-bold transition-colors"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
