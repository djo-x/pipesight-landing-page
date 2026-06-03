import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import WaitlistConfirmation, { plainText } from '@/emails/WaitlistConfirmation'

const resend = new Resend(process.env.RESEND_API_KEY)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let email: string
  try {
    const body = await request.json()
    email = String(body?.email ?? '')
      .trim()
      .toLowerCase()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 422 })
  }

  // 1. Add to Resend audience
  const audienceId = process.env.RESEND_AUDIENCE_ID
  if (!audienceId) {
    console.error('[waitlist] RESEND_AUDIENCE_ID is not set')
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  try {
    await resend.contacts.create({ email, audienceId, unsubscribed: false })
  } catch (err: unknown) {
    // Resend returns 409 if contact already exists — treat as success
    const status = (err as { statusCode?: number })?.statusCode
    if (status !== 409) {
      console.error('[waitlist] Failed to add contact:', err)
      return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 })
    }
  }

  // 2. Send emails in parallel — don't fail the request if they bounce
  const from = process.env.RESEND_FROM_EMAIL ?? 'Pipesight <hello@pipesight.co>'
  const notifyTo = process.env.NOTIFICATION_EMAIL

  const emailJobs: Promise<unknown>[] = [
    resend.emails.send({
      from,
      to: email,
      subject: "You're on the Pipesight waitlist",
      react: WaitlistConfirmation({ email }),
      text: plainText(email),
    }),
  ]

  if (notifyTo) {
    emailJobs.push(
      resend.emails.send({
        from,
        to: notifyTo,
        subject: `🟢 New waitlist signup: ${email}`,
        html: `
          <div style="font-family:monospace;padding:20px;background:#0A0E0B;color:#ECEAE0;border-radius:6px">
            <p style="margin:0 0 8px;font-size:13px;color:#7E867C;letter-spacing:0.1em;text-transform:uppercase">New waitlist signup</p>
            <p style="margin:0 0 16px;font-size:22px;color:#CBEF4D">${email}</p>
            <p style="margin:0;font-size:12px;color:#7E867C">${new Date().toISOString()}</p>
          </div>
        `,
        text: `New waitlist signup: ${email}\n${new Date().toISOString()}`,
      })
    )
  }

  const results = await Promise.allSettled(emailJobs)
  results.forEach((r, i) => {
    if (r.status === 'rejected') {
      console.error(`[waitlist] Email job ${i} failed:`, r.reason)
    }
  })

  return NextResponse.json({ success: true })
}
