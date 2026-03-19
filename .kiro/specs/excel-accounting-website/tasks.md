# Implementation Plan: Excel Accounting Website Rebuild

## Overview

Incremental build of the Next.js 14 (App Router) marketing site for Excel Accounting Services. Each task produces working, integrated code — no orphaned components. TypeScript throughout, Tailwind CSS for styling, Sanity CMS for content, Resend for email, and Jest + fast-check for testing.

## Tasks

- [x] 1. Project scaffolding and configuration
  - Initialise Next.js 14 App Router project with TypeScript and Tailwind CSS
  - Configure `tailwind.config.ts` with `navy`, `teal`, `teal-dark` colours, `Inter` font, and `fade-slide-up` keyframe animation
  - Configure `next.config.ts` (image domains, strict mode)
  - Install and configure Sanity client in `sanity/lib/client.ts` and `sanity.config.ts`
  - Install dependencies: `react-hook-form`, `zod`, `resend`, `fast-check`, `@testing-library/react`, `jest`, `axe-core`
  - _Requirements: 13.4, 14.3_

- [x] 2. Sanity content schemas and typed fetch helpers
  - [x] 2.1 Create Sanity schema files
    - Write `sanity/schema/service.ts` with fields: `title`, `slug`, `icon`, `shortDescription`, `offerings`, `seoTitle`, `seoDescription`
    - Write `sanity/schema/faqItem.ts` with `question` and `answer` fields
    - Write `sanity/schema/siteSettings.ts` with phone, emails, offices, and hours fields
    - Register all schemas in `sanity.config.ts`
    - _Requirements: 16.5_
  - [x] 2.2 Write typed GROQ fetch helpers in `lib/sanity.ts`
    - Define `Service`, `FaqItem`, and `SiteSettings` TypeScript interfaces
    - Implement `getServices()`, `getServiceBySlug(slug)`, `getFaqItems()`, and `getSiteSettings()` with `cache: 'force-cache'`
    - Wrap each helper in try/catch; return empty array / null on error
    - _Requirements: 16.5_
  - [x] 2.3 Write property test for sitemap completeness (Property 20)
    - **Property 20: Sitemap includes all static routes and all service slug routes**
    - **Validates: Requirements 16.3**

- [x] 3. Root layout — Nav, Footer, WhatsAppButton, and JSON-LD
  - [x] 3.1 Implement `components/Nav.tsx` (Client Component)
    - Render logo text, links to `/`, `/about`, `/services`, `/contact`, phone CTA, and "Get in Touch" button on desktop
    - Mobile full-screen slide-in drawer toggled by hamburger button
    - Use `usePathname` to apply `aria-current="page"` to the active link
    - All interactive elements: `min-h-[44px] min-w-[44px]`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8_
  - [x] 3.2 Write property tests for Nav (Properties 1–4)
    - **Property 1: Nav renders required elements on every page**
    - **Property 2: Nav link hrefs are correct**
    - **Property 3: Active page link is indicated**
    - **Property 4: Hamburger toggle is a round-trip**
    - **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7**
  - [x] 3.3 Implement `components/Footer.tsx` (Server Component)
    - Render both office addresses, emails, office hours, copyright notice, and "Designed & Developed by Eternity" attribution
    - Bottom bar: copyright left, attribution right (`flex-col md:flex-row justify-between`)
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6_
  - [x] 3.4 Write property test for Footer (Property 11)
    - **Property 11: Footer renders required content on every page**
    - **Validates: Requirements 12.1, 12.2, 12.3, 12.4, 12.5, 12.6**
  - [x] 3.5 Implement `components/WhatsAppButton.tsx` (Client Component)
    - Fixed bottom-right, `href="https://wa.me/27217828927"`, `target="_blank"`, `aria-label="Chat with us on WhatsApp"`
    - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5_
  - [x] 3.6 Write property test for WhatsAppButton (Property 18)
    - **Property 18: WhatsApp button is present on every page and links to the correct URL**
    - **Validates: Requirements 17.1, 17.2, 17.3, 17.5**
  - [x] 3.7 Wire Nav, Footer, and WhatsAppButton into `app/layout.tsx`
    - Add Organization JSON-LD schema block in `<head>`
    - _Requirements: 16.2_

