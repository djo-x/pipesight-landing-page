'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

type Variant = 'lime' | 'ink'

interface WaitlistFormProps {
  variant?: Variant
}

export default function WaitlistForm({ variant = 'lime' }: WaitlistFormProps) {
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
      setStatus('success')
      setMessage("✓ locked in — you're on the list. we'll be in touch.")
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('// something went wrong — please try again')
    }
  }

  const btnClass = variant === 'ink' ? 'btn btn-ink' : 'btn btn-lime'
  const buttonLabel =
    status === 'submitting'
      ? 'Joining…'
      : status === 'success'
        ? '✓ On the list'
        : 'Join the waitlist →'

  return (
    <>
      <form className="waitlist" noValidate onSubmit={handleSubmit} data-reveal>
        <input
          type="email"
          placeholder="you@company.com"
          aria-label="Work email address"
          autoComplete="email"
          value={email}
          className={status === 'error' ? 'error' : ''}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'error') {
              setStatus('idle')
              setMessage('')
            }
          }}
        />
        <button type="submit" className={btnClass} disabled={status === 'submitting'}>
          {buttonLabel}
        </button>
      </form>
      <p
        className={cn('form-msg', status === 'success' && 'ok', status === 'error' && 'err')}
        role="status"
      >
        {message}
      </p>
    </>
  )
}
