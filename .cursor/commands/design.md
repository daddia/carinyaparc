# Develop Design

## Overview

Generate a Technical Design Document (TDD) for a specific task from the project roadmap (`docs/TODO.md`).

## Instructions

The user will invoke this command as:

```
/develop-design CP-XX-XXX
```

The text after `/design` is the **Task ID** (e.g. `CP-01-001`).

Follow these steps **exactly**:

### 1. Look up the task

- Open `docs/TODO.md` and find the task matching the given Task ID (e.g. `[CP-01-001]`).
- Extract: task title, status, priority, estimate, deliverable, and all acceptance criteria.
- Also note which Epic the task belongs to and any related/adjacent tasks.

### 2. Read the requirements document

- Check if `.zen/tasks/{TASK_ID}/requirements.md` exists. If it does, read it -- this is the FRD (Feature Requirements Document) that provides the business context. Reference it but do not duplicate its content.
- If no requirements document exists, gather context directly from `docs/TODO.md` acceptance criteria.

### 3. Gather technical context

- Read `docs/architecture.md` for the confirmed stack, high-level architecture, content model, and rendering strategy.
- Read `.zen/features.md` for the WordPress feature inventory (reference where the design maps to WordPress equivalents).
- Scan the existing codebase structure to understand current file layout, existing patterns, and conventions.
- Use these as **source material**. Do not invent specifications -- if information is missing, mark it as **TBD** and add it to the Questions section of the requirements document or note it in the Risks section.

### 4. Adopt the prompt role and policies

You are acting as the role defined in `.zen/library/design.prompt`. Read that file and follow its:

- **Role**: Senior Software Architect
- **Policies**: focus on implementable technical specifications, APIs, schemas, data models, performance, security, error handling
- **Quality gates**: architecture clearly defined, APIs fully specified, data models complete, performance targets quantified, security explicit, error handling comprehensive, test strategy defined
- **Anti-patterns**: avoid business justifications, user personas, market analysis, success metrics, incomplete API specs, vague architecture, missing error handling

### 5. Fill in the template

Use `.zen/library/design.md.tmpl` as the **exact structure** for the output document. Replace all template variables (`{{ .VARIABLE }}`) with concrete values derived from the task and context gathered above.

Key rules:

- **FEATURE_NAME**: Use the task title from `TODO.md`
- **VERSION**: `0.1`
- **STATUS**: `Draft`
- **CREATED_DATE** and **LAST_UPDATED**: Today's date
- **TECH_LEAD**: TBD (unless known from context)
- **Tech stack**: Reference the confirmed stack from `architecture.md` (Turborepo, Next.js v16, Tailwind v4.2, Base UI, Node.js v24 LTS, Sanity)
- **Architecture diagrams**: Use ASCII or Mermaid where helpful
- **API endpoints**: Include full request/response schemas and error codes
- **Data models**: Define schemas with types, validation rules, and relationships
- **Performance targets**: Provide specific, measurable targets with strategies
- **Security**: Cover authentication, authorisation, data protection, and input validation
- **Error handling**: Define strategies, retry logic, and fallback behaviours
- **Testing**: Define coverage targets and approach (unit, integration, smoke)
- **Deployment**: Reference Vercel deployment model from `architecture.md`
- **FRD_LINK**: Link to `.zen/tasks/{TASK_ID}/requirements.md` if it exists
- Keep the document to **5-7 pages** max

### 6. Save the output

- Save the completed document into the **existing** task directory at `.zen/tasks/{TASK_ID}/design.md`
- If the directory does not exist, create `.zen/tasks/{TASK_ID}/` first.

### 7. Confirm

After saving, report back:

- The task ID and title
- The file path where the design document was saved
- A brief summary of the key technical decisions (3-5 bullet points)
- Any items marked as TBD that need follow-up
- Whether a requirements document was found and referenced
