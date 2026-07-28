"use client";

import { wallpapers } from "@/data/wallpapers";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { useCart } from "@/context/CartContext";
import { useParams } from "next/navigation";

export default function Produit() {

  const { id } = useParams();

  const { addToCart } = useCart();

  const wallpaper = wallpapers.find(
    (w) => w.id === Number(id)
  );

  if (!wallpaper) {

    return (

      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        Produit introuvable.

      </main>

    );

  }

  return (

    <>

      <Navbar />

      <main className="min-h-screen bg-[#050505] text-white pt-36">

        <div className="max-w-7xl mx-auto px-8">

          <Link
            href="/boutique"
            className="text-yellow-400"
          >
            ← Retour à la boutique
          </Link>

          <div className="grid lg:grid-cols-2 gap-20 mt-10">
                        <div className="relative overflow-hidden rounded-[36px] border border-white/10">

              <Image
                src={wallpaper.image}
                alt={wallpaper.title}
                width={900}
                height={1200}
                className="w-full"
              />

            </div>

            <div>

              <span className="rounded-full bg-yellow-400 px-5 py-2 font-bold text-black">

                {wallpaper.category}

              </span>

              <h1 className="mt-8 text-6xl font-black">

                {wallpaper.title}

              </h1>

              <p className="mt-8 text-xl leading-9 text-gray-400">

                {wallpaper.description}

              </p>

              <div className="mt-14">

                <p className="uppercase text-gray-500">

                  Compatible

                </p>

                <div className="mt-5 flex flex-wrap gap-4">

                  <div className="rounded-full border border-white/10 px-6 py-3">
                    iPhone
                  </div>

                  <div className="rounded-full border border-white/10 px-6 py-3">
                    Android
                  </div>

                  <div className="rounded-full border border-white/10 px-6 py-3">
                    Mac
                  </div>

                  <div className="rounded-full border border-white/10 px-6 py-3">
                    PC
                  </div>

                </div>

              </div>

              <div className="mt-16 flex items-center justify-between">

                <span className="text-7xl font-black text-yellow-400">

                  {wallpaper.price}€

                </span>

                <button

                  onClick={() =>
                    addToCart({
                      id: wallpaper.id,
                      title: wallpaper.title,
                      price: wallpaper.price,
                      image: wallpaper.image,
                    })
                  }

                  className="rounded-full bg-yellow-400 px-12 py-5 text-xl font-black text-black transition hover:scale-105"

                >

                  Ajouter au panier

                </button>

              </div>

            </div>
                      </div>

        </div>

      </main>

    </>

  );

}