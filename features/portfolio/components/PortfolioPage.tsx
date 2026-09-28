import { DarkSheet } from "@/components/common/DarkSheet";
import { ExperienceSection } from "@/features/portfolio/components/ExperienceSection";
import { HeroSection } from "@/features/portfolio/components/HeroSection";
import { RecommendationsSection } from "@/features/portfolio/components/RecommendationsSection";
import { SiteFooter } from "@/features/portfolio/components/SiteFooter";
import { SiteHeader } from "@/features/portfolio/components/SiteHeader";
import { ToolkitSection } from "@/features/portfolio/components/ToolkitSection";
import { WorkSection } from "@/features/portfolio/components/WorkSection";

export function PortfolioPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="top">
        <HeroSection />
        <WorkSection />
        {/* Chapter rhythm: paper → dark → sage → dark → light footer. */}
        <DarkSheet>
          <RecommendationsSection />
        </DarkSheet>
        <div className="surface-sage">
          <ExperienceSection />
        </div>
        <DarkSheet>
          <ToolkitSection />
        </DarkSheet>
      </main>
      <SiteFooter />
    </div>
  );
}
