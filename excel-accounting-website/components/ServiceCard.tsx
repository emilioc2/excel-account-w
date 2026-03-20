import Link from 'next/link'

interface ServiceCardProps {
  title: string
  icon: string
  shortDescription: string
  slug: string
}

export default function ServiceCard({ title, icon, shortDescription, slug }: ServiceCardProps): React.ReactElement {
  return (
    <article className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col gap-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <div className="text-teal text-3xl" aria-hidden="true">{icon}</div>
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
