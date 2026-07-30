"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { wallpapers } from "@/data/wallpapers";

const benefits = [
  {
    number: "01",
    title: "Qualité premium",
    text: "Des créations nettes et détaillées, adaptées aux smartphones, ordinateurs et impressions.",
  },
  {
    number: "02",
    title: "Création unique",
    text: "Votre photo est transformée en une œuvre personnelle que vous ne retrouverez nulle part ailleurs.",
  },
  {
    number: "03",
    title: "Livraison rapide",
    text: "Recevez votre création numérique directement après la génération et la validation.",
  },
];

const reviews = [
  {
    text: "Le résultat est encore plus beau que ce que j’imaginais. Mon fond d’écran est incroyable.",
    author: "Thomas",
  },
  {
    text: "La transformation de ma voiture en peinture est vraiment propre. Très bonne qualité.",
    author: "Lucas",
  },
  {
    text: "Le site est simple, rapide et la création rend super bien sur mon téléphone.",
    author: "Emma",
  },
  {
    text: "J’ai choisi le style peinture à l’huile et le rendu est vraiment réussi.",
    author: "Chloé",
  },
  {
    text: "La création est superbe sur mon écran d’ordinateur. Le résultat fait très premium.",
    author: "Nathan",
  },
  {
    text: "J’adore le résultat final. L’image conserve bien les détails importants de ma photo.",
    author: "Inès",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#050505] text-white">
      {/* HERO */}
      <section className="relative min-h-[100svh]">
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.12 }}
            animate={{ scale: 1.03 }}
            transition={{
              duration: 2.2,
              ease: "easeOut",
            }}
            className="absolute inset-0"
          >
            <Image
              src="/images/hero.jpg"
              alt="Création artistique Lumora"
              fill
              priority
              className="object-cover object-center"
            />
          </motion.div>

          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-black/10" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/30" />
        </div>

        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl items-end px-5 pb-16 pt-32 sm:px-8 sm:pb-24 lg:items-center lg:pb-0">
          <motion.div
            initial={{
              opacity: 0,
              y: 60,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.15,
            }}
            className="max-w-4xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-yellow-400" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-yellow-300 sm:text-xs">
                Art numérique premium
              </span>
            </div>

            <h1 className="text-[13vw] font-black uppercase leading-[0.82] tracking-[-0.07em] sm:text-7xl lg:text-[106px]">
              Vos photos
              <br />
              deviennent
              <br />

              <span className="text-yellow-400">
                iconiques.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/65 sm:mt-9 sm:text-lg sm:leading-8">
              Transformez vos souvenirs, vos voitures et vos plus belles
              photos en œuvres numériques premium conçues par intelligence
              artificielle.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <motion.div
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                <Link
                  href="/creer"
                  className="group flex items-center justify-between gap-8 bg-yellow-400 px-7 py-4 font-bold text-black transition sm:px-8"
                >
                  Créer mon œuvre

                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                <Link
                  href="/boutique"
                  className="group flex items-center justify-between gap-8 border border-white/20 bg-black/20 px-7 py-4 font-semibold backdrop-blur-md transition hover:bg-white hover:text-black sm:px-8"
                >
                  Explorer la boutique

                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </motion.div>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.2em] text-white/45">
              <span>Qualité premium</span>
              <span>Création unique</span>
              <span>Téléchargement numérique</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute bottom-8 right-8 hidden text-xs uppercase tracking-[0.3em] text-white/40 lg:block"
        >
          Découvrir ↓
        </motion.div>
      </section>

      {/* BANDEAU DÉFILANT */}
      <section className="overflow-hidden border-y border-white/10 bg-yellow-400 py-4 text-black">
        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex w-max whitespace-nowrap"
        >
          {[...Array(2)].map((_, groupIndex) => (
            <div
              key={groupIndex}
              className="flex items-center gap-10 pr-10 text-sm font-black uppercase tracking-[0.24em]"
            >
              <span>Créations personnalisées</span>
              <span>✦</span>
              <span>Qualité premium</span>
              <span>✦</span>
              <span>Art généré par IA</span>
              <span>✦</span>
              <span>Téléphone, ordinateur et poster</span>
              <span>✦</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* INTRODUCTION */}
      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-yellow-400">
              L’expérience Lumora
            </p>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <h2 className="max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Plus qu’un fond d’écran.

              <span className="text-white/30">
                {" "}
                Une œuvre pensée pour vous.
              </span>
            </h2>
          </motion.div>
        </div>
      </section>

      {/* CRÉATIONS POPULAIRES */}
      <section className="px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-400">
                Sélection
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-5xl">
                Créations populaires
              </h2>
            </div>

            <Link
              href="/boutique"
              className="hidden border-b border-white/40 pb-1 text-sm text-white/70 transition hover:border-yellow-400 hover:text-yellow-400 sm:block"
            >
              Voir toute la boutique
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
            {wallpapers.slice(0, 4).map((wallpaper, index) => {
              const layout =
                index === 0 || index === 3
                  ? "lg:col-span-7"
                  : "lg:col-span-5";

              return (
                <motion.article
                  key={wallpaper.id}
                  initial={{
                    opacity: 0,
                    y: 45,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.08,
                  }}
                  className={`group relative overflow-hidden bg-[#101010] ${layout}`}
                >
                  <Link href={`/produit/${wallpaper.id}`}>
                    <div className="relative h-[420px] sm:h-[520px] lg:h-[620px]">
                      <Image
                        src={wallpaper.image}
                        alt={wallpaper.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 60vw"
                        className="object-cover transition duration-1000 ease-out group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/5 to-transparent" />

                      <div className="absolute left-5 top-5 flex items-center gap-2 bg-black/50 px-3 py-2 text-[10px] uppercase tracking-[0.2em] backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />

                        {wallpaper.category}
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                        <div className="flex items-end justify-between gap-4">
                          <div>
                            <h3 className="text-2xl font-black sm:text-3xl">
                              {wallpaper.title}
                            </h3>

                            <p className="mt-2 text-sm text-white/55">
                              Wallpaper numérique premium
                            </p>
                          </div>

                          <span className="text-3xl font-black text-yellow-400">
                            {wallpaper.price} €
                          </span>
                        </div>

                        <div className="mt-5 h-px w-full origin-left scale-x-0 bg-yellow-400 transition duration-500 group-hover:scale-x-100" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>

          <Link
            href="/boutique"
            className="mt-7 flex w-full items-center justify-center border border-white/15 py-4 font-semibold transition hover:bg-white hover:text-black sm:hidden"
          >
            Voir toute la boutique
          </Link>
        </div>
      </section>

      {/* AVANTAGES */}
      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-yellow-400">
              Pourquoi Lumora
            </p>

            <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] sm:text-6xl">
              Créé pour impressionner.
            </h2>
          </div>

          <div className="mt-14 border-t border-white/10">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.number}
                initial={{
                  opacity: 0,
                  x: -30,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                className="group grid gap-5 border-b border-white/10 py-8 transition hover:bg-white/[0.025] sm:grid-cols-[100px_1fr_1fr] sm:items-center sm:px-5 sm:py-10"
              >
                <span className="text-sm font-bold text-yellow-400">
                  {benefit.number}
                </span>

                <h3 className="text-2xl font-black sm:text-3xl">
                  {benefit.title}
                </h3>

                <p className="max-w-xl leading-7 text-white/45">
                  {benefit.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AVIS DÉFILANTS */}
      <section className="border-y border-white/10 bg-[#090909] py-24 sm:py-32">
        <div className="px-5 text-center sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-yellow-400">
            Avis clients
          </p>

          <h2 className="mt-5 text-4xl font-black sm:text-6xl">
            Ils ont choisi Lumora.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/45">
            Découvrez les retours de clients qui ont transformé leurs photos
            avec Lumora.
          </p>
        </div>

        <div className="relative mt-14 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#090909] to-transparent sm:w-32" />

          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#090909] to-transparent sm:w-32" />

          <motion.div
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 38,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex w-max gap-4 px-2"
          >
            {[...reviews, ...reviews].map((review, index) => (
              <article
                key={`${review.author}-${index}`}
                className="w-[310px] shrink-0 border border-white/10 bg-white/[0.025] p-7 sm:w-[390px] sm:p-9"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-yellow-400">
                    ★★★★★
                  </p>

                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25">
                    Avis vérifié
                  </span>
                </div>

                <p className="mt-7 min-h-[128px] text-lg leading-8 text-white/75">
                  “{review.text}”
                </p>

                <div className="mt-9 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 font-black text-black">
                    {review.author.charAt(0)}
                  </div>

                  <div>
                    <p className="font-bold">
                      {review.author}
                    </p>

                    <p className="text-xs text-white/35">
                      Client Lumora
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* APPEL À L’ACTION FINAL */}
      <section className="relative px-5 py-28 sm:px-8 sm:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.09),transparent_45%)]" />

        <motion.div
          initial={{
            opacity: 0,
            y: 45,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="relative mx-auto max-w-5xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-yellow-400">
            Votre œuvre vous attend
          </p>

          <h2 className="mt-6 text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-7xl lg:text-8xl">
            Rendez votre écran

            <span className="text-yellow-400">
              {" "}
              inoubliable.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-xl leading-8 text-white/50">
            Découvrez nos créations ou transformez directement votre propre
            photo en œuvre numérique.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/creer"
              className="bg-yellow-400 px-9 py-5 font-black text-black transition hover:scale-[1.03]"
            >
              Créer mon œuvre — 12 €
            </Link>

            <Link
              href="/boutique"
              className="border border-white/20 px-9 py-5 font-bold transition hover:bg-white hover:text-black"
            >
              Explorer la boutique
            </Link>
          </div>
        </motion.div>
      </section>

      {/* PIED DE PAGE */}
      <footer className="border-t border-white/10 px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="text-2xl font-black tracking-[-0.05em]"
          >
            LUMORA

            <span className="text-yellow-400">
              .
            </span>
          </Link>

          <div className="flex flex-wrap gap-6 text-sm text-white/45">
            <Link
              href="/boutique"
              className="transition hover:text-white"
            >
              Boutique
            </Link>

            <Link
              href="/creer"
              className="transition hover:text-white"
            >
              Créer
            </Link>

            <Link
              href="/compte"
              className="transition hover:text-white"
            >
              Mon compte
            </Link>

            <Link
              href="/panier"
              className="transition hover:text-white"
            >
              Panier
            </Link>
          </div>

          <p className="text-xs text-white/30">
            © 2026 Lumora. Tous droits réservés.
          </p>
        </div>
      </footer>
    </main>
  );
}