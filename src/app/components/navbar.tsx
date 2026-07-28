"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import UserButton from "./UserButton";

export default function Navbar() {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed left-1/2 top-3 z-50 w-[94%] max-w-7xl -translate-x-1/2 sm:top-5">
      <div className="rounded-3xl border border-white/10 bg-black/70 shadow-2xl backdrop-blur-2xl">
        <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-black tracking-[0.22em] sm:text-2xl lg:text-3xl lg:tracking-[0.35em]"
            onClick={() => setMenuOpen(false)}
          >
            LUMORA
          </Link>

          {/* Navigation ordinateur */}
          <div className="hidden items-center gap-10 lg:flex">
            <Link
              href="/"
              className="text-gray-300 transition hover:text-white"
            >
              Accueil
            </Link>

            <Link
              href="/boutique"
              className="text-gray-300 transition hover:text-white"
            >
              Boutique
            </Link>

            <Link
              href="/creer"
              className="text-gray-300 transition hover:text-white"
            >
              Créer
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/panier"
              aria-label="Ouvrir le panier"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg transition hover:bg-white/10 sm:h-12 sm:w-12 sm:text-xl"
            >
              🛒

              {cart.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-400 px-1 text-[10px] font-black text-black sm:-right-2 sm:-top-2 sm:h-6 sm:min-w-6 sm:text-xs">
                  {cart.length}
                </span>
              )}
            </Link>

            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="/compte"
                className="text-sm text-gray-300 transition hover:text-white"
              >
                Mon compte
              </Link>

              <UserButton />
            </div>

            {/* Bouton menu mobile */}
            <button
              type="button"
              aria-label="Ouvrir le menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((current) => !current)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl transition hover:bg-white/10 lg:hidden"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="border-t border-white/10 px-4 pb-4 pt-3 lg:hidden">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-gray-200 transition hover:bg-white/5 hover:text-white"
              >
                Accueil
              </Link>

              <Link
                href="/boutique"
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-gray-200 transition hover:bg-white/5 hover:text-white"
              >
                Boutique
              </Link>

              <Link
                href="/creer"
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-gray-200 transition hover:bg-white/5 hover:text-white"
              >
                Créer
              </Link>

              <Link
                href="/compte"
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-gray-200 transition hover:bg-white/5 hover:text-white"
              >
                Mon compte
              </Link>

              <div className="flex items-center justify-between rounded-2xl px-4 py-3">
                <span className="text-gray-400">Profil</span>
                <UserButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}