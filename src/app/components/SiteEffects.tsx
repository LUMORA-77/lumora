"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function SiteEffects() {
  const pathname = usePathname();

  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  const mousePosition = useRef({
    x: 0,
    y: 0,
  });

  const cursorPosition = useRef({
    x: 0,
    y: 0,
  });

  const animationFrame = useRef<number | null>(null);

  const [showIntro, setShowIntro] = useState(false);
  const [cursorActive, setCursorActive] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<
    "default" | "interactive" | "cta"
  >("default");

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("lumora-intro-seen");

    if (!hasSeenIntro) {
      setShowIntro(true);
      sessionStorage.setItem("lumora-intro-seen", "true");

      const timer = window.setTimeout(() => {
        setShowIntro(false);
      }, 1800);

      return () => {
        window.clearTimeout(timer);
      };
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(pointer: fine) and (min-width: 1024px)"
    );

    const updateCursorAvailability = () => {
      setCursorActive(mediaQuery.matches);
    };

    updateCursorAvailability();

    mediaQuery.addEventListener("change", updateCursorAvailability);

    return () => {
      mediaQuery.removeEventListener("change", updateCursorAvailability);
    };
  }, []);

  useEffect(() => {
    if (!cursorActive) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: event.clientX,
        y: event.clientY,
      };

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(
          ${event.clientX}px,
          ${event.clientY}px,
          0
        )`;
      }
    };

    const animateCursor = () => {
      cursorPosition.current.x +=
        (mousePosition.current.x - cursorPosition.current.x) * 0.14;

      cursorPosition.current.y +=
        (mousePosition.current.y - cursorPosition.current.y) * 0.14;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(
          ${cursorPosition.current.x}px,
          ${cursorPosition.current.y}px,
          0
        )`;
      }

      animationFrame.current = window.requestAnimationFrame(animateCursor);
    };

    window.addEventListener("mousemove", handleMouseMove);

    animationFrame.current = window.requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      if (animationFrame.current) {
        window.cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [cursorActive]);

  useEffect(() => {
    if (!cursorActive) {
      return;
    }

    const interactiveElements = document.querySelectorAll<HTMLElement>(
      "a, button, input, select, textarea, [role='button'], [data-cursor]"
    );

    const cleanups: Array<() => void> = [];

    interactiveElements.forEach((element) => {
      const handleMouseEnter = () => {
        const customVariant = element.dataset.cursor;

        if (
          customVariant === "cta" ||
          element.classList.contains("cursor-cta")
        ) {
          setCursorVariant("cta");
          return;
        }

        setCursorVariant("interactive");
      };

      const handleMouseLeave = () => {
        setCursorVariant("default");
      };

      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);

      cleanups.push(() => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [pathname, cursorActive]);

  const cursorSize =
    cursorVariant === "cta"
      ? "h-20 w-20"
      : cursorVariant === "interactive"
        ? "h-14 w-14"
        : "h-8 w-8";

  const cursorStyle =
    cursorVariant === "cta"
      ? "border-yellow-400 bg-yellow-400/15"
      : cursorVariant === "interactive"
        ? "border-white/70 bg-white/10"
        : "border-white/40 bg-transparent";

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="lumora-intro"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.5,
                ease: "easeInOut",
              },
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
                filter: "blur(14px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative overflow-hidden px-6 py-4"
            >
              <motion.div
                initial={{ x: "-140%" }}
                animate={{ x: "180%" }}
                transition={{
                  duration: 1,
                  delay: 0.45,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute inset-y-0 w-24 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/70 to-transparent blur-xl"
              />

              <h1 className="relative text-5xl font-black tracking-[-0.08em] text-white sm:text-7xl lg:text-8xl">
                LUMORA
              </h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.75,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mx-auto mt-4 h-px w-24 origin-left bg-yellow-400"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.7,
                duration: 0.5,
              }}
              className="absolute bottom-10 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30"
            >
              Digital Art Studio
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {cursorActive && (
        <>
          <div
            ref={cursorRef}
            className={`pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,background-color,border-color] duration-300 ${cursorSize} ${cursorStyle}`}
          />

          <div
            ref={cursorDotRef}
            className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400"
          />
        </>
      )}
    </>
  );
}