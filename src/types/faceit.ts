export interface FaceitPlayer {
  player_id: string;
  nickname: string;
  avatar: string;
  country: string;
  steam_id_64: string;
  skill_level: number; // 1 to 10
  faceit_elo: number;
  win_rate: number; // e.g. 58%
  kd_ratio: number; // e.g. 1.28
  total_matches: number;
  current_streak: number;
  is_logged_in: boolean;
}

export interface FaceitMatchItem {
  match_id: string;
  map_name: string;
  map_display: string;
  date_formatted: string;
  duration: string;
  score_team1: number;
  score_team2: number;
  user_team: "team1" | "team2";
  result: "WIN" | "LOSS";
  elo_diff: number; // +25 or -25
  demo_url: string; // Direct link to .dem.gz / .dem.zst
  demo_size_mb?: number;
  // User personal performance in this match
  personal_stats: {
    kills: number;
    deaths: number;
    assists: number;
    kd: number;
    hs_percent: number;
    adr: number;
    mvps: number;
    hltv_rating: number;
    clutches: number;
    first_kills: number;
  };
  // Detailed match info
  teams: {
    faction1: {
      name: string;
      score: number;
      roster: FaceitMatchPlayer[];
    };
    faction2: {
      name: string;
      score: number;
      roster: FaceitMatchPlayer[];
    };
  };
}

export interface FaceitMatchPlayer {
  player_id: string;
  nickname: string;
  avatar: string;
  skill_level: number;
  kills: number;
  deaths: number;
  assists: number;
  kd: number;
  adr: number;
  hs_percent: number;
  first_kills: number;
  clutches: number;
  hltv_rating: number;
  is_mvp?: boolean;
}
