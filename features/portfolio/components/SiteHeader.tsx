import { HeaderNav } from "./HeaderNav";
import { MobileMenu } from "./MobileMenu";
import styles from "./SiteHeader.module.css";
import { StickyHeader } from "./StickyHeader";
import { Wordmark } from "./Wordmark";

export function SiteHeader() {
  return (
    <>
      <a className={styles.skipLink} href="#top">
        Skip to content
      </a>
      <StickyHeader className={styles.header}>
        <div className={styles.bar}>
          <Wordmark />

          <HeaderNav />

          <MobileMenu />
        </div>
      </StickyHeader>
    </>
  );
}
