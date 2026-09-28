"use client";

import Link from "next/link";

import { navItems, sectionIds } from "@/features/portfolio/data";
import { useActiveSection } from "@/features/portfolio/hooks/useActiveSection";

import styles from "./SiteHeader.module.css";

/** Desktop navigation; the link for the section in view is highlighted. */
export function HeaderNav() {
  const active = useActiveSection(sectionIds);

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      {navItems.map((item) => (
        <Link
          className={styles.navLink}
          href={`/#${item.id}`}
          key={item.id}
          aria-current={item.id === active ? "true" : undefined}
          data-track="nav_click"
          data-track-section={item.id}
          data-track-location="header"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
