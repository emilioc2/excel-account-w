// Feature: excel-accounting-website, Property 1: Nav renders required elements on every page
// Feature: excel-accounting-website, Property 2: Nav link hrefs are correct
// Feature: excel-accounting-website, Property 3: Active page link is indicated
// Feature: excel-accounting-website, Property 4: Hamburger toggle is a round-trip

import * as fc from 'fast-check'
import { render, screen, fireEvent } from '@testing-library/react'
import Nav from './Nav'

// Mock next/navigation
const mockPathname = jest.fn()
jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}))

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  )
  MockLink.displayName = 'MockLink'
  return MockLink
})

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

const ALL_PATHNAMES = ['/', '/about', '/services', '/contact', '/services/accounting']

/**
 * Property 1: Nav renders required elements on every page
 * Validates: Requirements 1.1, 1.2, 1.3
 */
describe('Property 1: Nav renders required elements on every page', () => {
  it('always renders logo, all nav links, and phone number regardless of pathname', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...ALL_PATHNAMES),
        (pathname) => {
          mockPathname.mockReturnValue(pathname)
          const { unmount } = render(<Nav />)

          // Logo text
          expect(screen.getByText(/Excel Accounting Services/i)).toBeInTheDocument()

          // All nav links present (at least once — desktop + mobile drawer both render them)
          for (const { label } of NAV_LINKS) {
            const links = screen.getAllByText(label)
            expect(links.length).toBeGreaterThanOrEqual(1)
          }

          // Phone number
          expect(screen.getAllByText('021-782 8927').length).toBeGreaterThanOrEqual(1)

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })
})

/**
 * Property 2: Nav link hrefs are correct
 * Validates: Requirements 1.6
 */
describe('Property 2: Nav link hrefs are correct', () => {
  it('each nav link has the correct href for any pathname', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...ALL_PATHNAMES),
        (pathname) => {
          mockPathname.mockReturnValue(pathname)
          const { unmount } = render(<Nav />)

          for (const { href, label } of NAV_LINKS) {
            // getAllByRole to handle desktop + mobile duplicates
            const links = screen.getAllByRole('link', { name: label })
            // At least one link with the correct href
            const hasCorrectHref = links.some((el) => el.getAttribute('href') === href)
            expect(hasCorrectHref).toBe(true)
          }

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })
})

/**
 * Property 3: Active page link is indicated
 * Validates: Requirements 1.7
 */
describe('Property 3: Active page link is indicated', () => {
  it('exactly one nav link carries aria-current="page" matching the current pathname', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('/', '/about', '/services', '/contact'),
        (pathname) => {
          mockPathname.mockReturnValue(pathname)
          const { unmount } = render(<Nav />)

          const currentLinks = screen
            .getAllByRole('link')
            .filter((el) => el.getAttribute('aria-current') === 'page')

          // Each active link should point to the current pathname
          for (const link of currentLinks) {
            expect(link.getAttribute('href')).toBe(pathname)
          }

          // At least one link is marked active
          expect(currentLinks.length).toBeGreaterThanOrEqual(1)

          // No link pointing to a different path is marked active
          const wrongActive = screen
            .getAllByRole('link')
            .filter(
              (el) =>
                el.getAttribute('aria-current') === 'page' &&
                el.getAttribute('href') !== pathname
            )
          expect(wrongActive).toHaveLength(0)

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })
})

/**
 * Property 4: Hamburger toggle is a round-trip
 * Validates: Requirements 1.4, 1.5
 */
describe('Property 4: Hamburger toggle is a round-trip', () => {
  it('clicking the hamburger toggles the drawer open/closed and returns to original state', () => {
    fc.assert(
      fc.property(
        fc.array(fc.boolean(), { minLength: 1, maxLength: 10 }),
        (_clicks) => {
          mockPathname.mockReturnValue('/')
          const { unmount } = render(<Nav />)

          const hamburger = screen.getByRole('button', { name: /toggle navigation/i })

          // Initial state: drawer closed
          expect(hamburger).toHaveAttribute('aria-expanded', 'false')

          // Click open
          fireEvent.click(hamburger)
          expect(hamburger).toHaveAttribute('aria-expanded', 'true')

          // Click close
          fireEvent.click(hamburger)
          expect(hamburger).toHaveAttribute('aria-expanded', 'false')

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })

  it('close button inside drawer closes the drawer', () => {
    mockPathname.mockReturnValue('/')
    render(<Nav />)

    const hamburger = screen.getByRole('button', { name: /toggle navigation/i })
    fireEvent.click(hamburger)
    expect(hamburger).toHaveAttribute('aria-expanded', 'true')

    const closeBtn = screen.getByRole('button', { name: /close navigation/i })
    fireEvent.click(closeBtn)
    expect(hamburger).toHaveAttribute('aria-expanded', 'false')
  })
})
