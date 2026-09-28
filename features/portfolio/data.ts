export const contact = {
  email: "catolinmaybelle@gmail.com",
  location: "Iloilo, Philippines",
} as const;

export const navItems = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
] as const;

export const heroStats = [
  { value: "8+", label: "Years shipping production apps" },
  { value: "11+", label: "Products delivered" },
  { value: "iOS + Android", label: "Store releases owned end to end" },
  { value: "5 industries", label: "Digital identity, banking, insurance, fintech, sports" },
] as const;

/** Career timeline: one entry per company, with the products delivered there. */
export const career = [
  {
    company: "Cloud Employee",
    role: "React Developer",
    period: "2022 — Present",
    current: true,
    summary: "Securing digital identity onboarding across a React Native app and a React operator dashboard.",
    domains: ["Digital identity", "React Native", "React", "TypeScript"],
    scope: ["Security architecture", "CI/CD ownership", "Store releases", "WCAG accessibility"],
    projects: [
      { name: "SQR", detail: "Mobile app · React Native", slug: "sqr" },
      { name: "SQR", detail: "Admin dashboard · React", slug: "sqr" },
    ],
  },
  {
    company: "Yondu Inc",
    role: "Software Engineer · React",
    period: "2021 — 2022",
    current: false,
    summary: "Shipping features for major Philippine banking, insurance and airline products.",
    domains: ["Insurance", "Mobile banking", "E-commerce", "Node.js"],
    scope: ["Feature delivery", "API middleware", "Code reviews", "Production support"],
    projects: [
      { name: "Insurance Mobile App", detail: "React Native · Node.js", slug: "insurance-app" },
      { name: "Airline Insurance E-commerce", detail: "React · Node.js", slug: "airline-insurance-ecommerce" },
      { name: "Mobile Banking App", detail: "React Native", slug: "mobile-banking" },
    ],
  },
  {
    company: "Stacktrek Enterprise",
    role: "Software Engineer · Team Lead",
    period: "2018 — 2021",
    current: false,
    summary: "Leading and building products for Hong Kong clients in sports tech, property finance and security.",
    domains: ["Sports tech", "Fintech", "Security", "Firebase"],
    scope: ["Team leadership", "Product delivery", "iOS + Android releases", "AWS deployment"],
    projects: [
      { name: "FindiSport", detail: "Mobile app · React Native", slug: "findisport" },
      { name: "FindiSport", detail: "Admin portal · React", slug: "findisport" },
      { name: "FindiSport", detail: "Marketing website · WordPress", slug: "findisport" },
      { name: "HK Roots", detail: "Mortgage platform · React", slug: "hk-roots" },
      { name: "HK Roots", detail: "Mortgage calculator · React", slug: "hk-roots" },
      { name: "Virtual Control", detail: "Video management · React", slug: "virtual-control" },
    ],
  },
] as const;

export const capabilities = [
  ["Frontend architecture", "React, Next.js, TypeScript, Vite, TanStack Query, Zustand, Redux, and scalable component systems."],
  ["Mobile craft", "React Native, native modules, Vision Camera, Firebase, release management, and App Store / Play Store publishing."],
  ["Security & quality", "App Attest, Play Integrity, biometric identity flows, Jest, Vitest, Playwright, and WCAG accessibility."],
] as const;