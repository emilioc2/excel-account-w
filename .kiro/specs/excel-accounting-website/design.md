# Design Document: Excel Accounting Website Rebuild

## Overview

A multi-page marketing website for Excel Accounting Services, a South African accounting firm based in the Western Cape. The rebuild modernises the visual design to match the approved prototype (dark navy + teal palette, Inter typography, card-based layouts) while preserving all original content and adding individual service subpages, full SEO metadata, a floating WhatsApp button, scroll-triggered CTA animations, and mobile-first responsive design.

Built with **Next.js 14 (App Router)**, styled with **Tailwind CSS**, content managed via **Sanity CMS**, deployed on **Vercel**, and contact form emails sent via **Resend**.

Visual reference: https://excel-point-pro.base44.app

Pages (App Router routes):
- `/` → Home (`app/page.tsx`)
- `/about` → About (`app/about/page.tsx`)
- `/services` → Services overview (`app/services/page.tsx`)
- `/services/[slug]` → Individual service subpage (`app/services/[slug]/page.tsx`)
- `/contact` → Contact (`app/contact/page.tsx`)
- `/sitemap.xml` → Auto-generated sitemap (`app/sitemap.ts`)
- `/robots.txt` → Crawl rules (`app/robots.ts`)

---

## Architecture

### Rendering Strategy

| Route | Strategy | Data source |
|-------|----------|-------------|
| `/` | SSG — `fetch` with `cache: 'force-cache'` | Sanity |
| `/about` | SSG — `fetch` with `cache: 'force-cache'` | Static / Sanity |
| `/services` | SSG — `fetch` with `cache: 'force-cache'` | Sanity |
| `/services/[slug]` | SSG — `generateStaticParams` from Sanity slugs | Sanity |
| `/contact` | Static shell; form is client-side | Sanity (office details) |
| `/api/contact` | Edge/serverless Route Handler | Resend SDK |
| `/sitemap.xml` | Generated at build via `app/sitemap.ts` | Sanity + static routes |
| `/robots.txt` | Generated at build via `app/robots.ts` | Static |

Pages are statically generated at build time. The `/services/[slug]` route uses `generateStaticParams` to pre-render all 6 service pages from Sanity slugs. The contact form is a React Client Component that POSTs to `/api/contact` at runtime.

### Project Structure

```
excel-accounting-website/
├── app/
│   ├── layout.tsx                    # Root layout — Nav, Footer, WhatsAppButton, JSON-LD org schema
│   ├── page.tsx                      # Home (SSG)
│   ├── sitemap.ts                    # Sitemap generator
│   ├── robots.ts                     # robots.txt generator
│   ├── about/
│   │   └── page.tsx                  # About (SSG)
│   ├── services/
│   │   ├── page.tsx                  # Services overview (SSG)
│   │   └── [slug]/
│   │       └── page.tsx              # Service subpage (SSG via generateStaticParams)
│   ├── contact/
│   │   └── page.tsx                  # Contact (static shell)
│   └── api/
│       └── contact/
│           └── route.ts              # Serverless Route Handler — Resend
├── components/
│   ├── Nav.tsx                       # Site-wide navigation (Client Component — drawer + active link)
│   ├── Footer.tsx                    # Site-wide footer (Server Component)
│   ├── Hero.tsx                      # Home hero section
│   ├── ServiceCard.tsx               # Service card (icon + heading + description + link)
│   ├── PillarCard.tsx                # Pillar card (heading + description)
│   ├── Accordion.tsx                 # FAQ/tax accordion (Client Component)
│   ├── ContactForm.tsx               # Contact form (Client Component — react-hook-form + zod)
│   ├── ServiceEnquiryForm.tsx        # Mini enquiry form on service subpages (Client Component)
│   ├── WhatsAppButton.tsx            # Fixed floating WhatsApp button (Client Component)
│   └── ScrollRevealCTA.tsx           # Scroll-triggered CTA banner (Client Component)
├── sanity/
│   ├── schema/
│   │   ├── service.ts                # Service content type (+ seoTitle, seoDescription)
│   │   ├── faqItem.ts                # FAQ/accordion item content type
│   │   └── siteSettings.ts          # Phone, emails, offices, hours
│   └── lib/
│       └── client.ts                 # Sanity client instance
├── lib/
│   └── sanity.ts                     # Typed fetch helpers
├── tailwind.config.ts
├── next.config.ts
└── sanity.config.ts
```

### Data Flow

