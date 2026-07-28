"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    name: "Lucas M.",
    role: "Client Premium",
    text: "Le résultat est incroyable. J'ai transformé une vieille photo de ma Porsche en un wallpaper digne d'une affiche de cinéma.",
    rating: "★★★★★",
  },
  {
    name: "Emma R.",
    role: "Créatrice",
    text: "Qualité exceptionnelle. Je l'ai imprimé en grand format et le rendu est bluffant.",
    rating: "★★★★★",
  },
  {
    name: "Nathan D.",
    role: "Photographe",
    text: "Franchement je ne pensais pas que l'IA pouvait produire un résultat aussi propre. Très premium.",
    rating: "★★★★★",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#060606] py-36">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#facc1510,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-8">

        <div className="text-center">

          <span className="inline-flex rounded-full border border-yellow-400/20 bg-yellow-400/10 px-6 py-2 uppercase tracking-[0.35em] text-xs text-yellow-300">
            Avis clients
          </span>

          <h2 className="mt-8 text-6xl font-black">
            Ils adorent Lumora
          </h2>

          <p className="mt-8 max-w-3xl mx-auto text-xl leading-9 text-gray-400">
            Des centaines de créations réalisées avec une qualité
            exceptionnelle.
          </p>

        </div>

        <div className="mt-24 grid gap-8 lg:grid-cols-3">

          {reviews.map((review, index) => (

            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="rounded-[34px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-10 backdrop-blur-xl"
            >

              <p className="text-2xl text-yellow-400">
                {review.rating}
              </p>

              <p className="mt-8 leading-8 text-gray-300">
                "{review.text}"
              </p>

              <div className="mt-10">

                <h3 className="text-xl font-bold">
                  {review.name}
                </h3>

                <p className="text-gray-500">
                  {review.role}
                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}