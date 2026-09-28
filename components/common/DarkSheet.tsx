"use client";

import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { useRef, type ReactNode } from "react";

import styles from "./DarkSheet.module.css";

/**
 * Full-width dark panel with rounded corners. As it scrolls into view it
 * grows from slightly inset to full width, so it feels like a sheet settling
 * into place over the page. Reduced motion is handled in CSS (not JS) so the
 * server and client render identical markup.
 */
export function DarkSheet({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 30%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  return (
    <m.div className={styles.sheet} ref={ref} style={{ scale }}>
      {children}
    </m.div>
  );
}
