import { Reveal } from "@/components/common/Reveal";
import { SectionKicker } from "@/components/common/SectionKicker";
import { career } from "@/features/portfolio/data";

import { CareerTimeline } from "./CareerTimeline";
import styles from "./ExperienceSection.module.css";

export function ExperienceSection() {
  return (
    <section className={`section-wrap ${styles.section}`} id="experience" aria-labelledby="experience-heading">
      <div className={styles.intro}>
        <Reveal>
          <SectionKicker>Track record</SectionKicker>
        </Reveal>
        <h2 className={styles.heading} id="experience-heading">
          <Reveal as="span" className={styles.line} delay={0.08}>
            Grounded in experience,
          </Reveal>{" "}
          <Reveal as="span" className={styles.line} delay={0.16}>
            <em>driven by quality.</em>
          </Reveal>
        </h2>
        <Reveal delay={0.24}>
          <blockquote className={styles.quote}>
            <p>“Experience is my foundation. Quality is my standard.”</p>
          </blockquote>
        </Reveal>
      </div>

      {/* Each company reveals itself on scroll inside the timeline. */}
      <CareerTimeline items={career} />
    </section>
  );
}
