## Context

The active workspace renders a left canvas and a right Data Thread. Table metadata is available through `dfSelectors.getAllTables`; input-table rows in Redux are only a short preview. The existing sample-table API can return a bounded row sample for either input or derived workspace tables. The dashboard must not replace the current canvas or change backend behavior.

## Goals / Non-Goals

**Goals:** A dashboard reachable from any active workspace with data; dimension, measure, chart, and category controls; immediate visual and summary updates; clear feedback when rows or fields are unavailable; usable desktop and phone navigation.

**Non-Goals:** Arbitrary AI-generated HTML/React execution, scheduled refresh, persistent dashboard authoring, whole-table analytics, or new backend endpoints. Those belong to later upstream-integration slices.

## Decisions

- Keep dashboard mode local to `DataFormulatorFC`. The current focused chart/table remains intact; switching back restores the original canvas. This limits changes to the existing navigation state machine.
- Fetch up to 1,000 rows from `/api/tables/sample-table` with `method: head` and the active workspace header. The chart explicitly says it represents a sample. This avoids loading large tables or creating a new backend contract.
- Render the chart with React SVG and MUI controls. The supported line/bar charts need no new dependency or executable HTML, and React escapes data labels. The upstream `dev` runtime is a later, separately reviewed phase.
- Compute groups and numeric summaries in a pure module so field changes and filters are deterministic and can be tested without a browser.

## Risks / Trade-offs

- **Sample may omit later rows** → Display sample count and avoid describing it as whole-table statistics.
- **Non-numeric or sparse columns** → Offer only numeric measures and show a visible empty state when none exist.
- **Long category labels / many groups** → Limit displayed groups to a bounded count, truncate labels in the chart, retain full labels in tooltips.
- **Workspace or table changes while request is pending** → Cancel or ignore stale responses and reset dependent controls when the table changes.

## Migration Plan

The feature is additive. Build and test against the current project environment, then verify the five demo sessions and the original canvas in a browser. Rollback is removal of the dashboard component and its workspace toggle; saved sessions need no migration.
