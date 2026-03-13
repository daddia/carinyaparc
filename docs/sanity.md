# Sanity (CMS) configuration

This project uses **Sanity Content Lake** for structured content (pages, posts, recipes, navigation, settings).

## Project details

- **Organisation ID**:
- **Project ID**:
- **Datasets**:
  - **`production`**: live content (used by the production website)
  - **`development`**: safe iteration/testing (used for local dev and preview deployments)

## Environment variables

Copy `apps/site/.env.example` to `apps/site/.env.local` and set:

- **`NEXT_PUBLIC_SANITY_PROJECT_ID`**:
- **`NEXT_PUBLIC_SANITY_DATASET`**:
  - local dev: `development`
  - production deployment: `production`
- **`SANITY_API_READ_TOKEN`**: a **Viewer** token (server-side only; never commit)

## CORS origins (Sanity Manage)

In `sanity.io/manage` → Project → API → **CORS Origins**, allow-list the exact origins used by:

- Local site dev: `http://localhost:3000`
- Local Studio dev (if run separately): `http://localhost:3333`
- Production site:
  - `https://carinyaparc.com.au`
  - `https://www.carinyaparc.com.au` (only if used)

Avoid wildcard origins (`*`) unless there is a specific, reviewed reason.

## Notes

- **Tokens**: create/rotate at `sanity.io/manage` → Project → API → Tokens.
- **Security**: keep tokens scoped/least-privilege; prefer Viewer tokens for read-only use.
