## Why

The local data analysis workspace still carries upstream branding, places the conversation before the analysis surface, and can expose model reasoning tags in streamed answers. The frontend also has TypeScript errors that reduce confidence in a demo.

## What Changes

- Rebrand the visible product as “知析 AI” with the subtitle “您的专属 AI 数据分析师”.
- Put the table/chart canvas on the left and the conversation on the right on desktop, retaining mobile tabs.
- Give the workspace a cohesive, restrained analytics visual style using existing MUI components.
- Hide model `<think>` reasoning blocks and incomplete streaming tags from visible assistant prose.
- Resolve frontend TypeScript errors and verify the existing backend connection.

## Capabilities

### New Capabilities

- `personal-analytics-workspace`: Visible brand, workspace layout, and assistant answer presentation.

### Modified Capabilities

None.

## Impact

Frontend React components, styles, locale strings, HTML metadata, and frontend tests. No backend API or backend source changes. Existing open-source license and provenance remain in the repository.
