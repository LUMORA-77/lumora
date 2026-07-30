import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import sharp from "sharp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const STORAGE_BUCKET = "lumora-creations";
const OPENAI_IMAGE_MODEL = "gpt-image-2";

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
  customer_email: string | null;
  product_id: string;
  product_name: string;
  option_name: string;
  style: string;
  format: string;
  output_size: string;
  amount_cents: number;
  currency: string;
  original_path: string | null;
  preview_path: string | null;
  final_path: string | null;
  stripe_checkout_session_id: string | null;
  stripe_payment_intent_id: string | null;
  paid_at: string | null;
};

type OpenAIImageResponse = {
  data?: Array<{
    b64_json?: string;
    url?: string;
  }>;
  error?: {
    message?: string;
  };
};

function getStripeClient(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      "La variable STRIPE_SECRET_KEY est absente."
    );
  }

  return new Stripe(secretKey);
}

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

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function getOpenAIKey(): string {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "La variable OPENAI_API_KEY est absente."
    );
  }

  return apiKey;
}

function getStylePrompt(style: string): string {
  switch (style) {
    case "oil-painting":
      return `
Transform the uploaded photo into a refined luxury oil painting.
Preserve the identity, facial features, body proportions, pose,
clothing, important objects and overall composition of the original.
Use visible but elegant brushwork, rich pigment, realistic depth,
museum-quality lighting and sophisticated textures.
The result must feel premium, artistic and suitable as a luxury wallpaper.
Do not add text, logos, frames, watermarks or unrelated objects.
`;

    case "luxury":
      return `
Transform the uploaded photo into a premium luxury editorial artwork.
Preserve the identity, facial features, proportions, pose, clothing,
important objects and the main composition.
Use cinematic lighting, elegant shadows, refined materials,
high-end fashion campaign aesthetics and a polished finish.
Keep the result tasteful, realistic and sophisticated.
Do not add text, logos, watermarks or unrelated objects.
`;

    case "cyberpunk":
      return `
Transform the uploaded photo into a cinematic cyberpunk artwork.
Preserve the identity, facial features, proportions, pose,
important objects and recognizable composition.
Add controlled neon lighting, futuristic atmosphere,
deep contrast and premium science-fiction visual details.
The image must remain elegant and usable as a luxury wallpaper.
Do not add text, logos, watermarks or unrelated characters.
`;

    case "anime":
      return `
Transform the uploaded photo into a premium anime-style illustration.
Preserve the identity, recognizable facial features, hairstyle,
pose, clothing, important objects and overall composition.
Use clean detailed linework, expressive lighting,
rich shading and a polished cinematic animation finish.
Do not add text, logos, watermarks or unrelated characters.
`;

    case "minimal":
      return `
Transform the uploaded photo into a refined minimalist artwork.
Preserve the identity, recognizable features, pose,
important objects and the essence of the original composition.
Use elegant simplified forms, restrained visual detail,
soft premium lighting and a timeless luxury aesthetic.
Do not add text, logos, frames, watermarks or unrelated objects.
`;

    default:
      return `
Transform the uploaded photo into a refined premium digital artwork.
Preserve the identity, facial features, proportions, pose,
clothing, important objects and overall composition.
Use sophisticated lighting and a high-quality luxury finish.
Do not add text, logos, frames, watermarks or unrelated objects.
`;
  }
}

function getFormatPrompt(
  format: string,
  outputSize: string
): string {
  const normalizedFormat = format.toLowerCase();

  if (
    normalizedFormat.includes("téléphone") ||
    outputSize === "1024x1536"
  ) {
    return `
Compose the final artwork vertically in portrait orientation.
Make it suitable for a modern smartphone wallpaper.
Keep the principal subject clearly visible and avoid placing
important facial details too close to the top or bottom edges.
`;
  }

  if (
    normalizedFormat.includes("écran pc") ||
    outputSize === "1536x1024"
  ) {
    return `
Compose the final artwork horizontally in landscape orientation.
Make it suitable for a desktop computer wallpaper.
Extend the environment naturally on the sides without stretching
or deforming the principal subject.
`;
  }

  if (
    normalizedFormat.includes("poster carré") ||
    outputSize === "1024x1024"
  ) {
    return `
Compose the final artwork in a balanced square format.
Make it suitable for a premium digital poster.
Keep the main subject visually balanced and naturally framed.
`;
  }

  if (normalizedFormat.includes("poster horizontal")) {
    return `
Compose the final artwork horizontally in landscape orientation.
Make it suitable for a premium digital poster.
Extend the surroundings naturally while preserving the subject.
`;
  }

  return `
Compose the final artwork vertically in portrait orientation.
Make it suitable for a premium digital poster.
Preserve comfortable spacing around the principal subject.
`;
}

