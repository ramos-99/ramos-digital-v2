"use client";

import Image from "next/image";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="h-screen w-full bg-white relative overflow-hidden"
    >
      {/* Baked Image - Contains all fog/noise effects pre-rendered */}
      <div className="absolute inset-0 p-4 md:p-0 pt-32 md:pt-48 translate-y-8">
        <Image
          src="/mannequin-baked.jpg"
          alt="Editorial Mannequin"
          fill
          className="object-contain object-bottom"
          priority
        />
      </div>

      {/* Editorial Typography & Scroll Indicator - Bottom Left */}
      <div className="absolute bottom-12 md:bottom-16 left-12 md:left-16 z-10 flex items-end gap-6">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-black/80 leading-relaxed">
          Martim Ramos.
          <br />
          Beyond Software.
        </p>

        {/* Scroll Indicator */}
        <div className="w-5 h-8 rounded-full border border-black/30 flex items-start justify-center p-1.5 mb-0.5 opacity-60">
          <div className="w-0.5 h-1.5 rounded-full bg-black/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
