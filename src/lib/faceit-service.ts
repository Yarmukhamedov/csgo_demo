import { FaceitPlayer, FaceitMatchItem, FaceitMatchPlayer } from "@/types/faceit";

export const DEFAULT_FACEIT_USER: FaceitPlayer = {
  player_id: "usr-faceit-9921",
  nickname: "Yarmukhamedov",
  avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Yarmukhamedov",
  country: "UZ",
  steam_id_64: "76561198845729104",
  skill_level: 10,
  faceit_elo: 2285,
  win_rate: 62,
  kd_ratio: 1.34,
  total_matches: 486,
  current_streak: 3,
  is_logged_in: true,
};

// Teammates and Opponent pool for rich rosters
const TEAMMATES_POOL = [
  { name: "Tashkent_Ace", lvl: 10 },
  { name: "Samarkand_Sniper", lvl: 9 },
  { name: "Bukhara_Entry", lvl: 10 },
  { name: "Cyber_Navoi", lvl: 8 },
  { name: "Fergana_Flame", lvl: 9 },
  { name: "Khiva_Ghost", lvl: 9 },
  { name: "Andijan_Beast", lvl: 10 },
];

const OPPONENTS_POOL = [
  { name: "s1mple_fan", lvl: 10 },
  { name: "ZywOo_peek", lvl: 10 },
  { name: "m0NESY_flick", lvl: 9 },
  { name: "donk_rush", lvl: 10 },
  { name: "b1t_headshot", lvl: 9 },
  { name: "ropz_lurk", lvl: 10 },
  { name: "NiKo_deagle", lvl: 10 },
  { name: "electroNic_igl", lvl: 9 },
];

