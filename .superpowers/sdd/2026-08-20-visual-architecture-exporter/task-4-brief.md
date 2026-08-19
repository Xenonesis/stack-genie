# Task 4: Studio Toolbar & Export Pipeline Actions

## Goal
Build `src/components/tech-stack/studio-toolbar.tsx` and `src/components/tech-stack/studio-export-actions.tsx` to control diagram layout, grouping, theme, and execute multi-format exports (Copy Mermaid, Copy Markdown, Download SVG, Download Retina PNG).

## Files
- Create: `src/components/tech-stack/studio-toolbar.tsx`
- Create: `src/components/tech-stack/studio-export-actions.tsx`
- Test: `tests/studio-export.test.ts`

## Requirements
1. `StudioToolbar`:
   ```typescript
   export interface StudioToolbarProps {
     direction: 'TD' | 'LR';
     onDirectionChange: (direction: 'TD' | 'LR') => void;
     groupByLayers: boolean;
     onGroupByLayersChange: (group: boolean) => void;
     theme: 'dark' | 'light' | 'neutral';
     onThemeChange: (theme: 'dark' | 'light' | 'neutral') => void;
     isEditorOpen: boolean;
     onToggleEditor: () => void;
   }
   ```
   - Layout Direction toggle (`Top-Down` vs `Left-Right`).
   - Group by Tier toggle (`Layer Subgraphs` vs `Flat Graph`).
   - Theme Selector dropdown / pills (`Dark Obsidian`, `Clean Light`, `Neutral Slate`).
   - Editor toggle button (`Code Editor`).

2. `StudioExportActions`:
   ```typescript
   export interface StudioExportActionsProps {
     mermaidCode: string;
     projectName: string;
     svgElement: SVGSVGElement | null;
     theme: 'dark' | 'light' | 'neutral';
   }
   ```
   - **Copy Mermaid**: Raw syntax clipboard write with toast feedback.
   - **Copy Markdown**: Wrapped ` ```mermaid ... ``` ` clipboard write with toast feedback.
   - **Download SVG (`.svg`)**: Serializes `svgElement` with XML declaration, dimensions, and triggers browser download.
   - **Download Retina PNG (`.png`)**:
     - Serializes SVG to Image object.
     - Draws to HTML5 Canvas at `scale: 2` (devicePixelRatio / 2x resolution).
     - Fills canvas background with matching theme color (`#080808` dark, `#ffffff` light, `#0f172a` neutral).
     - Generates PNG blob and triggers browser download named `${projectName}-architecture.png`.

## Test Requirements
Create `tests/studio-export.test.ts` to test SVG serialization helper and filename/markdown formatting logic.

Write report to `.superpowers/sdd/2026-08-20-visual-architecture-exporter/task-4-report.md`.
