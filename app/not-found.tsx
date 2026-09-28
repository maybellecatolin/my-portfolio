import type { Metadata } from "next";
import Link from "next/link";

import { SectionKicker } from "@/components/common/SectionKicker";
import { SiteFooter } from "@/features/portfolio/components/SiteFooter";
import { SiteHeader } from "@/features/portfolio/components/SiteHeader";

import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="top" className={`section-wrap ${styles.page}`}>
        <p className={styles.code} aria-hidden="true">
          404
        </p>
        <SectionKicker>Page not found</SectionKicker>
        <h1 className={styles.title}>
          This page took <em>a wrong turn.</em>
        </h1>
        <p className={styles.text}>
          The link may be old or mistyped. Everything else is right where you left it.
        </p>
        <div className={styles.actions}>
          <Link className={styles.primary} href="/">
            Back to home
          </Link>
          <Link className={styles.secondary} href="/#work">
            View my work <span aria-hidden="true">→</span>
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
