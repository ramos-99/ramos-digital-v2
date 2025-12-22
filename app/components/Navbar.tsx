"use client";

import { useState, useCallback, useTransition } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "@/app/components/ui/Icons";

export function Navbar() {
    const t = useTranslations();
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [showToast, setShowToast] = useState(false);

    const handleContactClick = useCallback(() => {
        navigator.clipboard.writeText("martim@ramosdigital.pt").then(() => {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        });
    }, []);

    const switchLanguage = useCallback((nextLocale: string) => {
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    }, [pathname, router]);

    // Smart Button Logic
    const isWebPage = pathname.startsWith("/web");
    const navLinkDest = isWebPage ? "/" : "/web";
    const navLinkText = isWebPage ? t("nav_home") : t("nav_work");

    return (
        <>
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4 md:px-2"
            >
                <div className="bg-[#0A0A0B]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-black/50 px-4 md:px-6 py-2.5 md:py-3 flex items-center justify-between">
                    {/* Logo (Home Link) */}
                    <Link
                        href="/"
                        className="font-heading font-semibold text-base md:text-lg tracking-tight flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                        <div className="w-2 h-2 rounded-full bg-electric-400" />
                        <span className="text-white">martim</span>
                    </Link>

                    {/* Center: Smart Main Link */}
                    <Link
                        href={navLinkDest}
                        className="flex items-center gap-1 text-xs md:text-sm text-white font-medium hover:text-electric-400 transition-colors group absolute left-1/2 -translate-x-1/2"
                    >
                        <span>{navLinkText}</span>
                        <ArrowUpRightIcon className="w-3 h-3 md:w-3.5 md:h-3.5 text-white/50 group-hover:text-electric-400 transition-colors" />
                    </Link>

                    {/* Right: Language + Contact */}
                    <div className="flex items-center gap-3 md:gap-4">
                        {/* Language Switcher */}
                        <div className="flex items-center gap-1.5 md:gap-2 text-xs font-medium">
                            <button
                                onClick={() => switchLanguage("pt")}
                                disabled={isPending}
                                className={`transition-colors ${locale === "pt" ? "text-white" : "text-white/40 hover:text-white/70"
                                    }`}
                            >
                                PT
                            </button>
                            <span className="text-white/20">|</span>
                            <button
                                onClick={() => switchLanguage("en")}
                                disabled={isPending}
                                className={`transition-colors ${locale === "en" ? "text-white" : "text-white/40 hover:text-white/70"
                                    }`}
                            >
                                EN
                            </button>
                        </div>

                        {/* Contact Button */}
                        <button
                            onClick={handleContactClick}
                            className="text-xs md:text-sm px-3 md:px-5 py-1.5 md:py-2 rounded-full bg-white text-black font-semibold hover:scale-105 hover:bg-gray-100 transition-all shadow-lg shadow-white/10 cursor-pointer"
                        >
                            {t("nav_contact")}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Toast Notification */}
            <div
                className={`fixed bottom-8 right-8 px-6 py-4 bg-emerald-500/90 backdrop-blur-xl rounded-xl text-white font-medium z-[9999] transition-all duration-300 ${showToast ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
                    }`}
            >
                {t("toast_email_copied")}
            </div>
        </>
    );
}
