"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function Creer() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  function handleFile(file: File) {
    const url = URL.createObjectURL(file);
    setImage(url);
  }

  async function generate() {
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
      });

      const data = await res.json();

      if (data.success) {
        setResult(data.result);
      } else {
        setResult("Erreur lors de la génération.");
      }
    } catch {
      setResult("Erreur serveur.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-8 py-20">

        <p className="uppercase tracking-[0.5em] text-yellow-400">
          LUMORA AI
        </p>

        <h1 className="text-6xl font-black mt-4">
          Crée ton wallpaper
        </h1>

        <p className="text-gray-400 text-xl mt-6">
          Dépose une image puis génère avec l'IA.
        </p>

        <div
          onClick={() => inputRef.current?.click()}
          className="mt-16 border-2 border-dashed border-yellow-400 rounded-3xl h-[420px] flex items-center justify-center cursor-pointer hover:bg-white/5 transition overflow-hidden"
        >
          {!image ? (
            <div className="text-center">
              <p className="text-7xl">📷</p>

              <h2 className="text-3xl font-bold mt-6">
                Clique pour choisir une image
              </h2>

              <p className="text-gray-400 mt-4">
                PNG • JPG • WEBP
              </p>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt="Preview"
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            if (!e.target.files?.length) return;
            handleFile(e.target.files[0]);
          }}
        />

        <button
          onClick={generate}
          disabled={loading}
          className="mt-10 bg-yellow-400 text-black px-10 py-5 rounded-full text-xl font-bold hover:scale-105 transition disabled:opacity-50"
        >
          {loading ? "Génération..." : "Générer avec l'IA"}
        </button>

        {result && (
          <div className="mt-10 p-6 rounded-2xl bg-zinc-900 border border-yellow-400">
            <h3 className="text-2xl font-bold mb-4">
              Réponse de l'IA
            </h3>

            <p className="text-lg">
              {result}
            </p>
          </div>
        )}

      </div>
    </main>
  );
}