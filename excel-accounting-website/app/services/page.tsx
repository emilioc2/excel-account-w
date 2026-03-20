import type { Metadata } from 'next'
import ServiceCard from '@/components/ServiceCard'
import ScrollReveal from '@/components/ScrollReveal'
import { getServices, type Service } from '@/lib/sanity'

const FALLBACK_SERVICES: Service[] = [
  { title: 'Accounting Services', slug: 'accounting', icon: '📊', shortDescription: 'Comprehensive accounting solutions tailored to your business size and industry.', offerings: [], seoTitle: '', seoDescription: '' },
  { title: 'Tax Services', slug: 'tax', icon: '🧾', shortDescription: 'Personal and corporate tax planning, submissions, and compliance.', offerings: [], seoTitle: '', seoDescription: '' },
  { title: 'Secretarial Services', slug: 'secretarial', icon: '📁', shortDescription: 'Company registrations, statutory compliance, and CIPC filings.', offerings: [], seoTitle: '', seoDescription: '' },
  { title: 'Payroll', slug: 'payroll', icon: '💼', shortDescription: 'Accurate, timely payroll processing and PAYE submissions.', offerings: [], seoTitle: '', seoDescription: '' },
  { title: 'Legal', slug: 'legal', icon: '⚖️', shortDescription: 'Business legal support including contracts and regulatory guidance.', offerings: [], seoTitle: '', seoDescription: '' },
  { title: 'Bookkeeping', slug: 'bookkeeping', icon: '📒', shortDescription: 'Day-to-day bookkeeping to keep your finances organised and up to date.', offerings: [], seoTitle: '', seoDescription: '' },
]

export const metadata: Metadata = {
  title: 'Our Services | Excel Accounting Services',
  description:
    'Explore the full range of professional services offered by Excel Accounting Services — accounting, tax, secretarial, payroll, legal, and bookkeeping.',
  alternates: { canonical: 'https://excelaccounting.co.za/services' },
  openGraph: {
    title: 'Our Services | Excel Accounting Services',
    description: 'Professional accounting, tax, secretarial, payroll, legal, and bookkeeping services in the Western Cape.',
    url: 'https://excelaccounting.co.za/services',
  },
}

export default async function ServicesPage(): Promise<React.ReactElement> {
  const rawServices = await getServices()
  const services = rawServices.length > 0 ? rawServices : FALLBACK_SERVICES

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-navy via-navy to-[#1a3a4a] text-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }} aria-hidden="true" />
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #2a9688 0%, transparent 70%)' }} aria-hidden="true" />
        <div className="container mx-auto max-w-3xl relative z-10">
          <p className="section-label mb-4">What We Offer</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
            A comprehensive range of financial services to help your business thrive.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ScrollReveal key={service.slug} direction="left" delay={i * 80}>
                <ServiceCard
                  title={service.title}
                  icon={service.icon}
                  shortDescription={service.shortDescription}
                  slug={service.slug}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
