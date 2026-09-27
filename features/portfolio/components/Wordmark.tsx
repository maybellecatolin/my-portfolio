import Image from "next/image";
import Link from "next/link";

import styles from "./SiteHeader.module.css";

type WordmarkProps = {
  onClick?: () => void;
};

export function Wordmark({ onClick }: WordmarkProps) {
  return (
    <Link className={styles.wordmark} href="/#top" aria-label="Maybelle Catolin, back to top" onClick={onClick}>
      <Image
        className={styles.wordmarkLogo}
        src="/brand/mc-logo.png"
        alt=""
        width={32}
        height={32}
      />
      <span className={styles.wordmarkName}>Maybelle Catolin</span>
    </Link>
  );
}
