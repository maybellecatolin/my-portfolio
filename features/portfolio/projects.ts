/**
 * Case-study content for the Work section and /projects/[slug] pages.
 *
 * Images live in public/projects/<slug>/. To use real screenshots, replace the
 * files (keep the names) or edit `images` below; 16:10 landscape works best.
 */

export type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
  /** "contain" shows the whole image (e.g. portrait phone screens); defaults to "cover". */
  fit?: "cover" | "contain";
  /** CSS background around a contained image; defaults to a blurred copy of the image. */
  background?: string;
};

export type ProjectPart = {
  name: string;
  contributions: readonly string[];
  stack: readonly string[];
};

export type Project = {
  slug: string;
  name: string;
  /** One line for cards; a stronger line for the case-study header. */
  summary: string;
  tagline: string;
  overview: string;
  industry: string;
  platforms: string;
  company: string;
  client?: string;
  role: string;
  timeline: string;
  location?: string;
  link?: { href: string; label: string };
  /** Note shown under the case-study overview, e.g. when screens are mockups under NDA. */
  disclaimer?: string;
  /** Store listings, shown as badges under the case-study overview. */
  stores?: { appStore?: string; googlePlay?: string };
  /** Short stack shown on the card. */
  cardStack: readonly string[];
  images: readonly ProjectImage[];
  parts: readonly ProjectPart[];
};

const images = (slug: string, slides: readonly [caption: string, alt: string][]) =>
  slides.map(([caption, alt], index) => ({
    src: `/projects/${slug}/${String(index + 1).padStart(2, "0")}.webp`,
    alt,
    caption,
  }));

