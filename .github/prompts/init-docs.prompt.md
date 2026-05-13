---
description: Generate or update compact workspace instructions and docs/kb/ knowledge base files for AI coding agents
---

# Init — Workspace Knowledge Base Generator

Generate or update `.github/copilot-instructions.md` and `docs/kb/` knowledge base files.
Never edit project source code.

Goal: produce a small, high-signal instruction set that improves agent quality without wasting tokens.
Principle: omit generic filler; keep only guidance with clear behavioral value.

## Discovery

1. Search for existing AI conventions and project config:

```
**/{.github/copilot-instructions.md,AGENT.md,AGENTS.md,CLAUDE.md,.cursorrules,.windsurfrules,.clinerules,README.md,.env.example,.env.sample,package.json,pyproject.toml,go.mod,Cargo.toml,pom.xml,build.gradle*,Makefile,Dockerfile,docker-compose*.yml,compose*.yml,tsconfig.json,jsconfig.json,eslint.config.*,.eslintrc*,prettier.config.*,jest.config.*,vitest.config.*,vite.config.*,turbo.json,nx.json}
```

2. Read all files found. Preserve valuable repo-specific guidance.
3. Detect repo type first: frontend, backend, full-stack, library/package, CLI, service, monorepo, or infra.
4. Read at least 5 representative source files before documenting conventions.
5. Verify patterns from code and runnable commands, not config alone.

## Research Areas

Only document areas with strong repo-specific evidence:

- **Build & run** — install, dev, build, test, lint, typecheck, format, migration, seed, deploy
- **Architecture** — modules, layers, service boundaries, request/data flow, major design decisions
- **Conventions** — naming, file layout, imports, tests, validation, logging, errors, patterns that differ from defaults
- **Integrations** — internal services, external APIs, auth, queues, storage, caches, scheduled jobs
- **Configuration** — env vars, feature flags, runtime constraints, deployment assumptions
- **Domain knowledge** — entities, schemas, contracts, business rules, internal packages, dependent repos

## Write .github/copilot-instructions.md

If the file exists, merge intelligently. Keep valuable guidance. Remove stale, generic, or duplicated content.
Target: **40–80 lines**.
This file is injected into every agent invocation, so every line must earn its place.
Prefer links to `docs/kb/` over repeated detail.

Structure:

```markdown
# <Project name> — Copilot Instructions

## Agent Behavior
- Think and state assumptions before coding; ask if requirements or behavior are ambiguous. If multiple interpretations exist, present them - don't pick silently.
- Prefer simplest solution that satisfies the request; avoid speculative abstractions or extra features. If you write 200 lines and it could be 50, rewrite it. Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.
- Touch only what you must. Clean up only your own mess. Make surgical changes; match existing style; mention unrelated issues instead of fixing them. If you notice unrelated dead code, mention it - don't delete it.
- Define success criteria. Loop until verified. Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.
- For non-trivial tasks, state a short plan with a verification step before making changes

## Response Style
- Drop: articles (a/an/the), filler (just/really/basically/actually/simply), pleasantries (sure/certainly/of course/happy to), hedging. Fragments OK. Short synonyms (big not extensive, fix not "implement a solution for"). Technical terms exact. Code blocks unchanged. Errors quoted exact.

Pattern: [thing] [action] [reason]. [next step].

Not: "Sure! I'd be happy to help you with that. The issue you're experiencing is likely caused by..." Yes: "Bug in auth middleware. Token expiry check use < not <=. Fix:"
- Abbreviate prose words (DB/auth/config/req/res/fn/impl), strip conjunctions, arrows for causality (X → Y), one word when one word enough. Code symbols, function names, API names, error strings: never abbreviate or rephrase.

- Be concise by default; keep technical accuracy intact
- Prefer bullets, fragments, and short tables over long prose
- For risky, destructive, or security-sensitive actions, prefer clarity over compression

Example — "Why React component re-render?"
Bad: "The React component is re-rendering because the parent component is passing a new object as a prop on every render. This causes React to think the prop has changed, even if the contents are the same. To fix this, you can memoize the object using useMemo or move it outside of the parent component."
Good: "New object ref each render. Inline object prop = new ref = re-render. Wrap in useMemo."

## Project Snapshot
## Architecture
## Conventions
## Common Workflows
## Integrations and Security
## Agent Knowledge Base
```

Requirements for `copilot-instructions.md`:

