'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import WaitlistForm from '@/components/ui/WaitlistForm'

interface Packet {
  x: number
  lane: number
  speed: number
  r: number
  failed: boolean
  caught: boolean
  flare: number
}

interface Ring {
  x: number
  y: number
  r: number
  a: number
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const windowRef = useRef<HTMLDivElement>(null)
  const alertRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const maybeCanvas = canvasRef.current
    if (!maybeCanvas || !maybeCanvas.getContext) return
    const canvas = maybeCanvas

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    const ctx = canvas.getContext('2d')!
    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    const LANE_N = 5
    const COL_BONE = '236,234,224'
    const COL_LIME = '203,239,77'
    const COL_CORAL = '255,106,82'

    let W = 0,
      H = 0,
      reticleX = 0
    let lanes: number[] = []
    const packets: Packet[] = []
    const rings: Ring[] = []
    let rafId: number
    let lastSpawn = 0

    function resize() {
      W = canvas.clientWidth
      H = canvas.clientHeight
      canvas.width = W * DPR
      canvas.height = H * DPR
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      reticleX = W * (W < 760 ? 0.5 : 0.66)
      lanes = []
      for (let i = 0; i < LANE_N; i++) {
        lanes.push(H * (0.16 + 0.68 * (i / (LANE_N - 1))) + (Math.random() * 8 - 4))
      }
    }

    function spawn() {
      packets.push({
        x: -30,
        lane: Math.floor(Math.random() * LANE_N),
        speed: 0.55 + Math.random() * 0.85,
        r: 2.4 + Math.random() * 2.2,
        failed: Math.random() < 0.26,
        caught: false,
        flare: 0,
      })
    }