- [x] 4. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Shared UI components
  - [x] 5.1 Implement `components/ServiceCard.tsx` (Server Component)
    - Props: `title`, `icon`, `shortDescription`, `slug`
    - Render icon, heading, description, and "Learn More" link to `/services/${slug}`
    - Card hover: `transition-shadow duration-200`; link: `min-h-[44px]`
    - _Requirements: 3.3, 5.2, 9.3, 9.4_
  - [x] 5.2 Write property test for ServiceCard (Property 5)
    - **Property 5: ServiceCard renders required sub-elements**
    - **Validates: Requirements 3.3, 5.2, 9.3, 9.4**
  - [x] 5.3 Implement `components/PillarCard.tsx` (Server Component)
    - Props: `heading`, `description`
    - _Requirements: 4.2_
  - [x] 5.4 Write property test for PillarCard (Property 6)
    - **Property 6: PillarCard renders required sub-elements**
    - **Validates: Requirements 4.2**
  - [x] 5.5 Implement `components/Accordion.tsx` (Client Component)
    - Single-open behaviour: clicking an open item closes it; opening a new item closes the previous
    - `aria-expanded` on each trigger; panel hidden/shown accordingly
    - _Requirements: 6.2, 6.3, 6.4_
  - [x] 5.6 Write property tests for Accordion (Properties 7–8)
    - **Property 7: Accordion toggle is a round-trip**
    - **Property 8: Accordion mutual exclusion**
    - **Validates: Requirements 6.2, 6.3, 6.4**
  - [x] 5.7 Implement `components/ScrollRevealCTA.tsx` (Client Component)
    - Use `IntersectionObserver` with `threshold: 0.2`; trigger `animate-fade-slide-up` once
    - Read `prefers-reduced-motion` on mount; skip animation class if `reduce`
    - _Requirements: 18.1, 18.2, 18.3, 18.4_
  - [x] 5.8 Implement `components/Hero.tsx` (Server Component)
    - Render tagline text and "Learn More" CTA linking to `/about`
    - _Requirements: 2.1, 2.2, 2.3_

- [x] 6. Home page (`app/page.tsx`)
  - Fetch services and FAQ items from Sanity via typed helpers
  - Render Hero, company introduction text (Fishhoek and Helderberg offices), 3 ServiceCards (Accounting & Tax, Legal, Secretarial), 3 PillarCards (Professionals, Trusted, Experts), full 6-item services list with icons, tax Accordion (≥ 6 items), clients section with all 10 client names, and ScrollRevealCTA "Contact Us" banner
  - Export `generateMetadata()` with title, description, canonical, and Open Graph tags
  - _Requirements: 2.1, 2.2, 3.1, 3.2, 3.3, 4.1, 4.2, 5.1, 5.2, 5.3, 6.1, 7.1, 7.2, 16.1, 16.6, 18.1_

- [x] 7. About page (`app/about/page.tsx`)
  - Render heading "ABOUT OUR COMPANY", 3 PillarCards (Trust, Knowledge, The Client), full company body text, "Our Services" CTA to `/services`, and "Contact Us" CTA to `/contact`
  - Export `generateMetadata()`
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 16.1, 16.6_

- [x] 8. Services overview page (`app/services/page.tsx`)
  - Fetch all services from Sanity
  - Render heading "OUR SERVICES" and 6 ServiceCards each linking to `/services/${slug}`
  - Export `generateMetadata()`
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 16.1, 16.6_
  - [x] 8.1 Write property test for service overview card links (Property 16)
    - **Property 16: Service sections on Services overview have correct links**
    - **Validates: Requirements 9.3, 9.4**

- [x] 9. Individual service subpages (`app/services/[slug]/page.tsx`)
  - [x] 9.1 Implement `generateStaticParams` to pre-render all 6 service slugs
    - Call `getServices()` and return slug array
    - Call `notFound()` when `getServiceBySlug` returns null
    - _Requirements: 15.1_
  - [x] 9.2 Implement `ServiceEnquiryForm` component (`components/ServiceEnquiryForm.tsx`)
    - Client Component; zod schema with `name` (required), `email` (required), `phone` (optional), `serviceName` (hidden, pre-filled), `message` (optional)
    - POST to `/api/contact`; show success message on `{ success: true }`
    - Disable submit button while submitting; show inline field-level errors
    - _Requirements: 15.4, 10.3, 10.4, 10.5_
  - [x] 9.3 Write property test for ServiceEnquiryForm pre-fill (Property 19)
    - **Property 19: ServiceEnquiryForm pre-fills the service name**
    - **Validates: Requirements 15.4**
  - [x] 9.4 Implement service subpage layout
    - Render hero with service name heading, full offerings list, `ServiceEnquiryForm`, and "Contact Us" CTA section
    - Export `generateMetadata()` returning `seoTitle` / `seoDescription` from Sanity; include canonical and Open Graph tags
    - Inject Service JSON-LD schema block
    - _Requirements: 15.2, 15.3, 15.4, 15.5, 15.6, 15.7, 16.1, 16.5, 16.6_
  - [x] 9.5 Write property test for service subpage SEO metadata (Property 17)
    - **Property 17: Each service subpage has unique SEO metadata containing the service name**
    - **Validates: Requirements 15.6, 16.1**

