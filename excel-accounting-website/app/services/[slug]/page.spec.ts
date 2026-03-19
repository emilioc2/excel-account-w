// Feature: excel-accounting-website, Property 17: Each service subpage has unique SEO metadata containing the service name

import * as fc from 'fast-check'
import { generateMetadata } from './page'

// Mock the sanity fetch helper
jest.mock('@/lib/sanity', () => ({
  getServices: jest.fn(),
  getServiceBySlug: jest.fn(),
}))

import { getServiceBySlug } from '@/lib/sanity'

const mockGetServiceBySlug = getServiceBySlug as jest.MockedFunction<typeof getServiceBySlug>

// Helper to extract a plain string from Next.js Metadata.title (may be TemplateString)
function resolveTitle(title: unknown): string {
  if (typeof title === 'string') return title
  if (title && typeof title === 'object') {
    const t = title as Record<string, unknown>
    if (typeof t.absolute === 'string') return t.absolute
    if (typeof t.default === 'string') return t.default
  }
  return ''
}

/**
 * Property 17: Each service subpage has unique SEO metadata containing the service name
 * Validates: Requirements 15.6, 16.1
 *
 * For any service slug, generateMetadata should return a title that contains the service name
 * (when no seoTitle override is set) and a non-empty description.
 * When two services have distinct seoDescriptions, their metadata descriptions must differ.
 */
describe('Property 17: Service subpage SEO metadata contains the service name', () => {
  it('fallback title always contains the service title when seoTitle is absent', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          // Trim-safe titles — no leading/trailing whitespace
          title: fc.string({ minLength: 1 }).filter((s) => s.trim() === s && s.length > 0),
          slug: fc.stringMatching(/^[a-z0-9-]+$/).filter((s) => s.length >= 1),
          seoDescription: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
          shortDescription: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
          icon: fc.constant('📊'),
          offerings: fc.constant([] as string[]),
        }),
        async ({ title, slug, seoDescription, shortDescription, icon, offerings }) => {
          // No seoTitle — the page must fall back to "[title] | Excel Accounting Services"
          mockGetServiceBySlug.mockResolvedValueOnce({
            title,
            slug,
            seoTitle: '',
            seoDescription,
            shortDescription,
            icon,
            offerings,
          })

          const metadata = await generateMetadata({ params: { slug } })
          const resolvedTitle = resolveTitle(metadata.title)

          expect(resolvedTitle).toContain(title)
          expect(metadata.description).toBeTruthy()
          expect((metadata.description as string).length).toBeGreaterThan(0)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('returns unique descriptions for services with distinct seoDescriptions', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.tuple(
          fc.record({
            title: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
            slug: fc.constant('service-a'),
            seoTitle: fc.constant(''),
            seoDescription: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
            shortDescription: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
            icon: fc.constant('📊'),
            offerings: fc.constant([] as string[]),
          }),
          fc.record({
            title: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
            slug: fc.constant('service-b'),
            seoTitle: fc.constant(''),
            seoDescription: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
            shortDescription: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
            icon: fc.constant('📋'),
            offerings: fc.constant([] as string[]),
          })
        ).filter(([a, b]) => a.seoDescription !== b.seoDescription),
        async ([serviceA, serviceB]) => {
          mockGetServiceBySlug
            .mockResolvedValueOnce(serviceA)
            .mockResolvedValueOnce(serviceB)

          const metaA = await generateMetadata({ params: { slug: 'service-a' } })
          const metaB = await generateMetadata({ params: { slug: 'service-b' } })

          expect(metaA.description).not.toBe(metaB.description)
        }
      ),
      { numRuns: 100 }
    )
  })
})