```
Build time:
  Sanity CMS → lib/sanity.ts (typed fetch) → SSG page components → static HTML
  generateStaticParams → /services/[slug] × 6 pages

Runtime (contact / enquiry forms):
  ContactForm / ServiceEnquiryForm (client) → POST /api/contact → Resend SDK → info@excelaccounting.co.za
```

### Tailwind Theme

Extended in `tailwind.config.ts`:

```ts
theme: {
  extend: {
    colors: {
      navy: '#1e2a3a',
      teal: { DEFAULT: '#2a9d8f', dark: '#21867a' },
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
    // Animation utilities for scroll-triggered CTAs
    keyframes: {
      fadeSlideUp: {
        '0%':   { opacity: '0', transform: 'translateY(24px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
    },
    animation: {
      'fade-slide-up': 'fadeSlideUp 0.5s ease-out forwards',
    },
  },
}
```

Transition utilities used on interactive elements:

```
transition-colors duration-200   // colour hover on links/buttons
transition-shadow duration-200   // shadow on card hover
transition-transform duration-200 // scale on button hover
```

---

## Components and Interfaces

### Nav Component (`components/Nav.tsx`)

Client Component. On mobile (< 768px) the menu renders as a full-screen slide-in drawer. On desktop a "Get in Touch" button appears alongside the phone CTA.

```tsx
'use client'
export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-navy sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-white font-bold text-lg">
          <span className="text-teal">E</span> Excel Accounting Services
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-6">
          {navLinks.map(([href, label]) => (
            <li key={href}>
              <Link href={href} aria-current={pathname === href ? 'page' : undefined}
                className={pathname === href ? 'text-teal' : 'text-white hover:text-teal transition-colors duration-200'}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:0217828927" className="text-teal font-semibold">021-782 8927</a>
          <Link href="/contact" className="btn-teal min-h-[44px] min-w-[44px]">Get in Touch</Link>
        </div>

        {/* Hamburger */}
        <button aria-label="Toggle navigation" aria-expanded={open}
          onClick={() => setOpen(o => !o)}
          className="md:hidden text-white min-h-[44px] min-w-[44px] flex items-center justify-center">
          {/* icon */}
        </button>
      </nav>

      {/* Mobile full-screen drawer */}
      <div className={`fixed inset-0 bg-navy z-40 flex flex-col items-center justify-center
        transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
        <button aria-label="Close navigation" onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-white min-h-[44px] min-w-[44px]">✕</button>
        <ul className="flex flex-col gap-8 text-2xl">
          {navLinks.map(([href, label]) => (
            <li key={href}>
              <Link href={href} onClick={() => setOpen(false)}
                className={pathname === href ? 'text-teal' : 'text-white'}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
```

### ServiceCard Component (`components/ServiceCard.tsx`)

Server Component. Now includes a `slug` prop to link to the service subpage.

```tsx
interface ServiceCardProps {
  title: string
  icon: string
  shortDescription: string
  slug: string
}

export default function ServiceCard({ title, icon, shortDescription, slug }: ServiceCardProps) {
  return (
    <article className="bg-white rounded-lg shadow p-6 flex flex-col gap-3
      hover:shadow-lg transition-shadow duration-200">
      <div className="text-teal text-3xl">{/* icon */}</div>
      <h3 className="font-semibold text-navy text-lg">{title}</h3>
      <p className="text-gray-600 text-sm">{shortDescription}</p>
      <Link href={`/services/${slug}`}
        className="mt-auto text-teal font-semibold hover:text-teal-dark transition-colors duration-200
          min-h-[44px] flex items-center">
        Learn More →
      </Link>
    </article>
  )
}
```

### WhatsAppButton Component (`components/WhatsAppButton.tsx`)

Client Component. Fixed to the bottom-right corner on all pages via the root layout.

```tsx
'use client'
export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/27217828927"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600
        text-white rounded-full w-14 h-14 flex items-center justify-center
        shadow-lg transition-colors duration-200"
    >
      {/* WhatsApp SVG icon */}
    </a>
  )
}
```

Rendered once in `app/layout.tsx` so it appears on every page.

### ServiceEnquiryForm Component (`components/ServiceEnquiryForm.tsx`)

Client Component. A mini contact form pre-filled with the service name. Reuses the same `/api/contact` Route Handler.

```tsx
'use client'

const schema = z.object({
  name:        z.string().min(1, 'Please enter your name.'),
  email:       z.string().email('Please enter a valid email address.'),
  phone:       z.string().optional(),
  serviceName: z.string(),   // pre-filled, read-only
  message:     z.string().optional(),
})

export default function ServiceEnquiryForm({ serviceName }: { serviceName: string }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { serviceName },
  })
  const [success, setSuccess] = useState(false)

  const onSubmit = async (data) => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if ((await res.json()).success) setSuccess(true)
  }

  if (success) return <p role="alert">Thank you — we'll be in touch shortly.</p>

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <input type="hidden" {...register('serviceName')} />
      <p className="text-sm text-gray-500">Enquiring about: <strong>{serviceName}</strong></p>
      {/* name, email, phone, message fields */}
      <button type="submit" className="btn-teal min-h-[44px]">Send Enquiry</button>
    </form>
  )
}
```

### ScrollRevealCTA Component (`components/ScrollRevealCTA.tsx`)

Client Component. Uses `IntersectionObserver` to animate the CTA banner into view once. Respects `prefers-reduced-motion`.

```tsx
'use client'
export default function ScrollRevealCTA({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const prefersReduced = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}
      className={prefersReduced.current
        ? ''
        : visible ? 'animate-fade-slide-up' : 'opacity-0'}>
      {children}
    </div>
  )
}
```

### PillarCard, Accordion, ContactForm, Hero, Footer

These components are unchanged from the original design except:
- All interactive elements gain `min-h-[44px] min-w-[44px]` for touch targets.
- Hover states use `transition-colors duration-200` / `transition-shadow duration-200`.
- Footer `display on all 4 pages` updated to `all pages` (including service subpages).
- Footer bottom bar renders two items side-by-side: the copyright notice on the left and `Designed & Developed by Eternity` on the right:

```tsx
<div className="container mx-auto px-4 mt-8 border-t border-gray-700 pt-4 text-sm
  flex flex-col md:flex-row justify-between gap-2">
  <p>© {new Date().getFullYear()} Excel Accounting Services. All rights reserved.</p>
  <p>Designed &amp; Developed by <span className="text-teal">Eternity</span></p>
