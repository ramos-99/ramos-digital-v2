export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import HeroSection from "@/app/components/web/HeroSection";
import TechPipeline from "@/app/components/home/TechPipeline";
import ContactSection from "@/app/components/web/ContactSection";

// React 19 / Next 15 Pattern for Params
export default async function WebPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            {/* The 3D Hero */}
            <HeroSection />

            {/* Architecture Pipeline */}
            <TechPipeline />

            {/* Terminal Contact Form */}
            <ContactSection />
        </div>
    );
}

