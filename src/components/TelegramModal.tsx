"use client";

import React, { useState } from "react";
import { Send, Check, Copy, ExternalLink, ShieldCheck, Sparkles, MessageSquare } from "lucide-react";
import { HighlightMoment, MatchData } from "@/types/demo";

interface TelegramModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: MatchData;
  highlight?: HighlightMoment;
}

export const TelegramModal: React.FC<TelegramModalProps> = ({
  isOpen,
  onClose,
  match,
  highlight,
}) => {
  const [telegramUsername, setTelegramUsername] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "https://csdemo.uz";
  const shareText = `🔥 CS2 Match Highlight: ${highlight?.title || "Aqlbovar qilmas Ace!"} (${match.mapDisplay} - ${match.scoreCt}:${match.scoreT})\n\n🎬 Rolikni tomosha qilish:`;
  const telegramShareLink = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${shareText}\n${currentUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDirectSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!telegramUsername.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        onClose();
      }, 2000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-2xl bg-[#0c1220] border border-sky-500/30 p-6 shadow-2xl relative space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">
              Telegramga Yuborish & Ulashish
            </h3>
            <p className="text-xs text-slate-400">
              Rolik havolasini do&apos;stlaringizga yoki kanalingizga ulashing.
            </p>
          </div>
        </div>

        {/* 1-Click Telegram Direct Share */}
        <a
          href={telegramShareLink}
          target="_blank"
          rel="noreferrer"
          className="w-full py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 active:scale-95 transition-all text-center"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Telegramda Ulashish (1-Click Share)</span>
        </a>

        {/* Divider */}
        <div className="flex items-center gap-2 text-slate-600 text-xs my-2">
          <div className="h-[1px] bg-slate-800 flex-1" />
          <span>yoki bot orqali jo&apos;nating</span>
          <div className="h-[1px] bg-slate-800 flex-1" />
        </div>

        {/* Send to Bot Form */}
        <form onSubmit={handleDirectSend} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Telegram Username yoki Chat ID:
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-500 text-sm">@</span>
              <input
                type="text"
                value={telegramUsername}
                onChange={(e) => setTelegramUsername(e.target.value)}
                placeholder="username (masalan: s1mple_uz)"
                className="w-full pl-8 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSending || isSent || !telegramUsername.trim()}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isSending ? (
              <span>Yuborilmoqda...</span>
            ) : isSent ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <Check className="w-4 h-4" /> Yuborildi!
              </span>
            ) : (
              <span>Bot Orqali Shaxsiyga Jo&apos;natish</span>
            )}
          </button>
        </form>

        {/* Copy Link Row */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400">Rolik havolasidan nusxa olish:</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-sky-400 hover:text-sky-300 font-semibold"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Nusxa olindi!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Havolani Nusxalash
              </>
            )}
          </button>
        </div>

        {/* Official Bot Pill */}
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-sky-400" />
            <span>Rasmiy Bot: <strong>@csdemo_uz_bot</strong></span>
          </div>
          <a
            href="https://t.me/csdemouz"
            target="_blank"
            rel="noreferrer"
            className="text-sky-400 hover:underline font-bold"
          >
            Kanalga o&apos;tish →
          </a>
        </div>
      </div>
    </div>
  );
};
