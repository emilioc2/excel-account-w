import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-navy text-gray-400">
      <div className="container mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-teal text-white rounded w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0" aria-hidden="true">
              E
            </span>
            <span className="text-white font-bold">Excel Accounting Services</span>
          </div>
          <p className="text-sm leading-relaxed">
            Trusted financial advice and accounting services with more than 30 years of experience
            in the Western Cape.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-300 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm list-none p-0 m-0">
            {[['/', 'Home'], ['/about', 'About Us'], ['/services', 'Our Services'], ['/contact', 'Contact Us']].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white transition-colors duration-200">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Offices */}
        <div>
          <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-300 mb-4">Our Offices</h3>
          <address className="not-italic text-sm leading-relaxed space-y-3">
            <p>Windsor House, 83 Main Rd<br />Fishhoek, 7975</p>
            <p>Office 1, Ocean Breeze<br />Beach Rd, Strand, 7139</p>
          </address>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-300 mb-4">Contact</h3>
          <ul className="text-sm space-y-2 list-none p-0 m-0">
            <li>
              <a href="tel:+27217828927" className="hover:text-white transition-colors duration-200">021-782 8927</a>
            </li>
            <li>
              <a href="mailto:info@excelaccounting.co.za" className="hover:text-white transition-colors duration-200">info@excelaccounting.co.za</a>
            </li>
            <li>
              <a href="mailto:barry@excelaccounting.co.za" className="hover:text-white transition-colors duration-200">barry@excelaccounting.co.za</a>
            </li>
            <li className="pt-1 text-gray-500">
              Monday – Thursday: 07:30 – 16:00<br />Fridays: 07:30 – 13:30
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-4 text-xs flex flex-col md:flex-row justify-between gap-2 text-gray-500">
          <p>© {new Date().getFullYear()} Excel Accounting Services. All rights reserved.</p>
          <p>Designed &amp; Developed by <span className="text-teal">Eternity</span></p>
        </div>
      </div>
    </footer>
  )
}
