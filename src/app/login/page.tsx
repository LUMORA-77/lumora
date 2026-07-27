"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUp() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Compte créé ! Vérifie tes emails.");
  }

  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-8">

      <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-3xl p-10">

        <p className="uppercase tracking-[0.4em] text-yellow-400 text-center mb-4">
          LUMORA
        </p>

        <h1 className="text-4xl font-black text-white text-center">
          Connexion
        </h1>

        <p className="text-center text-gray-400 mt-4">
          Connecte-toi à ton compte.
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-8 bg-black border border-white/20 rounded-xl p-4 text-white"
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-5 bg-black border border-white/20 rounded-xl p-4 text-white"
        />

        <button
          onClick={signIn}
          className="w-full mt-8 bg-yellow-400 text-black py-4 rounded-full font-bold hover:bg-yellow-300 transition"
        >
          Se connecter
        </button>

        <button
          onClick={signUp}
          className="w-full mt-4 border border-white rounded-full py-4 text-white hover:bg-white hover:text-black transition"
        >
          Créer un compte
        </button>

      </div>

    </main>
  );
}