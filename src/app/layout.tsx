import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Bricolage_Grotesque, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-display',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
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
    <html lang="en" className={`${bricolage.variable} ${ibmPlexMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
