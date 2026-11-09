"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, Lock, ExternalLink, X, Copy, 
  Check, RefreshCw, LogOut, Sparkles, User, Globe 
} from "lucide-react";
import confetti from "canvas-confetti";
import { SteamUserProfile } from "@/lib/steam-service";

interface SteamAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: {
    nickname: string;
    avatar: string;
    steam_id_64: string;
    is_logged_in?: boolean;
  };
  onSuccess: (userData: { nickname: string; avatar: string; steamId64: string }) => void;
  onLogout?: () => void;
}

export const SteamAuthModal: React.FC<SteamAuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSuccess,
  onLogout,
}) => {
  const [steamInput, setSteamInput] = useState(currentUser?.steam_id_64 || "76561198845729104");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewProfile, setPreviewProfile] = useState<SteamUserProfile | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  if (!isOpen) return null;

  // Real Steam OpenID Redirect
  const handleSteamOpenIdLogin = () => {
    setIsLoading(true);
    window.location.href = "/api/auth/steam/login";
  };

  // Instant profile lookup by SteamID or Vanity URL
  const handleResolveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!steamInput.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`/api/auth/steam/profile?id=${encodeURIComponent(steamInput.trim())}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Steam profili topilmadi.");
        setPreviewProfile(null);
      } else {
        setPreviewProfile(data.profile);
      }
    } catch {
      setErrorMessage("Steam serveri bilan bog'lanishda xatolik yuz berdi.");
    } finally {
      setIsLoading(false);
    }
  };

  // Confirm using the resolved profile
  const handleConfirmProfile = (profile: SteamUserProfile) => {
    onSuccess({
      nickname: profile.nickname,
      avatar: profile.avatar,
      steamId64: profile.steamId64,
    });

    // Save to local storage for persistence
    localStorage.setItem(
      "csdemo_steam_user",
      JSON.stringify({
        nickname: profile.nickname,
        avatar: profile.avatar,
        steamId64: profile.steamId64,
        profileUrl: profile.profileUrl,
      })
    );

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.3 },
      colors: ["#66c0f4", "#a4d007"],
    });

    onClose();
  };

  const handleCopySteamId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isLoggedIn = currentUser?.is_logged_in && !isSwitching;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-[#171a21] border border-[#2a475e] p-6 shadow-2xl relative space-y-5 text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8f98a0] hover:text-white p-1 rounded-lg hover:bg-[#203248] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-[#2a475e] pb-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1b2838] to-[#171a21] border border-[#66c0f4]/50 flex items-center justify-center text-[#66c0f4] shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-black text-white uppercase tracking-wider">
              {isLoggedIn ? "STEAM AKKAUNT BOSHQARUVI" : "STEAM ORQALI KIRISH"}
            </h3>
            <p className="text-xs text-[#8f98a0]">
              {isLoggedIn
                ? "Ulangan rasmiy Steam profilingiz ma'lumotlari"
                : "Rasmiy Steam OpenID 2.0 xavfsiz avtorizatsiyasi"}
            </p>
          </div>
        </div>

        {/* State 1: Active Logged In Account Card */}
        {isLoggedIn ? (
          <div className="space-y-4">
            <div className="bg-[#1b2838] border border-[#2a475e] rounded-xl p-4 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#8f98a0]">
                  Faol Steam Hisob
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#a4d007]/10 text-[#a4d007] border border-[#a4d007]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a4d007] animate-pulse" />
                  In-Game CS2
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Steam Avatar with In-Game Green Border */}
                <div className="w-14 h-14 rounded-xl steam-in-game-border overflow-hidden bg-[#171a21] shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.nickname}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-base font-black text-white truncate">
                    {currentUser.nickname}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-[#8f98a0] font-mono">
                      SteamID64: {currentUser.steam_id_64}
                    </span>
                    <button
                      onClick={() => handleCopySteamId(currentUser.steam_id_64)}
                      className="p-1 text-[#66c0f4] hover:text-white transition-colors"
                      title="SteamID-ni nusxalash"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-[#a4d007]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#2a475e]/60 flex items-center justify-between text-xs">
                <a
                  href={`https://steamcommunity.com/profiles/${currentUser.steam_id_64}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#66c0f4] hover:text-white flex items-center gap-1.5 font-bold transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Steam Community Profilini Ochish</span>
                </a>
              </div>
            </div>

            {/* Actions: Switch account or Sign out */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setIsSwitching(true)}
                className="py-2.5 px-4 rounded-xl bg-[#1b2838] hover:bg-[#203248] border border-[#2a475e] text-xs font-bold text-white transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#66c0f4]" />
                <span>Hisobni Almashtirish</span>
              </button>

              <button
                onClick={() => {
                  if (onLogout) onLogout();
                  localStorage.removeItem("csdemo_steam_user");
                  fetch("/api/auth/steam/session", { method: "DELETE" }).catch(() => {});
                  onClose();
                }}
                className="py-2.5 px-4 rounded-xl bg-[#2b1717] hover:bg-[#3b1c1c] border border-rose-500/40 text-xs font-bold text-rose-300 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span>Chiqish (Log Out)</span>
              </button>
            </div>
          </div>
        ) : (
          /* State 2: Login or Connect Flow */
          <div className="space-y-5">
            {/* 1. Official Steam OpenID Button */}
            <div className="space-y-2">
              <button
                onClick={handleSteamOpenIdLogin}
                disabled={isLoading}
                className="w-full group relative overflow-hidden py-3 px-4 rounded-xl bg-[#171a21] border border-[#2a475e] hover:border-[#66c0f4] transition-all duration-300 shadow-xl flex items-center justify-center gap-3 bg-gradient-to-r hover:from-[#1b2838] hover:to-[#22354b]"
              >
                {/* Official Steam Logo SVG */}
                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.82 8.24 11.44l3.19-4.56c-.36-.45-.58-1.03-.58-1.65 0-.17.02-.33.05-.49L8.06 14.8c-.89.15-1.8-.39-2.07-1.28-.31-1.02.26-2.1 1.28-2.41 1.02-.31 2.1.26 2.41 1.28.16.52.09 1.08-.18 1.53l2.84 1.93c.48-.15.99-.2 1.51-.13 1.54.21 2.68 1.48 2.68 3.03 0 1.69-1.37 3.06-3.06 3.06-.59 0-1.15-.17-1.62-.46L8.8 23.95C9.83 24 10.9 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0zm-3.87 13.98c-.68.21-1.41-.18-1.61-.86-.21-.68.18-1.41.86-1.61.68-.21 1.41.18 1.61.86.21.68-.18 1.41-.86 1.61zm8.4 2.74c-.9 0-1.63-.73-1.63-1.63 0-.9.73-1.63 1.63-1.63.9 0 1.63.73 1.63 1.63 0 .9-.73 1.63-1.63 1.63z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs font-black text-white uppercase tracking-wider group-hover:text-[#66c0f4] transition-colors">
                    Sign in through STEAM
                  </div>
                  <div className="text-[10px] text-[#8f98a0]">
                    Rasmiy Valve serveriga o&apos;tish
                  </div>
                </div>
              </button>

              <div className="flex items-center gap-1.5 text-[10px] text-[#8f98a0] px-1">
                <Lock className="w-3 h-3 text-[#a4d007]" />
                <span>Parol talab qilinmaydi. Steam Guard orqali 100% himoyalangan.</span>
              </div>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-[#2a475e] w-full" />
              <span className="bg-[#171a21] px-3 text-[10px] font-bold text-[#8f98a0] uppercase tracking-wider">
                Yoki Steam ID orqali sinxronlash
              </span>
              <div className="border-t border-[#2a475e] w-full" />
            </div>

            {/* 2. Direct SteamID / Profile Link Resolver */}
            <form onSubmit={handleResolveProfile} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#c6d4df] mb-1">
                  SteamID64 yoki Profil Havolasi
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={steamInput}
                    onChange={(e) => setSteamInput(e.target.value)}
                    placeholder="Masalan: 76561198845729104 yoki s1mple"
                    className="flex-1 px-3.5 py-2.5 bg-[#1b2838] border border-[#2a475e] rounded-xl text-xs text-white placeholder-[#8f98a0] focus:outline-none focus:border-[#66c0f4] font-mono"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2.5 bg-[#2a475e] hover:bg-[#345878] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    {isLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <span>Tekshirish</span>}
                  </button>
                </div>
              </div>

              {errorMessage && (
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-300 text-xs">
                  {errorMessage}
                </div>
              )}
            </form>

            {/* Profile Preview Card if resolved */}
            {previewProfile && (
              <div className="bg-[#1b2838] border border-[#a4d007]/50 rounded-xl p-4 shadow-lg space-y-3 animate-fade-in">
                <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#a4d007]">
                  ✓ Profil muvaffaqiyatli topildi
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl steam-in-game-border overflow-hidden bg-[#171a21]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewProfile.avatar}
                      alt={previewProfile.nickname}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h5 className="text-sm font-black text-white">{previewProfile.nickname}</h5>
                    <div className="text-[11px] text-[#8f98a0] font-mono">
                      ID: {previewProfile.steamId64}
                    </div>
                    <div className="text-[10px] text-[#66c0f4]">
                      {previewProfile.stateMessage || previewProfile.onlineState}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleConfirmProfile(previewProfile)}
                  className="w-full btn-steam-green py-2 px-3 rounded-xl text-xs font-black uppercase flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ushbu hisob bilan tizimga kirish</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Footer Note */}
        <div className="text-[10px] text-[#8f98a0] border-t border-[#2a475e] pt-3 text-center">
          Powered by Steam OpenID 2.0 API. Valve Corporation savdo belgisi hisoblanadi.
        </div>
      </div>
    </div>
  );
};
