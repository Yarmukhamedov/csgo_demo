"use client";

import React, { useState } from "react";
import { UploadCloud, Link as LinkIcon, Sparkles, Play, Shield, Video, Flame, Zap, Award } from "lucide-react";

interface HeroSectionProps {
  onLoadSample: () => void;
  onFileUpload: (file: File) => void;
  onShareCodeSubmit: (code: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onLoadSample,
  onFileUpload,
  onShareCodeSubmit,
}) => {
  const [tab, setTab] = useState<"file" | "code">("file");
  const [inputVal, setInputVal] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    onShareCodeSubmit(inputVal);
  };

  return (
    <div className="relative pt-8 pb-12 overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 cs-radial-glow pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 cs-ct-radial-glow pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-6">
          <Flame className="w-3.5 h-3.5" />
          <span>CS2 Matchlaringizdan Professional Highlight Roliklar Tayyorlang</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
          O&apos;yiningizni <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-glow-orange">Rolik</span>ga Aylantiring!
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Demo yuklang yoki Steam/FACEIT match kodini kiriting. Tizim <strong className="text-amber-400 font-semibold">Ace</strong>, <strong className="text-amber-400 font-semibold">1vX Clutch</strong> va eng ajoyib killaringizni avtomatik topib, <span className="text-sky-400 font-semibold">TikTok / Reels (9:16)</span> formatida rolik yaratadi!
        </p>

        {/* Dropzone & Input Box */}
        <div className="mt-8 max-w-2xl mx-auto bg-[#0c101c]/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
          {/* Tabs */}
          <div className="flex items-center justify-center gap-2 mb-5">
            <button
              onClick={() => setTab("file")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                tab === "file"
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                  : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              .DEM Fayl Yuklash
            </button>
            <button
              onClick={() => setTab("code")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                tab === "code"
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                  : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <LinkIcon className="w-4 h-4" />
              Steam / FACEIT Kodi
            </button>
          </div>

          {tab === "file" ? (
            /* File Drag & Drop */
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                isDragging
                  ? "border-amber-400 bg-amber-500/10 scale-[1.01]"
                  : "border-slate-700/80 bg-slate-900/40 hover:border-slate-600 hover:bg-slate-900/70"
              }`}
            >
              <input
                type="file"
                id="demo-upload-input"
                accept=".dem,.gz,.zip"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    onFileUpload(e.target.files[0]);
                  }
                }}
              />
              <label htmlFor="demo-upload-input" className="cursor-pointer block">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <p className="text-sm font-bold text-white mb-1">
                  CS2 <span className="text-amber-400 font-mono">.dem</span> faylingizni shu yerga tashlang
                </p>
                <p className="text-xs text-slate-400 mb-3">
                  yoki kompyuterdan tanlash uchun bosing (max: 250MB)
                </p>
                <div className="inline-flex items-center gap-2 text-[11px] text-slate-500 bg-slate-800/60 px-3 py-1 rounded-full border border-slate-700/50">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  Brauzerning o&apos;zida WebAssembly orqali xavfsiz o&apos;qiladi
                </div>
              </label>
            </div>
          ) : (
            /* Steam / Faceit Code Input */
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="CSGO-xxxxx-xxxxx... yoki FACEIT match havolasi"
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-mono transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-sm hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <Zap className="w-4 h-4 fill-black" />
                Matchni Qidirish va Highlightlarni Ajratish
              </button>
            </form>
          )}

          {/* Quick Demo Preview button */}
          <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Faylingiz yo&apos;qmi? Darhol sinab ko&apos;ring:</span>
            <button
              onClick={onLoadSample}
              className="inline-flex items-center gap-1.5 font-bold text-amber-400 hover:text-amber-300 hover:underline transition-all"
            >
              <Play className="w-3 h-3 fill-amber-400" />
              Namuna Matchni Ko&apos;rish (Mirage 13:10)
            </button>
          </div>
        </div>

        {/* 4 Feature Value Pills */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
          <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Avto-Highlight</div>
              <div className="text-[11px] text-slate-400">Ace va 1vX Clutchlar</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">9:16 Shorts/Reels</div>
              <div className="text-[11px] text-slate-400">TikTok uchun tayyor MP4</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">HLTV 2.1 Reyting</div>
              <div className="text-[11px] text-slate-400">K/D, ADR & Statistika</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">100% Bepul</div>
              <div className="text-[11px] text-slate-400">Cheklovlarsiz roliklar</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
