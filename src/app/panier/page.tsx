"use client";

import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
);

export default function Panier() {

  const {
    cart,
    removeFromCart,
    clearCart,
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  async function checkout() {

    const res = await fetch("/api/checkout", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        cart,
      }),

    });

    const data = await res.json();

    console.log(data);

    if (data.url) {

      window.location.href = data.url;

    } else {

      alert("Erreur Stripe");

    }

  }

  return (

    <>

      <Navbar />

      <main className="min-h-screen bg-[#050505] text-white pt-36">

        <div className="max-w-7xl mx-auto px-8">

          <h1 className="text-6xl font-black">

            Mon panier

          </h1>

          <p className="mt-4 text-xl text-gray-400">

            {cart.length} article(s)

          </p>

          {cart.length === 0 ? (

            <div className="mt-24 text-center">

              <h2 className="text-4xl font-bold">

                Ton panier est vide

              </h2>

              <p className="mt-6 text-gray-400">

                Découvre nos wallpapers premium.

              </p>

              <Link
                href="/boutique"
                className="inline-block mt-10 rounded-full bg-yellow-400 px-10 py-4 font-bold text-black"
              >
                Explorer la boutique
              </Link>

            </div>

          ) : (

            <>
                          <div className="mt-14 space-y-8">

                {cart.map((item) => (

                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                  >

                    <div className="flex items-center gap-6">

                      <div className="relative h-32 w-32 overflow-hidden rounded-2xl">

                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />

                      </div>

                      <div>

                        <h2 className="text-3xl font-black">

                          {item.title}

                        </h2>

                        <p className="mt-3 text-2xl font-black text-yellow-400">

                          {item.price}€

                        </p>

                      </div>

                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-full border border-red-500 px-6 py-3 text-red-400 transition hover:bg-red-500 hover:text-white"
                    >
                      Supprimer
                    </button>

                  </div>

                ))}

              </div>

              <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-gray-400">

                      Total

                    </p>

                    <h2 className="mt-2 text-5xl font-black text-yellow-400">

                      {total}€

                    </h2>

                  </div>

                  <div className="flex gap-4">

                    <button
                      onClick={clearCart}
                      className="rounded-full border border-white/10 px-8 py-4 transition hover:bg-white hover:text-black"
                    >
                      Vider
                    </button>

                    <button
                      onClick={checkout}
                      className="rounded-full bg-yellow-400 px-10 py-4 font-bold text-black transition hover:scale-105"
                    >
                      Passer au paiement
                    </button>

                  </div>

                </div>

              </div>

            </>

          )}

        </div>

      </main>

    </>

  );

}