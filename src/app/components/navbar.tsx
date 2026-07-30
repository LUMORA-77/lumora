"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import UserButton from "./UserButton";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/boutique", label: "Boutique" },
  { href: "/creer", label: "Créer" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { cart } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const cartCount = cart.length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5">
        <motion.nav
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`mx-auto flex max-w-7xl items-center justify-between border px-4 py-3 transition-all duration-500 sm:px-5 ${
            scrolled
              ? "border-white/10 bg-black/80 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
              : "border-white/10 bg-black/35 backdrop-blur-xl"
          }`}
        >
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="Accueil Lumora"
          >
            <span className="text-xl font-black tracking-[-0.04em] sm:text-2xl">
              LUMORA
              <span className="text-yellow-400">.</span>
            </span>

            <span className="hidden h-1.5 w-1.5 rounded-full bg-yellow-400 transition group-hover:scale-150 sm:block" />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition ${
                    active ? "text-white" : "text-white/55 hover:text-white"
                  }`}
                >
                  {link.label}

                  {active && (
                    <motion.span
                      layoutId="navbar-active"
                      className="absolute inset-x-4 -bottom-0.5 h-px bg-yellow-400"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/panier"
              aria-label={`Panier, ${cartCount} article${cartCount > 1 ? "s" : ""}`}
              className="group relative flex h-10 items-center gap-2 border border-white/10 bg-white/[0.04] px-3 transition hover:border-white/20 hover:bg-white/[0.08]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M3 4h2l2.2 10.1a2 2 0 0 0 2 1.6h6.9a2 2 0 0 0 1.9-1.4L20 8H7"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="19" r="1.2" fill="currentColor" />
                <circle cx="17" cy="19" r="1.2" fill="currentColor" />
              </svg>

              <span className="hidden text-sm font-medium sm:inline">
                Panier
              </span>

              {cartCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-400 px-1 text-[10px] font-black text-black">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/compte"
                className="border border-white/10 px-4 py-2.5 text-sm font-medium text-white/65 transition hover:border-white/20 hover:text-white"
              >
                Mon compte
              </Link>

              <div className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.04]">
                <UserButton />
              </div>
            </div>

            <button
              type="button"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((current) => !current)}
              className="relative flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.04] transition hover:bg-white/[0.08] lg:hidden"
            >
              <span
                className={`absolute h-px w-5 bg-white transition duration-300 ${
                  menuOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              />

              <span
                className={`absolute h-px w-5 bg-white transition duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />

              <span
                className={`absolute h-px w-5 bg-white transition duration-300 ${
                  menuOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 px-5 pb-8 pt-28 backdrop-blur-2xl lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.35 }}
              className="mx-auto flex h-full max-w-7xl flex-col"
            >
              <div className="flex flex-1 flex-col justify-center border-y border-white/10">
                {links.map((link, index) => {
                  const active =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + index * 0.07 }}
                    >
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between border-b border-white/10 py-6"
                      >
                        <span
                          className={`text-4xl font-black tracking-[-0.04em] sm:text-5xl ${
                            active ? "text-yellow-400" : "text-white"
                          }`}
                        >
                          {link.label}
                        </span>

                        <span className="text-2xl text-white/30 transition group-hover:translate-x-2 group-hover:text-yellow-400">
                          →
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}

                <Link
                  href="/compte"
                  className="group flex items-center justify-between py-6"
                >
                  <span className="text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">
                    Mon compte
                  </span>

                  <span className="text-2xl text-white/30 transition group-hover:translate-x-2 group-hover:text-yellow-400">
                    →
                  </span>
                </Link>
              </div>

              <div className="flex items-center justify-between pt-7">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                    Lumora
                  </p>

                  <p className="mt-2 text-sm text-white/55">
                    Art numérique premium
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center border border-white/10 bg-white/[0.04]">
                  <UserButton />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}