## 1. Audit and source inventory

- [x] 1.1 Record all current upstream branches, unique commits, changed areas, and initial disposition in a repository-local inventory.
- [x] 1.2 Establish the existing local run commands and baseline test/build results before the merge.

## 2. Integrate upstream dev

- [ ] 2.1 Record the 0.8b1 ancestry and merge the current upstream `dev` into the isolated integration branch.
- [ ] 2.2 Resolve every conflict using both source intents; retain Zhixi AI entry, layout, model gateway, streaming-text fix, and dashboard.
- [ ] 2.3 Install dependencies in the integration worktree's local environments and repair type, import, and test failures.
- [ ] 2.4 Verify interactive apps, workflow/schedule UI and routes, semantic data/connectors, model setup, locales, homepage, demos, and sample dashboard.
- [ ] 2.5 Write the first Chinese update note with exact source commits, passed checks, and externally unverified paths.

## 3. Review feature branches outside dev

- [ ] 3.1 Port compatible user-facing features and targeted fixes from unmerged product branches in separate reviewable batches.
- [ ] 3.2 Verify each feature batch and write its Chinese update note before public delivery.
- [ ] 3.3 Record reasons for excluding superseded, historical, platform-only, or dependency-only branches; apply safe dependency maintenance only after compatibility checks.

## 4. Delivery gates

- [ ] 4.1 Run full TypeScript, frontend, backend, build, local HTTP/API, and browser checks; repair failures.
- [ ] 4.2 Review changed files for secrets, license/source notices, unnecessary dependencies, and documented limitations.
- [ ] 4.3 Merge verified batches to `main`, push to the user's repository, and confirm remote commit and release notes.
