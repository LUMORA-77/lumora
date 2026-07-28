import { NextResponse } from "next/server";

export async function POST() {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    return NextResponse.json(
      { error: "Le paiement Stripe n’est pas encore configuré." },
      { status: 503 }
    );
  }

  return NextResponse.json(
    { message: "Paiement bientôt disponible." },
    { status: 501 }
  );
}