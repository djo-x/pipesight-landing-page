import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — Pipesight',
  description: 'What data Pipesight collects, how it is stored, and how to contact us.',
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <section className="legal-page">
        <div className="wrap">
          <div className="legal-col">
            <div className="legal-head">
              <span className="eyebrow">Legal</span>
              <h2>Privacy Policy</h2>
              <p className="lead">Plain language. Last updated June 15, 2026.</p>
            </div>

            <div className="legal-sections">
              <div>
                <h3>The short version</h3>
                <p>
                  Pipesight collects your email address, your Databricks Personal Access Token, and
                  job-run metadata from your workspace. Your token is stored encrypted and is used
                  exclusively to read job-run status — Pipesight never touches your pipeline data,
                  table contents, notebook code, or anything your jobs process. Nothing is sold to
                  third parties.
                </p>
              </div>

              <div>
                <h3>What we collect</h3>
                <p>
                  <strong>Account email.</strong> When you join the waitlist or create an account,
                  we collect your email address. We use it to send waitlist confirmation, onboarding
                  instructions, and service updates.
                </p>
                <p>
                  <strong>Databricks Personal Access Token.</strong> To monitor your jobs, you
                  provide a Databricks PAT. It is stored encrypted at rest using AES-256 and
                  transmitted only over TLS. It is used for one purpose: calling the Databricks Jobs
                  API to read job-run status.
                </p>
                <p>
                  <strong>Job-run metadata.</strong> Pipesight reads and stores job names, run IDs,
                  timestamps, run status (SUCCESS / FAILED / etc.), and error messages from failed
                  runs. This is what powers the Slack alerts.
                </p>
              </div>

              <div>
                <h3>What Pipesight does NOT access</h3>
                <p>We call only Databricks Jobs API read endpoints. We do not access:</p>
                <ul>
                  <li>Delta tables, databases, or warehouse query results</li>
                  <li>Notebook or pipeline source code</li>
                  <li>Cluster logs beyond what is attached to a job-run result</li>
                  <li>Any data that your jobs read or write</li>
                  <li>Databricks secrets or other credentials</li>
                </ul>
                <p>
                  If you are concerned about token scope, we recommend creating a service-principal
                  token with the minimum permissions needed to call the Jobs API read endpoints.
                </p>
              </div>

              <div>
                <h3>Third-party services</h3>
                <p>
                  Pipesight uses Vercel for hosting and Resend for transactional email delivery.
                  These providers may process your email address as part of their infrastructure. We
                  do not share your token or job-run metadata with any third party. We do not sell
                  your data.
                </p>
              </div>

              <div>
                <h3>Data retention</h3>
                <p>
                  Job-run metadata is retained for 90 days by default. Databricks tokens are deleted
                  within 30 days of account termination. Email addresses are removed within 30 days
                  of a deletion request. You can request earlier deletion at any time.
                </p>
              </div>

              <div>
                <h3>Your rights</h3>
                <p>
                  You can request access to, correction of, or deletion of any data we hold about
                  you. Email <a href="mailto:privacy@pipesight.co">privacy@pipesight.co</a> and we
                  will respond within 14 days. If you close your account, we delete your token
                  immediately and purge your data within 30 days.
                </p>
              </div>

              <div>
                <h3>Changes to this policy</h3>
                <p>
                  We may update this policy as the product evolves. Material changes will be
                  communicated by email before they take effect.
                </p>
              </div>

              <div className="legal-foot">
                <p>
                  Questions? <a href="mailto:privacy@pipesight.co">privacy@pipesight.co</a>
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
