import { ArrowLink } from "@/components/common/ArrowLink";
import { SectionKicker } from "@/components/common/SectionKicker";
import { projects } from "@/features/portfolio/data";

function ProjectVisual({ project }: { project: (typeof projects)[number] }) {
  return <div className={`project-visual ${project.visual}`}><span className="visual-label">{project.label}</span>{project.visual === "identity-visual" && <div className="scan-card"><span className="scan-corner" />ID VERIFIED <b>✓</b></div>}{project.visual === "sport-visual" && <span className="sport-ball">+</span>}{project.visual === "roots-visual" && <div className="chart-line"><i /><i /><i /><i /><i /></div>}<span className="visual-index">{project.number}</span></div>;
}

export function WorkSection() {
  return <section className="work-section section-wrap" id="work" aria-labelledby="work-heading"><div className="section-heading"><SectionKicker>01 / Selected work</SectionKicker><h2 id="work-heading">Complex products,<br /><em>made legible.</em></h2><p>From identity verification to insurance and sports technology, I build the interfaces and systems people rely on when the details matter.</p></div><div className="project-grid">{projects.map((project) => <article className={`project-card ${project.featured ? "project-featured" : ""}`} key={project.name}><ProjectVisual project={project} /><div className="project-info"><p className="project-type">{project.type}</p><h3>{project.name}</h3><p>{project.description}</p><ul className="project-highlights">{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul><ArrowLink href={project.link} target={project.external ? "_blank" : undefined} rel={project.external ? "noreferrer" : undefined} aria-label={`${project.linkLabel} about ${project.name}`}>{project.linkLabel}</ArrowLink></div></article>)}</div></section>;
}