
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { HeroSection } from "@/app/components/web/HeroSection";

export default function WebPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            <Navbar />
            <HeroSection />
            {/* Temporary Placeholder Content */}
            <section className="container mx-auto px-6 py-24">
                <h2 className="text-3xl font-light mb-8">Selected Web Projects</h2>
                <p className="text-neutral-500">Project list coming soon...</p>
            </section>
            <Footer />
        </main>
    );
}
