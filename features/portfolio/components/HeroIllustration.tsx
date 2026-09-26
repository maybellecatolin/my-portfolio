import Image from "next/image";

import styles from "./HeroIllustration.module.css";

const canvas = { width: 1546, height: 1017 };
// Largest rendered width of the scene (see .art in HeroSection.module.css).
const maxSceneWidth = 664;

const layers = [
  { src: "background", x: 0, y: 0, width: 1546, height: 1017, animation: "" },
  { src: "laptop", x: 394, y: 325, width: 692, height: 494, animation: "" },
  { src: "coffee-mug", x: 1056, y: 683, width: 213, height: 190, animation: styles.coffeeFloat },
  { src: "steam", x: 1126, y: 582, width: 56, height: 98, animation: styles.steam },
  { src: "dashboard", x: 235, y: 215, width: 376, height: 303, animation: styles.dashboardFloat },
  { src: "phone", x: 1089, y: 202, width: 219, height: 334, animation: styles.phoneFloat },
] as const;

export function HeroIllustration() {
  return (
    <div className={styles.scene} style={{ aspectRatio: `${canvas.width} / ${canvas.height}` }}>
      {layers.map((layer) => {
        const fraction = layer.width / canvas.width;
        return (
          <div
            className={`${styles.layer} ${layer.animation}`}
            key={layer.src}
            style={{
              left: `${(layer.x / canvas.width) * 100}%`,
              top: `${(layer.y / canvas.height) * 100}%`,
              width: `${fraction * 100}%`,
            }}
          >
            <Image
              alt=""
              height={layer.height}
              preload={layer.src === "background" || layer.src === "laptop"}
              sizes={`(max-width: 599px) ${Math.ceil(fraction * 100)}vw, ${Math.ceil(fraction * maxSceneWidth)}px`}
              src={`/hero/${layer.src}.png`}
              width={layer.width}
            />
          </div>
        );
      })}
    </div>
  );
}