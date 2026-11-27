# Scout Autonomous Agent Workflow

This document defines how an AI coding agent should operate over multiple sessions without requiring the owner to restate the project.

## 1. Session start

At the start of every session:
1. Read `AGENTS.md`.
2. Read `docs/MASTER_PLAN.md`.
3. Read `docs/DECISIONS.md`.
4. Read `docs/EXECUTION_BACKLOG.md` and `docs/PROGRESS.md`.
5. Read only the relevant detailed specs for the next task.
6. Inspect git status and recent commits before changing files.
7. Continue the first unblocked backlog task.

Do not ask “what should I work on?” when the backlog has an unblocked task.

## 2. Task execution loop

For each task:
1. State the task ID and acceptance criteria in the work notes.
2. Inspect the relevant code and tests before editing.
3. Make the smallest coherent implementation.
4. Add or update tests.
5. Run relevant checks.
6. For UI, run the app on Android and capture/compare screenshots when the task affects visible UI.
7. Update docs and decision records if behavior, architecture, or scope changed.
8. Update backlog status and append a progress entry.
9. Commit with a conventional, specific message when repository workflow permits.
10. Report exact changes and actual check results.

Do not mark a task complete when only part of its acceptance criteria is satisfied.

## 3. Autonomy rules

### Agent may decide independently
- Internal component names and file organization.
- Reversible refactors that preserve behavior.
- Test names and fixture structure.
- Small implementation details consistent with approved architecture.
- Error copy and empty-state copy when not legally/financially consequential.
- Minor accessibility improvements.
- Dependency choices already compatible with the approved stack, when no new vendor or recurring cost is introduced.

Record meaningful choices briefly in progress notes.

### Agent must ask before
- Choosing authentication provider or production OAuth setup.
- Choosing specific Cloudflare services or paid services.
- Changing SQLite as local source of truth.
- Adding another backend, database, analytics, crash-reporting, or AI vendor.
- Adding recurring costs, subscriptions, ads, or monetization.
- Requesting SMS, notification, contacts, location, or bank permissions.
- Connecting real bank/payment systems or handling real financial data.
- Deciding legal age policy, launch jurisdictions, or legal claims.
- Changing privacy defaults or social financial-sharing scopes.
- Making destructive migrations, irreversible data deletion, or production releases.
- Changing the approved visual reference substantially.

### When blocked
- Record the blocker and exact decision needed in `docs/DECISIONS.md`.
- Mark only dependent tasks blocked.
- Continue other unblocked tasks.
- Ask one focused question with a recommendation and trade-offs.
- Never repeatedly ask for decisions already recorded.

## 4. Repository hygiene

- Keep main branch buildable.
- Prefer small, focused commits.
- Do not commit generated secrets, credentials, signing keys, local databases, financial exports, or personal data.
- Do not modify lockfiles by hand.
- Do not upgrade large dependency groups without a compatibility reason.
- Do not leave TODO placeholders in a feature described as complete.
- Keep environment variables documented with safe example names and no real values.
- Keep synthetic fixture data obviously synthetic.
- Avoid unnecessary packages and architecture layers.

## 5. Required verification

Run the most relevant checks after every task. Before a milestone is complete, run all available:
- Install/lockfile validation.
- Typecheck.
- Lint.
- Unit and integration tests.
- Format check.
- Android build.
- Critical UI smoke tests.
- Screenshot comparison for visual changes.

If a command cannot run, report why and what remains unverified. Do not invent results.

## 6. Progress file format

Update `docs/PROGRESS.md` after each work session:

- Date.
- Task IDs completed.
- Files changed.
- Commands run and exact results.
- Decisions made (link to DECISIONS).
- Blockers.
- Exact next task ID.

Keep the newest entry at the top. Do not erase earlier history.

## 7. Communication style

The owner prefers direct, simple, actionable updates. Report:
- What was completed.
- What changed.
- What was tested.
- What failed or remains uncertain.
- What the agent will do next.

Do not send long progress narration. Do not ask the owner to micromanage routine work.
