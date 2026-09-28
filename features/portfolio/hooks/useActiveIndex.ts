import { useEffect, useRef, useState } from "react";

/**
 * Tracks which of a list of elements is crossing the vertical centre of the
 * viewport. Attach `register(index)` as each element's ref; `active` is the index
 * of the element in the middle of the screen (initially the first).
 */
export function useActiveIndex() {
  const [active, setActive] = useState(0);
  const elements = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(elements.current.indexOf(entry.target as HTMLElement));
        }
      },
      // A zero-height band across the middle of the viewport.
      { rootMargin: "-50% 0px -50% 0px" },
    );
    elements.current.forEach((element) => element && observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const register = (index: number) => (element: HTMLElement | null) => {
    elements.current[index] = element;
  };

  return { active, register };
}
