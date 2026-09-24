import { SectionKicker } from "@/components/common/SectionKicker";
import { capabilities } from "@/features/portfolio/data";

export function CapabilitiesSection() {
  return <section className="capabilities-section section-wrap" aria-labelledby="capabilities-heading"><div className="capability-intro"><SectionKicker>03 / Toolkit</SectionKicker><h2 id="capabilities-heading">The details<br /><em>behind the work.</em></h2></div><div className="capability-list">{capabilities.map(([title, description], index) => <div key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p></div>)}</div></section>;
}