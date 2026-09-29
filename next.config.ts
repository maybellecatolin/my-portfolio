import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev server only: allow testing on a phone over the local network
  // (e.g. http://192.168.68.112:3000). Without this, Next blocks its dev scripts
  // for non-localhost origins, so the page renders but never becomes interactive.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
};

export default nextConfig;
