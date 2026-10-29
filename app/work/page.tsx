import type { Metadata } from "next";

import { SiteFooter } from "@/features/portfolio/components/SiteFooter";
import { SiteHeader } from "@/features/portfolio/components/SiteHeader";
import { WorkSection } from "@/features/portfolio/components/WorkSection";
import { projects } from "@/features/portfolio/projects";
import { absoluteUrl, jsonLd, site } from "@/features/portfolio/site";

const title = "Work";
const description = `Web and mobile products built by ${site.name}: digital identity, mobile banking, insurance, fintech and sports apps, each with a full case study.`;
const image = { url: "/og/home.jpg", width: 1200, height: 630, alt: `${site.name}, ${site.jobTitle}` };

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    url: "/work",
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

const url = absoluteUrl("/work");
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${url}#page`,
      url,
      name: `${title} | ${site.name}`,
      description,
      isPartOf: { "@id": absoluteUrl("/#website") },
      about: { "@id": absoluteUrl("/#person") },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: project.name,
          url: absoluteUrl(`/projects/${project.slug}`),
        })),
      },
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

export default function WorkPage() {
  return (
    <div className="site-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <SiteHeader />
      <main id="top">
        <WorkSection headingLevel="h1" />
      </main>
      <SiteFooter />
    </div>
  );
}
