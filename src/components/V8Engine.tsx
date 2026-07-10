'use client'

import { useEffect } from 'react'

/**
 * Pipesight v8 — "Night Ops" engine.
 * Imperative, DOM-driven port of pipesight-v8.js: reveal, nav scroll state,
 * the generative hero canvas (pipes + hunting reticle), marquee duplication,
 * the scroll-driven night clock, the Slack typewriter, and text-decode kickers.
 * Form wiring lives in <WaitlistForm> instead of here.
 */
export default function V8Engine() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cleanups: Array<() => void> = []

    /* ================= reveal ================= */
    const revealEls = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if ('IntersectionObserver' in window && !reduced) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in')
              io.unobserve(e.target)
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
      )
      revealEls.forEach((el) => io.observe(el))
      cleanups.push(() => io.disconnect())
    } else {
      revealEls.forEach((el) => el.classList.add('in'))
    }

    /* ================= nav ================= */
    const nav = document.querySelector('nav.main')
    const onNavScroll = () => {
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 30)
    }
    window.addEventListener('scroll', onNavScroll, { passive: true })
    onNavScroll()
    cleanups.push(() => window.removeEventListener('scroll', onNavScroll))

    /* ================= HERO CANVAS — pipes + reticle hunts ================= */
    const canvas = document.getElementById('pipes-canvas') as HTMLCanvasElement | null
    let caughtCount = 0
    const caughtEl = document.getElementById('caught-n')

    if (canvas && !reduced) {
      const ctx = canvas.getContext('2d')!
      let W = 0
      let H = 0
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      let pipes: Array<{ y: number; speed: number }> = []
      let packets: Array<{
        pipe: { y: number; speed: number }
        x: number
        len: number
        v: number
        state: 'ok' | 'fail' | 'caught'
        failT: number
      }> = []
      const heroEl = canvas.closest('.hero')
      let alarmT: ReturnType<typeof setTimeout> | null = null
      const reticle = {
        x: 0,
        y: 0,
        tx: 0,
        ty: 0,
        r: 26,
        state: 'idle' as 'idle' | 'hunt' | 'lock' | 'flash',
        target: null as (typeof packets)[number] | null,
        lockT: 0,
      }
      let rafId = 0
      let running = true

      function spawnPacket(anywhere: boolean) {
        const p = pipes[Math.floor(Math.random() * pipes.length)]
        if (!p) return
        packets.push({
          pipe: p,
          x: anywhere ? Math.random() * W : -30,
          len: 14 + Math.random() * 26,
          v: p.speed * (0.8 + Math.random() * 0.5),
          state: 'ok',
          failT: 0,
        })
      }

      function buildPipes() {
        pipes = []
        const n = Math.max(6, Math.floor(H / 110))
        for (let i = 0; i < n; i++) {
          const y = H * (0.08 + 0.86 * (i / (n - 1))) + (Math.random() * 26 - 13)
          pipes.push({ y, speed: 0.5 + Math.random() * 1.1 })
        }
        packets = []
        for (let j = 0; j < n * 2; j++) spawnPacket(true)
        reticle.x = W * 0.72
        reticle.y = H * 0.5
        reticle.tx = reticle.x
        reticle.ty = reticle.y
      }

      function sizeCanvas() {
        const rect = canvas!.parentElement!.getBoundingClientRect()
        W = rect.width
        H = rect.height
        canvas!.width = W * dpr
        canvas!.height = H * dpr
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        buildPipes()
      }

      let lastFail = 0
      function maybeFail(t: number) {
        if (t - lastFail < 3800) return
        const candidates = packets.filter(
          (p) => p.state === 'ok' && p.x > W * 0.3 && p.x < W * 0.82
        )
        if (!candidates.length) return
        const pk = candidates[Math.floor(Math.random() * candidates.length)]
        pk.state = 'fail'
        pk.failT = t
        lastFail = t
        if (reticle.state === 'idle') {
          reticle.state = 'hunt'
          reticle.target = pk
        }
        if (heroEl) {
          heroEl.classList.add('alarm')
          if (alarmT) clearTimeout(alarmT)
          alarmT = setTimeout(() => heroEl.classList.remove('alarm'), 750)
        }
      }

      let lastSpawn = 0
      function frame(t: number) {
        if (!running) return
        ctx.clearRect(0, 0, W, H)

        ctx.lineWidth = 1
        pipes.forEach((p) => {
          ctx.strokeStyle = 'rgba(233,239,228,0.07)'
          ctx.beginPath()
          ctx.moveTo(0, p.y)
          ctx.lineTo(W, p.y)
          ctx.stroke()
        })

        packets.forEach((pk) => {
          if (pk.state === 'fail') {
            pk.x += pk.v * 0.15
            ctx.fillStyle = '#FF5C3F'
          } else if (pk.state === 'caught') {
            pk.x += pk.v * 1.4
            ctx.fillStyle = '#C8FF3D'
          } else {
            pk.x += pk.v
            ctx.fillStyle = 'rgba(145,188,42,0.7)'
          }
          ctx.fillRect(pk.x, pk.pipe.y - 1.25, pk.len, 2.5)
        })
        packets = packets.filter((pk) => pk.x < W + 60)
        if (t - lastSpawn > 480 && packets.length < pipes.length * 3) {
          spawnPacket(false)
          lastSpawn = t
        }

        maybeFail(t)

        if (reticle.state === 'hunt' && reticle.target) {
          const tg = reticle.target
          reticle.tx = tg.x + tg.len / 2
          reticle.ty = tg.pipe.y
          const dx = reticle.tx - reticle.x
          const dy = reticle.ty - reticle.y
          reticle.x += dx * 0.09
          reticle.y += dy * 0.09
          if (Math.abs(dx) < 6 && Math.abs(dy) < 6) {
            reticle.state = 'lock'
            reticle.lockT = t
          }
          if (tg.x > W + 40) {
            reticle.state = 'idle'
            reticle.target = null
          }
        } else if (reticle.state === 'lock' && reticle.target) {
          const tg2 = reticle.target
          reticle.x = tg2.x + tg2.len / 2
          reticle.y = tg2.pipe.y
          if (t - reticle.lockT > 650) {
            tg2.state = 'caught'
            caughtCount++
            if (caughtEl) caughtEl.textContent = String(caughtCount).padStart(2, '0')
            reticle.state = 'flash'
            reticle.lockT = t
          }
        } else if (reticle.state === 'flash') {
          if (t - reticle.lockT > 500) {
            reticle.state = 'idle'
            reticle.target = null
          }
        } else {
          reticle.tx = W * 0.7 + Math.sin(t / 2400) * W * 0.13
          reticle.ty = H * 0.5 + Math.cos(t / 3100) * H * 0.2
          reticle.x += (reticle.tx - reticle.x) * 0.02
          reticle.y += (reticle.ty - reticle.y) * 0.02
        }

        const rr = reticle.r + (reticle.state === 'lock' ? Math.sin(t / 60) * 2 : 0)
        const col =
          reticle.state === 'flash'
            ? '#C8FF3D'
            : reticle.state === 'lock'
              ? '#FF5C3F'
              : 'rgba(200,255,61,0.85)'
        if (reticle.state === 'flash') {
          const fp = (t - reticle.lockT) / 500
          ctx.strokeStyle = 'rgba(200,255,61,' + 0.7 * (1 - fp) + ')'
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.arc(reticle.x, reticle.y, rr + fp * 46, 0, Math.PI * 2)
          ctx.stroke()
        }
        ctx.strokeStyle = col
        ctx.lineWidth = 1.5
        ctx.shadowColor = col
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(reticle.x, reticle.y, rr, 0, Math.PI * 2)
        ctx.stroke()
        ;(
          [
            [0, -1],
            [0, 1],
            [-1, 0],
            [1, 0],
          ] as const
        ).forEach((d) => {
          ctx.beginPath()
          ctx.moveTo(reticle.x + d[0] * (rr + 3), reticle.y + d[1] * (rr + 3))
          ctx.lineTo(reticle.x + d[0] * (rr + 11), reticle.y + d[1] * (rr + 11))
          ctx.stroke()
        })
        ctx.beginPath()
        ctx.arc(reticle.x, reticle.y, 2.2, 0, Math.PI * 2)
        ctx.fillStyle = col
        ctx.fill()
        ctx.shadowBlur = 0

        rafId = requestAnimationFrame(frame)
      }

      sizeCanvas()
      window.addEventListener('resize', sizeCanvas)
      rafId = requestAnimationFrame(frame)
      cleanups.push(() => {
        running = false
        cancelAnimationFrame(rafId)
        if (alarmT) clearTimeout(alarmT)
        window.removeEventListener('resize', sizeCanvas)
      })
    }

    /* ================= marquee duplication ================= */
    const mq = document.getElementById('mq-track')
    if (mq && mq.children.length === 1) {
      const run = mq.querySelector('.mq-run')
      if (run) mq.appendChild(run.cloneNode(true))
    }

    /* ================= NIGHT — scroll clock ================= */
    const night = document.getElementById('night')
    const clockEl = document.getElementById('night-clock')
    const beats = document.querySelectorAll('.beat')
    const dots = document.querySelectorAll('.night-progress i')
    const kf: Array<[number, number]> = [
      [0.0, 11647],
      [0.22, 11647],
      [0.32, 11692],
      [0.47, 11692],
      [0.55, 11701],
      [0.72, 11701],
      [0.92, 12160],
      [1.0, 12160],
    ]
    const pad = (n: number) => (n < 10 ? '0' + n : '' + n)
    const fmt = (s: number) => {
      const h = Math.floor(s / 3600)
      const m = Math.floor((s % 3600) / 60)
      const sec = Math.floor(s % 60)
      return pad(h) + ':' + pad(m) + ':' + pad(sec)
    }
    const lerpTime = (p: number) => {
      for (let i = 0; i < kf.length - 1; i++) {
        if (p >= kf[i][0] && p <= kf[i + 1][0]) {
          const f = (p - kf[i][0]) / (kf[i + 1][0] - kf[i][0] || 1)
          return kf[i][1] + (kf[i + 1][1] - kf[i][1]) * f
        }
      }
      return kf[kf.length - 1][1]
    }
    if (night && clockEl && !reduced) {
      const nightTick = () => {
        const rect = night.getBoundingClientRect()
        const total = rect.height - window.innerHeight
        const p = Math.min(1, Math.max(0, -rect.top / (total || 1)))
        clockEl.textContent = fmt(lerpTime(p))
        const phase = Math.min(3, Math.floor(p * 4))
        night.setAttribute('data-phase', String(phase))
        beats.forEach((b, i) => b.classList.toggle('on', i === phase))
        dots.forEach((d, i) => d.classList.toggle('on', i <= phase))
      }
      window.addEventListener('scroll', nightTick, { passive: true })
      nightTick()
      cleanups.push(() => window.removeEventListener('scroll', nightTick))
    } else if (night && clockEl) {
      clockEl.textContent = '03:14:52'
      night.setAttribute('data-phase', '1')
      beats.forEach((b) => b.classList.add('on'))
    }

    /* ================= slack typewriter ================= */
    const errEl = document.getElementById('slack-error')
    if (errEl) {
      const full = errEl.getAttribute('data-text') || errEl.textContent || ''
      if (!reduced && 'IntersectionObserver' in window) {
        errEl.textContent = ''
        let done = false
        let iv: ReturnType<typeof setInterval> | null = null
        const tio = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting && !done) {
                done = true
                tio.unobserve(errEl)
                errEl.classList.add('typing')
                let i = 0
                iv = setInterval(() => {
                  i++
                  errEl.textContent = full.slice(0, i)
                  if (i >= full.length) {
                    if (iv) clearInterval(iv)
                    setTimeout(() => errEl.classList.remove('typing'), 1600)
                  }
                }, 26)
              }
            })
          },
          { threshold: 0.6 }
        )
        tio.observe(errEl)
        cleanups.push(() => {
          tio.disconnect()
          if (iv) clearInterval(iv)
        })
      } else {
        errEl.textContent = full
      }
    }

    /* ================= text decode (eyebrows & kickers) ================= */
    if (!reduced && 'IntersectionObserver' in window) {
      const CHARS = '!<>-_\\/[]{}=+*^?#________'
      document
        .querySelectorAll<HTMLElement>('.eyebrow, .night-kicker, .cta-kicker')
        .forEach((el) => {
          const finalText = el.textContent || ''
          let iv: ReturnType<typeof setInterval> | null = null
          const dio = new IntersectionObserver(
            (entries) => {
              entries.forEach((en) => {
                if (!en.isIntersecting) return
                dio.unobserve(el)
                let frameN = 0
                const totalFrames = 24
                iv = setInterval(() => {
                  frameN++
                  const prog = frameN / totalFrames
                  let out = ''
                  for (let i = 0; i < finalText.length; i++) {
                    if (i < finalText.length * prog) out += finalText[i]
                    else if (finalText[i] === ' ') out += ' '
                    else out += CHARS[Math.floor(Math.random() * CHARS.length)]
                  }
                  el.textContent = out
                  if (frameN >= totalFrames) {
                    if (iv) clearInterval(iv)
                    el.textContent = finalText
                  }
                }, 34)
              })
            },
            { threshold: 0.6 }
          )
          dio.observe(el)
          cleanups.push(() => {
            dio.disconnect()
            if (iv) clearInterval(iv)
          })
        })
    }

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return null
}
