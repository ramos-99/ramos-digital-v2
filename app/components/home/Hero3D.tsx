"use client";

import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF, ContactShadows, Html } from "@react-three/drei";
import { useSpring } from "@react-spring/core";
import { a as three, SpringValue } from "@react-spring/three";
import { useInView } from "react-intersection-observer";
import type { GLTF } from "three-stdlib";

// Type for the MacBook GLTF model
type MacGLTF = GLTF & {
    nodes: Record<string, THREE.Mesh>;
    materials: Record<string, THREE.Material>;
};

interface ModelProps {
    open: boolean;
    hinge: SpringValue<number>;
    [key: string]: unknown;
}

function Model({ open, hinge, ...props }: ModelProps) {
    const group = useRef<THREE.Group>(null!);
    const { nodes, materials } = useGLTF("/3d/mac-draco.glb") as MacGLTF;

    const [hovered, setHovered] = useState(false);
    useEffect(() => {
        document.body.style.cursor = hovered ? "pointer" : "auto";
    }, [hovered]);

    // Floating animation
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (group.current) {
            group.current.rotation.x = THREE.MathUtils.lerp(
                group.current.rotation.x,
                open ? Math.cos(t / 10) / 10 + 0.25 : 0,
                0.1
            );
            group.current.rotation.y = THREE.MathUtils.lerp(
                group.current.rotation.y,
                open ? Math.sin(t / 10) / 4 : 0,
                0.1
            );
            group.current.rotation.z = THREE.MathUtils.lerp(
                group.current.rotation.z,
                open ? Math.sin(t / 10) / 10 : 0,
                0.1
            );
            group.current.position.y = THREE.MathUtils.lerp(
                group.current.position.y,
                open ? (-2 + Math.sin(t)) / 3 : -4.3,
                0.1
            );
        }
    });

    return (
        <group
            ref={group}
            {...props}
            onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
            onPointerOut={() => setHovered(false)}
            dispose={null}
        >
            <three.group rotation-x={hinge} position={[0, -0.04, 0.41]}>
                <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
                    <mesh
                        material={materials.aluminium}
                        geometry={nodes["Cube008"].geometry}
                    />
                    <mesh
                        material={materials["matte.001"]}
                        geometry={nodes["Cube008_1"].geometry}
                    />
                    <mesh
                        material={materials["screen.001"]}
                        geometry={nodes["Cube008_2"].geometry}
                    />
                </group>
            </three.group>
            <mesh
                material={materials.keys}
                geometry={nodes.keyboard.geometry}
                position={[1.79, 0, 3.45]}
            />
            <group position={[0, -0.1, 3.39]}>
                <mesh
                    material={materials.aluminium}
                    geometry={nodes["Cube002"].geometry}
                />
                <mesh
                    material={materials.trackpad}
                    geometry={nodes["Cube002_1"].geometry}
                />
            </group>
            <mesh
                material={materials.touchbar}
                geometry={nodes.touchbar.geometry}
                position={[0, -0.03, 1.2]}
            />

            {/* Click to Open Label */}
            <Html position={[0, -1.5, 0]} center wrapperClass="pointer-events-none select-none">
                <div
                    style={{
                        opacity: open ? 0 : 1,
                        transition: "all 0.5s ease",
                        transform: open ? "translateY(10px)" : "translateY(0)",
                        fontFamily: "Inter, sans-serif",
                        color: "#888",
                        fontSize: "12px",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                    }}
                >
                    Click to Open
                </div>
            </Html>
        </group>
    );
}

export default function Hero3D() {
    const [open, setOpen] = useState(true);
    const [mounted, setMounted] = useState(false);
    const props = useSpring({ open: Number(open) });

    // Intersection Observer - stop rendering when out of view
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: false,
    });

    // Cinematic entrance animation
    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            ref={ref}
            className={`w-full h-full transition-all duration-1000 ease-out ${mounted ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-lg translate-y-10"
                }`}
        >
            {inView ? (
                <Canvas dpr={[1, 2]} gl={{ alpha: true }} camera={{ position: [0, 0, 30], fov: 35 }}>
                    <Suspense fallback={null}>
                        {/* Lights for dark background - enhanced for screen glow */}
                        <ambientLight intensity={0.6} />
                        <spotLight
                            position={[10, 10, 10]}
                            angle={0.15}
                            penumbra={1}
                            intensity={1.5}
                            castShadow
                        />
                        <pointLight position={[-10, -10, -10]} intensity={0.5} />
                        {/* Screen backlight */}
                        <pointLight position={[0, 5, 5]} intensity={0.8} color="#4f46e5" />

                        {/* The Laptop - scaled and positioned for breathing room */}
                        <group scale={0.7} position={[0, -1, 0]}>
                            <group rotation={[0.1, -0.2, 0]}>
                                <Model
                                    open={open}
                                    hinge={props.open.to([0, 1], [1.575, -0.425])}
                                    onClick={() => setOpen(!open)}
                                    position={[0, 0, 0]}
                                    scale={1.5}
                                />
                            </group>
                        </group>

                        {/* Environment for reflections */}
                        <Environment preset="city" />

                        {/* Stronger grounding shadow - grey on black background */}
                        <ContactShadows
                            position={[0, -4, 0]}
                            opacity={0.6}
                            scale={10}
                            blur={2}
                            far={4}
                            color="#333333"
                        />
                    </Suspense>
                </Canvas>
            ) : (
                // Placeholder to prevent layout shift (CLS)
                <div className="w-full h-full" />
            )}
        </div>
    );
}

// Preload the model
useGLTF.preload("/3d/mac-draco.glb");
