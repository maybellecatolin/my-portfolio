"use client";

import * as m from "motion/react-m";
import Link from "next/link";
import { useState } from "react";

import { revealEase } from "@/components/common/motion";
import { useActiveIndex } from "@/features/portfolio/hooks/useActiveIndex";
import type { Project } from "@/features/portfolio/projects";

import { ProjectCarousel } from "./ProjectCarousel";
import styles from "./ProjectShowcase.module.css";

type Pointer = {
  index: number;
  /** Whether the pointer/focus is currently on the list. */
  onList: boolean;
  /** The scroll-driven project at the moment the pointer was last updated. */
  scrollActive: number;
};

/**
 * Sticky showcase.
 *   ≥ 768px   A typographic project list scrolls on the left while a pinned panel on
 *             the right crossfades to the project crossing the middle of the viewport
 *             (hover/focus also selects). Every project's carousel stays mounted, so
 *             slide position is kept; inactive layers are inert.
 *   < 768px   Each project stacks with its own carousel (the panel is hidden).
 */
export function ProjectShowcase({ projects }: { projects: readonly Project[] }) {
  // Which project the panel shows:
  // - while the mouse (or keyboard focus) is on the list, the project it's on;
  // - after it leaves (e.g. to use the panel's carousel), that project stays until
  //   the visitor scrolls to a different one;
  // - otherwise, the project crossing the middle of the viewport.
  const { active: scrollActive, register } = useActiveIndex();
  const [pointer, setPointer] = useState<Pointer | null>(null);
  const active = pointer && (pointer.onList || pointer.scrollActive === scrollActive) ? pointer.index : scrollActive;

  const point = (index: number) =>
    setPointer((current) =>
      current?.onList && current.index === index ? current : { index, onList: true, scrollActive },
    );
  const leaveList = () => setPointer((current) => current && { ...current, onList: false, scrollActive });

  return (
    <div className={styles.showcase}>
      <ol
        className={styles.list}
        onPointerLeave={leaveList}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) leaveList();
        }}
      >
        {projects.map((project, index) => {
          const href = `/projects/${project.slug}`;
          return (
            <li
              className={styles.item}
              data-active={index === active}
              key={project.slug}
              ref={register(index)}
              // Enter covers items scrolling under a still mouse; move re-asserts after a scroll.
              // Touch has no hover, so there the panel follows scrolling only.
              onPointerEnter={(event) => event.pointerType === "mouse" && point(index)}
              onPointerMove={(event) => event.pointerType === "mouse" && point(index)}
              onFocus={() => point(index)}
            >
              <div className={styles.inlineMedia}>
                <ProjectCarousel
                  images={project.images}
                  label={project.name}
                  href={href}
                  sizes="(min-width: 768px) 1px, 100vw"
                />
              </div>

              <m.div
                className={styles.text}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: revealEase }}
              >
                <p className={styles.meta}>{project.industry}</p>
                <h3 className={styles.title}>
                  {/* Stretched link: its ::after makes the whole text block clickable. */}
                  <Link className={styles.link} href={href}>
                    {project.name}
                  </Link>
                </h3>
                <p className={styles.summary}>{project.summary}</p>
                {project.disclaimer && (
                  <p className={styles.disclaimer}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 8v5M12 16h.01" />
                    </svg>
                    Illustrative mockups · actual product under NDA
                  </p>
                )}
                <ul className={styles.stack} aria-label="Key technologies">
                  {project.cardStack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
                <p className={styles.footer}>
                  <span>{project.timeline}</span>
                  <span className={styles.cta} aria-hidden="true">
                    View project <span className={styles.arrow}>→</span>
                  </span>
                </p>
              </m.div>
            </li>
          );
        })}
      </ol>

      <div className={styles.panel}>
        <div className={styles.panelInner}>
          <div className={styles.stage}>
            {projects.map((project, index) => {
              const isActive = index === active;
              return (
                <m.div
                  className={styles.layer}
                  key={project.slug}
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 1.04 }}
                  transition={{ duration: 0.7, ease: revealEase }}
                  inert={!isActive}
                  style={{ zIndex: isActive ? 1 : 0 }}
                >
                  <ProjectCarousel
                    images={project.images}
                    label={project.name}
                    href={`/projects/${project.slug}`}
                    sizes="(min-width: 1280px) 680px, 55vw"
                    preload={index === 0}
                    autoPlay={isActive}
                  />
                </m.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
