'use client'

import { useEffect } from 'react'

export default function RevealObserver() {
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    const reveals = document.querySelectorAll<HTMLElement>('[data-reveal]')

    if ('IntersectionObserver' in window && !reduce) {
      document.documentElement.classList.add('reveal-armed')
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in')
              io.unobserve(e.target)
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      )
      reveals.forEach((el) => io.observe(el))
      // immediate pass for above-the-fold elements
      const revealVisible = () =>
        reveals.forEach((el) => {
          const r = el.getBoundingClientRect()
          if (r.top < window.innerHeight * 0.92 && r.bottom > 0) el.classList.add('in')
        })
      requestAnimationFrame(revealVisible)
      window.addEventListener('load', revealVisible)
      return () => {
        io.disconnect()
        window.removeEventListener('load', revealVisible)
      }
    } else {
      reveals.forEach((el) => el.classList.add('in'))
    }
  }, [])

  return null
}
