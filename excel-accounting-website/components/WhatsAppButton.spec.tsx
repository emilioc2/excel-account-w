// Feature: excel-accounting-website, Property 18: WhatsApp button is present on every page and links to the correct URL

import * as fc from 'fast-check'
import { render, screen, cleanup } from '@testing-library/react'
import WhatsAppButton from './WhatsAppButton'

afterEach(cleanup)

const ALL_PATHNAMES = ['/', '/about', '/services', '/contact', '/services/accounting']

/**
 * Property 18: WhatsApp button is present on every page and links to the correct URL
 * Validates: Requirements 17.1, 17.2, 17.3, 17.5
 */
describe('Property 18: WhatsApp button is present on every page and links to the correct URL', () => {
  it('renders with correct href, target, and aria-label regardless of page context', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...ALL_PATHNAMES),
        (_pathname) => {
          const { unmount } = render(<WhatsAppButton />)

          const link = screen.getByRole('link', { name: /chat with us on whatsapp/i })

          expect(link).toBeInTheDocument()
          expect(link).toHaveAttribute('href', 'https://wa.me/27825235838')
          expect(link).toHaveAttribute('target', '_blank')
          expect(link).toHaveAttribute('aria-label', 'Chat with us on WhatsApp')

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })
})
