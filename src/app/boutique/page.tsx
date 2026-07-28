"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { wallpapers } from "@/data/wallpapers";
import Navbar from "@/app/components/Navbar";

export default function Boutique() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#facc1515,transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-8 py-24">

        {/* Hero */}

        <div className="text-center">

          <span className="inline-flex rounded-full border border-yellow-400/20 bg-yellow-400/10 px-6 py-2 text-xs uppercase tracking-[0.35em] text-yellow-300">
            Collection Premium
          </span>

          <h1 className="mt-8 text-6xl md:text-7xl font-black">
            Boutique
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-gray-400">
            Découvrez notre collection de wallpapers premium créés avec
            l'intelligence artificielle.
          </p>

        </div>

        {/* Catégories */}

        <div className="mt-16 flex flex-wrap justify-center gap-4">

          {[
            "Tous",
            "Automobile",
            "Supercar",
            "Ville",
            "Gaming",
            "Anime",
            "Cinéma",
            "Nature",
          ].map((cat) => (

            <button
              key={cat}
              className="rounded-full border border-white/10 bg-white/5 px-7 py-3 transition hover:bg-yellow-400 hover:text-black"
            >
              {cat}
            </button>

          ))}

        </div>

        {/* Wallpapers */}

        <div className="mt-20 grid gap-10 md:grid-cols-2 xl:grid-cols-3">

          {wallpapers.map((wallpaper, index) => (

            <motion.div

              key={wallpaper.id}

              initial={{ opacity: 0, y: 60 }}

              whileInView={{ opacity: 1, y: 0 }}

              viewport={{ once: true }}

              transition={{
                duration: .6,
                delay: index * .08,
              }}

              whileHover={{
                y: -10,
              }}

              className="group overflow-hidden rounded-[34px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl"

            >

              <div className="relative h-[470px] overflow-hidden">

                <Image
                  src={wallpaper.image}
                  alt={wallpaper.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                <div className="absolute left-6 top-6 rounded-full bg-yellow-400 px-5 py-2 text-xs font-bold tracking-[0.25em] text-black">

                  {wallpaper.category}

                </div>

                <button className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-xl backdrop-blur-xl transition hover:scale-110">
                  ♡
                </button>

              </div>

              <div className="p-8">

                <h2 className="text-3xl font-black">

                  {wallpaper.title}

                </h2>

                <p className="mt-4 leading-7 text-gray-400">

                  {wallpaper.description}

                </p>

                <div className="mt-10 flex items-center justify-between">

                  <div>

                    <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                      Prix
                    </p>

                    <p className="text-5xl font-black text-yellow-400">
                      {wallpaper.price}€
                    </p>

                  </div>

                  <Link
                    href={`/produit/${wallpaper.id}`}
                    className="rounded-full bg-yellow-400 px-8 py-4 text-lg font-black text-black transition hover:scale-[1.03]"
                  >
                    Acheter
                  </Link>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </main>
  );
}