'use client'

import { useState } from 'react'

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const v = email.trim()
    if (!isEmail(v)) {
      setStatus('error')
      setMessage('// invalid — enter a valid work email')
      return
    }
    setStatus('submitting')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: v }),
      })
      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        throw new Error(data.error ?? 'Something went wrong')
      }
      setMessage(`✓ locked in — we'll reach out at ${v}`)
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('// something went wrong — please try again')
    }
  }

  const msgClass =
    status === 'error' ? 'form-msg error' : status === 'success' ? 'form-msg success' : 'form-msg'

  return (
    <>
      <form className="waitlist" noValidate onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="you@company.com"
          aria-label="Email address"
          autoComplete="email"
          value={email}
          className={status === 'error' ? 'err' : ''}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'error') {
              setStatus('idle')
              setMessage('')
            }
          }}
        />
        <button type="submit" className="btn btn-lime" disabled={status === 'submitting'}>
          {status === 'submitting'
            ? 'joining…'
            : status === 'success'
              ? '✓ on the list'
              : 'Join the waitlist →'}
        </button>
      </form>
      <p className={msgClass} role="status">
        {message}
      </p>
      <p className="form-note">No credit card · read-only token · cancel anytime</p>
    </>
  )
}
