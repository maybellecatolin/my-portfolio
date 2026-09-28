"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { revealEase } from "./motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait after entering the viewport; use for staggering siblings. */
  delay?: number;
  /** Use "span" inside headings and other phrasing content. */
  as?: "div" | "span";
};

/** Fades and lifts its content into place the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Component = as === "span" ? motion.span : motion.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: revealEase, delay }}
    >
      {children}
    </Component>
  );
}
