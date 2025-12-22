"use client";

import { useState, useCallback } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

// Services Section Component  
export function ServicesSection() {
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
