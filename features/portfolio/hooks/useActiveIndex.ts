import { useEffect, useRef, useState } from "react";

/**
 * Tracks which of a list of elements the reader has reached: the last one whose
 * top has passed the vertical middle of the viewport, or the first while none has
 * (e.g. while the section heading is still in the middle). Always derived from the
 * current scroll position, so a jump such as the "Work" link lands on the right
 * item instead of keeping whatever was active before.
 *
 * Attach `register(index)` as each element's ref.
 */
export function useActiveIndex() {
  const [active, setActive] = useState(0);
  const elements = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const middle = window.innerHeight / 2;
      let reached = 0;
      elements.current.forEach((element, index) => {
        if (element && element.getBoundingClientRect().top <= middle) reached = index;
      });
      setActive(reached);
    };
    // At most one measurement per frame while scrolling.
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const register = (index: number) => (element: HTMLElement | null) => {
    elements.current[index] = element;
  };

  return { active, register };
}
