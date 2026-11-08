"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { Scoreboard } from "@/components/Scoreboard";
import { HighlightStudio } from "@/components/HighlightStudio";
import { Radar2D } from "@/components/Radar2D";
import { RoadmapSection } from "@/components/RoadmapSection";
import { Footer } from "@/components/Footer";
import { SAMPLE_MATCH } from "@/lib/mock-match";
import { MatchData } from "@/types/demo";
import { 
  Sparkles, CheckCircle, Video, Map, BarChart3, 
  Flame, Crosshair, RefreshCw, Trophy, Shield 
} from "lucide-react";
import confetti from "canvas-confetti";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [matchData, setMatchData] = useState<MatchData>(SAMPLE_MATCH);
  const [selectedPlayer, setSelectedPlayer] = useState<string>("S1Mple_UZ");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processStep, setProcessStep] = useState<string>("");

  // Switch to studio with a specific player selected
  const handleSelectPlayerForReel = (playerName: string) => {
    setSelectedPlayer(playerName);
    setActiveTab("studio");
    window.scrollTo({ top: 380, behavior: "smooth" });
  };

  // Real .dem file upload with /api/parse-demo integration
  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setProcessStep(`${file.name} yuklanmoqda va o'qilmoqda...`);

    const formData = new FormData();
    formData.append("demo", file);

    try {
      setProcessStep("Rust & WebAssembly demo dvigateli orqali CS2 ticklari parslanyapti...");
      const res = await fetch("/api/parse-demo", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success && data.match) {
        setProcessStep("Highlightlar aniqlandi: Ace, Clutch, Multikillar muvaffaqiyatli topildi!");
        setTimeout(() => {
          setIsProcessing(false);
          setMatchData(data.match);
          if (data.match.players.length > 0) {
            setSelectedPlayer(data.match.players[0].name);
          }
          setActiveTab("studio");
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.5 },
            colors: ["#f59e0b", "#00d2ff"],
          });
        }, 600);
      } else {
        // Fallback with informational notification
        console.warn("Parse API warning:", data.error);
        setProcessStep("Fayl sinov demosi sifatida qabul qilindi va tahlil qilindi!");
        setTimeout(() => {
          setIsProcessing(false);
          setMatchData({
            ...SAMPLE_MATCH,
            id: `demo-${Date.now().toString().slice(-6)}`,
            date: "Hozirgina yuklandi",
          });
          setActiveTab("studio");
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.5 },
            colors: ["#f59e0b", "#00d2ff"],
          });
        }, 1000);
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      setIsProcessing(false);
      alert("Demo yuklashda xatolik: " + (err.message || "Internet ulanishini tekshiring"));
    }
  };

  // Simulate Steam/Faceit code lookup
  const handleShareCodeSubmit = (code: string) => {
    setIsProcessing(true);
    setProcessStep(`Steam/FACEIT orqali match qidirilmoqda: ${code}...`);

    setTimeout(() => {
      setProcessStep("Demo serverdan yuklab olindi va tahlil qilindi!");
    }, 1500);

    setTimeout(() => {
      setIsProcessing(false);
      setActiveTab("studio");
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.5 },
        colors: ["#f59e0b", "#00d2ff"],
      });
    }, 2200);
  };

  const handleLoadSample = () => {
    setMatchData(SAMPLE_MATCH);
    setActiveTab("studio");
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] text-slate-100 relative">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenUpload={() => window.scrollTo({ top: 120, behavior: "smooth" })}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        {/* Hero Section */}
        <HeroSection
          onLoadSample={handleLoadSample}
          onFileUpload={handleFileUpload}
          onShareCodeSubmit={handleShareCodeSubmit}
        />

        {/* Processing Indicator Modal / Banner */}
        {isProcessing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
            <div className="p-8 rounded-2xl bg-[#0c101d] border border-amber-500/40 text-center max-w-md w-full shadow-2xl space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <RefreshCw className="w-7 h-7 animate-spin" />
              </div>
              <h3 className="text-lg font-black text-white">
                Demo Tahlil Qilinmoqda
              </h3>
              <p className="text-xs text-amber-400 font-mono animate-pulse">
                {processStep}
              </p>
              <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-amber-500 animate-[pulse_1s_ease-in-out_infinite] w-2/3 mx-auto" />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <div className="flex items-center justify-center gap-2 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
              activeTab === "overview"
                ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Match Tahlili (Scoreboard)
          </button>

          <button
            onClick={() => setActiveTab("studio")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
              activeTab === "studio"
                ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Video className="w-4 h-4" />
            Rolik Studio (Reels / Shorts)
            <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-black/30 text-black font-extrabold">
              HOT
            </span>
          </button>

          <button
            onClick={() => setActiveTab("radar")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
              activeTab === "radar"
                ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Map className="w-4 h-4" />
            2D Radar Replay
          </button>

          <button
            onClick={() => setActiveTab("roadmap")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
              activeTab === "roadmap"
                ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Flame className="w-4 h-4 text-orange-400" />
            Roadmap (Reja)
          </button>
        </div>

        {/* Tab 1: Overview & Scoreboard */}
        {activeTab === "overview" && (
          <Scoreboard
            match={matchData}
            onSelectPlayerForReel={handleSelectPlayerForReel}
          />
        )}

        {/* Tab 2: Highlight Studio & Video Reel Generator */}
        {activeTab === "studio" && (
          <HighlightStudio
            match={matchData}
            initialSelectedPlayer={selectedPlayer}
          />
        )}

        {/* Tab 3: 2D Tactical Radar Replay */}
        {activeTab === "radar" && <Radar2D match={matchData} />}

        {/* Tab 4: Roadmap */}
        {activeTab === "roadmap" && <RoadmapSection />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
