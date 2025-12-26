'use client';

import { Canvas } from '@react-three/fiber';
import {
    Environment,
    Float,
    PresentationControls,
    MeshDistortMaterial,
    Icosahedron
} from '@react-three/drei';
import { Suspense } from 'react';

function ProceduralShape() {
    return (
        <Float
            rotationIntensity={1}
            floatIntensity={2}
            speed={2}
        >
            <Icosahedron args={[1, 15]}>
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

export default function Hero3D() {
    return (
        <div className="absolute inset-0 -z-10">
            <Canvas
                dpr={[1, 1.5]}
                gl={{ antialias: false }}
                performance={{ min: 0.5 }}
                camera={{ position: [0, 0, 4], fov: 45 }}
            >
                <Suspense fallback={null}>
                    {/* Lighting */}
                    <ambientLight intensity={0.3} />
                    <directionalLight position={[5, 5, 5]} intensity={0.8} />

                    {/* Environment for reflections (low res for performance) */}
                    <Environment preset="city" resolution={256} />

                    {/* Interactive 3D shape */}
                    <PresentationControls
                        global={false}
                        rotation={[0.1, 0.1, 0]}
                        polar={[-0.2, 0.2]}
                        azimuth={[-0.5, 0.5]}
                        config={{ mass: 2, tension: 400 }}
                        snap={{ mass: 4, tension: 300 }}
                    >
                        <ProceduralShape />
                    </PresentationControls>
                </Suspense>
            </Canvas>
        </div>
    );
}
