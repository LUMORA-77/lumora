"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050505]">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#facc1515,transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-8 py-24">

        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* Logo */}

          <div>

            <h2 className="text-5xl font-black tracking-[0.3em]">
              LUMORA
            </h2>

            <p className="mt-8 max-w-md text-lg leading-9 text-gray-400">
              Transformez vos photos en véritables œuvres d'art grâce
              à l'intelligence artificielle.
            </p>

            <div className="mt-10 flex gap-4">

              <motion.a
                whileHover={{ y: -4 }}
                href="#"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl backdrop-blur-xl"
              >
                𝕏
              </motion.a>

              <motion.a
                whileHover={{ y: -4 }}
                href="#"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl backdrop-blur-xl"
              >
                IG
              </motion.a>

              <motion.a
                whileHover={{ y: -4 }}
                href="#"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl backdrop-blur-xl"
              >
                TT
              </motion.a>

            </div>

          </div>

          {/* Navigation */}

          <div>

            <h3 className="mb-8 text-xl font-bold">
              Navigation
            </h3>

            <div className="space-y-5 text-gray-400">

              <Link href="/">Accueil</Link>

              <br />

              <Link href="/creer">Créer</Link>

              <br />

              <Link href="/boutique">Boutique</Link>

            </div>

          </div>

          {/* Entreprise */}

          <div>

            <h3 className="mb-8 text-xl font-bold">
              Entreprise
            </h3>

            <div className="space-y-5 text-gray-400">

              <Link href="#">
                Contact
              </Link>

              <br />

              <Link href="#">
                FAQ
              </Link>

              <br />

              <Link href="#">
                Support
              </Link>

            </div>

          </div>

          {/* Légal */}

          <div>

            <h3 className="mb-8 text-xl font-bold">
              Légal
            </h3>

            <div className="space-y-5 text-gray-400">

              <Link href="#">
                Confidentialité
              </Link>

              <br />

              <Link href="#">
                CGU
              </Link>

              <br />

              <Link href="#">
                Mentions légales
              </Link>

            </div>

          </div>

        </div>

        <div className="my-16 h-px bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-6 text-gray-500 md:flex-row">

          <p>
            © 2026 Lumora. Tous droits réservés.
          </p>

          <p>
            Made with AI ✨
          </p>

        </div>

      </div>

    </footer>
  );
}