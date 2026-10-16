## ADDED Requirements

### Requirement: Open an interactive dashboard from a loaded workspace
The application SHALL let a user open a dashboard in the analysis canvas without losing the current table, chart, conversation, or session.

#### Scenario: Open from a loaded demo
- **WHEN** a user opens a demo session with at least one loaded table and selects the dashboard action
- **THEN** the left canvas shows dashboard controls and a visualization while the right Data Thread remains available

#### Scenario: Return to existing analysis
- **WHEN** the user leaves dashboard mode
- **THEN** the previously focused table or chart is available in the original canvas

### Requirement: Explore a bounded table sample
The dashboard SHALL use a bounded row sample from the current workspace and SHALL identify the sample size in the interface.

#### Scenario: Switch table and fields
- **WHEN** the user selects a different loaded table, dimension, numeric measure, or bar/line chart type
- **THEN** the visualization and summary cards update to match the selection

#### Scenario: Filter a category
- **WHEN** the user selects a category value
- **THEN** the visualization and summary cards reflect only matching sampled rows and the user can clear the filter

#### Scenario: No suitable data
- **WHEN** a table has no rows or no numeric measure in the sampled data
- **THEN** the dashboard shows an actionable empty state instead of a broken chart

#### Scenario: Data request fails
- **WHEN** the sample-table request fails
- **THEN** the dashboard shows an error and offers a retry action without breaking the rest of the workspace

### Requirement: Preserve existing workspace flows
The dashboard SHALL coexist with the landing page, sample sessions, analysis canvas, and phone workspace navigation.

#### Scenario: Existing demo flow
- **WHEN** the user returns home or opens another demo after using the dashboard
- **THEN** the normal session and canvas flow still works
