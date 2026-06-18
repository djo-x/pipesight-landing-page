export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-radial" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="pill" data-reveal>
            <span className="dot" />
            System status: nominal
          </span>
          <h1 data-reveal>
            Your Databricks jobs are <span className="coral-word">failing.</span>
            <span className="hl-line">
              You just don&apos;t know it <em>yet.</em>
            </span>
          </h1>
          <p className="sub" data-reveal>
            Monitoring Databricks is a black box. Pipesight catches every failure the moment it
            happens and sends one clean alert to Slack and email. No noise. Just truth.
          </p>
          <div className="btn-row" data-reveal>
            <a href="#join" className="btn btn-lime">
              Get early access →
            </a>
            <a href="#features" className="btn btn-ghost">
              See how it works
            </a>
          </div>
        </div>

        <div className="tput" data-reveal aria-hidden="true">
          <div className="tput-card">
            <div className="tput-head">
              <span className="mono-lbl">Global throughput</span>
              <span className="mono-lbl" style={{ color: 'var(--lime)' }}>
                ◈
              </span>
            </div>
            <div className="tput-bar-lbl">
              <span className="mono-lbl">Jobs tracked</span>
              <span className="mono-lbl v">2,492,041</span>
            </div>
            <div className="tput-track">
              <i />
            </div>
            <div className="tput-cells">
              <div className="tput-cell">
                <div className="k">MTTR</div>
                <div className="m">1.2s</div>
              </div>
              <div className="tput-cell">
                <div className="k">Accuracy</div>
                <div className="m">99.9%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
