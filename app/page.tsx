import { PortfolioPage } from "@/features/portfolio/components/PortfolioPage";
import { career, toolkit } from "@/features/portfolio/data";
import { projects } from "@/features/portfolio/projects";
import { absoluteUrl, jsonLd, site } from "@/features/portfolio/site";

// Structured data: who this site is about, so search engines can show a rich result.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: absoluteUrl("/"),
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": absoluteUrl("/#person") },
    },
    {
      "@type": "Person",
      "@id": absoluteUrl("/#person"),
      name: site.name,
      url: absoluteUrl("/"),
      image: absoluteUrl("/og/home.jpg"),
      jobTitle: site.jobTitle,
      description: site.description,
      email: `mailto:${site.email}`,
      address: { "@type": "PostalAddress", addressLocality: "Iloilo", addressCountry: "PH" },
      sameAs: [site.linkedin],
      worksFor: { "@type": "Organization", name: career[0].company },
      knowsAbout: toolkit.flatMap((group) => group.tools).slice(0, 20),
      hasPart: projects.map((project) => ({
        "@type": "CreativeWork",
        name: project.name,
        url: absoluteUrl(`/projects/${project.slug}`),
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <PortfolioPage />
    </>
  );
}
