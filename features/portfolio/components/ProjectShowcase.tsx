"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { revealEase } from "@/components/common/Reveal";
import type { Project } from "@/features/portfolio/projects";

import { ProjectCarousel } from "./ProjectCarousel";
import styles from "./ProjectShowcase.module.css";

/**
 * Sticky showcase.
 *   ≥ 768px   A typographic project list scrolls on the left while a pinned panel on
 *             the right crossfades to the project crossing the middle of the viewport
 *             (hover/focus also selects). Every project's carousel stays mounted, so
 *             slide position is kept; inactive layers are inert.
 *   < 768px   Each project stacks with its own carousel (the panel is hidden).
 */
export function ProjectShowcase({ projects }: { projects: readonly Project[] }) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // The item crossing the vertical centre of the viewport becomes active.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    itemRefs.current.forEach((item) => item && observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.showcase}>
      <ol className={styles.list}>
        {projects.map((project, index) => {
          const href = `/projects/${project.slug}`;
          return (
            <li
              className={styles.item}
              data-active={index === active}
              data-index={index}
              key={project.slug}
              ref={(element) => {
                itemRefs.current[index] = element;
              }}
              onPointerEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
            >
              <div className={styles.inlineMedia}>
                <ProjectCarousel
                  images={project.images}
                  label={project.name}
                  href={href}
                  sizes="(min-width: 768px) 1px, 100vw"
                />
              </div>

              <motion.div
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
              </motion.div>
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
                <motion.div
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
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
