"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Showcase() {
  return (
    <section className="relative overflow-hidden bg-black py-40">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#facc1515,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-8">

        <div className="text-center mb-24">

          <span className="inline-flex rounded-full border border-yellow-400/20 bg-yellow-400/10 px-6 py-2 uppercase tracking-[0.35em] text-xs text-yellow-300">
            Avant / Après
          </span>

          <h2 className="mt-8 text-6xl md:text-7xl font-black">
            Regardez la différence
          </h2>

          <p className="mt-8 max-w-3xl mx-auto text-xl leading-9 text-gray-400">
            Une simple photo devient une véritable œuvre d'art
            grâce à l'intelligence artificielle de Lumora.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl"
          >

            <div className="relative h-[650px]">

              <Image
                src="/images/before.jpg"
                alt="Avant"
                fill
                className="object-cover"
              />

            </div>

            <div className="p-8">

              <span className="text-gray-400 uppercase tracking-[0.3em]">
                Avant
              </span>

              <h3 className="mt-3 text-3xl font-black">
                Photo originale
              </h3>

            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-[36px] border border-yellow-400/20 bg-gradient-to-b from-yellow-400/10 to-white/5 backdrop-blur-xl"
          >

            <div className="relative h-[650px]">

              <Image
                src="/images/after.jpg"
                alt="Après"
                fill
                className="object-cover"
              />

            </div>

            <div className="p-8">

              <span className="text-yellow-400 uppercase tracking-[0.3em]">
                Après
              </span>

              <h3 className="mt-3 text-3xl font-black">
                Création Lumora
              </h3>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}