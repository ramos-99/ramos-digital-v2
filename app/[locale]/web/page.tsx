import HeroSection from "@/app/components/web/HeroSection";
import CapabilitiesSection from "@/app/components/web/SystemCapabilities";
import ContactSection from "@/app/components/web/ContactSection";

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// React 19 / Next 15 Pattern for Params
export default async function WebPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            {/* The ASCII Hero */}
            <HeroSection />

            {/* High-Fidelity Capabilities */}
            <CapabilitiesSection />

            {/* Terminal Contact Form */}
            <ContactSection />
        </div>
    );
}
