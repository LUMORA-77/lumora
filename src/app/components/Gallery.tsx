"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { wallpapers } from "@/data/wallpapers";

export default function Gallery() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-20 sm:py-28 lg:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#facc1515,transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 text-center sm:mb-20 lg:mb-24">
          <span className="inline-block rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-yellow-300 sm:px-6 sm:text-xs sm:tracking-[0.35em]">
            Collection Premium
          </span>

          <h2 className="mt-6 text-4xl font-black sm:mt-8 sm:text-5xl md:text-6xl lg:text-7xl">
            Nos créations
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:mt-8 sm:text-lg sm:leading-8 lg:text-xl lg:leading-9">
            Découvrez quelques créations réalisées avec l&apos;intelligence
            artificielle en qualité Ultra HD.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-10">
          {wallpapers.map((wallpaper, index) => (
            <motion.div
              key={wallpaper.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: index * 0.06,
              }}
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl sm:rounded-[34px]"
            >
              <div className="relative h-[340px] overflow-hidden sm:h-[420px] lg:h-[470px]">
                <Image
                  src={wallpaper.image}
                  alt={wallpaper.title}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                <div className="absolute left-4 top-4 rounded-full bg-yellow-400 px-4 py-2 text-[10px] font-bold tracking-[0.18em] text-black sm:left-6 sm:top-6 sm:px-5 sm:text-xs sm:tracking-[0.25em]">
                  {wallpaper.category}
                </div>
              </div>

              <div className="p-5 sm:p-7 lg:p-8">
                <h3 className="text-2xl font-black sm:text-3xl">
                  {wallpaper.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-400 sm:mt-4 sm:text-base">
                  {wallpaper.description}
                </p>

                <div className="mt-7 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-4xl font-black text-yellow-400 sm:text-5xl">
                    {wallpaper.price}€
                  </span>

                  <Link
                    href={`/produit/${wallpaper.id}`}
                    className="flex w-full items-center justify-center rounded-full bg-yellow-400 px-7 py-4 text-base font-black text-black transition hover:scale-[1.02] sm:w-auto sm:px-8 sm:text-lg"
                  >
                    Acheter
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center sm:mt-16">
          <Link
            href="/boutique"
            className="rounded-full border border-white/15 bg-white/5 px-7 py-4 text-center font-semibold backdrop-blur-xl transition hover:bg-white hover:text-black sm:px-9"
          >
            Voir toute la boutique
          </Link>
        </div>
      </div>
    </section>
  );
}