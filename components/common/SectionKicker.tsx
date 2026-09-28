import type { ReactNode } from "react";

export function SectionKicker({ children }: { children: ReactNode }) {
  return <p className="section-kicker">{children}</p>;
}
