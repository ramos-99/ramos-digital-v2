"use client";

import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function FAQSection() {
    const t = useTranslations();
    const reveal = useScrollReveal();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const faqs = [
        { q: t("faq_q1"), a: t.raw("faq_a1") },
        { q: t("faq_q2"), a: t.raw("faq_a2") },
        { q: t("faq_q3"), a: t.raw("faq_a3") },
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
