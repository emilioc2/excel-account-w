'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks: [string, string][] = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/services', 'Services'],
  ['/contact', 'Contact'],
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-navy/70 backdrop-blur-md border-b border-white/10 shadow-md">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg tracking-tight">
          <span className="bg-teal text-white rounded w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0" aria-hidden="true">
            E
          </span>
          <span>Excel Accounting Services</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 list-none m-0 p-0">
          {navLinks.map(([href, label]) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
                className={
                  pathname === href
                    ? 'text-teal font-semibold'
                    : 'text-gray-300 hover:text-white transition-colors duration-200'
                }
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:0217828927"
            className="text-gray-300 hover:text-white transition-colors duration-200 text-sm min-h-[44px] flex items-center"
          >
            021-782 8927
          </a>
          <Link
            href="/contact"
            className="bg-teal hover:bg-teal-dark text-white font-semibold px-5 py-2 rounded transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center text-sm"
          >
            Get in Touch
          </Link>
        </div>

        {/* Hamburger */}
        <button
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 bg-navy z-40 flex flex-col items-center justify-start overflow-y-auto px-6 pt-24 pb-16 transition-transform duration-300 md:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!open}
      >
        <button
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <ul className="flex flex-col gap-8 text-2xl list-none m-0 p-0 text-center">
          {navLinks.map(([href, label]) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                aria-current={pathname === href ? 'page' : undefined}
                className={
                  pathname === href
                    ? 'text-teal font-semibold'
                    : 'text-white hover:text-teal transition-colors duration-200'
                }
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <a href="tel:0217828927" className="mt-10 text-gray-300 text-lg min-h-[44px] flex items-center">
          021-782 8927
        </a>
      </div>
    </header>
  )
}
