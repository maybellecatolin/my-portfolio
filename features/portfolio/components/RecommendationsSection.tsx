import { Reveal } from "@/components/common/Reveal";
import { SectionKicker } from "@/components/common/SectionKicker";
import { linkedinRecommendationsUrl, recommendations } from "@/features/portfolio/data";

import styles from "./RecommendationsSection.module.css";

export function RecommendationsSection() {
  return (
    <section className={`section-wrap ${styles.section}`} id="recommendations" aria-labelledby="recommendations-heading">
      <div className={styles.heading}>
        <Reveal>
          <SectionKicker>Recommendations</SectionKicker>
        </Reveal>
        <h2 className={styles.headingTitle} id="recommendations-heading">
          <Reveal as="span" className={styles.line} delay={0.08}>
            Trusted by the people
          </Reveal>{" "}
          <Reveal as="span" className={styles.line} delay={0.16}>
            <em>I&apos;ve built with.</em>
          </Reveal>
        </h2>
      </div>

      <ul className={styles.grid}>
        {recommendations.map((item, index) => (
          <li className={styles.item} key={`${item.name}-${index}`}>
            <Reveal className={styles.reveal} delay={index * 0.1}>
              {/* On desktop the card shows the opening lines; hovering unfolds the full
                  text over the page (no layout shift). Clicking opens LinkedIn. */}
              <figure className={styles.card}>
                <blockquote className={styles.quote}>
                  <p className={styles.text}>{item.text}</p>
                </blockquote>
                <figcaption className={styles.person}>
                  <a className={styles.name} href={linkedinRecommendationsUrl} target="_blank" rel="noreferrer">
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
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
