"use client";

import React, { useState } from "react";
import { HighlightMoment, MatchData, ReelSettings, KillEvent } from "@/types/demo";
import { 
  Flame, CheckCircle2, Circle, Clock, Target, 
  Smartphone, Monitor, Music, Sparkles, Sliders, 
  Eye, RefreshCw, Scissors, ShieldAlert, Award
} from "lucide-react";
import { VideoReelPlayer } from "./VideoReelPlayer";

interface HighlightStudioProps {
  match: MatchData;
  initialSelectedPlayer?: string;
}

export const HighlightStudio: React.FC<HighlightStudioProps> = ({ 
  match, 
  initialSelectedPlayer = "S1Mple_UZ" 
}) => {
  const [highlights, setHighlights] = useState<HighlightMoment[]>(match.highlights);
  const [selectedPlayer, setSelectedPlayer] = useState(initialSelectedPlayer);
  const [reelSettings, setReelSettings] = useState<ReelSettings>({
    aspectRatio: "9:16",
    selectedPlayer: initialSelectedPlayer,
    themeStyle: "cyber",
    musicTrack: "phonk_drive",
    showIntroCard: true,
    slowMotionOnKill: true,
    bassDropKillfeed: true,
    resolution: "1080p",
  });

  // Toggle single highlight
  const toggleHighlight = (id: string) => {
    setHighlights((prev) =>
      prev.map((h) => (h.id === id ? { ...h, selected: !h.selected } : h))
    );
  };

  // Toggle all highlights
  const toggleAll = (select: boolean) => {
    setHighlights((prev) => prev.map((h) => ({ ...h, selected: select })));
  };

  // Filtered highlights for selected player or all
  const activeHighlights = highlights.filter((h) => h.selected);
  const totalClipsCount = activeHighlights.length;
  const estimatedSeconds = totalClipsCount * 12 + (reelSettings.showIntroCard ? 4 : 0);

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case "ace":
        return "bg-rose-500/20 text-rose-300 border-rose-500/40";
      case "clutch":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      case "4k":
      case "3k":
        return "bg-purple-500/20 text-purple-300 border-purple-500/40";
      case "knife":
        return "bg-red-500/20 text-red-300 border-red-500/40";
      default:
        return "bg-blue-500/20 text-blue-300 border-blue-500/40";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Scissors className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-black text-white">
              CS2 Highlight & Rolik Studio
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-black">
              AI DETECTOR
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Tizim demodagi eng zo&apos;r kadrlarni aniqladi. Rolikka kerakli lahzalarni belgilang va sozlamalarni tanlang.
          </p>
        </div>

        {/* Selected player selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-slate-400">O&apos;yinchi:</label>
          <select
            value={selectedPlayer}
            onChange={(e) => {
              setSelectedPlayer(e.target.value);
              setReelSettings((s) => ({ ...s, selectedPlayer: e.target.value }));
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-amber-400 focus:outline-none focus:border-amber-400"
          >
            {match.players.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name} ({p.kills} kill / {p.team})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Studio Grid: Left (Highlight Selection & Settings), Right (Live Video Player Preview) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Highlights list + Customizer (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Quick Select Buttons */}
          <div className="flex items-center justify-between text-xs">
            <div className="font-bold text-slate-300">
              Topilgan Highlightlar ({highlights.length})
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleAll(true)}
                className="text-amber-400 hover:text-amber-300 hover:underline font-semibold"
              >
                Hammasini tanlash
              </button>
              <span className="text-slate-600">•</span>
              <button
                onClick={() => toggleAll(false)}
                className="text-slate-400 hover:text-white hover:underline"
              >
                Tozalash
              </button>
            </div>
          </div>

          {/* Highlights Cards List */}
          <div className="space-y-3">
            {highlights.map((h) => {
              const isSelected = h.selected;
              return (
                <div
                  key={h.id}
                  onClick={() => toggleHighlight(h.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-slate-900/90 border-amber-500/50 shadow-lg shadow-amber-500/5"
                      : "bg-[#0c101d]/60 border-slate-800/80 hover:border-slate-700 opacity-70"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <button className="mt-0.5 text-amber-400">
                        {isSelected ? (
                          <CheckCircle2 className="w-5 h-5 fill-amber-400 text-black" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-600" />
                        )}
                      </button>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${getBadgeStyle(h.type)}`}>
                            {h.type}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            Raund {h.roundNumber} ({h.timeFormatted})
                          </span>
                          <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                            Impact {h.impactScore}/100
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-white mt-1">
                          {h.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                          {h.description}
                        </p>

                        {/* Killfeed badges inside card */}
                        <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                          {h.kills.map((k, idx) => (
                            <div
                              key={idx}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300"
                            >
                              <span className="font-semibold text-white">{k.weapon}</span>
                              {k.isHeadshot && (
                                <span className="text-rose-400 text-[10px] font-bold">HS</span>
                              )}
                              {k.isNoScope && (
                                <span className="text-purple-400 text-[10px] font-bold">NOSCOPE</span>
                              )}
                              <span className="text-slate-500">→</span>
                              <span className="text-slate-300 font-mono">{k.victimName}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reel Customizer Settings */}
          <div className="p-5 rounded-2xl bg-[#0c101d] border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-slate-800/80 pb-3">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Rolik Format va Effekt Sozlamalari</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Aspect Ratio */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Video O&apos;lchami (Format)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setReelSettings((s) => ({ ...s, aspectRatio: "9:16" }))}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      reelSettings.aspectRatio === "9:16"
                        ? "bg-amber-500 text-black border-amber-400 shadow-sm"
                        : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    9:16 (TikTok / Reels)
                  </button>

                  <button
                    onClick={() => setReelSettings((s) => ({ ...s, aspectRatio: "16:9" }))}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      reelSettings.aspectRatio === "16:9"
                        ? "bg-amber-500 text-black border-amber-400 shadow-sm"
                        : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                    16:9 (YouTube)
                  </button>
                </div>
              </div>

              {/* Music Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Fon Musiqasi
                </label>
                <select
                  value={reelSettings.musicTrack}
                  onChange={(e) =>
                    setReelSettings((s) => ({
                      ...s,
                      musicTrack: e.target.value as any,
                    }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="phonk_drive">🏎️ CS2 Phonk Drive (High Energy)</option>
                  <option value="epic_trailer">🎬 Epic Cinematic Trailer</option>
                  <option value="trap_energy">🔥 Fast Trap Beat</option>
                  <option value="lofi_chill">☕ Lo-Fi Chill Beats</option>
                  <option value="none">🔇 Musiqasiz (O&apos;yin ovozlari)</option>
                </select>
              </div>
            </div>

            {/* Checkbox Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={reelSettings.showIntroCard}
                  onChange={(e) =>
                    setReelSettings((s) => ({ ...s, showIntroCard: e.target.checked }))
                  }
                  className="accent-amber-500 rounded"
                />
                <span>Player Intro Card</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={reelSettings.slowMotionOnKill}
                  onChange={(e) =>
                    setReelSettings((s) => ({ ...s, slowMotionOnKill: e.target.checked }))
                  }
                  className="accent-amber-500 rounded"
                />
                <span>Slow-Mo Killar</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={reelSettings.bassDropKillfeed}
                  onChange={(e) =>
                    setReelSettings((s) => ({ ...s, bassDropKillfeed: e.target.checked }))
                  }
                  className="accent-amber-500 rounded"
                />
                <span>Bass-Drop Killfeed</span>
              </label>
            </div>
          </div>

          {/* Real 3D In-Game Broadcast Recorder (Allstar Engine) */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-sky-500/10 border-2 border-amber-500/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-500 text-black font-black text-xs">
                  3D CS2
                </span>
                <div>
                  <h4 className="text-sm font-black text-white">
                    Haqiqiy CS2 O&apos;yin Ichidagi Translyatsiya Video Renderi
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Allstar.gg kabi 1080p 60 FPS in-game kadrlar, AWP zarbalari va sound FX.
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100% VAC XAVFSIZ (-insecure)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
              <div>
                <div className="text-slate-400">Faol Demo:</div>
                <div className="font-mono text-amber-400 font-bold truncate">
                  my_highlight.dem (172 MB Mirage)
                </div>
              </div>
              <div>
                <div className="text-slate-400">Dvigatel Holati:</div>
                <div className="text-emerald-400 font-bold">
                  ✓ HLAE + FFmpeg O&apos;rnatildi
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-2">
              <div className="font-bold text-white flex items-center justify-between">
                <span>Professional Movie Maker Sozlamalari:</span>
                <span className="text-amber-400 font-mono text-[10px]">CRF 12 Ultra Lossless</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[10px]">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-amber-400 font-bold">[F5] KINO REJIMI</div>
                  <div className="text-slate-400 mt-0.5">HP, Armor, Radar, Hammasi yashiriladi (Clean 3D)</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 border border-amber-500/30">
                  <div className="text-emerald-400 font-bold">[F6] ESPORTS REJIMI</div>
                  <div className="text-slate-300 mt-0.5">Faqat Killfeed & Nishon (Movie makerlar standarti)</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-sky-400 font-bold">[F7] STANDART HUD</div>
                  <div className="text-slate-400 mt-0.5">O&apos;yinning asl to&apos;liq menyulari qaytadi</div>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 pt-1">
                Yozish uchun: <strong className="text-amber-400">[F9]</strong> Start, <strong className="text-amber-400">[F10]</strong> Stop. O&apos;yindan chiqqach <code className="text-amber-400 font-mono">PROCESS_CLIPS.bat</code> avtomatik MP4 qilib beradi.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Live Video Reel Simulator (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <VideoReelPlayer
              match={match}
              highlights={activeHighlights}
              settings={reelSettings}
              playerStats={match.players.find((p) => p.name === selectedPlayer)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
