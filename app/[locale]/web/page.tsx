
import { HeroSection } from "@/app/components/web/HeroSection";
import { MarqueeSection } from "@/app/components/web/MarqueeSection";
import { ComparisonSection } from "@/app/components/web/ComparisonSection";
import { ProcessSection } from "@/app/components/web/ProcessSection";
import { PricingSection } from "@/app/components/web/PricingSection";
import { FAQSection } from "@/app/components/web/FAQSection";
import { ContactSection } from "@/app/components/web/ContactSection";

// Main Web Page Component
export default function WebPage() {
    return (
        <>
            <HeroSection />
            <MarqueeSection />
            <ComparisonSection />
            <ProcessSection />
            <PricingSection />
            <FAQSection />
            <ContactSection />
        </>
    );
}
