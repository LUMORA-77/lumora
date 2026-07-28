"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import UserButton from "./UserButton";

export default function Navbar() {

  const { cart } = useCart();

  return (
    <nav className="fixed left-1/2 top-6 z-50 w-[95%] max-w-7xl -translate-x-1/2">

      <div className="rounded-full border border-white/10 bg-black/50 backdrop-blur-2xl">

        <div className="flex items-center justify-between px-8 py-5">


          {/* Logo */}

          <Link
            href="/"
            className="text-3xl font-black tracking-[0.35em]"
          >
            LUMORA
          </Link>


          {/* Navigation */}

          <div className="hidden lg:flex items-center gap-10">

            <Link
              href="/"
              className="text-gray-300 hover:text-white transition"
            >
              Accueil
            </Link>


            <Link
              href="/boutique"
              className="text-gray-300 hover:text-white transition"
            >
              Boutique
            </Link>

          </div>



          {/* Actions */}

          <div className="flex items-center gap-4">


            <Link
              href="/creer"
              className="rounded-full bg-yellow-400 px-7 py-3 font-bold text-black hover:scale-105 transition"
            >
              Créer
            </Link>



            <Link
              href="/panier"
              className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl"
            >

              🛒

              {cart.length > 0 && (

                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-xs font-black text-black">

                  {cart.length}

                </span>

              )}

            </Link>



            <div className="flex items-center gap-3">

  <Link
    href="/compte"
    className="text-sm text-gray-300 hover:text-white"
  >
    Mon compte
  </Link>

  <UserButton />

</div>


          </div>

        </div>

      </div>

    </nav>
  );
}