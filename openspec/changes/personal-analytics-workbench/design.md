## Context

The React/Vite client renders the desktop workspace through `DataFormulator.tsx`, with an Allotment split and assistant entries in `InteractionEntryCard.tsx`. The Python server serves the built client and existing APIs. This change is frontend only.

## Goals / Non-Goals

**Goals:** Give the app a personal Chinese identity, make the analysis canvas the primary left surface, keep chat on the right, suppress visible model reasoning tags, and pass frontend checks plus a local end-to-end smoke test.

**Non-Goals:** Backend API changes, model behavior changes, removal of upstream license/provenance, wholesale replacement of the component system.

## Decisions

- Reuse installed MUI components and icons, with a small local brand mark and CSS adjustments. This avoids a new UI package and keeps existing chart and data controls intact. A full dashboard template replacement would add migration risk.
- Reverse the desktop Allotment panes and update width calculations as one unit. Preserve the existing mobile tab workflow.
- Sanitize visible assistant text at the presentation boundary. Keep the original response data for application state and diagnostics; strip only leading reasoning blocks, including an unfinished block while streaming.
- Fix TypeScript errors at their root (Redux dependency compatibility and explicit types), without relaxing type checks.

## Risks / Trade-offs

- [Responsive split can collapse badly] → Exercise desktop and phone widths in the browser.
- [Streaming tag filter can hide answer text] → Unit test closed and unfinished reasoning blocks plus ordinary text.
- [Rebranding may obscure provenance] → Keep the repository license, copyright, and source history intact.

## Migration Plan

Build the frontend into the existing static bundle, refresh the running local server, and smoke test the same API flow. Revert the frontend commit/files to roll back.

## Open Questions

None for this local demo phase.
