// Feature: excel-accounting-website, Property 19: ServiceEnquiryForm pre-fills the service name

import * as fc from 'fast-check'
import { render, cleanup } from '@testing-library/react'
import ServiceEnquiryForm from './ServiceEnquiryForm'

// Mock next/navigation (not used in this component, but guard against imports)
jest.mock('next/navigation', () => ({ useRouter: () => ({}) }))

// Mock fetch so form submission doesn't fail
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve({ success: true }) } as Response)
)

afterEach(cleanup)

/**
 * Property 19: ServiceEnquiryForm pre-fills the service name
 * Validates: Requirements 15.4
 *
 * For any service name string, rendering ServiceEnquiryForm with that serviceName prop
 * should produce a form whose hidden serviceName field has a value equal to the service name,
 * and whose visible label text contains the service name.
 */
describe('Property 19: ServiceEnquiryForm pre-fills the service name', () => {
  it('always sets the hidden serviceName input value and shows the service name in the label', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
        (serviceName) => {
          const { container, unmount } = render(
            <ServiceEnquiryForm serviceName={serviceName} />
          )

          // Hidden input has the correct value
          const hiddenInput = container.querySelector<HTMLInputElement>('input[type="hidden"]')
          expect(hiddenInput).not.toBeNull()
          expect(hiddenInput!.value).toBe(serviceName)

          // Visible label paragraph contains the service name
          const labelText = container.querySelector('p')
          expect(labelText).not.toBeNull()
          expect(labelText!.textContent).toContain(serviceName)

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })
})
