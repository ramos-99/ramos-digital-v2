export const runtime = 'edge';
export const dynamic = 'force-dynamic';
import { HeroSection } from "@/app/components/home/HeroSection";
import { AboutSection } from "@/app/components/home/AboutSection";
import { ServicesSection } from "@/app/components/home/ServicesSection";
import { ProjectsSection } from "@/app/components/home/ProjectsSection";

export const runtime = 'edge';

// Main Page Component
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </>
  );
}
