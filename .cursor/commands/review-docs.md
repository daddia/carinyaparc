# Review Task Docs

## Overview

Review and enhance task documentation so it is complete and ready for development **based on**:

- The current state of the repository (what is actually implemented)
- Leading best practices for the chosen stack (Next.js, Sanity, Turborepo, pnpm, Tailwind, Base UI)
- Project docs and prior decisions (roadmap, product, architecture)

This command reviews **both**:

- `.zen/tasks/{TASK_ID}/requirements.md` (FRD)
- `.zen/tasks/{TASK_ID}/design.md` (TDD)

## Instructions

The user will invoke this command as:

```
/review CP-XX-XXX
```

The text after `/review` is the **Task ID** (e.g. `CP-01-001`).

Follow these steps **exactly**:

### 1. Locate the task and documents

- Open `.zen/TODO.md` and find the task matching the given Task ID (e.g. `[CP-01-001]`).
- Verify the directory `.zen/tasks/{TASK_ID}/` exists.
- Verify these files exist:
  - `.zen/tasks/{TASK_ID}/requirements.md`
  - `.zen/tasks/{TASK_ID}/design.md`

If either file is missing:

- Create it using the appropriate command first:
  - `/write-requirements {TASK_ID}`
  - `/develop-design {TASK_ID}`
- Then continue with this review.

### 2. Load the governing prompts and templates

Read and apply the policies/quality gates from:

- `.zen/library/requirements.prompt`
- `.zen/library/requirements.md.tmpl`
- `.zen/library/design.prompt`
- `.zen/library/design.md.tmpl`

### 3. Re-gather authoritative context (no guessing)

Use these as the canonical sources of truth:

- `.zen/TODO.md` (acceptance criteria, deliverables, priorities, estimates)
- `docs/product.md` (constraints that affect requirements)
- `docs/tech.md` (confirmed stack + architectural decisions)
- `docs/structure.md` (project structure)
- `.zen/features.md` (WordPress feature inventory; only reference if relevant)

If something is not specified in sources:

- Prefer to **make an opinionated decision** using leading best-practice defaults.
- Record it explicitly as a **Decision** with rationale and a source citation where possible (e.g., an official doc link or a reference to `docs/tech.md`).
- Only leave **TBD** when a decision is impossible without a real external value (e.g., account IDs, tokens, vendor credentials, DNS access) or when multiple options materially change scope and no decision can be responsibly made.

### 4. Review against current website progress (repo reality check)

Compare the FRD/TDD to what is actually present in the repo **today**.

- Verify whether the deliverables already exist (e.g., the named files, folders, configs).
- Identify drift:
  - Docs claim something exists but code/config does not
  - Code/config exists but docs don’t mention it
- Update FRD/TDD to reflect reality or add explicit tasks/constraints to close the gap.

For infra tasks, include checks like:

- Root `package.json` exists and includes the required `engines` and `packageManager`
- `pnpm-workspace.yaml` exists and is correct
- `turbo.json` exists with required pipelines
- `.nvmrc` exists and matches runtime policy
- `pnpm install` succeeds (if the repo is at a stage where install is expected to pass)

### 5. Review against leading best practice and research

Use best practice guidance from official documentation and widely accepted patterns for the stack.

- Prefer official sources (Next.js docs, Sanity docs, Turborepo docs, pnpm docs, Tailwind docs, Base UI docs).
- Where relevant, compare with patterns from v1 (what worked, what to avoid).

Update FRD/TDD to include best-practice-driven:

- Security controls (secrets management, dependency pinning, supply chain, CI hardening)
- Performance targets and caching strategy (where applicable)
- Operational guardrails (lint/typecheck/test/build commands; CI expectations)
- Clear error-handling and rollback strategy

Do not invent metrics. If targets are unknown, set them to **TBD** and add a question.

### 6. Review and enhance the FRD (`requirements.md`)

Without changing the template’s headings, ensure:

- All required sections are present and filled meaningfully
- Success metrics have **Baseline** and **Target** (use TBD if unknown)
- MoSCoW scope is consistent with the roadmap task acceptance criteria
- Functional requirements include:
  - unique IDs
  - acceptance criteria
  - test IDs
- Non-functional requirements include measurable targets (use TBD if unknown)
- RACI matrix has clear owners/approvers and is consistent with the project context
- Design section references the design system where relevant (Base UI + Tailwind), and accessibility expectations where applicable
- All statements are traceable to sources (cite inline: `[TODO.md]`, `[product.md]`, `[architecture.md]`, `[features.md]`)

Apply edits directly to `.zen/tasks/{TASK_ID}/requirements.md`.

### 7. Review and enhance the TDD (`design.md`)

Without changing the template’s headings, ensure:

- Architecture is implementable and matches confirmed stack (Turborepo, Next.js v16, Tailwind v4.2, Base UI, Node.js v24 LTS) [architecture.md]
- APIs, schemas, and data models are fully specified **when applicable**
  - If a section is N/A for this task, explain why it is N/A (briefly) and ensure it is consistent with the FRD
- Performance targets are **quantified** and realistic
- Security requirements are explicit (even for infra tasks: supply chain, secrets management, version pinning)
- Error handling strategy covers build/CI failures and developer experience
- Testing strategy includes verification steps and CI expectations
- Deployment notes align with the repo/host assumptions in `docs/tech.md`
- References include a link to the FRD and relevant docs

Apply edits directly to `.zen/tasks/{TASK_ID}/design.md`.

### 8. Consistency checks (FRD ↔ TDD)

Verify:

- Every FRD “Must” requirement is covered by a concrete technical approach in the TDD
- Any TBDs are mirrored appropriately (FRD Questions ↔ TDD Risks/Mitigations)
- Naming consistency: task title, IDs, links, and file paths

### 9. Close out open questions and TBDs (opinionated)

After enhancing both docs, explicitly eliminate remaining TBDs and open questions wherever possible by choosing defaults.

Examples:

- Pin exact tool versions (pnpm, turbo) to current stable and document the choice.
- Choose CI baseline targets as initial defaults (then measure and adjust later).
- Choose whether to enable remote Turbo caching now or defer (default: defer unless CI pain is expected).
- Choose repository conventions (folder naming, scripts naming, strictness flags) consistent with best practice.

When making decisions:

- Add them to **FRD Decision log** and/or the TDD (Architecture Decision / Risks & Mitigations / Timeline), as appropriate.
- Ensure the decision is reflected consistently across both documents.

### 10. Mark documents as reviewed

After completing edits:

- Update **FRD** header fields:
  - `**Status:** Reviewed`
  - Update `**Last Updated:**` to today
- Update **TDD** header fields:
  - `**Status:** Reviewed`
  - Update `**Updated:**` to today

Do not change template headings or structure; only update the variable values/content.

### 11. Confirm readiness

After edits, report back:

- The task ID and title
- What changed (high level)
- A **Ready for Development** verdict: Yes/No
- The remaining TBDs/questions that block development (if any)
