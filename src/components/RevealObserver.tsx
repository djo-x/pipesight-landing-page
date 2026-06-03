'use client'

import { useEffect } from 'react'

export default function RevealObserver() {
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    const reveals = document.querySelectorAll<HTMLElement>('.reveal')

    if ('IntersectionObserver' in window && !reduce) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in')
              io.unobserve(e.target)
            }
          })
        },
        { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
      )
      reveals.forEach((el) => io.observe(el))
      return () => io.disconnect()
    } else {
      reveals.forEach((el) => el.classList.add('in'))
    }
  }, [])

  return null
}
