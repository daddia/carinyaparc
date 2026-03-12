---
title: Carinya Parc – Phase 1 Roadmap
status: draft
owner: engineering+product
last_updated: 2026-03-02
---

# Phase 1: Replace Existing Site

> Objective: stand up the new Next.js + Sanity site with feature parity to the
> existing v1 site at `carinyaparc.com.au-v1`, then cut over.

---

## Conventions

- **Project key:** CP
- **Task ID:** CP-{epic}-{seq} (e.g. CP-01-001)
- **Status:** Not started | In progress | Blocked | In review | Done
- **Priority:** P0 (Critical) | P1 (High) | P2 (Medium) | P3 (Low)
- **Estimate:** Story points (Fibonacci: 1, 2, 3, 5, 8, 13)
- **DoD (global):**
  - Code merged to main
  - Lint, typecheck, and tests passing
  - Types generated and valid
  - Documentation updated

---

## Epic 1: Monorepo and Tooling Foundation

### [CP-01] Repository Bootstrap

- [x] **[CP-01-001] Initialise Turborepo monorepo**
  - **Status:** Done | **Priority:** P0 | **Estimate:** 3
  - **Deliverable:** Root `package.json`, `turbo.json`, `pnpm-workspace.yaml`
  - **Acceptance:**
    - ✓ pnpm workspace configured
    - ✓ Turborepo pipeline defined (dev, build, lint, typecheck, test)
    - ✓ Node.js v24 LTS enforced via `engines` and `.nvmrc`
    - ✓ `pnpm install` succeeds

- [x] **[CP-01-002] Create `apps/site` Next.js application**
  - **Status:** Done | **Priority:** P0 | **Estimate:** 3
  - **Deliverable:** Next.js v16 App Router app in `apps/site/`
  - **Acceptance:**
    - ✓ Next.js v16 installed with App Router
    - ✓ TypeScript configured
    - ✓ Tailwind CSS v4.2 configured
    - ✓ Base UI installed (`@base-ui/react`)
    - ✓ `pnpm dev` starts dev server
    - ✓ `pnpm build` succeeds

- [x] **[CP-01-003] Configure shared tooling**
  - **Status:** Done | **Priority:** P0 | **Estimate:** 2
  - **Deliverable:** ESLint, Prettier, TypeScript configs
  - **Acceptance:**
    - ✓ ESLint configured (shared config package or root config)
    - ✓ Prettier configured
    - ✓ TypeScript strict mode enabled
    - ✓ `pnpm lint` and `pnpm typecheck` pass
    - ✓ `.gitignore`, `.prettierignore` set up

- [ ] **[CP-01-004] Configure environment variables**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 1
  - **Deliverable:** `.env.example` with all required variables
  - **Acceptance:**
    - [] `NEXT_PUBLIC_SANITY_PROJECT_ID` placeholder
    - [] `NEXT_PUBLIC_SANITY_DATASET` placeholder
    - [] `SANITY_API_READ_TOKEN` placeholder
    - [] Secrets kept out of Git (`.env.local` in `.gitignore`)

---

## Epic 2: Sanity Project and Studio

### [CP-02] Sanity Project Setup

- [ ] **[CP-02-001] Create Sanity project and datasets**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 2
  - **Deliverable:** Sanity project with `production` and `development` datasets
  - **Acceptance:**
    - [] Project created at sanity.io/manage
    - [] `production` dataset for live content
    - [] `development` dataset for testing
    - [] Project ID and dataset names documented
    - [] CORS origins configured for localhost and production domain

- [ ] **[CP-02-002] Install Sanity dependencies**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 1
  - **Deliverable:** Sanity packages in `apps/site`
  - **Acceptance:**
    - [] `sanity`, `next-sanity` installed
    - [] `@sanity/image-url`, `@sanity/vision` installed
    - [] `@portabletext/react` installed

- [ ] **[CP-02-003] Create Sanity client configuration**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 2
  - **Deliverable:** `apps/site/src/sanity/lib/client.ts`
  - **Acceptance:**
    - [] Client configured with projectId, dataset, apiVersion
    - [] CDN configured for published content
    - [] Stega encoding configured for visual editing
    - [] Types exported

- [ ] **[CP-02-004] Create live content and fetch configuration**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 3
  - **Deliverable:** `apps/site/src/sanity/lib/live.ts`
  - **Acceptance:**
    - [] `defineLive` configured
    - [] `sanityFetch` function exported for server components
    - [] `SanityLive` component exported for layout
    - [] Tag-based revalidation supported

