import { Reveal } from "@/components/common/Reveal";
import { SectionKicker } from "@/components/common/SectionKicker";
import { toolkit } from "@/features/portfolio/data";

import styles from "./ToolkitSection.module.css";

export function ToolkitSection() {
  return (
    <section className={`section-wrap ${styles.section}`} id="toolkit" aria-labelledby="toolkit-heading">
      <div className={styles.heading}>
        <Reveal>
          <SectionKicker>Toolkit</SectionKicker>
        </Reveal>
        <h2 className={styles.headingTitle} id="toolkit-heading">
          <Reveal as="span" className={styles.line} delay={0.08}>
            The details
          </Reveal>{" "}
          <Reveal as="span" className={styles.line} delay={0.16}>
            <em>behind the work.</em>
          </Reveal>
        </h2>
      </div>

      <dl className={styles.groups}>
        {toolkit.map((group, index) => (
          <Reveal className={styles.group} delay={(index % 3) * 0.08} key={group.category}>
            <dt className={styles.category}>{group.category}</dt>
            <dd className={styles.tools}>
              <ul>
                {group.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
