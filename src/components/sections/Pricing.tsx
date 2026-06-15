export default function Pricing() {
  return (
    <section className="pricing pad" id="pricing">
      <span className="sec-index">03 — PRICING</span>
      <div className="wrap">
        <div className="center-head" data-reveal>
          <span className="eyebrow center">Pricing</span>
          <h2>Free is the whole product. Pro lifts the limits.</h2>
          <p className="lead">
            No trial clock, no locked screens. Free gives you the full triage UI forever — the only
            ceilings are 5 jobs and 5-minute polling. Pro removes them.
          </p>
        </div>

        <div className="price-grid">
          <div className="pcard" data-reveal>
            <span className="pbadge">Free</span>
            <div className="price">
              €0 <span>/ month</span>
            </div>
            <div className="price-sub">free forever · no time limit</div>
            <ul className="features">
              <li>
                <span className="check">✓</span>1 Databricks workspace
              </li>
              <li>
                <span className="check">✓</span>Up to <b>5 monitored jobs</b>
              </li>
              <li>
                <span className="check">✓</span>Slack + email alerts
              </li>
              <li>
                <span className="check">✓</span>Full triage UI — dashboard, issues, comments,
                resolve
              </li>
              <li>
                <span className="check">✓</span>
                <b>5-minute</b> polling
              </li>
            </ul>
            <a href="#join" className="btn btn-ghost">
              Join waitlist
            </a>
          </div>

          <div className="pcard featured d-08" data-reveal>
            <span className="pbadge lime">Pro</span>
            <div className="price lime">
              €59 <span>/ month</span>
            </div>
            <div className="price-sub">per workspace</div>
            <ul className="features">
              <li>
                <span className="check">✓</span>
                <b>Unlimited</b> jobs monitored
              </li>
              <li>
                <span className="check">✓</span>Faster polling — <b>1 or 2 min</b>
              </li>
              <li>
                <span className="check">✓</span>Everything in Free&apos;s triage UI, no walls
              </li>
              <li>
                <span className="check">✓</span>Slack + email alerts, deduplicated
              </li>
              <li>
                <span className="check">✓</span>Self-serve billing — cancel anytime
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
  )
}
