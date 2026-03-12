# Carinya Parc

Carinya Parc website build on Next.js + Tailwind + Sanity for a regenerative farm in NSW, Australia.

## Getting Started

### Prerequisites

- **Node.js**: 24+ (see `.nvmrc`)
- **pnpm**: `10.30.3` (pinned in `package.json` `packageManager`)

### Install

```bash
pnpm install && pnpm build
```

### Environment variables

Copy the template and fill in your values:

```bash
cp apps/site/.env.example apps/site/.env.local
```

Sanity variables:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN` (server-side only; do not prefix with `NEXT_PUBLIC_`)

### Run locally

```bash
pnpm dev
```

Then open `http://localhost:3000`.

### Common commands

From the repo root:

```bash
pnpm build
pnpm lint
pnpm typecheck
pnpm format
pnpm format:check
```

## Documentation

Project docs, standards, and roadmap live in: `docs/README.md`

## License

This project is available under the MIT license. It is freely available for any agricultural business to copy, modify, and deploy for their own farm website.

## For Non-Technical Users

This project is designed to be easy to customise and deploy, even for users with minimal technical experience. Simply fork the repository and follow the setup instructions to create your own farm website.
