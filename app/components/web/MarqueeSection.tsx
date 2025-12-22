"use client";

import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";

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

export function MarqueeSection() {
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
