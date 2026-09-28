"use client";

import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// - LazyMotion + `m` components ship only the animation features the site uses
//   (animations, in-view and hover gestures) instead of Motion's full bundle.
//   `strict` throws if a full `motion.*` component slips in by mistake.
// - reducedMotion="user" honours the visitor's setting for every motion component:
//   transforms are skipped, opacity fades still run.
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
