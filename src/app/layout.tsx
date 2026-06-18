import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter, IBM_Plex_Mono } from 'next/font/google'
import RevealObserver from '@/components/RevealObserver'
import HudFrame from '@/components/HudFrame'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-sans',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Pipesight — Catch every Databricks failure the moment it happens',
  description:
    'Pipesight watches your Databricks pipelines 24/7 and fires a clean Slack alert the instant a job fails — before your data is late and the questions start.',
  metadataBase: new URL('https://pipesight.co'),
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: 'https://pipesight.co',
    siteName: 'Pipesight',
    title: 'Pipesight — Catch every Databricks failure the moment it happens',
    description:
      'Pipesight watches your Databricks pipelines 24/7 and fires a clean Slack alert the instant a job fails — before your data is late and the questions start.',
    images: [
      {
        url: '/shot-dashboard.jpg',
        width: 1200,
        height: 750,
        alt: 'Pipesight monitoring dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pipesight — Catch every Databricks failure the moment it happens',
    description:
      'Pipesight watches your Databricks pipelines 24/7 and fires a clean Slack alert the instant a job fails.',
    images: ['/shot-dashboard.jpg'],
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <body data-vibe="cockpit">
        <HudFrame />
        {children}
        <RevealObserver />
      </body>
    </html>
  )
}
