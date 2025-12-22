"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";

export function HeroSection() {
    const { t } = useLanguage();

    return (
        <section className="min-h-screen flex items-center justify-center relative px-4 md:px-6 pt-20 md:pt-24">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-electric-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="font-heading text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 md:mb-6"
                    dangerouslySetInnerHTML={{ __html: t("hero_title") }}
                />
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-base md:text-xl text-white/50 max-w-2xl mx-auto mb-8 md:mb-10 px-2"
                >
                    {t("hero_subtitle")}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Link
                        href="#contact"
                        className="relative z-40 inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition-all"
                    >
                        {t("hero_cta")}
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
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
