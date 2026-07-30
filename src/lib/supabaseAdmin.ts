import { createClient } from "@supabase/supabase-js";

let admin: ReturnType<typeof createClient> | null = null;

export function getSupabaseAdmin() {
  if (admin) {
    return admin;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SECRET_KEY?.trim();

  console.log("SUPABASE_URL :", url);
  console.log(
    "SUPABASE_SECRET_KEY :",
    serviceKey ? "OK" : "MANQUANTE"
  );

  if (!url) {
    throw new Error(
      "La variable NEXT_PUBLIC_SUPABASE_URL est manquante."
    );
  }

  if (!serviceKey) {
    throw new Error(
      "La variable SUPABASE_SECRET_KEY est manquante."
    );
  }

  admin = createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return admin;
}