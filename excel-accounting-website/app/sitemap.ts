import type { MetadataRoute } from 'next'
import { getServices } from '@/lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getServices()
  const staticRoutes = ['/', '/about', '/services', '/contact'].map(url => ({
    url: `https://excelaccounting.co.za${url}`,
    lastModified: new Date(),
  }))
  const serviceRoutes = services.map(s => ({
    url: `https://excelaccounting.co.za/services/${s.slug}`,
    lastModified: new Date(),
  }))
  return [...staticRoutes, ...serviceRoutes]
}
