// Feature: excel-accounting-website, Property 7: Accordion toggle is a round-trip
// Feature: excel-accounting-website, Property 8: Accordion mutual exclusion

import * as fc from 'fast-check'
import { render, screen, fireEvent } from '@testing-library/react'
import Accordion, { AccordionItem } from './Accordion'

const SAMPLE_ITEMS: AccordionItem[] = [
  { question: 'Capital Gains Tax', answer: 'CGT applies to the disposal of assets.' },
  { question: 'Corporate Tax Rates', answer: 'The standard corporate tax rate is 27%.' },
  { question: 'Value-Added Tax', answer: 'VAT is levied at 15% on taxable supplies.' },
  { question: 'Individual Tax Thresholds', answer: 'The tax threshold for under-65s is R95,750.' },
  { question: 'Small Business Corporations', answer: 'SBCs benefit from reduced tax rates.' },
  { question: 'SBC Registration Criteria', answer: 'Gross income must not exceed R20 million.' },
]

/**
 * Property 7: Accordion toggle is a round-trip
 * Validates: Requirements 6.2, 6.3
 */
describe('Property 7: Accordion toggle is a round-trip', () => {
  it('clicking a closed item opens it; clicking it again closes it', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: SAMPLE_ITEMS.length - 1 }),
        (index) => {
          const { unmount } = render(<Accordion items={SAMPLE_ITEMS} />)

          const triggers = screen.getAllByRole('button')
          const trigger = triggers[index]

          // Initially closed
          expect(trigger).toHaveAttribute('aria-expanded', 'false')

          // Open
          fireEvent.click(trigger)
          expect(trigger).toHaveAttribute('aria-expanded', 'true')

          // Close (round-trip)
          fireEvent.click(trigger)
          expect(trigger).toHaveAttribute('aria-expanded', 'false')

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })
})

/**
 * Property 8: Accordion mutual exclusion
 * Validates: Requirements 6.4
 */
describe('Property 8: Accordion mutual exclusion', () => {
  it('after any sequence of clicks, at most one item has aria-expanded="true"', () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer({ min: 0, max: SAMPLE_ITEMS.length - 1 }), { minLength: 1, maxLength: 20 }),
        (clicks) => {
          const { unmount } = render(<Accordion items={SAMPLE_ITEMS} />)

          const triggers = screen.getAllByRole('button')

          for (const index of clicks) {
            fireEvent.click(triggers[index])

            const expandedCount = triggers.filter(
              (t) => t.getAttribute('aria-expanded') === 'true'
            ).length

            expect(expandedCount).toBeLessThanOrEqual(1)
          }

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })
})
