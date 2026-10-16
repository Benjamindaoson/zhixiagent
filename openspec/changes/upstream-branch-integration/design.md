## Context

Zhixi AI `main` starts from a tree snapshot of upstream 0.8b1, so it has no ancestry link to Microsoft's `main`. The tree retains a small set of brand, layout, model gateway, streaming-text, README, and dashboard customizations. Upstream `dev` is 96 commits and about 598 files ahead of 0.8b1. Other remote branches include both maintained feature work and stale experiments or dependency-only changes.

## Goals / Non-Goals

**Goals:**

- Integrate maintained upstream features with their actual frontend/backend contracts and tests.
- Keep the current local product runnable and recognizable as Zhixi AI after each shipped batch.
- Provide branch-level traceability and a Chinese update note for every batch.

**Non-Goals:**

- Treat every branch tip as production-ready or merge all dependency bots without compatibility review.
- Claim external model, enterprise connector, scheduler, or installer success from unit tests alone.
- Change the user's existing `.env` or commit credentials.

## Decisions

1. **Isolated worktree.** Merge and test in `nice/upstream-all`; keep `main` and the existing local server intact until an acceptance gate passes. This avoids exposing a half-merged UI to the user. Alternatives considered: merging directly on `main` would interrupt the current runnable checkout.
2. **Explicit baseline ancestry.** Record upstream 0.8b1 as a parent with an `ours` merge in the integration branch, then merge `upstream/dev` normally. The source trees share this baseline even though the public fork was squashed; this yields a small, reviewable conflict set. Do not rewrite published history.
3. **Preserve both intents at conflicts.** Retain upstream runtime contracts and Zhixi AI's homepage, layout, brand, gateway, `<think>` handling, and sample dashboard. Compare each conflict against the upstream source and local custom commit before editing.
4. **Feature branch intake after `dev`.** For each branch not contained in `dev`, inspect commit age, changed files, and whether the capability was superseded. Cherry-pick or port compatible product work and targeted fixes; record an exclusion reason for stale/dependency-only branches.
5. **Update notes as a delivery gate.** Add `CHANGELOG_ZH.md` with one dated entry per integrated batch, including source refs, visible behavior, tests, and unverified external integrations. Update README only for verified capabilities.
6. **Verification tiers.** Run TypeScript, frontend tests, backend tests, production build, and browser/API smoke checks in the worktree's local dependency environment. External service validation is reported separately.

## Risks / Trade-offs

- [Large upstream refactor] → Resolve merge conflicts by contract, then run focused tests before full suites.
- [New package versions or Python dependencies] → Install only into this worktree's `node_modules` and `.venv`; record platform failures.
- [Session or persisted-state migration] → Test a new demo session and a saved session; keep a rollback path via the prior `main` commit.
- [Sandbox/app security] → Preserve upstream confinement and route validation; do not bypass checks to make demos pass.
- [Obsolete remote branches] → Record a branch-level disposition rather than quietly claiming them integrated.

## Migration Plan

Keep `origin/main` unchanged while integration is under test. After each verified batch, fast-forward or merge a reviewed integration commit and push. If a batch fails, keep it on the integration branch and continue repair without deploying it. The previous `main` commit remains the rollback target.

## Open Questions

- Which enterprise connectors can be exercised without external credentials? Mark any others as code-integrated but externally unverified.
- Whether desktop packaging branches apply to this web-first local deployment; assess their unique commits after the `dev` merge.
