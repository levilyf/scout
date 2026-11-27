# Contributing

## Before contributing

Read AGENTS.md and the mandatory startup documents it links: MASTER_PLAN, DECISIONS, EXECUTION_BACKLOG, PROGRESS, AGENT_WORKFLOW, and the relevant detailed specifications.

## Rules

- Use synthetic fixtures only. Never commit real financial records, raw SMS/notification text, credentials, tokens, or personal identifiers.
- Treat all product requirements marked Proposed/Open as unapproved until the owner confirms them.
- Preserve local-first SQLite and Cloudflare-only backend constraints. Do not select specific providers/services or change privacy defaults without an explicit decision.
- Follow the ordered backlog and update docs/PROGRESS.md after each work session.
- Keep money calculations in integer paise; never use floating-point arithmetic for money.
- Pending/ignored detected transactions must not affect confirmed totals.
- Do not expose financial data through friend relationships without explicit, scoped permission.
- Follow the design system and build accessible, reusable UI components.
- Add tests for behavior changes, especially money calculations, transaction state transitions, deduplication, authorization, and sync.
- Run typecheck, lint, tests, and formatting checks before submitting changes. Report checks that could not be run.
