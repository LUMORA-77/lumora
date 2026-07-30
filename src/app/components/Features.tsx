"use client";

import { motion } from "framer-motion";

const features = [
  {
    number: "01",
    title: "Qualité Ultra HD",
    text: "Chaque création est optimisée pour iPhone, Android, Mac, PC et impression premium avec une netteté exceptionnelle.",
  },
  {
    number: "02",
    title: "IA de dernière génération",
    text: "Une intelligence artificielle transforme vos photos en véritables œuvres d’art avec un rendu réaliste et haut de gamme.",
  },
  {
    number: "03",
    title: "Livraison instantanée",
    text: "Votre création est générée en quelques secondes et disponible immédiatement en téléchargement.",
  },
];

export default function Features() {
  return (
    <section className="relative overflow-hidden bg-[#080808] py-20 sm:py-28 lg:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#d4af3715,transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-yellow-300 sm:px-6 sm:text-xs sm:tracking-[0.35em]">
            Pourquoi Lumora
          </span>

          <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-tight sm:mt-8 sm:text-5xl md:text-6xl">
            Une expérience premium
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-gray-400 sm:mt-8 sm:text-lg sm:leading-8 lg:text-xl lg:leading-9">
            Pensé pour offrir une qualité professionnelle, une génération
            rapide et une expérience haut de gamme.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:mt-20 sm:gap-6 lg:mt-24 lg:grid-cols-3 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -8,
                scale: 1.01,
              }}
              className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-xl sm:rounded-[34px] sm:p-8 lg:p-10"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-yellow-400/10 blur-3xl transition duration-500 group-hover:bg-yellow-400/20" />

              <p className="relative text-4xl font-black text-yellow-400/20 sm:text-5xl lg:text-6xl">
                {feature.number}
              </p>

              <h3 className="relative mt-6 text-2xl font-black sm:mt-8 sm:text-3xl">
                {feature.title}
              </h3>

              <p className="relative mt-4 text-sm leading-7 text-gray-400 sm:mt-6 sm:text-base sm:leading-8">
                {feature.text}
              </p>

              <div className="relative mt-7 h-px w-full bg-gradient-to-r from-yellow-400/40 to-transparent sm:mt-8" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}