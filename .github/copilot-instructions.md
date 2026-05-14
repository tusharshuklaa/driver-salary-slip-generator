# Driver Salary Slip Generator — Copilot Instructions

## Agent Behavior
- Think and state assumptions before coding; ask if requirements or behavior are ambiguous. If multiple interpretations exist, present them — don't pick silently.
- Prefer simplest solution that satisfies the request; avoid speculative abstractions or extra features.
- Touch only what you must. Clean up only your own mess. Make surgical changes; match existing style; mention unrelated issues instead of fixing them.
- Define success criteria. Loop until verified.
- For non-trivial tasks, state a short plan with a verification step before making changes.

## Response Style
- Drop: articles, filler, pleasantries, hedging. Fragments OK. Short synonyms.
- Pattern: [thing] [action] [reason]. [next step].
- Abbreviate prose words (DB/auth/config/req/res/fn/impl). Code symbols, function names, API names, error strings: never abbreviate.
- Prefer bullets, fragments, short tables over long prose.

## Project Snapshot
- **What**: Client-side salary slip/receipt generator for drivers. No backend, no API, no auth.
- **Stack**: Next.js 15 (App Router, Turbopack), React 19, TypeScript 5, Tailwind CSS 3.4, shadcn/ui (Radix), React Hook Form + Zod, date-fns
- **Deploy**: Vercel (auto-deploy from `main`). Vercel Analytics + Speed Insights.
- **Output**: User fills form → picks template (1/2/3) → browser `window.print()` generates PDF

## Architecture
- Single-page app. All components are `"use client"`.
- Form state created in `app/page.tsx`, passed down via `form` prop (`ReactHookFormValue` type).
- Zod schema (`formSchema`) lives in `lib/utils.ts`. Validated via `zodResolver`.
- 3 salary slip templates in `components/template{1,2,3}.tsx`. Selected by radio, rendered in `generate-receipt.tsx`.
- Print output styled with Tailwind `print:` variants (hide UI, format receipt).
- Signature generated client-side via Canvas API (`getSignatureImageUrl` in `lib/utils.ts`).
- See `docs/kb/ARCHITECTURE.md` for details.

## Conventions
- kebab-case filenames. Named exports for all components (except `page.tsx` default export).
- `FC<Props>` type annotation on components. Props types in `types/globals.d.ts`.
- `@/` path alias → project root. Always use it for imports.
- `components/ui/` = shadcn/ui base components. `components/` = app-specific components.
- Tailwind for all styling. CSS variables (HSL) for theming in `globals.css`.
- Currency format: `symbol__index` string, split on `__` to extract symbol.
- No tests in repo. No `.env` vars except `SITE_URL` (sitemap only).

## Common Workflows
- `npm run dev` — start dev server (Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint (next/core-web-vitals + next/typescript)
- Add new template → create `components/template{N}.tsx`, register in `generate-receipt.tsx` switch + `select-template.tsx` radio group
- Add form field → update `formSchema` in `lib/utils.ts`, add to form defaults in `app/page.tsx`, add input in `details-form.tsx`, consume in template components

## Agent Knowledge Base

| File | Read when... |
|---|---|
| `docs/kb/ARCHITECTURE.md` | Changing component structure, data flow, or templates |
| `docs/kb/FOLDER-STRUCTURE.md` | Adding new files or uncertain where code belongs |
| `docs/kb/TECH-STACK.md` | Checking versions, available libraries, or adding deps |
| `docs/kb/CODING-CONVENTIONS.md` | Writing new components, uncertain about naming/style |
