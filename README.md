# Pipesight — Landing Page

Landing page for [Pipesight](https://pipesight.co), a Databricks job monitoring SaaS. Collects waitlist signups via email before the product ships.

## Tech stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS**
- **Resend** — email capture and transactional emails
- **Vercel** — deployment

## Local development

**Prerequisites:** Node.js 20+, pnpm

```bash
pnpm install
cp .env.example .env.local   # fill in your values (see below)
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable             | Description                                             |
| -------------------- | ------------------------------------------------------- |
| `RESEND_API_KEY`     | API key from [resend.com](https://resend.com/api-keys)  |
| `RESEND_AUDIENCE_ID` | Audience ID from Resend (for waitlist contacts)         |
| `RESEND_FROM_EMAIL`  | Verified sender address in Resend                       |
| `NOTIFICATION_EMAIL` | Address that receives a notification on each new signup |

## Scripts

```bash
pnpm dev          # dev server (Turbopack)
pnpm build        # production build
pnpm lint         # ESLint
pnpm format       # Prettier
pnpm type-check   # TypeScript
```

## Project structure

```
src/
  app/
    api/waitlist/   # POST endpoint — saves contact, sends confirmation
    page.tsx        # single-page layout
  components/
    layout/         # Navbar, Footer
    sections/       # Hero, ProblemSolution, HowItWorks, JobWall, Pricing, Cta
    ui/             # WaitlistForm
  emails/           # React Email templates
  lib/              # utils
```

## Deployment

Deployed to Vercel. Set the environment variables in the Vercel project settings — they are never committed to this repo.
