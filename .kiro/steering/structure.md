# Project Structure

```
excel-accounting-website/
├── app/
│   ├── layout.tsx                  # Root layout — Nav, Footer, WhatsAppButton, org JSON-LD
│   ├── page.tsx                    # Home page (SSG)
│   ├── sitemap.ts                  # Auto-generated sitemap
│   ├── robots.ts                   # robots.txt
│   ├── about/page.tsx              # About page (SSG)
│   ├── services/
│   │   ├── page.tsx                # Services overview (SSG)
│   │   └── [slug]/page.tsx         # Individual service subpage (SSG via generateStaticParams)
│   ├── contact/page.tsx            # Contact page (static shell, client form)
│   └── api/contact/route.ts        # Route Handler — Resend email sending
├── components/
│   ├── Nav.tsx                     # Client Component — mobile drawer + active link
│   ├── Footer.tsx                  # Server Component
│   ├── Hero.tsx                    # Home hero section
│   ├── ServiceCard.tsx             # Service card (icon, heading, description, slug link)
│   ├── PillarCard.tsx              # Pillar card (heading + description)
│   ├── Accordion.tsx               # Client Component — single-open FAQ accordion
│   ├── ContactForm.tsx             # Client Component — react-hook-form + zod
│   ├── ServiceEnquiryForm.tsx      # Client Component — mini form pre-filled with service name
│   ├── WhatsAppButton.tsx          # Client Component — fixed floating button
│   └── ScrollRevealCTA.tsx         # Client Component — IntersectionObserver animation
├── sanity/
│   ├── schema/
│   │   ├── service.ts              # Service content type (incl. seoTitle, seoDescription)
│   │   ├── faqItem.ts              # FAQ/accordion item
│   │   └── siteSettings.ts        # Phone, emails, offices, hours
│   └── lib/client.ts               # Sanity client instance
├── lib/
│   └── sanity.ts                   # Typed GROQ fetch helpers + TypeScript interfaces
├── tailwind.config.ts
├── next.config.ts
└── sanity.config.ts
```

## Key Conventions

- **Server vs Client Components**: default to Server Components; add `'use client'` only for interactivity (state, effects, browser APIs)
- **Data fetching**: all Sanity fetches go through typed helpers in `lib/sanity.ts`; use `cache: 'force-cache'` for SSG pages
- **Routing**: App Router only — no `pages/` directory
- **Responsive**: all Tailwind layout classes written mobile-first; `md:` / `lg:` for larger breakpoints
- **Touch targets**: all interactive elements must have `min-h-[44px] min-w-[44px]`
- **Transitions**: hover states use `transition-colors duration-200` or `transition-shadow duration-200`
- **SEO**: every page exports `generateMetadata()` with title, description, canonical, and Open Graph tags
- **Forms**: both `ContactForm` and `ServiceEnquiryForm` POST to `/api/contact`; validated with zod schemas