- [ ] **[CP-02-005] Create image URL builder**
  - **Status:** Not started | **Priority:** P1 | **Estimate:** 1
  - **Deliverable:** `apps/site/src/sanity/lib/image.ts`
  - **Acceptance:**
    - [] `urlFor` helper exported
    - [] TypeScript types for Sanity image references

---

### [CP-03] Sanity Studio

- [ ] **[CP-03-001] Create `sanity.config.ts`**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 3
  - **Deliverable:** `apps/site/sanity.config.ts`
  - **Acceptance:**
    - [] `structureTool` plugin configured
    - [] `visionTool` plugin configured
    - [] `presentationTool` plugin configured for visual editing
    - [] Schema types registered

- [ ] **[CP-03-002] Create Studio route in Next.js**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 2
  - **Deliverable:** `apps/site/src/app/studio/[[...tool]]/page.tsx` and `layout.tsx`
  - **Acceptance:**
    - [] Studio renders at `/studio`
    - [] Dedicated layout without site header/footer
    - [] Authentication via Sanity login
    - [] No style conflicts with site CSS

- [ ] **[CP-03-003] Configure Studio structure (sidebar)**
  - **Status:** Not started | **Priority:** P1 | **Estimate:** 3
  - **Deliverable:** Custom structure builder for Studio sidebar
  - **Acceptance:**
    - [] Singleton for Site Settings
    - [] Grouped sections: Content (Posts, Recipes, Pages), Taxonomy (Categories, Tags), Navigation, Redirects, Settings
    - [] Logical ordering for editors

---

## Epic 3: Sanity Content Model

### [CP-04] Core Document Schemas

- [ ] **[CP-04-001] Create `siteSettings` singleton schema**
  - **Status:** Not started | **Priority:** P1 | **Estimate:** 3
  - **Deliverable:** `apps/site/src/sanity/schemas/singletons/siteSettings.ts`
  - **Acceptance:**
    - [] Fields: siteName, siteDescription, defaultOgImage
    - [] Fields: socialLinks[] (platform + URL), contactEmail
    - [] Fields: defaultSeo (title template, description, robots)
    - [] Singleton pattern enforced in Studio structure

- [ ] **[CP-04-002] Create `person` (author) schema**
  - **Status:** Not started | **Priority:** P1 | **Estimate:** 2
  - **Deliverable:** `apps/site/src/sanity/schemas/documents/person.ts`
  - **Acceptance:**
    - [] Fields: name, slug, bio (Portable Text), image (with alt text)
    - [] Slug auto-generated from name
    - [] Preview configured

- [ ] **[CP-04-003] Create `category` schema**
  - **Status:** Not started | **Priority:** P1 | **Estimate:** 2
  - **Deliverable:** `apps/site/src/sanity/schemas/documents/category.ts`
  - **Acceptance:**
    - [] Fields: title, slug, description
    - [] Hierarchical (optional parent reference)
    - [] Slug auto-generated

- [ ] **[CP-04-004] Create `tag` schema**
  - **Status:** Not started | **Priority:** P2 | **Estimate:** 1
  - **Deliverable:** `apps/site/src/sanity/schemas/documents/tag.ts`
  - **Acceptance:**
    - [] Fields: title, slug
    - [] Slug auto-generated

- [ ] **[CP-04-005] Create `post` schema**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 5
  - **Deliverable:** `apps/site/src/sanity/schemas/documents/post.ts`
  - **Acceptance:**
    - [] Fields: title, slug, excerpt, coverImage, featured (boolean)
    - [] Fields: content (Portable Text), authors[] (refs), categories[] (refs), tags[] (refs)
    - [] Fields: publishedAt, seo object
    - [] Validation: required title, slug, publishedAt
    - [] Preview: title, date, author, image
    - [] Orderings: by date, by title

- [ ] **[CP-04-006] Create `recipe` schema**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 5
  - **Deliverable:** `apps/site/src/sanity/schemas/documents/recipe.ts`
  - **Acceptance:**
    - [] Fields: title, slug, excerpt, coverImage
    - [] Fields: intro (Portable Text), ingredients[] (structured), method[] (Portable Text steps)
    - [] Fields: servings, prepTime, cookTime, totalTime
    - [] Fields: categories[] (refs), tags[] (refs), publishedAt, seo object
    - [] Preview: title, image, total time

- [ ] **[CP-04-007] Create `page` schema (including legal pages)**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 3
  - **Deliverable:** `apps/site/src/sanity/schemas/documents/page.ts`
  - **Acceptance:**
    - [] Fields: title, slug, body (Portable Text), seo object
    - [] Optional parent page (hierarchical)
    - [] Optional pageType field (e.g., "legal") for filtering
    - [] Legal pages supported with lastUpdated field

