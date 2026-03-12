# Write Requirements

## Overview

Generate a Requirements Document for a specific task from the project roadmap (`.zen/TODO.md`).

## Instructions

The user will invoke this command as:

```
/write-requirements CP-XX-XXX
```

The text after `/requirements` is the **Task ID** (e.g. `CP-01-001`).

Follow these steps **exactly**:

### 1. Look up the task

- Open `.zen/TODO.md` and find the task matching the given Task ID (e.g. `[CP-01-001]`).
- Extract: task title, status, priority, estimate, deliverable, and all acceptance criteria.
- Also note which Epic the task belongs to and any related/adjacent tasks.

### 2. Gather context

- Read `docs/product.md` for product vision, personas, pillars, and constraints.
- Read `docs/tech.md` for the high-level architecture, content model, and IA.
- Read `.zen/features.md` for the WordPress feature inventory (reference where applicable).
- Use these as **source material**. Do not invent requirements -- if information is missing, mark it as **TBD** and add it to the Questions section.

### 3. Adopt the prompt role and policies

You are acting as the role defined in `.zen/library/requirements.prompt`. Read that file and follow its:

- **Role**: Senior Product Manager
- **Policies**: focus on business value, MoSCoW prioritisation, RACI, measurable metrics, no technical implementation details
- **Quality gates**: all listed in the prompt
- **Anti-patterns**: avoid technical details, API specs, code examples, vague requirements, invented content

### 4. Fill in the template

Use `.zen/library/requirements.md.tmpl` as the **exact structure** for the output document. Replace all template variables (`{{ .VARIABLE }}`) with concrete values derived from the task and context gathered above.

Key rules:

- **FEATURE_NAME**: Use the task title from `TODO.md`
- **VERSION**: `0.1`
- **STATUS**: `Draft`
- **LAST_UPDATED**: Today's date
- **PRODUCT_OWNER**: Extract from `docs/product.md` or mark TBD
- **TARGET_RELEASE**: `Phase 1`
- **SUCCESS_METRICS**: Must have Baseline and Target columns filled (use TBD if unknown)
- **Functional requirements**: Must include acceptance criteria and test IDs (e.g. `T-CP-01-001-01`)
- **Scope**: Use MoSCoW (Must/Should/Could/Won't)
- **Cite sources**: Reference `[TODO.md]`, `[product.md]`, `[architecture.md]`, or `[features.md]` inline
- **RACI matrix**: At minimum include Product, Engineering, and Content rows
- **Design section**: Reference design system (Base UI, Tailwind v4.2) and note accessibility requirements (WCAG 2.1 AA minimum)
- Keep the document to **3-4 pages** max

### 5. Save the output

- Create the directory `.zen/tasks/{TASK_ID}/` (e.g. `.zen/tasks/CP-01-001/`)
- Save the completed document as `.zen/tasks/{TASK_ID}/requirements.md`

### 6. Confirm

After saving, report back:

- The task ID and title
- The file path where the requirements document was saved
- A brief summary of the key requirements (3-5 bullet points)
- Any items marked as TBD that need follow-up
