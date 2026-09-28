"use client";

import { motion, useScroll } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { revealEase } from "@/components/common/Reveal";
import type { career } from "@/features/portfolio/data";

import styles from "./ExperienceSection.module.css";

type CareerTimelineProps = {
  items: typeof career;
};

/**
 * Scroll-driven timeline, no clicks needed:
 * - each company fades up into place as it scrolls into view;
 * - a coral progress line fills the rail as you read;
 * - each marker lights up when the line reaches it, and the company crossing the
 *   middle of the screen is highlighted.
 */
export function CareerTimeline({ items }: CareerTimelineProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const entryRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start center", "end center"] });

  // The entry crossing the vertical centre of the viewport becomes active.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    entryRefs.current.forEach((entry) => entry && observer.observe(entry));
    return () => observer.disconnect();
  }, []);

  return (
    <ol className={styles.timeline} ref={listRef}>
      <motion.span className={styles.progress} style={{ scaleY: scrollYProgress }} aria-hidden="true" />

      {items.map((item, index) => (
        <motion.li
          className={styles.entry}
          data-active={index === active}
          data-reached={index <= active}
          data-current={item.current}
          data-index={index}
          key={item.company}
          ref={(element: HTMLLIElement | null) => {
            entryRefs.current[index] = element;
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: revealEase }}
        >
          <span className={styles.marker} aria-hidden="true" />

          <div className={styles.entryHead}>
            <p className={styles.period}>
              {item.period}
              {item.current && <span className={styles.nowBadge}>Current</span>}
            </p>
            <h3 className={styles.company}>{item.company}</h3>
            <p className={styles.role}>{item.role}</p>
          </div>

          <div className={styles.details}>
            <p className={styles.summary}>{item.summary}</p>

            <dl className={styles.facets}>
              <div>
                <dt>Focus</dt>
                <dd>{item.domains.join(" · ")}</dd>
              </div>
              <div>
                <dt>Scope</dt>
                <dd>
                  <ul className={styles.chips}>
                    {item.scope.map((scope) => (
                      <li key={scope}>{scope}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>

            <p className={styles.projectsLabel}>Products delivered</p>
            <ul className={styles.projects}>
              {item.projects.map((project) => (
                <li key={`${project.name}-${project.detail}`}>
                  <Link className={styles.projectLink} href={`/projects/${project.slug}`}>
                    <span className={styles.projectName}>{project.name}</span>
                    <span className={styles.projectDetail}>{project.detail}</span>
                    <span className={styles.projectArrow} aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
