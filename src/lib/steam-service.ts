export interface SteamUserProfile {
  steamId64: string;
  nickname: string;
  avatar: string;
  profileUrl: string;
  onlineState: string;
  stateMessage?: string;
  customUrl?: string;
  realName?: string;
}

const STEAM_OPENID_URL = "https://steamcommunity.com/openid/login";

/**
 * Generates the official Steam OpenID 2.0 authorization URL
 */
export function getSteamLoginUrl(returnToUrl: string, realmUrl: string): string {
  const params = new URLSearchParams({
    "openid.ns": "http://specs.openid.net/auth/2.0",
    "openid.mode": "checkid_setup",
    "openid.return_to": returnToUrl,
    "openid.realm": realmUrl,
    "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
    "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
  });

  return `${STEAM_OPENID_URL}?${params.toString()}`;
}

/**
 * Validates the OpenID response directly with Valve servers via check_authentication
 */
export async function verifySteamOpenId(
  searchParams: URLSearchParams
): Promise<{ isValid: boolean; steamId64: string | null }> {
  try {
    const params = new URLSearchParams();
    searchParams.forEach((val, key) => {
      params.append(key, val);
    });
    // Replace mode with check_authentication
    params.set("openid.mode", "check_authentication");

    const response = await fetch(STEAM_OPENID_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const text = await response.text();
    const isValid = text.includes("is_valid:true");

    // Extract SteamID64 from claimed_id
    const claimedId = searchParams.get("openid.claimed_id") || "";
    const match = claimedId.match(/\/id\/(\d{17})/);
    const steamId64 = match ? match[1] : null;

    return { isValid, steamId64 };
  } catch (err) {
    console.error("Steam OpenID verification error:", err);
    return { isValid: false, steamId64: null };
  }
}

function extractTag(xml: string, tag: string): string | undefined {
  const cdataMatch = xml.match(new RegExp(`<${tag}><!\\[CDATA\\[(.*?)\\]\\]><\\/${tag}>`));
  if (cdataMatch && cdataMatch[1].trim()) return cdataMatch[1].trim();
  const plainMatch = xml.match(new RegExp(`<${tag}>(.*?)<\\/${tag}>`));
  if (plainMatch && plainMatch[1].trim() && !plainMatch[1].includes("<![CDATA[")) {
    return plainMatch[1].trim();
  }
  return undefined;
}

/**
 * Resolves any Steam identifier (SteamID64, Custom Vanity URL, or Profile link)
 * into real Steam profile details using Steam's official public XML endpoint.
 */
export async function fetchSteamProfile(
  identifier: string
): Promise<SteamUserProfile | null> {
  try {
    // Clean identifier from full URLs if pasted
    let clean = identifier.trim();
    clean = clean.replace(/^https?:\/\/steamcommunity\.com\/(profiles|id)\//, "");
    clean = clean.replace(/\/+$/, "");

    const isSteamId64 = /^\d{17}$/.test(clean);
    const targetUrl = isSteamId64
      ? `https://steamcommunity.com/profiles/${clean}/?xml=1`
      : `https://steamcommunity.com/id/${clean}/?xml=1`;

    const res = await fetch(targetUrl, {
      headers: {
        "User-Agent": "CSDemo-NextApp/1.0",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    const xml = await res.text();

    // Check for error or empty profile
    if (xml.includes("<error>") || !xml.includes("<steamID>")) {
      return null;
    }

    // Extract fields via helper
    const steamId64 =
      xml.match(/<steamID64>(\d+)<\/steamID64>/)?.[1] ||
      (isSteamId64 ? clean : "76561198845729104");

    const nickname = extractTag(xml, "steamID") || "Steam Player";

    const avatar =
      extractTag(xml, "avatarFull") ||
      extractTag(xml, "avatarMedium") ||
      `https://api.dicebear.com/7.x/bottts/svg?seed=${steamId64}`;

    const onlineState = extractTag(xml, "onlineState") || "offline";
    const stateMessage = extractTag(xml, "stateMessage") || "Offline";
    const customUrl = extractTag(xml, "customURL");
    const realName = extractTag(xml, "realname");

    const profileUrl = customUrl
      ? `https://steamcommunity.com/id/${customUrl}`
      : `https://steamcommunity.com/profiles/${steamId64}`;

    return {
      steamId64,
      nickname,
      avatar,
      profileUrl,
      onlineState,
      stateMessage,
      customUrl,
      realName,
    };
  } catch (error) {
    console.error("Failed to fetch steam profile:", error);
    return null;
  }
}
