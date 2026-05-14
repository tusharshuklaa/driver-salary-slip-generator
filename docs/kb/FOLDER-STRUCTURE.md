# Folder Structure

```
app/                    # Next.js App Router: layout, page, global styles
components/             # App-specific React components
  template{1,2,3}.tsx   # Salary slip templates (share TemplateProps)
  generate-receipt.tsx  # Template switch + form/preview layout
  details-form.tsx      # All form field inputs
  select-template.tsx   # Template radio picker
  form-container.tsx    # Styled fieldset wrapper
  form-row.tsx          # Horizontal form field row
  ui/                   # shadcn/ui base components (do not edit by hand)
data/                   # Static JSON data
  currency.json         # Currency list [{text, value}]
hooks/                  # Custom React hooks
  use-template-values.tsx  # Derived values for templates
lib/                    # Utilities
  utils.ts              # cn(), formSchema (Zod), getSignatureImageUrl()
types/                  # TypeScript type definitions
  globals.d.ts          # ReactHookFormValue, TemplateProps
public/                 # Static assets (images, sitemap, robots.txt)
.github/                # GitHub config, copilot instructions, prompts
docs/kb/                # Agent knowledge base (this folder)
```

## Rules
- New components → `components/`. New UI primitives → `components/ui/`.
- New hooks → `hooks/`. New utilities → `lib/`.
- New types → `types/globals.d.ts` (single file).
- Static data → `data/`.
