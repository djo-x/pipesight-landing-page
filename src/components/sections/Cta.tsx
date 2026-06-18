import WaitlistForm from '@/components/ui/WaitlistForm'

export default function Cta() {
  return (
    <section className="cta pad" id="join">
      <div className="glow" aria-hidden="true" />
      <div className="wrap">
        <div className="join-grid">
          <div className="join-copy">
            <span className="eyebrow" data-reveal>
              Secure registration
            </span>
            <h2 data-reveal>Build for the truth.</h2>
            <p className="sub" data-reveal>
              Join the waiting list for early access to the observability cockpit designed
              specifically for modern data infrastructure. First 50 teams get 3 months of Pro free.
            </p>
          </div>

          <div className="join-card" data-reveal>
            <span className="mono-lbl">SECURE_REGISTRATION</span>
            <WaitlistForm />
          </div>
        </div>
      </div>
    </section>
  )
}
