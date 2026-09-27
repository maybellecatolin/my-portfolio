"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Honour the visitor's reduced-motion setting for every motion component:
// transforms are skipped, opacity fades still run.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
