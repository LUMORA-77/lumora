"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { wallpapers } from "@/data/wallpapers";

type SortOption = "featured" | "price-asc" | "price-desc" | "name";

export default function Boutique() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("featured");
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = [
    "Tous",
    ...Array.from(
      new Set(wallpapers.map((wallpaper) => wallpaper.category))
    ),
  ];

  const filteredWallpapers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = wallpapers.filter((wallpaper) => {
      const matchesCategory =
        activeCategory === "Tous" ||
        wallpaper.category === activeCategory;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        wallpaper.title.toLowerCase().includes(normalizedSearch) ||
        wallpaper.category.toLowerCase().includes(normalizedSearch) ||
        wallpaper.description.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });

    return [...result].sort((a, b) => {
      if (sort === "price-asc") {
        return a.price - b.price;
      }

      if (sort === "price-desc") {
        return b.price - a.price;
      }

      if (sort === "name") {
        return a.title.localeCompare(b.title, "fr");
      }

      return a.id - b.id;
    });
  }, [activeCategory, search, sort]);

  const toggleFavorite = (id: number) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id]
    );
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* HERO */}
      <section className="relative border-b border-white/10 px-5 pb-20 pt-36 sm:px-8 sm:pb-28 sm:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.09),transparent_48%)]" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-5xl"
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-3 text-sm text-white/40 transition hover:text-white"
            >
              <span className="transition-transform group-hover:-translate-x-1">
                ←
              </span>
              Retour à l’accueil
            </Link>

            <p className="mt-12 text-xs font-bold uppercase tracking-[0.35em] text-yellow-400">
              Collection numérique premium
            </p>

            <h1 className="mt-5 max-w-5xl text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-[100px]">
              Trouvez l’image
              <span className="text-white/25"> qui change tout.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/45 sm:text-lg">
              Explorez des wallpapers conçus par intelligence artificielle
              pour mobile, ordinateur et écrans haute résolution.
            </p>
          </motion.div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-7 text-xs uppercase tracking-[0.2em] text-white/35">
            <span>{wallpapers.length} créations</span>
            <span>Qualité Ultra HD</span>
            <span>Téléchargement numérique</span>
            <span>8 € par création</span>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="sticky top-[76px] z-30 border-b border-white/10 bg-[#050505]/90 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="relative">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/35"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="M16.5 16.5L21 21"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher une création..."
                className="h-12 w-full border border-white/10 bg-white/[0.03] pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-yellow-400/60"
              />
            </div>

            <select
              value={sort}
              onChange={(event) =>
                setSort(event.target.value as SortOption)
              }
              aria-label="Trier les créations"
              className="h-12 border border-white/10 bg-[#0b0b0b] px-4 text-sm text-white outline-none transition focus:border-yellow-400/60"
            >
              <option value="featured">Sélection Lumora</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="name">Nom A à Z</option>
            </select>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => {
              const active = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 border px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] transition ${
                    active
                      ? "border-yellow-400 bg-yellow-400 text-black"
                      : "border-white/10 bg-white/[0.025] text-white/45 hover:border-white/25 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-400">
                Boutique
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-5xl">
                {activeCategory === "Tous"
                  ? "Toutes les créations"
                  : activeCategory}
              </h2>
            </div>

            <p className="text-sm text-white/35">
              {filteredWallpapers.length} résultat
              {filteredWallpapers.length > 1 ? "s" : ""}
            </p>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredWallpapers.length > 0 ? (
              <motion.div
                layout
                className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredWallpapers.map((wallpaper, index) => {
                  const isFavorite = favorites.includes(wallpaper.id);

                  return (
                    <motion.article
                      layout
                      key={wallpaper.id}
                      initial={{ opacity: 0, y: 35 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.04,
                      }}
                      className="group"
                    >
                      <div className="relative overflow-hidden bg-[#0d0d0d]">
                        <Link href={`/produit/${wallpaper.id}`}>
                          <div className="relative h-[470px] overflow-hidden sm:h-[540px]">
                            <Image
                              src={wallpaper.image}
                              alt={wallpaper.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition duration-[1200ms] ease-out group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/10" />

                            <div className="absolute left-4 top-4 bg-black/55 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] backdrop-blur-xl">
                              {wallpaper.category}
                            </div>

                            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                              <div className="flex items-end justify-between gap-5">
                                <div>
                                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                                    Wallpaper premium
                                  </p>

                                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
  <div className="flex items-end justify-between gap-5">
    <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">
      Wallpaper premium
    </p>

    <span className="text-3xl font-black text-yellow-400">
      {wallpaper.price} €
    </span>
  </div>

  <div className="mt-5 h-px origin-left scale-x-0 bg-yellow-400 transition duration-500 group-hover:scale-x-100" />
</div>
                                </div>

                                <span className="text-3xl font-black text-yellow-400">
                                  {wallpaper.price} €
                                </span>
                              </div>

                              <div className="mt-5 h-px origin-left scale-x-0 bg-yellow-400 transition duration-500 group-hover:scale-x-100" />
                            </div>
                          </div>
                        </Link>

                        <button
                          type="button"
                          aria-label={
                            isFavorite
                              ? "Retirer des favoris"
                              : "Ajouter aux favoris"
                          }
                          onClick={() => toggleFavorite(wallpaper.id)}
                          className={`absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center border backdrop-blur-xl transition ${
                            isFavorite
                              ? "border-yellow-400 bg-yellow-400 text-black"
                              : "border-white/15 bg-black/50 text-white hover:border-white/40"
                          }`}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                            fill={isFavorite ? "currentColor" : "none"}
                            aria-hidden="true"
                          >
                            <path
                              d="M20.8 4.9a5.4 5.4 0 0 0-7.7 0L12 6l-1.1-1.1a5.4 5.4 0 0 0-7.7 7.7l1.1 1.1L12 21l7.7-7.3 1.1-1.1a5.4 5.4 0 0 0 0-7.7Z"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-4 border-x border-b border-white/10 px-5 py-5">
                        <p className="line-clamp-1 text-sm text-white/40">
                          {wallpaper.description}
                        </p>

                        <Link
                          href={`/produit/${wallpaper.id}`}
                          className="shrink-0 text-sm font-bold text-white transition hover:text-yellow-400"
                        >
                          Découvrir →
                        </Link>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border border-white/10 bg-white/[0.02] px-6 py-20 text-center"
              >
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-400">
                  Aucun résultat
                </p>

                <h3 className="mt-5 text-3xl font-black">
                  Aucune création trouvée.
                </h3>

                <p className="mx-auto mt-4 max-w-md leading-7 text-white/40">
                  Modifiez votre recherche ou choisissez une autre catégorie.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("Tous");
                    setSort("featured");
                  }}
                  className="mt-8 bg-yellow-400 px-7 py-4 font-black text-black transition hover:scale-[1.03]"
                >
                  Réinitialiser les filtres
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CUSTOM CTA */}
      <section className="border-t border-white/10 bg-[#090909] px-5 py-24 sm:px-8 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_auto] lg:items-end"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-yellow-400">
              Rien ne vous ressemble ?
            </p>

            <h2 className="mt-5 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-7xl">
              Créez une œuvre à partir de votre photo.
            </h2>

            <p className="mt-7 max-w-xl leading-8 text-white/45">
              Choisissez votre style, envoyez votre image et recevez une
              création totalement personnalisée.
            </p>
          </div>

          <Link
            href="/creer"
            className="group flex min-w-[260px] items-center justify-between bg-yellow-400 px-7 py-5 font-black text-black transition hover:scale-[1.02]"
          >
            Créer mon œuvre — 12 €
            <span className="transition-transform group-hover:translate-x-2">
              →
            </span>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}