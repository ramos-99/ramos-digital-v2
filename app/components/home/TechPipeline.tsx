"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Database, Server, Monitor, ChevronRight, ArrowDown } from "lucide-react";

// --- ANIMATION VARIANTS ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 30,
        filter: "blur(10px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            type: "spring",
            stiffness: 50,
            damping: 20,
        },
    },
};

// --- 3D TILT CARD WRAPPER ---
function TiltCard({ children, color }: { children: React.ReactNode; color: string }) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

    const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
    const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

    // Glare effect position
    const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const normalizedX = (e.clientX - centerX) / rect.width;
        const normalizedY = (e.clientY - centerY) / rect.height;
        x.set(normalizedX);
        y.set(normalizedY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
            className="relative"
        >
            {children}
            {/* Glare Effect */}
            <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
                style={{
                    background: `radial-gradient(circle at ${glareX} ${glareY}, ${color}15, transparent 50%)`,
                }}
            />
        </motion.div>
    );
}

// --- PIPELINE CARD ---
interface PipelineCardProps {
    title: string;
    icon: React.ReactNode;
    techs: string[];
    color: string;
    isHovered: boolean;
    onHover: (hover: boolean) => void;
}

function PipelineCard({ title, icon, techs, color, isHovered, onHover }: PipelineCardProps) {
    return (
        <motion.div
            variants={itemVariants}
            className={`
                relative flex-1 min-w-[280px] p-6 cursor-pointer
                rounded-2xl border border-zinc-800/80
                bg-zinc-950/70 backdrop-blur-xl
                shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]
                transition-colors duration-300
                hover:bg-zinc-950/90 hover:border-zinc-700
            `}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            whileHover={{ scale: 1.02, y: -5 }}
            style={{
                boxShadow: isHovered
                    ? `inset 0 1px 0 0 rgba(255,255,255,0.08), 0 8px 24px -8px rgba(0,0,0,0.5), 0 0 20px ${color}15`
                    : "inset 0 1px 0 0 rgba(255,255,255,0.05), 0 4px 12px -4px rgba(0,0,0,0.3)",
            }}
        >
            {/* Glow Orb - contained within card */}
            <motion.div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: color }}
                animate={{ opacity: isHovered ? 0.3 : 0.1 }}
                transition={{ duration: 0.3 }}
            />

            {/* Icon Header */}
            <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 border border-white/10"
                style={{
                    backgroundColor: `${color}15`,
                    boxShadow: isHovered ? `0 0 20px ${color}40` : "none",
                    transition: "box-shadow 0.3s ease",
                }}
            >
                <motion.div
                    style={{ color }}
                    animate={{ scale: isHovered ? 1.15 : 1, rotate: isHovered ? 5 : 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    {icon}
                </motion.div>
            </div>

            {/* Title */}
            <h3 className="text-white font-bold text-xl mb-4 tracking-tight">{title}</h3>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
                {techs.map((tech) => (
                    <motion.span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-mono rounded-lg bg-white/5 text-white/60 border border-white/5"
                        whileHover={{
                            backgroundColor: `${color}25`,
                            color: "#fff",
                            borderColor: `${color}40`,
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        {tech}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
}

// --- CONNECTION LINE ---
function ConnectionLine({ animated, vertical = false }: { animated: boolean; vertical?: boolean }) {
    if (vertical) {
        return (
            <motion.div
                variants={itemVariants}
                className="flex lg:hidden items-center justify-center h-12 relative"
            >
                <div className="absolute w-0.5 h-full bg-gradient-to-b from-white/20 to-transparent" />
                <motion.div
                    className="absolute w-3 h-3 rounded-full bg-cyan-400"
                    animate={{ y: [-15, 15], opacity: [0, 1, 1, 0] }}
                    transition={{
                        duration: animated ? 0.6 : 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    style={{ boxShadow: "0 0 15px #22d3ee, 0 0 30px #22d3ee" }}
                />
                <ArrowDown className="w-4 h-4 text-white/30 absolute bottom-0" />
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={itemVariants}
            className="hidden lg:flex items-center justify-center w-20 relative"
        >
            {/* Gradient Line */}
            <div className="absolute h-0.5 w-full bg-gradient-to-r from-white/30 via-white/10 to-white/30" />

            {/* Multiple Animated Pulses */}
            {[0, 0.5].map((delay) => (
                <motion.div
                    key={delay}
                    className="absolute h-2.5 w-2.5 rounded-full bg-cyan-400"
                    animate={{ x: [-35, 35], opacity: [0, 1, 1, 0] }}
                    transition={{
                        duration: animated ? 0.7 : 1.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay,
                    }}
                    style={{ boxShadow: "0 0 15px #22d3ee, 0 0 30px #22d3ee" }}
                />
            ))}

            <ChevronRight className="w-5 h-5 text-white/40 absolute right-0" />
        </motion.div>
    );
}

// --- MAIN COMPONENT ---
export default function TechPipeline() {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const cards = [
        {
            title: "Data Layer",
            icon: <Database className="w-7 h-7" />,
            techs: ["PostgreSQL", "Supabase", "Redis"],
            color: "#22d3ee",
        },
        {
            title: "Logic Layer",
            icon: <Server className="w-7 h-7" />,
            techs: ["Next.js", "Node.js", "Python"],
            color: "#a855f7",
        },
        {
            title: "Client Layer",
            icon: <Monitor className="w-7 h-7" />,
            techs: ["React", "Tailwind", "Framer"],
            color: "#f97316",
        },
    ];

    return (
        <section className="relative w-full py-32 px-6 md:px-8 bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-950 border-t border-indigo-500/20 overflow-hidden">
            {/* Underwater Glow Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />

            <div className="relative max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                >
                    <motion.p
                        className="text-cyan-400 font-mono text-sm uppercase tracking-[0.3em] mb-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        Stack Tecnológico
                    </motion.p>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Architecture{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                            Pipeline
                        </span>
                    </h2>
                    <p className="text-slate-300/70 max-w-md mx-auto">
                        Fluxo de dados otimizado para máxima performance e escalabilidade
                    </p>
                </motion.div>

                {/* Pipeline Flow - Staggered Container */}
                <motion.div
                    className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-0"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {cards.map((card, index) => (
                        <div
                            key={card.title}
                            className="flex flex-col lg:flex-row items-center flex-1"
                        >
                            <TiltCard color={card.color}>
                                <PipelineCard
                                    {...card}
                                    isHovered={hoveredCard === index}
                                    onHover={(hover) => setHoveredCard(hover ? index : null)}
                                />
                            </TiltCard>
                            {index < cards.length - 1 && (
                                <>
                                    <ConnectionLine animated={hoveredCard !== null} />
                                    <ConnectionLine animated={hoveredCard !== null} vertical />
                                </>
                            )}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
