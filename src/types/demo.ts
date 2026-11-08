export type TeamSide = 'CT' | 'T';

export type HighlightType = 
  | 'ace' 
  | 'clutch' 
  | '4k' 
  | '3k' 
  | 'noscope' 
  | 'knife' 
  | 'wallbang';

export interface KillEvent {
  victimName: string;
  weapon: string;
  isHeadshot: boolean;
  isWallbang?: boolean;
  isNoScope?: boolean;
  timeOffsetSeconds: number;
}

export interface HighlightMoment {
  id: string;
  type: HighlightType;
  title: string;
  roundNumber: number;
  timeFormatted: string;
  tickStart: number;
  tickEnd: number;
  killerName: string;
  killerTeam: TeamSide;
  kills: KillEvent[];
  description: string;
  impactScore: number; // 1 to 100
  selected: boolean;
}

export interface PlayerStats {
  id: string;
  name: string;
  team: TeamSide;
  avatar: string;
  kills: number;
  deaths: number;
  assists: number;
  adr: number;
  hsPercentage: number;
  hltvRating: number;
  mvps: number;
  faceitLevel?: number;
  premierRating?: number;
}

export interface MatchData {
  id: string;
  mapName: string;
  mapDisplay: string;
  date: string;
  duration: string;
  gameMode: string;
  teamCtName: string;
  teamTName: string;
  scoreCt: number;
  scoreT: number;
  winnerTeam: TeamSide;
  players: PlayerStats[];
  highlights: HighlightMoment[];
}

export interface ReelSettings {
  aspectRatio: '9:16' | '16:9';
  selectedPlayer: string;
  themeStyle: 'cyber' | 'esports' | 'neon' | 'cinematic';
  musicTrack: 'phonk_drive' | 'epic_trailer' | 'trap_energy' | 'lofi_chill' | 'none';
  showIntroCard: boolean;
  slowMotionOnKill: boolean;
  bassDropKillfeed: boolean;
  resolution: '1080p' | '720p';
}
