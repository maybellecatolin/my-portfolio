"use client";

import { useSyncExternalStore, type ReactNode } from "react";

// Scroll distance after which the header lifts into its floating state.
const FLOAT_THRESHOLD = 8;

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

// Returns a boolean, so React only re-renders when the state actually flips.
const getSnapshot = () => window.scrollY > FLOAT_THRESHOLD;
const getServerSnapshot = () => false;

type StickyHeaderProps = {
  className: string;
  children: ReactNode;
};

export function StickyHeader({ className, children }: StickyHeaderProps) {
  const floating = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <header className={className} data-floating={floating || undefined}>
      {children}
    </header>
  );
}
