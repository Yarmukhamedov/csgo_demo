"use client";

import React from "react";
import { 
  CheckCircle2, Clock, Smartphone, Monitor, Cpu, 
  Sparkles, Layers, ShieldCheck, Flame, ArrowRight
} from "lucide-react";

export const RoadmapSection: React.FC = () => {
  const steps = [
    {
      phase: "Faza 1",
      title: "Arxitektura & Kiber-Dizayn (Web MVP)",
      status: "done",
      date: "1-Hafta",
      desc: "Next.js 15, Tailwind CSS, kiber-sport (CS2) mavzusi, Vercel bepul hostingi, match overview va rolik simulyatori.",
      tags: ["Next.js 15", "Vercel", "TailwindCSS", "Cyberpunk UI"],
    },
    {
      phase: "Faza 2",
      title: "Demo Parser & Highlight Aniqlash Algoritmi",
      status: "done",
      date: "2-Hafta",
      desc: "Rust & demoparser2 dvigateli, /api/parse-demo marshruti orqali Ace, Clutch (1vX), 4K/3K, Noscope va Knifelarni tickma-tick aniqlash.",
      tags: ["Rust Parser", "demoparser2", "Tick Analyzer", "Auto-Clips"],
    },
    {
      phase: "Faza 3",
      title: "2D Radar Replay & Kengaytirilgan Tahlil",
      status: "done",
      date: "3-Hafta",
      desc: "Barcha faol CS2 xaritalari (Mirage, Dust II, Inferno, Nuke, Ancient), interaktiv otishmalar Heatmapi, granatalar (Smoke, Fire) va Opening Duels tahlili.",
      tags: ["Multi-Map", "2D Radar", "Heatmaps", "Opening Duels", "Utilities"],
    },
    {
      phase: "Faza 4",
      title: "Chiroyli Rolik - Video Studio & Telegram Bot",
      status: "current",
      date: "4-Hafta",
      desc: "Remotion va brauzer WebCodecs orqali 9:16 (TikTok/Reels) formatda musiqa, slow-mo va killfeedli MP4 videoni bepul generatsiya qilish va Telegramga jo'natish.",
      tags: ["Remotion", "MP4 Generator", "Telegram Bot", "9:16 Reels"],
    },
    {
      phase: "Faza 5",
      title: "Desktop Yordamchi & Mobil Ilova (CS2 HLAE 120 FPS)",
      status: "future",
      date: "Kelajakda",
      desc: "Kompyuter uchun yengil Tauri ilovasi (CS2 + HLAE orqali o'yinchining o'z kompyuterida 120 FPS kinodek ultra roliklar) hamda iOS/Android ilovasi.",
      tags: ["Tauri App", "HLAE 120 FPS", "React Native", "Android & iOS"],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20 mb-3">
          <Flame className="w-3.5 h-3.5" />
          Rivojlanish Yo&apos;l Xaritasi
        </div>
        <h2 className="text-3xl font-black text-white">
          Loyiha Qadamba-Qadam Qanday Mukammallashadi?
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Hozirda veb-platforma Vercel bepul hostingida ishga tushirilmoqda. Keyinchalik esa to&apos;liq avtonom ilova va 120 FPS rolik generatoriga aylanadi.
        </p>
      </div>

      {/* Timeline Steps */}
      <div className="max-w-4xl mx-auto space-y-4">
        {steps.map((step, idx) => {
          const isDone = step.status === "done";
          const isCurrent = step.status === "current";

          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all ${
                isCurrent
                  ? "bg-slate-900/90 border-amber-500/60 shadow-xl shadow-amber-500/10"
                  : isDone
                  ? "bg-slate-900/40 border-emerald-500/30"
                  : "bg-slate-950/40 border-slate-800/80 opacity-70"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs ${
                      isDone
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : isCurrent
                        ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-amber-400 font-bold">
                        {step.phase}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-[11px] text-slate-400 font-semibold">
                        {step.date}
                      </span>
                      {isCurrent && (
                        <span className="px-2 py-0.2 rounded-full text-[9px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
                          JARAYONDA
                        </span>
                      )}
                      {isDone && (
                        <span className="px-2 py-0.2 rounded-full text-[9px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          BAJARILDI
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      {step.title}
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed pl-0 sm:pl-12">
                {step.desc}
              </p>

              {/* Tags */}
              <div className="flex items-center gap-2 flex-wrap mt-3 pl-0 sm:pl-12">
                {step.tags.map((t, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/60"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Architecture Highlights Note */}
      <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-sky-950/40 via-slate-900 to-amber-950/30 border border-slate-800 text-xs text-slate-300 space-y-3">
        <div className="flex items-center gap-2 font-bold text-white text-sm">
          <Cpu className="w-4 h-4 text-sky-400" />
          <span>Vercel'da 100% Bepul Ishlash Sirlari:</span>
        </div>
        <p className="leading-relaxed">
          1. <strong>Demo o'qish xarajati $0:</strong> CS2 .dem fayllari WebAssembly (WASM) yordamida bevosita foydalanuvchining o&apos;z brauzerida parslaydi. Vercel serverlariga og&apos;ir yuk tushmaydi.
          <br />
          2. <strong>Fayllar saqlash:</strong> Cloudflare R2 bepul 10GB xotirasidan foydalaniladi (chiqish trafigi mutlaqo bepul).
          <br />
          3. <strong>Desktop integratsiyasi:</strong> Foydalanuvchi kompyuterida CS2 o&apos;rnatilgan bo&apos;lsa, HLAE orqali kino sifatidagi rolikni o&apos;z GPU&apos;sida bepul render qilishi mumkin.
        </p>
      </div>
    </div>
  );
};
