import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST() {
  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: "Dis simplement : LUMORA fonctionne !",
    });

    return NextResponse.json({
      success: true,
      result: response.output_text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur OpenAI",
      },
      { status: 500 }
    );
  }
}