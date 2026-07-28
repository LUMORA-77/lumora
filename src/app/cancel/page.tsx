import Link from "next/link";

export default function Cancel() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-6xl font-black">
          Paiement annulé
        </h1>

        <p className="mt-8 text-xl text-gray-400">
          Aucun paiement n'a été effectué.
        </p>

        <Link
          href="/panier"
          className="inline-block mt-10 rounded-full bg-yellow-400 px-10 py-4 font-bold text-black"
        >
          Retour au panier
        </Link>

      </div>

    </main>
  );
}