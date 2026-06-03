export default function Pricing() {
  return (
    <section className="pricing pad" id="pricing">
      <div className="wrap">
        <div className="center-head reveal">
          <span className="eyebrow center">Pricing</span>
          <h2>Simple pricing. No enterprise gatekeeping.</h2>
        </div>

        <div className="price-grid">
          <div className="pcard reveal">
            <span className="pbadge">Free</span>
            <div className="price">
              €0 <span>/ month</span>
            </div>
            <ul className="features">
              <li>
                <span className="check">✓</span>1 Databricks workspace
              </li>
              <li>
                <span className="check">✓</span>Up to 5 jobs monitored
              </li>
              <li>
                <span className="check">✓</span>Slack alerts
              </li>
              <li>
                <span className="check">✓</span>Basic dashboard
              </li>
            </ul>
            <a href="#waitlist-bottom" className="btn btn-ghost">
              Join waitlist
            </a>
          </div>

          <div className="pcard featured reveal" style={{ transitionDelay: '.08s' }}>
            <span className="pbadge lime">Pro</span>
            <div className="price lime">
              €59 <span>/ month</span>
            </div>
            <div className="price-sub">per workspace</div>
            <ul className="features">
              <li>
                <span className="check">✓</span>1 Databricks workspace
              </li>
              <li>
                <span className="check">✓</span>Unlimited jobs monitored
              </li>
              <li>
                <span className="check">✓</span>Slack + email alerts
              </li>
              <li>
                <span className="check">✓</span>Full dashboard
              </li>
              <li>
                <span className="check">✓</span>Priority support
              </li>
            </ul>
            <a href="#waitlist-bottom" className="btn btn-lime">
              Join waitlist
            </a>
          </div>
        </div>

        <p className="price-foot reveal">
          First 50 teams on the waitlist get 3 months of Pro free.
        </p>
      </div>
    </section>
  )
}
