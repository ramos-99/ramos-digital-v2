"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

export function ComparisonSection() {
    const { t } = useLanguage();
    const reveal = useScrollReveal();

    return (
        <section className="py-8 md:py-32 px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
                <div
                    ref={reveal.ref}
                    className="text-center mb-16"
                    style={{
                        opacity: reveal.isRevealed ? 1 : 0,
                        transform: reveal.isRevealed ? "translateY(0)" : "translateY(30px)",
                        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
                        {t("compare_title")}
                        <span className="text-amber-400">?</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    <div className="p-6 md:p-8 rounded-2xl glass-card border border-red-500/20">
                        <h3 className="text-xl font-semibold mb-6 text-red-400">
                            {t("compare_agencies")}
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-white/60">
                                <span className="text-red-500">✕</span>
                                <span>{t("compare_bad1")}</span>
                            </li>
                            <li className="flex items-center gap-3 text-white/60">
                                <span className="text-red-500">✕</span>
                                <span>{t("compare_bad2")}</span>
                            </li>
                            <li className="flex items-center gap-3 text-white/60">
                                <span className="text-red-500">✕</span>
                                <span>{t("compare_bad3")}</span>
                            </li>
                            <li className="flex items-center gap-3 text-white/60">
                                <span className="text-red-500">✕</span>
                                <span>{t("compare_bad4")}</span>
                            </li>
                        </ul>
                    </div>

                    <div className="p-6 md:p-8 rounded-2xl glass-card border border-emerald-500/30 relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">
                            {t("compare_recommended")}
                        </div>
                        <h3 className="text-xl font-semibold mb-6 text-emerald-400">
                            Ramos Digital
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-white">
                                <span className="text-emerald-400">✓</span>
                                <span>{t("compare_good1")}</span>
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <span className="text-emerald-400">✓</span>
                                <span>{t("compare_good2")}</span>
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <span className="text-emerald-400">✓</span>
                                <span>{t("compare_good3")}</span>
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <span className="text-emerald-400">✓</span>
                                <span>{t("compare_good4")}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
