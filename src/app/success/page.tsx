import Link from "next/link";

export default function Success() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-8">

      <div className="max-w-2xl text-center">

        <div className="text-8xl mb-8">
          ✅
        </div>

        <h1 className="text-6xl font-black">
          Paiement réussi !
        </h1>

        <p className="mt-8 text-xl text-gray-400 leading-9">
          Merci pour ton achat.
          Ton wallpaper est prêt à être téléchargé.
        </p>

        <div className="mt-14 flex justify-center gap-5">

          <button
            className="rounded-full bg-yellow-400 px-10 py-5 font-bold text-black hover:scale-105 transition"
          >
            Télécharger
          </button>

          <Link
            href="/boutique"
            className="rounded-full border border-white/10 px-10 py-5 hover:bg-white hover:text-black transition"
          >
            Continuer mes achats
          </Link>

        </div>

      </div>

    </main>
  );
}