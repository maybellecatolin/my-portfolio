export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Maybelle Catolin home">
        <span className="wordmark-mark">MC</span>
        <span>Maybelle Catolin</span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        <a href="#work">Portfolio</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
      </nav>
      <a className="header-link" href="mailto:catolinmaybelle@gmail.com">
        Let&apos;s talk <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
