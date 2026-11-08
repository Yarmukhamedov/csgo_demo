export interface MapCallout {
  name: string;
  x: number; // percentage 0-100
  y: number;
}

export interface MapSiteZone {
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color?: string;
}

export interface MapConfig {
  id: string;
  name: string;
  displayName: string;
  overviewBg: string;
  sites: MapSiteZone[];
  callouts: MapCallout[];
  defaultZoom: number;
}

export const CS2_MAPS: Record<string, MapConfig> = {
  de_mirage: {
    id: "de_mirage",
    name: "de_mirage",
    displayName: "Mirage",
    overviewBg: "linear-gradient(135deg, #181c2b 0%, #0d111c 100%)",
    sites: [
      { name: "A SITE", x: 68, y: 30, w: 22, h: 22, color: "#f59e0b" },
      { name: "B SITE", x: 22, y: 22, w: 20, h: 20, color: "#f59e0b" },
      { name: "MID", x: 42, y: 48, w: 20, h: 18, color: "#38bdf8" },
      { name: "CT SPAWN", x: 55, y: 15, w: 16, h: 12, color: "#00d2ff" },
      { name: "T SPAWN", x: 45, y: 85, w: 18, h: 12, color: "#f97316" },
    ],
    callouts: [
      { name: "Palace", x: 82, y: 40 },
      { name: "Tetris", x: 66, y: 38 },
      { name: "Connector", x: 58, y: 45 },
      { name: "Window", x: 50, y: 42 },
      { name: "Jungle", x: 60, y: 32 },
      { name: "Short / Cat", x: 38, y: 35 },
      { name: "B Apts", x: 18, y: 45 },
      { name: "Market", x: 32, y: 16 },
      { name: "Underpass", x: 44, y: 60 },
      { name: "T Roof", x: 35, y: 75 },
    ],
    defaultZoom: 1,
  },
  de_dust2: {
    id: "de_dust2",
    name: "de_dust2",
    displayName: "Dust II",
    overviewBg: "linear-gradient(135deg, #221c17 0%, #110e0c 100%)",
    sites: [
      { name: "A SITE", x: 74, y: 24, w: 20, h: 20, color: "#f59e0b" },
      { name: "B SITE", x: 18, y: 22, w: 20, h: 20, color: "#f59e0b" },
      { name: "MID DOORS", x: 46, y: 46, w: 16, h: 18, color: "#38bdf8" },
      { name: "CT SPAWN", x: 50, y: 20, w: 16, h: 12, color: "#00d2ff" },
      { name: "T SPAWN", x: 48, y: 85, w: 18, h: 12, color: "#f97316" },
    ],
    callouts: [
      { name: "Long A", x: 86, y: 55 },
      { name: "A Short / Cat", x: 60, y: 35 },
      { name: "A Long Doors", x: 78, y: 72 },
      { name: "Lower Tunnels", x: 38, y: 52 },
      { name: "Upper Tunnels", x: 22, y: 42 },
      { name: "B Window", x: 25, y: 16 },
      { name: "B Car", x: 14, y: 28 },
      { name: "Suicide", x: 48, y: 68 },
    ],
    defaultZoom: 1,
  },
  de_inferno: {
    id: "de_inferno",
    name: "de_inferno",
    displayName: "Inferno",
    overviewBg: "linear-gradient(135deg, #231818 0%, #100b0b 100%)",
    sites: [
      { name: "A SITE", x: 65, y: 28, w: 22, h: 22, color: "#f59e0b" },
      { name: "B SITE", x: 28, y: 20, w: 20, h: 20, color: "#f59e0b" },
      { name: "BANANA", x: 32, y: 45, w: 14, h: 22, color: "#38bdf8" },
      { name: "CT SPAWN", x: 48, y: 12, w: 16, h: 12, color: "#00d2ff" },
      { name: "T SPAWN", x: 48, y: 88, w: 18, h: 10, color: "#f97316" },
    ],
    callouts: [
      { name: "Alt Mid", x: 58, y: 60 },
      { name: "Mid", x: 48, y: 55 },
      { name: "Boiler", x: 60, y: 42 },
      { name: "Pit", x: 78, y: 20 },
      { name: "Apartments", x: 70, y: 42 },
      { name: "Arch", x: 50, y: 30 },
      { name: "Speedway", x: 40, y: 25 },
      { name: "Car / Logs", x: 32, y: 38 },
      { name: "Church", x: 20, y: 22 },
    ],
    defaultZoom: 1,
  },
  de_nuke: {
    id: "de_nuke",
    name: "de_nuke",
    displayName: "Nuke",
    overviewBg: "linear-gradient(135deg, #151d28 0%, #0c1117 100%)",
    sites: [
      { name: "A SITE (TOP)", x: 45, y: 42, w: 22, h: 20, color: "#f59e0b" },
      { name: "B SITE (LOWER)", x: 45, y: 42, w: 22, h: 20, color: "#38bdf8" },
      { name: "OUTSIDE / YARD", x: 74, y: 45, w: 20, h: 30, color: "#10b981" },
      { name: "CT SPAWN", x: 20, y: 45, w: 14, h: 14, color: "#00d2ff" },
      { name: "T SPAWN", x: 80, y: 85, w: 16, h: 10, color: "#f97316" },
    ],
    callouts: [
      { name: "Silo / Twinkie", x: 70, y: 65 },
      { name: "Garage", x: 78, y: 35 },
      { name: "Secret", x: 68, y: 28 },
      { name: "Hut", x: 50, y: 52 },
      { name: "Squeaky", x: 42, y: 55 },
      { name: "Heaven", x: 38, y: 35 },
      { name: "Ramp", x: 52, y: 25 },
      { name: "Radio", x: 42, y: 22 },
    ],
    defaultZoom: 1,
  },
  de_ancient: {
    id: "de_ancient",
    name: "de_ancient",
    displayName: "Ancient",
    overviewBg: "linear-gradient(135deg, #14231b 0%, #09130e 100%)",
    sites: [
      { name: "A SITE", x: 68, y: 28, w: 20, h: 20, color: "#f59e0b" },
      { name: "B SITE", x: 26, y: 30, w: 20, h: 20, color: "#f59e0b" },
      { name: "MID", x: 48, y: 48, w: 16, h: 20, color: "#38bdf8" },
      { name: "CT SPAWN", x: 48, y: 15, w: 16, h: 12, color: "#00d2ff" },
      { name: "T SPAWN", x: 48, y: 85, w: 18, h: 12, color: "#f97316" },
    ],
    callouts: [
      { name: "Donut", x: 58, y: 40 },
      { name: "Red / Main A", x: 72, y: 48 },
      { name: "Cave / Cheetah", x: 24, y: 50 },
      { name: "Ramp B", x: 34, y: 40 },
      { name: "Temple", x: 78, y: 25 },
      { name: "Wood / Mid", x: 42, y: 55 },
    ],
    defaultZoom: 1,
  },
};

