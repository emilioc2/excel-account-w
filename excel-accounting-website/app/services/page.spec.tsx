// Feature: excel-accounting-website, Property 16: Service sections on Services overview have correct links

import * as fc from 'fast-check'
import { render, within, cleanup } from '@testing-library/react'
import ServiceCard from '@/components/ServiceCard'

// Mock next/link
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

afterEach(cleanup)

/**
 * Property 16: Service sections on Services overview have correct links
 * Validates: Requirements 9.3, 9.4
 *
 * For any service card rendered on the /services overview page, the card should
 * contain a link with href matching /services/${slug} for that service.
 */
describe('Property 16: Service overview card links are correct', () => {
  it('always renders a Learn More link pointing to /services/${slug}', () => {
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

          const link = within(container).getByRole('link', { name: /learn more/i })
          expect(link).toBeInTheDocument()
          expect(link).toHaveAttribute('href', `/services/${slug}`)

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })

  it('renders a card for each service in the list with the correct slug link', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            title: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
            icon: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
            shortDescription: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
            slug: fc.stringMatching(/^[a-z0-9-]+$/).filter((s) => s.length >= 1),
          }),
          { minLength: 1, maxLength: 6 }
        ),
        (services) => {
          const { container, unmount } = render(
            <div>
              {services.map((service) => (
                <ServiceCard
                  key={service.slug}
                  title={service.title}
                  icon={service.icon}
                  shortDescription={service.shortDescription}
                  slug={service.slug}
                />
              ))}
            </div>
          )

          const links = within(container).getAllByRole('link', { name: /learn more/i })
          expect(links).toHaveLength(services.length)

          services.forEach((service, i) => {
            expect(links[i]).toHaveAttribute('href', `/services/${service.slug}`)
          })

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })
})
