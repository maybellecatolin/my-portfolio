import type { MetadataRoute } from "next";

import { projects } from "@/features/portfolio/projects";
import { absoluteUrl } from "@/features/portfolio/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
      images: [absoluteUrl(`/og/${project.slug}.jpg`)],
    })),
  ];
}
