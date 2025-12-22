"use client";

import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { useTranslations } from "next-intl";

export function ProcessSection() {
    const t = useTranslations();
    const reveal = useScrollReveal();

    return (
        <section className="py-8 md:py-32 px-4 md:px-6 relative">
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
                        {t("process_title")}
                        <span className="text-electric-400">.</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {/* Step 1 */}
                    <div className="text-center p-6">
                        <div className="w-16 h-16 rounded-2xl bg-electric-500/10 border border-electric-500/20 flex items-center justify-center mx-auto mb-6">
                            <span className="text-2xl font-bold text-electric-400">1</span>
                        </div>
                        <h3 className="font-heading text-xl font-semibold mb-2">
                            {t("process_step1_title")}
                        </h3>
                        <p className="text-white/50 text-sm">{t("process_step1_desc")}</p>
                    </div>

                    {/* Step 2 */}
                    <div className="text-center p-6">
                        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-6">
                            <span className="text-2xl font-bold text-amber-400">2</span>
                        </div>
                        <h3 className="font-heading text-xl font-semibold mb-2">
                            {t("process_step2_title")}
                        </h3>
                        <p className="text-white/50 text-sm">{t("process_step2_desc")}</p>
                    </div>

                    {/* Step 3 */}
                    <div className="text-center p-6">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                            <span className="text-2xl font-bold text-emerald-400">3</span>
                        </div>
                        <h3 className="font-heading text-xl font-semibold mb-2">
                            {t("process_step3_title")}
                        </h3>
                        <p className="text-white/50 text-sm">{t("process_step3_desc")}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
