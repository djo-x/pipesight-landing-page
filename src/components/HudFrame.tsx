'use client'

import { useEffect, useState } from 'react'

const NAV_ITEMS = [
  { label: 'Top', href: '#top' },
  { label: 'Features', href: '#features' },
  { label: 'Signal', href: '#alert' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Join', href: '#join' },
]

export default function HudFrame() {
  const [progress, setProgress] = useState(0)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const sectionIds = ['top', 'features', 'alert', 'pricing', 'join']

    function onScroll() {
      const y = window.scrollY
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? (y / h) * 100 : 0)

      const sections = sectionIds.map((id) => document.getElementById(id))
      const mid = y + window.innerHeight * 0.42
      let idx = 0
      sections.forEach((s, i) => {
        if (s && s.offsetTop <= mid) idx = i
      })
      setActiveIdx(idx)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span style={{ width: `${progress.toFixed(2)}%` }} />
      </div>

      <div className="hud" aria-hidden="true">
        <span className="corner tl" />
        <span className="corner tr" />
        <span className="corner bl" />
        <span className="corner br" />
        <span className="readout">
          <span className="live-dot" />
          PIPESIGHT&nbsp;·&nbsp;<b>observability cockpit</b>&nbsp;·&nbsp;polling every run
        </span>
      </div>

      <nav className="rail-nav" aria-label="Section navigation">
        {NAV_ITEMS.map((item, i) => (
          <a key={item.href} href={item.href} className={activeIdx === i ? 'active' : ''}>
            <span className="rn-label">{item.label}</span>
            <span className="rn-tick" />
          </a>
        ))}
      </nav>
    </>
  )
}
