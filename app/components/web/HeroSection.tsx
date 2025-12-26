"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import {
    Float,
    PresentationControls,
    MeshDistortMaterial,
    Icosahedron
} from "@react-three/drei";
import { Suspense } from "react";

function HolographicWireframe() {
    return (
        <Float
            rotationIntensity={1.5}
            floatIntensity={2}
            speed={3}
        >
            <Icosahedron args={[1.5, 4]}>
                <MeshDistortMaterial
                    color="#06b6d4"
                    wireframe={true}
                    roughness={0}
                    metalness={1}
                    distort={0.4}
                    speed={2}
                />
            </Icosahedron>
        </Float>
    );
}

export default function HeroSection() {
    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* TEXTO */}
            <div className="absolute z-10 text-center pointer-events-none mix-blend-difference px-4">
                <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-4 leading-none">
                    WEB
                    <br />
                    ENGINEERING
                </h1>
                <p className="text-white/60 text-lg md:text-xl font-mono tracking-widest uppercase">
                    Arquitetura robusta. Performance obsessiva.
                </p>
            </div>

            {/* CENA 3D - Holographic Wireframe */}
            <div className="absolute inset-0 z-0">
                <Canvas
                    dpr={[1, 1.5]}
                    gl={{ antialias: false }}
                    performance={{ min: 0.5 }}
                    camera={{ position: [0, 0, 5], fov: 45 }}
                >
                    <Suspense fallback={null}>
                        <color attach="background" args={['black']} />

                        {/* Studio Lighting for Cyberpunk Effect */}
                        <ambientLight intensity={0.2} />

                        {/* Main Light - White */}
                        <pointLight
                            position={[10, 10, 10]}
                            intensity={1.5}
                            color="#ffffff"
                        />

                        {/* Rim Light - Hot Pink backlight */}
                        <pointLight
                            position={[-10, -10, -10]}
                            intensity={2}
                            color="#ec4899"
                        />

                        {/* Interactive holographic shape */}
                        <PresentationControls
                            global={false}
                            rotation={[0.1, 0.1, 0]}
                            polar={[-0.3, 0.3]}
                            azimuth={[-0.5, 0.5]}
                        >
                            <HolographicWireframe />
                        </PresentationControls>
                    </Suspense>
                </Canvas>
            </div>
        </section>
    );
}
