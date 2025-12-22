
import { HeroSection } from "@/app/components/home/HeroSection";
import { FeatureSection } from "@/app/components/home/FeatureSection";
import { AboutSection } from "@/app/components/home/AboutSection";
import { ServicesSection } from "@/app/components/home/ServicesSection";
import { ProjectsSection } from "@/app/components/home/ProjectsSection";

// Main Page Component
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </>
  );
}
