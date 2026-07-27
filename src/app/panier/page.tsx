import Image from "next/image";
import Link from "next/link";

export default function Panier() {
  return (
    <main className="min-h-screen bg-black text-white py-24 px-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-6xl font-black mb-16">
          Mon panier
        </h1>

        <div className="bg-[#111] rounded-3xl border border-white/10 p-8 flex flex-col md:flex-row gap-8">

          <Image
            src="/images/wallpaper1.jpg"
            alt="Wallpaper"
            width={260}
            height={340}
            className="rounded-2xl object-cover"
          />

          <div className="flex-1">

            <h2 className="text-3xl font-bold">
              Midnight Porsche
            </h2>

            <p className="text-gray-400 mt-4">
              Wallpaper 4K • Téléchargement instantané
            </p>

            <p className="text-yellow-400 text-4xl font-black mt-8">
              8€
            </p>

          </div>

        </div>

        <div className="mt-12 flex justify-between items-center border-t border-white/10 pt-10">

          <div>

            <p className="text-gray-400">
              Total
            </p>

            <h2 className="text-5xl font-black">
              8€
            </h2>

          </div>

          <Link
            href="/checkout"
            className="bg-yellow-400 text-black px-10 py-5 rounded-full font-bold hover:bg-yellow-300 transition"
          >
            Passer au paiement
          </Link>

        </div>

      </div>

    </main>
  );
}