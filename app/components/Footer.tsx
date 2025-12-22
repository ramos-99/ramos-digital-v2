"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/app/components/ui/Icons";

export function Footer() {
    const t = useTranslations();
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleLanguageChange = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <footer className="py-8 md:py-16 px-4 md:px-6 border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Left: Tagline */}
                    <div className="text-center md:text-left">
                        <p className="font-heading text-xl font-semibold mb-2">
                            {t("footer_tagline")}
                            <span className="text-electric-400">.</span>
                        </p>
                        <p className="text-white/40 text-sm">{t("footer_copyright")}</p>
                    </div>

                    {/* Right: Social Links */}
                    <div className="flex items-center gap-4">
                        {/* GitHub */}
                        <Link
                            href="https://github.com/martimramos"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 flex items-center justify-center transition-all duration-300 group"
                        >
                            <GithubIcon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                        </Link>

                        {/* LinkedIn */}
                        <Link
                            href="https://linkedin.com/in/martimramos"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 flex items-center justify-center transition-all duration-300 group"
                        >
                            <LinkedinIcon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                        </Link>

                        {/* Email */}
                        <Link
                            href="mailto:martim@ramosdigital.pt"
                            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 flex items-center justify-center transition-all duration-300 group"
                        >
                            <MailIcon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                        </Link>
                    </div>
                </div>

                {/* Bottom: Technical Credits + Language Switcher */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p
                        className="text-white/20 text-xs font-mono"
                        dangerouslySetInnerHTML={{ __html: t.raw("footer_built") }}
                    />

                    {/* Language Switcher */}
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1">
                        <button
                            onClick={() => handleLanguageChange("pt")}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${locale === "pt"
                                ? "bg-white text-black shadow-sm"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            PT
                        </button>
                        <button
                            onClick={() => handleLanguageChange("en")}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${locale === "en"
                                ? "bg-white text-black shadow-sm"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            EN
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
