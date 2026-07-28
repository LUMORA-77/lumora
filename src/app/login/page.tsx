"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setErrorMessage("");

    try {
      const supabase = getSupabase();

      if (mode === "register") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        setMessage(
          "Compte créé. Vérifie ton adresse e-mail pour confirmer ton inscription."
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        router.push("/compte");
        router.refresh();
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue. Réessaie."
      );
    } finally {
      setLoading(false);
    }
  }

  function changeMode(newMode: "login" | "register") {
    setMode(newMode);
    setMessage("");
    setErrorMessage("");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 py-12 text-white">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <Link
            href="/"
            className="text-3xl font-semibold tracking-[0.35em] text-white"
          >
            LUMORA
          </Link>

          <p className="mt-4 text-sm text-neutral-400">
            {mode === "register"
              ? "Crée ton compte pour accéder à ton espace."
              : "Connecte-toi à ton espace personnel."}
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 grid grid-cols-2 rounded-full border border-white/10 bg-black p-1">
            <button
              type="button"
              onClick={() => changeMode("login")}
              className={`rounded-full px-4 py-3 text-sm transition ${
                mode === "login"
                  ? "bg-white text-black"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Connexion
            </button>

            <button
              type="button"
              onClick={() => changeMode("register")}
              className={`rounded-full px-4 py-3 text-sm transition ${
                mode === "register"
                  ? "bg-white text-black"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Inscription
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm text-neutral-300"
              >
                Adresse e-mail
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="exemple@email.com"
                className="w-full rounded-2xl border border-white/10 bg-black px-4 py-4 text-white outline-none transition placeholder:text-neutral-600 focus:border-white/40"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm text-neutral-300"
              >
                Mot de passe
              </label>

              <input
                id="password"
                type="password"
                autoComplete={
                  mode === "register" ? "new-password" : "current-password"
                }
                required
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="6 caractères minimum"
                className="w-full rounded-2xl border border-white/10 bg-black px-4 py-4 text-white outline-none transition placeholder:text-neutral-600 focus:border-white/40"
              />
            </div>

            {errorMessage && (
              <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {errorMessage}
              </p>
            )}

            {message && (
              <p className="rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-white px-6 py-4 font-medium text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Chargement..."
                : mode === "register"
                  ? "Créer mon compte"
                  : "Se connecter"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs leading-5 text-neutral-500">
            En continuant, tu acceptes les conditions d’utilisation de LUMORA.
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-neutral-500 transition hover:text-white"
          >
            ← Retour à l’accueil
          </Link>
        </div>
      </div>
    </main>
  );
}