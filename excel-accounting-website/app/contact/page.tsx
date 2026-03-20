import type { Metadata } from 'next'
import { Phone, Mail, Clock, MapPin } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | Excel Accounting Services',
  description:
    'Get in touch with Excel Accounting Services. Visit our offices in Fish Hoek or Strand, call us on 021-782 8927, or send us a message online.',
  alternates: { canonical: 'https://excelaccounting.co.za/contact' },
  openGraph: {
    title: 'Contact Us | Excel Accounting Services',
    description: 'Reach Excel Accounting Services by phone, email, or our online contact form. Offices in Fish Hoek and Strand.',
    url: 'https://excelaccounting.co.za/contact',
  },
}

const INFO_CARDS = [
  { heading: 'Call Us', detail: '021-782 8927', href: 'tel:0217828927', Icon: Phone },
  { heading: 'Email Us', detail: 'info@excelaccounting.co.za', href: 'mailto:info@excelaccounting.co.za', Icon: Mail },
  { heading: 'Office Hours', detail: 'Mon\u2013Thu 07:30\u201316:00\nFri 07:30\u201313:30', href: null, Icon: Clock },
]

const OFFICES = [
  { name: 'Fish Hoek Office', address: 'Windsor House\n83 Main Rd\nFish Hoek, 7975' },
  { name: 'Strand Office', address: 'Office 1, Ocean Breeze\nBeach Rd\nStrand, 7139' },
]

export default function ContactPage(): React.ReactElement {
  return (
    <main>
      {/* Hero */}
      <section className="bg-navy text-white py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <p className="section-label mb-4">Get in Touch</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            We would love to hear from you. Reach out by phone, email, or use the form below.
          </p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INFO_CARDS.map((card) => (
              <div key={card.heading} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col items-center gap-3 text-center">
                <div className="w-11 h-11 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                  <card.Icon className="w-5 h-5 text-teal" aria-hidden="true" />
                </div>
                <h2 className="text-sm font-semibold tracking-widest uppercase text-teal">{card.heading}</h2>
                {card.href ? (
                  <a
                    href={card.href}
                    className="text-navy font-medium hover:text-teal transition-colors duration-200 min-h-[44px] flex items-center justify-center"
                  >
                    {card.detail}
                  </a>
                ) : (
                  <p className="text-gray-500 whitespace-pre-line text-sm leading-relaxed">{card.detail}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Offices side by side on desktop */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold text-navy mb-2">Send Us a Message</h2>
            <p className="text-gray-500 mb-8 text-sm">We will get back to you as soon as possible.</p>
            <ContactForm />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy mb-8">Our Offices</h2>
            <div className="space-y-6">
              {OFFICES.map((office) => (
                <div key={office.name} className="bg-gray-50 rounded-xl border border-gray-100 p-6 flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-teal" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">{office.name}</h3>
                    <p className="text-gray-500 text-sm whitespace-pre-line leading-relaxed">{office.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing Blurb */}
      <section className="py-20 px-6 bg-navy text-white text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Choose Excel Accounting</h2>
          <p className="text-gray-300 leading-relaxed">
            If you are serious about growing your business, let our team of experienced professionals
            handle your accounting, tax, and compliance needs so you can focus on what matters most.
          </p>
        </div>
      </section>
    </main>
  )
}
