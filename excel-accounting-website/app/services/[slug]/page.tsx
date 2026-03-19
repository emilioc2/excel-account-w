import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getServices, getServiceBySlug, type Service } from '@/lib/sanity'
import ServiceEnquiryForm from '@/components/ServiceEnquiryForm'

interface PageProps {
  params: { slug: string }
}

const FALLBACK_SERVICES: Service[] = [
  {
    title: 'Accounting Services', slug: 'accounting', icon: '📊',
    shortDescription: 'Comprehensive accounting solutions tailored to your business size and industry.',
    offerings: ['Annual financial statements', 'Management accounts', 'Budgets and forecasts', 'Cash flow management', 'CIPC annual returns'],
    seoTitle: 'Accounting Services | Excel Accounting Services',
    seoDescription: 'Professional accounting services in the Western Cape — financial statements, management accounts, and more.',
  },
  {
    title: 'Tax Services', slug: 'tax', icon: '🧾',
    shortDescription: 'Personal and corporate tax planning, submissions, and compliance.',
    offerings: ['Income tax returns (individuals & companies)', 'VAT registration and returns', 'PAYE compliance', 'Tax planning and advice', 'SARS dispute resolution'],
    seoTitle: 'Tax Services | Excel Accounting Services',
    seoDescription: 'Expert tax planning and compliance services for individuals and businesses in the Western Cape.',
  },
  {
    title: 'Secretarial Services', slug: 'secretarial', icon: '📁',
    shortDescription: 'Company registrations, statutory compliance, and CIPC filings.',
    offerings: ['Company registrations', 'CIPC annual returns', 'Director and member changes', 'Share transfers', 'Statutory record maintenance'],
    seoTitle: 'Secretarial Services | Excel Accounting Services',
    seoDescription: 'Company secretarial and statutory compliance services including CIPC filings and registrations.',
  },
  {
    title: 'Payroll', slug: 'payroll', icon: '💼',
    shortDescription: 'Accurate, timely payroll processing and PAYE submissions.',
    offerings: ['Monthly payroll processing', 'PAYE, UIF, and SDL submissions', 'IRP5 and IT3(a) certificates', 'Leave management', 'Payslip generation'],
    seoTitle: 'Payroll Services | Excel Accounting Services',
    seoDescription: 'Reliable payroll processing and PAYE compliance services for businesses in the Western Cape.',
  },
  {
    title: 'Legal', slug: 'legal', icon: '⚖️',
    shortDescription: 'Business legal support including contracts and regulatory guidance.',
    offerings: ['Contract drafting and review', 'Business structuring advice', 'Regulatory compliance guidance', 'Partnership and shareholder agreements', 'Employment contract templates'],
    seoTitle: 'Legal Services | Excel Accounting Services',
    seoDescription: 'Business legal support services including contracts, compliance, and regulatory guidance.',
  },
  {
    title: 'Bookkeeping', slug: 'bookkeeping', icon: '📒',
    shortDescription: 'Day-to-day bookkeeping to keep your finances organised and up to date.',
    offerings: ['Monthly bookkeeping', 'Bank reconciliations', 'Accounts payable and receivable', 'Expense tracking', 'Accounting software setup and support'],
    seoTitle: 'Bookkeeping Services | Excel Accounting Services',
    seoDescription: 'Professional bookkeeping services to keep your business finances accurate and up to date.',
  },
]

function getFallbackService(slug: string): Service | null {
  return FALLBACK_SERVICES.find((s) => s.slug === slug) ?? null
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const services = await getServices()
  if (services.length > 0) return services.map((s) => ({ slug: s.slug }))
  return FALLBACK_SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = (await getServiceBySlug(params.slug)) ?? getFallbackService(params.slug)
  if (!service) return {}

  const title = service.seoTitle || `${service.title} | Excel Accounting Services`
  const description = service.seoDescription || service.shortDescription
  const canonical = `https://excelaccounting.co.za/services/${params.slug}`

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: service.seoTitle || service.title,
      description,
      url: canonical,
    },
  }
}

export default async function ServicePage({ params }: PageProps): Promise<React.ReactElement> {
  const service = (await getServiceBySlug(params.slug)) ?? getFallbackService(params.slug)
  if (!service) notFound()

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    provider: { '@type': 'Organization', name: 'Excel Accounting Services' },
    description: service.seoDescription ?? service.shortDescription,
    url: `https://excelaccounting.co.za/services/${service.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <main>
        {/* Hero */}
        <section className="bg-navy text-white py-20 px-6">
          <div className="container mx-auto max-w-3xl">
            <p className="section-label mb-4">Our Services</p>
            <div className="text-5xl mb-4" aria-hidden="true">{service.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">{service.shortDescription}</p>
          </div>
        </section>

        {/* Offerings */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-navy mb-8">What We Offer</h2>
            <ul className="space-y-3">
              {service.offerings.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-500">
                  <span className="text-teal mt-0.5 flex-shrink-0 font-bold" aria-hidden="true">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Enquiry Form */}
        <section className="py-20 px-6 bg-white">
          <div className="container mx-auto max-w-lg">
            <h2 className="text-2xl font-bold text-navy mb-2">Make an Enquiry</h2>
            <p className="text-gray-500 mb-8">
              Fill in the form below and we will get back to you shortly.
            </p>
            <ServiceEnquiryForm serviceName={service.title} />
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 px-6 bg-navy text-white text-center">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-gray-300 mb-8">
              Contact us today and let our team help you with your {service.title.toLowerCase()} needs.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-teal hover:bg-teal-dark text-white font-semibold px-8 rounded transition-colors duration-200 min-h-[44px]"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
