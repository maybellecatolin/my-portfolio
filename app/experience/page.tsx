import type { Metadata } from "next";

import { ExperienceSection } from "@/features/portfolio/components/ExperienceSection";
import { SiteFooter } from "@/features/portfolio/components/SiteFooter";
import { SiteHeader } from "@/features/portfolio/components/SiteHeader";
import { absoluteUrl, jsonLd, site } from "@/features/portfolio/site";

const title = "Experience";
const description = `${site.name}'s career as a software engineer since 2018: companies, roles and the web and mobile products delivered at each.`;
const image = { url: "/og/home.jpg", width: 1200, height: 630, alt: `${site.name}, ${site.jobTitle}` };

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/experience" },
  openGraph: {
    type: "website",
    url: "/experience",
    siteName: site.name,
    locale: site.locale,
    title: `${title} | ${site.name}`,
    description,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${site.name}`,
    description,
    images: [image.url],
  },
};

const url = absoluteUrl("/experience");
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${url}#page`,
      url,
      name: `${title} | ${site.name}`,
      description,
      isPartOf: { "@id": absoluteUrl("/#website") },
      about: { "@id": absoluteUrl("/#person") },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: title, item: url },
      ],
    },
  ],
};

export default function ExperiencePage() {
  return (
    <div className="site-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <SiteHeader />
      {/* Same sage surface as on the home page. */}
      <main id="top" className="surface-sage">
        <ExperienceSection headingLevel="h1" />
      </main>
      <SiteFooter />
    </div>
  );
}
