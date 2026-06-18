'use client'

import { useEffect, useRef, useState } from 'react'

const ERROR_TEXT = 'PythonException: Job aborted due to stage failure'

export default function TheAlert() {
  const [typed, setTyped] = useState(ERROR_TEXT)
  const [showCursor, setShowCursor] = useState(false)
  const rowsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    if (reduce) return

    const el = rowsRef.current
    if (!el || !('IntersectionObserver' in window)) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTyped('')
            setShowCursor(true)
            let n = 0
            const typ = setInterval(() => {
              n++
              setTyped(ERROR_TEXT.slice(0, n))
              if (n >= ERROR_TEXT.length) {
                clearInterval(typ)
                setTimeout(() => setShowCursor(false), 900)
              }
            }, 30)
            io.disconnect()
          }
        })
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="pricing pad" id="alert">
      <span className="sec-index">02 — THE ALERT</span>
      <div className="wrap">
        <div className="center-head" data-reveal>
          <span className="eyebrow center">The payoff</span>
          <h2>This is what lands in Slack.</h2>
          <p className="lead">
            Nothing more, nothing less — everything you need to triage, the second a job goes red.
          </p>
        </div>

        <div className="slack-wrap" data-reveal>
          <div className="slack">
            <div className="slack-head">
              <span className="live" />
              Pipeline Failure <span className="app">&middot; Pipesight</span>
              <span className="slack-time">03:14</span>
            </div>
            <hr className="slack-rule" />
            <div className="slack-rows" ref={rowsRef}>
              <span className="k">Job:</span>
              <span className="v">fct_orders_daily</span>
              <span className="k">Status:</span>
              <span className="v fail">FAILED</span>
              <span className="k">Workspace:</span>
              <span className="v">acme · production</span>
              <span className="k">Error:</span>
              <span className="v err" suppressHydrationWarning>
                {typed}
                {showCursor && <span className="cursor" />}
              </span>
            </div>
            <a href="#" className="slack-btn" onClick={(e) => e.preventDefault()}>
              View Failed Run →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
