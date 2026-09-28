import type { Metadata, Viewport } from "next";

import { Analytics } from "@/components/common/Analytics";
import { MotionProvider } from "@/components/common/MotionProvider";
import { site, siteUrl } from "@/features/portfolio/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: site.title,
    // Child pages (projects) set just their own name.
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: site.linkedin }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    locale: site.locale,
    title: site.title,
    description: site.description,
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: `${site.name}, ${site.jobTitle}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og/home.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { email: false, telephone: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#f2efe8",
  colorScheme: "light",
};

// Google Analytics loads only in production builds with a measurement ID set, so
// local development never sends data.
const gaId = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_GA_ID : undefined;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <MotionProvider>{children}</MotionProvider>
      </body>
      {gaId && <Analytics gaId={gaId} />}
    </html>
  );
}
