'use client'

import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav id="nav" className={scrolled ? 'scrolled' : ''}>
      <div className="wrap nav-inner">
        <a href="#top" className="brand" aria-label="Pipesight home">
          <svg
            className="mark"
            width="30"
            height="30"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="1"
              y1="16"
              x2="31"
              y2="16"
              stroke="#ECEAE0"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <g className="reticle">
              <circle
                cx="16"
                cy="16"
                r="8.5"
                fill="rgba(203,239,77,0.10)"
                stroke="#CBEF4D"
                strokeWidth="2.2"
              />
              <line
                x1="16"
                y1="9.6"
                x2="16"
                y2="12.2"
                stroke="#CBEF4D"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <line
                x1="16"
                y1="19.8"
                x2="16"
                y2="22.4"
                stroke="#CBEF4D"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <circle cx="16" cy="16" r="2.1" fill="#CBEF4D" />
            </g>
          </svg>
          <span className="wordmark">Pipesight</span>
        </a>
        <div className="nav-right">
          <a href="#features" className="nav-link hide-sm">
            Features
          </a>
          <a href="#alert" className="nav-link hide-sm">
            The alert
          </a>
          <a href="#pricing" className="nav-link hide-sm">
            Pricing
          </a>
          <a href="#join" className="btn btn-lime btn-sm">
            Join waitlist
          </a>
        </div>
      </div>
    </nav>
  )
}
