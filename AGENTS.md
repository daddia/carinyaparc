# AGENTS.md

Carinya Parc is a Next.js 16 App Router website (rebuild) for a regenerative farm in NSW, Australia. Content is managed in **Sanity** (Content Lake + Studio). The repo is a **pnpm + Turborepo** monorepo with a single app at `apps/site` and shared config packages under `packages/`.

Before making changes, read the docs in `docs/`. Treat them as authoritative -- if code and docs disagree, fix it.

| Doc              | Purpose                                                       |
| ---------------- | ------------------------------------------------------------- |
| `docs/product.md`   | Product vision, personas, pillars, non-goals                 |
| `docs/tech.md`      | High-level design: IA, Sanity content model, architecture    |
| `docs/structure.md`  | Monorepo layout, packages, naming conventions, planned dirs |

## Setup commands

```bash
pnpm install          # Install all workspace dependencies
pnpm dev              # Start all dev servers (via Turbo)
pnpm build            # Build all packages and apps
```

## Build & check commands

```bash
pnpm lint             # Lint all packages
pnpm typecheck        # TypeScript type checking
pnpm test             # Run all tests (via Turbo)
pnpm format           # Format code (Prettier)
pnpm format:check     # Check formatting (CI-style)
```

Site-specific (from `apps/site/`):

```bash
pnpm dev              # next dev
pnpm build            # next build
pnpm start            # next start
pnpm lint             # eslint .
pnpm typecheck        # tsc --noEmit
```

## Pre-flight checks

These MUST pass before marking work done:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test` (when test infrastructure is in place)

Treat any failure as a blocker, not a warning.

## Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript 5.9
- **Styling**: Tailwind CSS 4.2 (shared theme in `@repo/tailwind-config`)
- **UI primitives**: Base UI (unstyled, accessible components)
- **Content**: Sanity Content Lake (structured content for pages, posts, recipes, navigation, settings)
- **CMS**: Sanity Studio (WordPress-like authoring UI)
- **Rendering**: Server-rendered by default, static generation where practical, ISR via Sanity webhooks
- **Package manager**: pnpm 10.30 + Turborepo
- **Node**: >=24
- **Hosting**: Vercel

## Code style

- TypeScript only (`.ts` / `.tsx`). No plain JavaScript.
- Function components only. No class components.
- Server components by default; use `"use client"` sparingly.
- Tailwind utilities for styling; prefer Base UI accessible primitives.
- Australian English spelling throughout.
- Comments explain *why*, not *what*. No obvious narration.
- Fix lint errors before committing. Do not suppress ESLint rules without a documented reason.

## Naming conventions

| Thing             | Convention                  | Example                      |
| ----------------- | --------------------------- | ---------------------------- |
| Route folders     | kebab-case                  | `the-property/`, `[slug]/`   |
| Components        | PascalCase `.tsx`           | `HeroSection.tsx`            |
| Hooks             | `use-` prefix, kebab-case   | `use-mobile.ts`             |
| Utilities / lib   | kebab-case `.ts`            | `format-date.ts`            |
| Tests             | `.test.ts` / `.test.tsx`    | `hero-section.test.tsx`     |
| MDX content       | kebab-case `.mdx`           | `slow-roasted-beef.mdx`    |
| Sanity schemas    | kebab-case `.ts`            | `recipe.ts`                 |
| Shared packages   | `@repo/<name>`              | `@repo/tailwind-config`    |

## File placement

- Routes: `apps/site/src/app/`
- Components: `apps/site/src/components/` (`sections/`, `forms/`, `ui/`)
- Hooks: `apps/site/src/hooks/`
- Utilities: `apps/site/src/lib/`, `apps/site/src/utils/`
- Sanity schemas, queries, config: `apps/site/src/sanity/`
- Content (MDX): `apps/site/content/` (`posts/`, `recipes/`, `legal/`)
- Tests: `apps/site/__tests__/` (`unit/`, `integration/`, `smoke/`, `security/`)
- Docs: `docs/`

Many of these directories are planned but not yet created. See `docs/structure.md` for the full plan.

## Import aliases

Defined in `apps/site/tsconfig.json`:

| Alias  | Maps to   |
| ------ | --------- |
| `@/*`  | `./src/*` |

Shared packages are imported by package name (e.g., `@repo/tailwind-config` via CSS `@import`, `@repo/eslint-config` via extends).

Avoid deep relative paths (`../../../`).

## Information architecture

Routes follow the IA defined in `docs/tech.md`:

- `/` -- Home
- `/about`, `/about/the-property`, `/about/<story>` -- About hub
- `/regenerate` -- Regeneration overview
- `/stay`, `/stay/enquire` -- Stay info + enquiry (staged)
- `/blog`, `/blog/<slug>` -- Stories
- `/recipes`, `/recipes/<slug>` -- Recipes
- `/subscribe` -- Newsletter
- `/contact` -- General contact
- `/legal/<slug>` -- Privacy, terms

Avoid root-level dynamic slugs for posts/recipes (prevents collisions).

## Sanity content model

All structured content lives in Sanity. Key document types:

- `siteSettings` (singleton): brand, SEO defaults, navigation, integration config
- `page`: title, slug, sections[] (page builder), seo
- `post`: title, slug, content (Portable Text), authors[], categories[], tags[]
- `recipe`: title, slug, ingredients[], method[], time, serves
- `person` / `author`: name, bio, image
- `navigationMenu`: label + link items (internal ref or external URL)
- `redirect`: from, to, statusCode, enabled
- `category`, `tag`: taxonomies

See `docs/tech.md` for the full content model.

## Testing expectations

- **Unit tests**: colocated with source files (`.test.ts` / `.test.tsx`). Add or update whenever you change logic.
- **Integration tests** (`__tests__/integration/`): for multi-component flows.
- **Smoke tests** (`__tests__/smoke/`): for critical rendering and navigation.
- **Security tests** (`__tests__/security/`): must stay green when touching auth, sessions, cookies, or headers.

## Security

- Never commit secrets. Use `.env.local` for dev, Vercel env vars for deploy. See `apps/site/.env.example` for the template.
- No secrets stored in Sanity.
- Minimal data collection (primarily emails for subscriptions and contact forms).
- Spam controls on forms: honeypot fields, timing checks, basic rate limiting.

## Documentation expectations

When behaviour, architecture, or features change, update the relevant doc:

- `docs/product.md` -- user-facing features or flows
- `docs/tech.md` -- architecture, IA, content model, integrations
- `docs/structure.md` -- monorepo layout, naming conventions, new directories

Keep docs in sync with code. When code and docs disagree, that is a bug.

## PR and change guidelines

- Keep diffs small and focused (one feature or bug per change).
- Run all pre-flight checks before marking work complete.
- Update tests and docs alongside code.
- Explain *why* decisions were made, especially around UX, performance, and data.
- Do not mix refactors with feature work unless the refactor is essential.
