"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import {
    Environment,
    Float,
    PresentationControls,
    MeshDistortMaterial,
    Icosahedron
} from "@react-three/drei";
import { Suspense } from "react";

function ProceduralShape() {
    return (
        <Float
            rotationIntensity={1}
            floatIntensity={2}
            speed={2}
        >
            <Icosahedron args={[1.5, 15]}>
                <MeshDistortMaterial
                    color="#1a1a1a"
                    roughness={0.4}
                    metalness={0.8}
                    distort={0.3}
                    speed={1.5}
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

            {/* CENA 3D - High Performance */}
            <div className="absolute inset-0 z-0">
                <Canvas
                    dpr={[1, 1.5]}
                    gl={{ antialias: false }}
                    performance={{ min: 0.5 }}
                    camera={{ position: [0, 0, 5], fov: 45 }}
                >
                    <Suspense fallback={null}>
                        <color attach="background" args={['black']} />

                        {/* Lighting */}
                        <ambientLight intensity={0.3} />
                        <directionalLight position={[5, 5, 5]} intensity={0.8} />

                        {/* Low-res environment for subtle reflections */}
                        <Environment preset="city" resolution={256} />

                        {/* Interactive 3D shape */}
                        <PresentationControls
                            global={false}
                            rotation={[0.1, 0.1, 0]}
                            polar={[-0.3, 0.3]}
                            azimuth={[-0.5, 0.5]}
                            config={{ mass: 2, tension: 400 }}
                            snap={{ mass: 4, tension: 300 }}
                        >
                            <ProceduralShape />
                        </PresentationControls>
                    </Suspense>
                </Canvas>
            </div>
        </section>
    );
}