- [ ] **[CP-04-008] Create `navigationMenu` schema**
  - **Status:** Not started | **Priority:** P1 | **Estimate:** 3
  - **Deliverable:** `apps/site/src/sanity/schemas/documents/navigationMenu.ts`
  - **Acceptance:**
    - [] Fields: title (e.g., "Header", "Footer"), items[]
    - [] Items: label, link (internal ref or external URL), children[]
    - [] Supports nested items for submenus
    - [] Preview shows menu name and item count

- [ ] **[CP-04-009] Create `redirect` schema**
  - **Status:** Not started | **Priority:** P2 | **Estimate:** 2
  - **Deliverable:** `apps/site/src/sanity/schemas/documents/redirect.ts`
  - **Acceptance:**
    - [] Fields: from (path), to (path or URL), statusCode (301/302), enabled, notes
    - [] Validation: from must start with `/`

---

### [CP-05] Object and Block Schemas

- [ ] **[CP-05-001] Create Portable Text schema (rich text)**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 5
  - **Deliverable:** `apps/site/src/sanity/schemas/objects/portableText.ts`
  - **Acceptance:**
    - [] Blocks: paragraph, h2, h3, h4, blockquote
    - [] Decorators: strong, em, underline, strikethrough, code
    - [] Annotations: link (internal/external)
    - [] Custom blocks: image (with alt/caption), callout
    - [] Lists: bullet, numbered

- [ ] **[CP-05-002] Create `recipeIngredient` object schema**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 2
  - **Deliverable:** `apps/site/src/sanity/schemas/objects/recipeIngredient.ts`
  - **Acceptance:**
    - [] Fields: quantity, unit, name, notes (optional)
    - [] Preview: formatted ingredient string

- [ ] **[CP-05-003] Create `seo` object schema**
  - **Status:** Not started | **Priority:** P1 | **Estimate:** 2
  - **Deliverable:** `apps/site/src/sanity/schemas/objects/seo.ts`
  - **Acceptance:**
    - [] Fields: metaTitle, metaDescription, ogImage
    - [] Character count validation (title ~60, description ~160)
    - [] Optional noindex, canonicalUrl

- [ ] **[CP-05-004] Create `link` object schema**
  - **Status:** Not started | **Priority:** P1 | **Estimate:** 1
  - **Deliverable:** `apps/site/src/sanity/schemas/objects/link.ts`
  - **Acceptance:**
    - [] Fields: label, internal reference OR external URL
    - [] Validation: one of internal/external required

- [ ] **[CP-05-005] Create schema index and register all types**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 1
  - **Deliverable:** `apps/site/src/sanity/schemas/index.ts`
  - **Acceptance:**
    - [] All document and object types exported as `schemaTypes` array
    - [] Imported by `sanity.config.ts`

- [ ] **[CP-05-006] Generate TypeScript types (typegen)**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 2
  - **Deliverable:** Generated types in `apps/site/src/sanity/types/`
  - **Acceptance:**
    - [] `sanity typegen generate` runs successfully
    - [] Types for all document and object schemas
    - [] TypeScript build passes

---

## Epic 4: GROQ Queries and Data Fetching

### [CP-06] Query Definitions

- [ ] **[CP-06-001] Create post queries**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 3
  - **Deliverable:** `apps/site/src/sanity/lib/queries/posts.ts`
  - **Acceptance:**
    - [] `POSTS_QUERY` -- list all published posts (paginated, sorted by date)
    - [] `POST_BY_SLUG_QUERY` -- single post with expanded author, categories, tags
    - [] `FEATURED_POSTS_QUERY` -- posts where featured == true
    - [] All queries use `defineQuery` for type safety

- [ ] **[CP-06-002] Create recipe queries**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 3
  - **Deliverable:** `apps/site/src/sanity/lib/queries/recipes.ts`
  - **Acceptance:**
    - [] `RECIPES_QUERY` -- list all published recipes
    - [] `RECIPE_BY_SLUG_QUERY` -- single recipe with ingredients, method, time fields

- [ ] **[CP-06-003] Create page and supporting queries**
  - **Status:** Not started | **Priority:** P1 | **Estimate:** 2
  - **Deliverable:** `apps/site/src/sanity/lib/queries/pages.ts` + `settings.ts`
  - **Acceptance:**
    - [] `PAGE_BY_SLUG_QUERY` -- page content by slug
    - [] `LEGAL_PAGES_QUERY` -- all legal pages
    - [] `SITE_SETTINGS_QUERY` -- singleton settings
    - [] `NAVIGATION_QUERY` -- navigation menus by title
    - [] `REDIRECTS_QUERY` -- all enabled redirects

