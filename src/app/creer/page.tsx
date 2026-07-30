"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChangeEvent,
  DragEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type ArtStyle = {
  id: string;
  name: string;
  description: string;
  accent: string;
};

type Support = {
  id: "telephone" | "ecran-pc" | "poster";
  name: string;
  description: string;
  format?: string;
  size?: string;
};

type PosterOrientation = {
  id: "vertical" | "horizontal" | "carre";
  name: string;
  description: string;
  format: string;
  size: string;
};

type CheckoutResponse = {
  success?: boolean;
  checkoutUrl?: string;
  url?: string;
  error?: string;
};

const MAXIMUM_FILE_SIZE = 15 * 1024 * 1024;

const acceptedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const artStyles: ArtStyle[] = [
  {
    id: "oil-painting",
    name: "Oil Painting",
    description:
      "Peinture riche, textures profondes et rendu artistique.",
    accent: "Classique",
  },
  {
    id: "luxury",
    name: "Luxury",
    description:
      "Éclairage cinématique et finition éditoriale haut de gamme.",
    accent: "Premium",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description:
      "Néons, contrastes puissants et ambiance futuriste.",
    accent: "Futuriste",
  },
  {
    id: "anime",
    name: "Anime",
    description:
      "Illustration expressive inspirée de l’animation japonaise.",
    accent: "Illustré",
  },
  {
    id: "minimal",
    name: "Minimal",
    description:
      "Composition épurée, élégante et intemporelle.",
    accent: "Épuré",
  },
];

const supports: Support[] = [
  {
    id: "telephone",
    name: "Téléphone",
    description:
      "Format vertical optimisé pour les fonds d’écran de smartphone.",
    format: "Téléphone",
    size: "1024x1536",
  },
  {
    id: "ecran-pc",
    name: "Écran PC",
    description:
      "Format horizontal conçu pour les ordinateurs et moniteurs.",
    format: "Écran PC",
    size: "1536x1024",
  },
  {
    id: "poster",
    name: "Poster",
    description:
      "Choisissez ensuite une orientation verticale, horizontale ou carrée.",
  },
];

const posterOrientations: PosterOrientation[] = [
  {
    id: "vertical",
    name: "Vertical",
    description:
      "Une composition en hauteur idéale pour une affiche portrait.",
    format: "Poster vertical",
    size: "1024x1536",
  },
  {
    id: "horizontal",
    name: "Horizontal",
    description:
      "Une composition large idéale pour une affiche paysage.",
    format: "Poster horizontal",
    size: "1536x1024",
  },
  {
    id: "carre",
    name: "Carré",
    description:
      "Une composition équilibrée adaptée aux affiches carrées.",
    format: "Poster carré",
    size: "1024x1024",
  },
];

const steps = [
  {
    number: "01",
    label: "Photo",
  },
  {
    number: "02",
    label: "Style",
  },
  {
    number: "03",
    label: "Support",
  },
  {
    number: "04",
    label: "Paiement",
  },
];

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function readJsonSafely(
  response: Response
): Promise<CheckoutResponse> {
  try {
    return (await response.json()) as CheckoutResponse;
  } catch {
    return {
      success: false,
      error:
        "Le serveur a renvoyé une réponse illisible.",
    };
  }
}

