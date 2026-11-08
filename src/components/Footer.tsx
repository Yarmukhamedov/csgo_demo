"use client";

import React from "react";
import { Crosshair, Heart, Send, Shield } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-[#06080d] text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-black font-black">
              <Crosshair className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-sm font-black text-white">
                CSDEMO<span className="text-amber-400">.UZ</span>
              </span>
              <p className="text-[11px] text-slate-500">
                O&apos;zbekiston CS2 hamjamiyati uchun match tahlili va highlight rolik servisi.
              </p>
            </div>
          </div>

          {/* Socials & Links */}
          <div className="flex items-center gap-4 text-xs font-semibold">
            <a
              href="https://t.me/csdemouz"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors"
            >
              <Send className="w-3.5 h-3.5" /> Telegram Kanal & Bot
            </a>
            <span className="text-slate-700">•</span>
            <span className="text-slate-500 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> Vercel Free Tier Ready
            </span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pt-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            Counter-Strike, CS2 va tegishli logotiplar Valve Corporation savdo belgilaridir. Ushbu sayt Valve bilan to&apos;g&apos;ridan-to&apos;g&apos;ri bog&apos;lanmagan.
          </p>
          <p className="flex items-center gap-1">
            Yaratildi: O&apos;zbekiston kibersportchilari uchun <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
