# Tech Stack

| Category | Technology | Version | Notes |
|---|---|---|---|
| Framework | Next.js (App Router) | 15.1.3 | Turbopack for dev |
| UI Library | React | 19.x | All `"use client"` components |
| Language | TypeScript | 5.x | Strict mode, ES2017 target |
| Styling | Tailwind CSS | 3.4.x | + tailwindcss-animate, `print:` variants for PDF |
| Components | shadcn/ui (Radix) | Various | In `components/ui/`, CVA + clsx + tailwind-merge |
| Forms | React Hook Form | 7.x | + @hookform/resolvers (Zod) |
| Validation | Zod | 3.x | Schema in `lib/utils.ts` |
| Date | date-fns | 4.x | + react-day-picker for calendar |
| Icons | lucide-react | 0.469.x | |
| Analytics | @vercel/analytics | 1.x | + @vercel/speed-insights |
| Deploy | Vercel | — | Auto-deploy from `main` |
| Linting | ESLint | 9.x | next/core-web-vitals + next/typescript |

## Key Constraints
- No backend, no API routes, no server actions
- No test framework installed
- No CSS modules or styled-components — Tailwind only
- Theming via CSS variables (HSL values) in `globals.css`
- `@/` path alias maps to project root
