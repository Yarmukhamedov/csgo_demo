import { NextRequest, NextResponse } from "next/server";
import { fetchSteamProfile } from "@/lib/steam-service";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Steam ID yoki Profile URL kiritilmadi" },
      { status: 400 }
    );
  }

  const profile = await fetchSteamProfile(id);

  if (!profile) {
    return NextResponse.json(
      { error: "Steam profili topilmadi yoki profil yopiq (private)" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    profile,
  });
}
