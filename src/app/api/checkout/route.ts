import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PRICE_CENTS = 1200;
const CURRENCY = "eur";
const STORAGE_BUCKET = "lumora-creations";

const MAX_FILE_SIZE = 15 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

type UploadedImage = {
  file: File;
  extension: string;
};

function getStripeClient() {
  const secretKey =
    process.env.STRIPE_SECRET_KEY;

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

function getSiteUrl(request: NextRequest) {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configuredUrl) {
    return configuredUrl.replace(/\/+$/, "");
  }

  const forwardedHost =
    request.headers.get("x-forwarded-host");

  const host =
    forwardedHost ||
    request.headers.get("host");

  const forwardedProtocol =
    request.headers.get("x-forwarded-proto");

  const protocol =
    forwardedProtocol ||
    (host?.includes("localhost")
      ? "http"
      : "https");

  if (!host) {
    throw new Error(
      "Impossible de déterminer l’adresse du site."
    );
  }

  return `${protocol}://${host}`;
}

function getImageExtension(
  mimeType: string
) {
  if (mimeType === "image/jpeg") {
    return "jpg";
  }

  if (mimeType === "image/png") {
    return "png";
  }

  if (mimeType === "image/webp") {
    return "webp";
  }

  throw new Error(
    "Le type de fichier envoyé n’est pas accepté."
  );
}

function validateUploadedImage(
  value: FormDataEntryValue | null
): UploadedImage {
  if (!(value instanceof File)) {
    throw new Error(
      "Aucune photo n’a été envoyée."
    );
  }

  if (!ALLOWED_IMAGE_TYPES.includes(value.type)) {
    throw new Error(
      "La photo doit être au format JPG, PNG ou WEBP."
    );
  }

  if (value.size <= 0) {
    throw new Error(
      "La photo envoyée est vide."
    );
  }

  if (value.size > MAX_FILE_SIZE) {
    throw new Error(
      "La photo ne doit pas dépasser 15 Mo."
    );
  }

  return {
    file: value,
    extension: getImageExtension(value.type),
  };
}

function getRequiredText(
  formData: FormData,
  key: string,
  label: string
) {
  const value =
    formData.get(key);

  if (
    typeof value !== "string" ||
    !value.trim()
  ) {
    throw new Error(
      `${label} est manquant.`
    );
  }

  return value.trim();
}

function getOptionalEmail(
  formData: FormData
) {
  const value =
    formData.get("email");

  if (
    typeof value !== "string" ||
    !value.trim()
  ) {
    return null;
  }

  const email =
    value.trim().toLowerCase();

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    throw new Error(
      "L’adresse e-mail est invalide."
    );
  }

  return email;
}

function getProductName(
  format: string
) {
  const normalizedFormat =
    format.toLowerCase();

  if (
    normalizedFormat.includes(
      "téléphone"
    )
  ) {
    return "Fond d’écran téléphone personnalisé";
  }

  if (
    normalizedFormat.includes(
      "écran pc"
    )
  ) {
    return "Fond d’écran ordinateur personnalisé";
  }

  if (
    normalizedFormat.includes(
      "poster"
    )
  ) {
    return "Poster numérique personnalisé";
  }

  return "Création Lumora personnalisée";
}

function getProductId(
  format: string
) {
  const normalizedFormat =
    format.toLowerCase();

  if (
    normalizedFormat.includes(
      "téléphone"
    )
  ) {
    return "custom-phone";
  }

  if (
    normalizedFormat.includes(
      "écran pc"
    )
  ) {
    return "custom-desktop";
  }

  if (
    normalizedFormat.includes(
      "poster"
    )
  ) {
    return "custom-poster";
  }

  return "custom-artwork";
}

function buildOptionName(
  style: string,
  format: string
) {
  return `${style} · ${format}`;
}

async function deleteStoredOriginal(
  originalPath: string
) {
  try {
    const supabase =
      getSupabaseAdmin();

    await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([originalPath]);
  } catch (error) {
    console.error(
      "Impossible de supprimer l’image originale :",
      error
    );
  }
}

async function deleteOrder(
  orderId: string
) {
  try {
    const supabase =
      getSupabaseAdmin();

    await supabase
      .from("lumora_orders")
      .delete()
      .eq("id", orderId);
  } catch (error) {
    console.error(
      "Impossible de supprimer la commande :",
      error
    );
  }
}

