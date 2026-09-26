import { CapabilitiesSection } from "@/features/portfolio/components/CapabilitiesSection";
import { ExperienceSection } from "@/features/portfolio/components/ExperienceSection";
import { HeroSection } from "@/features/portfolio/components/HeroSection";
import { SiteFooter } from "@/features/portfolio/components/SiteFooter";
import { SiteHeader } from "@/features/portfolio/components/SiteHeader";
import { WorkSection } from "@/features/portfolio/components/WorkSection";

export function PortfolioPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="top">
        <HeroSection />
        <WorkSection />
        <ExperienceSection />
        <CapabilitiesSection />
      </main>
      <SiteFooter />
    </div>
  );
}
