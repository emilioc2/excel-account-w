import Link from 'next/link'
import type { Metadata } from 'next'
import PillarCard from '@/components/PillarCard'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'About Us | Excel Accounting Services',
  description:
    'Learn about Excel Accounting Services — over 30 years of trusted accounting, tax, legal, and secretarial expertise in the Western Cape.',
  alternates: { canonical: 'https://excelaccounting.co.za/about' },
  openGraph: {
    title: 'About Us | Excel Accounting Services',
    description: 'Over 30 years of trusted accounting, tax, legal, and secretarial expertise in the Western Cape.',
    url: 'https://excelaccounting.co.za/about',
  },
}

const PILLARS = [
  {
    heading: 'Trust',
    description: 'To build a sustainable business we need to ensure that we build enough trust with our clients so that they can know that we will always put them first.',
  },
  {
    heading: 'Knowledge',
    description: 'With more than 30 years of experience we have the tools and expertise to help you succeed.',
  },
  {
    heading: 'The Client',
    description: 'You are our greatest asset, because without you as our client, we will not exist as a business.',
  },
]

export default function AboutPage(): React.ReactElement {
  return (
    <main>
      {/* Hero */}
      <section className="bg-navy text-white py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <p className="section-label mb-4">About Us</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our Company</h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
            For the past 30 years we have been helping our clients to grow their businesses and
            make a success of their business dreams.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <p className="section-label mb-3">Our Foundation</p>
          <h2 className="text-3xl font-bold text-navy mb-12">Built on Three Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-100 rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-gray-100 bg-white">
            {PILLARS.map((pillar, i) => (
              <ScrollReveal key={pillar.heading} direction="left" delay={i * 120}>
                <PillarCard heading={pillar.heading} description={pillar.description} />
              </ScrollReveal>
            ))}
            ))}
          </div>
        </div>
      </section>

      {/* Body Text */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal direction="up">
            <h2 className="text-3xl font-bold text-navy mb-8">Our Story</h2>
            <div className="space-y-5 text-gray-500 leading-relaxed">
              <p>By combining all 3 of these pillars, we create a competitive advantage in building long-term relationships and ensure success for both our clients and our company.</p>
              <p>In today&apos;s fast-paced business environment you need the right value propositions to make a business succeed and we can offer these solutions.</p>
              <p>Being a small firm we are passionate about personal service and see our client&apos;s success as an extension of our own success. With complex regulation being passed down by the regulators, you need a partner that understands your business.</p>
              <p>In the ever changing dynamic world, we ensure that we keep up to date with all the current developments by sending our staff on year-round training. This ensures that our clients are kept abreast of the latest regulations and escape the many pitfalls so many companies fall into because of following outdated regulations and laws.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTAs */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal direction="up">
            <h2 className="text-2xl font-bold text-navy mb-4">Want to Know More?</h2>
            <p className="text-gray-500 mb-8">For more information feel free to contact us. We&apos;d love to hear from you.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services" className="inline-flex items-center justify-center bg-teal hover:bg-teal-dark text-white font-semibold px-8 rounded transition-colors duration-200 min-h-[44px]">Our Services</Link>
              <Link href="/contact" className="inline-flex items-center justify-center border border-navy text-navy hover:bg-navy hover:text-white font-semibold px-8 rounded transition-colors duration-200 min-h-[44px]">Contact Us</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
