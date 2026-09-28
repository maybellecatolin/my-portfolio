import { contact } from "@/features/portfolio/data";

/**
 * Site-wide identity used for metadata, social previews, the sitemap and
 * structured data.
 *
 * The public URL comes from NEXT_PUBLIC_SITE_URL (set it to your custom domain).
 * On Vercel it falls back to the project's production domain, and locally to
 * localhost, so canonical links and preview images always resolve.
 */
const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercelDomain ? `https://${vercelDomain}` : "http://localhost:3000"),
);

export const site = {
  name: "Maybelle Catolin",
  jobTitle: "Senior Software Engineer",
  title: "Maybelle Catolin | Senior Software Engineer, Frontend + Mobile",
  description:
    "Senior software engineer building secure, accessible web and mobile products with React, React Native and TypeScript, from digital identity and banking to insurance and sports tech.",
  keywords: [
    "Maybelle Catolin",
    "Senior Software Engineer",
    "Frontend Engineer",
    "React Developer",
    "React Native Developer",
    "TypeScript",
    "Next.js",
    "Mobile App Developer",
    "Digital Identity",
    "Fintech",
    "Web Accessibility",
    "Philippines",
    "Remote",
  ],
  locale: "en_US",
  email: contact.email,
  location: contact.location,
  linkedin: contact.linkedin,
} as const;

/** Absolute URL for a path on this site. */
export const absoluteUrl = (path = "/") => new URL(path, siteUrl).toString();

/** Serialise JSON-LD for a <script> tag, escaping "<" so content can't close the tag. */
export const jsonLd = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");
