import { useEffect } from 'react'

// Adds `is-visible` to `.reveal` / `.reveal-line` elements as they scroll into view.
// Content stays visible without JS and for users who prefer reduced motion.
export default function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal, .reveal-line')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion || !('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'))
      return undefined
    }

    document.documentElement.classList.add('has-reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
