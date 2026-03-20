import Link from 'next/link'
import { BarChart2, Receipt, FolderOpen, Briefcase, Scale, BookOpen, LucideIcon } from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  accounting: BarChart2,
  tax: Receipt,
  secretarial: FolderOpen,
  payroll: Briefcase,
  legal: Scale,
  bookkeeping: BookOpen,
}

interface ServiceCardProps {
  title: string
  icon: string
  shortDescription: string
  slug: string
}

export default function ServiceCard({ title, shortDescription, slug }: ServiceCardProps): React.ReactElement {
  const Icon = ICON_MAP[slug] ?? BarChart2

  return (
    <article className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col gap-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <div className="w-11 h-11 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-teal" aria-hidden="true" />
      </div>
      <h3 className="font-semibold text-navy text-lg">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed flex-1">{shortDescription}</p>
      <Link
        href={`/services/${slug}`}
        className="mt-2 text-teal font-semibold hover:text-teal-dark transition-colors duration-200 min-h-[44px] flex items-center text-sm"
      >
        Learn More →
      </Link>
    </article>
  )
}
