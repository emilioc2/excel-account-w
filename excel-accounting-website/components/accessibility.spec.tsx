// Feature: excel-accounting-website, Property 12: All images have non-empty alt text
// Feature: excel-accounting-website, Property 13: Semantic HTML structure on every page
// Feature: excel-accounting-website, Property 14: Interactive elements are keyboard-reachable
// Feature: excel-accounting-website, Property 15: Tailwind colour pairs meet WCAG AA contrast

import * as fc from 'fast-check'
import { render, cleanup } from '@testing-library/react'
import Nav from './Nav'
import Footer from './Footer'
import AboutPage from '@/app/about/page'
import ContactPage from '@/app/contact/page'

// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock('next/link', () => {
  const MockLink = ({
    href,
    children,
    ...props
  }: {
    href: string
    children: React.ReactNode
    [key: string]: unknown
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
  MockLink.displayName = 'MockLink'
  return MockLink
})

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

jest.mock('next/image', () => {
  const MockImage = ({
    src,
    alt,
    ...props
  }: {
    src: string
    alt: string
    [key: string]: unknown
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  )
  MockImage.displayName = 'MockImage'
  return MockImage
})

jest.mock('@/lib/sanity', () => ({
  getServices: jest.fn().mockResolvedValue([]),
  getFaqItems: jest.fn().mockResolvedValue([]),
  getServiceBySlug: jest.fn().mockResolvedValue(null),
  getSiteSettings: jest.fn().mockResolvedValue(null),
}))

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Render Nav + page content + Footer together to simulate the root layout */
function renderWithLayout(pageContent: React.ReactElement) {
  return render(
    <div>
      <Nav />
      <main>{pageContent}</main>
      <Footer />
    </div>
  )
}

// ─── Property 12: All images have non-empty alt text ─────────────────────────

/**
 * Property 12: All images have non-empty alt text
 * Validates: Requirements 14.1
 */
describe('Property 12: All images have non-empty alt text', () => {
  afterEach(cleanup)

  it('every img element rendered across all components has a non-empty alt attribute', () => {
    const pages = [
      <AboutPage key="about" />,
      <ContactPage key="contact" />,
    ]

    fc.assert(
      fc.property(fc.constantFrom(...pages), (pageContent) => {
        const { container, unmount } = renderWithLayout(pageContent)

        const images = container.querySelectorAll('img')
        for (const img of images) {
          const alt = img.getAttribute('alt')
          // alt must be present and non-empty (decorative images should use aria-hidden instead)
          expect(alt).not.toBeNull()
          expect(alt!.trim().length).toBeGreaterThan(0)
        }

        unmount()
      }),
      { numRuns: 100 }
    )
  })
})

// ─── Property 13: Semantic HTML structure on every page ──────────────────────

/**
 * Property 13: Semantic HTML structure on every page
 * Validates: Requirements 14.2
 */
describe('Property 13: Semantic HTML structure on every page', () => {
  afterEach(cleanup)

  it('every page rendered through the root layout contains header, nav, main, section, and footer', () => {
    const pages = [
      <AboutPage key="about" />,
      <ContactPage key="contact" />,
    ]

    fc.assert(
      fc.property(fc.constantFrom(...pages), (pageContent) => {
        const { container, unmount } = renderWithLayout(pageContent)

        expect(container.querySelector('header')).not.toBeNull()
        expect(container.querySelector('nav')).not.toBeNull()
        expect(container.querySelector('main')).not.toBeNull()
        expect(container.querySelector('section')).not.toBeNull()
        expect(container.querySelector('footer')).not.toBeNull()

        unmount()
      }),
      { numRuns: 100 }
    )
  })

  it('Nav renders header and nav elements', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container, unmount } = render(<Nav />)

        expect(container.querySelector('header')).not.toBeNull()
        expect(container.querySelector('nav')).not.toBeNull()

        unmount()
      }),
      { numRuns: 100 }
    )
  })

  it('Footer renders footer element', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container, unmount } = render(<Footer />)

        expect(container.querySelector('footer')).not.toBeNull()

        unmount()
      }),
      { numRuns: 100 }
    )
  })
})

