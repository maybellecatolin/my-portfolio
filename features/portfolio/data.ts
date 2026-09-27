export const contact = {
  email: "catolinmaybelle@gmail.com",
  location: "Iloilo, Philippines",
} as const;

export const navItems = [
  { label: "Portfolio", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

export const heroStats = [
  { value: "8+", label: "Years shipping production apps" },
  { value: "11+", label: "Products delivered" },
  { value: "iOS + Android", label: "Store releases owned end to end" },
  { value: "5 industries", label: "Digital identity, banking, insurance, fintech, sports" },
] as const;

export const projects = [
  { name: "SQR", type: "React Native · React · Security", description: "Digital identity verification across a secure mobile app and an operational web dashboard.", highlights: ["Native biometric and liveness SDK integration", "App Attest + Play Integrity defense-in-depth", "Fastlane + GitHub Actions release pipeline"], label: "SQR / DIGITAL IDENTITY", visual: "identity-visual", number: "01", link: "#experience", linkLabel: "View contribution", featured: true, external: false },
  { name: "FindiSport", type: "React Native · Firebase · Team lead", description: "A cross-platform marketplace connecting students with sports coaches and experts.", highlights: ["Led mobile delivery from concept to stores", "Booking, payments, messaging, and scheduling", "Firebase workflows and automated notifications"], label: "FINDISPORT / HONG KONG", visual: "sport-visual", number: "02", link: "#experience", linkLabel: "View contribution", featured: false, external: false },
  { name: "HK Roots", type: "React · Node.js · MongoDB", description: "A digital mortgage platform and calculator helping homebuyers find a clearer path forward.", highlights: ["Bank-specific mortgage form automation", "Property recommendations from collected listings", "React, FeathersJS, MongoDB, and AWS delivery"], label: "HK ROOTS / FINANCE", visual: "roots-visual", number: "03", link: "https://hkroots.io", linkLabel: "Visit project", featured: false, external: true },
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