function buildGenerationPrompt(
  style: string,
  format: string,
  outputSize: string
): string {
  return `
${getStylePrompt(style)}

${getFormatPrompt(format, outputSize)}

Strict requirements:
- Keep the uploaded person or main subject recognizable.
- Preserve skin tone and important physical characteristics.
- Do not duplicate people, limbs, hands or facial features.
- Do not include writing, signatures, borders or watermarks.
- Fill the entire canvas naturally.
- Produce a finished high-quality artwork, not a mockup.
`;
}

function normalizeOutputSize(
  outputSize: string
): "1024x1024" | "1024x1536" | "1536x1024" {
  if (
    outputSize !== "1024x1024" &&
    outputSize !== "1024x1536" &&
    outputSize !== "1536x1024"
  ) {
    throw new Error(
      "La taille de sortie demandée n’est pas acceptée."
    );
  }

  return outputSize;
}

async function getOrderBySessionId(
  sessionId: string
): Promise<LumoraOrder> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("lumora_orders")
    .select("*")
    .eq("stripe_checkout_session_id", sessionId)
    .maybeSingle();

  if (error || !data) {
    console.error("Commande introuvable :", error);

    throw new Error(
      "La commande correspondant à ce paiement est introuvable."
    );
  }

  return data as LumoraOrder;
}

async function createSignedUrl(
  path: string | null,
  expiresIn = 3600
): Promise<string | null> {
  if (!path) {
    return null;
  }

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(path, expiresIn);

  if (error || !data?.signedUrl) {
    console.error(
      "Impossible de créer l’URL signée :",
      error
    );

    return null;
  }

  return data.signedUrl;
}

async function buildGeneratedResponse(
  order: LumoraOrder,
  sessionId: string
) {
  const previewUrl = await createSignedUrl(
    order.preview_path
  );

  return NextResponse.json({
    success: true,
    status: "generated",
    message: "Votre œuvre Lumora est prête.",
    previewUrl,
    downloadUrl: `/api/download?session_id=${encodeURIComponent(
      sessionId
    )}`,
  });
}

async function markOrderAsFailed(
  orderId: string
): Promise<void> {
  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from("lumora_orders")
    .update({
      status: "failed",
    })
    .eq("id", orderId);

  if (error) {
    console.error(
      "Impossible de marquer la commande comme échouée :",
      error
    );
  }
}

async function verifyPaidSession(
  sessionId: string,
  order: LumoraOrder
): Promise<void> {
  const stripe = getStripeClient();

  const session =
    await stripe.checkout.sessions.retrieve(sessionId);

  if (
    session.id !== order.stripe_checkout_session_id
  ) {
    throw new Error(
      "La session Stripe ne correspond pas à cette commande."
    );
  }

  if (
    session.metadata?.orderId &&
    session.metadata.orderId !== order.id
  ) {
    throw new Error(
      "Les informations du paiement ne correspondent pas à la commande."
    );
  }

  if (session.payment_status !== "paid") {
    throw new Error(
      "Le paiement n’a pas encore été confirmé par Stripe."
    );
  }

  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id ?? null;

  const customerEmail =
    session.customer_details?.email ??
    session.customer_email ??
    order.customer_email;

  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from("lumora_orders")
    .update({
      status:
        order.status === "generated"
          ? "generated"
          : "paid",
      customer_email: customerEmail,
      stripe_payment_intent_id: paymentIntentId,
      paid_at:
        order.paid_at ?? new Date().toISOString(),
    })
    .eq("id", order.id);

  if (error) {
    console.error(
      "Impossible d’enregistrer le paiement :",
      error
    );

    throw new Error(
      "Le paiement est validé, mais la commande n’a pas pu être mise à jour."
    );
  }
}