export async function POST(
  request: NextRequest
) {
  let createdOrderId:
    | string
    | null = null;

  let uploadedOriginalPath:
    | string
    | null = null;

  try {
    const formData =
      await request.formData();

    const { file, extension } =
      validateUploadedImage(
        formData.get("image")
      );

    const style =
      getRequiredText(
        formData,
        "style",
        "Le style"
      );

    const format =
      getRequiredText(
        formData,
        "format",
        "Le format"
      );

    const outputSize =
      getRequiredText(
        formData,
        "size",
        "La taille de sortie"
      );

    const customerEmail =
      getOptionalEmail(formData);

    const stripe =
      getStripeClient();

    const supabase =
      getSupabaseAdmin();

    const siteUrl =
      getSiteUrl(request);

    const orderId =
      crypto.randomUUID();

    createdOrderId =
      orderId;

    const originalPath =
      `${orderId}/original.${extension}`;

    uploadedOriginalPath =
      originalPath;

    const imageBuffer =
      Buffer.from(
        await file.arrayBuffer()
      );

    const {
      error: uploadError,
    } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(
        originalPath,
        imageBuffer,
        {
          contentType: file.type,
          cacheControl: "3600",
          upsert: false,
        }
      );

    if (uploadError) {
      console.error(
        "Erreur Supabase Storage :",
        uploadError
      );

      throw new Error(
        "Impossible d’enregistrer votre photo."
      );
    }

    const productId =
      getProductId(format);

    const productName =
      getProductName(format);

    const optionName =
      buildOptionName(
        style,
        format
      );

    const {
      data: insertedOrder,
      error: insertError,
    } = await supabase
      .from("lumora_orders")
      .insert({
        id: orderId,
        status: "pending_payment",
        customer_email:
          customerEmail,
        product_id: productId,
        product_name:
          productName,
        option_name:
          optionName,
        style,
        format,
        output_size:
          outputSize,
        amount_cents:
          PRICE_CENTS,
        currency:
          CURRENCY,
        original_path:
          originalPath,
        preview_path:
          null,
        final_path:
          null,
      })
      .select("id")
      .single();

    if (
      insertError ||
      !insertedOrder
    ) {
      console.error(
        "Erreur insertion commande :",
        insertError
      );

      throw new Error(
        "Impossible de créer votre commande."
      );
    }
        const checkoutSession =
      await stripe.checkout.sessions.create({
        mode: "payment",

        payment_method_types: [
          "card",
        ],

        customer_email:
          customerEmail || undefined,

        line_items: [
          {
            quantity: 1,

            price_data: {
              currency: CURRENCY,

              unit_amount:
                PRICE_CENTS,

              product_data: {
                name: productName,

                description:
                  `Création Lumora personnalisée · ${optionName}`,
              },
            },
          },
        ],

        metadata: {
          orderId,
          productId,
          style,
          format,
          outputSize,
        },

        payment_intent_data: {
          metadata: {
            orderId,
            productId,
          },
        },

        success_url:
          `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,

        cancel_url:
          `${siteUrl}/creer?payment=cancelled`,
      });

    if (!checkoutSession.url) {
      throw new Error(
        "Stripe n’a pas fourni de lien de paiement."
      );
    }

    const {
      error: updateError,
    } = await supabase
      .from("lumora_orders")
      .update({
        status:
          "checkout_created",

        stripe_checkout_session_id:
          checkoutSession.id,
      })
      .eq("id", orderId);

    if (updateError) {
      console.error(
        "Erreur mise à jour commande :",
        updateError
      );

      try {
        await stripe.checkout.sessions.expire(
          checkoutSession.id
        );
      } catch (stripeError) {
        console.error(
          "Impossible d’expirer la session Stripe :",
          stripeError
        );
      }

      throw new Error(
        "Impossible de finaliser votre commande."
      );
    }

    return NextResponse.json(
      {
        success: true,
        orderId,
        checkoutUrl:
          checkoutSession.url,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Erreur /api/checkout :",
      error
    );

    if (
      uploadedOriginalPath
    ) {
      await deleteStoredOriginal(
        uploadedOriginalPath
      );
    }

    if (createdOrderId) {
      await deleteOrder(
        createdOrderId
      );
    }

    const message =
      error instanceof Error
        ? error.message
        : "Une erreur inconnue est survenue.";

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