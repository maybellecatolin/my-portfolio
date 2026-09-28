"use client";

import { useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import type { ProjectImage } from "@/features/portfolio/projects";

import styles from "./ProjectCarousel.module.css";

const AUTO_PLAY_MS = 4000;

// Wraps around at both ends. Smooth vs instant scrolling comes from CSS, so
// reduced motion is respected.
function scrollToSlide(track: HTMLElement | null, target: number, count: number) {
  track?.scrollTo({ left: (((target % count) + count) % count) * track.clientWidth });
}

type ProjectCarouselProps = {
  images: readonly ProjectImage[];
  /** Project name, used in accessible labels. */
  label: string;
  /** When set, each slide links here (used on the Work cards). */
  href?: string;
  sizes: string;
  preload?: boolean;
  showCaption?: boolean;
  /** Advance slides automatically. Pauses on hover/focus, off-screen, and with reduced motion. */
  autoPlay?: boolean;
};

/**
 * Lightweight image carousel on native CSS scroll-snap: touch/trackpad swipe,
 * arrow buttons and dots, with wrap-around and autoplay. No third-party dependency.
 */
export function ProjectCarousel({
  images,
  label,
  href,
  sizes,
  preload = false,
  showCaption = false,
  autoPlay = true,
}: ProjectCarouselProps) {
  const trackId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  // Once the visitor navigates themselves (swipe, arrow or dot), autoplay stops for
  // good, so there's always a way to pause it, including on touch screens.
  const [interacted, setInteracted] = useState(false);
  const reducedMotion = useReducedMotion();
  const count = images.length;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.5 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // Depends on `index`, so the timer restarts after any manual navigation.
  useEffect(() => {
    if (!autoPlay || interacted || hovered || focused || !visible || reducedMotion || count < 2) return;
    const timer = window.setTimeout(() => scrollToSlide(trackRef.current, index + 1, count), AUTO_PLAY_MS);
    return () => window.clearTimeout(timer);
  }, [autoPlay, interacted, hovered, focused, visible, reducedMotion, count, index]);

  const goTo = (target: number) => {
    setInteracted(true);
    scrollToSlide(trackRef.current, target, count);
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (track) setIndex(Math.round(track.scrollLeft / track.clientWidth));
  };

  return (
    <div
      className={styles.root}
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${label} screenshots`}
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className={styles.frame}>
        <div
          className={styles.track}
          id={trackId}
          ref={trackRef}
          onScroll={onScroll}
          // A swipe, or a horizontal trackpad scroll, counts as navigating.
          onTouchStart={() => setInteracted(true)}
          onWheel={(event) => Math.abs(event.deltaX) > Math.abs(event.deltaY) && setInteracted(true)}
        >
          {images.map((image, slideIndex) => {
            const contain = image.fit === "contain";
            const picture = (
              <>
                {contain && !image.background && (
                  // Blurred copy fills the letterbox around a contained (e.g. portrait) image.
                  <Image className={styles.backdrop} src={image.src} alt="" aria-hidden="true" fill sizes="64px" />
                )}
                <Image
                  className={contain ? `${styles.image} ${styles.contain}` : styles.image}
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={sizes}
                  preload={preload && slideIndex === 0}
                />
              </>
            );
            return (
              <div
                className={styles.slide}
                key={image.src}
                role="group"
                aria-roledescription="slide"
                aria-label={`${slideIndex + 1} of ${count}: ${image.caption}`}
                style={image.background ? { background: image.background } : undefined}
              >
                {href ? (
                  // The card title is the accessible link; slide links are pointer/touch shortcuts.
                  <Link
                    className={styles.slideLink}
                    href={href}
                    tabIndex={-1}
                    aria-hidden="true"
                    data-track="project_open"
                    data-track-project={href.split("/").pop()}
                    data-track-location="work_carousel"
                  >
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