async function downloadOriginalImage(
  originalPath: string
): Promise<Buffer> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .download(originalPath);

  if (error || !data) {
    console.error(
      "Impossible de télécharger l’original :",
      error
    );

    throw new Error(
      "La photo originale de la commande est introuvable."
    );
  }

  return Buffer.from(await data.arrayBuffer());
}

async function generateWithOpenAI(
  imageBuffer: Buffer,
  style: string,
  format: string,
  outputSize: string
): Promise<Buffer> {
  const apiKey = getOpenAIKey();
  const form = new FormData();

  form.append("model", OPENAI_IMAGE_MODEL);

  form.append(
    "prompt",
    buildGenerationPrompt(style, format, outputSize)
  );

  form.append(
    "size",
    normalizeOutputSize(outputSize)
  );

  const imageArrayBuffer = imageBuffer.buffer.slice(
    imageBuffer.byteOffset,
    imageBuffer.byteOffset + imageBuffer.byteLength
  ) as ArrayBuffer;

  const imageBlob = new Blob(
    [imageArrayBuffer],
    {
      type: "image/png",
    }
  );

  form.append(
    "image",
    imageBlob,
    "image.png"
  );

  const response = await fetch(
    "https://api.openai.com/v1/images/edits",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: form,
    }
  );

  const data =
    (await response.json()) as OpenAIImageResponse;

  if (!response.ok) {
    console.error(
      "Erreur OpenAI :",
      data
    );

    throw new Error(
      data.error?.message ??
        "OpenAI n’a pas pu générer l’image."
    );
  }

  const image = data.data?.[0];

  if (!image?.b64_json) {
    throw new Error(
      "OpenAI n’a renvoyé aucune image."
    );
  }

  return Buffer.from(
    image.b64_json,
    "base64"
  );
}
async function createPreview(
  image: Buffer
): Promise<Buffer> {
  return sharp(image)
    .resize({
      width: 900,
      withoutEnlargement: true,
    })
    .jpeg({
      quality: 82,
    })
    .toBuffer();
}

async function uploadGeneratedImages(
  order: LumoraOrder,
  hdBuffer: Buffer,
  previewBuffer: Buffer
): Promise<{
  previewPath: string;
  finalPath: string;
}> {
  const supabase = getSupabaseAdmin();

  const previewPath =
    `${order.id}/preview.jpg`;

  const finalPath =
    `${order.id}/hd.jpg`;

  const {
    error: previewUploadError,
  } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(
      previewPath,
      previewBuffer,
      {
        contentType: "image/jpeg",
        upsert: true,
      }
    );

  if (previewUploadError) {
    console.error(
      "Erreur upload preview :",
      previewUploadError
    );

    throw new Error(
      "Impossible d’envoyer l’aperçu."
    );
  }

  const {
    error: hdUploadError,
  } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(
      finalPath,
      hdBuffer,
      {
        contentType: "image/jpeg",
        upsert: true,
      }
    );

  if (hdUploadError) {
    console.error(
      "Erreur upload HD :",
      hdUploadError
    );

    throw new Error(
      "Impossible d’envoyer l’image HD."
    );
  }

  const {
    error: updateError,
  } = await supabase
    .from("lumora_orders")
    .update({
      status: "generated",
      preview_path: previewPath,
      final_path: finalPath,
    })
    .eq("id", order.id);

  if (updateError) {
    console.error(
      "Erreur mise à jour commande :",
      updateError
    );

    throw new Error(
      "Impossible de mettre la commande à jour."
    );
  }

  return {
    previewPath,
    finalPath,
  };
}

