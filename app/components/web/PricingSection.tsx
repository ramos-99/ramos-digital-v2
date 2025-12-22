"use client";

import Link from "next/link";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { useTranslations } from "next-intl";

export function PricingSection() {
    const t = useTranslations();
    const reveal = useScrollReveal();

    return (
        <section className="py-8 md:py-32 px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
                <div
                    ref={reveal.ref}
                    className="text-center mb-12"
                    style={{
                        opacity: reveal.isRevealed ? 1 : 0,
                        transform: reveal.isRevealed ? "translateY(0)" : "translateY(30px)",
                        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    <h2
                        className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold"
                        dangerouslySetInnerHTML={{ __html: t.raw("pricing_title") }}
                    />
                </div>

                <div className="p-6 md:p-10 rounded-2xl glass-card border border-white/10 text-center">
                    <p
                        className="text-lg text-white/70 mb-8 max-w-xl mx-auto leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: t.raw("pricing_desc") }}
                    />

                    <div className="flex flex-wrap justify-center gap-6 mb-10">
                        <div className="flex items-center gap-2 text-emerald-400">
                            <span>✓</span>
                            <span className="text-white/80">{t("pricing_perk1")}</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-400">
                            <span>✓</span>
                            <span className="text-white/80">{t("pricing_perk2")}</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-400">
                            <span>✓</span>
                            <span className="text-white/80">{t("pricing_perk3")}</span>
                        </div>
                    </div>

                    <Link
                        href="#contact"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition-all"
                    >
                        {t("pricing_cta")}
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
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
