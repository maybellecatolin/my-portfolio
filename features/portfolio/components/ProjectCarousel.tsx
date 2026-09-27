"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";

import type { ProjectImage } from "@/features/portfolio/projects";

import styles from "./ProjectCarousel.module.css";

type ProjectCarouselProps = {
  images: readonly ProjectImage[];
  /** Project name, used in accessible labels. */
  label: string;
  /** When set, each slide links here (used on the Work cards). */
  href?: string;
  sizes: string;
  preload?: boolean;
  showCaption?: boolean;
};

/**
 * Lightweight image carousel on native CSS scroll-snap: touch/trackpad swipe,
 * arrow buttons and dots, with wrap-around. No third-party dependency.
 */
export function ProjectCarousel({ images, label, href, sizes, preload = false, showCaption = false }: ProjectCarouselProps) {
  const trackId = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = images.length;

  // Smooth vs instant scrolling comes from CSS, so reduced-motion is respected.
  const goTo = (target: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: ((target + count) % count) * track.clientWidth });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (track) setIndex(Math.round(track.scrollLeft / track.clientWidth));
  };

  return (
    <div className={styles.root} role="region" aria-roledescription="carousel" aria-label={`${label} screenshots`}>
      <div className={styles.frame}>
        <div className={styles.track} id={trackId} ref={trackRef} onScroll={onScroll}>
          {images.map((image, slideIndex) => {
            const picture = (
              <Image
                className={styles.image}
                src={image.src}
                alt={image.alt}
                fill
                sizes={sizes}
                preload={preload && slideIndex === 0}
              />
            );
            return (
              <div
                className={styles.slide}
                key={image.src}
                role="group"
                aria-roledescription="slide"
                aria-label={`${slideIndex + 1} of ${count}: ${image.caption}`}
              >
                {href ? (
                  // The card title is the accessible link; slide links are pointer/touch shortcuts.
                  <Link className={styles.slideLink} href={href} tabIndex={-1} aria-hidden="true">
                    {picture}
                  </Link>
                ) : (
                  picture
                )}
              </div>
            );
          })}
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              className={`${styles.arrow} ${styles.prev}`}
              aria-controls={trackId}
              aria-label="Previous image"
              onClick={() => goTo(index - 1)}
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              className={`${styles.arrow} ${styles.next}`}
              aria-controls={trackId}
              aria-label="Next image"
              onClick={() => goTo(index + 1)}
            >
              <span aria-hidden="true">→</span>
            </button>
            <div className={styles.dots}>
              {images.map((image, dotIndex) => (
                <button
                  type="button"
                  className={styles.dot}
                  key={image.src}
                  aria-controls={trackId}
                  aria-current={dotIndex === index}
                  aria-label={`Show image ${dotIndex + 1}: ${image.caption}`}
                  onClick={() => goTo(dotIndex)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {showCaption && (
        <p className={styles.caption} aria-live="polite">
          <span>{images[index]?.caption}</span>
          <span className={styles.count}>
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        </p>
      )}
    </div>
  );
}
