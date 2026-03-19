# Tech Stack

## Core Framework
- **Next.js 14** (App Router) — SSG for all pages, Edge/serverless Route Handlers
- **React** — Client Components only where interactivity is needed (`'use client'`)
- **TypeScript** — strict typing throughout

## Styling
- **Tailwind CSS** — mobile-first utility classes; `md:` and `lg:` breakpoint prefixes for larger screens
- Custom theme extensions in `tailwind.config.ts`:
  - Colors: `navy` (`#1e2a3a`), `teal` (`#2a9d8f`), `teal-dark` (`#21867a`)
  - Font: `Inter` (sans-serif)
  - Animation: `fade-slide-up` keyframe for scroll-triggered CTAs

## Content Management
- **Sanity CMS** — content types: `service`, `faqItem`, `siteSettings`
- Typed GROQ fetch helpers in `lib/sanity.ts`
- Config in `sanity.config.ts`

## Forms & Validation
- **react-hook-form** + **zod** — client-side form validation
- **Resend** — transactional email via `/api/contact` Route Handler

## Images
- `next/image` with responsive `sizes` prop — required for all images

## Testing
- **Jest** + **React Testing Library** — unit tests
- **fast-check** — property-based tests (minimum 100 iterations per property)
- **axe-core** — accessibility testing
- **Playwright** — optional E2E tests

## Deployment
- **Vercel** — production hosting

## Common Commands

```bash
# Development
npm run dev

# Build
npm run build

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Run tests (single pass)
npx jest --runInBand

# Run a specific test file
npx jest path/to/test.spec.tsx
```
