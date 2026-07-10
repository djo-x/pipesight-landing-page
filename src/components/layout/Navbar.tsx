'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const onHome = pathname === '/'
  const to = (hash: string) => (onHome ? `#${hash}` : `/#${hash}`)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={scrolled ? 'main scrolled' : 'main'}>
      <div className="wrap nav-inner">
        <a href={onHome ? '#top' : '/'} className="brand" aria-label="Pipesight home">
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <line
              x1="1"
              y1="16"
              x2="31"
              y2="16"
              stroke="#E9EFE4"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle
              cx="16"
              cy="16"
              r="8.5"
              fill="rgba(200,255,61,0.1)"
              stroke="#C8FF3D"
              strokeWidth="2.2"
            />
            <line
              x1="16"
              y1="9.6"
              x2="16"
              y2="12.2"
              stroke="#C8FF3D"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <line
              x1="16"
              y1="19.8"
              x2="16"
              y2="22.4"
              stroke="#C8FF3D"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="16" cy="16" r="2.1" fill="#C8FF3D" />
          </svg>
          <span className="wordmark">PIPESIGHT</span>
        </a>
        <div className="nav-right">
          <a href={to('how')} className="nav-link hide-sm">
            How it works
          </a>
          <a href={to('pricing')} className="nav-link hide-sm">
            Pricing
          </a>
          <a href={to('join')} className="btn btn-ghost btn-sm">
            Join waitlist
          </a>
        </div>
      </div>
    </nav>
  )
}
