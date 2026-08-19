# Task 5: Architecture Studio Container & Topology View Integration

## Goal
Build `src/components/tech-stack/architecture-studio.tsx` as the full-screen studio container composing the toolbar, canvas, editor, and export actions. Wire an "Open Studio & Export" trigger into the Topology Map and pass `selectedStack` + `projectName` cleanly from the builder.

## Dependencies (existing interfaces — use these exact signatures)
From `src/utils/mermaidGenerator.ts`:
- `generateMermaidDiagram(selectedStack: TechStack, options?: { direction?: 'TD' | 'LR'; groupByLayers?: boolean; theme?: 'dark' | 'light' | 'neutral'; projectName?: string }): string`

From `src/components/tech-stack/studio-diagram-canvas.tsx`:
- `StudioDiagramCanvasProps { mermaidCode: string; theme: 'dark' | 'light' | 'neutral'; zoom: number; onZoomChange: (zoom: number | ((prev: number) => number)) => void; onSvgRendered?: (svg: SVGSVGElement | null) => void }`

From `src/components/tech-stack/studio-editor-panel.tsx`:
- `StudioEditorPanelProps { code: string; onChange: (code: string) => void; onReset: () => void; isExpanded: boolean; onToggleExpand: () => void }`

From `src/components/tech-stack/studio-toolbar.tsx`:
- `StudioToolbarProps { direction: 'TD' | 'LR'; onDirectionChange; groupByLayers: boolean; onGroupByLayersChange; theme: 'dark'|'light'|'neutral'; onThemeChange; isEditorOpen: boolean; onToggleEditor: () => void; className?: string }`

From `src/components/tech-stack/studio-export-actions.tsx`:
- `StudioExportActionsProps { mermaidCode: string; projectName: string; svgElement: SVGSVGElement | null; theme: 'dark'|'light'|'neutral'; className?: string }`

## Files
- Create: `src/components/tech-stack/architecture-studio.tsx`
- Modify: `src/components/tech-stack/architecture-flow-view.tsx` (add "Open Studio & Export" button)
- Modify: `src/components/tech-stack-builder.tsx` (pass `projectName` prop)

## Requirements
1. `ArchitectureStudio`:
   - Interface: `ArchitectureStudio({ isOpen, onClose, selectedStack, projectName, projectDescription }: ArchitectureStudioProps)`
   - Props: `isOpen: boolean; onClose: () => void; selectedStack: TechStack; projectName: string; projectDescription?: string`
   - Full-screen fixed overlay (`fixed inset-0 z-[60]`) with backdrop.
   - Local state: `direction`, `groupByLayers`, `theme`, `zoom`, `editorOpen` (default true), and `manualCode: string | null` (auto-generated when null).
   - Computes `mermaidCode = manualCode ?? generateMermaidDiagram(selectedStack, { direction, groupByLayers, theme, projectName })`.
   - Captures `svgRef` via `useRef` and passed to `StudioDiagramCanvas`'s `onSvgRendered`.
   - Header with title (`Architecture Studio`), project name, close button.
   - Footer with `StudioExportActions`.
   - On close: clears `manualCode` so re-open regenerates fresh.
   - `useEffect` keydown Escape to close.

2. `ArchitectureFlowView` integration:
   - Add an "Open Studio & Export" button in the header row (the `System Topology Map` header block), using `ExternalLink` or `Maximize2` icon.
   - Accept new optional prop `onOpenStudio?: () => void`.
   - Render the button only when `onOpenStudio` provided.

3. `tech-stack-builder.tsx` integration:
   - Add state `studioOpen: boolean` and `studioSvgRef` (or hold svg at studio level).
   - Render `<ArchitectureStudio isOpen={studioOpen} onClose={() => setStudioOpen(false)} selectedStack={selectedStack} projectName={projectName} />`.
   - Pass `onOpenStudio={() => setStudioOpen(true)}` to `<ArchitectureFlowView ... />`.
   - Import `ArchitectureStudio` from `./tech-stack/architecture-studio`.

## Verification
- `npx tsc --noEmit` passes.
- `npm run build` passes.

Write report to `.superpowers/sdd/2026-08-20-visual-architecture-exporter/task-5-report.md`.
