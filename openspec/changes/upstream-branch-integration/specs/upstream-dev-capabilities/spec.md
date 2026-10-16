## ADDED Requirements

### Requirement: Keep existing entry and analysis flows
After integrating upstream capabilities, the application SHALL preserve the Zhixi AI landing page, five demo sessions, local model configuration, left analysis canvas, right chat, saved sessions, and interactive sample dashboard.

#### Scenario: Open and return from a demo
- **WHEN** a user opens Stock Prices from the homepage and returns from an analysis result or interactive app
- **THEN** the original chart, table, chat, and session navigation remain usable.

### Requirement: Interactive apps use upstream runtime contracts
When the app-generation capability is included, the frontend and backend SHALL use matching artifact, sandbox, and data access contracts and SHALL surface loading and failure states.

#### Scenario: Open an app result
- **WHEN** an analyst result contains a supported interactive app artifact
- **THEN** the user can open it in the workspace, use its controls, and return to the conversation without losing the session.

### Requirement: Workflow and data features remain integrated
When workflow, semantic-model, or connector capabilities are included, the UI, routes, persistence, and analyst skills SHALL agree on their request and response contracts.

#### Scenario: Feature is visible without external setup
- **WHEN** a feature is exposed in the interface but its external service is unavailable
- **THEN** the application reports a clear setup or connection state rather than silently succeeding.

### Requirement: Local run gate
An integration batch SHALL pass the relevant type checks, tests, build, and browser/API smoke checks before it is merged into the public `main`.

#### Scenario: Verification fails
- **WHEN** a required check fails
- **THEN** the batch stays isolated and its update note does not claim successful delivery.
