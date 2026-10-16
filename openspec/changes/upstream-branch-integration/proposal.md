## Why

The public Zhixi AI repository is based on Data Formulator 0.8b1 while upstream `dev` and several unmerged feature branches contain newer capabilities. Users need those capabilities without losing the branded landing page, existing demos, analysis canvas, chat, or local run path. Each delivered update also needs a clear, durable explanation.

## What Changes

- Inventory every current upstream branch and classify its commits as already present, maintained product work, repair, packaging, documentation, dependency maintenance, or obsolete experiment.
- Integrate the maintained `dev` product capabilities, including interactive apps, workflows, semantic models/connectors, model connection improvements, and language support, with the necessary frontend and backend contracts.
- Evaluate feature branches outside `dev` and integrate compatible user-facing additions and repairs; record an explicit disposition for branches whose work is superseded, unrelated, or incompatible.
- Preserve Zhixi AI branding and the current homepage, five demos, left canvas/right chat layout, local API configuration, and the existing sample dashboard.
- Write a Chinese update note for every integrated batch with source branch/commit, user-visible changes, verification, and known limits. Update README and the upstream integration ledger to match verified behavior.
- Ship only verified batches to the user's GitHub repository.

## Capabilities

### New Capabilities

- `upstream-feature-intake`: Every upstream branch receives a traceable, evidence-based integration decision and each shipped batch has release notes and verification evidence.
- `upstream-dev-capabilities`: Zhixi AI exposes the selected maintained `dev` app, workflow, semantic-data, model-connection, and locale capabilities while retaining its existing workspace flows.

### Modified Capabilities

None. No baseline project-level specs currently exist under `openspec/specs/`.

## Impact

Potential changes span React/TypeScript views, Redux/session state, Python routes and analyst runtime, connector dependencies, locale resources, tests, documentation, and packaging. The integration is performed in an isolated Git worktree. External model providers, enterprise connectors, schedulers, and desktop installers require environment-specific validation before being claimed as operational.
