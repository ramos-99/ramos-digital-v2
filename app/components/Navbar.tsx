"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";

export function Navbar() {
    const { t } = useLanguage();
    const [showToast, setShowToast] = useState(false);

    const handleContactClick = useCallback(() => {
        navigator.clipboard.writeText("martim@ramosdigital.pt").then(() => {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        });
    }, []);

    return (
        <>
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4 md:px-2"
            >
                <div className="bg-[#0A0A0B]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-black/50 px-4 md:px-6 py-2.5 md:py-3 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="font-heading font-semibold text-base md:text-lg tracking-tight flex items-center gap-2"
                    >
                        <div className="w-2 h-2 rounded-full bg-white" />
                        <span className="text-white">martim</span>
                    </Link>

                    {/* Center: Main Link */}
                    <Link
                        href="/web"
                        className="flex items-center gap-1 text-xs md:text-sm text-white font-medium hover:text-electric-400 transition-colors group"
                    >
                        <span>{t("nav_web")}</span>
                        <svg
                            className="w-3 h-3 md:w-3.5 md:h-3.5 text-white/50 group-hover:text-electric-400 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 17L17 7M17 7H7M17 7V17"
                            />
                        </svg>
                    </Link>

                    {/* Right: Contact Button */}
                    <button
                        onClick={handleContactClick}
                        className="text-xs md:text-sm px-3 md:px-5 py-1.5 md:py-2 rounded-full bg-white text-black font-semibold hover:scale-105 hover:bg-gray-100 transition-all shadow-lg shadow-white/10 cursor-pointer"
                    >
                        {t("nav_contact")}
                    </button>
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
