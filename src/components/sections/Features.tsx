export default function Features() {
  return (
    <section className="how pad" id="features">
      <span className="sec-index">01 — WHAT IT DOES</span>
      <div className="wrap">
        <div className="center-head" data-reveal>
          <span className="eyebrow center">What Pipesight does</span>
          <h2>Everything you need to never miss a failure. Nothing you don&apos;t.</h2>
          <p className="lead">
            Paste a Databricks token and Pipesight watches every job around the clock — reading only
            job-run status, so a 3am failure reaches you in seconds, not hours.
          </p>
        </div>

        <div className="feat-grid">
          <div className="fcard" data-reveal>
            <span className="fc-kicker">
              <span className="sq" />
              Catch
            </span>
            <h3>Sub-60-second detection</h3>
            <p>
              Pipesight polls every job run <b>24/7</b> and catches a failure the moment it happens
              — including the silent ones your inbox rules quietly buried.
            </p>
          </div>
          <div className="fcard d-08" data-reveal>
            <span className="fc-kicker">
              <span className="sq" />
              Alert
            </span>
            <h3>Clean Slack alerts</h3>
            <p>
              A structured message lands instantly: <b>job, error type, timestamp</b> and a direct
              link to the failed run. No noise, no forty duplicate pings.
            </p>
          </div>
          <div className="fcard d-16" data-reveal>
            <span className="fc-kicker">
              <span className="sq" />
              Connect
            </span>
            <h3>Two-minute setup</h3>
            <p>
              Paste one <b>Databricks token</b> — zero agents, zero infra. Every job is
              auto-discovered, so you pick what to monitor instead of wiring alerts by hand.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
