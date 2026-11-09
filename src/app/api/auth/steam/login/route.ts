import { NextRequest, NextResponse } from "next/server";
import { getSteamLoginUrl } from "@/lib/steam-service";

export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const returnTo = `${origin}/api/auth/steam/return`;
  const realm = `${origin}/`;

  const steamAuthUrl = getSteamLoginUrl(returnTo, realm);

  return NextResponse.redirect(steamAuthUrl);
}