function buildRoster(
  userNick: string,
  userStats: { kills: number; deaths: number; assists: number; adr: number; hs: number; hltv: number; mvps: number },
  isUserTeam: boolean,
  teamScore: number,
  oppScore: number,
  seedOffset: number
): FaceitMatchPlayer[] {
  if (isUserTeam) {
    const userPlayer: FaceitMatchPlayer = {
      player_id: "usr-main",
      nickname: userNick,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(userNick)}`,
      skill_level: 10,
      kills: userStats.kills,
      deaths: userStats.deaths,
      assists: userStats.assists,
      kd: Number((userStats.kills / Math.max(1, userStats.deaths)).toFixed(2)),
      adr: userStats.adr,
      hs_percent: userStats.hs,
      first_kills: Math.round(userStats.kills * 0.22),
      clutches: userStats.kills > 20 ? 2 : 1,
      hltv_rating: userStats.hltv,
      is_mvp: userStats.hltv >= 1.25,
    };

    const team = [userPlayer];
    for (let i = 0; i < 4; i++) {
      const tm = TEAMMATES_POOL[(seedOffset + i) % TEAMMATES_POOL.length];
      const kills = Math.max(7, Math.round(userStats.kills * (0.6 + i * 0.12)));
      const deaths = Math.max(8, Math.round(userStats.deaths * (0.8 + i * 0.08)));
      const assists = Math.round(3 + (seedOffset + i) % 6);
      const kd = Number((kills / deaths).toFixed(2));
      const adr = Math.round(55 + (seedOffset * 7 + i * 11) % 40);
      const hs = Math.round(35 + (seedOffset * 13 + i * 7) % 30);
      const hltv = Number((0.75 + (kills / (teamScore + oppScore)) * 0.8).toFixed(2));

      team.push({
        player_id: `tm-${seedOffset}-${i}`,
        nickname: tm.name,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(tm.name)}`,
        skill_level: tm.lvl,
        kills,
        deaths,
        assists,
        kd,
        adr,
        hs_percent: hs,
        first_kills: Math.round(kills * 0.18),
        clutches: kills > 18 ? 1 : 0,
        hltv_rating: hltv,
        is_mvp: hltv > 1.3 && userStats.hltv < 1.3,
      });
    }
    return team;
  } else {
    const oppTeam: FaceitMatchPlayer[] = [];
    for (let i = 0; i < 5; i++) {
      const opp = OPPONENTS_POOL[(seedOffset + i) % OPPONENTS_POOL.length];
      const kills = Math.max(6, Math.round((oppScore / Math.max(1, teamScore)) * 14 + ((seedOffset + i * 4) % 9)));
      const deaths = Math.max(9, Math.round((teamScore / Math.max(1, oppScore)) * 13 + ((seedOffset + i * 3) % 8)));
      const assists = Math.round(2 + ((seedOffset + i) % 5));
      const kd = Number((kills / deaths).toFixed(2));
      const adr = Math.round(50 + ((seedOffset * 9 + i * 14) % 45));
      const hs = Math.round(40 + ((seedOffset * 5 + i * 9) % 32));
      const hltv = Number((0.70 + (kills / (teamScore + oppScore)) * 0.85).toFixed(2));

      oppTeam.push({
        player_id: `opp-${seedOffset}-${i}`,
        nickname: opp.name,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(opp.name)}`,
        skill_level: opp.lvl,
        kills,
        deaths,
        assists,
        kd,
        adr,
        hs_percent: hs,
        first_kills: Math.round(kills * 0.2),
        clutches: kills > 20 ? 1 : 0,
        hltv_rating: hltv,
        is_mvp: i === 0 && oppScore > teamScore,
      });
    }
    return oppTeam;
  }
}

export const SAMPLE_FACEIT_MATCHES: FaceitMatchItem[] = [
  // GROUP 1: 07.11.2026 (4 matches) - Matches screenshot row 1-4
  {
    match_id: "1-2af30534-cba7-48fc-a29b-305ab960a0a5",
    map_name: "de_dust2",
    map_display: "Dust2",
    date_formatted: "Sat 7 Nov, 02:17",
    exact_time: "Sat 7 Nov, 02:17",
    date_group: "07.11.2026",
    duration: "34 daqiqa",
    score_team1: 13,
    score_team2: 8,
    user_team: "team1",
    result: "WIN",
    elo_diff: 25,
    game_mode: "faceit",
    uploaded: true,
    clips_count: 1,
    rank_badge: "10",
    demo_url: "https://demos-europe-west2.faceit-cdn.net/cs2/1-2af30534-cba7-48fc-a29b-305ab960a0a5-1-1.dem.zst",
    demo_size_mb: 168,
    personal_stats: {
      kills: 14,
      deaths: 14,
      assists: 6,
      kd: 1.00,
      hs_percent: 54,
      adr: 82.4,
      mvps: 3,
      hltv_rating: 0.94,
      clutches: 1,
      first_kills: 3,
    },
    teams: {
      faction1: {
        name: "team_Yarmukhamedov",
        score: 13,
        roster: buildRoster("Yarmukhamedov", { kills: 14, deaths: 14, assists: 6, adr: 82.4, hs: 54, hltv: 0.94, mvps: 3 }, true, 13, 8, 1),
      },
      faction2: {
        name: "team_s1mple_fan",
        score: 8,
        roster: buildRoster("Yarmukhamedov", { kills: 14, deaths: 14, assists: 6, adr: 82.4, hs: 54, hltv: 0.94, mvps: 3 }, false, 13, 8, 1),
      },
    },
  },
  {
    match_id: "1-77a82910-bc42-45bb-b310-88120011bb91",
    map_name: "de_ancient",
    map_display: "Ancient",
    date_formatted: "Sat 7 Nov · 01:57",
    exact_time: "Sat 7 Nov, 01:57",
    date_group: "07.11.2026",
    duration: "37 daqiqa",
    score_team1: 13,
    score_team2: 8,
    user_team: "team1",
    result: "WIN",
    elo_diff: 24,
    game_mode: "faceit",
    uploaded: false,
    rank_badge: "10",
    demo_url: "https://demos-europe-west2.faceit-cdn.net/cs2/1-77a82910-bc42-45bb-b310-88120011bb91-1-1.dem.zst",
    demo_size_mb: 174,
    personal_stats: {
      kills: 19,
      deaths: 11,
      assists: 4,
      kd: 1.73,
      hs_percent: 58,
      adr: 96.0,
      mvps: 4,
      hltv_rating: 1.35,
      clutches: 2,
      first_kills: 4,
    },
    teams: {
      faction1: {
        name: "team_Yarmukhamedov",
        score: 13,
        roster: buildRoster("Yarmukhamedov", { kills: 19, deaths: 11, assists: 4, adr: 96.0, hs: 58, hltv: 1.35, mvps: 4 }, true, 13, 8, 2),
      },
      faction2: {
        name: "team_ZywOo_peek",
        score: 8,
        roster: buildRoster("Yarmukhamedov", { kills: 19, deaths: 11, assists: 4, adr: 96.0, hs: 58, hltv: 1.35, mvps: 4 }, false, 13, 8, 2),
      },
    },
  },
  {
    match_id: "1-9bc81742-df11-47ec-a411-912bc018a112",
    map_name: "de_mirage",
    map_display: "Mirage",
    date_formatted: "Sat 7 Nov · 01:09",
    exact_time: "Sat 7 Nov, 01:09",
    date_group: "07.11.2026",
    duration: "26 daqiqa",
    score_team1: 13,
    score_team2: 3,
    user_team: "team1",
    result: "WIN",
    elo_diff: 26,
    game_mode: "faceit",
    uploaded: false,
    rank_badge: "10",
    demo_url: "https://demos-europe-west2.faceit-cdn.net/cs2/1-9bc81742-df11-47ec-a411-912bc018a112-1-1.dem.zst",
    demo_size_mb: 132,
    personal_stats: {
      kills: 21,
      deaths: 7,
      assists: 5,
      kd: 3.00,
      hs_percent: 62,
      adr: 118.5,
      mvps: 5,
      hltv_rating: 1.68,
      clutches: 1,
      first_kills: 5,
    },
    teams: {
      faction1: {
        name: "team_Yarmukhamedov",
        score: 13,
        roster: buildRoster("Yarmukhamedov", { kills: 21, deaths: 7, assists: 5, adr: 118.5, hs: 62, hltv: 1.68, mvps: 5 }, true, 13, 3, 3),
      },
      faction2: {
        name: "team_donk_rush",
        score: 3,
        roster: buildRoster("Yarmukhamedov", { kills: 21, deaths: 7, assists: 5, adr: 118.5, hs: 62, hltv: 1.68, mvps: 5 }, false, 13, 3, 3),
      },
    },
  },
  {
    match_id: "1-55c91823-ee21-48cc-8812-771928374610",
    map_name: "de_mirage",
    map_display: "Mirage",
    date_formatted: "Sat 7 Nov · 00:30",
    exact_time: "Sat 7 Nov, 00:30",
    date_group: "07.11.2026",
    duration: "24 daqiqa",
    score_team1: 2,
    score_team2: 13,
    user_team: "team1",
    result: "LOSS",
    elo_diff: -25,
    game_mode: "faceit",
    uploaded: false,
    rank_badge: "10",
    demo_url: "https://demos-europe-west2.faceit-cdn.net/cs2/1-55c91823-ee21-48cc-8812-771928374610-1-1.dem.zst",
    demo_size_mb: 125,
    personal_stats: {
      kills: 11,
      deaths: 15,
      assists: 2,
      kd: 0.73,
      hs_percent: 45,
      adr: 64.2,
      mvps: 1,
      hltv_rating: 0.72,
      clutches: 0,
      first_kills: 1,
    },
    teams: {
      faction1: {
        name: "team_Yarmukhamedov",
        score: 2,
        roster: buildRoster("Yarmukhamedov", { kills: 11, deaths: 15, assists: 2, adr: 64.2, hs: 45, hltv: 0.72, mvps: 1 }, true, 2, 13, 4),
      },
      faction2: {
        name: "team_m0NESY_flick",
        score: 13,
        roster: buildRoster("Yarmukhamedov", { kills: 11, deaths: 15, assists: 2, adr: 64.2, hs: 45, hltv: 0.72, mvps: 1 }, false, 2, 13, 4),
      },
    },
  },

  // GROUP 2: 06.11.2026 (7 matches) - Matches screenshot row 5-11
  {
    match_id: "1-8841a021-44cd-4e92-9a11-ee48192a0149",
    map_name: "de_nuke",
    map_display: "Nuke",
    date_formatted: "Fri 6 Nov · 23:35",
    exact_time: "Fri 6 Nov, 23:35",
    date_group: "06.11.2026",
    duration: "48 daqiqa",
    score_team1: 14,
    score_team2: 16,
    user_team: "team1",
    result: "LOSS",
    elo_diff: -23,
    game_mode: "faceit",
    uploaded: false,
    rank_badge: "10",
    demo_url: "https://demos-europe-west2.faceit-cdn.net/cs2/1-8841a021-44cd-4e92-9a11-ee48192a0149-1-1.dem.zst",
    demo_size_mb: 215,
    personal_stats: {
      kills: 28,
      deaths: 22,
      assists: 8,
      kd: 1.27,
      hs_percent: 57,
      adr: 98.4,
      mvps: 4,
      hltv_rating: 1.28,
      clutches: 2,
      first_kills: 4,
    },
    teams: {
      faction1: {
        name: "team_Yarmukhamedov",
        score: 14,
        roster: buildRoster("Yarmukhamedov", { kills: 28, deaths: 22, assists: 8, adr: 98.4, hs: 57, hltv: 1.28, mvps: 4 }, true, 14, 16, 5),
      },
      faction2: {
        name: "team_NiKo_deagle",
        score: 16,
        roster: buildRoster("Yarmukhamedov", { kills: 28, deaths: 22, assists: 8, adr: 98.4, hs: 57, hltv: 1.28, mvps: 4 }, false, 14, 16, 5),
      },
    },
  },
  {
    match_id: "1-33bc9142-ff21-4822-ba33-881273910022",
    map_name: "de_mirage",
    map_display: "Mirage",
    date_formatted: "Fri 6 Nov · 21:01",
    exact_time: "Fri 6 Nov, 21:01",
    date_group: "06.11.2026",
    duration: "35 daqiqa",
    score_team1: 13,
    score_team2: 7,
    user_team: "team1",
    result: "WIN",
    elo_diff: 25,
    game_mode: "faceit",
    uploaded: true,
    clips_count: 2,
    rank_badge: "10",
    demo_url: "https://demos-europe-west2.faceit-cdn.net/cs2/1-33bc9142-ff21-4822-ba33-881273910022-1-1.dem.zst",
    demo_size_mb: 165,
    personal_stats: {
      kills: 24,
      deaths: 12,
      assists: 5,
      kd: 2.00,
      hs_percent: 63,
      adr: 108.2,
      mvps: 4,
      hltv_rating: 1.45,
      clutches: 2,
      first_kills: 5,
    },
    teams: {
      faction1: {
        name: "team_Yarmukhamedov",
        score: 13,
        roster: buildRoster("Yarmukhamedov", { kills: 24, deaths: 12, assists: 5, adr: 108.2, hs: 63, hltv: 1.45, mvps: 4 }, true, 13, 7, 6),
      },
      faction2: {
        name: "team_b1t_headshot",
        score: 7,
        roster: buildRoster("Yarmukhamedov", { kills: 24, deaths: 12, assists: 5, adr: 108.2, hs: 63, hltv: 1.45, mvps: 4 }, false, 13, 7, 6),
      },
    },
  },
  {
    match_id: "1-44dd1129-aa44-48ff-9911-334455667788",
    map_name: "de_ancient",
    map_display: "Ancient",
    date_formatted: "Fri 6 Nov · 02:54",
    exact_time: "Fri 6 Nov, 02:54",
    date_group: "06.11.2026",
    duration: "41 daqiqa",
    score_team1: 11,
    score_team2: 13,
    user_team: "team1",
    result: "LOSS",
    elo_diff: -24,
    game_mode: "faceit",
    uploaded: false,
    rank_badge: "10",
    demo_url: "https://demos-europe-west2.faceit-cdn.net/cs2/1-44dd1129-aa44-48ff-9911-334455667788-1-1.dem.zst",
    demo_size_mb: 182,
    personal_stats: {
      kills: 17,
      deaths: 16,
      assists: 3,
      kd: 1.06,
      hs_percent: 53,
      adr: 78.5,
      mvps: 2,
      hltv_rating: 0.98,
      clutches: 1,
      first_kills: 2,
    },
    teams: {
      faction1: {
        name: "team_Yarmukhamedov",
        score: 11,
        roster: buildRoster("Yarmukhamedov", { kills: 17, deaths: 16, assists: 3, adr: 78.5, hs: 53, hltv: 0.98, mvps: 2 }, true, 11, 13, 7),
      },
      faction2: {
        name: "team_ropz_lurk",
        score: 13,
        roster: buildRoster("Yarmukhamedov", { kills: 17, deaths: 16, assists: 3, adr: 78.5, hs: 53, hltv: 0.98, mvps: 2 }, false, 11, 13, 7),
      },
    },
  },
  {
    match_id: "1-66ee2233-bb55-49aa-8822-112233445566",
    map_name: "de_inferno",
    map_display: "Inferno",
    date_formatted: "Fri 6 Nov · 01:12",
    exact_time: "Fri 6 Nov, 01:12",
    date_group: "06.11.2026",
    duration: "39 daqiqa",
    score_team1: 13,
    score_team2: 10,
    user_team: "team1",
    result: "WIN",
    elo_diff: 25,
    game_mode: "faceit",
    uploaded: false,
    rank_badge: "10",
    demo_url: "https://demos-europe-west2.faceit-cdn.net/cs2/1-66ee2233-bb55-49aa-8822-112233445566-1-1.dem.zst",
    demo_size_mb: 178,
    personal_stats: {
      kills: 20,
      deaths: 14,
      assists: 4,
      kd: 1.43,
      hs_percent: 55,
      adr: 89.2,
      mvps: 3,
      hltv_rating: 1.22,
      clutches: 1,
      first_kills: 4,
    },
    teams: {
      faction1: {
        name: "team_Yarmukhamedov",
        score: 13,
        roster: buildRoster("Yarmukhamedov", { kills: 20, deaths: 14, assists: 4, adr: 89.2, hs: 55, hltv: 1.22, mvps: 3 }, true, 13, 10, 8),
      },
      faction2: {
        name: "team_electroNic_igl",
        score: 10,
        roster: buildRoster("Yarmukhamedov", { kills: 20, deaths: 14, assists: 4, adr: 89.2, hs: 55, hltv: 1.22, mvps: 3 }, false, 13, 10, 8),
      },
    },
  },
  {
    match_id: "1-77ff3344-cc66-4abb-9933-223344556677",
    map_name: "de_anubis",
    map_display: "Anubis",
    date_formatted: "Thu 5 Nov · 22:40",
    exact_time: "Thu 5 Nov, 22:40",
    date_group: "05.11.2026",
    duration: "31 daqiqa",
    score_team1: 13,
    score_team2: 6,
    user_team: "team1",
    result: "WIN",
    elo_diff: 26,
    game_mode: "premier",
    uploaded: true,
    clips_count: 1,
    rank_badge: "22,480",
    demo_url: "https://demos-europe-west2.faceit-cdn.net/cs2/1-77ff3344-cc66-4abb-9933-223344556677-1-1.dem.zst",
    demo_size_mb: 154,
    personal_stats: {
      kills: 18,
      deaths: 9,
      assists: 4,
      kd: 2.00,
      hs_percent: 61,
      adr: 94.6,
      mvps: 3,
      hltv_rating: 1.39,
      clutches: 1,
      first_kills: 3,
    },
    teams: {
      faction1: {
        name: "team_Yarmukhamedov",
        score: 13,
        roster: buildRoster("Yarmukhamedov", { kills: 18, deaths: 9, assists: 4, adr: 94.6, hs: 61, hltv: 1.39, mvps: 3 }, true, 13, 6, 9),
      },
      faction2: {
        name: "team_Premier_5",
        score: 6,
        roster: buildRoster("Yarmukhamedov", { kills: 18, deaths: 9, assists: 4, adr: 94.6, hs: 61, hltv: 1.39, mvps: 3 }, false, 13, 6, 9),
      },
    },
  },
  {
    match_id: "1-88aa4455-dd77-4bcc-aa44-334455667788",
    map_name: "de_dust2",
    map_display: "Dust2",
    date_formatted: "Thu 5 Nov · 20:15",
    exact_time: "Thu 5 Nov, 20:15",
    date_group: "05.11.2026",
    duration: "40 daqiqa",
    score_team1: 13,
    score_team2: 11,
    user_team: "team1",
    result: "WIN",
    elo_diff: 23,
    game_mode: "premier",
    uploaded: false,
    rank_badge: "22,480",
    demo_url: "https://demos-europe-west2.faceit-cdn.net/cs2/1-88aa4455-dd77-4bcc-aa44-334455667788-1-1.dem.zst",
    demo_size_mb: 186,
    personal_stats: {
      kills: 22,
      deaths: 16,
      assists: 7,
      kd: 1.38,
      hs_percent: 59,
      adr: 91.0,
      mvps: 4,
      hltv_rating: 1.25,
      clutches: 2,
      first_kills: 4,
    },
    teams: {
      faction1: {
        name: "team_Yarmukhamedov",
        score: 13,
        roster: buildRoster("Yarmukhamedov", { kills: 22, deaths: 16, assists: 7, adr: 91.0, hs: 59, hltv: 1.25, mvps: 4 }, true, 13, 11, 10),
      },
      faction2: {
        name: "team_Premier_Elite",
        score: 11,
        roster: buildRoster("Yarmukhamedov", { kills: 22, deaths: 16, assists: 7, adr: 91.0, hs: 59, hltv: 1.25, mvps: 4 }, false, 13, 11, 10),
      },
    },
  },
  {
    match_id: "1-99bb5566-ee88-4cdd-bb55-445566778899",
    map_name: "de_vertigo",
    map_display: "Vertigo",
    date_formatted: "Thu 5 Nov · 18:30",
    exact_time: "Thu 5 Nov, 18:30",
    date_group: "05.11.2026",
    duration: "32 daqiqa",
    score_team1: 8,
    score_team2: 13,
    user_team: "team1",
    result: "LOSS",
    elo_diff: -25,
    game_mode: "faceit",
    uploaded: false,
    rank_badge: "10",
    demo_url: "https://demos-europe-west2.faceit-cdn.net/cs2/1-99bb5566-ee88-4cdd-bb55-445566778899-1-1.dem.zst",
    demo_size_mb: 156,
    personal_stats: {
      kills: 15,
      deaths: 17,
      assists: 3,
      kd: 0.88,
      hs_percent: 47,
      adr: 72.8,
      mvps: 2,
      hltv_rating: 0.88,
      clutches: 0,
      first_kills: 2,
    },
    teams: {
      faction1: {
        name: "team_Yarmukhamedov",
        score: 8,
        roster: buildRoster("Yarmukhamedov", { kills: 15, deaths: 17, assists: 3, adr: 72.8, hs: 47, hltv: 0.88, mvps: 2 }, true, 8, 13, 11),
      },
      faction2: {
        name: "team_Vertigo_Demons",
        score: 13,
        roster: buildRoster("Yarmukhamedov", { kills: 15, deaths: 17, assists: 3, adr: 72.8, hs: 47, hltv: 0.88, mvps: 2 }, false, 8, 13, 11),
      },
    },
  },
];

export async function fetchFaceitUserAndMatches(nickname: string): Promise<{
  player: FaceitPlayer;
  matches: FaceitMatchItem[];
}> {
  const player: FaceitPlayer = {
    ...DEFAULT_FACEIT_USER,
    nickname: nickname || DEFAULT_FACEIT_USER.nickname,
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(nickname || "user")}`,
  };

  return {
    player,
    matches: SAMPLE_FACEIT_MATCHES,
  };
}
