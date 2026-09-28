import Image from "next/image";
import Link from "next/link";

import { projects, type Project } from "@/features/portfolio/projects";

import { ProjectCarousel } from "./ProjectCarousel";
import styles from "./ProjectDetail.module.css";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function ProjectDetail({ project }: { project: Project }) {
  const index = projects.findIndex((item) => item.slug === project.slug);
  // No "Previous" on the first project; "Next" wraps from the last project back to the first.
  const previous = index > 0 ? projects[index - 1] : undefined;
  const next = projects[(index + 1) % projects.length];
  const allStack = [...new Set(project.parts.flatMap((part) => part.stack))];

  const facts = [
    ["Role", project.role],
    ["Company", project.company],
    ["Client", project.client],
    ["Timeline", project.timeline],
    ["Platforms", project.platforms],
    ["Location", project.location],
  ].filter((fact): fact is [string, string] => Boolean(fact[1]));

  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="top" className={styles.page}>
        {/* Upper left on every screen; pinned under the header on phones and tablets. */}
        <div className={styles.backBar}>
          <div className={styles.backInner}>
            <Link className={styles.back} href="/#work">
              <span aria-hidden="true">←</span> All projects
            </Link>
          </div>
        </div>

        {/* Opening screen: title, tagline, overview and gallery fit in one viewport from tablet up. */}
        <section className={styles.hero} aria-labelledby="project-title">

          <header className={styles.intro}>
            <p className={styles.kicker}>{project.industry}</p>
            <h1 className={styles.title} id="project-title">
              {project.name}
            </h1>
            <p className={styles.tagline}>{project.tagline}</p>
          </header>

          <div className={styles.media}>
            <ProjectCarousel
              images={project.images}
              label={project.name}
              sizes="(min-width: 1280px) 680px, (min-width: 1024px) 55vw, 100vw"
              preload
              showCaption
            />
          </div>

          <div className={styles.overviewBlock}>
            <h2 className={styles.sectionTitle}>Overview</h2>
            <p className={styles.overview}>{project.overview}</p>
            {project.stores && (
              <ul className={styles.stores} aria-label="Download the app">
                {project.stores.appStore && (
                  <li>
                    <a className={styles.store} href={project.stores.appStore} target="_blank" rel="noreferrer">
                      <Image src="/badges/app-store.svg" alt="Download on the App Store" width={120} height={40} />
                    </a>
                  </li>
                )}
                {project.stores.googlePlay && (
                  <li>
                    <a className={styles.store} href={project.stores.googlePlay} target="_blank" rel="noreferrer">
                      <Image src="/badges/google-play.png" alt="Get it on Google Play" width={134} height={40} />
                    </a>
                  </li>
                )}
              </ul>
            )}
          </div>
        </section>

        <div className={styles.wrap}>
          <div className={styles.body}>
            <div className={styles.main}>
              <section className={styles.section} aria-labelledby="contributions-heading">
                <h2 className={styles.sectionTitle} id="contributions-heading">My contributions</h2>
                {project.parts.map((part) => (
                  <div className={styles.part} key={part.name}>
                    {project.parts.length > 1 && <h3 className={styles.partTitle}>{part.name}</h3>}
                    <ol className={styles.contributions}>
                      {part.contributions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                    <p className={styles.builtWith}>
                      <span>Built with</span> {part.stack.join(" · ")}
                    </p>
                  </div>
                ))}
              </section>
            </div>

            <aside className={styles.aside} aria-label="Project facts">
              <dl className={styles.facts}>
                {facts.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>

              {project.link && (
                <a className={styles.visit} href={project.link.href} target="_blank" rel="noreferrer">
                  {project.link.label} <span aria-hidden="true">↗</span>
                </a>
              )}

              <div className={styles.stackBlock}>
                <h2 className={styles.asideTitle}>Tech stack</h2>
                <ul className={styles.stack}>
                  {allStack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>

        <nav className={styles.pager} aria-label="More projects">
          {previous && (
            <Link className={styles.pagerLink} href={`/projects/${previous.slug}`}>
              <span className={styles.pagerLabel}>
                <span aria-hidden="true">←</span> Previous
              </span>
              <span className={styles.pagerName}>{previous.name}</span>
            </Link>
          )}
          <Link className={`${styles.pagerLink} ${styles.pagerNext}`} href={`/projects/${next.slug}`}>
            <span className={styles.pagerLabel}>
              Next <span aria-hidden="true">→</span>
            </span>
            <span className={styles.pagerName}>{next.name}</span>
          </Link>
        </nav>
      </main>
      <SiteFooter />
    </div>
  );
}
