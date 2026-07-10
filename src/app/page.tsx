import Link from 'next/link'
import WaitlistForm from '@/components/ui/WaitlistForm'
import V8Engine from '@/components/V8Engine'

const BrandMark = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <line x1="1" y1="16" x2="31" y2="16" stroke="#E9EFE4" strokeWidth="2.2" strokeLinecap="round" />
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
)

export default function Home() {
  return (
    <>
      <div className="scanlines" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      {/* HUD frame */}
      <div className="hud" aria-hidden="true">
        <span className="corner tl" />
        <span className="corner tr" />
        <span className="corner bl" />
        <span className="corner br" />
        <span className="readout">
          <span className="live-dot" />
          NIGHT OPS&nbsp;·&nbsp;<b>pipesight</b>&nbsp;·&nbsp;polling every run
        </span>
      </div>

      {/* ============ NAV ============ */}
      <nav className="main" data-screen-label="nav">
        <div className="wrap nav-inner">
          <a href="#top" className="brand" aria-label="Pipesight home">
            <BrandMark />
            <span className="wordmark">PIPESIGHT</span>
          </a>
          <div className="nav-right">
            <a href="#night" className="nav-link hide-sm">
              The night
            </a>
            <a href="#how" className="nav-link hide-sm">
              How it works
            </a>
            <a href="#alert" className="nav-link hide-sm">
              The alert
            </a>
            <a href="#pricing" className="nav-link hide-sm">
              Pricing
            </a>
            <a href="#join" className="btn btn-ghost btn-sm">
              Join waitlist
            </a>
          </div>
        </div>
      </nav>

      <span id="top" />

      {/* ============ HERO ============ */}
      <header className="hero" data-screen-label="hero">
        <canvas id="pipes-canvas" aria-hidden="true" />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="alarm-edge" aria-hidden="true" />

        <div className="wrap">
          <span className="pill" data-reveal>
            <span className="dot" />
            Private beta · first 50 teams get 3 months Pro free
          </span>
          <h1 data-reveal>
            Your pipelines fail in <span className="w-silence">silence.</span>
            <br />
            We make them <span className="w-loud">loud.</span>
          </h1>
          <p className="sub" data-reveal>
            One read-only token. Pipesight polls every Databricks run around the clock — the second
            a job fails, a <b>clean, deduplicated Slack alert</b> lands with the job, the error, and
            a link to the run.
          </p>

          <WaitlistForm variant="lime" />
          <p className="field-hint" data-reveal>
            <b>Work email.</b> No credit card · read-only token · cancel anytime
          </p>
        </div>

        <div className="catch-counter" aria-hidden="true">
          <b id="caught-n">00</b>
          failures caught
          <br />
          while you read this
        </div>

        <span className="scroll-cue" aria-hidden="true">
          03:14 AM
        </span>
      </header>

      {/* ============ GIANT MARQUEE ============ */}
      <div className="marquee" aria-hidden="true">
        <div className="mq-track" id="mq-track">
          <div className="mq-run">
            <span>Catch</span>
            <i>✗</i>
            <span className="solid">Alert</span>
            <i>✗</i>
            <span>Triage</span>
            <i>✗</i>
            <span>Resolve</span>
            <i>✗</i>
          </div>
        </div>
      </div>

      {/* ============ THE NIGHT — scroll-driven incident ============ */}
      <section className="night" id="night" data-phase="0" data-screen-label="the-night">
        <div className="night-sticky">
          <div className="night-tint" aria-hidden="true" />
          <span className="night-kicker">One night · one failure · replayed as you scroll</span>
          <div className="clock" id="night-clock">
            03:14:07
          </div>
          <div className="beats">
            <div className="beat on">
              <span className="tag coral">Failure</span>
              <h3>A job goes red. Nobody&apos;s awake.</h3>
              <p>
                <b>fct_orders_daily</b> throws an AnalysisException and dies. No dashboard blinks.
                No email gets past your filters. Silence.
              </p>
            </div>
            <div className="beat">
              <span className="tag lime">Caught</span>
              <h3>Pipesight&apos;s poll finds it — 45 seconds later.</h3>
              <p>
                The failed run is detected, the real error is pulled from Databricks, and it&apos;s{' '}
                <b>deduplicated</b> against open issues. One failure, one signal.
              </p>
            </div>
            <div className="beat">
              <span className="tag lime">Alerted</span>
              <h3>The Slack alert lands.</h3>
              <p>
                Job, error, timestamp, link to the run. Whoever&apos;s on call taps once and is{' '}
                <b>looking at the failed run</b> — not digging through the jobs UI.
              </p>
            </div>
            <div className="beat">
              <span className="tag lime">Resolved</span>
              <h3>Fixed before the nightly window closes.</h3>
              <p>
                Re-run succeeds at 03:22. The morning dashboards load on time.{' '}
                <b>Nobody ever knows</b> — which is exactly the point.
              </p>
            </div>
          </div>
          <div className="night-progress" aria-hidden="true">
            <i className="on" />
            <i />
            <i />
            <i />
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="sec" id="how" data-screen-label="how-it-works">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <span className="eyebrow">How it works</span>
            <h2>
              One token. <span className="lime">Two minutes.</span>
              <br />
              Zero agents.
            </h2>
            <p className="lead">
              No SDKs, no sidecars, no infra changes. Pipesight sits outside your stack and watches
              it — if you can create a token, you can be monitored before your coffee cools.
            </p>
          </div>

          <div className="steps">
            <div className="step" data-reveal>
              <span className="s-num">01</span>
              <h3>Paste a read-only token</h3>
              <p>
                Create a Databricks token with read scope and paste it once.{' '}
                <b>That&apos;s the entire install.</b> Nothing runs inside your workspace.
              </p>
              <div className="s-visual token-visual" aria-hidden="true">
                <span className="tv-label">databricks token</span>
                <div className="tv-row">
                  <span className="tv-value">dapi-••••••••••••3f9a</span>
                  <span className="tv-badge">read-only</span>
                </div>
              </div>
            </div>

            <div className="step" data-reveal style={{ transitionDelay: '.08s' }}>
              <span className="s-num">02</span>
              <h3>Jobs auto-discovered</h3>
              <p>
                Every job in the workspace appears on its own. <b>Toggle the ones that matter</b> —
                no wiring alerts by hand, no YAML.
              </p>
              <div className="s-visual jobs-visual" aria-hidden="true">
                <div className="jv-row">
                  <span>fct_orders_daily</span>
                  <span className="sw on" />
                </div>
                <div className="jv-row">
                  <span>dim_customer_scd2</span>
                  <span className="sw on" />
                </div>
                <div className="jv-row">
                  <span>stg_payments_hourly</span>
                  <span className="sw" />
                </div>
              </div>
            </div>

            <div className="step" data-reveal style={{ transitionDelay: '.16s' }}>
              <span className="s-num">03</span>
              <h3>Alerts find you</h3>
              <p>
                Pipesight polls every run around the clock. A failure becomes{' '}
                <b>one deduplicated Slack alert</b> — job, error, link to the run.
              </p>
              <div className="s-visual alert-visual" aria-hidden="true">
                <span className="av-x">✗</span>
                <span>
                  <b>fct_orders_daily</b> failed
                </span>
                <span className="av-t">alert +47s</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ THE ALERT ============ */}
      <section className="sec alert-sec" id="alert" data-screen-label="the-alert">
        <div className="wrap alert-grid">
          <div>
            <div className="sec-head" style={{ marginBottom: 40 }} data-reveal>
              <span className="eyebrow">The payoff</span>
              <h2>
                This is what lands in <span className="lime">Slack.</span>
              </h2>
              <p className="lead">
                Nothing more, nothing less — everything you need to triage, the second a job goes
                red.
              </p>
            </div>
            <div className="alert-points" data-reveal>
              <div className="apoint">
                <span className="a-num">01</span>
                <div>
                  <h3>Deduplicated</h3>
                  <p>
                    One failure, one message. Retries and repeat runs fold into the same issue —{' '}
                    <b>never forty pings.</b>
                  </p>
                </div>
              </div>
              <div className="apoint">
                <span className="a-num">02</span>
                <div>
                  <h3>The actual error</h3>
                  <p>
                    The real exception, pulled from the run — not &quot;something went wrong.&quot;
                  </p>
                </div>
              </div>
              <div className="apoint">
                <span className="a-num">03</span>
                <div>
                  <h3>One click to the run</h3>
                  <p>
                    Straight to the failed run in Databricks. <b>Triage starts in seconds.</b>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="slack-tilt" data-reveal>
            <div className="slack">
              <div className="slack-head">
                <span className="live" />
                Pipeline Failure <span className="app">· Pipesight</span>
                <span className="slack-time">03:15</span>
              </div>
              <hr className="slack-rule" />
              <div className="slack-rows">
                <span className="k">Job:</span>
                <span className="v">fct_orders_daily</span>
                <span className="k">Status:</span>
                <span className="v fail">FAILED</span>
                <span className="k">Workspace:</span>
                <span className="v">acme · production</span>
                <span className="k">Error:</span>
                <span
                  className="v err"
                  id="slack-error"
                  data-text="AnalysisException: Column 'order_total' not found"
                >
                  AnalysisException: Column &apos;order_total&apos; not found
                </span>
              </div>
              <a href="#" className="slack-btn">
                View Failed Run →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section className="sec" id="pricing" data-screen-label="pricing">
        <div className="wrap">
          <div
            className="sec-head"
            style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}
            data-reveal
          >
            <span className="eyebrow" style={{ justifyContent: 'center' }}>
              Pricing
            </span>
            <h2>
              Free is the whole product.
              <br />
              <span className="lime">Pro lifts the limits.</span>
            </h2>
            <p className="lead">
              No trial clock, no locked screens. Free gives you the full triage UI forever — the
              only ceilings are 5 jobs and 5-minute polling.
            </p>
          </div>

          <div className="price-grid">
            <div className="pcard" data-reveal>
              <span className="pbadge">Free</span>
              <div className="price">
                €0 <span>/ month</span>
              </div>
              <div className="price-sub">free forever · no time limit</div>
              <ul>
                <li>
                  <span className="check">✓</span>
                  <span>1 Databricks workspace</span>
                </li>
                <li>
                  <span className="check">✓</span>
                  <span>
                    Up to <b>5 monitored jobs</b>
                  </span>
                </li>
                <li>
                  <span className="check">✓</span>
                  <span>Slack + email alerts</span>
                </li>
                <li>
                  <span className="check">✓</span>
                  <span>Full triage UI — dashboard, issues, comments, resolve</span>
                </li>
                <li>
                  <span className="check">✓</span>
                  <span>
                    <b>5-minute</b> polling
                  </span>
                </li>
              </ul>
              <a href="#join" className="btn btn-ghost">
                Join waitlist
              </a>
            </div>

            <div className="pcard featured" data-reveal style={{ transitionDelay: '.08s' }}>
              <span className="pbadge">Pro</span>
              <div className="price">
                €59 <span>/ month</span>
              </div>
              <div className="price-sub">per workspace</div>
              <ul>
                <li>
                  <span className="check">✓</span>
                  <span>
                    <b>Unlimited</b> jobs monitored
                  </span>
                </li>
                <li>
                  <span className="check">✓</span>
                  <span>
                    Faster polling — <b>1 or 2 min</b>
                  </span>
                </li>
                <li>
                  <span className="check">✓</span>
                  <span>Everything in Free&apos;s triage UI, no walls</span>
                </li>
                <li>
                  <span className="check">✓</span>
                  <span>Slack + email alerts, deduplicated</span>
                </li>
                <li>
                  <span className="check">✓</span>
                  <span>Self-serve billing — cancel anytime</span>
                </li>
              </ul>
              <a href="#join" className="btn btn-lime">
                Join waitlist
              </a>
            </div>
          </div>

          <p className="price-foot" data-reveal>
            <b>First 50 teams</b> on the waitlist get 3 months of Pro free.
          </p>
        </div>
      </section>

      {/* ============ FINAL CTA — LIME FLOOD ============ */}
      <section className="cta-flood" id="join" data-screen-label="final-cta">
        <div className="wrap cta-inner">
          <span className="cta-kicker" data-reveal>
            Private beta · limited seats
          </span>
          <h2 data-reveal>
            Make it <span className="out">loud.</span>
          </h2>
          <p className="sub" data-reveal>
            Stop finding out your pipelines failed three days too late.{' '}
            <b>First 50 teams get 3 months of Pro free.</b>
          </p>

          <WaitlistForm variant="ink" />
          <p className="form-note" data-reveal>
            No credit card · read-only token · cancel anytime
          </p>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer data-screen-label="footer">
        <div className="wrap foot-inner">
          <a href="#top" className="brand">
            <svg
              width="22"
              height="22"
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
              <circle cx="16" cy="16" r="2.1" fill="#C8FF3D" />
            </svg>
            <span className="wordmark">PIPESIGHT</span>
          </a>
          <span className="mid">Built for data engineers who&apos;ve had enough.</span>
          <span className="foot-links">
            <span>© 2026</span>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </span>
        </div>
      </footer>

      <V8Engine />
    </>
  )
}
