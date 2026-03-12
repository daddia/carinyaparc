---
title: Carinya Parc -- Project Structure
status: active
owner: engineering
last_updated: 2026-03-13
---

## Overview

Carinya Parc is a **pnpm monorepo** managed by **Turborepo**. The workspace contains one application (`apps/site`) and three shared packages (`packages/*`). All code is TypeScript.

```text
carinyaparc.com.au/
├── apps/
│   └── site/              # Next.js 16 website (App Router)
├── packages/
│   ├── eslint-config/     # Shared ESLint configs
│   ├── tailwind-config/   # Shared Tailwind theme + PostCSS
│   └── typescript-config/ # Shared TypeScript base configs
├── docs/                  # Project documentation
└── (root config)          # Turborepo, pnpm, Prettier
```

## Root

| File / directory        | Purpose                                                       |
| ----------------------- | ------------------------------------------------------------- |
| `pnpm-workspace.yaml`   | Declares workspaces: `apps/*`, `packages/*`                  |
| `turbo.json`             | Turborepo task graph (dev, build, lint, typecheck, test)     |
| `package.json`           | Root scripts, engine constraints (Node >=24, pnpm 10.30.3)  |
| `prettier.config.mjs`   | Prettier rules (semi, singleQuote, trailing commas, MDX)     |
| `.prettierignore`        | Excludes content/, .next/, node_modules/, etc.               |
| `.nvmrc`                 | Pins Node 24                                                 |
| `.gitignore`             | Standard ignores + `.zen/`, `.env*`, coverage, etc.          |
| `LICENSE`                | Project licence                                              |
| `README.md`             | Repo introduction                                            |

There is no root `tsconfig.json` or `eslint.config.*` -- each app and package owns its own.

## `apps/site/` -- Next.js website

The primary (and currently only) application. Built with **Next.js 16**, **React 19**, and **Tailwind CSS 4** via the App Router.

### Key files

| File                   | Purpose                                          |
| ---------------------- | ------------------------------------------------ |
| `package.json`          | App dependencies and scripts                    |
| `next.config.ts`        | Next.js configuration (currently empty)         |
| `tsconfig.json`         | Extends `@repo/typescript-config/nextjs.json`; adds `@/*` path alias mapping to `./src/*` |
| `eslint.config.mjs`     | Extends `@repo/eslint-config/next-js`           |
| `postcss.config.mjs`    | PostCSS with `@tailwindcss/postcss`             |
| `.env.example`           | Template for local environment variables        |

### `src/app/` -- App Router routes

Next.js App Router convention: each folder under `src/app/` becomes a route segment.

```text
src/app/
├── globals.css       # Imports @repo/tailwind-config (shared theme)
├── layout.tsx        # Root layout (html, body, metadata)
└── page.tsx          # Home page (/)
```

! The route tree is minimal right now. As pages are added, follow the IA defined in `docs/tech.md`:

```text
src/app/
├── layout.tsx                  # Root layout
├── page.tsx                    # /
├── about/
│   ├── page.tsx                # /about
│   └── the-property/
│       └── page.tsx            # /about/the-property
├── regenerate/
│   └── page.tsx                # /regenerate
├── stay/
│   ├── page.tsx                # /stay
│   └── enquire/
│       └── page.tsx            # /stay/enquire
├── blog/
│   ├── page.tsx                # /blog
│   └── [slug]/
│       └── page.tsx            # /blog/:slug
├── recipes/
│   ├── page.tsx                # /recipes
│   └── [slug]/
│       └── page.tsx            # /recipes/:slug
├── subscribe/
│   └── page.tsx                # /subscribe
├── contact/
│   └── page.tsx                # /contact
└── legal/
    └── [slug]/
        └── page.tsx            # /legal/:slug
```

### Planned directories (not yet created)

These directories will be added as features are built. Follow the naming conventions below.

| Directory                     | Purpose                                              | Naming convention        |
| ----------------------------- | ---------------------------------------------------- | ------------------------ |
| `src/components/sections/`     | Page-level sections (hero, CTA, cards grid)         | `PascalCase.tsx`         |
| `src/components/forms/`        | Form components (subscribe, contact, enquiry)       | `PascalCase.tsx`         |
| `src/components/ui/`           | Small reusable UI primitives                        | `PascalCase.tsx`         |
| `src/hooks/`                   | Custom React hooks                                  | `use-kebab-case.ts`     |
| `src/lib/`                     | Utilities, helpers, clients (e.g. Sanity client)    | `kebab-case.ts`          |
| `src/utils/`                   | Pure utility functions                              | `kebab-case.ts`          |
| `src/sanity/`                  | Sanity schemas, queries, and configuration          | `kebab-case.ts`          |
| `content/posts/`               | MDX blog posts                                      | `slug.mdx`               |
| `content/recipes/`             | MDX recipe content                                  | `slug.mdx`               |
| `content/legal/`               | MDX legal pages                                     | `slug.mdx`               |
| `__tests__/unit/`              | Unit tests (mirrors `src/` structure)               | `*.test.ts(x)`           |
| `__tests__/integration/`       | Integration tests                                   | `*.test.ts(x)`           |
| `__tests__/smoke/`             | Smoke tests (routes, layouts, forms)                | `*.test.ts(x)`           |
| `__tests__/security/`          | Security tests                                      | `*.test.ts(x)`           |

