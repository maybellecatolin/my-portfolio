# Maybelle Catolin Portfolio

A responsive portfolio website for Maybelle Catolin, a senior software engineer focused on frontend architecture, React Native, digital identity, security, and accessible product experiences.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4 build pipeline
- ESLint

## Project structure

```text
app/                         Next.js routes and global styles
components/common/           Shared presentation primitives
features/portfolio/          Portfolio feature UI and content data
public/                      Static assets
```

The route entry point stays intentionally small. Portfolio content lives in `features/portfolio/data.ts`, while each page section has a focused component under `features/portfolio/components/`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Commands

```bash
npm run dev      # Start the local development server
npm run lint     # Run ESLint
npm run build    # Create a production build
npm run start    # Serve the production build
```

## Content updates

Update project, experience, and capability entries in `features/portfolio/data.ts`. Update section presentation in the matching component under `features/portfolio/components/`.

The app uses the Next.js App Router and server components by default. Keep browser-only behavior isolated to a client component if interactive features are added later.