export default function Creer() {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [image, setImage] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState<string | null>(null);

  const [selectedStyle, setSelectedStyle] =
    useState<ArtStyle>(artStyles[0]);

  const [selectedSupport, setSelectedSupport] =
    useState<Support | null>(null);

  const [
    posterOrientation,
    setPosterOrientation,
  ] =
    useState<PosterOrientation | null>(
      null
    );

  const [customerEmail, setCustomerEmail] =
    useState("");

  const [dragging, setDragging] =
    useState(false);

  const [loadingCheckout, setLoadingCheckout] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  function getSelectedFormat() {
    if (!selectedSupport) {
      return null;
    }

    if (selectedSupport.id === "poster") {
      if (!posterOrientation) {
        return null;
      }

      return {
        format: posterOrientation.format,
        size: posterOrientation.size,
        optionName: posterOrientation.name,
      };
    }

    if (
      !selectedSupport.format ||
      !selectedSupport.size
    ) {
      return null;
    }

    return {
      format: selectedSupport.format,
      size: selectedSupport.size,
      optionName: selectedSupport.name,
    };
  }

  function handleImage(file: File) {
    setError(null);

    if (
      !acceptedImageTypes.includes(
        file.type
      )
    ) {
      setError(
        "Choisissez une image JPG, PNG ou WEBP."
      );
      return;
    }

    if (file.size === 0) {
      setError(
        "Le fichier sélectionné est vide."
      );
      return;
    }

    if (file.size > MAXIMUM_FILE_SIZE) {
      setError(
        "Votre image ne doit pas dépasser 15 Mo."
      );
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const nextPreview =
      URL.createObjectURL(file);

    setImage(file);
    setPreview(nextPreview);
  }

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (file) {
      handleImage(file);
    }

    event.target.value = "";
  }

  function handleDragOver(
    event: DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();

    if (!loadingCheckout) {
      setDragging(true);
    }
  }

  function handleDragLeave(
    event: DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();
    setDragging(false);
  }

  function handleDrop(
    event: DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();
    setDragging(false);

    if (loadingCheckout) {
      return;
    }

    const file =
      event.dataTransfer.files?.[0];

    if (file) {
      handleImage(file);
    }
  }

  function removeImage() {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(null);
    setPreview(null);
    setError(null);
  }

  function selectSupport(
    support: Support
  ) {
    setSelectedSupport(support);
    setError(null);

    if (support.id !== "poster") {
      setPosterOrientation(null);
    }
  }

  async function startCheckout() {
    if (loadingCheckout) {
      return;
    }

    if (!image) {
      setError(
        "Ajoutez une photo pour continuer."
      );
      return;
    }

    if (!selectedStyle) {
      setError(
        "Choisissez un style artistique."
      );
      return;
    }

    if (!selectedSupport) {
      setError(
        "Choisissez un support."
      );
      return;
    }

    const selectedFormat =
      getSelectedFormat();

    if (!selectedFormat) {
      setError(
        selectedSupport.id === "poster"
          ? "Choisissez l’orientation du poster."
          : "Le format sélectionné est invalide."
      );
      return;
    }

    const normalizedEmail =
      customerEmail.trim().toLowerCase();

    if (!normalizedEmail) {
      setError(
        "Saisissez votre adresse e-mail."
      );
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      setError(
        "Saisissez une adresse e-mail valide."
      );
      return;
    }

    setLoadingCheckout(true);
    setError(null);

    try {
      const formData = new FormData();

      formData.append(
        "image",
        image,
        image.name
      );

      formData.append(
        "style",
        selectedStyle.id
      );

      formData.append(
        "format",
        selectedFormat.format
      );

      formData.append(
        "size",
        selectedFormat.size
      );

      formData.append(
        "outputSize",
        selectedFormat.size
      );

      formData.append(
        "email",
        normalizedEmail
      );

      formData.append(
        "productId",
        "custom-ai-artwork"
      );

      formData.append(
        "productName",
        "Création Lumora personnalisée"
      );

      formData.append(
        "optionName",
        selectedFormat.optionName
      );

      formData.append(
        "support",
        selectedSupport.id
      );

      const response = await fetch(
        "/api/checkout",
        {
          method: "POST",
          body: formData,
        }
      );

      const data =
        await readJsonSafely(response);

      const checkoutUrl =
        data.checkoutUrl || data.url;

      if (
        !response.ok ||
        !data.success ||
        !checkoutUrl
      ) {
        throw new Error(
          data.error ||
            "Impossible de lancer le paiement sécurisé."
        );
      }

      window.location.assign(checkoutUrl);
    } catch (caughtError) {
      console.error(
        "Erreur de paiement :",
        caughtError
      );

      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Impossible de lancer le paiement sécurisé."
      );

      setLoadingCheckout(false);
    }
  }

  const selectedFormat =
    getSelectedFormat();

  const configurationComplete =
    Boolean(
      image &&
        selectedStyle &&
        selectedSupport &&
        selectedFormat &&
        customerEmail.trim()
    );

  const currentStep = !image
    ? 1
    : !selectedStyle
      ? 2
      : !selectedFormat
        ? 3
        : 4;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[800px] bg-[radial-gradient(circle_at_50%_0%,rgba(250,204,21,0.11),transparent_58%)]" />

      <div className="pointer-events-none absolute left-[-240px] top-[700px] h-[500px] w-[500px] rounded-full bg-yellow-400/[0.035] blur-[140px]" />
            <section className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-28 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-yellow-300"
          >
            Création personnalisée
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Transformez votre photo
            <span className="block bg-gradient-to-r from-yellow-100 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              en œuvre Lumora
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/60 sm:text-lg"
          >
            Importez votre photo, choisissez votre style et votre
            support, puis payez de façon sécurisée avant la création.
          </motion.p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-4 gap-2 sm:gap-4">
          {steps.map((step) => {
            const active =
              step.number ===
              String(currentStep).padStart(2, "0");

            const completed =
              Number(step.number) < currentStep;

            return (
              <div
                key={step.number}
                className="flex flex-col items-center"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border text-xs font-semibold transition ${
                    active
                      ? "border-yellow-300 bg-yellow-300 text-black"
                      : completed
                        ? "border-yellow-300/40 bg-yellow-300/10 text-yellow-200"
                        : "border-white/10 bg-white/[0.03] text-white/35"
                  }`}
                >
                  {completed ? "✓" : step.number}
                </div>

                <span
                  className={`mt-2 text-[10px] uppercase tracking-[0.18em] sm:text-xs ${
                    active
                      ? "text-yellow-200"
                      : completed
                        ? "text-white/55"
                        : "text-white/30"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl backdrop-blur-xl sm:p-7"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-yellow-300">
                    Étape 1
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    Ajoutez votre photo
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-white/50">
                    JPG, PNG ou WEBP, jusqu’à 15 Mo.
                  </p>
                </div>

                {image && (
                  <button
                    type="button"
                    onClick={removeImage}
                    disabled={loadingCheckout}
                    className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/60 transition hover:border-red-400/40 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Supprimer
                  </button>
                )}
              </div>

              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                disabled={loadingCheckout}
                className="hidden"
              />

              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (!loadingCheckout) {
                    inputRef.current?.click();
                  }
                }}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    event.preventDefault();

                    if (!loadingCheckout) {
                      inputRef.current?.click();
                    }
                  }
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative min-h-[340px] overflow-hidden rounded-2xl border border-dashed transition ${
                  dragging
                    ? "border-yellow-300 bg-yellow-300/[0.08]"
                    : preview
                      ? "border-white/10 bg-black/20"
                      : "border-white/15 bg-black/20 hover:border-yellow-300/50 hover:bg-yellow-300/[0.025]"
                } ${
                  loadingCheckout
                    ? "cursor-not-allowed opacity-70"
                    : "cursor-pointer"
                }`}
              >
                <AnimatePresence mode="wait">
                  {preview ? (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0"
                    >
                      <img
                        src={preview}
                        alt="Aperçu de la photo sélectionnée"
                        className="h-full w-full object-contain"
                      />

                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent px-5 pb-5 pt-16">
                        <p className="truncate text-sm font-medium">
                          {image?.name}
                        </p>

                        <p className="mt-1 text-xs text-white/50">
                          Cliquez pour changer de photo
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="upload"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex min-h-[340px] flex-col items-center justify-center px-6 text-center"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-yellow-300/20 bg-yellow-300/[0.08] text-3xl text-yellow-200">
                        +
                      </div>

                      <p className="mt-5 text-lg font-medium">
                        Déposez votre photo ici
                      </p>

                      <p className="mt-2 max-w-sm text-sm leading-6 text-white/45">
                        Ou cliquez pour choisir une image depuis votre
                        appareil.
                      </p>

                      <span className="mt-5 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-white/70">
                        Choisir une photo
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl backdrop-blur-xl sm:p-7"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-yellow-300">
                  Étape 2
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  Choisissez votre style
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/50">
                  Sélectionnez l’univers artistique de votre création.
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {artStyles.map((style) => {
                  const selected =
                    selectedStyle.id === style.id;

                  return (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => {
                        setSelectedStyle(style);
                        setError(null);
                      }}
                      disabled={loadingCheckout}
                      className={`group rounded-2xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-60 ${
                        selected
                          ? "border-yellow-300/70 bg-yellow-300/[0.08]"
                          : "border-white/10 bg-black/20 hover:border-white/25 hover:bg-white/[0.035]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3
                            className={`font-medium ${
                              selected
                                ? "text-yellow-100"
                                : "text-white"
                            }`}
                          >
                            {style.name}
                          </h3>

                          <p className="mt-2 text-sm leading-6 text-white/45">
                            {style.description}
                          </p>
                        </div>

                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] ${
                            selected
                              ? "bg-yellow-300 text-black"
                              : "bg-white/[0.06] text-white/40"
                          }`}
                        >
                          {style.accent}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl backdrop-blur-xl sm:p-7"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-yellow-300">
                  Étape 3
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  Choisissez le support
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/50">
                  Le format final sera optimisé selon votre sélection.
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {supports.map((support) => {
                  const selected =
                    selectedSupport?.id === support.id;

                  return (
                    <button
                      key={support.id}
                      type="button"
                      onClick={() =>
                        selectSupport(support)
                      }
                      disabled={loadingCheckout}
                      className={`rounded-2xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-60 ${
                        selected
                          ? "border-yellow-300/70 bg-yellow-300/[0.08]"
                          : "border-white/10 bg-black/20 hover:border-white/25"
                      }`}
                    >
                      <h3
                        className={`font-medium ${
                          selected
                            ? "text-yellow-100"
                            : "text-white"
                        }`}
                      >
                        {support.name}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-white/45">
                        {support.description}
                      </p>

                      {support.size && (
                        <p className="mt-4 text-xs text-white/30">
                          {support.size}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {selectedSupport?.id === "poster" && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0,
                      marginTop: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                      marginTop: 24,
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      marginTop: 0,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/10 pt-6">
                      <p className="text-sm font-medium text-white/70">
                        Orientation du poster
                      </p>

                      <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        {posterOrientations.map(
                          (orientation) => {
                            const selected =
                              posterOrientation?.id ===
                              orientation.id;

                            return (
                              <button
                                key={orientation.id}
                                type="button"
                                onClick={() => {
                                  setPosterOrientation(
                                    orientation
                                  );
                                  setError(null);
                                }}
                                disabled={loadingCheckout}
                                className={`rounded-2xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-60 ${
                                  selected
                                    ? "border-yellow-300/70 bg-yellow-300/[0.08]"
                                    : "border-white/10 bg-black/20 hover:border-white/25"
                                }`}
                              >
                                <h4
                                  className={
                                    selected
                                      ? "text-yellow-100"
                                      : "text-white"
                                  }
                                >
                                  {orientation.name}
                                </h4>

                                <p className="mt-2 text-xs leading-5 text-white/40">
                                  {
                                    orientation.description
                                  }
                                </p>

                                <p className="mt-3 text-[11px] text-white/25">
                                  {orientation.size}
                                </p>
                              </button>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
          </div>
                    <aside className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12 }}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-xl"
            >
              <div className="border-b border-white/10 p-5 sm:p-7">
                <p className="text-xs uppercase tracking-[0.24em] text-yellow-300">
                  Votre création
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  Récapitulatif
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/50">
                  Vérifiez votre sélection avant de passer au paiement.
                </p>
              </div>

              <div className="space-y-5 p-5 sm:p-7">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Aperçu de votre photo"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center px-6 text-center text-sm text-white/30">
                      Votre photo apparaîtra ici.
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
                    <span className="text-sm text-white/45">
                      Style
                    </span>

                    <span className="text-right text-sm font-medium text-white">
                      {selectedStyle.name}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
                    <span className="text-sm text-white/45">
                      Support
                    </span>

                    <span className="text-right text-sm font-medium text-white">
                      {selectedSupport?.name || "Non sélectionné"}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
                    <span className="text-sm text-white/45">
                      Format
                    </span>

                    <span className="text-right text-sm font-medium text-white">
                      {selectedFormat?.format || "Non sélectionné"}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
                    <span className="text-sm text-white/45">
                      Résolution
                    </span>

                    <span className="text-right text-sm font-medium text-white">
                      {selectedFormat?.size || "—"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-1">
                    <div>
                      <p className="text-sm text-white/45">
                        Prix total
                      </p>

                      <p className="mt-1 text-xs text-white/30">
                        Paiement sécurisé par Stripe
                      </p>
                    </div>

                    <span className="text-3xl font-semibold text-yellow-200">
                      12 €
                    </span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-5">
                  <label
                    htmlFor="customer-email"
                    className="text-sm font-medium text-white/80"
                  >
                    Adresse e-mail
                  </label>

                  <p className="mt-1 text-xs leading-5 text-white/40">
                    Elle sera associée à votre commande et utilisée pour
                    retrouver votre création.
                  </p>

                  <input
                    id="customer-email"
                    type="email"
                    value={customerEmail}
                    onChange={(event) => {
                      setCustomerEmail(event.target.value);
                      setError(null);
                    }}
                    autoComplete="email"
                    placeholder="votre@email.fr"
                    disabled={loadingCheckout}
                    className="mt-3 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-yellow-300/60 focus:ring-2 focus:ring-yellow-300/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                <AnimatePresence mode="wait">
                  {error && (
                    <motion.div
                      key={error}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      role="alert"
                      className="rounded-2xl border border-red-400/20 bg-red-400/[0.08] px-4 py-3 text-sm leading-6 text-red-200"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={startCheckout}
                  disabled={
                    loadingCheckout ||
                    !configurationComplete
                  }
                  className={`relative flex min-h-14 w-full items-center justify-center overflow-hidden rounded-2xl px-5 py-4 text-sm font-semibold transition ${
                    loadingCheckout ||
                    !configurationComplete
                      ? "cursor-not-allowed bg-white/10 text-white/30"
                      : "bg-gradient-to-r from-yellow-200 via-yellow-300 to-amber-500 text-black shadow-[0_12px_45px_rgba(250,204,21,0.22)] hover:scale-[1.01] hover:shadow-[0_16px_55px_rgba(250,204,21,0.3)] active:scale-[0.99]"
                  }`}
                >
                  {loadingCheckout ? (
                    <span className="flex items-center gap-3">
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                      Redirection vers le paiement…
                    </span>
                  ) : (
                    "Payer et créer mon œuvre — 12 €"
                  )}
                </button>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="rounded-xl border border-white/10 bg-black/20 px-2 py-3 text-center">
                    <p className="text-xs font-medium text-white/65">
                      Paiement
                    </p>
                    <p className="mt-1 text-[10px] text-white/30">
                      Sécurisé
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 px-2 py-3 text-center">
                    <p className="text-xs font-medium text-white/65">
                      Création
                    </p>
                    <p className="mt-1 text-[10px] text-white/30">
                      Après paiement
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 px-2 py-3 text-center">
                    <p className="text-xs font-medium text-white/65">
                      Livraison
                    </p>
                    <p className="mt-1 text-[10px] text-white/30">
                      Numérique
                    </p>
                  </div>
                </div>

                <p className="text-center text-[11px] leading-5 text-white/30">
                  En continuant, vous confirmez disposer des droits nécessaires
                  sur la photo importée.
                </p>
              </div>
            </motion.div>
          </aside>
        </div>
      </section>
    </main>
  );
}

      