"use client";

import { useId, useState } from "react";

import type { recommendations } from "@/features/portfolio/data";

import styles from "./RecommendationsSection.module.css";

type RecommendationCardProps = {
  item: (typeof recommendations)[number];
  href: string;
};

/**
 * Desktop with a pointer: shows the opening lines and unfolds over the row on hover;
 * the whole card links to LinkedIn.
 * Phones, tablets and touch screens: shows the opening lines and expands in place on
 * tap (or via the Read more button); only the name links to LinkedIn.
 */
export function RecommendationCard({ item, href }: RecommendationCardProps) {
  const [expanded, setExpanded] = useState(false);
  const quoteId = useId();

  return (
    <figure
      className={styles.card}
      data-expanded={expanded}
      onClick={(event) => {
        // Taps on the name open LinkedIn; the toggle button handles itself.
        if ((event.target as HTMLElement).closest("a, button")) return;
        setExpanded((value) => !value);
      }}
    >
      <blockquote className={styles.quote} id={quoteId}>
        {item.text.map((paragraph) => (
          <p className={styles.text} key={paragraph}>
            {paragraph}
          </p>
        ))}
      </blockquote>
      <button
        type="button"
        className={styles.toggle}
        aria-controls={quoteId}
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
      >
        {expanded ? "Show less" : "Read more"}
      </button>
      <figcaption className={styles.person}>
        <a
          className={styles.name}
          href={href}
          target="_blank"
          rel="noreferrer"
          data-track="recommendation_click"
          data-track-person={item.name}
        >
          {item.name}
          <span className={styles.srOnly}> (recommendation on LinkedIn, opens in a new tab)</span>
        </a>
        <span className={styles.title}>{item.title}</span>
        <span className={styles.relationship}>{item.relationship}</span>
      </figcaption>
      <span className={styles.linkedinHint} aria-hidden="true">
        LinkedIn ↗
      </span>
    </figure>
  );
}
