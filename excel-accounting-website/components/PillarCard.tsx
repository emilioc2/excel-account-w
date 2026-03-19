interface PillarCardProps {
  heading: string
  description: string
}

export default function PillarCard({ heading, description }: PillarCardProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-3 p-6">
      <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-teal" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
      <h3 className="font-semibold text-navy text-lg">{heading}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  )
}
