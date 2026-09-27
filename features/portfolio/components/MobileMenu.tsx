"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { contact, navItems } from "@/features/portfolio/data";

import styles from "./SiteHeader.module.css";
import { Wordmark } from "./Wordmark";

// Must match the desktop breakpoint in SiteHeader.module.css.
const DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * Burger button + slide-in sidebar for mobile and tablet.
 * Built on the native <dialog>, which provides focus trapping, Esc to close,
 * focus return to the trigger, and an inert page behind it.
 */
export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    dialogRef.current?.showModal();
    setIsOpen(true);
  };
  const close = () => dialogRef.current?.close();

  // Close the sidebar if the viewport grows to the desktop layout while it's open.
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) dialogRef.current?.close();
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <button
        type="button"
        className={styles.burger}
        aria-label="Open menu"
        aria-controls="site-menu"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={open}
      >
        <span className={styles.burgerLines} aria-hidden="true" />
      </button>

      <dialog
        id="site-menu"
        ref={dialogRef}
        className={styles.drawer}
        aria-label="Site menu"
        onClose={() => setIsOpen(false)}
        // Clicks on the backdrop target the <dialog> itself, never the panel inside it.
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <Wordmark onClick={close} />
            <button type="button" className={styles.close} aria-label="Close menu" onClick={close}>
              <span className={styles.closeIcon} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile navigation">
            <ul className={styles.menuList}>
              {navItems.map((item, index) => (
                <li key={item.href} style={{ "--i": index } as CSSProperties}>
                  <a className={styles.menuLink} href={item.href} onClick={close}>
                    {item.label}
                    <span className={styles.menuArrow} aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.panelFoot}>
            {/* <a className={styles.panelCta} href={`mailto:${contact.email}`}>
              Let&apos;s talk <span aria-hidden="true">↗</span>
            </a> */}
            <p className={styles.panelStatus}>
              <span className={styles.statusDot} aria-hidden="true" />
              Open to new roles · Remote
            </p>
            <a className={styles.panelEmail} href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            <p className={styles.panelMeta}>{contact.location}</p>
          </div>
        </div>
      </dialog>
    </>
  );
}
