"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useTranslations } from "next-intl";

// Text Block Component
function TextBlock({
    children,
    opacity,
    y,
    className = "",
}: {
    children: React.ReactNode;
    opacity: MotionValue<number>;
    y: MotionValue<number>;
    className?: string;
}) {
    return (
        <motion.div
            className={`absolute inset-0 flex flex-col items-center justify-center px-6 md:px-12 text-center ${className}`}
            style={{ opacity, y }}
        >
            {children}
        </motion.div>
    );
}

// About Section - "The Human Touch" Scrollytelling
export function AboutSection() {
    const t = useTranslations();
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Block 1: 0% - 30% visible, then fade out
    const opacity1 = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.25, 0.35], [0, 0, -30]);

    // Block 2: Fade in 30% - 40%, visible until 60%, fade out
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], [30, 0, 0, -30]);

    // Block 3: Fade in 60% - 70%, stay visible
    const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 1], [0, 1, 1]);
    const y3 = useTransform(scrollYProgress, [0.55, 0.65, 1], [30, 0, 0]);

    // Scroll indicator fades out early
    const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    return (
        <section
            ref={containerRef}
            id="about"
            className="h-[300vh] relative bg-black"
        >
            {/* Sticky Content Container */}
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

                {/* Block 1: The Human */}
                <TextBlock opacity={opacity1} y={y1}>
                    <p className="text-4xl md:text-6xl lg:text-8xl font-medium tracking-tight text-white leading-tight max-w-4xl break-words">
                        {t("about_block1_line1")}
                    </p>
                    <p className="text-4xl md:text-6xl lg:text-8xl font-medium tracking-tight leading-tight max-w-4xl mt-2 break-words">
                        <span className="text-white">{t("about_block1_line2_prefix")}</span>
                        <span className="bg-gradient-to-r from-electric-400 to-blue-400 bg-clip-text text-transparent font-bold">
                            {t("about_block1_name")}
                        </span>
                        <span className="text-white">.</span>
                    </p>
                </TextBlock>

                {/* Block 2: The Credibility */}
                <TextBlock opacity={opacity2} y={y2}>
                    <p className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-tight max-w-4xl">
                        {t("about_block2_line1")}
                    </p>
                    <p className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-tight max-w-4xl mt-2">
                        {t("about_block2_line2")}
                    </p>
                    <p className="text-lg md:text-xl text-neutral-500 font-light mt-8 max-w-2xl">
                        {t("about_block2_subtext")}
                    </p>
                </TextBlock>

                {/* Block 3: The Pitch */}
                <TextBlock opacity={opacity3} y={y3}>
                    <p className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-tight max-w-4xl">
                        {t("about_block3_line1")}
                    </p>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-neutral-400 leading-tight max-w-3xl mt-6">
                        {t("about_block3_line2")}
                    </p>
                </TextBlock>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                    style={{ opacity: scrollIndicatorOpacity }}
                >
                    <span className="text-xs uppercase tracking-widest text-neutral-600">
                        {t("about_scroll_hint")}
                    </span>
                    <div className="w-5 h-8 rounded-full border border-neutral-700 flex items-start justify-center p-1.5">
                        <motion.div
                            className="w-0.5 h-1.5 rounded-full bg-neutral-500"
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