    function drawReticle(cx: number, cy: number) {
      const R = Math.max(26, Math.min(W, H) * 0.07)
      ctx.save()
      ctx.translate(cx, cy)
      ctx.strokeStyle = `rgba(${COL_LIME},0.85)`
      ctx.lineWidth = 1.6
      ctx.beginPath()
      ctx.arc(0, 0, R, 0, Math.PI * 2)
      ctx.stroke()
      ctx.strokeStyle = `rgba(${COL_LIME},0.22)`
      ctx.beginPath()
      ctx.arc(0, 0, R + 6, 0, Math.PI * 2)
      ctx.stroke()
      ctx.strokeStyle = `rgba(${COL_LIME},0.9)`
      ctx.lineWidth = 1.6
      const tk = 8
      ;(
        [
          [0, -1],
          [0, 1],
          [-1, 0],
          [1, 0],
        ] as [number, number][]
      ).forEach(([dx, dy]) => {
        ctx.beginPath()
        ctx.moveTo(dx * (R - tk), dy * (R - tk))
        ctx.lineTo(dx * (R + tk), dy * (R + tk))
        ctx.stroke()
      })
      ctx.fillStyle = `rgba(${COL_LIME},0.9)`
      ctx.beginPath()
      ctx.arc(0, 0, 2.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    function frame(now: number) {
      ctx.clearRect(0, 0, W, H)
      ctx.strokeStyle = `rgba(${COL_BONE},0.04)`
      ctx.lineWidth = 1
      const gap = 64,
        off = (now * 0.012) % gap
      for (let gx = -off; gx < W; gx += gap) {
        ctx.beginPath()
        ctx.moveTo(gx, 0)
        ctx.lineTo(gx, H)
        ctx.stroke()
      }
      for (let l = 0; l < LANE_N; l++) {
        ctx.strokeStyle = `rgba(${COL_BONE},0.10)`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, lanes[l])
        ctx.lineTo(W, lanes[l])
        ctx.stroke()
      }
      if (now - lastSpawn > 360) {
        spawn()
        lastSpawn = now
      }
      ctx.strokeStyle = `rgba(${COL_LIME},0.16)`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(reticleX, 0)
      ctx.lineTo(reticleX, H)
      ctx.stroke()

      for (let p = packets.length - 1; p >= 0; p--) {
        const pk = packets[p]
        pk.x += pk.speed
        const py = lanes[pk.lane]
        if (pk.failed && !pk.caught && pk.x >= reticleX) {
          pk.caught = true
          pk.flare = 1
          rings.push({ x: reticleX, y: py, r: 6, a: 1 })
        }
        const col = pk.failed && pk.caught ? COL_CORAL : COL_BONE
        const grad = ctx.createLinearGradient(pk.x - 22, 0, pk.x, 0)
        grad.addColorStop(0, `rgba(${col},0)`)
        grad.addColorStop(1, `rgba(${col},0.5)`)
        ctx.strokeStyle = grad
        ctx.lineWidth = pk.r * 0.9
        ctx.beginPath()
        ctx.moveTo(pk.x - 22, py)
        ctx.lineTo(pk.x, py)
        ctx.stroke()
        const headCol = pk.failed && pk.caught ? COL_CORAL : pk.failed ? COL_BONE : COL_LIME
        const glow = pk.flare > 0 ? pk.flare : 0.5
        ctx.fillStyle = `rgba(${headCol},0.95)`
        ctx.shadowBlur = 10 * glow
        ctx.shadowColor = `rgba(${headCol},0.8)`
        ctx.beginPath()
        ctx.arc(pk.x, py, pk.r + pk.flare * 1.6, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
        if (pk.flare > 0) pk.flare *= 0.92
        if (pk.x > W + 30) packets.splice(p, 1)
      }
      if (packets.length > 60) packets.splice(0, packets.length - 60)

      for (let r = rings.length - 1; r >= 0; r--) {
        const rg = rings[r]
        rg.r += 1.4
        rg.a *= 0.95
        ctx.strokeStyle = `rgba(${COL_LIME},${rg.a.toFixed(3)})`
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(rg.x, rg.y, rg.r, 0, Math.PI * 2)
        ctx.stroke()
        if (rg.a < 0.03) rings.splice(r, 1)
      }
      drawReticle(reticleX, H * 0.5 + Math.sin(now * 0.0009) * (H * 0.18))
      rafId = requestAnimationFrame(frame)
    }

    resize()
    window.addEventListener('resize', resize)

    if (reduce) {
      ctx.clearRect(0, 0, W, H)
      for (let li = 0; li < LANE_N; li++) {
        ctx.strokeStyle = `rgba(${COL_BONE},0.10)`
        ctx.beginPath()
        ctx.moveTo(0, lanes[li])
        ctx.lineTo(W, lanes[li])
        ctx.stroke()
      }
      drawReticle(reticleX, H * 0.5)
    } else {
      rafId = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    if (reduce) return
    const win = windowRef.current
    const alert = alertRef.current

    function onScroll() {
      const p = window.scrollY / window.innerHeight
      if (win)
        win.style.transform = `rotateY(${-13 + p * 5 * 0.6}deg) rotateX(${5 - p * 3 * 0.6}deg) translateY(${p * 36 * 0.6}px)`
      if (alert) alert.style.transform = `translateY(${p * -54 * 0.6}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="hero">
      <canvas ref={canvasRef} id="hero-canvas" aria-hidden="true" />
      <div className="hero-scrim" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="pill" data-reveal>
            <span className="dot" />
            Private beta · first 50 teams get 3 months Pro free
          </span>
          <h1 data-reveal>
            Your Databricks jobs are <span className="coral-word">failing.</span>
            <span className="hl-line">
              You just don&apos;t know it <em>yet.</em>
            </span>
          </h1>
          <p className="sub" data-reveal>
            Pipesight watches every pipeline run and fires a clean Slack alert the instant a job
            fails — before your data is late and the questions start.
          </p>
          <div data-reveal>
            <WaitlistForm />
          </div>
        </div>

        <div className="hero-stage" aria-hidden="true">
          <div className="hero-window" ref={windowRef}>
            <div className="win-bar">
              <span className="dotrow">
                <i />
                <i />
                <i />
              </span>
              <span className="win-title">pipesight — dashboard</span>
            </div>
            <div className="win-shot">
              <Image
                src="/shot-dashboard.jpg"
                alt=""
                width={720}
                height={450}
                priority
                style={{ display: 'block', width: '100%', height: 'auto' }}
              />
            </div>
          </div>
          <div className="hero-alert" ref={alertRef}>
            <span className="ha-dot" />
            <div className="ha-body">
              <b>fct_orders_daily</b> failed
              <span>caught 03:14 · alert sent</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