- [ ] **[CP-06-004] Create data fetching functions**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 3
  - **Deliverable:** `apps/site/src/sanity/lib/fetchers.ts`
  - **Acceptance:**
    - [] `getPosts()`, `getPostBySlug()`, `getFeaturedPosts()`
    - [] `getRecipes()`, `getRecipeBySlug()`
    - [] `getPageBySlug()`, `getSiteSettings()`, `getNavigation()`
    - [] All functions use `sanityFetch` with appropriate tags
    - [] Null handling for missing content

---

## Epic 5: Site Layout and Global Components

### [CP-07] Root Layout and Navigation

- [ ] **[CP-07-001] Create root layout**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 5
  - **Deliverable:** `apps/site/src/app/layout.tsx`
  - **Acceptance:**
    - [] HTML structure with metadata, fonts, global styles
    - [] Header component (fetches navigation from Sanity)
    - [] Footer component (fetches footer nav, social links from Sanity)
    - [] `SanityLive` component for revalidation
    - [] Cookie consent banner
    - [] Analytics integration points (GTM, Vercel Analytics)

- [ ] **[CP-07-002] Build Header component**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 5
  - **Deliverable:** `apps/site/src/components/header/`
  - **Acceptance:**
    - [] Logo + site name
    - [] Desktop navigation from Sanity menu data
    - [] Mobile hamburger menu with slide-out panel
    - [] Accessible (keyboard navigation, ARIA)
    - [] Styled with Tailwind + Base UI primitives where useful

- [ ] **[CP-07-003] Build Footer component**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 3
  - **Deliverable:** `apps/site/src/components/footer/`
  - **Acceptance:**
    - [] Footer navigation columns from Sanity
    - [] Social links from site settings
    - [] Legal links (privacy, terms)
    - [] Copyright line

- [ ] **[CP-07-004] Create 404 page**
  - **Status:** Not started | **Priority:** P1 | **Estimate:** 1
  - **Deliverable:** `apps/site/src/app/not-found.tsx`
  - **Acceptance:**
    - [] Friendly message with links to key sections
    - [] Consistent with site layout

- [ ] **[CP-07-005] Create global error page**
  - **Status:** Not started | **Priority:** P2 | **Estimate:** 1
  - **Deliverable:** `apps/site/src/app/global-error.tsx`
  - **Acceptance:**
    - [] User-friendly error message
    - [] Error reporting hook (e.g., Sentry integration point)

---

## Epic 6: Page Templates and Routes

### [CP-08] Home Page

- [ ] **[CP-08-001] Build home page**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 8
  - **Deliverable:** `apps/site/src/app/page.tsx` + section components
  - **Acceptance:**
    - [] Hero section with headline, subhead, and CTA
    - [] Pillar intro sections (Stay, Regenerate, Food, Learn)
    - [] Featured posts section (from Sanity)
    - [] Newsletter subscribe CTA
    - [] Strong visual sense of place (photography)
    - [] Metadata and JSON-LD organisation schema

---

### [CP-09] About Section

- [ ] **[CP-09-001] Build `/about` hub page**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 3
  - **Deliverable:** `apps/site/src/app/about/page.tsx`
  - **Acceptance:**
    - [] Overview of Carinya Parc story
    - [] Links to subpages (The Property, Jonathan)
    - [] Metadata

- [ ] **[CP-09-002] Build `/about/the-property` page**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 3
  - **Deliverable:** `apps/site/src/app/about/the-property/page.tsx`
  - **Acceptance:**
    - [] Property story, land, and context
    - [] Photography
    - [] Metadata

- [ ] **[CP-09-003] Build `/about/jonathan` page**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 2
  - **Deliverable:** `apps/site/src/app/about/jonathan/page.tsx`
  - **Acceptance:**
    - [] Personal story of the owner
    - [] Photography
    - [] Metadata

---

### [CP-10] Regenerate Page

- [ ] **[CP-10-001] Build `/regenerate` page**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 3
  - **Deliverable:** `apps/site/src/app/regenerate/page.tsx`
  - **Acceptance:**
    - [] Regeneration overview and themes
    - [] Links to related blog posts
    - [] Photography
    - [] Metadata

---

### [CP-11] Blog

