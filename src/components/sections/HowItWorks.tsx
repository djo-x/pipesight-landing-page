'use client'

import { useEffect, useRef, useState } from 'react'

const ERROR_TEXT = 'FileNotFoundException: /data/input.csv'

export default function HowItWorks() {
  const [typed, setTyped] = useState('')
  const [showCursor, setShowCursor] = useState(false)
  const errRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    if (reduce) {
      setTyped(ERROR_TEXT)
      return
    }

    const el = errRef.current
    if (!el || !('IntersectionObserver' in window)) {
      setTyped(ERROR_TEXT)
      return
    }

    const sio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShowCursor(true)
            let n = 0
            const typ = setInterval(() => {
              n++
              setTyped(ERROR_TEXT.slice(0, n))
              if (n >= ERROR_TEXT.length) {
                clearInterval(typ)
                setTimeout(() => setShowCursor(false), 900)
              }
            }, 26)
            sio.disconnect()
          }
        })
      },
      { threshold: 0.6 }
    )
    sio.observe(el)
    return () => sio.disconnect()
  }, [])

  return (
    <section className="pad" id="how-it-works">
      <div className="wrap">
        <div className="center-head reveal">
          <span className="eyebrow center">How it works</span>
          <h2>Connect in 2 minutes. Never miss a failure again.</h2>
        </div>

        <div className="cards-3">
          <div className="hcard reveal">
            <div className="num">01</div>
            <h3>Connect your workspace</h3>
            <p>
              Paste your Databricks personal access token. Pipesight connects to your workspace in
              seconds and starts monitoring immediately.
            </p>
          </div>
          <div className="hcard reveal" style={{ transitionDelay: '.08s' }}>
            <div className="num">02</div>
            <h3>We watch your pipelines 24/7</h3>
            <p>
              Pipesight polls your Databricks job runs continuously. Every failure is detected the
              moment it happens — no manual checking required.
            </p>
          </div>
          <div className="hcard reveal" style={{ transitionDelay: '.16s' }}>
            <div className="num">03</div>
            <h3>Get a clean alert instantly</h3>
            <p>
              A structured Slack message lands the moment a job fails — job name, error type,
              timestamp, and a direct link to the failed run.
            </p>
          </div>
        </div>

        <div className="slack-wrap reveal">
          <p className="slack-label">This is what lands in Slack — nothing more, nothing less.</p>
          <div className="slack">
            <div className="slack-head">
              <span className="live" />
              Pipeline Failure <span className="app">&middot; Pipesight</span>
            </div>
            <hr className="slack-rule" />
            <div className="slack-rows">
              <span className="k">Job:</span>
              <span className="v">customer_data_sync</span>
              <span className="k">Status:</span>
              <span className="v fail">FAILED</span>
              <span className="k">Time:</span>
              <span className="v">Today at 14:32</span>
              <span className="k">Error:</span>
              <span className="v err" ref={errRef}>
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
