import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import type { SectionId } from "@/features/portfolio/data";

/**
 * Scroll-spy for the header: returns the id of the section crossing the middle of
 * the viewport on the home page (null over the hero). On project pages, "work" is
 * current, since every project belongs to that section.
 */
export function useActiveSection(ids: readonly SectionId[]): SectionId | null {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    if (!onHome) return;
    const intersecting = new Set<SectionId>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as SectionId;
          if (entry.isIntersecting) intersecting.add(id);
          else intersecting.delete(id);
        }
        setActive(ids.find((id) => intersecting.has(id)) ?? null);
      },
      // A zero-height band across the middle of the viewport.
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const id of ids) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [ids, onHome]);

  if (pathname.startsWith("/projects/")) return "work";
  return onHome ? active : null;
}
