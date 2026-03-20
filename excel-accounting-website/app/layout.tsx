import type { Metadata } from 'next'
import { Inter, Josefin_Sans } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const inter = Inter({ subsets: ['latin'] })
const josefin = Josefin_Sans({ subsets: ['latin'], variable: '--font-josefin' })

export const metadata: Metadata = {
  title: 'Excel Accounting Services',
  description:
    'Professional accounting, tax, legal, secretarial, payroll, and bookkeeping services in the Western Cape, South Africa.',
  alternates: {
    canonical: 'https://excelaccounting.co.za',
  },
  openGraph: {
    title: 'Excel Accounting Services',
    description:
      'Professional accounting, tax, legal, secretarial, payroll, and bookkeeping services in the Western Cape, South Africa.',
    url: 'https://excelaccounting.co.za',
  },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Excel Accounting Services',
  url: 'https://excelaccounting.co.za',
  telephone: '+27217828927',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Windsor House, Main Road',
    addressLocality: 'Fishhoek',
    postalCode: '7975',
    addressCountry: 'ZA',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className={`${inter.className} ${josefin.variable} flex flex-col min-h-screen`}>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
