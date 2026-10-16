## ADDED Requirements

### Requirement: Trace every upstream branch
The project SHALL keep an inventory of upstream branches with source commit, relationship to `dev`, feature category, and integration disposition.

#### Scenario: Branch contains unique product work
- **WHEN** a branch has commits not present in `dev`
- **THEN** the inventory identifies the user-visible capability and either an integration batch or a concrete reason it cannot be shipped.

#### Scenario: Branch is stale or dependency-only
- **WHEN** a branch contains obsolete experiments, already superseded code, packaging for another target, or dependency-only work
- **THEN** the inventory records that classification and the evidence used for its disposition.

### Requirement: Explain each delivered update
Every shipped integration batch SHALL have a Chinese update note describing source refs, user-visible changes, verification, and remaining limits.

#### Scenario: Batch passes verification
- **WHEN** a batch is merged into the public `main`
- **THEN** its update note and README accurately identify what users can do and what was not externally verified.

### Requirement: Do not publish credentials
The project SHALL exclude local keys, tokens, passwords, and `.env` files from integration commits and update notes.

#### Scenario: Review staged changes
- **WHEN** an integration batch is staged for commit
- **THEN** secret checks and changed-file review find no user credentials or local environment files.
