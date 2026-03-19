// Feature: excel-accounting-website, Property 11: Footer renders required content on every page

import * as fc from 'fast-check'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

/**
 * Property 11: Footer renders required content on every page
 * Validates: Requirements 12.1, 12.2, 12.3, 12.4, 12.5, 12.6
 */
describe('Property 11: Footer renders required content on every page', () => {
  it('always contains both office addresses, emails, hours, copyright, and Eternity attribution', () => {
    fc.assert(
      fc.property(
        fc.constant(null),
        () => {
          const { unmount } = render(<Footer />)

          // Both office addresses (Req 12.2)
          expect(screen.getByText(/Fishhoek/i)).toBeInTheDocument()
          expect(screen.getByText(/Strand/i)).toBeInTheDocument()

          // Email addresses (Req 12.3)
          expect(screen.getByRole('link', { name: /barry@excelaccounting\.co\.za/i })).toBeInTheDocument()
          expect(screen.getByRole('link', { name: /info@excelaccounting\.co\.za/i })).toBeInTheDocument()

          // Office hours (Req 12.4)
          expect(screen.getAllByText(/07:30/).length).toBeGreaterThanOrEqual(1)
          expect(screen.getByText(/Monday/i)).toBeInTheDocument()
          expect(screen.getByText(/Fridays/i)).toBeInTheDocument()

          // Copyright notice (Req 12.5)
          expect(screen.getByText(/Excel Accounting Services\. All rights reserved\./i)).toBeInTheDocument()

          // Eternity attribution (Req 12.6)
          expect(screen.getByText(/Designed & Developed by/i)).toBeInTheDocument()
          expect(screen.getByText('Eternity')).toBeInTheDocument()

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })
})
