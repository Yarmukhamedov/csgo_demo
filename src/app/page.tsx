"use client";

import React, { useState, useEffect } from "react";
import { SteamHeader } from "@/components/SteamHeader";
import { Sidebar } from "@/components/Sidebar";
import { FaceitMatchBrowser } from "@/components/FaceitMatchBrowser";
import { StatsView } from "@/components/StatsView";
import { HighlightStudio } from "@/components/HighlightStudio";
import { Radar2D } from "@/components/Radar2D";
import { LoadoutsView } from "@/components/LoadoutsView";
import { RecordsView } from "@/components/RecordsView";
import { RoadmapSection } from "@/components/RoadmapSection";
import { Footer } from "@/components/Footer";
import { SteamAuthModal } from "@/components/SteamAuthModal";
import { FaceitAuthModal } from "@/components/FaceitAuthModal";
import { SAMPLE_MATCH } from "@/lib/mock-match";
import { DEFAULT_FACEIT_USER, SAMPLE_FACEIT_MATCHES } from "@/lib/faceit-service";
import { MatchData, PlayerStats } from "@/types/demo";
import { FaceitMatchItem, FaceitPlayer } from "@/types/faceit";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("matches");
  const [faceitUser, setFaceitUser] = useState<FaceitPlayer>(DEFAULT_FACEIT_USER);
  const [faceitMatches, setFaceitMatches] = useState<FaceitMatchItem[]>(SAMPLE_FACEIT_MATCHES);
  const [matchData, setMatchData] = useState<MatchData>(SAMPLE_MATCH);
  const [selectedPlayer, setSelectedPlayer] = useState<string>("Yarmukhamedov");

  // Auth notifications
  const [authBanner, setAuthBanner] = useState<string | null>(null);

  // Modals
  const [isSteamModalOpen, setIsSteamModalOpen] = useState<boolean>(false);
  const [isFaceitModalOpen, setIsFaceitModalOpen] = useState<boolean>(false);

  // On Mount: Check for real Steam OpenID callback or stored session
  useEffect(() => {
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const authStatus = urlParams.get("auth");
    const steamId = urlParams.get("steamid");
    const nicknameParam = urlParams.get("nickname");

    if (authStatus === "steam_success" && steamId) {
      // 1. Successful Steam OpenID 2.0 login
      const nickname = nicknameParam || `Player_${steamId.slice(-4)}`;
      
      // Fetch latest full profile for avatar
      fetch(`/api/auth/steam/profile?id=${steamId}`)
        .then((res) => res.json())
        .then((data) => {
          const freshAvatar = data.profile?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${steamId}`;
          const freshNick = data.profile?.nickname || nickname;

          const updatedUser: FaceitPlayer = {
            ...DEFAULT_FACEIT_USER,
            nickname: freshNick,
            avatar: freshAvatar,
            steam_id_64: steamId,
            is_logged_in: true,
          };

          setFaceitUser(updatedUser);
          setSelectedPlayer(freshNick);

          // Save to local storage for persistent session
          localStorage.setItem(
            "csdemo_steam_user",
            JSON.stringify({
              nickname: freshNick,
              avatar: freshAvatar,
              steamId64: steamId,
            })
          );
        })
        .catch(() => {
          setFaceitUser((u) => ({
            ...u,
            nickname,
            steam_id_64: steamId,
            is_logged_in: true,
          }));
        });

      // Clear query params from address bar
      window.history.replaceState({}, document.title, window.location.pathname);

      setAuthBanner(`Xush kelibsiz, ${nickname}! Steam hisobingiz muvaffaqiyatli ulandi.`);
      setTimeout(() => setAuthBanner(null), 5000);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.3 },
        colors: ["#66c0f4", "#a4d007", "#ffffff"],
      });
    } else {
      // 2. Check existing session in localStorage
      try {
        const saved = localStorage.getItem("csdemo_steam_user");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.steamId64 && parsed.nickname) {
            setFaceitUser((u) => ({
              ...u,
              nickname: parsed.nickname,
              avatar: parsed.avatar || u.avatar,
              steam_id_64: parsed.steamId64,
              is_logged_in: true,
            }));
            setSelectedPlayer(parsed.nickname);
          }
        }
      } catch {
        // ignore json parse error
      }
    }
  }, []);

  // Switch to studio when user clicks "Ushbu O'yindan Rolik Yasash" on Faceit match
  const handleSelectMatchForStudio = (fMatch: FaceitMatchItem) => {
    const allPlayers: PlayerStats[] = [
      ...fMatch.teams.faction1.roster.map((p, idx) => ({
        id: `p-ct-${idx}`,
        name: p.nickname,
        team: "CT" as const,
        avatar: p.avatar,
        kills: p.kills,
        deaths: p.deaths,
        assists: p.assists,
        adr: p.adr,
        hsPercentage: p.hs_percent,
        hltvRating: p.hltv_rating,
        mvps: p.is_mvp ? 4 : 1,
        faceitLevel: p.skill_level,
        premierRating: 15000 + p.kills * 120,
      })),
      ...fMatch.teams.faction2.roster.map((p, idx) => ({
        id: `p-t-${idx}`,
        name: p.nickname,
        team: "T" as const,
        avatar: p.avatar,
        kills: p.kills,
        deaths: p.deaths,
        assists: p.assists,
        adr: p.adr,
        hsPercentage: p.hs_percent,
        hltvRating: p.hltv_rating,
        mvps: p.is_mvp ? 4 : 1,
        faceitLevel: p.skill_level,
        premierRating: 14000 + p.kills * 120,
      })),
    ];

    const convertedMatch: MatchData = {
      id: fMatch.match_id,
      mapName: fMatch.map_name,
      mapDisplay: fMatch.map_display,
      date: fMatch.date_formatted,
      duration: fMatch.duration,
      gameMode: fMatch.game_mode === "premier" ? "CS2 Premier 5v5" : "FACEIT Competitive 5v5",
      teamCtName: fMatch.teams.faction1.name,
      teamTName: fMatch.teams.faction2.name,
      scoreCt: fMatch.score_team1,
      scoreT: fMatch.score_team2,
      winnerTeam: fMatch.score_team1 >= fMatch.score_team2 ? "CT" : "T",
      players: allPlayers,
      highlights: SAMPLE_MATCH.highlights,
    };

    setMatchData(convertedMatch);
    setSelectedPlayer(faceitUser.nickname);
    setActiveTab("studio");
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  // Steam Auth Success callback (from modal direct sync or OpenID)
  const handleSteamLoginSuccess = (userData: { nickname: string; avatar: string; steamId64: string }) => {
    setFaceitUser((u) => ({
      ...u,
      nickname: userData.nickname,
      avatar: userData.avatar,
      steam_id_64: userData.steamId64,
      is_logged_in: true,
    }));
    setSelectedPlayer(userData.nickname);

    setAuthBanner(`✓ Steam hisobi ulandi: ${userData.nickname}`);
    setTimeout(() => setAuthBanner(null), 4000);
  };

  // Steam Logout
  const handleSteamLogout = () => {
    setFaceitUser((u) => ({
      ...u,
      is_logged_in: false,
    }));
    setAuthBanner("Steam hisobingizdan muvaffaqiyatli chiqildi.");
    setTimeout(() => setAuthBanner(null), 3000);
  };

  const handleFaceitConnectSuccess = (nickname: string) => {
    setFaceitUser((u) => ({
      ...u,
      nickname,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(nickname)}`,
      is_logged_in: true,
    }));
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.3 },
      colors: ["#ff5500", "#66c0f4"],
    });
  };

  const uploadedCount = faceitMatches.filter((m) => m.uploaded).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#11141a] text-[#c6d4df] selection:bg-[#66c0f4] selection:text-black">
      {/* Top Steam Community Navigation Header */}
      <SteamHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={faceitUser}
        onOpenSteamAuth={() => setIsSteamModalOpen(true)}
        onOpenFaceitAuth={() => setIsFaceitModalOpen(true)}
      />

      {/* Auth Success Notification Banner */}
      {authBanner && (
        <div className="bg-[#1f382b] border-b border-[#a4d007]/50 text-[#a4d007] py-2 px-4 text-xs font-bold flex items-center justify-center gap-2 shadow-lg animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#a4d007]" />
          <span>{authBanner}</span>
        </div>
      )}

      {/* Main Content Area with Left Sidebar (CSDEMO Structure + Steam Design) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6 items-start">
          {/* Left Sticky Sidebar (Explicitly omitting Explore and Get the app as instructed) */}
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            matchesCount={faceitMatches.length}
            uploadedCount={uploadedCount}
          />

          {/* Right Main Panel View */}
          <div className="flex-1 min-w-0">
            {/* Tab: Matches */}
            {activeTab === "matches" && (
              <FaceitMatchBrowser
                user={faceitUser}
                matches={faceitMatches}
                onSelectMatchForStudio={handleSelectMatchForStudio}
                onSelectMatchForRecord={handleSelectMatchForStudio}
              />
            )}

            {/* Tab: Stats */}
            {activeTab === "stats" && (
              <StatsView
                user={faceitUser}
                matches={faceitMatches}
              />
            )}

            {/* Tab: 3D Demo View (Tactical Radar Replay) */}
            {activeTab === "radar" && <Radar2D match={matchData} />}

            {/* Tab: Clips (Highlight Studio & Video Reels Player) */}
            {activeTab === "studio" && (
              <HighlightStudio
                match={matchData}
                initialSelectedPlayer={selectedPlayer}
              />
            )}

            {/* Tab: Loadouts (CS2 Steam Inventory Skins) */}
            {activeTab === "loadouts" && <LoadoutsView />}

            {/* Tab: Records (Personal Records & Career Bests) */}
            {activeTab === "records" && <RecordsView matches={faceitMatches} />}

            {/* Tab: Roadmap */}
            {activeTab === "roadmap" && <RoadmapSection />}
          </div>
        </div>
      </main>

      {/* Steam Account & Auth Modal (Real OpenID 2.0 & SteamID Resolver) */}
      <SteamAuthModal
        isOpen={isSteamModalOpen}
        onClose={() => setIsSteamModalOpen(false)}
        currentUser={{
          nickname: faceitUser.nickname,
          avatar: faceitUser.avatar,
          steam_id_64: faceitUser.steam_id_64,
          is_logged_in: faceitUser.is_logged_in,
        }}
        onSuccess={handleSteamLoginSuccess}
        onLogout={handleSteamLogout}
      />

      {/* Faceit Connect Modal */}
      <FaceitAuthModal
        isOpen={isFaceitModalOpen}
        onClose={() => setIsFaceitModalOpen(false)}
        onSuccess={handleFaceitConnectSuccess}
        currentNickname={faceitUser.nickname}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
