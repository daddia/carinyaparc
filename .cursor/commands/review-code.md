# Review Code

## Overview

Perform a comprehensive code review of changes in the working tree, a specific branch, or staged files. Identifies blocking issues, security vulnerabilities, architectural violations, and test gaps while acknowledging good practices.

## Instructions

The user will invoke this command as:

```
/review-code [TARGET]
```

**TARGET** is optional and can be one of:

- _(empty)_ -- review all uncommitted changes (`git diff` + `git diff --staged`)
- `staged` -- review only staged changes (`git diff --staged`)
- `branch` -- review current branch vs `main` (`git diff main...HEAD`)
- A **file path or glob** -- review only the specified files (e.g. `src/components/HeroSection.tsx`)

Follow these steps **exactly**:

### 1. Determine the diff

Based on TARGET:

| TARGET         | Diff command                                                     |
| -------------- | ---------------------------------------------------------------- |
| _(empty)_      | `git diff` + `git diff --staged` (combined)                      |
| `staged`       | `git diff --staged`                                              |
| `branch`       | `git diff main...HEAD`                                           |
| file path/glob | `git diff -- {path}` (falls back to reading the file if no diff) |

- Capture the full diff output and the list of changed files.
- If the diff is empty, report that there are no changes to review and stop.

### 2. Adopt the prompt role and policies

You are acting as the role defined in `.zen/library/code-review.prompt`. Read that file and follow its:

- **Role**: Senior Software Engineer performing code analysis
- **Policies**: distinguish blocking vs suggestions, provide evidence, check security, validate tests, verify architecture
- **Quality gates**: no critical security vulnerabilities, test coverage maintained, no architectural violations, performance not degraded, documentation updated, error handling comprehensive
- **Anti-patterns**: avoid subjective style nitpicking, vague feedback without examples, ignoring test quality, over-focusing on trivial issues, missing architectural violations

### 3. Gather project standards

Read the following for context on what "correct" looks like in this project:

- `docs/agents.md` -- commands, checks, conventions, and expectations
- `docs/structure.md` -- where routes, components, hooks, tests, and docs live
- `docs/tech.md` -- stack, tools, versions, and constraints
- `docs/tech.md` -- confirmed stack, high-level architecture, content model

These are the **coding standards, architecture guidelines, and test requirements** referenced in the prompt. Do not invent standards -- use what these docs define.

### 4. Run the review workflow

Follow the workflow from the code-review prompt, applied to the diff gathered in Step 1:

1. **Static Analysis** -- check for linting issues, formatting problems, TypeScript errors. Run `pnpm lint` and `pnpm typecheck` scoped to changed files where practical.
2. **Security Scan** -- identify hardcoded secrets, unsafe inputs, missing validation, insecure dependencies, XSS/injection vectors.
3. **Logic Review** -- analyse correctness, edge cases, error paths, null/undefined handling, race conditions.
4. **Test Assessment** -- check whether new/changed code has corresponding tests, whether existing tests still pass, and whether coverage is maintained.
5. **Architecture Check** -- validate that changes follow project conventions (file placement, naming, import aliases, server-vs-client components, Tailwind usage).
6. **Performance Analysis** -- identify unnecessary re-renders, large bundles, missing memoisation, unoptimised images, blocking operations.
7. **Documentation Review** -- verify that docs are updated if behaviour, architecture, or features changed.
8. **Risk Assessment** -- evaluate deployment impact, breaking changes, rollback safety.

### 5. Classify findings

Categorise every finding into one of:

| Category       | Meaning                                                                                                    | Blocks merge?        |
| -------------- | ---------------------------------------------------------------------------------------------------------- | -------------------- |
| **Blocking**   | Must fix before merge -- security vulnerability, correctness bug, breaking change, architectural violation | Yes                  |
| **Warning**    | Should fix -- test gap, performance concern, missing error handling                                        | Strongly recommended |
| **Suggestion** | Could improve -- refactoring opportunity, readability, minor optimisation                                  | No                   |
| **Positive**   | Good practice worth acknowledging                                                                          | No                   |

For each finding, include:

- **File path and line number(s)**
- **Description** of the issue
- **Evidence** (the problematic code)
- **Suggested fix** (code example where helpful)
- **Severity rationale** (why it is blocking/warning/suggestion)

### 6. Compile the review report

Output the review as a structured report with these sections:

```
## Code Review: {SHORT_DESCRIPTION}

**Scope**: {what was reviewed -- e.g. "all uncommitted changes", "branch feature/x vs main"}
**Files reviewed**: {count}
**Date**: {today}

### Verdict

{APPROVE / CHANGES REQUESTED / NEEDS DISCUSSION}
Risk level: {Low / Medium / High / Critical}

### Summary

{2-4 sentence overview of the changes and overall quality}

### Blocking Issues

{numbered list, or "None" if clean}

### Warnings

{numbered list, or "None"}

### Suggestions

{numbered list, or "None"}

### Positive Observations

{numbered list -- always include at least one if there is anything good}

### Test Coverage

{brief analysis of test impact}

### Security

{brief security assessment, or "No security concerns identified"}

### Checklist

- [ ] `pnpm lint` passes
- [ ] `pnpm typecheck` passes
- [ ] `pnpm test:unit` passes
- [ ] `pnpm test:smoke` passes (if routes/layouts/forms changed)
- [ ] Docs updated (if behaviour changed)
```

### 7. Save the report (optional)

If the review contains **blocking issues or warnings**, save the report to `.zen/reviews/{DATE}-{SHORT_SLUG}.md` (e.g. `.zen/reviews/2026-03-12-hero-section-refactor.md`). Create the `.zen/reviews/` directory if it does not exist.

If the review is clean (no blockers or warnings), do not save -- just display the report inline.

### 8. Confirm

After the review, report back:

- The scope of what was reviewed
- The verdict (Approve / Changes Requested / Needs Discussion)
- Count of findings by category (e.g. "2 blocking, 1 warning, 3 suggestions")
- The top priority action item (if any)
- Whether the report was saved and where
