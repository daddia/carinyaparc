---
title: Carinya Parc – High-Level Site Design (Next.js + Sanity)
status: draft
owner: engineering+product
last_updated: 2026-03-02
---

## Goals

- **WordPress-like authoring**: editors can create pages/posts, upload media, preview drafts, schedule publishing, and manage menus without touching code.
- **Fast, SEO-first website**: excellent Core Web Vitals, strong metadata, and clean URLs.
- **Clear information architecture** aligned to the product pillars in `docs/product.md`.
- **Low operational overhead**: simple deployment, minimal “bespoke backend”.
- **Foundation for future offerings**: experiences/workshops, enquiries, partners.

## Non-goals (v1 of the rebuild)

- ✗ Full booking engine (real-time availability, payments, accounts).
- ✗ E-commerce checkout/cart.
- ✗ Multi-property / multi-brand support.

## High-level architecture

### Core systems

- **Next.js site (App Router)**: public website, SEO, forms, and preview mode.
- **Sanity Content Lake**: all structured content (pages, posts, recipes, navigation, redirects, settings).
- **Sanity Studio**: content editing UI (the “WordPress admin” equivalent).
- **Email + forms integrations**: newsletter subscribe + contact/enquiry notifications (provider TBD; MailerLite/Resend are likely fits based on v1 patterns).

### Stack, tooling, and runtime (confirmed)