## `packages/` -- shared workspace packages

### `@repo/typescript-config`

Shared TypeScript base configurations. No runtime code.

| File                 | Purpose                                                    |
| -------------------- | ---------------------------------------------------------- |
| `base.json`           | Strict TS config: ES2022, `NodeNext` module resolution    |
| `nextjs.json`         | Extends `base.json` for Next.js: ESNext module, JSX preserve, `noEmit` |
| `react-library.json`  | Extends `base.json` for React library packages            |

### `@repo/eslint-config`

Shared ESLint configurations for flat config (ESLint 10).

| File                    | Purpose                                              |
| ----------------------- | ---------------------------------------------------- |
| `base.js`                | Base config                                         |
| `next.js`                | Next.js config: React, React Hooks, `@next/next` plugin, Prettier compat |
| `react-internal.js`      | Config for internal React packages                  |

### `@repo/tailwind-config`

Shared Tailwind CSS theme and PostCSS configuration.

| File                   | Purpose                                                        |
| ---------------------- | -------------------------------------------------------------- |
| `globals.css`           | Tailwind v4 `@theme` block with custom colour palettes (eucalyptus, harvest, charcoal, earth-red, sea-blue), semantic colour mappings, dark mode overrides, and typography defaults |
| `postcss.config.mjs`    | PostCSS config (re-exported for consumers)                    |

Consumed by `apps/site/src/app/globals.css` via `@import '@repo/tailwind-config'`.

## `docs/` -- documentation

| File                | Purpose                                                         |
| ------------------- | --------------------------------------------------------------- |
| `README.md`          | Documentation index and reading order                          |
| `product.md`         | Product overview: personas, pillars, value proposition, metrics |
| `tech.md`            | High-level design: IA, content model, architecture, workflows  |
| `structure.md`       | This file -- project structure reference                       |
| `TODO.md`            | Task tracking and backlog                                      |
| `.markdownlint.yaml` | Markdown lint rules (MD013 and MD024 disabled)                 |

## `.cursor/` -- Cursor IDE commands

```text
.cursor/commands/
├── design.md          # Design phase prompt
├── implement.md       # Implementation prompt
├── requirements.md    # Requirements gathering prompt
├── review-code.md     # Code review prompt
└── review-docs.md     # Documentation review prompt
```

These are Cursor slash commands used to drive the agent workflow for task execution.

## Import aliases

Defined in `apps/site/tsconfig.json`:

| Alias       | Maps to       | Example usage                           |
| ----------- | ------------- | --------------------------------------- |
| `@/*`       | `./src/*`     | `import { cn } from '@/lib/utils'`     |

Shared packages are imported by their package name:

| Package                      | Import                          |
| ---------------------------- | ------------------------------- |
| `@repo/tailwind-config`      | `@import '@repo/tailwind-config'` (CSS) |
| `@repo/eslint-config`        | `import { nextJsConfig } from '@repo/eslint-config/next-js'` |
| `@repo/typescript-config`    | Referenced via `"extends"` in `tsconfig.json` |

## Scripts

### Root scripts (run from repo root)

| Command              | Effect                                  |
| -------------------- | --------------------------------------- |
| `pnpm install`        | Install all workspace dependencies     |
| `pnpm dev`            | Start all dev servers via Turborepo    |
| `pnpm build`          | Build all packages and apps            |
| `pnpm lint`           | Lint all packages and apps             |
| `pnpm typecheck`      | TypeScript check all packages and apps |
| `pnpm test`           | Run all tests                          |
| `pnpm format`         | Format all files with Prettier         |
| `pnpm format:check`   | Check formatting without writing       |

### Site-specific scripts (from `apps/site/`)

| Command              | Effect                         |
| -------------------- | ------------------------------ |
| `pnpm dev`            | `next dev`                    |
| `pnpm build`          | `next build`                  |
| `pnpm start`          | `next start`                  |
| `pnpm lint`           | `eslint .`                    |
| `pnpm typecheck`      | `tsc --noEmit`                |

## Naming conventions summary

| Thing              | Convention                   | Example                       |
| ------------------ | ---------------------------- | ----------------------------- |
| Route folders       | kebab-case                  | `the-property/`, `[slug]/`   |
| Components          | PascalCase `.tsx`           | `HeroSection.tsx`            |
| Hooks               | `use-` prefix, kebab-case   | `use-mobile.ts`              |
| Utilities / lib     | kebab-case `.ts`            | `format-date.ts`             |
| Tests               | `.test.ts` / `.test.tsx`    | `hero-section.test.tsx`      |
| MDX content         | kebab-case `.mdx`           | `slow-roasted-beef.mdx`     |
| Shared packages     | `@repo/<name>`              | `@repo/tailwind-config`     |
