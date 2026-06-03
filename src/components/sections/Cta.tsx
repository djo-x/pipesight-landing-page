import WaitlistForm from '@/components/ui/WaitlistForm'

export default function Cta() {
  return (
    <section className="cta pad">
      <div className="glow" aria-hidden="true" />
      <div className="wrap">
        <span className="pill reveal">
          <span className="dot" />
          Private beta · limited seats
        </span>
        <h2 className="reveal">
          Stop finding out your pipelines failed{' '}
          <span className="coral-word">3 days too late.</span>
        </h2>
        <p className="sub reveal">Join the waitlist. First 50 teams get 3 months of Pro free.</p>
        <div className="reveal">
          <WaitlistForm />
        </div>
      </div>
      <span id="waitlist-bottom" />
    </section>
  )
}
