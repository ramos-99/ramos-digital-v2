"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import BlurFade from "@/app/components/ui/BlurFade";

// Project Data
const projects = [
  {
    key: "project_ramos",
    src: "/mannequin-baked.jpg",
    color: "#000000",
  },
  {
    key: "project_fintech",
    src: "/fintech-concept.png",
    color: "#1e1e2e",
  },
  {
    key: "project_food",
    src: "/food-concept.png",
    color: "#2a2a2a",
  },
];

export function ProjectsSection() {
  const t = useTranslations();
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Progress for smooth entry/exit
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Track from when section enters bottom to when it leaves top
  });

  // Smooth scroll opacity: fade in (0-0.15) and fade out (0.85-1)
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  // Smooth scroll blur: blur out (0-0.15) and blur in (0.85-1)
  const filter = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);
  // Subtle scale effect: slowly scale up (0.95 -> 1)
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.95, 1, 1, 0.95]);


  // Default to first project if none active
  const currentProjectIndex = activeProject !== null ? activeProject : 0;
  const currentProject = projects[currentProjectIndex];

  return (
    <motion.section
      ref={containerRef}
      id="projects"
      className="bg-white py-24 md:py-32 px-4 md:px-6 relative"
      style={{ opacity, filter, scale }}
    >
      <BlurFade yOffset={40} blur="20px">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-16 md:mb-24 flex items-baseline gap-4">
            <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight">
              {t("projects_title")}
              <span className="text-electric-400">.</span>
            </h2>
            <span className="text-sm font-mono text-neutral-500 hidden md:inline-block">
              (2025)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left Column: Project List */}
            <div className="flex flex-col gap-12 md:gap-0 relative z-20">
              {projects.map((project, index) => {
                const isHovered = activeProject === index;
                const isDimmed = activeProject !== null && !isHovered;

                return (
                  <div
                    key={project.key}
                    onMouseEnter={() => setActiveProject(index)}
                    onMouseLeave={() => setActiveProject(null)}
                    className="group py-0 md:py-12 md:border-t border-neutral-200 cursor-pointer transition-opacity duration-500"
                    style={{ opacity: isDimmed ? 0.3 : 1 }}
                  >
                    <div className="flex flex-col gap-4 md:gap-2">
                      {/* Mobile Image (Inline) */}
                      <div className="lg:hidden w-full aspect-[4/3] relative rounded-xl overflow-hidden mb-4">
                        <Image
                          src={project.src}
                          alt={t(`${project.key}_title`)}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <span className="text-xs font-mono text-neutral-400">
                        0{index + 1}
                      </span>
                      <h3 className="text-3xl md:text-5xl font-medium text-black tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                        {t(`${project.key}_title`)}
                      </h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm md:text-base font-mono text-neutral-500">
                          {t(`${project.key}_type`)}
                        </span>
                        <span className="text-sm font-mono text-neutral-400">
                          {t(`${project.key}_status`)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="hidden md:block border-t border-neutral-200" />
            </div>

            {/* Right Column: Sticky Image Canvas */}
            <div className="hidden lg:block h-[80vh] sticky top-24 rounded-3xl bg-neutral-50 border border-neutral-100 p-8 overflow-hidden">

              {/* Centered Image Container */}
              <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProject ? currentProject.key : "empty"}
                    className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {currentProject && (
                      <Image
                        src={currentProject.src}
                        alt={t(`${currentProject.key}_title`)}
                        fill
                        className="object-cover"
                        priority
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

          </div>
        </div>
      </BlurFade>
    </motion.section>
  );
}
