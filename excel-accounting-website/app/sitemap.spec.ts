// Feature: excel-accounting-website, Property 20: Sitemap includes all static routes and all service slug routes

import * as fc from 'fast-check'

// Mock getServices before importing sitemap
jest.mock('@/lib/sanity', () => ({
  getServices: jest.fn(),
}))

import { getServices } from '@/lib/sanity'
import sitemap from './sitemap'

const mockedGetServices = getServices as jest.MockedFunction<typeof getServices>

const STATIC_PATHS = ['/', '/about', '/services', '/contact']
const BASE_URL = 'https://excelaccounting.co.za'

/**
 * Validates: Requirements 16.3
 */
describe('Property 20: Sitemap completeness', () => {
  it('includes all static routes and all service slug routes for any array of services', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({ slug: fc.string({ minLength: 1 }) }),
          { minLength: 1, maxLength: 10 }
        ),
        async (services) => {
          // Provide only the slug field; sitemap only uses slug
          mockedGetServices.mockResolvedValue(
            services.map(s => ({
              slug: s.slug,
              title: '',
              icon: '',
              shortDescription: '',
              offerings: [],
              seoTitle: '',
              seoDescription: '',
            }))
          )

          const entries = await sitemap()
          const urls = entries.map(e => e.url)

          // All 4 static routes must be present
          for (const path of STATIC_PATHS) {
            expect(urls).toContain(`${BASE_URL}${path}`)
          }

          // One entry per service slug
          for (const { slug } of services) {
            expect(urls).toContain(`${BASE_URL}/services/${slug}`)
          }

          // Total count: 4 static + N service routes
          expect(entries).toHaveLength(STATIC_PATHS.length + services.length)
        }
      ),
      { numRuns: 100 }
    )
  })
})
