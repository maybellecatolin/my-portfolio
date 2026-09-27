import { Reveal } from "@/components/common/Reveal";
import { SectionKicker } from "@/components/common/SectionKicker";
import { projects } from "@/features/portfolio/projects";

import { ProjectShowcase } from "./ProjectShowcase";
import styles from "./WorkSection.module.css";

export function WorkSection() {
  return (
    <section className="work-section section-wrap" id="work" aria-labelledby="work-heading">
      <div className={styles.heading}>
        <Reveal>
          <SectionKicker>Products I&apos;ve built</SectionKicker>
        </Reveal>
        <h2 className={styles.headingTitle} id="work-heading">
          <Reveal as="span" className={styles.line} delay={0.08}>
            High-stakes products,
          </Reveal>{" "}
          <Reveal as="span" className={styles.line} delay={0.16}>
            <em>built to be trusted.</em>
          </Reveal>
        </h2>
        <Reveal className={styles.headingIntro} delay={0.24}>
          <p>
            Thoughtfully designed and carefully engineered: quality you can see in every screen, and feel in
            every tap.
          </p>
        </Reveal>
      </div>

      <ProjectShowcase projects={projects} />
    </section>
  );
}