export const projects: readonly Project[] = [
  {
    slug: "sqr",
    name: "SQR",
    summary:
      "Reusable digital identity verification, electronic Know Your Customer (eKYC), and Anti-Money Laundering (AML) compliance",
    tagline:
      "Reusable digital identity verification, electronic Know Your Customer (eKYC), and Anti-Money Laundering (AML) compliance",
    overview:
      "SQR is a digital identity platform for the Isle of Man. People verify who they are in a React Native app, covering onboarding, KYC/IDV, biometric liveness and document capture, while operators review cases and run compliance workflows in a React admin dashboard. I work across both, from native SDK integration and device security to release management and dashboard architecture.",
    industry: "Digital identity · RegTech",
    platforms: "iOS · Android · Web",
    company: "Cloud Employee",
    role: "React & React Native Developer",
    timeline: "Nov 2022 – Present",
    location: "Isle of Man, Europe",
    stores: {
      appStore: "https://apps.apple.com/us/app/sqr/id6446169262",
      googlePlay: "https://play.google.com/store/apps/details?id=com.secureqr&hl=en",
    },
    cardStack: ["React Native", "React", "TypeScript"],
    // Portrait phone screens (02–05) are shown whole rather than cropped to 16:10,
    // on their own mint edge colour.
    images: images("sqr", [
      ["Mobile app & operator dashboard", "SQR admin dashboard on desktop and laptops alongside the SQR mobile app"],
      ["Onboarding", "SQR onboarding screen: making the world a safer place through digital identity verification"],
      ["Digital ID & QR sharing", "SQR digital ID with a QR code for sharing verified identity"],
      ["Biometric face scan", "SQR facial recognition liveness scan"],
      ["Document capture", "SQR identity document scan with blur detection"],
    ]).map((image, index) =>
      index === 0
        ? image
        : { ...image, fit: "contain" as const, background: "linear-gradient(180deg, #f1ffe2, #e5fdd9)" },
    ),
    parts: [
      {
        name: "Mobile app · React Native",
        contributions: [
          "Designed and implemented a defense-in-depth security architecture using Apple App Attest, Google Play Integrity, jailbreak/root detection and anti-instrumentation, protecting identity onboarding from compromised devices.",
          "Built custom iOS and Android native modules to integrate GBG's biometric identity verification and liveness detection SDK.",
          "Integrated REST APIs for authentication, onboarding, identity verification and document processing workflows.",
          "Built a Fastlane + GitHub Actions CI/CD pipeline that automates iOS and Android builds and reports to Slack.",
          "Owned end-to-end App Store and Google Play releases, covering native build configuration, code signing, SDK integration and production publishing.",
          "Translated Figma designs into reusable, production-ready components with consistent behaviour across iOS and Android.",
          "Established and maintained WCAG accessibility compliance.",
        ],
        stack: [
          "React Native",
          "TypeScript",
          "Redux",
          "React Navigation",
          "React Hook Form",
          "Firebase (Auth, Crashlytics, Messaging)",
          "Vision Camera",
          "Apple App Attest",
          "Google Play Integrity",
          "Keychain",
          "GBG SDK",
          "Jest",
          "Fastlane",
        ],
      },
      {
        name: "Admin dashboard · React",
        contributions: [
          "Led the migration from Create React App to Vite, speeding up development and builds and improving maintainability.",
          "Architected server state with TanStack Query (caching, persistence, retry policies and error handling) and application state with Zustand.",
          "Built reusable, responsive React components from Figma designs.",
          "Wrote Vitest unit tests for dashboard components and business logic.",
          "Partnered with product, design, QA and backend engineers to turn business requirements into practical frontend solutions.",
        ],
        stack: [
          "React",
          "TypeScript",
          "Zustand",
          "TanStack Query",
          "Tailwind CSS",
          "Headless UI",
          "Socket.IO",
          "Vite",
          "Vitest",
          "Playwright",
          "NestJS",
          "PostgreSQL",
        ],
      },
    ],
  },
  {
    slug: "mobile-banking",
    name: "Mobile Banking App",
    summary: "Feature delivery and production support for one of the Philippines' major banking apps.",
    tagline: "Everyday banking for customers of a major Philippine bank.",
    overview:
      "The MCC project is the React Native mobile banking app of one of the Philippines' major banks. I delivered new features from Figma to production, strengthened the test suite and helped keep a high-traffic financial app stable through production triage.",
    industry: "Banking · Fintech",
    platforms: "iOS · Android",
    company: "Yondu Inc",
    client: "A major Philippine bank (confidential)",
    role: "Software Engineer · React Native",
    timeline: "Jul 2021 – Dec 2021",
    location: "Philippines",
    cardStack: ["React Native", "Jest"],
    disclaimer:
      "The app is covered by a non-disclosure agreement, so the screens shown here are illustrative mockups, not the actual app.",
    // Slides 02–04 are illustrative mockups (see `disclaimer`), not the client's app.
    images: images("mobile-banking", [
      ["Culture Champ: Team Excellence award", "Yondu Certificate of Appreciation awarded to Maybelle Catolin for teamwork and collaboration"],
      ["Accounts home · illustrative mockup", "Illustrative mobile banking home screen with savings accounts and credit cards"],
      ["Send money · illustrative mockup", "Illustrative mobile banking send money screen"],
      ["Pay bills · illustrative mockup", "Illustrative mobile banking pay bills screen with biller categories"],
    ]),
    parts: [
      {
        name: "Mobile app · React Native",
        contributions: [
          "Built mobile banking features in React Native, translating Figma designs into pixel-perfect, production-ready screens.",
          "Created and maintained Jest unit tests to raise code quality, reliability and maintainability.",
          "Investigated and resolved production issues through support tickets and triage, shipping timely fixes to keep the app stable.",
          "Worked with cross-functional teams in an Agile environment to deliver new features and ongoing enhancements.",
        ],
        stack: ["React Native", "JavaScript", "Jest", "Figma", "Agile / Scrum"],
      },
    ],
  },
  {
    slug: "insurance-app",
    name: "Insurance Mobile App",
    summary: "New features and Node.js middleware for a leading Philippine insurer's mobile app.",
    tagline: "Expanding a leading insurer's app, from new features to backend access.",
    overview:
      "Project Oreo is the React Native app of a leading Philippine insurance provider. I shipped feature enhancements end to end, from pixel-accurate UI to the Node.js middleware on OpenShift that gives the app reliable access to backend services, and raised code quality through regular reviews.",
    industry: "Insurance",
    platforms: "iOS · Android",
    company: "Yondu Inc",
    client: "A leading Philippine insurance provider (confidential)",
    role: "Software Engineer · React Native + Node.js",
    timeline: "Apr 2022 – Nov 2022",
    location: "Philippines",
    cardStack: ["React Native", "Node.js", "OpenShift"],
    disclaimer:
      "The app is covered by a non-disclosure agreement, so the screens shown here are illustrative mockups, not the actual app.",
    images: images("insurance-app", [
      ["Find a doctor · illustrative mockup", "Illustrative insurance app screen listing accredited doctors by specialization"],
      ["Locate clinics · illustrative mockup", "Illustrative insurance app map screen for locating nearby accredited clinics"],
    ]),
    parts: [
      {
        name: "Mobile app & middleware",
        contributions: [
          "Designed and shipped feature enhancements that expanded the app's functionality for policyholders.",
          "Translated Figma designs into pixel-accurate, responsive screens with high design fidelity.",
          "Built and deployed Node.js middleware services to OpenShift, giving the app reliable access to backend APIs.",
          "Raised code quality across the team through regular code reviews.",
        ],
        stack: ["React Native", "JavaScript", "Node.js", "REST APIs", "OpenShift", "Figma"],
      },
    ],
  },
  {
    slug: "airline-insurance-ecommerce",
    name: "Airline Insurance E-commerce",
    summary: "A responsive e-commerce site selling an airline's travel insurance product.",
    tagline: "Selling travel insurance online for a Philippine airline.",
    overview:
      "An e-commerce platform for a Philippine airline's insurance product. I built the landing page and eligibility sign-up flows in React, made the experience fully responsive, and architected the Node.js middleware connecting the frontend to backend systems.",
    industry: "Insurance · Travel · E-commerce",
    platforms: "Web (mobile, tablet, desktop)",
    company: "Yondu Inc",
    client: "A Philippine airline (confidential)",
    role: "Software Engineer · React + Node.js",
    timeline: "Jan 2022 – Apr 2022",
    location: "Philippines",
    cardStack: ["React", "Node.js"],
    disclaimer:
      "The product is covered by a non-disclosure agreement, so the screens shown here are illustrative mockups, not the actual product.",
    images: images("airline-insurance-ecommerce", [
      [
        "Hero & KYC sign-up forms · illustrative mockup",
        "Illustrative travel insurance website with a yellow hero section and traveller identity verification forms",
      ],
    ]),
    parts: [
      {
        name: "Website & middleware",
        contributions: [
          "Developed the landing page and sign-up forms for eligible customers.",
          "Converted Figma designs into clean, functional React components.",
          "Delivered a fully responsive experience across mobile, tablet and desktop.",
          "Architected Node.js middleware APIs bridging frontend and backend systems to streamline data integration.",
          "Improved team code quality through consistent code reviews.",
        ],
        stack: ["React", "JavaScript", "Node.js", "REST APIs", "Responsive design", "Figma"],
      },
    ],
  },
  {
    slug: "findisport",
    name: "FindiSport",
    summary: "A Hong Kong marketplace connecting students with sports coaches, on mobile, admin and web.",
    tagline: "Connecting Hong Kong students with sports coaches, on three platforms.",
    overview:
      "FindiSport helps students across Hong Kong discover sports activities, book qualified coaches and improve their performance. As team lead I took the cross-platform app from concept to both app stores, built the admin portal that runs the business, and developed the marketing website that drives user acquisition.",
    industry: "Sports tech · Marketplace",
    platforms: "iOS · Android · Web",
    company: "Stacktrek Enterprise",
    role: "Team Lead & Software Engineer",
    timeline: "Feb 2020 – Jun 2021",
    location: "Hong Kong",
    link: { href: "https://findisport.com", label: "Visit findisport.com" },
    cardStack: ["React Native", "Firebase", "React", "WordPress"],
    images: images("findisport", [
      ["Coach discovery", "FindiSport coach discovery screen"],
      ["Booking & scheduling", "FindiSport booking flow"],
      ["Admin portal", "FindiSport admin portal"],
      ["Marketing website", "FindiSport marketing website"],
    ]),
    parts: [
      {
        name: "Mobile app · React Native",
        contributions: [
          "Led development of the cross-platform app with React Native and Firebase: coach profiles, booking management, availability scheduling, in-app messaging and ratings.",
          "Integrated Stripe, Google Pay, Facebook Login, geolocation, push notifications and analytics for a seamless booking experience.",
          "Built scalable backend workflows and automated notifications with Firebase Cloud Functions and Firestore.",
          "Managed App Store and Play Store releases while leading the team and working with the client from concept to production.",
        ],
        stack: [
          "React Native",
          "Firebase (Firestore, Functions, Analytics)",
          "Stripe",
          "Google Pay",
          "Facebook Login",
          "Geolocation",
          "Push notifications",
        ],
      },
      {
        name: "Admin portal · React",
        contributions: [
          "Built responsive admin features in React and Ant Design to manage coaches, bookings, services and platform data.",
          "Developed frontend integrations with Firestore, Storage and Cloud Functions.",
        ],
        stack: ["React", "Ant Design", "Firebase (Firestore, Storage, Functions)"],
      },
      {
        name: "Marketing website · WordPress",
        contributions: [
          "Built and customised responsive WordPress pages and components.",
          "Developed PHP integrations with the FindiSport APIs to show live coach profiles, services and products.",
          "Implemented pagination, SEO optimisation and multilingual support.",
        ],
        stack: ["WordPress", "PHP", "REST APIs", "SEO", "Multilingual"],
      },
    ],
  },
  {
    slug: "hk-roots",
    name: "HK Roots",
    summary: "A digital mortgage platform and smart calculator for Hong Kong homebuyers.",
    tagline: "Making mortgage applications simpler for Hong Kong homebuyers.",
    overview:
      "HK Roots connects homebuyers with banks to streamline mortgage applications across Hong Kong. I built features across the platform, including automated bank-specific application forms, and developed a mortgage calculator that assesses affordability and recommends properties within a buyer's budget.",
    industry: "Fintech · Property",
    platforms: "Web",
    company: "Stacktrek Enterprise",
    role: "Software Engineer",
    timeline: "Sep 2018 – Feb 2020",
    location: "Hong Kong",
    link: { href: "https://hkroots.io", label: "Visit hkroots.io" },
    cardStack: ["React", "Node.js", "MongoDB"],
    images: images("hk-roots", [
      ["Mortgage application", "HK Roots mortgage application"],
      ["Affordability calculator", "HK Roots mortgage calculator"],
      ["Property recommendations", "HK Roots property recommendations"],
    ]),
    parts: [
      {
        name: "Mortgage platform",
        contributions: [
          "Built responsive features end to end with React, Node.js, FeathersJS, MongoDB and Material UI on AWS EC2.",
          "Automated data exports that generate bank-specific mortgage application forms, speeding up processing for multiple financial institutions.",
          "Integrated Google Analytics to track engagement, support SEO and inform product decisions.",
        ],
        stack: ["React", "Node.js", "FeathersJS", "MongoDB", "Material UI", "AWS EC2", "Google Analytics"],
      },
      {
        name: "Mortgage calculator",
        contributions: [
          "Built interactive mortgage calculation and recommendation features.",
          "Developed automated property data collection from listings to recommend homes matching each buyer's budget and preferences.",
        ],
        stack: ["React", "Node.js", "FeathersJS", "MongoDB", "Web scraping"],
      },
    ],
  },
  {
    slug: "virtual-control",
    name: "Virtual Control",
    summary: "A web video-management system for live facility monitoring, alerts and reports.",
    tagline: "Live video monitoring for facilities, in the browser.",
    overview:
      "Virtual Control is a web-based video management system. Users monitor facilities through live streams, manage video alerts, find sites on an interactive map and generate downloadable reports. I built the real-time monitoring features and deployed the app on AWS.",
    industry: "Security · Video",
    platforms: "Web",
    company: "Stacktrek Enterprise",
    role: "Software Engineer",
    timeline: "May 2018 – Sep 2018",
    cardStack: ["React", "Node.js", "AWS Kinesis"],
    images: images("virtual-control", [
      ["Live facility monitoring", "Virtual Control live video monitoring"],
      ["Interactive facility map", "Virtual Control facility map"],
      ["Alerts & reports", "Virtual Control alerts and reports"],
    ]),
    parts: [
      {
        name: "Web application",
        contributions: [
          "Developed responsive real-time monitoring and video management features with React, Node.js, FeathersJS, MongoDB and Material UI.",
          "Integrated Amazon Kinesis Video Streams for live video and real-time surveillance.",
          "Deployed and maintained the app on AWS Elastic Beanstalk for reliable, scalable hosting.",
        ],
        stack: ["React", "Node.js", "FeathersJS", "MongoDB", "Material UI", "AWS Kinesis", "AWS Elastic Beanstalk"],
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
