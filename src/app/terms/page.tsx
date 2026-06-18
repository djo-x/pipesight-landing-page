import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service — Pipesight',
  description: 'Terms governing use of the Pipesight Databricks monitoring service.',
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <section className="legal-page">
        <div className="wrap">
          <div className="legal-col">
            <div className="legal-head">
              <span className="eyebrow">Legal</span>
              <h2>Terms of Service</h2>
              <p className="lead">Plain language. Last updated June 15, 2026.</p>
            </div>

            <div className="legal-sections">
              <div>
                <h3>What Pipesight is</h3>
                <p>
                  Pipesight is a SaaS product that monitors Databricks job runs and sends failure
                  alerts to Slack. It is currently in private beta. By using Pipesight, you agree to
                  these terms.
                </p>
              </div>

              <div>
                <h3>Your account and token</h3>
                <p>
                  You are responsible for providing a valid Databricks Personal Access Token and for
                  the permissions that token carries. You are responsible for keeping your token
                  secure. If a token is compromised, revoke it immediately in your Databricks
                  workspace and update it in Pipesight.
                </p>
                <p>
                  We recommend creating a dedicated service-principal token scoped to the minimum
                  permissions needed to read job-run status — not your personal admin token.
                </p>
              </div>

              <div>
                <h3>What Pipesight does with your token</h3>
                <p>
                  Pipesight uses your token solely to call Databricks Jobs API read endpoints that
                  return job-run status and results. We do not use your token for any other purpose,
                  and we do not share it with third parties.
                </p>
              </div>

              <div>
                <h3>Acceptable use</h3>
                <p>
                  Do not use Pipesight to violate applicable laws, circumvent access controls, or
                  abuse Databricks API rate limits in a way that affects other customers. Do not
                  attempt to reverse-engineer, scrape, or attack the Pipesight service or
                  infrastructure.
                </p>
              </div>

              <div>
                <h3>Intellectual property</h3>
                <p>
                  Pipesight owns all rights to the Pipesight software, branding, and documentation.
                  You retain all rights to your Databricks workspaces, job configurations, and data.
                  We claim no ownership over your data.
                </p>
              </div>

              <div>
                <h3>Beta disclaimer</h3>
                <p>
                  Pipesight is currently in private beta. We do not guarantee uptime, data
                  persistence, or feature availability. Features may change without notice. Until we
                  exit beta and publish a service-level agreement, use Pipesight as a best-effort
                  monitoring layer and not as your sole incident detection mechanism for
                  production-critical pipelines.
                </p>
              </div>

              <div>
                <h3>Limitation of liability</h3>
                <p>
                  To the maximum extent permitted by law, Pipesight&apos;s total liability for any
                  claim arising from these terms or the service is limited to the amount you paid in
                  the 12 months preceding the claim. Pipesight is not liable for indirect,
                  incidental, or consequential damages, including missed alerts or downstream data
                  issues.
                </p>
              </div>

              <div>
                <h3>Changes to these terms</h3>
                <p>
                  We may update these terms as the product matures. We will notify you by email
                  before material changes take effect, giving you a reasonable opportunity to review
                  and, if necessary, stop using the service.
                </p>
              </div>

              <div>
                <h3>Contact</h3>
                <p>
                  For questions about these terms, email{' '}
                  <a href="mailto:support@pipesight.co">support@pipesight.co</a>.
                </p>
              </div>

              <div className="legal-foot">
                <p>
                  Questions? <a href="mailto:support@pipesight.co">support@pipesight.co</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