</div>
```

### API Route Handler (`app/api/contact/route.ts`)

Unchanged. Accepts both `ContactForm` and `ServiceEnquiryForm` submissions (the `serviceName` field is included in the email subject when present).

---

## Data Models

### Sanity Content Types

#### `service` (`sanity/schema/service.ts`)

```ts
{
  name: 'service',
  fields: [
    { name: 'title',            type: 'string' },
    { name: 'slug',             type: 'slug', options: { source: 'title' } },
    { name: 'icon',             type: 'string' },
    { name: 'shortDescription', type: 'text' },
    { name: 'offerings',        type: 'array', of: [{ type: 'string' }] },
    { name: 'seoTitle',         type: 'string' },   // e.g. "Accounting Services | Excel Accounting Services"
    { name: 'seoDescription',   type: 'text' },     // unique meta description per service
  ]
}
```

Six service documents: Accounting Services, Tax Services, Secretarial Services, Payroll, Legal, Bookkeeping.

#### `faqItem` and `siteSettings`

Unchanged from original design.

### TypeScript Types (`lib/sanity.ts`)

```ts
export interface Service {
  title: string
  slug: string
  icon: string
  shortDescription: string
  offerings: string[]
  seoTitle: string
  seoDescription: string
}
```

### ContactFormData / ServiceEnquiryFormData

```ts
// ContactForm (full form)
{ name: string; email: string; phone?: string; company?: string; message?: string }

