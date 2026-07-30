"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import {
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";

type GenerationStatus =
  | "checking"
  | "generating"
  | "generated"
  | "failed";

type GenerationResponse = {
  success?: boolean;
  status?: string;
  message?: string;
  previewUrl?: string;
  downloadUrl?: string;
  error?: string;
};

export default function SuccessPage() {
  return (
    <Suspense fallback={<SuccessPageLoading />}>
      <SuccessPageContent />
    </Suspense>
  );
}

function SuccessPageLoading() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-5 py-20 text-white sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(250,204,21,0.12),transparent_45%)]" />

      <section className="relative w-full max-w-4xl border border-white/10 bg-[#090909] p-6 sm:p-10 lg:p-14">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center border border-yellow-400/40 text-3xl text-yellow-400">
            <span className="inline-block animate-spin">
              ◌
            </span>
          </div>

          <p className="mt-8 text-xs font-black uppercase tracking-[0.35em] text-yellow-400">
            Lumora AI Studio
          </p>

          <h1 className="mt-5 text-4xl font-black tracking-[-0.045em] sm:text-6xl">
            Chargement...
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-white/45">
            Vérification de votre paiement...
          </p>
        </div>
      </section>
    </main>
  );
}

function SuccessPageContent() {
  const searchParams = useSearchParams();

  const sessionId =
    searchParams.get("session_id");

  const generationStarted =
    useRef(false);

  const [status, setStatus] =
    useState<GenerationStatus>("checking");

  const [message, setMessage] =
    useState(
      "Vérification de votre paiement..."
    );

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null);

  const [downloadUrl, setDownloadUrl] =
    useState<string | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus("failed");
      setError(
        "L’identifiant du paiement est absent."
      );
      return;
    }

    if (generationStarted.current) {
      return;
    }

    generationStarted.current = true;

    void generateArtwork(sessionId);
  }, [sessionId]);

  async function generateArtwork(
    stripeSessionId: string
  ) {
    setStatus("checking");
    setMessage(
      "Vérification de votre paiement..."
    );
    setError(null);

    try {
      const response = await fetch(
        "/api/generate",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            session_id:
              stripeSessionId,
          }),
        }
      );

      const data =
        (await response.json()) as GenerationResponse;

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "Impossible de créer votre œuvre."
        );
      }

      if (data.status === "generated") {
        setStatus("generated");

        setMessage(
          data.message ||
            "Votre œuvre est prête."
        );

        setPreviewUrl(
          data.previewUrl || null
        );

        setDownloadUrl(
          data.downloadUrl || null
        );

        return;
      }

      setStatus("generating");

      setMessage(
        data.message ||
          "Votre œuvre est en cours de création..."
      );

      await waitForGeneration(
        stripeSessionId
      );
    } catch (caughtError) {
      console.error(
        "Erreur génération :",
        caughtError
      );

      setStatus("failed");

      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Une erreur est survenue."
      );
    }
  }

  async function waitForGeneration(
    stripeSessionId: string
  ) {
    const maximumAttempts = 60;

    for (
      let attempt = 0;
      attempt < maximumAttempts;
      attempt += 1
    ) {
      await new Promise<void>((resolve) => {
        window.setTimeout(
          resolve,
          3000
        );
      });

      const response = await fetch(
        `/api/generate?session_id=${encodeURIComponent(
          stripeSessionId
        )}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data =
        (await response.json()) as GenerationResponse;

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "Impossible de vérifier la création."
        );
      }

      if (data.status === "generated") {
        setStatus("generated");

        setMessage(
          data.message ||
            "Votre œuvre est prête."
        );

        setPreviewUrl(
          data.previewUrl || null
        );

        setDownloadUrl(
          data.downloadUrl || null
        );

        return;
      }

      if (data.status === "failed") {
        throw new Error(
          data.error ||
            "La création de votre œuvre a échoué."
        );
      }

      setStatus("generating");

      setMessage(
        data.message ||
          "Lumora transforme votre photo..."
      );
    }

    throw new Error(
      "La génération prend plus de temps que prévu. Rechargez cette page dans quelques instants."
    );
  }

  function retryGeneration() {
    if (!sessionId) {
      return;
    }

    setError(null);
    setPreviewUrl(null);
    setDownloadUrl(null);

    void generateArtwork(sessionId);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-5 py-20 text-white sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(250,204,21,0.12),transparent_45%)]" />

      <div className="pointer-events-none absolute bottom-[-220px] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-yellow-400/[0.04] blur-[140px]" />

      <motion.section
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        className="relative w-full max-w-4xl border border-white/10 bg-[#090909] p-6 sm:p-10 lg:p-14"
      >
        <div className="mx-auto max-w-2xl text-center">
          <div
            className={`mx-auto flex h-20 w-20 items-center justify-center border text-3xl ${
              status === "generated"
                ? "border-yellow-400 bg-yellow-400 text-black"
                : status === "failed"
                  ? "border-red-400/40 bg-red-400/10 text-red-300"
                  : "border-yellow-400/40 text-yellow-400"
            }`}
          >
            {status === "generated" ? (
              "✓"
            ) : status === "failed" ? (
              "!"
            ) : (
              <span className="inline-block animate-spin">
                ◌
              </span>
            )}
          </div>

          <p className="mt-8 text-xs font-black uppercase tracking-[0.35em] text-yellow-400">
            Lumora AI Studio
          </p>

          <h1 className="mt-5 text-4xl font-black tracking-[-0.045em] sm:text-6xl">
            {status === "generated"
              ? "Votre œuvre est prête."
              : status === "failed"
                ? "Un problème est survenu."
                : "Création en cours."}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-white/45">
            {error || message}
          </p>
        </div>

        {status === "generating" ||
        status === "checking" ? (
          <div className="mx-auto mt-12 max-w-xl">
            <div className="h-1 overflow-hidden bg-white/10">
              <motion.div
                initial={{
                  x: "-100%",
                }}
                animate={{
                  x: "350%",
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="h-full w-1/3 bg-yellow-400"
              />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <ProgressStep
                number="01"
                label="Paiement validé"
                active
              />

              <ProgressStep
                number="02"
                label="Transformation"
                active={
                  status ===
                  "generating"
                }
              />

              <ProgressStep
                number="03"
                label="Téléchargement"
                active={false}
              />
            </div>

            <p className="mt-8 text-center text-xs uppercase leading-6 tracking-[0.18em] text-white/25">
              Ne fermez pas cette page pendant la création
            </p>
          </div>
        ) : null}

        {status === "generated" && (
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-12"
          >
            {previewUrl && (
              <div className="mx-auto max-w-2xl overflow-hidden border border-white/10 bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Création Lumora générée"
                  className="max-h-[680px] w-full object-contain"
                />
              </div>
            )}

            <div className="mx-auto mt-8 max-w-2xl">
              {downloadUrl ? (
                <a
                  href={downloadUrl}
                  className="flex min-h-16 w-full items-center justify-between bg-yellow-400 px-6 font-black text-black transition hover:bg-yellow-300"
                >
                  <span>
                    Télécharger mon œuvre HD
                  </span>

                  <span className="text-xl">
                    ↓
                  </span>
                </a>
              ) : (
                <p className="border border-white/10 bg-white/[0.025] p-5 text-center text-sm text-white/40">
                  Le lien de téléchargement est en préparation.
                </p>
              )}

              <a
                href="/"
                className="mt-4 flex min-h-14 w-full items-center justify-center border border-white/10 font-bold text-white/55 transition hover:border-white/30 hover:text-white"
              >
                Retour à l’accueil
              </a>
            </div>
          </motion.div>
        )}

        {status === "failed" && (
          <div className="mx-auto mt-10 max-w-xl">
            <button
              type="button"
              onClick={retryGeneration}
              className="min-h-16 w-full bg-yellow-400 px-6 font-black text-black transition hover:bg-yellow-300"
            >
              Réessayer
            </button>

            <a
              href="/creer"
              className="mt-4 flex min-h-14 w-full items-center justify-center border border-white/10 font-bold text-white/55 transition hover:border-white/30 hover:text-white"
            >
              Retour à la création
            </a>
          </div>
        )}

        <div className="mt-12 border-t border-white/10 pt-6 text-center">
          <p className="text-[10px] uppercase leading-6 tracking-[0.2em] text-white/20">
            Paiement sécurisé · Création numérique personnalisée
          </p>
        </div>
      </motion.section>
    </main>
  );
}

function ProgressStep({
  number,
  label,
  active,
}: {
  number: string;
  label: string;
  active: boolean;
}) {
  return (
    <div
      className={`border px-4 py-4 ${
        active
          ? "border-yellow-400/35 bg-yellow-400/[0.045]"
          : "border-white/10 bg-white/[0.02]"
      }`}
    >
      <p
        className={`text-xs font-black ${
          active
            ? "text-yellow-400"
            : "text-white/20"
        }`}
      >
        {number}
      </p>

      <p
        className={`mt-2 text-xs font-bold ${
          active
            ? "text-white"
            : "text-white/25"
        }`}
      >
        {label}
      </p>
    </div>
  );
}