- `Agent Behavior` and `Response Style` are always included
- Other sections are optional; skip empty sections
- Prefer bullets and compact tables over prose
- Include exact commands agents can run
- Include repo-specific rules only; omit generic engineering advice
- Use short file path references as examples instead of long excerpts
- In `Agent Knowledge Base`, use a trigger table: `File | Read when...`

### Style calibration

Use these examples to shape the wording of `copilot-instructions.md` itself.

Good:
- `Run: pnpm test`, `pnpm lint`, `pnpm typecheck` before PR`
- `Use service layer for external API calls. Do not fetch from controllers.`
- `Auth logic lives in middleware/auth.ts. Read before changing session flow.`
- `If task changes schema, read docs/kb/DOMAIN-MODELS.md first.`
- `Use src/lib/logger.ts. Avoid ad-hoc console output.`

Bad:
- `You should generally make sure tests, linting, and type checking are run when appropriate before considering work complete.`
- `It is recommended that developers try to follow existing architectural patterns already present throughout the codebase.`
- `Please be aware that authentication is handled in a specific area of the repository and should be reviewed carefully.`
- `In many situations, it may be useful to consult knowledge base documentation for additional context.`

Compression rules:
- specific noun + action + condition beats broad advice
- commands, paths, and triggers beat explanations
- remove softeners: `generally`, `try`, `may`, `appropriate`
- if one line can replace three, use one line

## Write docs/kb/ files

Create a KB file only when the repo has real, codebase-specific content for it.
Skip empty or generic files.
Target: **15–35 lines per file**.

| File | Include when | Content |
|---|---|---|
| `docs/kb/ARCHITECTURE.md` | Repo has meaningful structure beyond a small app or script | Layers, modules, boundaries, request/data flow, design decisions |
| `docs/kb/FOLDER-STRUCTURE.md` | Top-level structure is non-trivial | Annotated directory tree, one line per important folder |
| `docs/kb/TECH-STACK.md` | Runtime, framework, or key libraries shape implementation | Runtime/tool versions, frameworks, important libraries, purpose |
| `docs/kb/DOMAIN-MODELS.md` | Repo has core entities, schemas, or business objects | Entities, relationships, schema/model/type locations |
| `docs/kb/STATE-AND-DATA-FLOW.md` | State, caching, async jobs, or event flow are important | State flow, cache strategy, queue/event/background flow |
| `docs/kb/ENV-CONFIG.md` | Project uses env-driven behavior | Variable name, type, required/optional, effect, defaults if discoverable |
| `docs/kb/FEATURE-FLAGS.md` | Runtime flags or gated behavior exist | Flag name, default/state, owning area, cleanup/removal note if known |
| `docs/kb/DEPENDENCIES.md` | Internal packages, sibling workspaces, or dependent repos matter | Package/repo name, purpose, ownership area, communication method |
| `docs/kb/TESTING-GUIDE.md` | Tests exist or are expected for changes | Commands, folder conventions, fixtures, mocks, test layers |
| `docs/kb/CODING-CONVENTIONS.md` | Stable, discoverable conventions exist | Naming, file layout, imports, validation, logging, error handling |
| `docs/kb/API-CONTRACTS.md` | Repo exposes or consumes structured interfaces | REST, GraphQL, gRPC, events, queues, request/response or message shapes |
| `docs/kb/OPERATIONS.md` | Runtime operations matter | CI/CD, containers, infra assumptions, jobs, observability, runbooks |
| `docs/kb/SECURITY.md` | Security-sensitive code or practices exist | Vulnerable areas, secrets management, auth patterns, audit tips |
| `docs/kb/INTERNAL-TOOLS.md` | Internal CLIs, dashboards, or services are important | Tool name, purpose, access, usage patterns, gotchas |
| `docs/kb/OTHER-AREAS.md` | Other important areas not covered by above | TBD based on repo-specific content |

## Guidelines

- Document only what is discoverable in this repo; never write placeholders
- Prefer omission over generic filler
- Use specific file paths, commands, and examples; avoid long excerpts
- Merge with existing docs instead of overwriting useful content
- When multiple valid patterns exist, add a concise `Need -> Use` table
- Prefer stack-agnostic wording unless repo clearly needs stack-specific detail

## Report

After writing, tell the user:
- Which files were **created**
- Which files were **updated**
- Any ambiguities or areas with weak evidence

Then ask:
`Are there any sections that look incomplete or inaccurate? I can update them directly.`
