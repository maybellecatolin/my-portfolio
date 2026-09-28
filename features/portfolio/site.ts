import { contact } from "@/features/portfolio/data";

/**
 * Site-wide identity used for metadata, social previews, the sitemap and
 * structured data.
 *
 * The public URL comes from SITE_URL (set it to your custom domain).
 * On Vercel it falls back to the project's production domain, and locally to
 * localhost, so canonical links and preview images always resolve.
 */
function resolveSiteUrl(): URL {
  // Only read on the server at build time, so it needs no NEXT_PUBLIC_ prefix (the
  // prefixed name still works). Empty values count as unset; a bare domain
  // ("example.com") gets https://.
  const configured =
    process.env.SITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (!configured) return new URL("http://localhost:3000");
  const withProtocol = /^https?:\/\//i.test(configured) ? configured : `https://${configured}`;
  try {
    return new URL(withProtocol);
  } catch {
    throw new Error(
      `SITE_URL is not a valid URL: "${configured}". Use a full address like https://example.com, or remove it.`,
    );
  }
}

export const siteUrl = resolveSiteUrl();

export const site = {
  name: "Maybelle Catolin",
  jobTitle: "Senior Software Engineer",
  title: "Maybelle Catolin | Senior Software Engineer, Frontend + Mobile",
  description:
    "Senior Software Engineer with 8+ years of experience designing and building enterprise web and mobile applications across digital identity, financial services, banking, insurance, security, and sports technology.",
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
