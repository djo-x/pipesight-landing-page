import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Instrument_Serif, IBM_Plex_Mono } from 'next/font/google'
import RevealObserver from '@/components/RevealObserver'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Pipesight — Catch every Databricks failure the moment it happens',
  description: "Your Databricks jobs are failing. You just don't know it yet.",
  metadataBase: new URL('https://pipesight.co'),
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${ibmPlexMono.variable}`}>
      <body>
        {children}
        <RevealObserver />
      </body>
    </html>
  )
}
