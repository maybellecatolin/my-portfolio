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

export const experience = [
  { date: "2022 — now", company: "Cloud Employee", role: "React Developer", details: "Digital identity · React Native · Vite · TypeScript", scope: "Security architecture · CI/CD ownership · WCAG", current: true },
  { date: "2021 — 2022", company: "Yondu Inc", role: "Software Engineer · React", details: "Insurance · Mobile banking · Node.js", scope: "Feature delivery · API middleware · Code reviews", current: false },
  { date: "2018 — 2021", company: "Stacktrek Enterprise", role: "Software Engineer", details: "Sports tech · Finance · Team leadership", scope: "Team lead · Product delivery · iOS + Android releases", current: false },
] as const;

export const projectArchive = [
  { company: "Cloud Employee", projects: ["SQR Mobile Application", "SQR Web Admin Dashboard"] },
  { company: "Yondu Inc", projects: ["Project Oreo", "Airline + Insurance Ecommerce", "MCC Project / PH Mobile Banking"] },
  { company: "Stacktrek Enterprise", projects: ["FindiSport Mobile App", "FindiSport Website", "FindiSport Admin Portal", "HK Roots", "HK Roots Mortgage Calculator", "Virtual Control"] },
] as const;

export const capabilities = [
  ["Frontend architecture", "React, Next.js, TypeScript, Vite, TanStack Query, Zustand, Redux, and scalable component systems."],
  ["Mobile craft", "React Native, native modules, Vision Camera, Firebase, release management, and App Store / Play Store publishing."],
  ["Security & quality", "App Attest, Play Integrity, biometric identity flows, Jest, Vitest, Playwright, and WCAG accessibility."],
] as const;