- [ ] **[CP-11-001] Build blog index page**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 5
  - **Deliverable:** `apps/site/src/app/blog/page.tsx`
  - **Acceptance:**
    - [] List of published posts from Sanity (sorted by date)
    - [] Post cards with cover image, title, excerpt, date
    - [] Featured post highlight
    - [] Pagination (or load-more)
    - [] Metadata

- [ ] **[CP-11-002] Build blog post detail page**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 5
  - **Deliverable:** `apps/site/src/app/blog/[slug]/page.tsx`
  - **Acceptance:**
    - [] Fetches post by slug from Sanity
    - [] Renders Portable Text content
    - [] Author attribution, published date, reading time
    - [] Cover image
    - [] Categories and tags displayed
    - [] `generateStaticParams` for static generation
    - [] 404 for missing slugs
    - [] Article JSON-LD structured data
    - [] SEO metadata from post.seo or defaults

---

### [CP-12] Recipes

- [ ] **[CP-12-001] Build recipe index page**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 3
  - **Deliverable:** `apps/site/src/app/recipes/page.tsx`
  - **Acceptance:**
    - [] List of published recipes from Sanity
    - [] Recipe cards with image, title, time, servings
    - [] Metadata

- [ ] **[CP-12-002] Build recipe detail page**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 5
  - **Deliverable:** `apps/site/src/app/recipes/[slug]/page.tsx`
  - **Acceptance:**
    - [] Fetches recipe by slug from Sanity
    - [] Structured ingredients list
    - [] Method steps (Portable Text)
    - [] Time display (prep, cook, total), servings
    - [] `generateStaticParams` for static generation
    - [] 404 for missing slugs
    - [] Recipe JSON-LD structured data
    - [] SEO metadata

---

### [CP-13] Utility Pages

- [ ] **[CP-13-001] Build `/legal/[slug]` page**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 2
  - **Deliverable:** `apps/site/src/app/legal/[slug]/page.tsx`
  - **Acceptance:**
    - [] Fetches legal page by slug from Sanity
    - [] Renders Portable Text content
    - [] Shows last updated date
    - [] `generateStaticParams` for privacy-policy, terms-of-service
    - [] Metadata with noindex if desired

- [ ] **[CP-13-002] Build `/subscribe` page**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 3
  - **Deliverable:** `apps/site/src/app/subscribe/page.tsx`
  - **Acceptance:**
    - [] Newsletter subscription form
    - [] Positioning of newsletter value proposition
    - [] Success/error feedback
    - [] Metadata

- [ ] **[CP-13-003] Build `/contact` page**
  - **Status:** Not started | **Priority:** P1 | **Estimate:** 3
  - **Deliverable:** `apps/site/src/app/contact/page.tsx`
  - **Acceptance:**
    - [] Contact form (name, email, message)
    - [] Success/error feedback
    - [] Metadata

---

## Epic 7: Portable Text and Content Rendering

### [CP-14] Rendering Components

- [ ] **[CP-14-001] Create Portable Text renderer**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 5
  - **Deliverable:** `apps/site/src/components/sanity/PortableText.tsx`
  - **Acceptance:**
    - [] Block components: headings (h2-h4), paragraph, blockquote
    - [] Mark components: link (internal/external), strong, em, code
    - [] Custom components: image (with caption), callout
    - [] List components: bullet, numbered
    - [] Styled with Tailwind matching site design
    - [] Accessible, semantic HTML

- [ ] **[CP-14-002] Create Sanity image component**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 3
  - **Deliverable:** `apps/site/src/components/sanity/SanityImage.tsx`
  - **Acceptance:**
    - [] Uses Next.js `<Image>` with Sanity CDN URL
    - [] Responsive sizing via `srcSet`
    - [] Alt text from Sanity asset metadata
    - [] Blur placeholder
    - [] Hotspot/crop support

---

## Epic 8: API Routes and Forms

### [CP-15] Form Backends

- [ ] **[CP-15-001] Create newsletter subscribe API route**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 3
  - **Deliverable:** `apps/site/src/app/api/subscribe/route.ts`
  - **Acceptance:**
    - [] POST handler for email subscription
    - [] Validation (email format, required fields)
    - [] Spam controls: honeypot, timing check, rate limiting
    - [] Integration with email provider (MailerLite or equivalent)
    - [] Error handling with meaningful responses

- [ ] **[CP-15-002] Create contact form API route**
  - **Status:** Not started | **Priority:** P1 | **Estimate:** 3
  - **Deliverable:** `apps/site/src/app/api/contact/route.ts`
  - **Acceptance:**
    - [] POST handler for contact submissions
    - [] Validation (name, email, message)
    - [] Spam controls: honeypot, timing check, rate limiting
    - [] Email notification to site owner (via Resend or equivalent)
    - [] Error handling

