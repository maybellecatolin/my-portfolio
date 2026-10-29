import { Reveal } from "@/components/common/Reveal";
import { SectionKicker } from "@/components/common/SectionKicker";
import { projects } from "@/features/portfolio/projects";

import { ProjectShowcase } from "./ProjectShowcase";
import styles from "./WorkSection.module.css";

type WorkSectionProps = {
  /** "h1" when the section is a page of its own; "h2" inside the home page. */
  headingLevel?: "h1" | "h2";
}

export function WorkSection({ headingLevel: Heading = "h2" }: WorkSectionProps) {
  return (
    <section className="work-section section-wrap" id="work" aria-labelledby="work-heading">
      <div className={styles.heading}>
        <Reveal>
          <SectionKicker>Products I&apos;ve built</SectionKicker>
        </Reveal>
        <Heading className={styles.headingTitle} id="work-heading">
          <Reveal as="span" className={styles.line} delay={0.08}>
            High-stakes products,
          </Reveal>{" "}
          <Reveal as="span" className={styles.line} delay={0.16}>
            <em>built to be trusted.</em>
          </Reveal>
        </Heading>
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
