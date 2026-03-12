# Implement Task

## Overview

Implement the feature/task described by a Task ID (e.g. `CP-01-001`) using the project’s implementation prompt and the task’s reviewed docs.

## Instructions

The user will invoke this command as:

```
/implement CP-XX-XXX
```

The text after `/implement` is the **Task ID** (e.g. `CP-01-001`).

Follow these steps **exactly**:

### 1. Locate the task and supporting docs

- Open `docs/TODO.md` and find the task matching the given Task ID (e.g. `[CP-01-001]`).
- Verify the directory `.zen/tasks/{TASK_ID}/` exists.
- Read:
  - `.zen/tasks/{TASK_ID}/requirements.md` (FRD)
  - `.zen/tasks/{TASK_ID}/design.md` (TDD)

If either FRD or TDD is missing, run:

- `/write-requirements {TASK_ID}`
- `/develop-design {TASK_ID}`

Then continue.

### 2. Load and follow the implementation prompt

Read `.zen/library/implementation.prompt` and follow its:

- Role: Senior Software Engineer
- Policies and quality gates
- Workflow (requirements → patterns → minimal design → implementation → tests → validation → quality review)
- Output contract (production-ready code + tests + docs)

### 3. Assess current repo state (progress check)

Before writing code, inspect the current repository structure and confirm:

- Which deliverables already exist (if any)
- What is missing vs the FRD/TDD
- The correct file locations and conventions to follow

### 4. Implement the task (code changes)

Implement the work described by the FRD + TDD, preserving existing conventions.

Rules:

- Prefer minimal, correct changes.
- Do not introduce architectural drift.
- Do not hard-code secrets or environment-specific values.
- Create new files only when required by the TDD.

### 5. Add tests and validation

- Add the tests required by the implementation prompt and the TDD.
- Run the project’s standard checks for the scope of the change (lint/typecheck/tests/build), or the closest available equivalents if the project is still bootstrapping.

If checks aren’t available yet (early bootstrap), add a clear validation checklist and ensure the code path is executable (e.g., `pnpm install` succeeds for CP-01-001).

### 6. Update documentation and roadmap state

After implementation:

- Update `.zen/tasks/{TASK_ID}/design.md` if the implementation required any technical changes from the reviewed plan.
- Update `.zen/tasks/{TASK_ID}/requirements.md` only if requirements changed (avoid rewriting).
- Update `docs/TODO.md` for the task:
  - Set the checkbox to `[x]`
  - Set `**Status:** Done`
  - Keep Priority/Estimate unchanged unless there is a documented reason

### 7. Confirm completion

Report back:

- The task ID and title
- The files changed (high level)
- The commands run and their results
- What remains (if anything)