- [ ] **[CP-15-003] Create subscribe form component**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 3
  - **Deliverable:** `apps/site/src/components/forms/SubscribeForm.tsx`
  - **Acceptance:**
    - [] Email input with validation
    - [] Submit to `/api/subscribe`
    - [] Loading, success, and error states
    - [] Reusable in page and CTA block contexts

- [ ] **[CP-15-004] Create contact form component**
  - **Status:** Not started | **Priority:** P1 | **Estimate:** 3
  - **Deliverable:** `apps/site/src/components/forms/ContactForm.tsx`
  - **Acceptance:**
    - [] Name, email, message fields
    - [] Submit to `/api/contact`
    - [] Loading, success, and error states

---

## Epic 9: SEO, Metadata, and Structured Data

### [CP-16] SEO Infrastructure

- [ ] **[CP-16-001] Create metadata utility**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 3
  - **Deliverable:** `apps/site/src/lib/metadata.ts`
  - **Acceptance:**
    - [] Generates Next.js `Metadata` from Sanity `seo` object + `siteSettings` defaults
    - [] Title template (e.g., `%s | Carinya Parc`)
    - [] Open Graph image from seo.ogImage or default
    - [] Canonical URL generation
    - [] Robots directives

- [ ] **[CP-16-002] Create JSON-LD structured data helpers**
  - **Status:** Not started | **Priority:** P1 | **Estimate:** 3
  - **Deliverable:** `apps/site/src/lib/schema/`
  - **Acceptance:**
    - [] Organisation schema (home page)
    - [] Article schema (blog posts)
    - [] Recipe schema (recipes -- ingredients, time, servings)
    - [] Breadcrumb schema (all pages)

- [ ] **[CP-16-003] Create sitemap**
  - **Status:** Not started | **Priority:** P1 | **Estimate:** 2
  - **Deliverable:** `apps/site/src/app/sitemap.ts`
  - **Acceptance:**
    - [] Includes all published pages, posts, recipes
    - [] Excludes drafts and noindex content
    - [] Dynamic -- fetches slugs from Sanity

- [ ] **[CP-16-004] Create robots.txt**
  - **Status:** Not started | **Priority:** P1 | **Estimate:** 1
  - **Deliverable:** `apps/site/public/robots.txt` or `apps/site/src/app/robots.ts`
  - **Acceptance:**
    - [] Allows crawling of public pages
    - [] Disallows `/studio`, `/api`
    - [] References sitemap URL

---

## Epic 10: Visual Editing and Draft Preview

### [CP-17] Preview Infrastructure

- [ ] **[CP-17-001] Create draft mode API routes**
  - **Status:** Not started | **Priority:** P1 | **Estimate:** 3
  - **Deliverable:** `apps/site/src/app/api/draft-mode/enable/route.ts` + `disable/route.ts`
  - **Acceptance:**
    - [] Enable route validates Sanity preview secret
    - [] Sets Next.js draft mode cookie
    - [] Disable route clears draft mode
    - [] Security: token validation

- [ ] **[CP-17-002] Add VisualEditing to layout**
  - **Status:** Not started | **Priority:** P1 | **Estimate:** 2
  - **Deliverable:** Updated root layout with conditional `VisualEditing`
  - **Acceptance:**
    - [] `VisualEditing` renders only in draft mode
    - [] Stega encoding enables click-to-edit in Studio presentation view
    - [] Draft mode indicator visible to editors

- [ ] **[CP-17-003] Configure presentation tool resolve function**
  - **Status:** Not started | **Priority:** P2 | **Estimate:** 2
  - **Deliverable:** `apps/site/src/sanity/lib/resolve.ts`
  - **Acceptance:**
    - [] Maps: post -> `/blog/[slug]`, recipe -> `/recipes/[slug]`, page -> `/[slug]` or `/legal/[slug]`
    - [] Settings -> `/`

---

## Epic 11: Redirects and Legacy URL Handling

### [CP-18] Redirect System

- [ ] **[CP-18-001] Implement redirect middleware**
  - **Status:** Not started | **Priority:** P1 | **Estimate:** 3
  - **Deliverable:** `apps/site/src/middleware.ts`
  - **Acceptance:**
    - [] Fetches enabled redirects from Sanity (cached)
    - [] Applies 301/302 redirects at the edge
    - [] Falls through for non-matching paths
    - [] Handles trailing slashes consistently

