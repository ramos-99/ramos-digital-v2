"use client";
import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("@/app/components/home/Hero3D"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
    ),
});

export default function HeroSection() {
    return (
        <section className="w-full min-h-screen bg-black">
            <div className="grid lg:grid-cols-2 min-h-screen">
                {/* LEFT COLUMN - Text */}
                <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-20 lg:py-0 order-2 lg:order-1">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 leading-[0.9]">
                        WEB
                        <br />
                        <span className="text-white/80">ENGINEERING</span>
                    </h1>
                    <p className="text-white/50 text-lg md:text-xl font-mono tracking-widest uppercase max-w-md">
                        Arquitetura robusta. Performance obsessiva.
                    </p>
                </div>

                {/* RIGHT COLUMN - 3D Atom */}
                <div className="h-[400px] lg:h-screen order-1 lg:order-2">
                    <Hero3D />
                </div>
            </div>
        </section>
    );
}
