"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "./navbar";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden bg-black">

      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero.jpg"
          alt="Hero"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/65"></div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black"></div>

      <Navbar />

      <div className="relative z-10 flex h-full items-center justify-center">

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-5xl px-6"
        >

          <p className="uppercase tracking-[0.6em] text-yellow-400 mb-6">
            PREMIUM AI WALLPAPERS
          </p>

          <h1 className="text-6xl md:text-8xl font-black leading-tight">
            Donnez une
            <span className="text-yellow-400"> nouvelle vie </span>
            à vos photos.
          </h1>

          <p className="text-gray-300 text-xl mt-10 max-w-3xl mx-auto leading-9">
            Créez des wallpapers uniques grâce à l'intelligence artificielle.
            Une qualité exceptionnelle pour Mac, PC, iPhone et Android.
          </p>

          <div className="flex justify-center gap-6 mt-14">

            <motion.div whileHover={{ scale: 1.08 }}>
              <Link
                href="/creer"
                className="bg-yellow-400 text-black px-10 py-5 rounded-full font-bold"
              >
                Créer mon wallpaper
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.08 }}>
              <Link
                href="/boutique"
                className="border border-white px-10 py-5 rounded-full hover:bg-white hover:text-black transition"
              >
                Explorer la boutique
              </Link>
            </motion.div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}