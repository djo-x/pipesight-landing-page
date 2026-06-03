# PIPESIGHT — CLAUDE CODE INSTRUCTIONS

## WHAT THIS PROJECT IS

Pipesight is a Databricks job monitoring SaaS. This repo currently contains
the landing page only. The full SaaS product will be built in later phases.

## CURRENT PHASE

Landing page — collecting waitlist signups before building the product.

## TECH STACK

- Next.js 14+ (App Router, TypeScript, Tailwind CSS)
- Resend for email capture (waitlist) and outbound alerts
- Vercel for deployment
- Domain: pipesight.co

## CODE CONVENTIONS

- TypeScript strict mode — no `any` types, ever
- Use `cn()` from `@/lib/utils` for conditional class names
- All components are functional with typed props
- Server components by default, add "use client" only when needed
- API routes in `src/app/api/` following Next.js App Router pattern
- Environment variables accessed via `process.env.VARIABLE_NAME`
- No inline styles — Tailwind classes only
- Imports ordered: React → Next.js → third-party → local

## FOLDER CONVENTIONS

- `src/components/sections/` — full-width page sections
- `src/components/ui/` — small reusable components
- `src/components/layout/` — Navbar, Footer
- `src/lib/` — utilities and service clients
- `src/app/api/` — API routes

## WHAT NOT TO DO

- Do not install unnecessary dependencies
- Do not use `any` TypeScript type
- Do not add placeholder/lorem ipsum content — use real Pipesight copy
- Do not add features not explicitly requested
- Do not use `<img>` — always use Next.js `<Image>` component
- Do not hardcode secrets — use environment variables

## BRAND

- Product name: Pipesight
- Domain: pipesight.co
- Tagline: "Your Databricks jobs are failing. You just don't know it yet."
- Colors: Amber/orange accent (#BA7517, #F59E0B), dark text (#0F172A), clean white bg
- Tone: Professional, technical, direct — not startup-casual
