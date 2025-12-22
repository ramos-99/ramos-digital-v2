"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

// Projects Section Component
export function ProjectsSection() {
    const { t } = useLanguage();

    const projects = [
        {
            name: "Ramos Digital",
            domain: "ramosdigital.pt",
            description:
                "This platform. A showcase of engineering precision and modern web aesthetics.",
            tags: ["Tailwind CSS", "Performance"],
            colors: { from: "electric-500/20", to: "amber-500/10", accent: "electric" },
            initials: "RD",
        },
        {
            name: "Sarmento At Home",
            domain: "sarmentoathome.pt",
            description:
                "Premium culinary platform. Private dining experiences and exclusive chef services.",
            tags: ["Next.js", "E-Commerce"],
            colors: { from: "amber-500/20", to: "orange-500/10", accent: "amber" },
            initials: "SA",
        },
        {
            name: "SS Financial",
            domain: "ssfinancial.concept",
            description:
                "Fintech redesign concept. Modern banking interface with focus on clarity and trust.",
            tags: ["Figma", "UI Design"],
            colors: { from: "emerald-500/20", to: "teal-500/10", accent: "emerald" },
            initials: "SS",
        },
    ];

    return (
        <section id="projects" className="py-8 md:py-32 px-4 md:px-6 relative">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="mb-12">
                    <div className="flex items-end justify-between">
                        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
                            {t("projects_title")}
                            <span className="text-electric-400">.</span>
                        </h2>
                        <p className="text-white/40 text-sm hidden md:block">
                            {t("projects_scroll_hint")}
                        </p>
                    </div>
                </div>

                {/* Horizontal Scroll Container */}
                <div className="overflow-x-auto hide-scrollbar pb-4 -mx-6 px-6">
                    <div className="flex gap-6 snap-x snap-mandatory" style={{ width: "max-content" }}>
                        {projects.map((project, index) => (
                            <div key={index} className="group w-[300px] md:w-[400px] snap-start">
                                <div
                                    className={`rounded-2xl glass-card border border-white/10 hover:border-${project.colors.accent}-500/30 transition-all duration-500 overflow-hidden`}
                                >
                                    {/* Window Header */}
                                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                        </div>
                                        <span className="text-white/40 text-xs font-mono ml-2">
                                            {project.domain}
                                        </span>
                                    </div>

                                    {/* Project Preview */}
                                    <div
                                        className={`h-48 bg-gradient-to-br from-${project.colors.from} via-dark-800 to-${project.colors.to} flex items-center justify-center`}
                                    >
                                        <div className="text-center">
                                            <div
                                                className={`w-16 h-16 rounded-2xl bg-${project.colors.accent}-500/20 border border-${project.colors.accent}-500/30 flex items-center justify-center mx-auto mb-4`}
                                            >
                                                <span
                                                    className={`font-heading text-2xl font-bold text-${project.colors.accent}-400`}
                                                >
                                                    {project.initials}
                                                </span>
                                            </div>
                                            <p className="text-white/60 text-sm">
                                                {project.name === "Ramos Digital"
                                                    ? "Personal Engineering Hub"
                                                    : project.name === "Sarmento At Home"
                                                        ? "High-End Culinary"
                                                        : "Fintech Redesign"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Project Info */}
                                    <div className="p-6">
                                        <h3 className="font-heading text-xl font-semibold mb-2">
                                            {project.name}
                                        </h3>
                                        <p className="text-white/50 text-sm mb-4">{project.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* View All Projects Card */}
                        <div className="group w-[300px] snap-start">
                            <Link
                                href="#"
                                className="block h-full rounded-2xl glass-card border border-white/10 hover:border-white/20 transition-all duration-500 flex items-center justify-center min-h-[380px]"
                            >
                                <div className="text-center p-8">
                                    <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-4 group-hover:border-electric-500/50 group-hover:bg-electric-500/10 transition-all duration-300">
                                        <svg
                                            className="w-6 h-6 text-white/40 group-hover:text-electric-400 transition-colors"
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
                                    </div>
                                    <p className="text-white/60 font-medium">View All Projects</p>
                                    <p className="text-white/30 text-sm mt-1">Coming soon</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
