import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/Hero'
import ServiceCard from '@/components/ServiceCard'
import PillarCard from '@/components/PillarCard'
import Accordion from '@/components/Accordion'
import ScrollRevealCTA from '@/components/ScrollRevealCTA'
import { getServices, getFaqItems } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Excel Accounting Services | Western Cape Accounting Firm',
  description:
    'Excel Accounting Services offers professional accounting, tax, legal, secretarial, payroll, and bookkeeping services in Fish Hoek and the Helderberg, Western Cape.',
  alternates: { canonical: 'https://excelaccounting.co.za' },
  openGraph: {
    title: 'Excel Accounting Services | Western Cape Accounting Firm',
    description: 'Professional accounting, tax, legal, and secretarial services in Fish Hoek and the Helderberg.',
    url: 'https://excelaccounting.co.za',
  },
}

const PILLARS = [
  {
    heading: 'We Are Professionals',
    description: 'Our team holds the qualifications and experience to handle your financial affairs with precision and care.',
  },
  {
    heading: 'We Are Trusted',
    description: 'Over 30 years of client relationships built on transparency, integrity, and consistent results.',
  },
  {
    heading: 'We Are Experts',
    description: 'From tax thresholds to corporate compliance, we stay current so you never have to worry.',
  },
]

const FULL_SERVICES = [
  { icon: '📊', heading: 'Accounting', description: 'Comprehensive accounting solutions tailored to your business size and industry.' },
  { icon: '🧾', heading: 'Tax Services', description: 'Personal and corporate tax planning, submissions, and compliance.' },
  { icon: '📁', heading: 'Secretarial Services', description: 'Company registrations, statutory compliance, and CIPC filings.' },
  { icon: '💼', heading: 'Payroll', description: 'Accurate, timely payroll processing and PAYE submissions.' },
  { icon: '⚖️', heading: 'Legal', description: 'Business legal support including contracts and regulatory guidance.' },
  { icon: '📒', heading: 'Bookkeeping', description: 'Day-to-day bookkeeping to keep your finances organised and up to date.' },
]

const CLIENTS = [
  'WORLDFOCUS', 'BLACKMEDIA', 'BRAMMER PLUMBING', 'JUICE REVOLUTION',
  'EARTH FIRE PIZZA', 'JENKOR', 'PROLINE ELECTRICAL', 'COMPOSITION',
  'WILDSCHUTSBRAND FARM', 'OCEAN BREEZE HOTEL GROUP',
]

const FALLBACK_FAQ = [
  {
    question: 'What is Capital Gains Tax (CGT)?',
    answer: 'CGT is levied on the profit made from selling an asset. For individuals the annual exclusion is R40 000, and the inclusion rate is 40% for individuals and 80% for companies.',
  },
  {
    question: 'What are the Corporate Tax Rates?',
    answer: 'The standard corporate income tax rate in South Africa is 27% for financial years ending on or after 31 March 2023.',
  },
  {
    question: 'What qualifies as a Small Business Corporation?',
    answer: 'An SBC must be a close corporation, co-operative, or private company with gross income not exceeding R20 million and all shareholders must be natural persons.',
  },
  {
    question: 'What is Value-Added Tax (VAT)?',
    answer: 'VAT is levied at 15% on the supply of goods and services. Businesses with taxable turnover exceeding R1 million per year must register as VAT vendors.',
  },
  {
    question: 'What are the Individual Tax Thresholds?',
    answer: 'For the 2024/25 tax year: under 65 — R95 750; 65–74 — R148 217; 75 and older — R165 689.',
  },
  {
    question: 'What are the SBC registration criteria?',
    answer: 'All shareholders must be natural persons, gross income must not exceed R20 million, and no shareholder may hold shares in another company.',
  },
]

export default async function HomePage(): Promise<React.ReactElement> {
  const [rawServices, faqItems] = await Promise.all([getServices(), getFaqItems()])
  const services = rawServices.length > 0 ? rawServices : FULL_SERVICES.map((s, i) => ({
    title: s.heading,
    slug: ['accounting', 'tax', 'secretarial', 'payroll', 'legal', 'bookkeeping'][i] ?? s.heading.toLowerCase(),
    icon: s.icon,
    shortDescription: s.description,
    offerings: [] as string[],
    seoTitle: '',
    seoDescription: '',
  }))
  const accordionItems = faqItems.length >= 6 ? faqItems : FALLBACK_FAQ

  // Show up to 3 service cards on the home page intro
  const featuredServices = services.slice(0, 3)

  return (
    <main>
      <Hero />

      {/* Introduction */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="section-label mb-3">Who We Are</p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
            Your Trusted Partner in the Western Cape
          </h2>
          <p className="text-gray-500 leading-relaxed text-lg">
            Excel Accounting Services has been serving businesses and individuals from our offices
            in <strong className="text-navy">Fish Hoek</strong> and the{' '}
            <strong className="text-navy">Helderberg</strong> for over 30 years. We combine
            professional expertise with personal service to help you grow with confidence.
          </p>
        </div>
      </section>

      {/* Featured Service Cards */}
      {featuredServices.length > 0 && (
        <section className="py-20 px-6 bg-slate-50">
          <div className="container mx-auto">
            <p className="section-label mb-3 text-center">What We Do</p>
            <h2 className="text-3xl font-bold text-navy mb-12 text-center">Our Core Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredServices.map((service) => (
                <ServiceCard
                  key={service.slug}
                  title={service.title}
                  icon={service.icon}
                  shortDescription={service.shortDescription}
                  slug={service.slug}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Three Pillars */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <p className="section-label mb-3 text-center">Our Values</p>
          <h2 className="text-3xl font-bold text-navy mb-12 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-100 rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-gray-100 bg-white shadow-sm">
            {PILLARS.map((pillar) => (
              <PillarCard key={pillar.heading} heading={pillar.heading} description={pillar.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Full Services List */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="container mx-auto">
          <p className="section-label mb-3 text-center">Everything We Offer</p>
          <h2 className="text-3xl font-bold text-navy mb-12 text-center">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {FULL_SERVICES.map((svc) => (
              <div key={svc.heading} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col gap-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                <div className="text-3xl" aria-hidden="true">{svc.icon}</div>
                <h3 className="font-semibold text-navy text-lg">{svc.heading}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{svc.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-gradient-to-r from-teal to-teal-dark hover:from-teal-dark hover:to-teal text-white font-semibold px-8 rounded transition-all duration-200 min-h-[44px] shadow-md hover:shadow-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Tax Accordion */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-3xl">
          <p className="section-label mb-3">Tax Information</p>
          <h2 className="text-3xl font-bold text-navy mb-10">Key South African Tax Facts</h2>
          <Accordion items={accordionItems} />
        </div>
      </section>

      {/* Clients */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="section-label mb-3">Who We Work With</p>
          <h2 className="text-3xl font-bold text-navy mb-12">Our Clients</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {CLIENTS.map((client) => (
              <span
                key={client}
                className="bg-white border border-gray-100 rounded-lg px-5 py-3 text-sm font-semibold text-navy shadow-sm"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll-triggered CTA */}
      <section className="py-20 px-6 bg-navy">
        <div className="container mx-auto max-w-3xl text-center">
          <ScrollRevealCTA>
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Grow Your Business?</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Get in touch with our team today and let us help you take the next step.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-teal hover:bg-teal-dark text-white font-semibold px-10 rounded transition-colors duration-200 min-h-[44px]"
            >
              Contact Us
            </Link>
          </ScrollRevealCTA>
        </div>
      </section>
    </main>
  )
}
