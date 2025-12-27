"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { DecryptedText } from "@/app/components/ui/DecryptedText";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

const rowVariants = {
    hidden: {
        opacity: 0,
        y: 60
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
    },
};

// Tech Pill Component
function TechPill({ name }: { name: string }) {
    return (
        <span className="px-2.5 py-1 text-[10px] font-mono text-neutral-500 border border-white/10 rounded">
            {name}
        </span>
    );
}

// Augen List Row Component
function AugenRow({
    index,
    label,
    title,
    description,
    techStack,
    decryptDelay = 0,
    isLast = false,
}: {
    index: string;
    label: string;
    title: string;
    description: string;
    techStack: string[];
    decryptDelay?: number;
    isLast?: boolean;
}) {
    return (
        <motion.div
            variants={rowVariants}
            className={`py-8 md:py-10 ${!isLast ? "border-b border-white/10" : ""}`}
        >
            <div className="grid grid-cols-12 gap-4 md:gap-6 items-start">
                {/* Left Column: Index & Label */}
                <div className="col-span-12 md:col-span-2">
                    <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
                        {index} / {label}
                    </span>
                </div>

                {/* Center Column: Title & Description */}
                <div className="col-span-12 md:col-span-6 lg:col-span-7">
                    <h3 className="text-2xl md:text-3xl font-medium text-white tracking-tight mb-3">
                        <DecryptedText
                            text={title}
                            delay={decryptDelay}
                            duration={600}
                        />
                    </h3>
                    <p className="text-sm md:text-base text-neutral-500 font-light">
                        {description}
                    </p>
                </div>

                {/* Right Column: Tech Stack */}
                <div className="col-span-12 md:col-span-4 lg:col-span-3 flex flex-wrap gap-2 md:justify-end mt-4 md:mt-0">
                    {techStack.map((tech) => (
                        <TechPill key={tech} name={tech} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

// Services Section - "Augen List" with Decryption Effect
export function ServicesSection() {
    const t = useTranslations();

    const rows = [
        {
            index: "01",
            label: "FRONTEND",
            title: t("pillar1_title"),
            description: t("pillar1_desc"),
            techStack: ["React", "Next.js", "TypeScript", "Tailwind"],
            decryptDelay: 200,
        },
        {
            index: "02",
            label: "ENGINEERING",
            title: t("pillar2_title"),
            description: t("pillar2_desc"),
            techStack: ["C++", "Rust", "PostgreSQL", "Node.js"],
            decryptDelay: 400,
        },
        {
            index: "03",
            label: "FUTURE",
            title: t("pillar3_title"),
            description: t("pillar3_desc"),
            techStack: ["Python", "OpenAI", "PyTorch"],
            decryptDelay: 600,
        },
    ];

    return (
        <section id="services" className="bg-neutral-950 py-16 md:py-20 px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    className="mb-10 md:mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter leading-none">
                        {t("services_title")}
                        <span className="text-electric-400">.</span>
                    </h2>
                </motion.div>

                {/* Augen List */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    className="border-t border-white/10"
                >
                    {rows.map((row, index) => (
                        <AugenRow
                            key={row.index}
                            index={row.index}
                            label={row.label}
                            title={row.title}
                            description={row.description}
                            techStack={row.techStack}
                            decryptDelay={row.decryptDelay}
                            isLast={index === rows.length - 1}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
