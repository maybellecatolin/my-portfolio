import type { MouseEvent } from "react";

/** Fired on window after a jump, so scroll-driven UI can drop hover-based state. */
export const SECTION_JUMP_EVENT = "portfolio:section-jump";

/**
 * Click handler for "/#section" links. On the home page it scrolls to the section
 * itself, so clicking the same link twice works (a router navigation to the URL
 * you're already on doesn't scroll again). Elsewhere, e.g. on a project page, it
 * does nothing and the link navigates home as usual.
 *
 * scrollIntoView respects each section's scroll-margin-top and the page's CSS
 * scroll-behavior (smooth, or instant with reduced motion).
 */
export function scrollToSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
  if (window.location.pathname !== "/") return;
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  // "#top" is <main>, which starts below the in-flow header; go to the very top.
  if (id === "top") window.scrollTo({ top: 0 });
  else target.scrollIntoView({ block: "start" });
  window.history.replaceState(window.history.state, "", `#${id}`);
  window.dispatchEvent(new Event(SECTION_JUMP_EVENT));
}
