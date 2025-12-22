"use client";

import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { useTranslations } from "next-intl";

export function ContactSection() {
    const t = useTranslations();
    const reveal = useScrollReveal();

    return (
        <section id="contact" className="py-8 md:py-32 px-4 md:px-6">
            <div
                ref={reveal.ref}
                className="max-w-2xl mx-auto text-center"
                style={{
                    opacity: reveal.isRevealed ? 1 : 0,
                    transform: reveal.isRevealed ? "translateY(0)" : "translateY(30px)",
                    transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            >
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                    {t("contact_title")}
                    <span className="text-emerald-400">.</span>
                </h2>
                <p className="text-white/50 mb-8">{t("contact_desc")}</p>
                <a
                    href="mailto:martim@ramosdigital.pt"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition-all"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                    martim@ramosdigital.pt
                </a>
            </div>
        </section>
    );
}
