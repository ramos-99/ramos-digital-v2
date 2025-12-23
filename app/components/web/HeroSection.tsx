"use client";
import { useEffect, useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AsciiEffect } from 'three-stdlib';
import * as THREE from 'three';
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";

// 1. ASCII Renderer (Production Mode)
function AsciiRenderer() {
    const { gl, size, scene, camera } = useThree();
    const effectRef = useRef<AsciiEffect | null>(null);

    useLayoutEffect(() => {
        const characters = ' .:-+*=%@#';
        const effect = new AsciiEffect(gl, characters, {
            invert: true,
            resolution: 0.18 // Clean, retro resolution
        });

        // Styles
        effect.domElement.style.position = 'absolute';
        effect.domElement.style.top = '0';
        effect.domElement.style.left = '0';
        effect.domElement.style.width = '100%';
        effect.domElement.style.height = '100%';
        effect.domElement.style.pointerEvents = 'none';
        effect.domElement.style.color = 'white';
        effect.domElement.style.backgroundColor = 'transparent';

        effectRef.current = effect;
        gl.domElement.parentNode?.appendChild(effect.domElement);

        return () => {
            if (effect.domElement && effect.domElement.parentNode) {
                effect.domElement.parentNode.removeChild(effect.domElement);
            }
        };

    }, [gl]);

    // Resize Handler
    useEffect(() => {
        if (effectRef.current && size.width > 0 && size.height > 0) {
            effectRef.current.setSize(size.width, size.height);
        }
    }, [size]);

    // Render Loop
    useFrame(() => {
        if (effectRef.current && size.width > 0 && size.height > 0) {
            effectRef.current.render(scene, camera);
        }
    }, 1);

    return null;
}

// 2. Spinning Geometry (Production Material)
function SpinningGeometry() {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x += delta * 0.2;
            ref.current.rotation.y += delta * 0.25;
        }
    });

    return (
        <mesh ref={ref}>
            <torusKnotGeometry args={[1, 0.3, 128, 32]} />

            {/* Standard Material with low metalness for visibility */}
            <meshStandardMaterial
                color="white"
                roughness={0.4}
                metalness={0.2}
                emissive="#222"
            />
        </mesh>
    );
}

// 3. Layout (Clean)
export function HeroSection() {
    const t = useTranslations();

    return (
        <section className="h-screen bg-black flex flex-col lg:flex-row overflow-hidden relative">

            {/* LEFT COLUMN: Typography */}
            <div className="w-full lg:w-1/2 p-8 lg:p-20 z-10 flex flex-col justify-center h-full relative">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6"
                >
                    SYSTEM_ <br />
                    <span className="text-white/50">ONLINE</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xl text-white/70 font-mono max-w-md leading-relaxed border-l-2 border-white/20 pl-6"
                >
                    {t("hero_subtitle")}
                </motion.p>
            </div>

            {/* RIGHT COLUMN: 3D Visualization */}
            <div className="flex-1 w-full lg:w-auto h-[50vh] lg:h-full relative flex items-center justify-center bg-transparent">
                <div className="absolute inset-0">
                    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                        <color attach="background" args={['black']} />

                        {/* Lighting Setup */}
                        <ambientLight intensity={1} />
                        <directionalLight position={[10, 10, 5]} intensity={2} color="white" />
                        <pointLight position={[-10, -10, -10]} intensity={1} color="#666" />

                        <SpinningGeometry />
                        <AsciiRenderer />
                    </Canvas>
                </div>
            </div>

        </section>
    );
}
