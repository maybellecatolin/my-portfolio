import { Reveal } from "@/components/common/Reveal";
import { SectionKicker } from "@/components/common/SectionKicker";
import { linkedinRecommendationsUrl, recommendations } from "@/features/portfolio/data";

import { RecommendationCard } from "./RecommendationCard";
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
              <RecommendationCard item={item} href={linkedinRecommendationsUrl} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
