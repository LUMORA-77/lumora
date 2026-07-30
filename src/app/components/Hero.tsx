"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050505]">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Création artistique Lumora"
          fill
          priority
          className="object-cover object-center scale-105 sm:scale-110 hero-bg"
        />

        <div className="absolute inset-0 bg-black/70 sm:bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-[#050505]" />
      </div>

      {/* Glow */}
      <div className="absolute left-1/2 top-32 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-yellow-400/10 blur-[150px] sm:top-44 sm:h-[900px] sm:w-[900px] sm:blur-[220px]" />

      <div className="relative z-20 mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-36 lg:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 backdrop-blur-xl sm:px-6 sm:py-3">
            <div className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />

            <span className="text-[10px] uppercase tracking-[0.24em] text-yellow-300 sm:text-xs sm:tracking-[0.35em]">
              Premium AI Art
            </span>
          </div>

          <h1 className="mt-8 max-w-4xl text-4xl font-black leading-[0.95] sm:mt-12 sm:text-6xl md:text-7xl lg:text-8xl">
            Des photos.
            <br />
            Devenues
            <span className="text-yellow-400">
              {" "}
              des œuvres d&apos;art.
            </span>
          </h1>

          <p className="mt-7 max-w-3xl text-base leading-7 text-gray-300 sm:mt-10 sm:text-lg sm:leading-8 lg:text-xl lg:leading-9">
            Transformez vos souvenirs en créations premium grâce à
            l&apos;intelligence artificielle. Conçues pour iPhone, Android,
            Mac, PC et impressions haute qualité.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:mt-14 sm:flex-row sm:flex-wrap sm:gap-5">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/creer"
                className="flex w-full items-center justify-center rounded-full bg-yellow-400 px-7 py-4 text-base font-bold text-black shadow-[0_0_50px_rgba(250,204,21,.25)] sm:w-auto sm:px-10 sm:py-5 sm:text-lg"
              >
                Créer mon œuvre
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/boutique"
                className="flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-4 text-base backdrop-blur-xl transition hover:bg-white hover:text-black sm:w-auto sm:px-10 sm:py-5 sm:text-lg"
              >
                Voir des créations
              </Link>
            </motion.div>
          </div>

          {/* Premium stats */}
          <div className="mt-14 grid grid-cols-2 gap-3 sm:mt-24 sm:gap-6 md:grid-cols-4">
            {[
              ["2500+", "Créations"],
              ["4K", "Qualité HD"],
              ["5★", "Satisfaction"],
              ["IA", "Génération rapide"],
            ].map(([value, label]) => (
              <motion.div
                key={label}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:rounded-3xl sm:p-6"
              >
                <p className="text-2xl font-black text-yellow-400 sm:text-4xl">
                  {value}
                </p>

                <p className="mt-2 text-sm text-gray-400 sm:mt-3 sm:text-base">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom feature cards */}
          <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-6 md:grid-cols-3">
            {[
              {
                title: "Qualité Premium",
                text: "Chaque création est optimisée pour les écrans Retina, les smartphones, les ordinateurs et les impressions.",
              },
              {
                title: "Génération IA",
                text: "Quelques secondes suffisent pour transformer une simple photo en véritable œuvre d'art.",
              },
              {
                title: "Téléchargement HD",
                text: "Recevez instantanément votre création dans la meilleure qualité disponible pour votre appareil.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -8, scale: 1.01 }}
                className="rounded-[24px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-xl sm:rounded-[30px] sm:p-8"
              >
                <h3 className="text-xl font-bold sm:text-2xl">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-400 sm:mt-4 sm:text-base sm:leading-8">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}