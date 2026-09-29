import Image from "next/image";

import { SectionKicker } from "@/components/common/SectionKicker";
import { contact } from "@/features/portfolio/data";

import styles from "./SiteFooter.module.css";

// Opens a new Google Calendar event with Maybelle already added as a guest.
const meetingUrl = `https://calendar.google.com/calendar/render?${new URLSearchParams({
  action: "TEMPLATE",
  text: "Meeting with Maybelle Catolin",
  details: "Hi Maybelle, I'd like to talk about ",
  add: contact.email,
})}`;

export function SiteFooter() {
  return (
    <div className="footer-surface">
      <footer className="site-footer section-wrap" id="contact">
        <div className={styles.layout}>
          <div className={styles.lead}>
            <SectionKicker>Start a conversation</SectionKicker>
            <h2>
              Let&apos;s build
              <br />
              <em>what&apos;s next.</em>
            </h2>
            <p className={styles.intro}>
              Hiring for a frontend or mobile role, or need a hand shipping a product? I&apos;d love to hear about it.
            </p>
          </div>

          <aside className={styles.card} aria-label="Contact details">
            <div className={styles.person}>
              <span className={styles.portrait}>
                <Image src="/brand/maybelle-catolin.webp" alt="Maybelle Catolin" width={88} height={88} sizes="88px" />
              </span>
              <span className={styles.personText}>
                <strong>Maybelle Catolin</strong>
                <span>Senior Software Engineer</span>
                <span>Frontend &amp; Mobile</span>
                <span className={styles.status}>
                  <span className={styles.statusDot} aria-hidden="true" />
                  Open to new roles · Remote
                </span>
              </span>
            </div>

            <ul className={styles.links}>
              <li>
                <a
                  className={styles.link}
                  href={`mailto:${contact.email}`}
                  data-track="contact_click"
                  data-track-method="email"
                  data-track-location="contact_card"
                >
                  <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                  <span className={styles.linkText}>
                    <span className={styles.linkLabel}>Email</span>
                    <span className={styles.linkValue}>{contact.email}</span>
                  </span>
                  <span className={styles.arrow} aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
              <li>
                <a
                  className={styles.link}
                  href={meetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-track="contact_click"
                  data-track-method="calendar"
                  data-track-location="contact_card"
                >
                  <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="17" rx="2" />
                    <path d="M3 9h18M8 2v4M16 2v4M12 13v4M10 15h4" />
                  </svg>
                  <span className={styles.linkText}>
                    <span className={styles.linkLabel}>Schedule a meeting</span>
                    <span className={styles.linkValue}>Opens Google Calendar</span>
                  </span>
                  <span className={styles.arrow} aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
              <li>
                <a
                  className={styles.link}
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  data-track="contact_click"
                  data-track-method="linkedin"
                  data-track-location="contact_card"
                >
                  <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
                  </svg>
                  <span className={styles.linkText}>
                    <span className={styles.linkLabel}>LinkedIn</span>
                    <span className={styles.linkValue}>Let&apos;s connect</span>
                  </span>
                  <span className={styles.arrow} aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            </ul>

            <p className={styles.location}>
              <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
              {contact.location} · GMT+8
            </p>
          </aside>
        </div>

        <div className="footer-meta">
          <span>© {new Date().getFullYear()} Maybelle Catolin</span>
          <span>{contact.location}</span>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            data-track="contact_click"
            data-track-method="linkedin"
            data-track-location="footer"
          >
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
