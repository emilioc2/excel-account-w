---
inclusion: always
---

# Coding Best Practices

## TypeScript

- Use strict typing — no `any`, prefer explicit return types on functions
- Define interfaces for all Sanity data shapes in `lib/sanity.ts`
- Use `type` for unions/intersections, `interface` for object shapes
- Prefer `const` over `let`; never use `var`

## React & Next.js

- Default to Server Components; only add `'use client'` when the component needs state, effects, or browser APIs
- Never fetch data inside Client Components — pass data as props from Server Components
- All Sanity data fetching goes through typed helpers in `lib/sanity.ts` with `cache: 'force-cache'` for SSG
- Every page file must export `generateMetadata()` with `title`, `description`, `canonical`, and Open Graph fields
- Use `next/image` for all images with a meaningful `alt` prop and responsive `sizes` attribute

## Component Design

- One component per file; filename matches the exported component name (PascalCase)
- Keep components focused — extract sub-components when JSX exceeds ~80 lines
- Avoid prop drilling beyond two levels; lift state or use context sparingly
- All interactive elements must meet touch target minimums: `min-h-[44px] min-w-[44px]`

## Styling (Tailwind CSS)

- Write all layout classes mobile-first; use `md:` and `lg:` prefixes for larger breakpoints
- Use theme tokens (`navy`, `teal`, `teal-dark`, `font-sans`) — avoid hardcoded hex values in JSX
- Hover/focus transitions: `transition-colors duration-200` or `transition-shadow duration-200`
- Respect `prefers-reduced-motion` for animations (use the `motion-safe:` Tailwind variant)

## Forms

- All forms use `react-hook-form` with a `zod` schema for validation
- Both `ContactForm` and `ServiceEnquiryForm` POST to `/api/contact`
- Show inline field-level error messages; disable the submit button while submitting
- Never expose API keys or secrets in Client Components

## Error Handling

- Route Handlers (`app/api/`) must return typed JSON responses with appropriate HTTP status codes
- Wrap external API calls (Sanity, Resend) in try/catch and return meaningful error messages
- Use Next.js `error.tsx` boundaries for page-level error states

## Testing

- Unit tests live alongside source files as `*.spec.tsx` or `*.test.tsx`
- Use React Testing Library queries in priority order: `getByRole` > `getByLabelText` > `getByText`
- Property-based tests use `fast-check` with a minimum of 100 iterations per property
- Accessibility tests use `axe-core` — run on every interactive component
- Run tests with `npx jest --runInBand` (single pass, no watch mode)

## SEO & Structured Data

- JSON-LD organisation schema lives in `app/layout.tsx`
- Service pages include `seoTitle` and `seoDescription` from Sanity
- `sitemap.ts` and `robots.ts` are auto-generated — keep them in sync with route changes
