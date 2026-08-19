# Task 2: Studio Diagram Canvas & SVG Renderer

## Goal
Build `src/components/tech-stack/studio-diagram-canvas.tsx` to render the live Mermaid diagram inside an interactive pan/zoom canvas, handle client-side rendering with SSR safety, and provide access to the rendered `<svg>` element for export.

## Files
- Create: `src/components/tech-stack/studio-diagram-canvas.tsx`

## Requirements
1. Interface contract:
   ```typescript
   export interface StudioDiagramCanvasProps {
     mermaidCode: string;
     theme: 'dark' | 'light' | 'neutral';
     zoom: number;
     onZoomChange: (zoom: number | ((prev: number) => number)) => void;
     onSvgRendered?: (svgElement: SVGSVGElement | null) => void;
   }
   ```
2. Client-side Mermaid rendering:
   - Use dynamic `import('mermaid')` inside `useEffect` (or standard `mermaid` client initialization) with SSR safety.
   - Initialize `mermaid.initialize({ startOnLoad: false, theme: theme === 'dark' ? 'dark' : theme === 'light' ? 'default' : 'neutral', securityLevel: 'loose' })`.
   - Call `mermaid.render('mermaid-svg-' + id, mermaidCode)` and inject SVG into container.
   - Handle syntax errors gracefully without crashing the UI (display error banner with friendly message).
   - Pass the rendered `SVGSVGElement` to `onSvgRendered`.
3. Canvas UI & Navigation:
   - Pan/drag support (mouse down + move to pan).
   - Dot grid background responsive to theme (`dark`, `light`, `neutral`).
   - Floating zoom controls: Zoom In (`+`), Zoom Out (`-`), Reset (`100%`), Center/Fit.
   - Smooth transitions and clean CSS styling.

## Verification
- Component compiles cleanly with `npx tsc --noEmit`.
- No server-side rendering crashes.
- Clean error recovery when invalid Mermaid code is passed.

Write report to `.superpowers/sdd/2026-08-20-visual-architecture-exporter/task-2-report.md`.
