// Feature: excel-accounting-website, Property 9: ContactForm rejects invalid submissions
// Feature: excel-accounting-website, Property 10: Valid form submission shows confirmation

import * as fc from 'fast-check'
import { render, within, fireEvent, waitFor, act, cleanup } from '@testing-library/react'
import ContactForm from './ContactForm'

jest.mock('next/navigation', () => ({ useRouter: () => ({}) }))

afterEach(cleanup)

/** Helper: get the name input within a container by its id */
function getNameInput(container: HTMLElement): HTMLInputElement {
  return container.querySelector<HTMLInputElement>('#contact-name')!
}

function getEmailInput(container: HTMLElement): HTMLInputElement {
  return container.querySelector<HTMLInputElement>('#contact-email')!
}

function getSubmitButton(container: HTMLElement): HTMLButtonElement {
  return container.querySelector<HTMLButtonElement>('button[type="submit"]')!
}

/**
 * Property 9: ContactForm rejects invalid submissions
 * Validates: Requirements 10.3, 10.4
 *
 * For any form submission where `name` is empty, `email` is empty, or `email` does not
 * match a valid email pattern, the Zod schema should produce a validation error and the
 * form should display that error without showing the success confirmation.
 */
describe('Property 9: ContactForm rejects invalid submissions', () => {
  it('shows a validation error and no success message when name is empty', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.emailAddress(),
        async (email) => {
          const { container, unmount } = render(<ContactForm />)

          fireEvent.change(getNameInput(container), { target: { value: '' } })
          fireEvent.change(getEmailInput(container), { target: { value: email } })

          await act(async () => {
            fireEvent.click(getSubmitButton(container))
          })

          await waitFor(() => {
            const scope = within(container)
            const alerts = scope.queryAllByRole('alert')
            const hasNameError = alerts.some((el) =>
              el.textContent?.toLowerCase().includes('name')
            )
            expect(hasNameError).toBe(true)
          })

          expect(within(container).queryByText(/thank you/i)).toBeNull()

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })

  it('shows a validation error and no success message when email is empty', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
        async (name) => {
          const { container, unmount } = render(<ContactForm />)

          fireEvent.change(getNameInput(container), { target: { value: name } })
          fireEvent.change(getEmailInput(container), { target: { value: '' } })

          await act(async () => {
            fireEvent.click(getSubmitButton(container))
          })

          await waitFor(() => {
            const scope = within(container)
            const alerts = scope.queryAllByRole('alert')
            const hasEmailError = alerts.some((el) =>
              el.textContent?.toLowerCase().includes('email')
            )
            expect(hasEmailError).toBe(true)
          })

          expect(within(container).queryByText(/thank you/i)).toBeNull()

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })

  it('shows a validation error and no success message when email is malformed', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
        fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0 && !s.includes('@')),
        async (name, badEmail) => {
          const { container, unmount } = render(<ContactForm />)

          fireEvent.change(getNameInput(container), { target: { value: name } })
          fireEvent.change(getEmailInput(container), { target: { value: badEmail } })

          await act(async () => {
            fireEvent.click(getSubmitButton(container))
          })

          await waitFor(() => {
            const scope = within(container)
            const alerts = scope.queryAllByRole('alert')
            const hasEmailError = alerts.some((el) =>
              el.textContent?.toLowerCase().includes('email')
            )
            expect(hasEmailError).toBe(true)
          })

          expect(within(container).queryByText(/thank you/i)).toBeNull()

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })
})

/**
 * Property 10: Valid form submission shows confirmation
 * Validates: Requirements 10.5
 *
 * For any form submission where `name` is a non-empty string and `email` matches a valid
 * email address pattern, submitting the form and receiving `{ success: true }` should hide
 * the form and display the success confirmation message.
 */
describe('Property 10: Valid form submission shows confirmation', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
      } as Response)
    )
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  // Generator for emails that Zod's .email() validator accepts:
  // simple alphanumeric local part @ alphanumeric domain . 2-4 char TLD
  const zodCompatibleEmail = fc
    .tuple(
      fc.stringMatching(/^[a-z][a-z0-9]{0,9}$/),
      fc.stringMatching(/^[a-z][a-z0-9]{0,9}$/),
      fc.stringMatching(/^[a-z]{2,4}$/)
    )
    .map(([local, domain, tld]) => `${local}@${domain}.${tld}`)

  it('hides the form and shows the success message on valid submission', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
        zodCompatibleEmail,
        async (name, email) => {
          const { container, unmount } = render(<ContactForm />)

          fireEvent.change(getNameInput(container), { target: { value: name } })
          fireEvent.change(getEmailInput(container), { target: { value: email } })

          await act(async () => {
            fireEvent.click(getSubmitButton(container))
          })

          await waitFor(() => {
            const successMsg = within(container).queryByRole('alert')
            expect(successMsg).not.toBeNull()
            expect(successMsg!.textContent).toMatch(/thank you/i)
          })

          // The submit button should no longer be in the DOM
          expect(container.querySelector('button[type="submit"]')).toBeNull()

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  }, 30000)
})
