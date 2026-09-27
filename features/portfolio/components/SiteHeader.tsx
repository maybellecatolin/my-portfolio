import { contact, navItems } from "@/features/portfolio/data";

import { MobileMenu } from "./MobileMenu";
import styles from "./SiteHeader.module.css";
import { StickyHeader } from "./StickyHeader";
import { Wordmark } from "./Wordmark";

export function SiteHeader() {
  return (
    <>
      <a className={styles.skipLink} href="#top">
        Skip to content
      </a>
      <StickyHeader className={styles.header}>
        <div className={styles.bar}>
          <Wordmark />

          <nav className={styles.nav} aria-label="Main navigation">
            {navItems.map((item) => (
              <a className={styles.navLink} href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          {/* <a className={styles.cta} href={`mailto:${contact.email}`}>
            Let&apos;s talk <span aria-hidden="true">↗</span>
          </a> */}

          <MobileMenu />
        </div>
      </StickyHeader>
    </>
  );
}
