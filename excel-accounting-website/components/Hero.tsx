import Link from 'next/link'
import { BarChart2, Scale, FolderOpen, Briefcase, ShieldCheck, TrendingUp, Users, type LucideIcon } from 'lucide-react'

const SERVICES_PREVIEW: { icon: LucideIcon; category: string; label: string }[] = [
  { icon: BarChart2, category: 'Accounting & Tax', label: 'Financial Statements & Returns' },
  { icon: Scale, category: 'Legal Services', label: 'Wills, Trusts & Estates' },
  { icon: FolderOpen, category: 'Secretarial Services', label: 'Company Registrations' },
  { icon: Briefcase, category: 'Payroll', label: 'PAYE & Salary Processing' },
]

export default function Hero(): React.ReactElement {
  return (
    <section className="relative bg-gradient-to-br from-[#f0f4f8] via-[#e8f0f7] to-[#f0f4f8] text-navy py-24 md:py-32 px-6 overflow-hidden">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle, #1e2a3a 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        aria-hidden="true"
      />
      {/* Teal radial glow — top right */}
      <div
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.12]"
        style={{ background: 'radial-gradient(circle, #2a9688 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-teal/10 text-teal text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-teal" aria-hidden="true" />
              Western Cape&apos;s Trusted Accounting Firm
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance text-navy">
              Sound Financial{' '}
              <span className="text-teal">Advice</span>{' '}
              for Your Success
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mb-10 leading-relaxed">
              Corporate and personal business solutions backed by more than 30 years of expertise.
              Your dedicated business enabler in Fish Hoek and the Helderberg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-teal to-teal-dark hover:from-teal-dark hover:to-teal text-white font-semibold px-8 rounded transition-all duration-200 min-h-[44px] flex items-center justify-center shadow-md hover:shadow-lg"
              >
                Contact Us →
              </Link>
              <Link
                href="/services"
                className="border border-navy/30 hover:border-navy text-navy font-semibold px-8 rounded transition-colors duration-200 min-h-[44px] flex items-center justify-center"
              >
                Our Services
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: ShieldCheck, label: 'Trusted' },
                { icon: TrendingUp, label: '30+ Years' },
                { icon: Users, label: 'Personal Service' },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-gray-500 text-sm">
                  <badge.icon className="w-4 h-4 text-teal" aria-hidden="true" />
                  {badge.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating services card */}
          <div className="hidden lg:flex justify-end">
            <div className="relative w-full max-w-sm">
              {/* Services card */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-2xl ring-1 ring-teal/5">
                <p className="text-xs font-semibold tracking-widest uppercase text-teal mb-4">What We Do</p>
                <ul className="flex flex-col gap-4">
                  {SERVICES_PREVIEW.map((svc) => (
                    <li key={svc.category} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                        <svc.icon className="w-5 h-5 text-teal" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">{svc.category}</p>
                        <p className="text-sm font-semibold text-navy">{svc.label}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 30+ years badge */}
              <div className="absolute -bottom-5 -left-5 bg-teal rounded-2xl px-5 py-4 shadow-xl">
                <p className="text-2xl font-bold text-white leading-none">30+</p>
                <p className="text-xs text-white/80 mt-0.5">Years Experience</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