// ServiceEnquiryForm (mini form)
{ name: string; email: string; phone?: string; serviceName: string; message?: string }
```

### SEO Metadata Pattern

Each page exports `generateMetadata()`:

```ts
// app/services/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug)
  return {
    title: service.seoTitle ?? `${service.title} | Excel Accounting Services`,
    description: service.seoDescription,
    alternates: { canonical: `https://excelaccounting.co.za/services/${params.slug}` },
    openGraph: {
      title: service.seoTitle ?? service.title,
      description: service.seoDescription,
      url: `https://excelaccounting.co.za/services/${params.slug}`,
    },
  }
}
```

### JSON-LD Structured Data

Organization schema in `app/layout.tsx` (all pages):

```ts
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Excel Accounting Services',
  url: 'https://excelaccounting.co.za',
  telephone: '+27217828927',
  address: { '@type': 'PostalAddress', streetAddress: 'Windsor House, Main Road',
    addressLocality: 'Fishhoek', postalCode: '7975', addressCountry: 'ZA' },
}
```

Service schema on each `/services/[slug]` page:

```ts
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.title,
  provider: { '@type': 'Organization', name: 'Excel Accounting Services' },
  description: service.seoDescription,
  url: `https://excelaccounting.co.za/services/${service.slug}`,
}
```

### Sitemap (`app/sitemap.ts`)

```ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getServices()
  const staticRoutes = ['/', '/about', '/services', '/contact'].map(url => ({
    url: `https://excelaccounting.co.za${url}`,
    lastModified: new Date(),
  }))
  const serviceRoutes = services.map(s => ({
    url: `https://excelaccounting.co.za/services/${s.slug}`,
    lastModified: new Date(),
  }))
  return [...staticRoutes, ...serviceRoutes]
}
```

### robots.txt (`app/robots.ts`)

```ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://excelaccounting.co.za/sitemap.xml',
  }
}
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Nav renders required elements on every page

*For any* page rendered through the root layout, the rendered output of the `Nav` component should contain the company logo text "Excel Accounting Services", links to all routes (`/`, `/about`, `/services`, `/contact`), and the phone number "021-782 8927".

**Validates: Requirements 1.1, 1.2, 1.3**

### Property 2: Nav link hrefs are correct

*For any* navigation link rendered by the `Nav` component, its `href` attribute should point to the correct corresponding route.

**Validates: Requirements 1.6**

### Property 3: Active page link is indicated

*For any* pathname passed to the `Nav` component, exactly one nav link should carry `aria-current="page"`, and it should be the link whose `href` matches the current pathname.

**Validates: Requirements 1.7**

### Property 4: Hamburger toggle is a round-trip

*For any* initial open/closed state of the `Nav` component's mobile drawer, clicking the hamburger button should toggle the state — if closed it opens, if open it closes — and clicking it again should return to the original state.

**Validates: Requirements 1.4, 1.5**

### Property 5: ServiceCard renders required sub-elements

*For any* `Service` object with a non-empty `title`, `icon`, `shortDescription`, and `slug`, rendering a `ServiceCard` should produce output containing the title text, an icon element, the description text, and a link with `href="/services/${slug}"`.

**Validates: Requirements 3.3, 5.2, 9.3, 9.4**

### Property 6: PillarCard renders required sub-elements

*For any* pillar object with a non-empty `heading` and `description`, rendering a `PillarCard` should produce output containing the heading text and the description text.

**Validates: Requirements 4.2**

### Property 7: Accordion toggle is a round-trip

*For any* `Accordion` component with at least one item, clicking an item's trigger when it is closed should open it (`aria-expanded` becomes `true`); clicking the same trigger again should close it (`aria-expanded` becomes `false`).

**Validates: Requirements 6.2, 6.3**

### Property 8: Accordion mutual exclusion

*For any* `Accordion` component and any sequence of item clicks, after each click at most one item should have `aria-expanded="true"`.

**Validates: Requirements 6.4**

### Property 9: ContactForm rejects invalid submissions

*For any* form submission where `name` is empty, `email` is empty, or `email` does not match a valid email pattern, the Zod schema should produce a validation error and the form should display that error without showing the success confirmation.

**Validates: Requirements 10.3, 10.4**

### Property 10: Valid form submission shows confirmation

*For any* form submission where `name` is a non-empty string and `email` matches a valid email address pattern, submitting the form and receiving `{ success: true }` should hide the form and display the success confirmation message.

**Validates: Requirements 10.5**

### Property 11: Footer renders required content on every page

*For any* page rendered through the root layout, the `Footer` should contain both office addresses, both email addresses, office hours, a copyright notice, and the attribution text "Designed & Developed by Eternity".

**Validates: Requirements 12.1, 12.2, 12.3, 12.4, 12.5, 12.6**

### Property 12: All images have non-empty alt text

*For any* `next/image` component rendered across all pages and components, the `alt` prop should be present and non-empty.

**Validates: Requirements 14.1**

### Property 13: Semantic HTML structure on every page

*For any* page rendered through the root layout, the rendered HTML should contain at least one each of `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>`.

**Validates: Requirements 14.2**

### Property 14: Interactive elements are keyboard-reachable

*For any* interactive element (button, anchor, input, textarea) rendered across all components, the element should not have `tabIndex={-1}` while visible and should not carry `aria-hidden="true"` while interactive.

**Validates: Requirements 14.4**

