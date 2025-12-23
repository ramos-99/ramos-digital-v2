"use client";

import { useTranslations } from "next-intl";
import { LisbonTime } from "@/app/components/home/LisbonTime";
export function Footer() {
    const t = useTranslations();

    return (
        <footer className="bg-neutral-950 border-t border-white/5 text-white overflow-hidden">
            {/* 1. The Spectacular Top Row */}
            <div className="w-full">
                <a
                    href="mailto:martim@ramosdigital.pt"
                    className="block w-full group relative overflow-hidden"
                >
                    <div className="px-4 md:px-6 py-24 md:py-32 flex justify-center items-center">
                        <h1 className="text-[9vw] leading-none font-light tracking-tighter text-center whitespace-nowrap text-neutral-500 group-hover:text-white transition-colors duration-500 flex items-center gap-4 md:gap-8">
                            {t("footer_talk")}
                            <span className="text-[4vw] opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 font-thin text-white">
                                ↗
                            </span>
                        </h1>
                    </div>
                </a>
            </div>

            {/* 2. The Identity Grid (Bottom Row) */}
            <div className="border-t border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5">

                    {/* Col 1: Who */}
                    <div className="p-6 md:p-8 flex flex-col justify-between h-40 md:h-48">
                        <div>
                            <span className="block text-xs font-mono text-neutral-500 mb-2">01 / WHO</span>
                            <p className="text-xl font-medium tracking-tight">{t("footer_identity_name")}</p>
                            <p className="text-sm text-neutral-400 mt-1">{t("footer_identity_role")}</p>
                        </div>
                    </div>

                    {/* Col 2: Where */}
                    <div className="p-6 md:p-8 flex flex-col justify-between h-40 md:h-48">
                        <div>
                            <span className="block text-xs font-mono text-neutral-500 mb-2">{t("footer_time_label")}</span>
                            <LisbonTime className="text-xl font-medium tracking-tight tabular-nums" />
                            <p className="text-sm text-neutral-400 mt-1">{t("footer_location_city")}</p>
                        </div>
                    </div>

                    {/* Col 3: Socials */}
                    <div className="p-6 md:p-8 flex flex-col justify-between h-40 md:h-48">
                        <div>
                            <span className="block text-xs font-mono text-neutral-500 mb-4">02 / CONNECT</span>
                            <nav className="flex flex-col gap-2">
                                <FooterLink href="https://github.com/martim-ramos" label={t("footer_social_github")} />
                                <FooterLink href="https://www.linkedin.com/in/martim-ramos/" label={t("footer_social_linkedin")} />
                                <FooterLink href="mailto:martim.ramos@tecnico.ulisboa.pt" label={t("footer_social_email")} />
                            </nav>
                        </div>
                    </div>

                    {/* Col 4: Legal */}
                    <div className="p-6 md:p-8 flex flex-col justify-between h-40 md:h-48">
                        <div>
                            <span className="block text-xs font-mono text-neutral-500 mb-2">03 / LEGAL</span>
                            <p className="text-sm text-neutral-400">{t("footer_copyright")}</p>
                            <p className="text-sm text-neutral-500 mt-1 max-w-[150px]">{t("footer_credit")}</p>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}

function FooterLink({ href, label }: { href: string; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
        >
            <span className="text-sm tracking-tight">{label}</span>
            <span className="text-xs opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                ↗
            </span>
        </a>
    );
}
