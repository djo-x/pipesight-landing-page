export default function Stats() {
  return (
    <section className="stats" id="stats" aria-label="At a glance">
      <div className="wrap">
        <div className="stats-grid three">
          <div className="stat-cell" data-reveal>
            <span className="num lime">
              &lt;60<span className="stat-unit">s</span>
            </span>
            <span className="lbl">Failure detection</span>
          </div>
          <div className="stat-cell d-06" data-reveal>
            <span className="num">24/7</span>
            <span className="lbl">Continuous polling</span>
          </div>
          <div className="stat-cell d-12" data-reveal>
            <span className="num">0</span>
            <span className="lbl">Agents to install</span>
          </div>
        </div>
      </div>
    </section>
  )
}