### Property 15: Tailwind colour pairs meet WCAG AA contrast

*For any* text/background colour pair defined in the Tailwind theme extension used for body text, the computed WCAG contrast ratio should be at least 4.5:1.

**Validates: Requirements 14.5**

### Property 16: Service sections on Services overview have correct links

*For any* service card rendered on the `/services` overview page, the card should contain a link with `href` matching `/services/${slug}` for that service.

**Validates: Requirements 9.3, 9.4**

### Property 17: Each service subpage has unique SEO metadata containing the service name

*For any* service slug, calling `generateMetadata({ params: { slug } })` should return a `title` string that contains the service's name and a non-empty `description` string that is distinct from the descriptions of all other service slugs.

**Validates: Requirements 15.6, 16.1**

### Property 18: WhatsApp button is present on every page and links to the correct URL

*For any* page rendered through the root layout, the rendered output should contain an anchor element with `href="https://wa.me/27217828927"`, `aria-label="Chat with us on WhatsApp"`, and `target="_blank"`.

**Validates: Requirements 17.1, 17.2, 17.3, 17.5**

### Property 19: Service subpage enquiry form pre-fills the service name

*For any* service slug, rendering the `ServiceEnquiryForm` with that service's name as the `serviceName` prop should produce a form whose hidden `serviceName` field has a value equal to the service name, and whose visible label text contains the service name.

**Validates: Requirements 15.4**

### Property 20: Sitemap includes all static routes and all service slug routes

*For any* set of service documents returned by Sanity, calling the `sitemap()` function should return an array that includes entries for `/`, `/about`, `/services`, `/contact`, and one entry for each service slug in the format `/services/${slug}`.

**Validates: Requirements 16.3**

---

## Error Handling

### Form Validation Errors (Client-side)

| Condition | Zod rule | Error message |
|-----------|----------|--------------|
| Name is empty | `z.string().min(1)` | "Please enter your name." |
| Email is empty | `z.string().email()` | "Please enter a valid email address." |
| Email is malformed | `z.string().email()` | "Please enter a valid email address." |

Applies to both `ContactForm` and `ServiceEnquiryForm`.

### API Route Errors (`/api/contact`)

| Condition | HTTP status | Response body |
|-----------|-------------|--------------|
| Missing name or email | 400 | `{ error: 'Missing required fields.' }` |
| Resend SDK throws | 500 | `{ error: 'Failed to send email.' }` |
| Success | 200 | `{ success: true }` |

### Sanity Fetch Errors

Typed fetch helpers in `lib/sanity.ts` wrap GROQ queries in try/catch. On error, pages fall back to empty arrays / default values so the build does not fail.

### Missing Service Slug

If a visitor navigates to `/services/unknown-slug`, Next.js App Router returns a 404 via `notFound()` called inside the page component when `getServiceBySlug` returns null.

### Scroll Animation — Reduced Motion

`ScrollRevealCTA` reads `prefers-reduced-motion` on mount. If `reduce` is set, the component renders children immediately without any animation class, satisfying Requirement 18.4.

---

## Testing Strategy

### Dual Testing Approach

Both unit tests and property-based tests are used. Unit tests cover specific examples and edge cases; property tests verify universal behaviours across many generated inputs.

### Unit Tests (Jest + React Testing Library)

- Nav renders logo, all links, phone number, and "Get in Touch" button
- Nav mobile drawer: hidden by default, visible after hamburger click, closes on link click
- Hero renders tagline and CTA with correct href
- Home page renders 3 ServiceCards, 3 PillarCards, 6 service items, and "Contact Us" CTA
- About page renders heading, 3 pillars, body text, and CTAs
- Services overview renders 6 ServiceCards each with a `/services/[slug]` link
- Service subpage renders hero with service name, offerings list, ServiceEnquiryForm, and CTA section
- ServiceEnquiryForm: service name pre-filled, form submits correctly, success message shown
- WhatsAppButton renders with correct href, target, and aria-label
- ScrollRevealCTA: no animation class when `prefers-reduced-motion: reduce`; animation class applied after IntersectionObserver fires
- Contact page renders form fields and office details
- Footer renders both addresses, emails, hours, copyright, and "Designed & Developed by Eternity" attribution on all page types
- Accordion initial state: all panels hidden
- ContactForm initial state: no errors, success message hidden
- API route returns `{ success: true }` when Resend resolves
- API route returns `{ error: ... }` when Resend rejects
- `sitemap()` returns entries for all 4 static routes + 6 service routes
- `generateMetadata` for a service slug returns title containing service name

