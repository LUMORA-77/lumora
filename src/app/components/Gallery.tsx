"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { wallpapers } from "@/data/wallpapers";

export default function Gallery() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-36">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#facc1515,transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-8">

        <div className="mb-24 text-center">

          <span className="inline-block rounded-full border border-yellow-400/20 bg-yellow-400/10 px-6 py-2 text-xs uppercase tracking-[0.35em] text-yellow-300">
            Collection Premium
          </span>

          <h2 className="mt-8 text-6xl font-black md:text-7xl">
            Nos créations
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-xl leading-9 text-gray-400">
            Découvrez quelques créations réalisées avec l'intelligence
            artificielle en qualité Ultra HD.
          </p>

        </div>

        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">

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

              </div>

              <div className="p-8">

                <h3 className="text-3xl font-black">

                  {wallpaper.title}

                </h3>

                <p className="mt-4 leading-7 text-gray-400">

                  {wallpaper.description}

                </p>

                <div className="mt-10 flex items-center justify-between">

                  <span className="text-5xl font-black text-yellow-400">

                    {wallpaper.price}€

                  </span>

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

    </section>
  );
}