- [ ] **[CP-18-002] Inventory v1 URLs and create redirect map**
  - **Status:** Not started | **Priority:** P1 | **Estimate:** 2
  - **Deliverable:** Redirect documents created in Sanity
  - **Acceptance:**
    - [] All v1 blog post URLs mapped (verify slug parity)
    - [] All v1 recipe URLs mapped
    - [] Any changed paths have 301 redirects
    - [] Dead links from v1 footer (e.g., `/products`) handled gracefully

---

## Epic 12: Content Migration

### [CP-19] Migration Scripts

- [ ] **[CP-19-001] Create migration utility**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 3
  - **Deliverable:** `scripts/migrate-to-sanity.ts`
  - **Acceptance:**
    - [] Connects to Sanity with write token
    - [] Batch document creation
    - [] Error handling and logging
    - [] Dry-run mode

- [ ] **[CP-19-002] Migrate authors**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 1
  - **Deliverable:** Author documents in Sanity
  - **Acceptance:**
    - [] "Jonathan Daddia" author created with bio and image
    - [] Slug generated

- [ ] **[CP-19-003] Migrate blog posts (8 posts)**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 5
  - **Deliverable:** All 8 blog posts in Sanity
  - **Acceptance:**
    - [] MDX content converted to Portable Text
    - [] Frontmatter mapped to schema fields
    - [] Images uploaded to Sanity
    - [] Author, categories, and tags linked
    - [] Slugs preserved for URL continuity

- [ ] **[CP-19-004] Migrate recipes (3 recipes)**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 3
  - **Deliverable:** All 3 recipes in Sanity
  - **Acceptance:**
    - [] Ingredients as structured data
    - [] Instructions as Portable Text
    - [] Time fields preserved
    - [] Slugs preserved

- [ ] **[CP-19-005] Migrate legal pages**
  - **Status:** Not started | **Priority:** P1 | **Estimate:** 2
  - **Deliverable:** Privacy policy and terms of service in Sanity
  - **Acceptance:**
    - [] Content converted to Portable Text
    - [] Slugs preserved (privacy-policy, terms-of-service)

- [ ] **[CP-19-006] Create navigation menus**
  - **Status:** Not started | **Priority:** P1 | **Estimate:** 1
  - **Deliverable:** Header and Footer navigation menu documents in Sanity
  - **Acceptance:**
    - [] Header menu matches v1 visible nav items
    - [] Footer menu matches v1 footer columns and links

- [ ] **[CP-19-007] Create site settings**
  - **Status:** Not started | **Priority:** P1 | **Estimate:** 1
  - **Deliverable:** Site settings singleton in Sanity
  - **Acceptance:**
    - [] Site name, description, default OG image set
    - [] Social links (YouTube, GitHub) set
    - [] Contact email set

---

### [CP-20] Content Verification

- [ ] **[CP-20-001] Verify all migrated content**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 2
  - **Deliverable:** Verification checklist completed
  - **Acceptance:**
    - [] All 8 posts visible and correct in Studio
    - [] All 3 recipes visible and correct
    - [] Legal pages correct
    - [] Images displaying correctly
    - [] References resolved

- [ ] **[CP-20-002] URL parity check**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 1
  - **Deliverable:** All URLs match or redirect correctly
  - **Acceptance:**
    - [] `/blog/[slug]` routes match v1
    - [] `/recipes/[slug]` routes match v1
    - [] `/legal/[slug]` routes match v1
    - [] No 404s for existing content

---

## Epic 13: Testing and Validation

### [CP-21] Test Suite

- [ ] **[CP-21-001] Set up test infrastructure**
  - **Status:** Not started | **Priority:** P1 | **Estimate:** 2
  - **Deliverable:** Vitest or equivalent configured
  - **Acceptance:**
    - [] Test runner configured in `apps/site`
    - [] `pnpm test` works from root
    - [] Mocking strategy for Sanity client

- [ ] **[CP-21-002] Write smoke tests for all routes**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 3
  - **Deliverable:** Smoke tests for every public route
  - **Acceptance:**
    - [] Home, About, About/The-Property, About/Jonathan render
    - [] Regenerate renders
    - [] Blog index and blog post detail render
    - [] Recipe index and recipe detail render
    - [] Legal pages render
    - [] Subscribe, Contact render
    - [] 404 page renders for unknown routes

- [ ] **[CP-21-003] Pre-flight checks pass**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 1
  - **Deliverable:** All checks green
  - **Acceptance:**
    - [] `pnpm lint`
    - [] `pnpm typecheck`
    - [] `pnpm test`
    - [] `pnpm build`

