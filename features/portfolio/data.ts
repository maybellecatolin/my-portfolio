export const contact = {
  email: "catolinmaybelle@gmail.com",
  location: "Iloilo, Philippines",
  linkedin: "https://www.linkedin.com/in/maybelle-catolin",
} as const;

/** Header navigation, in page order. `id` is the section's element id on the home page. */
export const navItems = [
  { label: "Work", id: "work" },
  { label: "Recommendations", id: "recommendations" },
  { label: "Experience", id: "experience" },
  { label: "Toolkit", id: "toolkit" },
  { label: "Contact", id: "contact" },
] as const;

export type SectionId = (typeof navItems)[number]["id"];

export const sectionIds = navItems.map((item) => item.id);

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
    summary:
      "Developed and maintained a secure digital identity verification platform comprising a React Native mobile application and React web dashboard, supporting identity onboarding, KYC/IDV verification, compliance workflows, document processing, and administrative operations in the Isle of Man, Europe.",
    domains: ["Digital identity", "React Native", "React", "TypeScript"],
    scope: ["Web & mobile development", "Secure platforms", "Store releases", "WCAG accessibility"],
    projects: [
      { name: "SQR", detail: "Mobile app and admin dashboard", slug: "sqr" },
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
    company: "Stacktrek Enterprise Inc.",
    role: "Software Engineer · Team Lead",
    period: "2018 — 2021",
    current: false,
    summary: "Leading and building products for Hong Kong clients in sports tech, property finance and security.",
    domains: ["Sports tech", "Fintech", "Security", "Firebase"],
    scope: ["Team leadership", "Product delivery", "iOS + Android releases", "AWS deployment"],
    projects: [
      { name: "FindiSport", detail: "Mobile app, admin portal and website", slug: "findisport" },
      { name: "HK Roots", detail: "Mortgage platform and calculator", slug: "hk-roots" },
      { name: "Virtual Control", detail: "Video management · React", slug: "virtual-control" },
    ],
  },
] as const;

/**
 * LinkedIn recommendations, from
 * https://www.linkedin.com/in/maybelle-catolin/details/recommendations/
 * - text: the full recommendation, one string per paragraph. On desktop the card
 *   shows the first lines and reveals the rest on hover; phones show it in full.
 * - relationship: how you worked together
 */
export const recommendations = [
  {
    name: "Biansor Almerol",
    title: "Technical Team Lead · SQR",
    relationship: "Teammate, then team lead",
    text: [
      "I definitely consider Belle a high-performing engineer. I had the opportunity to work with her as a teammate and later as her lead, which gave me a chance to see her strengths from different perspectives. I always admire hardworking people, but one of the characteristics I admire most about Belle is her consistency. Ever since I started working with her until we parted ways, she consistently delivered her tasks on time while maintaining high-quality outputs. She is reliable, takes ownership of her work, and can be trusted to get things done without compromising quality. Her dedication and consistency make her someone I would gladly work with again and highly recommend to any team.",
    ],
  },
  {
    name: "Ena Fleurence Cahilig-Solacito",
    title: "Senior Fullstack Engineer · SQR",
    relationship: "Worked together on the SQR platform",
    text: [
      "I had the opportunity to work closely with Belle on the SQR platform, where we worked together on the React Native mobile app and the React-based dashboard. We also collaborated on integrating backend services, translating Figma designs, and making sure the platform met WCAG accessibility standards.",
      "One of the important tasks we worked on together was integrating the GBG Identity Verification SDK through a native module. This involved a lot of research, testing, troubleshooting, and documentation to make sure the integration was reliable and production-ready. Belle was someone I could trust with important technical tasks and knew she would deliver quality results.",
      "Belle has strong technical skills and is very detail-oriented when delivering features. She doesn't just focus on making something work. She takes the time to understand the requirements, consider edge cases, test her work, and make sure the final output is solid and maintainable. She was also comfortable working across different parts of the stack and integrating with backend services when needed.",
      "What I really appreciated about working with Belle was how easy and reliable she was to work with. She listens carefully, takes proper notes, and understands requirements quickly. I rarely had to explain things twice because once we discussed something, I knew she had it covered. She takes ownership of her work and consistently delivers what is expected.",
      "Belle is a great teammate and someone I would trust with important and challenging technical work. I genuinely enjoyed working with her and would definitely work with her again. Hopefully, we get the chance to work together on more projects in the future.",
    ],
  },
  {
    name: "Henry John Rich Ugot",
    title: "Software Quality Assurance Tester · SQR",
    relationship: "Worked together on the SQR team",
    text: [
      "I had the pleasure of working with Maybelle, and I can confidently recommend her as a highly skilled and dependable front-end developer. She has strong knowledge of front-end development across both web and mobile platforms and consistently delivers quality work.",
      "Maybelle is also excellent at troubleshooting and resolving bugs quickly, helping the team keep projects moving forward. She pays close attention to requirements and makes sure her work aligns accurately with what is expected.",
      "Beyond her technical skills, she is a reliable and valuable team member. I truly enjoyed working with her and would gladly recommend Maybelle to any team looking for a capable and dedicated front-end developer.",
    ],
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