// Feature: excel-accounting-website, Property 5: ServiceCard renders required sub-elements

import * as fc from 'fast-check'
import { render, within, cleanup } from '@testing-library/react'
import ServiceCard from './ServiceCard'

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  )
  MockLink.displayName = 'MockLink'
  return MockLink
})

afterEach(cleanup)

/**
 * Property 5: ServiceCard renders required sub-elements
 * Validates: Requirements 3.3, 5.2, 9.3, 9.4
 */
describe('Property 5: ServiceCard renders required sub-elements', () => {
  it('always renders icon, heading, description, and a Learn More link to /services/${slug}', () => {
    fc.assert(
      fc.property(
        fc.record({
          title: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
          icon: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
          shortDescription: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
          slug: fc.stringMatching(/^[a-z0-9-]+$/).filter((s) => s.length >= 1),
        }),
        ({ title, icon, shortDescription, slug }) => {
          const { container, unmount } = render(
            <ServiceCard
              title={title}
              icon={icon}
              shortDescription={shortDescription}
              slug={slug}
            />
          )

          const scope = within(container)

          // Heading contains the title text
          const heading = container.querySelector('h3')
          expect(heading).not.toBeNull()
          expect(heading!.textContent).toBe(title)

          // Icon div is present (aria-hidden div before the heading)
          const iconEl = container.querySelector('[aria-hidden="true"]')
          expect(iconEl).not.toBeNull()
          expect(iconEl!.textContent).toBe(icon)

          // Description paragraph contains the shortDescription
          const para = container.querySelector('p')
          expect(para).not.toBeNull()
          expect(para!.textContent).toBe(shortDescription)

          // Learn More link with correct href
          const link = scope.getByRole('link', { name: /learn more/i })
          expect(link).toBeInTheDocument()
          expect(link).toHaveAttribute('href', `/services/${slug}`)

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })
})
