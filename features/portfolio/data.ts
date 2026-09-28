export const contact = {
  email: "catolinmaybelle@gmail.com",
  location: "Iloilo, Philippines",
  linkedin: "https://www.linkedin.com/in/maybelle-catolin",
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

/**
 * LinkedIn recommendations. PLACEHOLDERS: replace each entry with the real text
 * from https://www.linkedin.com/in/maybelle-catolin/details/recommendations/
 * - text: the full recommendation. On desktop the card shows the first lines and
 *   reveals the rest on hover; phones show it in full.
 * - relationship: as LinkedIn phrases it, e.g. "Managed Maybelle directly"
 */
export const recommendations = [
  {
    name: "Recommender name",
    title: "Role · Company",
    relationship: "How you worked together",
    text: "Paste the full recommendation from LinkedIn here.",
  },
  {
    name: "Recommender name",
    title: "Role · Company",
    relationship: "How you worked together",
    text: "Paste the full recommendation from LinkedIn here.",
  },
  {
    name: "Recommender name",
    title: "Role · Company",
    relationship: "How you worked together",
    text: "Paste the full recommendation from LinkedIn here.",
  },
] as const;

export const linkedinRecommendationsUrl = `${contact.linkedin}/details/recommendations/`;

/** Toolkit, taken from the CV's Technical Skills plus the tools named in its project lists. */
export const toolkit = [
  { category: "Languages", tools: ["TypeScript", "JavaScript (ES6+)", "HTML", "CSS"] },
  { category: "Frontend", tools: ["React", "React Native", "Next.js", "Vite", "React Navigation"] },
  {
    category: "UI libraries",
    tools: [
      "Tailwind CSS",
      "Material UI",
      "Ant Design",
      "Headless UI",
      "Styled Components",
      "Bootstrap",
      "Semantic UI",
      "React Native Elements",
      "NativeBase",
    ],
  },
  { category: "State & data", tools: ["Zustand", "Redux", "MobX", "TanStack Query", "React Hook Form", "Socket.IO"] },
  {
    category: "Mobile",
    tools: [
      "Expo",
      "React Native Firebase",
      "Vision Camera",
      "Push notifications",
      "Keychain",
      "Apple App Attest",
      "Play Integrity API",
      "Native modules & SDKs",
    ],
  },
  {
    category: "Backend",
    tools: ["Node.js", "REST APIs", "NestJS", "FeathersJS", "Firebase (Firestore, Functions, Storage)", "Stripe"],
  },
  { category: "Databases", tools: ["PostgreSQL", "MongoDB", "MySQL"] },
  {
    category: "Cloud & DevOps",
    tools: ["AWS (EC2, S3, Kinesis, Elastic Beanstalk)", "Docker", "GitHub Actions", "Fastlane", "OpenShift"],
  },
  {
    category: "Testing",
    tools: ["Jest", "Vitest", "React Native Testing Library", "Playwright", "Mocha & Chai", "Jasmine", "Postman"],
  },
  {
    category: "Tools",
    tools: ["Git", "Figma", "Xcode", "Android Studio", "VS Code", "Jira", "Confluence", "Trello", "Contento"],
  },
] as const;