## Why

The workspace can show individual tables, charts, and reports, but a user cannot yet combine a dataset with quick field and filter controls to answer follow-up questions without asking the model again. The first incremental step toward the upstream `dev` interactive-app direction is a dashboard that works immediately with loaded data and the existing API.

## What Changes

- Add an interactive dashboard mode inside the existing left analysis canvas, opened from the workspace thread toolbar.
- Let users choose a loaded table, dimension, numeric measure, chart type, and category filter; show updated chart and summary cards without a model call.
- Provide clear empty, loading, error, and sampled-data states. Preserve the landing page, five examples, chat, existing chart canvas, and mobile pane navigation.

## Capabilities

### New Capabilities

- `interactive-analysis-dashboard`: Explore a loaded table through bounded, client-side dashboard controls and visual summaries.

### Modified Capabilities

None.

## Impact

Frontend workspace layout and a new dashboard component; the existing `/api/tables/sample-table` contract is reused. No backend route, data format, dependency, or model configuration changes are required. This is the first usable slice, not the full upstream sandboxed HTML/React app runtime.