export async function POST(
  request: NextRequest
) {
  let claimedOrderId: string | null = null;

  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          status: "invalid_request",
          error:
            "Le corps de la requête est invalide.",
        },
        {
          status: 400,
        }
      );
    }

    const sessionId =
      typeof body === "object" &&
      body !== null &&
      "session_id" in body &&
      typeof body.session_id === "string"
        ? body.session_id.trim()
        : "";

    if (!sessionId) {
      return NextResponse.json(
        {
          success: false,
          status: "missing_session",
          error:
            "La session de paiement Stripe est absente.",
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
          status: "invalid_session",
          error:
            "La session de paiement Stripe est invalide.",
        },
        {
          status: 400,
        }
      );
    }

    let order =
      await getOrderBySessionId(
        sessionId
      );

    if (
      (
        order.status === "generated" ||
        order.status === "email_sent"
      ) &&
      order.preview_path &&
      order.final_path
    ) {
      return buildGeneratedResponse(
        order,
        sessionId
      );
    }

    await verifyPaidSession(
      sessionId,
      order
    );

    order =
      await getOrderBySessionId(
        sessionId
      );

    if (
      (
        order.status === "generated" ||
        order.status === "email_sent"
      ) &&
      order.preview_path &&
      order.final_path
    ) {
      return buildGeneratedResponse(
        order,
        sessionId
      );
    }

    if (order.status === "generating") {
      return NextResponse.json(
        {
          success: true,
          status: "generating",
          message:
            "Votre œuvre est déjà en cours de création.",
        },
        {
          status: 202,
        }
      );
    }

    if (!order.original_path) {
      throw new Error(
        "La commande ne contient aucune photo originale."
      );
    }

    const supabase =
      getSupabaseAdmin();

    const {
      data: rawClaimedOrder,
      error: claimError,
    } = await supabase
      .from("lumora_orders")
      .update({
        status: "generating",
      })
      .eq("id", order.id)
      .in("status", [
        "paid",
        "failed",
      ])
      .select("*")
      .maybeSingle();

    if (claimError) {
      console.error(
        "Impossible de verrouiller la commande :",
        claimError
      );

      throw new Error(
        "La création n’a pas pu être démarrée."
      );
    }

    const claimedOrder =
      rawClaimedOrder as LumoraOrder | null;

    if (!claimedOrder) {
      const currentOrder =
        await getOrderBySessionId(
          sessionId
        );

      if (
        (
          currentOrder.status === "generated" ||
          currentOrder.status === "email_sent"
        ) &&
        currentOrder.preview_path &&
        currentOrder.final_path
      ) {
        return buildGeneratedResponse(
          currentOrder,
          sessionId
        );
      }

      if (
        currentOrder.status ===
        "generating"
      ) {
        return NextResponse.json(
          {
            success: true,
            status: "generating",
            message:
              "Votre œuvre est déjà en cours de création.",
          },
          {
            status: 202,
          }
        );
      }

      throw new Error(
        "La commande n’est pas dans un état permettant sa génération."
      );
    }

    claimedOrderId =
      claimedOrder.id;

    if (!claimedOrder.original_path) {
      throw new Error(
        "La photo originale de la commande est introuvable."
      );
    }

    const originalBuffer =
      await downloadOriginalImage(
        claimedOrder.original_path
      );

    let normalizedOriginal: Buffer;

    try {
      normalizedOriginal =
        await sharp(originalBuffer, {
          failOn: "error",
          limitInputPixels:
            80_000_000,
        })
          .rotate()
          .resize({
            width: 2048,
            height: 2048,
            fit: "inside",
            withoutEnlargement: true,
          })
          .flatten({
            background: {
              r: 255,
              g: 255,
              b: 255,
            },
          })
          .png({
            compressionLevel: 9,
            adaptiveFiltering: true,
          })
          .toBuffer();
    } catch (imageError) {
      console.error(
        "Photo originale invalide :",
        imageError
      );

      throw new Error(
        "La photo originale ne peut pas être traitée. Essayez une autre image JPG ou PNG."
      );
    }

    const generatedBuffer =
      await generateWithOpenAI(
        normalizedOriginal,
        claimedOrder.style,
        claimedOrder.format,
        claimedOrder.output_size
      );

    if (generatedBuffer.length === 0) {
      throw new Error(
        "Le service de génération n’a renvoyé aucune image."
      );
    }

    let finalBuffer: Buffer;

    try {
      finalBuffer =
        await sharp(generatedBuffer, {
          failOn: "error",
          limitInputPixels:
            80_000_000,
        })
          .rotate()
          .flatten({
            background: {
              r: 255,
              g: 255,
              b: 255,
            },
          })
          .jpeg({
            quality: 95,
            chromaSubsampling:
              "4:4:4",
            mozjpeg: true,
          })
          .toBuffer();
    } catch (generatedImageError) {
      console.error(
        "Image OpenAI invalide :",
        generatedImageError
      );

      throw new Error(
        "L’image générée n’a pas pu être préparée."
      );
    }

    const previewBuffer =
      await createPreview(
        finalBuffer
      );

    await uploadGeneratedImages(
      claimedOrder,
      finalBuffer,
      previewBuffer
    );

    const generatedOrder =
      await getOrderBySessionId(
        sessionId
      );

    if (
      !generatedOrder.preview_path ||
      !generatedOrder.final_path
    ) {
      throw new Error(
        "La création est terminée, mais ses fichiers n’ont pas été correctement enregistrés."
      );
    }

    return buildGeneratedResponse(
      generatedOrder,
      sessionId
    );
  } catch (caughtError) {
    console.error(
      "Erreur POST /api/generate :",
      caughtError
    );

    if (claimedOrderId) {
      await markOrderAsFailed(
        claimedOrderId
      );
    }

    const message =
      caughtError instanceof Error
        ? caughtError.message
        : "Une erreur inattendue est survenue pendant la création.";

    const loweredMessage =
      message.toLowerCase();

    const isPaymentError =
      loweredMessage.includes("paiement") ||
      loweredMessage.includes("stripe");

    const isNotFoundError =
      loweredMessage.includes(
        "introuvable"
      );

    return NextResponse.json(
      {
        success: false,
        status: "failed",
        error: message,
      },
      {
        status: isPaymentError
          ? 402
          : isNotFoundError
            ? 404
            : 500,
      }
    );
  }
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
          status: "missing_session",
          error:
            "La session de paiement Stripe est absente.",
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
          status: "invalid_session",
          error:
            "La session de paiement Stripe est invalide.",
        },
        {
          status: 400,
        }
      );
    }

    const order =
      await getOrderBySessionId(
        sessionId
      );

    if (
      order.status ===
      "pending_payment"
    ) {
      return NextResponse.json({
        success: true,
        status: "pending_payment",
        message:
          "Le paiement est en attente.",
      });
    }

    if (
      order.status ===
        "checkout_created" ||
      order.status ===
        "paid"
    ) {
      return NextResponse.json({
        success: true,
        status: "paid",
        message:
          "Le paiement est validé. La création peut démarrer.",
      });
    }

    if (
      order.status ===
      "generating"
    ) {
      return NextResponse.json(
        {
          success: true,
          status: "generating",
          message:
            "Votre œuvre est en cours de création.",
        },
        {
          status: 202,
        }
      );
    }

    if (
      order.status === "generated" ||
      order.status === "email_sent"
    ) {
      if (
        !order.preview_path ||
        !order.final_path
      ) {
        return NextResponse.json(
          {
            success: false,
            status: "failed",
            error:
              "La création est terminée, mais ses fichiers sont introuvables.",
          },
          {
            status: 500,
          }
        );
      }

      return buildGeneratedResponse(
        order,
        sessionId
      );
    }

    if (
      order.status ===
      "failed"
    ) {
      return NextResponse.json(
        {
          success: false,
          status: "failed",
          error:
            "La génération a échoué. Vous pouvez réessayer.",
        },
        {
          status: 500,
        }
      );
    }

    if (
      order.status ===
      "expired"
    ) {
      return NextResponse.json(
        {
          success: false,
          status: "expired",
          error:
            "Cette commande a expiré.",
        },
        {
          status: 410,
        }
      );
    }

    return NextResponse.json({
      success: true,
      status: order.status,
    });
  } catch (caughtError) {
    console.error(
      "Erreur GET /api/generate :",
      caughtError
    );

    const message =
      caughtError instanceof Error
        ? caughtError.message
        : "Une erreur interne est survenue.";

    const isNotFoundError =
      message
        .toLowerCase()
        .includes("introuvable");

    return NextResponse.json(
      {
        success: false,
        status: "failed",
        error: message,
      },
      {
        status: isNotFoundError
          ? 404
          : 500,
      }
    );
  }
}