# Coding Conventions

## Files & Naming
- kebab-case filenames: `form-container.tsx`, `use-template-values.tsx`
- Named exports for all components. Only exception: `page.tsx` uses default export (Next.js requirement).
- One component per file. File name matches component purpose, not component name.

## Components
- `FC<Props>` type annotation on every component
- Props types: inline for small/local, shared types in `types/globals.d.ts`
- `"use client"` directive at top of every interactive component
- `displayName` set on exported components that need it (e.g., `GenerateReceipt`)

## Imports
- Always use `@/` path alias for project imports: `import { cn } from "@/lib/utils"`
- Group: external deps → `@/` project imports → relative imports (when unavoidable)
- Import JSON data directly: `import Currencies from "@/data/currency.json"`

## Styling
- Tailwind classes only. No inline styles, no CSS modules.
- `cn()` helper (clsx + twMerge) for conditional classes
- HSL CSS variables for theming in `globals.css`
- `print:` variants for print-specific styles (hide UI elements, adjust receipt layout)

## Forms
- Single Zod schema (`formSchema`) in `lib/utils.ts`
- `useForm` with `zodResolver` in `app/page.tsx`
- Form object passed as `form` prop (`ReactHookFormValue` type) to subtree
- shadcn `Form` + `FormField` wrappers for all inputs
- `form.watch()` for reactive template preview

## Currency Pattern
- Currency stored as `symbol__index` string (e.g., `₹__68`)
- Extract symbol: `currency.split("__")[0]`
- Currency list from `data/currency.json`, index appended at runtime for uniqueness
