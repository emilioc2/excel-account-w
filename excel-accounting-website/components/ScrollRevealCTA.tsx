'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollRevealCTAProps {
  children: React.ReactNode
}

export default function ScrollRevealCTA({ children }: ScrollRevealCTAProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const prefersReduced = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const className = prefersReduced.current
    ? ''
    : visible
    ? 'animate-fade-slide-up'
    : 'opacity-0'

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
