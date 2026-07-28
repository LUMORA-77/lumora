import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { message: "Génération IA bientôt disponible." },
    { status: 501 }
  );
}