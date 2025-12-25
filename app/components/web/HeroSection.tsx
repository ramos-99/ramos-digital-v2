"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { TorusKnot, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

function InteractiveHero() {
    const ref = useRef<THREE.Mesh>(null);
    const velocity = useRef({ x: 0, y: 0 });
    const lastPointer = useRef({ x: 0, y: 0 });

    useFrame((state, delta) => {
        if (ref.current) {
            // 1. ROTAÇÃO "ZEN" (Idle)
            // Gira apenas no eixo Z, CONSTANTE e LENTA
            ref.current.rotation.z -= delta * 0.05;

            // 2. INTERAÇÃO (Throw Physics)
            // Calculamos o movimento do rato (Delta)
            const deltaX = state.pointer.x - lastPointer.current.x;
            const deltaY = state.pointer.y - lastPointer.current.y;

            // Atualizamos a posição anterior
            lastPointer.current.x = state.pointer.x;
            lastPointer.current.y = state.pointer.y;

            // Adicionamos o MOVIMENTO à velocidade (Push)
            // Só adiciona força se o rato se mexer. Sem movimento = Sem força.
            velocity.current.x += deltaY * 2; // Rato Y roda eixo X
            velocity.current.y += deltaX * 2; // Rato X roda eixo Y

            // 3. FRICÇÃO (Travagem)
            // 0.90 abranda suavemente
            velocity.current.x *= 0.90;
            velocity.current.y *= 0.90;

            // 4. APLICAÇÃO & LIMITE DE VELOCIDADE
            // Limitamos a velocidade máxima a 0.05 (muito seguro)
            const MAX_SPEED = 0.05;
            const safeX = THREE.MathUtils.clamp(velocity.current.x, -MAX_SPEED, MAX_SPEED);
            const safeY = THREE.MathUtils.clamp(velocity.current.y, -MAX_SPEED, MAX_SPEED);

            ref.current.rotation.x += safeX;
            ref.current.rotation.y += safeY;
        }
    });

    return (
        /* Optimized Geometry kept for performance */
        /* Initial rotation to present the object nicely */
        <TorusKnot ref={ref} args={[1, 0.35, 64, 16]} rotation={[0.5, 0.5, 0]}>
            <meshStandardMaterial
                roughness={0.4} // suave, não espelho
                metalness={0.2} // ligeiro toque premium
                color="#2a2a2a" // dark grey/black elegant
            />
        </TorusKnot>
    );
}

export default function HeroSection() {
    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* TEXTO (Voltou ao Original) */}
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

            {/* CENA 3D */}
            <div className="absolute inset-0 z-0">
                {/* dpr=[1, 1.5] impede que ecrãs 4K matem a performance */}
                <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 45 }}>
                    <color attach="background" args={['black']} />

                    <Environment preset="studio" />
                    <ambientLight intensity={1} />
                    {/* Luz direcional para criar sombras suaves nas curvas */}
                    <directionalLight position={[5, 5, 5]} intensity={2} />

                    <InteractiveHero />

                </Canvas>
            </div>
        </section>
    );
}
