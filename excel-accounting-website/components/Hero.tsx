import Link from 'next/link'

export default function Hero(): React.ReactElement {
  return (
    <section className="bg-navy text-white py-24 md:py-32 px-6">
      <div className="container mx-auto max-w-4xl">
        <p className="section-label mb-4">Western Cape&apos;s Trusted Accounting Firm</p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-balance">
          Sound Financial Advice for Your Success
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Corporate and personal business solutions backed by more than 30 years of expertise.
          We are your dedicated business enabler in Fish Hoek and the Helderberg.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact"
            className="bg-teal hover:bg-teal-dark text-white font-semibold px-8 rounded transition-colors duration-200 min-h-[44px] flex items-center justify-center"
          >
            Contact Us
          </Link>
          <Link
            href="/services"
            className="border border-white/30 hover:border-white text-white font-semibold px-8 rounded transition-colors duration-200 min-h-[44px] flex items-center justify-center"
          >
            Our Services
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-6 mt-14">
          {['Trusted', '30+ Years', 'Personal Service'].map((badge) => (
            <div key={badge} className="flex items-center gap-2 text-gray-300 text-sm">
              <span className="w-2 h-2 rounded-full bg-teal flex-shrink-0" aria-hidden="true" />
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
