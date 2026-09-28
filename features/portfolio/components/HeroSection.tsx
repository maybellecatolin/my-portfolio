import { contact, heroStats } from "@/features/portfolio/data";

import { HeroIllustration } from "./HeroIllustration";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      {/* Soft coral and sage light drifting behind the hero (decorative). */}
      <div className={styles.ambient} aria-hidden="true">
        <span className={styles.glowCoral} />
        <span className={styles.glowSage} />
      </div>
      <div className={styles.main}>
        <div className={styles.meta}>
          <p className={styles.pill}>
            <span className={styles.dot} aria-hidden="true" />
            Open to new roles · Remote
          </p>
          <p className={styles.role}>
            <span className={styles.nowrap}>Senior Software Engineer /</span>{" "}
            <span className={styles.nowrap}>Frontend + Mobile</span>
          </p>
        </div>

        <div
          className={styles.art}
          aria-label="Laptop, dashboard, mobile app, and coffee arranged around a software engineering workspace"
          role="img"
        >
          <HeroIllustration />
        </div>

        <div className={styles.content}>
          <h1 id="hero-heading" className={styles.heading}>
            <span className={styles.line}>Every vision</span>{" "}
            <em>
              <span className={styles.line}>deserves great</span>{" "}
              <span className={styles.line}>Software.</span>
            </em>
          </h1>
          <p className={styles.intro}>
            Turning complex requirements into secure, scalable web and mobile
            products, built for performance, accessibility, and exceptional user
            experience.
          </p>
          <div className={styles.actions}>
            <a className={styles.button} href="#work" data-track="cta_click" data-track-label="view_work">
              View my work <span aria-hidden="true">↓</span>
            </a>
            <a
              className={styles.textLink}
              href={`mailto:${contact.email}?subject=CV%20request`}
              data-track="contact_click"
              data-track-method="cv_request"
              data-track-location="hero"
            >
              Request CV <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>

      <ul className={styles.stats} aria-label="Career highlights">
        {heroStats.map((stat) => (
          <li className={styles.stat} key={stat.label}>
            <strong className={styles.statValue}>{stat.value}</strong>
            <span className={styles.statLabel}>{stat.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
