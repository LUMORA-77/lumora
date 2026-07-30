import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STORAGE_BUCKET = "lumora-creations";

type OrderStatus =
  | "pending_payment"
  | "checkout_created"
  | "paid"
  | "generating"
  | "generated"
  | "email_sent"
  | "expired"
  | "failed";

type LumoraOrder = {
  id: string;
  status: OrderStatus;
  final_path: string | null;
  stripe_checkout_session_id: string | null;
};

function getSupabaseAdmin() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "La variable NEXT_PUBLIC_SUPABASE_URL est absente."
    );
  }

  if (!serviceRoleKey) {
    throw new Error(
      "La variable SUPABASE_SERVICE_ROLE_KEY est absente."
    );
  }

  return createClient(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

function sanitizeFileName(fileName: string) {
  return fileName.replace(
    /[^a-zA-Z0-9._-]/g,
    "-"
  );
}

export async function GET(
  request: NextRequest
) {
  try {
    const { searchParams } =
      new URL(request.url);

    const sessionId =
      searchParams
        .get("session_id")
        ?.trim() ?? "";

    if (!sessionId) {
      return NextResponse.json(
        {
          success: false,
          error:
            "La session de paiement est manquante.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !sessionId.startsWith("cs_") ||
      sessionId.length > 255
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "La session de paiement est invalide.",
        },
        {
          status: 400,
        }
      );
    }

    const supabase =
      getSupabaseAdmin();

    const {
      data,
      error: orderError,
    } = await supabase
      .from("lumora_orders")
      .select(
        `
          id,
          status,
          final_path,
          stripe_checkout_session_id
        `
      )
      .eq(
        "stripe_checkout_session_id",
        sessionId
      )
      .maybeSingle();

    if (orderError) {
      console.error(
        "Erreur lors de la récupération de la commande :",
        orderError
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Impossible de récupérer la commande.",
        },
        {
          status: 500,
        }
      );
    }

    const order =
      data as LumoraOrder | null;

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Commande introuvable.",
        },
        {
          status: 404,
        }
      );
    }

    const allowedStatuses: OrderStatus[] = [
      "generated",
      "email_sent",
    ];

    if (
      !allowedStatuses.includes(
        order.status
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "La création n’est pas encore disponible au téléchargement.",
          status: order.status,
        },
        {
          status: 409,
        }
      );
    }

    if (!order.final_path) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Le fichier final de cette création est introuvable.",
        },
        {
          status: 404,
        }
      );
    }

    const {
      data: file,
      error: downloadError,
    } = await supabase.storage
      .from(STORAGE_BUCKET)
      .download(order.final_path);

    if (
      downloadError ||
      !file
    ) {
      console.error(
        "Erreur de téléchargement Supabase :",
        downloadError
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Impossible de télécharger la création.",
        },
        {
          status: 500,
        }
      );
    }

    const fileBuffer =
      await file.arrayBuffer();

    const originalFileName =
      order.final_path
        .split("/")
        .pop() ||
      `lumora-${order.id}.jpg`;

    const fileName =
      sanitizeFileName(
        originalFileName
      );

    return new NextResponse(
      fileBuffer,
      {
        status: 200,
        headers: {
          "Content-Type":
            file.type ||
            "image/jpeg",

          "Content-Disposition":
            `attachment; filename="${fileName}"`,

          "Content-Length":
            String(
              fileBuffer.byteLength
            ),

          "Cache-Control":
            "private, no-store, max-age=0",

          "X-Content-Type-Options":
            "nosniff",
        },
      }
    );
  } catch (caughtError) {
    console.error(
      "Erreur GET /api/download :",
      caughtError
    );

    const message =
      caughtError instanceof Error
        ? caughtError.message
        : "Une erreur inattendue est survenue.";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      {
        status: 500,
      }
    );
  }
}