---

## Epic 14: Deployment and Go-Live

### [CP-22] Vercel Deployment

- [ ] **[CP-22-001] Configure Vercel project**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 2
  - **Deliverable:** Vercel project linked to repo
  - **Acceptance:**
    - [] All environment variables set in Vercel
    - [] Preview deployments use `development` dataset
    - [] Production deployment uses `production` dataset
    - [] Build command and output directory configured for monorepo

- [ ] **[CP-22-002] Configure Sanity webhook for revalidation**
  - **Status:** Not started | **Priority:** P1 | **Estimate:** 2
  - **Deliverable:** Webhook in Sanity project settings
  - **Acceptance:**
    - [] Triggers on content publish/unpublish
    - [] Calls Next.js revalidation endpoint
    - [] Tag-based revalidation for targeted cache invalidation

- [ ] **[CP-22-003] Deploy to production**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 1
  - **Deliverable:** Site live on production domain
  - **Acceptance:**
    - [] Build succeeds on Vercel
    - [] All pages accessible
    - [] Studio accessible at `/studio`

### [CP-23] Post-Deploy Validation

- [ ] **[CP-23-001] Production validation**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 2
  - **Deliverable:** Production sign-off
  - **Acceptance:**
    - [] All posts render correctly
    - [] All recipes render correctly
    - [] Legal pages render correctly
    - [] Forms submit correctly (subscribe, contact)
    - [] Visual editing works in production Studio
    - [] Redirects working for any changed URLs
    - [] Lighthouse performance score acceptable
    - [] No console errors

- [ ] **[CP-23-002] DNS cutover**
  - **Status:** Not started | **Priority:** P0 | **Estimate:** 1
  - **Deliverable:** Production domain pointing to new site
  - **Acceptance:**
    - [] Domain configured in Vercel
    - [] SSL certificate active
    - [] Old site stood down or redirecting
    - [] Monitoring active for errors post-cutover

---

## Summary

| Epic                                   | Tasks  | Estimate (SP) |
| -------------------------------------- | ------ | ------------- |
| 1. Monorepo and Tooling Foundation     | 4      | 9             |
| 2. Sanity Project and Studio           | 8      | 17            |
| 3. Sanity Content Model                | 15     | 37            |
| 4. GROQ Queries and Data Fetching      | 4      | 11            |
| 5. Site Layout and Global Components   | 5      | 15            |
| 6. Page Templates and Routes           | 12     | 45            |
| 7. Portable Text and Content Rendering | 2      | 8             |
| 8. API Routes and Forms                | 4      | 12            |
| 9. SEO, Metadata, and Structured Data  | 4      | 9             |
| 10. Visual Editing and Draft Preview   | 3      | 7             |
| 11. Redirects and Legacy URL Handling  | 2      | 5             |
| 12. Content Migration                  | 8      | 18            |
| 13. Testing and Validation             | 3      | 6             |
| 14. Deployment and Go-Live             | 4      | 6             |
| **Total**                              | **78** | **205**       |

---

## Risk Register

| Risk                                              | Impact | Likelihood | Mitigation                                                                  |
| ------------------------------------------------- | ------ | ---------- | --------------------------------------------------------------------------- |
| MDX to Portable Text conversion loses formatting  | High   | Medium     | Test conversion thoroughly; manual review of all 13 content items           |
| URL changes break SEO / inbound links             | High   | Low        | Preserve all slugs; implement redirect system; verify parity before cutover |
| Performance regression from Sanity API calls      | Medium | Low        | Use CDN, ISR, tag-based revalidation; minimise client-side fetches          |
| Base UI + Tailwind integration friction           | Medium | Medium     | Prototype key components early; consult Base UI docs                        |
| Visual editing not working with custom components | Medium | Medium     | Follow next-sanity patterns; test incrementally                             |
| Content migration data loss                       | High   | Low        | Keep v1 repo as backup; validate all content post-migration                 |

---

## Dependencies

- Sanity.io account (free tier sufficient)
- Vercel account for hosting
- Email provider credentials (MailerLite for newsletter, Resend for transactional)
- Domain access for DNS cutover
- Photography assets from v1 site

---

## Definition of Done (Global)

- [] Code merged to main branch
- [] `pnpm lint` passes
- [] `pnpm typecheck` passes
- [] `pnpm test` passes
- [] `pnpm build` succeeds
- [] TypeScript types generated and valid
- [] Documentation updated
- [] Visual review completed
- [] No accessibility regressions
