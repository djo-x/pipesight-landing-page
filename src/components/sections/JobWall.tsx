'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'

const JOB_NAMES = [
  'customer_data_sync',
  'events_rollup',
  'ml_feature_store',
  'billing_etl',
  'session_aggregates',
  'warehouse_load',
  'churn_scoring',
  'ads_attribution',
  'inventory_snapshot',
  'clickstream_parse',
  'fx_rates_ingest',
  'kpi_daily',
  'user_dim_build',
  'fraud_signals',
  'email_metrics',
  'geo_enrich',
  'orders_cdc',
  'payouts_recon',
  'search_index',
  'ab_test_rollup',
  'support_tickets',
  'cohort_build',
  'revenue_cube',
  'device_graph',
]

const TILE_N = 24

interface TileData {
  id: number
  name: string
  bars: number[]
  ms: number
  state: 'ok' | 'fail'
  pulse: boolean
}

interface ToastData {
  id: number
  name: string
  time: string
  leaving: boolean
}

function initTiles(): TileData[] {
  return Array.from({ length: TILE_N }, (_, i) => ({
    id: i,
    name: JOB_NAMES[i % JOB_NAMES.length],
    bars: Array.from({ length: 7 }, () => 28 + Math.random() * 72),
    ms: 12 + Math.floor(Math.random() * 240),
    state: 'ok',
    pulse: false,
  }))
}

export default function JobWall() {
  const [tiles, setTiles] = useState<TileData[]>(initTiles)
  const [toasts, setToasts] = useState<ToastData[]>([])
  const [count, setCount] = useState(12060)
  const wallRef = useRef<HTMLDivElement>(null)
  const toastIdRef = useRef(0)
  const targetCount = useRef(12408)
  const started = useRef(false)

  const fireFailure = useCallback(() => {
    setTiles((prev) => {
      const okIds = prev.filter((t) => t.state === 'ok').map((t) => t.id)
      if (okIds.length === 0) return prev
      const id = okIds[Math.floor(Math.random() * okIds.length)]
      const name = prev[id].name
      const now = new Date()
      const hh = String(now.getHours()).padStart(2, '0')
      const mm = String(now.getMinutes()).padStart(2, '0')
      const toastId = ++toastIdRef.current

      setToasts((t) => {
        const next = [...t.slice(-2), { id: toastId, name, time: `${hh}:${mm}`, leaving: false }]
        return next
      })

      setTimeout(() => {
        setToasts((t) => t.map((x) => (x.id === toastId ? { ...x, leaving: true } : x)))
        setTimeout(() => setToasts((t) => t.filter((x) => x.id !== toastId)), 400)
      }, 3600)

      setTimeout(() => {
        setTiles((p) => p.map((t) => (t.id === id ? { ...t, state: 'ok' as const } : t)))
      }, 4200)

      return prev.map((t) => (t.id === id ? { ...t, state: 'fail' as const } : t))
    })
  }, [])

  const ambient = useCallback(() => {
    setTiles((prev) => {
      const okIds = prev.filter((t) => t.state === 'ok' && !t.pulse).map((t) => t.id)
      if (okIds.length === 0) return prev
      const id = okIds[Math.floor(Math.random() * okIds.length)]
      setTimeout(() => {
        setTiles((p) => p.map((t) => (t.id === id ? { ...t, pulse: false } : t)))
      }, 900)
      return prev.map((t) => (t.id === id ? { ...t, pulse: true } : t))
    })
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    if (reduce) return

    const startWall = () => {
      if (started.current) return
      started.current = true
      const failTimer = setInterval(fireFailure, 3400)
      const pulseTimer = setInterval(ambient, 700)
      setTimeout(fireFailure, 900)
      return () => {
        clearInterval(failTimer)
        clearInterval(pulseTimer)
      }
    }

    const el = wallRef.current
    if (!el) return

    let cleanup: (() => void) | undefined

    if ('IntersectionObserver' in window) {
      const wio = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              cleanup = startWall() ?? undefined
              wio.disconnect()
            }
          })
        },
        { threshold: 0.25 }
      )
      wio.observe(el)
      return () => {
        wio.disconnect()
        cleanup?.()
      }
    } else {
      cleanup = startWall() ?? undefined
      return () => cleanup?.()
    }
  }, [fireFailure, ambient])

  /* counter animation */
  useEffect(() => {
    const el = wallRef.current
    if (!el) return

    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const step = () => {
              setCount((cur) => {
                const next = cur + Math.ceil((targetCount.current - cur) / 12)
                if (next >= targetCount.current) {
                  cio.disconnect()
                  return targetCount.current
                }
                requestAnimationFrame(step)
                return next
              })
            }
            requestAnimationFrame(step)
          }
        })
      },
      { threshold: 0.4 }
    )
    cio.observe(el)

    const drift = setInterval(() => {
      targetCount.current += Math.floor(Math.random() * 4)
    }, 2600)

    return () => {
      cio.disconnect()
      clearInterval(drift)
    }
  }, [])

  return (
    <section className="wall">
      <div className="wall-head reveal">
        <span className="eyebrow center">Live right now</span>
        <h2>
          Pipesight is watching <span className="count">{count.toLocaleString('en-US')}</span> jobs.
        </h2>
        <p>Every run, polled continuously. The moment one turns red — it&apos;s caught.</p>
      </div>

      <div className="grid-wall" ref={wallRef} aria-hidden="true">
        {tiles.map((tile) => (
          <div
            key={tile.id}
            className={cn('tile', tile.state, tile.pulse && tile.state === 'ok' && 'pulse')}
          >
            <div className="row">
              <span className="name">{tile.name}</span>
              <span className="led" />
            </div>
            <div className="spark">
              {tile.bars.map((h, i) => (
                <i key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="row">
              <span className="stat">{tile.state === 'fail' ? 'failed' : 'healthy'}</span>
              <span className="stat">{tile.ms}ms</span>
            </div>
          </div>
        ))}
      </div>

      <div className="toasts" aria-hidden="true">
        {toasts.map((toast) => (
          <div key={toast.id} className={cn('toast', toast.leaving && 'out')}>
            <span className="tdot" />
            <span>
              <b>{toast.name}</b> failed &middot; <span className="lime">caught {toast.time}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
