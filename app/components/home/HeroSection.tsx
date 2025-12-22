"use client";

import { useState, useRef, useCallback } from "react";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations();
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [spotlightOpacity, setSpotlightOpacity] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (spotlightRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      spotlightRef.current.style.setProperty("--mouse-x", x + "%");
      spotlightRef.current.style.setProperty("--mouse-y", y + "%");
    }
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 md:px-6"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setSpotlightOpacity(1)}
      onMouseLeave={() => setSpotlightOpacity(0)}
    >
      {/* Spotlight Background */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: spotlightOpacity,
          background:
            "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59,130,246,0.15), transparent 40%)",
        }}
      />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-5xl mx-auto text-center pt-20 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-white/70 font-mono">
            {t("hero_status")}
          </span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-5xl sm:text-7xl md:text-[9rem] font-bold tracking-tighter mb-6 md:mb-8 leading-[0.9]"
        >
          Martim
          <br className="md:hidden" /> Ramos
          <span className="text-electric-400">.</span>
        </motion.h1>

        <p className="text-lg md:text-xl lg:text-2xl text-white/50 mb-4 font-light max-w-2xl mx-auto px-2">
          Computer Engineering @ <span className="text-white">Técnico Lisboa</span>
        </p>

        <p
          className="text-base md:text-lg text-white/30 max-w-xl mx-auto mb-10 md:mb-14 leading-relaxed px-2"
          dangerouslySetInnerHTML={{ __html: t.raw("hero_desc") }}
        />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#about"
            className="relative z-40 group px-8 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-3 shadow-lg shadow-white/10"
          >
            <span>{t("hero_explore")}</span>
            <svg
              className="w-4 h-4 group-hover:translate-y-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Link>
          <Link
            href="/web"
            className="relative z-40 px-8 py-4 rounded-xl text-white/60 hover:text-white border border-white/10 hover:border-white/20 transition-all flex items-center gap-2"
          >
            <span>{t("hero_solutions")}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-white/40 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
