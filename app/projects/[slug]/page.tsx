import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/features/portfolio/components/ProjectDetail";
import { getProject, projects } from "@/features/portfolio/projects";
import { absoluteUrl, jsonLd, site } from "@/features/portfolio/site";

// Only the known projects exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};

  const path = `/projects/${project.slug}`;
  const title = `${project.name} case study`;
  const image = { url: `/og/${project.slug}.jpg`, width: 1200, height: 630, alt: `${project.name}: ${project.tagline}` };
  return {
    title,
    description: project.summary,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      siteName: site.name,
      locale: site.locale,
      title: `${title} | ${site.name}`,
      description: project.summary,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description: project.summary,
      images: [image.url],
    },
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const url = absoluteUrl(`/projects/${project.slug}`);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#project`,
        url,
        name: project.name,
        headline: project.tagline,
        description: project.overview,
        image: absoluteUrl(`/og/${project.slug}.jpg`),
        genre: project.industry,
        keywords: project.cardStack.join(", "),
        creator: { "@type": "Person", "@id": absoluteUrl("/#person"), name: site.name },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Work", item: absoluteUrl("/#work") },
          { "@type": "ListItem", position: 2, name: project.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <ProjectDetail project={project} />
    </>
  );
}
