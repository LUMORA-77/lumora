"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050505]">

      {/* Background */}

      <div className="absolute inset-0">

        <Image
          src="/images/hero.jpg"
          alt="Hero"
          fill
          priority
          className="object-cover scale-110 hero-bg"
        />

        <div className="absolute inset-0 bg-black/65" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-[#050505]" />

      </div>

      {/* Glow */}

      <div className="absolute left-1/2 top-44 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-yellow-400/10 blur-[220px]" />

      <Navbar />

      <div className="relative z-20 max-w-7xl mx-auto px-8 pt-44 pb-32">

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl"
        >

          <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/20 bg-yellow-400/10 backdrop-blur-xl px-6 py-3">

            <div className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />

            <span className="uppercase tracking-[0.35em] text-xs text-yellow-300">
              Premium AI Art
            </span>

          </div>

          <h1 className="mt-12 text-6xl md:text-8xl font-black leading-[0.9]">

            Des photos.

            <br />

            Devenues

            <span className="text-yellow-400">
              {" "}des œuvres d'art.
            </span>

          </h1>

          <p className="mt-10 max-w-3xl text-xl leading-9 text-gray-300">

            Transformez vos souvenirs en créations premium grâce
            à l'intelligence artificielle. Conçues pour iPhone,
            Android, Mac, PC et impressions haute qualité.

          </p>

          <div className="mt-14 flex flex-wrap gap-5">

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >

              <Link
                href="/creer"
                className="rounded-full bg-yellow-400 text-black px-10 py-5 text-lg font-bold shadow-[0_0_50px_rgba(250,204,21,.25)]"
              >
                Créer mon œuvre
              </Link>

            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >

              <Link
                href="/boutique"
                className="rounded-full border border-white/15 bg-white/5 backdrop-blur-xl px-10 py-5 text-lg hover:bg-white hover:text-black transition"
              >
                Voir des créations
              </Link>

            </motion.div>

          </div>
                    {/* Premium stats */}

          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">

            <motion.div
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
            >
              <p className="text-4xl font-black text-yellow-400">
                2500+
              </p>

              <p className="mt-3 text-gray-400">
                Créations
              </p>

            </motion.div>

            <motion.div
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
            >
              <p className="text-4xl font-black text-yellow-400">
                4K
              </p>

              <p className="mt-3 text-gray-400">
                Qualité HD
              </p>

            </motion.div>

            <motion.div
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
            >
              <p className="text-4xl font-black text-yellow-400">
                5★
              </p>

              <p className="mt-3 text-gray-400">
                Satisfaction
              </p>

            </motion.div>

            <motion.div
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
            >
              <p className="text-4xl font-black text-yellow-400">
                IA
              </p>

              <p className="mt-3 text-gray-400">
                Génération rapide
              </p>

            </motion.div>

          </div>

          {/* Bottom feature cards */}

          <div className="mt-16 grid gap-6 md:grid-cols-3">

            <motion.div
              whileHover={{
                y: -10,
                scale: 1.02
              }}
              className="rounded-[30px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl p-8"
            >

              <h3 className="text-2xl font-bold">
                Qualité Premium
              </h3>

              <p className="mt-4 text-gray-400 leading-8">
                Chaque création est optimisée pour les écrans Retina,
                les smartphones, les ordinateurs et les impressions.
              </p>

            </motion.div>

            <motion.div
              whileHover={{
                y: -10,
                scale: 1.02
              }}
              className="rounded-[30px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl p-8"
            >

              <h3 className="text-2xl font-bold">
                Génération IA
              </h3>

              <p className="mt-4 text-gray-400 leading-8">
                Quelques secondes suffisent pour transformer une simple
                photo en véritable œuvre d'art.
              </p>

            </motion.div>

            <motion.div
              whileHover={{
                y: -10,
                scale: 1.02
              }}
              className="rounded-[30px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl p-8"
            >

              <h3 className="text-2xl font-bold">
                Téléchargement HD
              </h3>

              <p className="mt-4 text-gray-400 leading-8">
                Recevez instantanément votre création dans la meilleure
                qualité disponible pour votre appareil.
              </p>

            </motion.div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}