"use client";
import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import {
    Cpu, Globe, CreditCard, LayoutTemplate,
    Atom, Database, Cloud, Zap
} from "lucide-react";

// --- CONFIGURATION ---
const TECHNOLOGIES = [
    { name: "OpenAI", icon: Cpu, color: "#10a37f" },
    { name: "Social", icon: Globe, color: "#E1306C" },
    { name: "Stripe", icon: CreditCard, color: "#635BFF" },
    { name: "Next.js", icon: LayoutTemplate, color: "#ffffff" },
    { name: "React", icon: Atom, color: "#61DAFB" },
    { name: "Data", icon: Database, color: "#336791" },
    { name: "AWS", icon: Cloud, color: "#FF9900" },
    { name: "Speed", icon: Zap, color: "#FFD700" },
];

// --- OTIMIZAÇÃO DE QUALIDADE (Supersampling) ---
function TechItem({ position, tech }: { position: THREE.Vector3, tech: any }) {
    // Removemos estados de hover/click para performance e simplicidade
    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>

                {/* >           TRUQUE DE SUPERSAMPLING:
              1. `scale={0.25}`: Encolhe o elemento HTML para 1/4 do tamanho no mundo 3D.
              2. CSS gigante (w-64, text-4xl): O browser renderiza em altíssima resolução.
              RESULTADO: Ícones e texto perfeitamente nítidos, sem pixeis.
            */}
                <Html transform distanceFactor={15} scale={0.25} style={{ pointerEvents: 'none' }}>
                    {/* Adicionado outline-none/ring-0 para evitar highlights de clique */}
                    <div className="flex flex-col items-center justify-center transform-gpu outline-none ring-0 border-none select-none">

                        {/* Ícone Gigante (Renderizado em alta res) */}
                        <div className="relative flex items-center justify-center p-4">
                            <tech.icon
                                size={128} // Tamanho enorme para nitidez máxima
                                color={tech.color} // Usa a cor da marca diretamente
                                className="drop-shadow-lg filter" // Sombra suave
                                strokeWidth={1.5}
                            />
                        </div>

                        {/* Texto Gigante (Para não ficar pixelizado) */}
                        <span
                            className="mt-4 text-4xl font-sans font-bold tracking-widest uppercase whitespace-nowrap"
                            style={{ color: tech.color, opacity: 0.8 }}
                        >
                            {tech.name}
                        </span>
                    </div>
                </Html>
            </Float>
        </group>
    );
}

// --- THE SPHERE CONTAINER ---
function TechSphere() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.05; // Slower, cleaner rotation
        }
    });

    // Math: Distribute points on a sphere (Fibonacci Sphere Algorithm)
    const items = useMemo(() => {
        const goldenRatio = (1 + 5 ** 0.5) / 2;
        return TECHNOLOGIES.map((tech, i) => {
            const theta = 2 * Math.PI * i / goldenRatio;
            const phi = Math.acos(1 - 2 * (i + 0.5) / TECHNOLOGIES.length);

            const radius = 3.5; // Size of the sphere
            const x = Math.cos(theta) * Math.sin(phi) * radius;
            const y = Math.sin(theta) * Math.sin(phi) * radius;
            const z = Math.cos(phi) * radius;

            return { tech, pos: new THREE.Vector3(x, y, z) };
        });
    }, []);

    return (
        <group ref={groupRef}>
            {items.map((item, i) => (
                <TechItem key={item.tech.name} position={item.pos} tech={item.tech} />
            ))}
        </group>
    );
}

// --- CUSTOM FPS COUNTER (No Dependencies) ---
function FPSCounter() {
    const ref = useRef<HTMLDivElement>(null);
    useFrame((state, delta) => {
        if (ref.current) {
            // Cap at 999 to avoid layout shifts, round to integer
            const fps = Math.min(999, Math.round(1 / delta));
            ref.current.innerText = `FPS: ${fps}`;
            // Color coding based on performance
            ref.current.style.color = fps < 30 ? '#ef4444' : fps < 55 ? '#eab308' : '#22c55e';
        }
    });

    return (
        <Html fullscreen style={{ pointerEvents: 'none', zIndex: 100 }}>
            <div className="absolute top-4 left-4 font-mono text-xs p-2 bg-black/80 backdrop-blur-sm border border-white/10 rounded flex items-center gap-2 shadow-xl">
                <div className="w-2 h-2 rounded-full bg-current animate-pulse" style={{ backgroundColor: 'currentColor' }} />
                <span ref={ref} className="font-bold">FPS: --</span>
                <span className="opacity-50">WEBGL</span>
            </div>
        </Html>
    );
}

// --- MAIN SECTION ---
export default function CapabilitiesSection() {
    return (
        <section className="container mx-auto px-6 py-24 overflow-hidden relative">
            <div className="container mx-auto px-6 mb-10 text-center relative z-10 pointer-events-none">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4">
                    Tech Stack
                </h2>
                <p className="text-white/40 font-mono text-sm">
                    ARRASTA PARA INTERAGIR
                </p>
            </div>

            <div className="h-[500px] w-full relative z-0 cursor-grab active:cursor-grabbing">
                {/* Increased DPR for maximum sharpness on retina screens */}
                <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 50 }}>
                    <FPSCounter />
                    <ambientLight intensity={0.5} />
                    <TechSphere />
                    <OrbitControls
                        enableZoom={false}
                        autoRotate={false}
                        enablePan={false}
                        rotateSpeed={0.5}
                        dampingFactor={0.1}
                        enableDamping={true}
                    />
                </Canvas>
            </div>

            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </section>
    );
}