### Property-Based Tests (fast-check)

Property-based tests use **fast-check**. Each test runs a minimum of **100 iterations**.

Tag format: `// Feature: excel-accounting-website, Property N: <property_text>`

| Property | Test description | fast-check arbitraries |
|----------|-----------------|----------------------|
| P1: Nav required elements | Render `Nav` with each pathname; assert logo, links, phone present | `fc.constantFrom('/', '/about', '/services', '/contact', '/services/accounting')` |
| P2: Nav link hrefs | For each nav link, assert href matches expected route | `fc.constantFrom(...navLinks)` |
| P3: Active page indication | For each pathname, assert exactly one link has `aria-current="page"` | `fc.constantFrom('/', '/about', '/services', '/contact')` |
| P4: Hamburger toggle round-trip | Simulate click sequence; assert open state toggles correctly | `fc.array(fc.boolean())` |
| P5: ServiceCard sub-elements | Render with generated props; assert icon, heading, description, and slug link present | `fc.record({ title: fc.string({minLength:1}), icon: fc.string({minLength:1}), shortDescription: fc.string({minLength:1}), slug: fc.string({minLength:1}) })` |
| P6: PillarCard sub-elements | Render with generated props; assert heading and description present | `fc.record({ heading: fc.string({minLength:1}), description: fc.string({minLength:1}) })` |
| P7: Accordion toggle round-trip | Open item N, close item N; assert `aria-expanded` returns to false | `fc.integer({min:0, max:5})` |
| P8: Accordion mutual exclusion | Click random sequence; assert at most 1 has `aria-expanded="true"` | `fc.array(fc.integer({min:0, max:5}), {minLength:1})` |
| P9: Form rejects invalid inputs | Generate invalid form data; assert Zod parse fails and error shown | `fc.oneof(emptyNameRecord, malformedEmailRecord)` |
| P10: Form accepts valid inputs | Generate valid form data; mock fetch; assert success message shown | `fc.record({ name: fc.string({minLength:1}), email: fc.emailAddress() })` |
| P11: Footer content on all pages | Render `Footer`; assert addresses, emails, hours, copyright, and Eternity attribution present | `fc.constant(null)` |
| P12: Image alt text | For each `Image` component; assert `alt` prop is non-empty | `fc.constantFrom(...imageComponents)` |
| P13: Semantic HTML structure | Render each page; assert header, nav, main, section, footer present | `fc.constantFrom('/', '/about', '/services', '/contact', '/services/accounting')` |
| P14: Keyboard reachability | For each interactive element; assert no `tabIndex={-1}` while visible | `fc.constantFrom(...interactiveElements)` |
| P15: Colour contrast | For each text/bg colour pair; compute WCAG ratio ≥ 4.5 | `fc.constantFrom(...colourPairs)` |
| P16: Service overview card links | For each service card on `/services`; assert href = `/services/${slug}` | `fc.constantFrom(...services)` |
| P17: Service subpage unique SEO metadata | For each slug, `generateMetadata` title contains service name and description is unique | `fc.constantFrom(...serviceSlugs)` |
| P18: WhatsApp button on every page | Render each page; assert WhatsApp anchor with correct href, target, aria-label | `fc.constantFrom('/', '/about', '/services', '/contact', '/services/accounting')` |
| P19: ServiceEnquiryForm pre-fills service name | Render with generated service name; assert hidden field value and label text match | `fc.string({minLength:1})` |
| P20: Sitemap completeness | Call `sitemap()` with generated service list; assert all static + slug routes present | `fc.array(fc.record({ slug: fc.string({minLength:1}) }), {minLength:1, maxLength:10})` |

### Accessibility Testing

- Run **axe-core** against each page in a headless browser
- Manual keyboard navigation walkthrough on each page including service subpages

### End-to-End Tests (Playwright — optional)

- Full contact form submission flow
- Service subpage enquiry form: pre-filled service name visible, submission shows success
- Navigation: click each nav link including service subpage links
- WhatsApp button: assert href and target attributes
- Scroll-triggered CTA: scroll to bottom of Home page, assert animation class applied

### Performance

- **Lighthouse CI** against Vercel preview deployment on desktop
- Target: performance score ≥ 80 (Requirement 14.3)
- Next.js SSG + `next/image` with `sizes` prop + Vercel CDN should meet this target
