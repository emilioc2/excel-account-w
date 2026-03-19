'use client'

import { useState } from 'react'

export interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
}

export default function Accordion({ items }: AccordionProps): React.ReactElement {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number): void => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div key={index}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${index}`}
              id={`accordion-trigger-${index}`}
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-6 py-4 text-left font-medium text-navy bg-white hover:bg-gray-50 transition-colors duration-200 min-h-[44px]"
            >
              <span>{item.question}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 text-teal flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              id={`accordion-panel-${index}`}
              role="region"
              aria-labelledby={`accordion-trigger-${index}`}
              hidden={!isOpen}
              className="px-6 py-4 text-gray-500 text-sm leading-relaxed bg-gray-50"
            >
              {item.answer}
            </div>
          </div>
        )
      })}
    </div>
  )
}
