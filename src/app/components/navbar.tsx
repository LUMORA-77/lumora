import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="absolute top-6 left-1/2 -translate-x-1/2 z-20 w-[92%] max-w-7xl rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-8 py-5 flex justify-between items-center">

      <Link href="/" className="text-3xl font-bold tracking-[0.35em]">
        LUMORA
      </Link>

      <div className="hidden md:flex gap-10 text-gray-300">

        <Link href="/">Accueil</Link>

        <Link href="/boutique">Boutique</Link>

        <Link href="/creer">Créer</Link>

        <Link href="/login">Connexion</Link>

      </div>

    </nav>
  );
}