import { SectionKicker } from "@/components/common/SectionKicker";
import { contact } from "@/features/portfolio/data";

export function SiteFooter() {
  return (
    <div className="footer-surface">
      <footer className="site-footer section-wrap" id="contact">
        <SectionKicker>Start a conversation</SectionKicker>
        <h2>
          Let&apos;s build
          <br />
          <em>what&apos;s next.</em>
        </h2>
        <a className="footer-email" href={`mailto:${contact.email}`}>
          {contact.email} <span aria-hidden="true">↗</span>
        </a>
        <div className="footer-meta">
          <span>© {new Date().getFullYear()} Maybelle Catolin</span>
          <span>{contact.location}</span>
          <a href={contact.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
