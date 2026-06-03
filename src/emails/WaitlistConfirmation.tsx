import {
  Body,
  Container,
  Font,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface Props {
  email: string
}

const BG = '#0A0E0B'
const BONE = '#ECEAE0'
const BONE_DIM = '#B8BCAF'
const MUTED = '#7E867C'
const LIME = '#CBEF4D'
const CORAL = '#FF6A52'
const HAIR = 'rgba(236, 234, 224, 0.12)'
const MONO = "'IBM Plex Mono', 'Courier New', monospace"
const SERIF = "Georgia, 'Times New Roman', serif"

export default function WaitlistConfirmation({ email }: Props) {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="IBM Plex Mono"
          fallbackFontFamily="monospace"
          webFont={{
            url: 'https://fonts.gstatic.com/s/ibmplexmono/v19/zYX9KVElMYYaJe8bpLHnCwDKhdTmyIJcdvfgmg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="IBM Plex Mono"
          fallbackFontFamily="monospace"
          webFont={{
            url: 'https://fonts.gstatic.com/s/ibmplexmono/v19/zYX-KVElMYYaJe8bpLHnCwDKjbLeUIJcdvfg.woff2',
            format: 'woff2',
          }}
          fontWeight={500}
          fontStyle="normal"
        />
      </Head>
      <Preview>
        You&apos;re on the Pipesight waitlist — first 50 teams get 3 months of Pro free.
      </Preview>

      <Body style={{ backgroundColor: BG, margin: '0', padding: '0' }}>
        <Container
          style={{
            maxWidth: '560px',
            margin: '0 auto',
            backgroundColor: BG,
            fontFamily: MONO,
          }}
        >
          {/* ── Header ── */}
          <Section style={{ padding: '40px 40px 0' }}>
            <table width="100%" cellPadding="0" cellSpacing="0">
              <tbody>
                <tr>
                  <td>
                    {/* Reticle mark */}
                    <table cellPadding="0" cellSpacing="0">
                      <tbody>
                        <tr>
                          <td style={{ paddingRight: '10px', verticalAlign: 'middle' }}>
                            <svg
                              width="28"
                              height="28"
                              viewBox="0 0 32 32"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <line
                                x1="1"
                                y1="16"
                                x2="31"
                                y2="16"
                                stroke="#ECEAE0"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                              />
                              <circle
                                cx="16"
                                cy="16"
                                r="8.5"
                                fill="rgba(203,239,77,0.10)"
                                stroke={LIME}
                                strokeWidth="2.2"
                              />
                              <line
                                x1="16"
                                y1="9.6"
                                x2="16"
                                y2="12.2"
                                stroke={LIME}
                                strokeWidth="1.8"
                                strokeLinecap="round"
                              />
                              <line
                                x1="16"
                                y1="19.8"
                                x2="16"
                                y2="22.4"
                                stroke={LIME}
                                strokeWidth="1.8"
                                strokeLinecap="round"
                              />
                              <circle cx="16" cy="16" r="2.1" fill={LIME} />
                            </svg>
                          </td>
                          <td style={{ verticalAlign: 'middle' }}>
                            <span
                              style={{
                                fontFamily: SERIF,
                                fontSize: '22px',
                                color: BONE,
                                letterSpacing: '0.01em',
                              }}
                            >
                              Pipesight
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* ── Lime rule ── */}
          <Section style={{ padding: '28px 40px 0' }}>
            <div
              style={{
                height: '1px',
                background: `linear-gradient(90deg, ${LIME}, transparent)`,
                opacity: 0.5,
              }}
            />
          </Section>

          {/* ── Hero text ── */}
          <Section style={{ padding: '40px 40px 0' }}>
            <Text
              style={{
                fontFamily: SERIF,
                fontSize: '42px',
                fontWeight: 400,
                color: BONE,
                lineHeight: '1.05',
                letterSpacing: '-0.01em',
                margin: '0 0 20px',
              }}
            >
              You&apos;re on
              <br />
              the list.
            </Text>
            <Text
              style={{
                fontFamily: MONO,
                fontSize: '14px',
                color: BONE_DIM,
                lineHeight: '1.7',
                margin: '0',
              }}
            >
              Thanks for joining the Pipesight waitlist. We&apos;ll reach out directly at{' '}
              <span style={{ color: LIME }}>{email}</span> as soon as we&apos;re ready to onboard
              early users.
            </Text>
          </Section>

          {/* ── Tagline box ── */}
          <Section style={{ padding: '28px 40px 0' }}>
            <div
              style={{
                borderLeft: `3px solid ${CORAL}`,
                paddingLeft: '16px',
                background: 'rgba(255, 106, 82, 0.06)',
                borderRadius: '0 4px 4px 0',
                padding: '14px 16px',
              }}
            >
              <Text
                style={{
                  fontFamily: SERIF,
                  fontSize: '17px',
                  fontStyle: 'italic',
                  color: BONE,
                  lineHeight: '1.5',
                  margin: '0',
                }}
              >
                &ldquo;Your Databricks jobs are failing. You just don&apos;t know it yet.&rdquo;
              </Text>
            </div>
          </Section>

          {/* ── What to expect ── */}
          <Section style={{ padding: '32px 40px 0' }}>
            <Text
              style={{
                fontFamily: MONO,
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: LIME,
                margin: '0 0 16px',
              }}
            >
              — What to expect
            </Text>

            {[
              'Pipesight monitors all your Databricks jobs 24/7',
              'A clean Slack alert fires the instant a job fails',
              'Job name, error type, timestamp & direct run link — nothing more',
              'No more finding out 3 days after the fact',
            ].map((item, i) => (
              <table
                key={i}
                width="100%"
                cellPadding="0"
                cellSpacing="0"
                style={{ marginBottom: '12px' }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        width: '20px',
                        verticalAlign: 'top',
                        paddingTop: '1px',
                        color: LIME,
                        fontFamily: MONO,
                        fontSize: '13px',
                      }}
                    >
                      ✓
                    </td>
                    <td
                      style={{
                        color: BONE_DIM,
                        fontFamily: MONO,
                        fontSize: '13px',
                        lineHeight: '1.6',
                      }}
                    >
                      {item}
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </Section>

          {/* ── Pro perk callout ── */}
          <Section style={{ padding: '28px 40px 0' }}>
            <div
              style={{
                background: 'rgba(203, 239, 77, 0.07)',
                border: `1px solid rgba(203, 239, 77, 0.3)`,
                borderRadius: '6px',
                padding: '20px 22px',
              }}
            >
              <Text
                style={{
                  fontFamily: MONO,
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: LIME,
                  margin: '0 0 8px',
                }}
              >
                Early access perk
              </Text>
              <Text
                style={{
                  fontFamily: MONO,
                  fontSize: '13.5px',
                  color: BONE,
                  lineHeight: '1.6',
                  margin: '0',
                }}
              >
                The first 50 teams on the waitlist get{' '}
                <span style={{ color: LIME, fontWeight: 500 }}>3 months of Pro free</span> when we
                launch. You&apos;re in that window — don&apos;t share your spot.
              </Text>
            </div>
          </Section>

          {/* ── Divider ── */}
          <Section style={{ padding: '40px 40px 0' }}>
            <Hr style={{ borderColor: HAIR, margin: '0' }} />
          </Section>

          {/* ── Footer ── */}
          <Section style={{ padding: '24px 40px 40px' }}>
            <table width="100%" cellPadding="0" cellSpacing="0">
              <tbody>
                <tr>
                  <td>
                    <Text
                      style={{
                        fontFamily: MONO,
                        fontSize: '11px',
                        color: MUTED,
                        lineHeight: '1.6',
                        margin: '0',
                      }}
                    >
                      <span style={{ fontFamily: SERIF }}>Pipesight</span>
                      {' · '}
                      <Link
                        href="https://pipesight.co"
                        style={{ color: MUTED, textDecoration: 'none' }}
                      >
                        pipesight.co
                      </Link>
                    </Text>
                    <Text
                      style={{
                        fontFamily: MONO,
                        fontSize: '11px',
                        color: MUTED,
                        lineHeight: '1.6',
                        margin: '6px 0 0',
                      }}
                    >
                      You&apos;re receiving this because you joined the waitlist at pipesight.co.
                    </Text>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* ── Bottom accent bar ── */}
          <div
            style={{
              height: '3px',
              background: `linear-gradient(90deg, ${LIME}, ${CORAL}, transparent)`,
              opacity: 0.35,
            }}
          />
        </Container>
      </Body>
    </Html>
  )
}

WaitlistConfirmation.PreviewProps = {
  email: 'engineer@company.com',
} satisfies Props

// Plain-text fallback
export const plainText = (email: string) =>
  `
You're on the Pipesight waitlist.

We'll reach out at ${email} as soon as we're ready to onboard early users.

"Your Databricks jobs are failing. You just don't know it yet."

What to expect:
✓ Pipesight monitors all your Databricks jobs 24/7
✓ A clean Slack alert fires the instant a job fails
✓ Job name, error type, timestamp & direct run link
✓ No more finding out 3 days after the fact

EARLY ACCESS PERK: The first 50 teams on the waitlist get 3 months of Pro free when we launch.

—
Pipesight · https://pipesight.co
You're receiving this because you joined the waitlist at pipesight.co.
`.trim()
