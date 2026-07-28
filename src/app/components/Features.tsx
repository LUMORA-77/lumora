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
    text: "Une intelligence artificielle transforme vos photos en véritables œuvres d'art avec un rendu réaliste et haut de gamme.",
  },
  {
    number: "03",
    title: "Livraison instantanée",
    text: "Votre création est générée en quelques secondes et disponible immédiatement en téléchargement.",
  },
];

export default function Features() {
  return (
    <section className="relative overflow-hidden bg-[#080808] py-36">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#d4af3715,transparent_55%)]" />

      <div className="relative max-w-7xl mx-auto px-8">

        <div className="text-center">

          <span className="inline-flex rounded-full border border-yellow-400/20 bg-yellow-400/10 px-6 py-2 uppercase tracking-[0.35em] text-xs text-yellow-300">
            Pourquoi Lumora
          </span>

          <h2 className="mt-8 text-6xl font-black">
            Une expérience premium
          </h2>

          <p className="mt-8 max-w-3xl mx-auto text-xl leading-9 text-gray-400">
            Pensé pour offrir une qualité professionnelle,
            une génération rapide et une expérience haut de gamme.
          </p>

        </div>

        <div className="mt-24 grid gap-8 lg:grid-cols-3">

          {features.map((feature, index) => (

            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="rounded-[34px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-10 backdrop-blur-xl"
            >

              <p className="text-6xl font-black text-yellow-400/20">
                {feature.number}
              </p>

              <h3 className="mt-8 text-3xl font-black">
                {feature.title}
              </h3>

              <p className="mt-6 leading-8 text-gray-400">
                {feature.text}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}