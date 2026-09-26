import Image from "next/image";

import styles from "./HeroIllustration.module.css";

// Canvas is cropped to the artwork's visible bounds, so the scene has no built-in whitespace.
const canvas = { width: 1174, height: 735 };
// Largest rendered width of the scene (see .art in HeroSection.module.css).
const maxSceneWidth = 664;

const layers = [
  { src: "background", x: 0, y: 0, width: 1174, height: 735, animation: "" },
  { src: "laptop", x: 206, y: 177, width: 692, height: 494, animation: "" },
  { src: "coffee-mug", x: 868, y: 535, width: 213, height: 190, animation: styles.coffeeFloat },
  { src: "steam", x: 938, y: 434, width: 56, height: 98, animation: styles.steam },
  { src: "dashboard", x: 47, y: 67, width: 376, height: 303, animation: styles.dashboardFloat },
  { src: "phone", x: 901, y: 54, width: 219, height: 334, animation: styles.phoneFloat },
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