export default function ProblemSolution() {
  return (
    <section className="pad">
      <div className="wrap">
        <div className="ps-grid">
          <div className="ps-col problem reveal">
            <div className="ps-col-head">
              <span className="eyebrow coral">Today&apos;s broken setup</span>
              <div className="title">The slow path to disaster</div>
            </div>
            <div className="flow">
              <div className="step">Job fails</div>
              <div className="arrow-down">↓</div>
              <div className="step">Email sent</div>
              <div className="arrow-down">↓</div>
              <div className="step">Forwarded to Slack</div>
              <div className="arrow-down">↓</div>
              <div className="step">Buried in noise</div>
              <div className="arrow-down">↓</div>
              <div className="step">Nobody notices</div>
              <div className="arrow-down bad">↓</div>
              <div className="step bad">Pipeline down 3 days</div>
              <div className="arrow-down bad">↓</div>
              <div className="step bad">Data late. Stakeholders angry.</div>
            </div>
          </div>

          <div className="ps-mid reveal">→</div>

          <div className="ps-col solution reveal">
            <div className="ps-col-head">
              <span className="eyebrow">With Pipesight</span>
              <div className="title">The fast path to a fix</div>
            </div>
            <div className="flow">
              <div className="step">Job fails</div>
              <div className="arrow-down">↓</div>
              <div className="step">Pipesight detects instantly</div>
              <div className="arrow-down">↓</div>
              <div className="step">Clean Slack alert fired</div>
              <div className="arrow-down">↓</div>
              <div className="step good">Engineer acts immediately</div>
              <div className="arrow-down">↓</div>
              <div className="step good">No damage done.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
