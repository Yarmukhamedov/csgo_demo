"use client";

import React, { useState } from "react";
import { Flame, CheckCircle, RefreshCw, X, Link2 } from "lucide-react";

interface FaceitAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (nickname: string) => void;
  currentNickname: string;
}

export const FaceitAuthModal: React.FC<FaceitAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  currentNickname,
}) => {
  const [nickname, setNickname] = useState(currentNickname || "Yarmukhamedov");
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess(nickname);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-xs bg-[#171a21] border border-[#ff5500]/50 p-6 shadow-2xl relative space-y-5 text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8f98a0] hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[#2a475e] pb-4">
          <div className="w-10 h-10 rounded-sm bg-[#ff5500]/20 border border-[#ff5500]/40 flex items-center justify-center text-[#ff7733]">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-black text-white uppercase tracking-wider">
              FACEIT AKKAUNTNI ULASH
            </h3>
            <p className="text-xs text-[#8f98a0]">
              Matchlar tarixi va demolarini avtomatik sinxronlash
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#c6d4df] uppercase mb-1">
              FACEIT Nickname yoki Profil ID
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Masalan: Yarmukhamedov, s1mple, m0NESY"
              className="w-full px-3.5 py-2.5 bg-[#1b2838] border border-[#2a475e] rounded-xs text-xs text-white placeholder-[#8f98a0] focus:outline-none focus:border-[#ff5500]"
            />
            <p className="text-[10px] text-[#8f98a0] mt-1">
              Istalgan o&apos;yinchining nicknameni yozsangiz, uning barcha FACEIT matchlari va demolari yuklanadi.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#c6d4df] uppercase mb-1">
              FACEIT API Kaliti (Ixtiyoriy)
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="developers.faceit.com (ixtiyoriy)"
              className="w-full px-3.5 py-2.5 bg-[#1b2838] border border-[#2a475e] rounded-xs text-xs text-white placeholder-[#8f98a0] focus:outline-none focus:border-[#ff5500]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !nickname.trim()}
            className="w-full py-3 bg-[#ff5500] hover:bg-[#ff661a] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 rounded-xs shadow-lg transition-all"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" /> Sinxronlanmoqda...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Link2 className="w-4 h-4" /> Akkauntni Bog&apos;lash & Matchlarni Olish
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
