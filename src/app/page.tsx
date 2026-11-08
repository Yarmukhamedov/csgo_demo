"use client";

import React, { useState } from "react";
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
import confetti from "canvas-confetti";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("matches");
  const [faceitUser, setFaceitUser] = useState<FaceitPlayer>(DEFAULT_FACEIT_USER);
  const [faceitMatches, setFaceitMatches] = useState<FaceitMatchItem[]>(SAMPLE_FACEIT_MATCHES);
  const [matchData, setMatchData] = useState<MatchData>(SAMPLE_MATCH);
  const [selectedPlayer, setSelectedPlayer] = useState<string>("Yarmukhamedov");

  // Modals
  const [isSteamModalOpen, setIsSteamModalOpen] = useState<boolean>(false);
  const [isFaceitModalOpen, setIsFaceitModalOpen] = useState<boolean>(false);

  // Switch to studio when user clicks "Ushbu O'yindan Rolik Yasash" on Faceit match
  const handleSelectMatchForStudio = (fMatch: FaceitMatchItem) => {
    // Map FaceitMatchItem to MatchData format
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

  const handleSteamLoginSuccess = (nickname: string) => {
    setFaceitUser((u) => ({
      ...u,
      nickname,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(nickname)}`,
      is_logged_in: true,
    }));
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.3 },
      colors: ["#66c0f4", "#a4d007"],
    });
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
            {/* Tab: Matches (CSDEMO grouped layout + 1-Click .dem download + Faceit scoreboard) */}
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

      {/* Steam Auth Modal */}
      <SteamAuthModal
        isOpen={isSteamModalOpen}
        onClose={() => setIsSteamModalOpen(false)}
        onSuccess={handleSteamLoginSuccess}
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
