export default function ProblemSolution() {
  return (
    <section className="how pad" id="alert">
      <span className="sec-index">02 — SIGNAL VS NOISE</span>
      <div className="wrap">
        <div className="center-head" data-reveal>
          <span className="eyebrow center">The payoff</span>
          <h2>Noise isn&apos;t monitoring.</h2>
          <p className="lead">Stop treating your engineers like a human grep command.</p>
        </div>

        <div className="nt-grid">
          <div className="nt-card" data-reveal>
            <span className="nt-tag">LEGACY_SYSTEM</span>
            <h3>The noise</h3>
            <div className="noise-list">
              <div className="noise-row">⚠ ALERT: Job 404 timed out (retry 1)</div>
              <div className="noise-row">⚠ ALERT: Job 404 timed out (retry 2)</div>
              <div className="noise-row">⚠ ALERT: Memory pressure high node-02</div>
              <div className="noise-row">⚠ ALERT: Job 404 timed out (retry 3)</div>
            </div>
            <p className="nt-foot">
              Standard tools fire on every retry, creating a storm of useless notifications that get
              ignored.
            </p>
          </div>

          <div className="nt-card truth d-08" data-reveal>
            <span className="nt-tag lime">PIPESIGHT_ENABLED</span>
            <h3>The truth</h3>
            <div className="truth-block">
              <span className="ico">✓</span>
              <div>
                <span className="ttl">INCIDENT #4928 DETECTED</span>
                <p>
                  Databricks job <code>daily_ingest_v2</code> failed after 3 retries due to a schema
                  mismatch on column <code>&apos;user_id&apos;</code>.
                </p>
                <div className="meta">
                  <span>SLACK_SENT</span>
                  <span>EMAIL_SENT</span>
                </div>
              </div>
            </div>
            <p className="nt-foot">
              One clean, context-rich alert. We filter out the retries and the noise, leaving you
              with actionable intelligence.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
