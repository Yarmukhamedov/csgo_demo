import { NextRequest, NextResponse } from "next/server";
import { verifySteamOpenId, fetchSteamProfile } from "@/lib/steam-service";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const origin = req.nextUrl.origin;

  const { isValid, steamId64 } = await verifySteamOpenId(searchParams);

  if (!isValid || !steamId64) {
    console.error("Steam OpenID verification failed or no steamId64");
    return NextResponse.redirect(`${origin}/?auth=steam_error`);
  }

  // Fetch real Steam profile
  const profile = await fetchSteamProfile(steamId64);

  const steamUser = {
    steamId64,
    nickname: profile?.nickname || `Player_${steamId64.slice(-4)}`,
    avatar: profile?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${steamId64}`,
    profileUrl: profile?.profileUrl || `https://steamcommunity.com/profiles/${steamId64}`,
    onlineState: profile?.onlineState || "online",
    stateMessage: profile?.stateMessage || "In-Game Counter-Strike 2",
    isLoggedIn: true,
  };

  const redirectUrl = new URL("/", origin);
  redirectUrl.searchParams.set("auth", "steam_success");
  redirectUrl.searchParams.set("steamid", steamId64);
  redirectUrl.searchParams.set("nickname", steamUser.nickname);

  const res = NextResponse.redirect(redirectUrl.toString());

  // Store user in a cookie for server/client synchronization
  res.cookies.set("steam_user", JSON.stringify(steamUser), {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: false, // Accessible from client-side JavaScript
    sameSite: "lax",
  });

  return res;
}
