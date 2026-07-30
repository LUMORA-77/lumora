"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useState } from "react";
import { wallpapers } from "@/data/wallpapers";
import { useCart } from "@/context/CartContext";

const features = [
  {
    title: "Qualité Ultra HD",
    text: "Une image nette et détaillée, pensée pour sublimer tous vos écrans.",
  },
  {
    title: "Téléchargement numérique",
    text: "Aucun produit physique. Votre création est disponible en format numérique.",
  },
  {
    title: "Compatible partout",
    text: "Utilisable sur iPhone, Android, Mac, PC et tablette.",
  },
];

export default function Produit() {
  const params = useParams();
  const { addToCart } = useCart();

  const [added, setAdded] = useState(false);

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const wallpaper = wallpapers.find(
    (item) => item.id === Number(id)
  );

  if (!wallpaper) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] px-5 text-white">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-yellow-400">
            Erreur 404
          </p>

          <h1 className="mt-5 text-4xl font-black sm:text-6xl">
            Produit introuvable.
          </h1>

          <p className="mx-auto mt-5 max-w-md leading-7 text-white/45">
            Cette création n’existe pas ou n’est plus disponible dans la
            boutique.
          </p>

          <Link
            href="/boutique"
            className="mt-8 inline-flex bg-yellow-400 px-7 py-4 font-black text-black transition hover:scale-[1.03]"
          >
            Retour à la boutique
          </Link>
        </div>
      </main>
    );
  }

  const relatedWallpapers = wallpapers
    .filter((item) => item.id !== wallpaper.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart({
      id: wallpaper.id,
      title: wallpaper.title,
      price: wallpaper.price,
      image: wallpaper.image,
    });

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 2200);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* PRODUCT HERO */}
      <section className="px-5 pb-24 pt-32 sm:px-8 sm:pb-32 sm:pt-36">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/boutique"
              className="group inline-flex items-center gap-3 text-sm text-white/45 transition hover:text-white"
            >
              <span className="transition-transform group-hover:-translate-x-1">
                ←
              </span>
              Retour à la boutique
            </Link>
          </motion.div>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 xl:gap-24">
            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group relative overflow-hidden bg-[#0d0d0d]"
            >
              <div className="relative min-h-[520px] sm:min-h-[720px] lg:min-h-[820px]">
                <Image
                  src={wallpaper.image}
                  alt={wallpaper.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition duration-[1400ms] ease-out group-hover:scale-[1.035]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                <div className="absolute left-4 top-4 bg-black/60 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] backdrop-blur-xl sm:left-6 sm:top-6">
                  Création Lumora
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between border border-white/10 bg-black/55 px-4 py-3 backdrop-blur-xl sm:bottom-6 sm:left-6 sm:right-6">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                    Aperçu haute qualité
                  </span>

                  <span className="text-xs font-bold text-yellow-400">
                    Ultra HD
                  </span>
                </div>
              </div>
            </motion.div>

            {/* PRODUCT INFORMATIONS */}
            <motion.div
              initial={{ opacity: 0, x: 45 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.1 }}
              className="flex flex-col justify-center lg:sticky lg:top-32 lg:self-start"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-yellow-400 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-black">
                  {wallpaper.category}
                </span>

                <span className="border border-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-white/45">
                  Produit numérique
                </span>
              </div>

              <h1 className="mt-7 text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                {wallpaper.title}
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-white/50 sm:text-lg">
                {wallpaper.description} Une création numérique premium conçue
                pour donner une identité forte à votre écran.
              </p>

              <div className="mt-9 flex items-end justify-between border-y border-white/10 py-7">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/35">
                    Prix
                  </p>

                  <p className="mt-2 text-5xl font-black text-yellow-400">
                    {wallpaper.price} €
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold">Paiement sécurisé</p>
                  <p className="mt-1 text-xs text-white/35">
                    Téléchargement numérique
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {["iPhone", "Android", "Mac", "PC"].map((device) => (
                  <div
                    key={device}
                    className="border border-white/10 bg-white/[0.025] px-4 py-4"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                      Compatible
                    </p>

                    <p className="mt-2 font-bold">{device}</p>
                  </div>
                ))}
              </div>

              <motion.button
                type="button"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className={`mt-8 flex w-full items-center justify-between px-7 py-5 text-left font-black transition ${
                  added
                    ? "bg-white text-black"
                    : "bg-yellow-400 text-black hover:bg-yellow-300"
                }`}
              >
                <span>
                  {added ? "Ajouté au panier" : "Ajouter au panier"}
                </span>

                <span className="text-xl">
                  {added ? "✓" : "→"}
                </span>
              </motion.button>

              <Link
                href="/panier"
                className="mt-3 flex w-full items-center justify-center border border-white/15 px-7 py-5 font-bold text-white/70 transition hover:bg-white hover:text-black"
              >
                Voir mon panier
              </Link>

              <div className="mt-7 flex items-center justify-center gap-3 text-center text-xs text-white/35">
                <span>✓ Paiement sécurisé</span>
                <span>•</span>
                <span>✓ Accès numérique</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRODUCT FEATURES */}
      <section className="border-y border-white/10 bg-[#090909] px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-yellow-400">
                Dans votre achat
              </p>

              <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] sm:text-6xl">
                Tout ce qu’il faut pour sublimer votre écran.
              </h2>
            </div>

            <div className="border-t border-white/10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="grid gap-4 border-b border-white/10 py-8 sm:grid-cols-[70px_1fr_1fr] sm:items-center"
                >
                  <span className="text-sm font-bold text-yellow-400">
                    0{index + 1}
                  </span>

                  <h3 className="text-xl font-black sm:text-2xl">
                    {feature.title}
                  </h3>

                  <p className="leading-7 text-white/45">
                    {feature.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-yellow-400">
                Vous aimerez aussi
              </p>

              <h2 className="mt-4 text-4xl font-black sm:text-6xl">
                Créations similaires
              </h2>
            </div>

            <Link
              href="/boutique"
              className="hidden border-b border-white/30 pb-1 text-sm text-white/50 transition hover:border-yellow-400 hover:text-yellow-400 sm:block"
            >
              Voir toute la boutique
            </Link>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {relatedWallpapers.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.08 }}
                className="group overflow-hidden bg-[#0b0b0b]"
              >
                <Link href={`/produit/${item.id}`}>
                  <div className="relative h-[460px] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-1000 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-yellow-400">
                        {item.category}
                      </p>

                      <div className="mt-2 flex items-end justify-between gap-4">
                        <h3 className="text-2xl font-black">
                          {item.title}
                        </h3>

                        <span className="text-2xl font-black text-yellow-400">
                          {item.price} €
                        </span>
                      </div>

                      <div className="mt-5 h-px origin-left scale-x-0 bg-yellow-400 transition duration-500 group-hover:scale-x-100" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          <Link
            href="/boutique"
            className="mt-7 flex w-full items-center justify-center border border-white/15 py-4 font-bold transition hover:bg-white hover:text-black sm:hidden"
          >
            Voir toute la boutique
          </Link>
        </div>
      </section>

      {/* CUSTOM CTA */}
      <section className="border-t border-white/10 bg-[#090909] px-5 py-24 sm:px-8 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-yellow-400">
            Vous voulez quelque chose d’unique ?
          </p>

          <h2 className="mt-6 text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-7xl">
            Transformez votre propre photo.
          </h2>

          <p className="mx-auto mt-7 max-w-xl leading-8 text-white/45">
            Envoyez-nous votre image et obtenez une création personnalisée
            conçue spécialement pour vous.
          </p>

          <Link
            href="/creer"
            className="mt-9 inline-flex bg-yellow-400 px-9 py-5 font-black text-black transition hover:scale-[1.03]"
          >
            Créer mon œuvre — 12 €
          </Link>
        </motion.div>
      </section>
    </main>
  );
}