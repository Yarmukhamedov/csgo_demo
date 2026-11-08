"use client";

import React, { useState } from "react";
import { ShieldCheck, Lock, QrCode, Key, CheckCircle, ExternalLink, X } from "lucide-react";

interface SteamAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (nickname: string) => void;
}

export const SteamAuthModal: React.FC<SteamAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [accountName, setAccountName] = useState("Yarmukhamedov");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess(accountName || "Yarmukhamedov");
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-xs bg-[#171a21] border border-[#2a475e] p-6 shadow-2xl relative space-y-5 text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8f98a0] hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Steam Community Header */}
        <div className="flex items-center gap-3 border-b border-[#2a475e] pb-4">
          <div className="w-10 h-10 rounded-full bg-[#1b2838] border border-[#66c0f4]/40 flex items-center justify-center text-[#66c0f4]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-black text-white uppercase tracking-wider">
              STEAM ORQALI KIRISH
            </h3>
            <p className="text-xs text-[#8f98a0]">
              Rasmiy Steam OpenID xavfsiz avtorizatsiyasi
            </p>
          </div>
        </div>

        {/* Steam Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#c6d4df] uppercase mb-1">
              Steam Hisob Nomi (Account Name)
            </label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Steam hisob nomingiz"
              className="w-full px-3.5 py-2.5 bg-[#1b2838] border border-[#2a475e] rounded-xs text-xs text-white placeholder-[#8f98a0] focus:outline-none focus:border-[#66c0f4]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#c6d4df] uppercase mb-1">
              Maxfiy Kalit (Parol)
            </label>
            <input
              type="password"
              defaultValue="••••••••••••"
              className="w-full px-3.5 py-2.5 bg-[#1b2838] border border-[#2a475e] rounded-xs text-xs text-white placeholder-[#8f98a0] focus:outline-none focus:border-[#66c0f4]"
            />
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#8f98a0]">
            <ShieldCheck className="w-4 h-4 text-[#a4d007]" />
            <span>Steam Guard ikki bosqichli himoyasi faol</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-steam-blue py-3 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
          >
            {isLoading ? <span>Tekshirilmoqda...</span> : <span>Kirish (Sign In)</span>}
          </button>
        </form>

        {/* Steam Disclaimer */}
        <div className="text-[10px] text-[#8f98a0] border-t border-[#2a475e] pt-3 text-center">
          Ushbu servis Valve Corporation bilan bog&apos;liq emas. Barcha hisob ma&apos;lumotlari xavfsiz holda saqlanadi.
        </div>
      </div>
    </div>
  );
};
