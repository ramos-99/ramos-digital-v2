"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

// Hero Section
function HeroSection() {
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

// Integration logos for marquee
const integrations = [
    { name: "Google", icon: "/assets/icons/google.svg" },
    { name: "Stripe", icon: "/assets/icons/stripe.svg" },
    { name: "WhatsApp", icon: "/assets/icons/whatsapp.svg" },
    { name: "OpenAI", icon: "/assets/icons/openai.svg" },
    { name: "Instagram", icon: "/assets/icons/instagram.svg" },
    { name: "Analytics", icon: "/assets/icons/analytics.svg" },
    { name: "Shopify", icon: "/assets/icons/shopify.svg" },
    { name: "React", icon: "/assets/icons/react.svg" },
    { name: "Next.js", icon: "/assets/icons/nextjs.svg" },
    { name: "AWS", icon: "/assets/icons/aws.svg" },
];

// Marquee Section
function MarqueeSection() {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-[#0A0A0B] overflow-hidden relative">
            <p className="text-center text-sm font-mono text-white/60 mb-12 uppercase tracking-widest relative z-20">
                {t("marquee_subtitle")}
            </p>

            {/* Static Gradient Overlays */}
            <div className="absolute top-0 left-0 h-full w-32 md:w-64 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 h-full w-32 md:w-64 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10 pointer-events-none" />

            {/* Scroller Container */}
            <div className="flex w-full overflow-hidden relative z-0">
                {/* List 1 */}
                <ul className="flex items-center gap-24 pr-24 w-max shrink-0 animate-infinite-scroll">
                    {integrations.map((item, index) => (
                        <li
                            key={index}
                            className="flex items-center gap-3 shrink-0 opacity-60 hover:opacity-100 transition-opacity cursor-default"
                        >
                            <Image
                                src={item.icon}
                                alt={item.name}
                                width={32}
                                height={32}
                                className="h-8 w-auto brightness-0 invert"
                            />
                            <span className="text-white font-medium text-lg tracking-tight">
                                {item.name}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* List 2 (Duplicate for seamless loop) */}
                <ul
                    className="flex items-center gap-24 pr-24 w-max shrink-0 animate-infinite-scroll"
                    aria-hidden="true"
                >
                    {integrations.map((item, index) => (
                        <li
                            key={index}
                            className="flex items-center gap-3 shrink-0 opacity-60 hover:opacity-100 transition-opacity cursor-default"
                        >
                            <Image
                                src={item.icon}
                                alt={item.name}
                                width={32}
                                height={32}
                                className="h-8 w-auto brightness-0 invert"
                            />
                            <span className="text-white font-medium text-lg tracking-tight">
                                {item.name}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

// Comparison Section
function ComparisonSection() {
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

// Process Section
function ProcessSection() {
    const { t } = useLanguage();
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

// Pricing Section
function PricingSection() {
    const { t } = useLanguage();
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
                        dangerouslySetInnerHTML={{ __html: t("pricing_title") }}
                    />
                </div>

                <div className="p-6 md:p-10 rounded-2xl glass-card border border-white/10 text-center">
                    <p
                        className="text-lg text-white/70 mb-8 max-w-xl mx-auto leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: t("pricing_desc") }}
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

// FAQ Section
function FAQSection() {
    const { t } = useLanguage();
    const reveal = useScrollReveal();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const faqs = [
        { q: t("faq_q1"), a: t("faq_a1") },
        { q: t("faq_q2"), a: t("faq_a2") },
        { q: t("faq_q3"), a: t("faq_a3") },
    ];

    const toggleFaq = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-8 md:py-32 px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
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
                        {t("faq_title")}
                        <span className="text-electric-400">?</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-electric-400/30 ${activeIndex === index ? "active" : ""
                                }`}
                        >
                            <button
                                className="w-full flex items-center justify-between p-5 text-left cursor-pointer group"
                                onClick={() => toggleFaq(index)}
                            >
                                <span className="font-medium text-white">{faq.q}</span>
                                <span
                                    className="w-6 h-6 flex items-center justify-center text-white/50 group-hover:text-white transition-all duration-300"
                                    style={{
                                        transform: activeIndex === index ? "rotate(45deg)" : "rotate(0deg)",
                                    }}
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                </span>
                            </button>
                            <div
                                className="overflow-hidden transition-all duration-300"
                                style={{
                                    maxHeight: activeIndex === index ? "200px" : "0",
                                }}
                            >
                                <p
                                    className="px-5 pb-5 text-gray-400 text-sm leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: faq.a }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Contact Section
function ContactSection() {
    const { t } = useLanguage();
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

// Main Web Page Component
export default function WebPage() {
    return (
        <>
            <HeroSection />
            <MarqueeSection />
            <ComparisonSection />
            <ProcessSection />
            <PricingSection />
            <FAQSection />
            <ContactSection />
        </>
    );
}
