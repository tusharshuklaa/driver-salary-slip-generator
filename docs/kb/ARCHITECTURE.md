# Architecture

## Overview
Single-page Next.js 15 App Router app. Entirely client-side — no server actions, no API routes, no SSR data fetching. All interactive components use `"use client"`.

## Data Flow
1. `app/page.tsx` creates `useForm()` with Zod resolver + defaults
2. `form` object passed down to `SelectTemplate` (template picker) and `GenerateReceipt` (form + preview)
3. `GenerateReceipt` renders `DetailsForm` (inputs) + active template component side-by-side
4. Template components receive form values via `form.watch()` spread as props (`TemplateProps`)
5. `useTemplateValues` hook computes derived values: formatted date, currency symbol, signature image
6. Print: `window.print()` triggers browser print. Tailwind `print:` variants hide UI, style receipt.

## Template System
- 3 templates: `components/template{1,2,3}.tsx`
- Selected via radio group in `select-template.tsx` → `form.template` value ("1"/"2"/"3")
- `generate-receipt.tsx` maps template value to component via conditional assignment
- All templates share `TemplateProps` type from `types/globals.d.ts`
- Adding a template: create component, add to `generate-receipt.tsx` switch, add radio in `select-template.tsx`

## Signature Generation
- Canvas-based: `getSignatureImageUrl()` in `lib/utils.ts`
- Uses Alex Brush font loaded in `generate-receipt.tsx`
- Fallback: user-uploaded image via file input → `signatureImageSrc` form field
- `useTemplateValues` hook selects: uploaded image if present, else auto-generated from driver name

## Key Files
| File | Role |
|---|---|
| `app/page.tsx` | Form creation, defaults, page layout |
| `lib/utils.ts` | `cn()`, `formSchema` (Zod), `getSignatureImageUrl()` |
| `types/globals.d.ts` | `ReactHookFormValue`, `TemplateProps` |
| `components/generate-receipt.tsx` | Template switch, form + preview layout |
| `components/details-form.tsx` | All form inputs |
| `hooks/use-template-values.tsx` | Derived template data (date, currency, signature) |
