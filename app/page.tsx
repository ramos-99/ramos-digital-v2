"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

// Lisbon Time Widget Component
function LisbonTime() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleTimeString("en-GB", {
        timeZone: "Europe/Lisbon",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(now);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-3xl font-heading font-bold text-white tabular-nums">
      {time}
    </p>
  );
}

// Hero Section Component
function HeroSection() {
  const { t } = useLanguage();
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
          dangerouslySetInnerHTML={{ __html: t("hero_desc") }}
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

// Feature Section Component
function FeatureSection() {
  const { t } = useLanguage();

  return (
    <section
      id="feature-section"
      className="relative min-h-[400px] md:min-h-[600px] flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src="/assets/img/feature-keyboard.jpeg"
        alt="Mechanical Keyboard Setup"
        fill
        className="object-cover -z-10"
        priority
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B] via-[#0A0A0B]/80 to-transparent z-0" />

      {/* Bottom Fade Transition */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0A0B] to-transparent z-0" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
        <div className="max-w-2xl">
          <h2
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight"
            dangerouslySetInnerHTML={{ __html: t("feature_title") }}
          />
          <p className="text-lg text-white/60 leading-relaxed mb-8">
            {t("feature_desc")}
          </p>
          <a
            href="mailto:martim@ramosdigital.pt"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span>{t("feature_cta")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// About Section Component
function AboutSection() {
  const { t } = useLanguage();
  const reveal1 = useScrollReveal();
  const reveal2 = useScrollReveal();

  return (
    <section id="about" className="py-8 md:py-32 px-4 md:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          ref={reveal1.ref}
          className={`mb-16 ${reveal1.isRevealed ? "revealed" : ""}`}
          style={{
            opacity: reveal1.isRevealed ? 1 : 0,
            transform: reveal1.isRevealed ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
            {t("about_title")}
            <span className="text-electric-400">.</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div
          ref={reveal2.ref}
          className={`grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[180px] ${reveal2.isRevealed ? "revealed" : ""
            }`}
          style={{
            opacity: reveal2.isRevealed ? 1 : 0,
            transform: reveal2.isRevealed ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Card 1: Education (Large) */}
          <div className="group md:col-span-2 lg:col-span-3 row-span-2 p-8 rounded-2xl glass-card border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-500 cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 h-full flex flex-col">
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-electric-500/10 border border-electric-500/20 flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-electric-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              </div>

              <h3 className="font-heading text-2xl font-semibold mb-3">
                {t("about_edu_title")}
              </h3>

              <p
                className="text-white/60 mb-auto leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t("about_edu_desc") }}
              />

              <div className="flex items-center gap-2 text-sm text-white/40 font-mono mt-6">
                <span className="text-electric-400">&gt;</span>
                <span>{t("about_edu_note")}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Status (Small) */}
          <div className="group md:col-span-2 lg:col-span-2 p-6 rounded-2xl glass-card border border-white/10 hover:border-emerald-500/30 hover:bg-white/[0.07] transition-all duration-500 cursor-pointer">
            <div className="h-full flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <span className="text-emerald-400 font-medium">
                  {t("about_status")}
                </span>
              </div>
              <div>
                <p className="text-2xl font-heading font-semibold">
                  {t("about_freelance")}
                </p>
                <p className="text-white/40 text-sm mt-1">
                  {t("about_freelance_desc")}
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Location + Time */}
          <div className="group lg:col-span-1 p-6 rounded-2xl glass-card border border-white/10 hover:border-electric-500/30 hover:bg-white/[0.07] transition-all duration-500 cursor-pointer flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <svg
                className="w-6 h-6 text-electric-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-xs text-white/30 font-mono">WET/WEST</span>
            </div>
            <div>
              <LisbonTime />
              <p className="text-white/40 text-sm">Lisbon, Portugal 🇵🇹</p>
            </div>
          </div>

          {/* Card 4: Tech Stack (Wide) */}
          <div className="group md:col-span-4 lg:col-span-3 row-span-1 p-6 rounded-2xl glass-card border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-500 cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-electric-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  {/* React */}
                  <TechIcon color="#61DAFB" name="React">
                    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
                  </TechIcon>
                  {/* Tailwind */}
                  <TechIcon color="#06B6D4" name="Tailwind">
                    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
                  </TechIcon>
                  {/* Python */}
                  <TechIcon color="#3776AB" name="Python">
                    <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
                  </TechIcon>
                  {/* Cloudflare */}
                  <TechIcon color="#F48120" name="Cloudflare">
                    <path d="M16.5088 16.8447c.1475-.5068.0908-.9707-.1553-1.3154-.2246-.3164-.6045-.499-1.0615-.5205l-8.6592-.1123a.1559.1559 0 0 1-.1333-.0713.1476.1476 0 0 1-.0195-.1482c.0283-.0986.1224-.168.2288-.168l8.7149-.1123c1.0351-.0498 2.1597-.8691 2.5617-1.8965l.5098-1.3013c.0214-.0533.0214-.1123 0-.1656a4.9013 4.9013 0 0 0-.8467-1.8203c-1.6553-2.0606-4.4424-2.7207-6.8516-1.6211a5.1096 5.1096 0 0 0-2.4199 2.0166c-.6279-.4766-1.4029-.7354-2.1984-.7354-2.0205 0-3.6601 1.6396-3.6601 3.6601 0 .1992.0176.3984.0537.5928-.0107 0-.0215-.0049-.0322-.0049a3.3937 3.3937 0 0 0-3.3916 3.3916c0 .1553.0127.3154.0342.4756.0381.2197.2314.3818.4511.3818h15.5254a.3565.3565 0 0 0 .3467-.2803l.2032-.6962zm2.7813-3.4063l-.1709.0049c-.0127 0-.0244.0068-.0361.0068a.1392.1392 0 0 0-.1182.0996l-.3584 1.2295c-.1534.5273-.0879.9844.1465 1.3193.2246.3164.6055.499 1.0625.5205l1.0898.1133c.0449.0039.0898.0313.1201.0703.0303.0381.0381.0879.0254.1367-.0283.0986-.1221.168-.2285.168l-1.1475.1123c-1.0303.0498-2.1582.8691-2.5605 1.8975l-.1416.3613c-.0283.0703.0273.1416.1025.1416h6.5557c.1768 0 .335-.1201.3809-.2969a3.2093 3.2093 0 0 0 .0987-1.0312c-.0039-2.0284-1.6533-3.6815-3.6816-3.6865z" />
                  </TechIcon>
                </div>
                <p className="text-white/40 text-sm hidden lg:block">
                  Modern Stack. No bloated builders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Tech Icon Component
function TechIcon({
  color,
  name,
  children,
}: {
  color: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2 group/icon">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center group-hover/icon:scale-110 transition-transform"
        style={{
          backgroundColor: `${color}15`,
          borderColor: `${color}30`,
          borderWidth: 1,
        }}
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill={color}
        >
          {children}
        </svg>
      </div>
      <span className="text-xs text-white/40">{name}</span>
    </div>
  );
}

// Services Section Component  
function ServicesSection() {
  const { t } = useLanguage();
  const [auditInput, setAuditInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState<string | null>(null);
  const reveal = useScrollReveal();

  const handleAudit = useCallback(() => {
    if (!auditInput.trim()) {
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setButtonText("✓");
      console.log(`[Ramos Digital Audit] Analysis for: ${auditInput}`);
      console.log("Performance Score: 98/100");
      console.log("Accessibility: 100/100");
      console.log("Best Practices: 95/100");
      console.log("SEO: 100/100");

      setTimeout(() => setButtonText(null), 2000);
    }, 2000);
  }, [auditInput]);

  return (
    <section id="services" className="py-8 md:py-32 px-4 md:px-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div
          ref={reveal.ref}
          className="text-center mb-16"
          style={{
            opacity: reveal.isRevealed ? 1 : 0,
            transform: reveal.isRevealed ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            {t("services_title")}
            <span className="text-amber-400">.</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">{t("services_desc")}</p>
        </div>

        {/* Minimalist Input Field */}
        <div className="minimal-input rounded-xl p-1 mb-12">
          <div className="flex items-center">
            <input
              type="text"
              placeholder={t("services_audit_placeholder")}
              className="flex-1 bg-transparent text-white text-sm placeholder:text-white/30 focus:outline-none px-5 py-4"
              value={auditInput}
              onChange={(e) => setAuditInput(e.target.value)}
            />
            <button
              onClick={handleAudit}
              disabled={isLoading}
              className={`px-6 py-3 mr-1 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors cursor-pointer ${isLoading ? "btn-loading" : ""
                }`}
            >
              <span>{buttonText ?? t("services_audit_btn")}</span>
            </button>
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Service 1 */}
          <div className="group p-6 rounded-2xl glass-card border border-white/10 hover:border-electric-500/30 transition-all duration-500">
            <div className="w-12 h-12 rounded-xl bg-electric-500/10 border border-electric-500/20 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-electric-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2">
              {t("service1_title")}
            </h3>
            <p className="text-white/50 text-sm">{t("service1_desc")}</p>
          </div>

          {/* Service 2 */}
          <div className="group p-6 rounded-2xl glass-card border border-white/10 hover:border-amber-500/30 transition-all duration-500">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              </svg>
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2">
              {t("service2_title")}
            </h3>
            <p className="text-white/50 text-sm">{t("service2_desc")}</p>
          </div>

          {/* Service 3 */}
          <div className="group p-6 rounded-2xl glass-card border border-white/10 hover:border-emerald-500/30 transition-all duration-500">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2">
              {t("service3_title")}
            </h3>
            <p className="text-white/50 text-sm">{t("service3_desc")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Projects Section Component
function ProjectsSection() {
  const { t } = useLanguage();

  const projects = [
    {
      name: "Ramos Digital",
      domain: "ramosdigital.pt",
      description:
        "This platform. A showcase of engineering precision and modern web aesthetics.",
      tags: ["Tailwind CSS", "Performance"],
      colors: { from: "electric-500/20", to: "amber-500/10", accent: "electric" },
      initials: "RD",
    },
    {
      name: "Sarmento At Home",
      domain: "sarmentoathome.pt",
      description:
        "Premium culinary platform. Private dining experiences and exclusive chef services.",
      tags: ["Next.js", "E-Commerce"],
      colors: { from: "amber-500/20", to: "orange-500/10", accent: "amber" },
      initials: "SA",
    },
    {
      name: "SS Financial",
      domain: "ssfinancial.concept",
      description:
        "Fintech redesign concept. Modern banking interface with focus on clarity and trust.",
      tags: ["Figma", "UI Design"],
      colors: { from: "emerald-500/20", to: "teal-500/10", accent: "emerald" },
      initials: "SS",
    },
  ];

  return (
    <section id="projects" className="py-8 md:py-32 px-4 md:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-end justify-between">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
              {t("projects_title")}
              <span className="text-electric-400">.</span>
            </h2>
            <p className="text-white/40 text-sm hidden md:block">
              {t("projects_scroll_hint")}
            </p>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="overflow-x-auto hide-scrollbar pb-4 -mx-6 px-6">
          <div className="flex gap-6 snap-x snap-mandatory" style={{ width: "max-content" }}>
            {projects.map((project, index) => (
              <div key={index} className="group w-[300px] md:w-[400px] snap-start">
                <div
                  className={`rounded-2xl glass-card border border-white/10 hover:border-${project.colors.accent}-500/30 transition-all duration-500 overflow-hidden`}
                >
                  {/* Window Header */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-white/40 text-xs font-mono ml-2">
                      {project.domain}
                    </span>
                  </div>

                  {/* Project Preview */}
                  <div
                    className={`h-48 bg-gradient-to-br from-${project.colors.from} via-dark-800 to-${project.colors.to} flex items-center justify-center`}
                  >
                    <div className="text-center">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-${project.colors.accent}-500/20 border border-${project.colors.accent}-500/30 flex items-center justify-center mx-auto mb-4`}
                      >
                        <span
                          className={`font-heading text-2xl font-bold text-${project.colors.accent}-400`}
                        >
                          {project.initials}
                        </span>
                      </div>
                      <p className="text-white/60 text-sm">
                        {project.name === "Ramos Digital"
                          ? "Personal Engineering Hub"
                          : project.name === "Sarmento At Home"
                            ? "High-End Culinary"
                            : "Fintech Redesign"}
                      </p>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-semibold mb-2">
                      {project.name}
                    </h3>
                    <p className="text-white/50 text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* View All Projects Card */}
            <div className="group w-[300px] snap-start">
              <Link
                href="#"
                className="block h-full rounded-2xl glass-card border border-white/10 hover:border-white/20 transition-all duration-500 flex items-center justify-center min-h-[380px]"
              >
                <div className="text-center p-8">
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-4 group-hover:border-electric-500/50 group-hover:bg-electric-500/10 transition-all duration-300">
                    <svg
                      className="w-6 h-6 text-white/40 group-hover:text-electric-400 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                  <p className="text-white/60 font-medium">View All Projects</p>
                  <p className="text-white/30 text-sm mt-1">Coming soon</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </>
  );
}
