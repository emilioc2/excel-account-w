import { client } from '@/sanity/lib/client'

export interface Service {
  title: string
  slug: string
  icon: string
  shortDescription: string
  offerings: string[]
  seoTitle: string
  seoDescription: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface Office {
  name: string
  address: string
}

export interface SiteSettings {
  phone: string
  emails: string[]
  offices: Office[]
  hours: string
}

export async function getServices(): Promise<Service[]> {
  try {
    return await client.fetch<Service[]>(
      `*[_type == "service"]{ title, "slug": slug.current, icon, shortDescription, offerings, seoTitle, seoDescription }`,
      {},
      { cache: 'force-cache' }
    )
  } catch {
    return []
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    return await client.fetch<Service | null>(
      `*[_type == "service" && slug.current == $slug][0]{ title, "slug": slug.current, icon, shortDescription, offerings, seoTitle, seoDescription }`,
      { slug },
      { cache: 'force-cache' }
    )
  } catch {
    return null
  }
}

export async function getFaqItems(): Promise<FaqItem[]> {
  try {
    return await client.fetch<FaqItem[]>(
      `*[_type == "faqItem"]{ question, answer }`,
      {},
      { cache: 'force-cache' }
    )
  } catch {
    return []
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await client.fetch<SiteSettings | null>(
      `*[_type == "siteSettings"][0]{ phone, emails, offices, hours }`,
      {},
      { cache: 'force-cache' }
    )
  } catch {
    return null
  }
}
