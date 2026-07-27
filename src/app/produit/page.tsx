import Image from "next/image";
import Link from "next/link";

export default function Produit() {
  return (
    <main className="min-h-screen bg-black text-white">

      <div className="max-w-7xl mx-auto px-8 py-24 grid lg:grid-cols-2 gap-20">

        <Image
          src="/images/wallpaper1.jpg"
          alt="Wallpaper"
          width={700}
          height={900}
          className="rounded-3xl w-full"
        />

        <div>

          <p className="uppercase tracking-[0.4em] text-yellow-400">
            Premium Wallpaper
          </p>

          <h1 className="text-6xl font-black mt-4">
            Midnight Porsche
          </h1>

          <p className="text-gray-400 text-xl mt-8 leading-9">
            Wallpaper premium généré avec l'IA.
            Compatible Mac, PC, iPhone, Android et iPad.
          </p>

          <div className="mt-10">

            <span className="text-yellow-400 text-5xl font-black">
              8€
            </span>

          </div>

          <Link
            href="/panier"
            className="inline-block mt-12 bg-yellow-400 text-black px-10 py-5 rounded-full font-bold hover:bg-yellow-300 transition"
          >
            Ajouter au panier
          </Link>

        </div>

      </div>

    </main>
  );
}