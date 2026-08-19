# Task 3: Studio Editor Panel

## Goal
Build `src/components/tech-stack/studio-editor-panel.tsx` as an interactive side/bottom editor panel for real-time Mermaid code editing, syntax stats, and code reset.

## Files
- Create: `src/components/tech-stack/studio-editor-panel.tsx`
- Test: `tests/studio-editor-panel.test.ts`

## Requirements
1. Interface contract:
   ```typescript
   export interface StudioEditorPanelProps {
     code: string;
     onChange: (code: string) => void;
     onReset: () => void;
     isExpanded: boolean;
     onToggleExpand: () => void;
   }
   ```
2. Features & Controls:
   - Header bar with:
     - `Code2` or `FileCode` icon + "Mermaid Syntax" title
     - Line count indicator (`N lines`)
     - Reset button with `RotateCcw` icon calling `onReset`
     - Collapse/Expand toggle button
   - Monospace code editor area with line-height, tab-indent support, and placeholder.
   - Adaptive light/dark styling using standard theme classes (`bg-card dark:bg-[#0c0c0c]`, `border-border dark:border-[#212121]`, `text-foreground dark:text-[#f3f3f3]`).
   - Quick tips / snippet helper hints (e.g. `-->`, `subgraph`, `classDef`).

## Verification
- Unit test in `tests/studio-editor-panel.test.ts` validating interface and helper logic.
- Type checks with `npx tsc --noEmit`.

Write report to `.superpowers/sdd/2026-08-20-visual-architecture-exporter/task-3-report.md`.