- [x] 10. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Contact page and API route
  - [x] 11.1 Implement `components/ContactForm.tsx` (Client Component)
    - Fields: Name (required), Email (required), Message, Cell Phone, Company
    - Zod schema validation; inline errors; disable submit while submitting; success confirmation on `{ success: true }`
    - _Requirements: 10.2, 10.3, 10.4, 10.5_
  - [x] 11.2 Write property tests for ContactForm validation (Properties 9–10)
    - **Property 9: ContactForm rejects invalid submissions**
    - **Property 10: Valid form submission shows confirmation**
    - **Validates: Requirements 10.3, 10.4, 10.5**
  - [x] 11.3 Implement `app/api/contact/route.ts` (Route Handler)
    - Validate `name` and `email` presence; return 400 `{ error: 'Missing required fields.' }` if absent
    - Send email via Resend SDK to `info@excelaccounting.co.za`; include `serviceName` in subject when present
    - Return 200 `{ success: true }` on success; 500 `{ error: 'Failed to send email.' }` on Resend error
    - _Requirements: 10.5_
  - [x] 11.4 Implement `app/contact/page.tsx`
    - Render heading "CONTACT US"
    - Render three info cards at the top: "Call Us" (021-782 8927), "Email Us" (info@excelaccounting.co.za), "Office Hours" (Mon–Thu 07:30–16:00, Fri 07:30–13:30)
    - Render `ContactForm`
    - Render two office cards: Fish Hoek Office (Windsor House, 83 Main Rd, Fish Hoek, 7975) and Strand Office (Office 1, Ocean Breeze, Beach Rd, Strand, 7139)
    - Render closing blurb: "Choose Excel Accounting — If you are serious about growing your business..."
    - Export `generateMetadata()`
    - _Requirements: 10.1, 11.1, 11.2, 11.3, 11.4, 16.1, 16.6_

- [x] 12. SEO infrastructure — sitemap and robots
  - Implement `app/sitemap.ts`: fetch all services, return static routes + `/services/${slug}` entries
  - Implement `app/robots.ts`: allow all crawlers, reference sitemap URL
  - _Requirements: 16.3, 16.4_
  - [x] 12.1 Write property test for sitemap completeness (Property 20)
    - **Property 20: Sitemap includes all static routes and all service slug routes**
    - **Validates: Requirements 16.3**

- [x] 13. Accessibility and semantic HTML audit
  - [x] 13.1 Verify semantic HTML structure across all pages
    - Ensure every page rendered through the root layout contains `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>`
    - _Requirements: 14.2_
  - [x] 13.2 Write property test for semantic HTML structure (Property 13)
    - **Property 13: Semantic HTML structure on every page**
    - **Validates: Requirements 14.2**
  - [x] 13.3 Write property test for image alt text (Property 12)
    - **Property 12: All images have non-empty alt text**
    - **Validates: Requirements 14.1**
  - [x] 13.4 Write property test for keyboard reachability (Property 14)
    - **Property 14: Interactive elements are keyboard-reachable**
    - **Validates: Requirements 14.4**
  - [x] 13.5 Write property test for colour contrast (Property 15)
    - **Property 15: Tailwind colour pairs meet WCAG AA contrast**
    - **Validates: Requirements 14.5**

- [x] 14. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use `fast-check` with a minimum of 100 iterations; tag format: `// Feature: excel-accounting-website, Property N: <property_text>`
- Unit tests live alongside source files as `*.spec.tsx`; run with `npx jest --runInBand`
- All Sanity fetches use `cache: 'force-cache'` for SSG; errors fall back to empty arrays so the build never fails
