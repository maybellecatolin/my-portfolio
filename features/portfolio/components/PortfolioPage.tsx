import { CapabilitiesSection } from "@/features/portfolio/components/CapabilitiesSection";
import { ExperienceSection } from "@/features/portfolio/components/ExperienceSection";
import { HeroSection } from "@/features/portfolio/components/HeroSection";
import { SiteFooter } from "@/features/portfolio/components/SiteFooter";
import { SiteHeader } from "@/features/portfolio/components/SiteHeader";
import { WorkSection } from "@/features/portfolio/components/WorkSection";

export function PortfolioPage() {
  return <div className="site-shell"><SiteHeader /><main id="top"><HeroSection /><section className="signal-strip" aria-label="Career highlights"><div><strong>11</strong><span>projects delivered</span></div><div><strong>03</strong><span>companies partnered with</span></div><div><strong>iOS + Android</strong><span>mobile releases owned</span></div><div><strong>WCAG</strong><span>accessibility minded</span></div></section><WorkSection /><ExperienceSection /><CapabilitiesSection /></main><SiteFooter /></div>;
}