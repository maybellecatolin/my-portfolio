"use client";

import { GoogleAnalytics, sendGAEvent } from "@next/third-parties/google";
import { useEffect } from "react";

/**
 * Google Analytics 4.
 * - Page views, including client-side navigation, are recorded by GA's Enhanced
 *   Measurement ("Page changes based on browser history events").
 * - Clicks: any element with `data-track="event_name"` sends that event. Extra
 *   `data-track-*` attributes become event parameters in snake_case, e.g.
 *   `data-track-project="sqr"` → `{ project: "sqr" }`.
 */
export function Analytics({ gaId }: { gaId: string }) {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const element = (event.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!element) return;
      const { track: name, ...data } = element.dataset;
      if (!name) return;
      const params: Record<string, string> = {};
      for (const [key, value] of Object.entries(data)) {
        if (key.startsWith("track") && value) {
          params[toSnakeCase(key.slice("track".length))] = value;
        }
      }
      sendGAEvent("event", name, params);
    };
    // Capture phase, so the event is queued before any navigation the click causes.
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return <GoogleAnalytics gaId={gaId} />;
}

// "Project" → "project", "LinkUrl" → "link_url"
const toSnakeCase = (key: string) => key.replace(/[A-Z]/g, (char, index) => (index ? "_" : "") + char.toLowerCase());