export interface HeatmapPoint {
  x: number;
  y: number;
  intensity: number; // 0 to 1
  team: "CT" | "T";
  type: "kill" | "death" | "utility";
}

// Mirage sample heatmap points
export const SAMPLE_HEATMAP: HeatmapPoint[] = [
  // A Site intense cluster
  { x: 68, y: 32, intensity: 0.9, team: "CT", type: "kill" },
  { x: 70, y: 34, intensity: 0.85, team: "CT", type: "kill" },
  { x: 66, y: 30, intensity: 0.8, team: "T", type: "kill" },
  { x: 74, y: 36, intensity: 0.75, team: "CT", type: "kill" },
  { x: 80, y: 38, intensity: 0.65, team: "T", type: "kill" },

  // Palace / Jungle
  { x: 82, y: 42, intensity: 0.7, team: "CT", type: "kill" },
  { x: 62, y: 34, intensity: 0.75, team: "T", type: "kill" },

  // Mid Corridor duels
  { x: 48, y: 46, intensity: 0.88, team: "CT", type: "kill" },
  { x: 44, y: 52, intensity: 0.82, team: "T", type: "kill" },
  { x: 50, y: 42, intensity: 0.75, team: "CT", type: "kill" },
  { x: 56, y: 44, intensity: 0.6, team: "T", type: "kill" },

  // B Site cluster
  { x: 24, y: 24, intensity: 0.8, team: "T", type: "kill" },
  { x: 22, y: 28, intensity: 0.7, team: "CT", type: "kill" },
  { x: 28, y: 22, intensity: 0.65, team: "CT", type: "kill" },
  { x: 18, y: 44, intensity: 0.72, team: "T", type: "kill" },
];

export interface OpeningDuel {
  round: number;
  winner: string;
  winnerTeam: "CT" | "T";
  loser: string;
  loserTeam: "CT" | "T";
  weapon: string;
  timeSec: number;
  location: string;
}

export const SAMPLE_OPENING_DUELS: OpeningDuel[] = [
  { round: 1, winner: "S1Mple_UZ", winnerTeam: "CT", loser: "Shox_Fergana", loserTeam: "T", weapon: "USP-S", timeSec: 14, location: "Mid" },
  { round: 2, winner: "Andijan_Beast", winnerTeam: "T", loser: "Bukhara_Entry", loserTeam: "CT", weapon: "Galil AR", timeSec: 18, location: "A Palace" },
  { round: 3, winner: "Tashkent_Sniper", winnerTeam: "CT", loser: "Khiva_Ghost", loserTeam: "T", weapon: "M4A1-S", timeSec: 22, location: "B Apts" },
  { round: 4, winner: "S1Mple_UZ", winnerTeam: "CT", loser: "Nukus_Shadow", loserTeam: "T", weapon: "USP-S", timeSec: 12, location: "A Site" },
  { round: 5, winner: "Shox_Fergana", winnerTeam: "T", loser: "Cyber_Navoi", loserTeam: "CT", weapon: "AK-47", timeSec: 16, location: "Underpass" },
  { round: 11, winner: "S1Mple_UZ", winnerTeam: "CT", loser: "Nukus_Shadow", loserTeam: "T", weapon: "Desert Eagle", timeSec: 11, location: "A Palace" },
  { round: 18, winner: "S1Mple_UZ", winnerTeam: "CT", loser: "Shox_Fergana", loserTeam: "T", weapon: "AWP", timeSec: 15, location: "A Connector" },
];
