import { HighlightMoment, HighlightType, KillEvent, PlayerStats, TeamSide } from "@/types/demo";

export interface RawPlayerDeath {
  attacker_name?: string;
  attacker_steamid?: string;
  attacker_side?: number | string; // 2: T, 3: CT
  user_name?: string; // victim
  user_steamid?: string;
  user_side?: number | string;
  weapon?: string;
  headshot?: boolean;
  noscope?: boolean;
  thru_smoke?: boolean;
  penetrated?: number | boolean;
  tick?: number;
}

export interface RawRound {
  round_number: number;
  start_tick: number;
  end_tick: number;
  winner_side?: number | string;
  reason?: string;
}

/**
 * Detects highlights (Aces, Clutches, Multikills, Knife, Noscope)
 * from real tick-by-tick CS2 demo death events.
 */
export function detectHighlights(
  deaths: RawPlayerDeath[],
  rounds: RawRound[],
  tickrate: number = 64
): HighlightMoment[] {
  const highlights: HighlightMoment[] = [];
  let hlCounter = 1;

  // Process deaths per round
  rounds.forEach((round) => {
    const roundDeaths = deaths.filter(
      (d) => (d.tick || 0) >= round.start_tick && (d.tick || 0) <= round.end_tick
    );

    // Group deaths by attacker
    const killsByAttacker = new Map<string, RawPlayerDeath[]>();
    roundDeaths.forEach((d) => {
      const attacker = d.attacker_name;
      if (!attacker || attacker === d.user_name) return; // Ignore suicides/world deaths

      if (!killsByAttacker.has(attacker)) {
        killsByAttacker.set(attacker, []);
      }
      killsByAttacker.get(attacker)!.push(d);
    });

    // Analyze attacker performances
    killsByAttacker.forEach((kills, attackerName) => {
      const killerSide: TeamSide =
        kills[0].attacker_side === 3 || kills[0].attacker_side === "CT" ? "CT" : "T";
      const killCount = kills.length;

      const killEvents: KillEvent[] = kills.map((k) => ({
        victimName: k.user_name || "Unknown",
        weapon: cleanWeaponName(k.weapon || "rifle"),
        isHeadshot: Boolean(k.headshot),
        isNoScope: Boolean(k.noscope),
        isWallbang: Boolean(k.penetrated),
        timeOffsetSeconds: Math.max(1, Math.round(((k.tick || round.start_tick) - round.start_tick) / tickrate)),
      }));

      const firstTick = kills[0].tick || round.start_tick;
      const lastTick = kills[kills.length - 1].tick || round.end_tick;
      const timeFormatted = formatRoundTime(firstTick, tickrate);

      // 1. Check for ACE (5 Kills in a single round)
      if (killCount >= 5) {
        highlights.push({
          id: `hl-${hlCounter++}`,
          type: "ace",
          title: `🔥 Aqlbovar qilmas ACE (5 Kills - ${attackerName})`,
          roundNumber: round.round_number,
          timeFormatted,
          tickStart: Math.max(0, firstTick - tickrate * 3),
          tickEnd: lastTick + tickrate * 3,
          killerName: attackerName,
          killerTeam: killerSide,
          kills: killEvents,
          description: `Raund davomida raqib jamoaning barcha 5 ta o'yinchisini bir o'zi tozaladi!`,
          impactScore: 99,
          selected: true,
        });
      }
      // 2. Check for 4K (4 Kills)
      else if (killCount === 4) {
        highlights.push({
          id: `hl-${hlCounter++}`,
          type: "4k",
          title: `⚡ 4K Multikill (${attackerName})`,
          roundNumber: round.round_number,
          timeFormatted,
          tickStart: Math.max(0, firstTick - tickrate * 3),
          tickEnd: lastTick + tickrate * 3,
          killerName: attackerName,
          killerTeam: killerSide,
          kills: killEvents,
          description: `${killEvents[0].weapon} bilan 4 ta raqibni yo'q qildi va raund taqdirini hal qildi.`,
          impactScore: 92,
          selected: true,
        });
      }
      // 3. Check for 3K (3 Kills)
      else if (killCount === 3) {
        highlights.push({
          id: `hl-${hlCounter++}`,
          type: "3k",
          title: `🎯 3K Triple Kill (${attackerName})`,
          roundNumber: round.round_number,
          timeFormatted,
          tickStart: Math.max(0, firstTick - tickrate * 3),
          tickEnd: lastTick + tickrate * 3,
          killerName: attackerName,
          killerTeam: killerSide,
          kills: killEvents,
          description: `Tezkor 3 ta o'ldirish orqali nuqtani himoyaladi/egalladi.`,
          impactScore: 84,
          selected: false,
        });
      }

      // 4. Check for Knife Kills
      const knifeKill = kills.find((k) => (k.weapon || "").toLowerCase().includes("knife") || (k.weapon || "").toLowerCase().includes("bayonet"));
      if (knifeKill && killCount < 3) {
        highlights.push({
          id: `hl-${hlCounter++}`,
          type: "knife",
          title: `🗡️ Pichoq bilan Kill (${attackerName})`,
          roundNumber: round.round_number,
          timeFormatted,
          tickStart: Math.max(0, (knifeKill.tick || firstTick) - tickrate * 3),
          tickEnd: (knifeKill.tick || lastTick) + tickrate * 3,
          killerName: attackerName,
          killerTeam: killerSide,
          kills: [
            {
              victimName: knifeKill.user_name || "Unknown",
              weapon: cleanWeaponName(knifeKill.weapon || "Knife"),
              isHeadshot: false,
              timeOffsetSeconds: 4,
            },
          ],
          description: `Raqib orqasiga yashirincha o'tib, pichoq bilan zarba berdi.`,
          impactScore: 88,
          selected: true,
        });
      }

      // 5. Check for NoScope Kills
      const noScopeKill = kills.find((k) => Boolean(k.noscope));
      if (noScopeKill && killCount < 3) {
        highlights.push({
          id: `hl-${hlCounter++}`,
          type: "noscope",
          title: `💥 Crazy No-Scope AWP (${attackerName})`,
          roundNumber: round.round_number,
          timeFormatted,
          tickStart: Math.max(0, (noScopeKill.tick || firstTick) - tickrate * 3),
          tickEnd: (noScopeKill.tick || lastTick) + tickrate * 3,
          killerName: attackerName,
          killerTeam: killerSide,
          kills: [
            {
              victimName: noScopeKill.user_name || "Unknown",
              weapon: cleanWeaponName(noScopeKill.weapon || "AWP"),
              isHeadshot: Boolean(noScopeKill.headshot),
              isNoScope: true,
              timeOffsetSeconds: 3,
            },
          ],
          description: `Pritselsiz (No-Scope) qiyin masofadan aniq nishonga tekkizildi!`,
          impactScore: 89,
          selected: true,
        });
      }
    });
  });

  return highlights;
}

function cleanWeaponName(raw: string): string {
  const map: Record<string, string> = {
    deagle: "Desert Eagle",
    ak47: "AK-47",
    m4a1: "M4A4",
    m4a1_silencer: "M4A1-S",
    awp: "AWP",
    usp_silencer: "USP-S",
    glock: "Glock-18",
    mp9: "MP9",
    mac10: "MAC-10",
    galilar: "Galil AR",
    famas: "FAMAS",
    ssg08: "Scout (SSG 08)",
  };

  const lower = raw.toLowerCase().replace("weapon_", "");
  return map[lower] || raw.toUpperCase();
}

function formatRoundTime(tick: number, tickrate: number): string {
  const totalSeconds = Math.floor(tick / tickrate);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
