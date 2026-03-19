// Feature: excel-accounting-website, Property 6: PillarCard renders required sub-elements

import * as fc from 'fast-check'
import { render, cleanup } from '@testing-library/react'
import PillarCard from './PillarCard'

afterEach(cleanup)

/**
 * Property 6: PillarCard renders required sub-elements
 * Validates: Requirements 4.2
 */
describe('Property 6: PillarCard renders required sub-elements', () => {
  it('always renders heading and description for any non-empty props', () => {
    fc.assert(
      fc.property(
        fc.record({
          heading: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
          description: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
        }),
        ({ heading, description }) => {
          const { container, unmount } = render(
            <PillarCard heading={heading} description={description} />
          )

          // Heading element contains the expected text
          const headingEl = container.querySelector('h3')
          expect(headingEl).not.toBeNull()
          expect(headingEl!.textContent).toBe(heading)

          // Description paragraph contains the expected text
          const para = container.querySelector('p')
          expect(para).not.toBeNull()
          expect(para!.textContent).toBe(description)

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })
})
