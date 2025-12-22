"use client";

import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";

// Feature Section Component
export function FeatureSection() {
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