- **Monorepo tooling**: **Turborepo**
- **Framework**: **Next.js v16** (App Router)
- **Styling**: **Tailwind CSS v4.2**
- **UI primitives**: **Base UI components** (unstyled, accessible primitives) – see [Base UI quick start](https://base-ui.com/react/overview/quick-start)
- **Runtime**: **Node.js v24 LTS**

### Rendering and caching strategy

- **Server-rendered by default** with **static generation where practical** (home, pages, posts, recipes).
- **ISR / revalidation** on publish events from Sanity (webhook → Next.js revalidate tags/paths).
- **Draft preview** for editors using Next.js draft mode + Sanity “preview” client.

### Studio hosting options

- **Option A (recommended)**: deploy Studio as its own app (separate host + auth boundary).
- **Option B**: mount Studio under the Next.js app at `/studio` (simpler mental model; still requires strong access control).

## Information architecture (IA)

### Primary top-level sections

- `/` (Home)
- `/about` (About hub)
  - `/about/the-property`
  - `/about/<story-pages>` (e.g., owners)
- `/regenerate` (Regeneration overview)
- `/stay` (Stay overview + practical expectations)
  - `/stay/enquire` (Enquiry form) ✓ staged feature
- `/blog` (Stories index)
  - `/blog/<slug>` (Story detail)
- `/recipes` (Recipes index)
  - `/recipes/<slug>` (Recipe detail)
- `/subscribe` (Newsletter)
- `/contact` (General contact)
- `/legal/<slug>` (Privacy, terms, etc.)

### URL principles

- ✓ **Avoid root-level dynamic slugs** for posts/recipes (prevents collisions; easier redirects).
- ✓ Prefer stable, human-readable slugs.
- ✓ Support legacy URL redirects via a managed redirect system (see “Redirects”).

## Page types and templates (site-side)

### Core templates

- **Home**: curated sections (hero, pillar intro, featured stories/recipes, subscribe CTA).
- **Landing page** (generic): page builder style sections (hero, rich text, media, CTA, cards).
- **About hub + subpages**: mix of page builder + curated internal links.
- **Regenerate**: overview + featured themes, links to stories.
- **Index pages**:
  - Blog index (filters by category/tag, featured post)
  - Recipe index (filters by category/tag, seasonal emphasis)
- **Detail pages**:
  - Blog post (rich text + media, author, reading time, related posts)
  - Recipe (ingredients, method, notes, servings, time, related recipes)
- **Utility pages**:
  - Subscribe
  - Contact / Enquiry
  - Legal

### WordPress-like features mapping

- **Pages**: `page` documents with optional “sections” array (page builder).
- **Posts**: `post` documents with rich content (Portable Text) + taxonomy.
- **Categories / tags**: `category` + `tag` documents (or tags as inline strings if we want to start simpler).
- **Media library**: Sanity assets (with required alt text and optional hotspot/crop).
- **Menus**: `navigationMenu` (or `siteSettings.navigation`) editable in Studio.
- **SEO plugin equivalent**: per-document `seo` object + global defaults in `siteSettings`.
- **Redirect plugin equivalent**: `redirect` documents editable in Studio, synced to Next.js.

## Sanity content model (high level)

### Singleton documents

- **`siteSettings`** (single)
  - **Brand**: site title, default OG image, social links
  - **SEO defaults**: title template, default description, robots defaults
  - **Navigation**: references to menus or embedded menu structures
  - **Integrations**: newsletter configuration references (no secrets stored in Sanity)

### Core documents

- **`page`**
  - **title**
  - **slug**
  - **excerpt / summary**
  - **sections[]** (page builder blocks)
  - **seo**
  - **publish fields** (publishedAt, updatedAt)

- **`post`**
  - **title**
  - **slug**
  - **excerpt**
  - **coverImage**
  - **content** (Portable Text)
  - **authors[]** (refs)
  - **categories[]** (refs)
  - **tags[]** (refs or strings)
  - **featured** (boolean)
  - **publishedAt**
  - **seo**

- **`recipe`**
  - **title**
  - **slug**
  - **excerpt**
  - **coverImage**
  - **intro** (Portable Text, short)
  - **ingredients[]** (structured)
  - **method[]** (structured steps, Portable Text per step if needed)
  - **serves / yield**
  - **time** (prep/cook/total)
  - **categories[] / tags[]**
  - **publishedAt**
  - **seo**
  - **schema overrides** (optional; for JSON-LD)

- **`person`** (or `author`)
  - **name**
  - **slug** (optional; only if we want author pages)
  - **bio**
  - **image**
  - **social links**

- **`navigationMenu`**
  - **title** (e.g., Header, Footer)
  - **items[]**: label + link (internal reference or external URL) + optional children

- **`redirect`**
  - **from** (path)
  - **to** (path or URL)
  - **statusCode** (301/302)
  - **enabled**
  - **notes**

- **Taxonomies**
  - **`category`** (title, slug, description)
  - **`tag`** (title, slug)

### Reusable objects

- **`seo`** (object on many docs)
  - metaTitle, metaDescription, ogImage, noindex/nofollow (where appropriate)
  - canonicalUrl override (rare)

- **`link`** (object)
  - internal reference OR external URL, plus label

- **`pageSection*`** blocks (page builder)
  - hero, richText, imageGallery, quote, callToAction, cardsGrid, featuredPosts, featuredRecipes

## Editorial workflow

### Roles and permissions (baseline)

- **Admin**: schema + settings + all content.
- **Editor**: publish/unpublish, manage redirects/menus.
- **Author**: create/edit drafts of posts/recipes; publish optional (depending on team preferences).

### Draft previews (must-have)

- Editors click “Preview” in Studio → opens the corresponding Next.js route in draft mode.
- Preview must support:
  - Unpublished drafts
  - Scheduled posts (seeing future content before it’s live)

### Scheduled publishing

- Use Sanity scheduled publish for posts/pages where needed.
- Ensure publish events trigger Next.js revalidation.

## SEO, discovery, and metadata

- **Per-page metadata** from `seo` + sensible defaults from `siteSettings`.
- **Sitemap**:
  - includes pages, posts, recipes
  - excludes drafts and noindex content
- **Robots**:
  - production locked down for Studio URLs if they exist under the same domain
- **Structured data**:
  - Article schema for posts
  - Recipe schema for recipes
  - Breadcrumb schema for major sections

## Redirects and legacy URL handling

- Store redirects in Sanity (`redirect` documents).
- Provide a Next.js middleware/route handler to apply redirects quickly at the edge.
- Plan a migration pass that:
  - inventories existing URLs
  - sets 301s for any changed paths
  - keeps canonical URLs stable going forward

## Forms and “functional” flows

### Newsletter subscribe

- Dedicated page `/subscribe` plus embeddable subscribe CTA blocks.
- Double opt-in capability (provider dependent).
- Spam controls:
  - honeypot field
  - timing checks
  - basic rate limiting (by IP/email)

### Contact / stay enquiries (staged)

- `/contact` for general queries.
- `/stay/enquire` for stay enquiries with a slightly richer form.
- Email delivery via transactional provider + internal notifications.

## Observability, performance, and accessibility (baseline requirements)

- **Performance**:
  - minimise client JS
  - image optimisation via Sanity CDN + Next/Image
  - cache with ISR + publish-triggered revalidation
- **Accessibility**:
  - semantic headings, keyboard navigation, focus states
  - alt text required for meaningful images
- **Observability**:
  - error monitoring on server/runtime paths
  - basic analytics for engagement + newsletter conversions

## Migration approach (from existing site)

- **Phase 1 (foundation)**:
  - define schemas + Studio structure
  - build core templates in Next.js
  - implement preview + publish revalidation
- **Phase 2 (content migration)**:
  - migrate key pages (home/about/regenerate/stay)
  - migrate posts and recipes (scripted import where possible)
  - add redirects for any URL changes
- **Phase 3 (enhancements)**:
  - refine page builder blocks
  - add taxonomy pages (category/tag indexes)
  - add enquiry flow

## Open decisions (to resolve early)

- **Studio hosting**: separate deployment vs `/studio` inside Next.js.
- **Taxonomy complexity**: tags as references vs simple string arrays.
- **Page builder scope**: minimal section set vs richer modular system.
- **Search**: none initially vs lightweight search (client-side index) vs external (Algolia).