// ─── Property 14: Interactive elements are keyboard-reachable ────────────────

/**
 * Property 14: Interactive elements are keyboard-reachable
 * Validates: Requirements 14.4
 */
describe('Property 14: Interactive elements are keyboard-reachable', () => {
  afterEach(cleanup)

  it('no interactive element has tabIndex=-1 while visible or aria-hidden=true while interactive', () => {
    const pages = [
      <AboutPage key="about" />,
      <ContactPage key="contact" />,
    ]

    fc.assert(
      fc.property(fc.constantFrom(...pages), (pageContent) => {
        const { container, unmount } = renderWithLayout(pageContent)

        const interactiveSelectors = 'button, a[href], input, textarea, select'
        const interactiveElements = container.querySelectorAll(interactiveSelectors)

        for (const el of interactiveElements) {
          // Must not have tabIndex=-1 (which removes from tab order)
          const tabIndex = el.getAttribute('tabindex')
          expect(tabIndex).not.toBe('-1')

          // Must not be aria-hidden while being an interactive element
          const ariaHidden = el.getAttribute('aria-hidden')
          expect(ariaHidden).not.toBe('true')
        }

        unmount()
      }),
      { numRuns: 100 }
    )
  })

  it('Nav interactive elements are keyboard-reachable', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container, unmount } = render(<Nav />)

        const interactiveElements = container.querySelectorAll('button, a[href], input, textarea')
        for (const el of interactiveElements) {
          expect(el.getAttribute('tabindex')).not.toBe('-1')
          expect(el.getAttribute('aria-hidden')).not.toBe('true')
        }

        unmount()
      }),
      { numRuns: 100 }
    )
  })
})

// ─── Property 15: Tailwind colour pairs meet WCAG AA contrast ────────────────

/**
 * Compute relative luminance for an sRGB channel value (0–255).
 * Formula: https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
function channelLuminance(c: number): number {
  const sRGB = c / 255
  return sRGB <= 0.04045 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4)
}

/** Compute relative luminance for a hex colour string (e.g. '#1e2a3a'). */
function relativeLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b)
}

/** Compute WCAG contrast ratio between two hex colours. */
function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1)
  const l2 = relativeLuminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Property 15: Tailwind colour pairs meet WCAG AA contrast
 * Validates: Requirements 14.5
 *
 * Colour pairs used for body text on the site:
 *   1. gray-500 (#6b7280) on white (#ffffff)  — body text in sections
 *   2. navy (#1e2a3a) on white (#ffffff)       — headings
 *   3. white (#ffffff) on navy (#1e2a3a)       — text on navy backgrounds
 *   4. teal (#1e8378) on white (#ffffff)       — labels/links
 */
describe('Property 15: Tailwind colour pairs meet WCAG AA contrast', () => {
  const COLOUR_PAIRS: Array<{ label: string; text: string; background: string }> = [
    { label: 'gray-500 on white (body text)',       text: '#6b7280', background: '#ffffff' },
    { label: 'navy on white (headings)',             text: '#1e2a3a', background: '#ffffff' },
    { label: 'white on navy (text on navy bg)',      text: '#ffffff', background: '#1e2a3a' },
    { label: 'teal on white (labels/links)',         text: '#1e8378', background: '#ffffff' },
  ]

  const WCAG_AA_THRESHOLD = 4.5

  it('every text/background colour pair used on the site meets WCAG AA contrast ratio of 4.5:1', () => {
    fc.assert(
      fc.property(fc.constantFrom(...COLOUR_PAIRS), ({ label, text, background }) => {
        const ratio = contrastRatio(text, background)
        expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_THRESHOLD)
        // Provide a helpful failure message
        if (ratio < WCAG_AA_THRESHOLD) {
          throw new Error(
            `Colour pair "${label}" fails WCAG AA: contrast ratio is ${ratio.toFixed(2)}:1 (required ≥ ${WCAG_AA_THRESHOLD}:1)`
          )
        }
      }),
      { numRuns: 100 }
    )
  })
})
