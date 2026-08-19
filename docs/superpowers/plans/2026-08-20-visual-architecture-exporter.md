# Visual Architecture Exporter & Studio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full-screen Architecture Studio and multi-format diagram exporter (Mermaid.js, SVG, PNG, Markdown) for Stack Genie's Topology Map.

**Architecture:** Create a domain-aware Mermaid syntax generator (`mermaidGenerator.ts`), a client-side SVG diagram canvas with pan/zoom (`studio-diagram-canvas.tsx`), an editable code panel (`studio-editor-panel.tsx`), studio toolbar & export actions (`studio-toolbar.tsx`, `studio-export-actions.tsx`), and a full-screen studio container (`architecture-studio.tsx`) integrated with `ArchitectureFlowView`.

**Tech Stack:** React 19, Next.js 16 (Turbopack), TypeScript, Lucide React, HTML5 Canvas API, SVG Serialization.

## Global Constraints
- Pure client-side generation and rendering without external server dependencies.
- Crisp 2x retina scaling on `.png` exports.
- Seamless light and dark mode support adhering to Tailwind CSS v4 variables.
- 100% type-safe contracts with zero build or test regressions.

---

### Task 1: Core Mermaid Diagram Generator Engine

**Files:**
- Create: `src/utils/mermaidGenerator.ts`
- Test: `tests/mermaid-generator.test.ts`

**Interfaces:**
- Produces: `generateMermaidDiagram(selectedStack: TechStack, options?: MermaidOptions): string`
- `MermaidOptions`: `{ direction?: 'TD' | 'LR'; groupByLayers?: boolean; theme?: 'dark' | 'light' | 'neutral'; projectName?: string }`

- [ ] **Step 1: Write the failing unit test**

Create `tests/mermaid-generator.test.ts`:
```typescript
import { generateMermaidDiagram } from "../src/utils/mermaidGenerator";
import { TechStack } from "../src/types/tech-stack";

const mockStack: TechStack = {
  "Web Framework": [{ id: "nextjs", name: "Next.js", category: "Web Framework", description: "React framework" }],
  "Database": [{ id: "postgresql", name: "PostgreSQL", category: "Database", description: "Relational DB" }],
  "ORM": [{ id: "prisma", name: "Prisma", category: "ORM", description: "ORM" }],
  "Hosting": [{ id: "vercel", name: "Vercel", category: "Hosting", description: "Cloud platform" }]
};

const diagram = generateMermaidDiagram(mockStack, { direction: "TD", groupByLayers: true, theme: "dark" });

if (!diagram.includes("flowchart TD")) {
  throw new Error("Expected flowchart TD in diagram output");
}
if (!diagram.includes("Next.js") || !diagram.includes("PostgreSQL")) {
  throw new Error("Expected technology names in diagram output");
}
console.log("Mermaid generator test passed successfully.");
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx tsx tests/mermaid-generator.test.ts`  
Expected: FAIL (Cannot find module `../src/utils/mermaidGenerator`)

- [ ] **Step 3: Implement `src/utils/mermaidGenerator.ts`**

Write `src/utils/mermaidGenerator.ts` supporting layer grouping, node sanitize, inter-layer connections, and theme class definitions.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx tsx tests/mermaid-generator.test.ts`  
Expected: PASS ("Mermaid generator test passed successfully.")

- [ ] **Step 5: Commit**

```bash
git add src/utils/mermaidGenerator.ts tests/mermaid-generator.test.ts
git commit -m "feat: add domain-aware Mermaid diagram generator"
```

---

### Task 2: Studio Diagram Canvas & SVG Renderer

**Files:**
- Create: `src/components/tech-stack/studio-diagram-canvas.tsx`

**Interfaces:**
- Produces: `StudioDiagramCanvas({ mermaidCode, theme, zoom, onZoomChange, onSvgRendered }: StudioDiagramCanvasProps)`

- [ ] **Step 1: Implement `studio-diagram-canvas.tsx`**

Build the live SVG canvas supporting pan/zoom navigation, interactive grid background, loading states, and SVG element reference extraction for export pipelines.

- [ ] **Step 2: Verify component TypeScript compilation**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/components/tech-stack/studio-diagram-canvas.tsx
git commit -m "feat: add studio diagram canvas component"
```

---

### Task 3: Studio Editor Panel

**Files:**
- Create: `src/components/tech-stack/studio-editor-panel.tsx`

**Interfaces:**
- Produces: `StudioEditorPanel({ code, onChange, onReset, isExpanded, onToggleExpand }: StudioEditorPanelProps)`

- [ ] **Step 1: Implement `studio-editor-panel.tsx`**

Create the editable code drawer featuring a monospace textarea, quick reset to auto-generated code, line count indicator, and collapse/expand controls.

- [ ] **Step 2: Verify component TypeScript compilation**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/components/tech-stack/studio-editor-panel.tsx
git commit -m "feat: add live Mermaid studio editor panel"
```

---

### Task 4: Studio Toolbar & Export Pipeline Actions

**Files:**
- Create: `src/components/tech-stack/studio-toolbar.tsx`
- Create: `src/components/tech-stack/studio-export-actions.tsx`

**Interfaces:**
- Produces: `StudioToolbar({ direction, onDirectionChange, groupByLayers, onGroupByLayersChange, theme, onThemeChange })`
- Produces: `StudioExportActions({ mermaidCode, projectName, svgElement, theme })`

- [ ] **Step 1: Implement `studio-toolbar.tsx`**

Build controls for layout direction (`TD`/`LR`), grouping mode toggle, and theme switch (`dark`/`light`/`neutral`).

- [ ] **Step 2: Implement `studio-export-actions.tsx`**

Build multi-format export routines:
- Copy raw Mermaid syntax
- Copy Markdown block (` ```mermaid ... ``` `)
- Download `.svg` vector file
- Download retina 2x `.png` file using HTML5 Canvas rendering

- [ ] **Step 3: Verify TypeScript compilation**

Run: `npx tsc --noEmit`

- [ ] **Step 4: Commit**

```bash
git add src/components/tech-stack/studio-toolbar.tsx src/components/tech-stack/studio-export-actions.tsx
git commit -m "feat: add studio toolbar and multi-format export actions"
```

---

### Task 5: Architecture Studio Container & Topology View Integration

**Files:**
- Create: `src/components/tech-stack/architecture-studio.tsx`
- Modify: `src/components/tech-stack/architecture-flow-view.tsx`
- Modify: `src/components/tech-stack-builder.tsx`

**Interfaces:**
- Produces: `ArchitectureStudio({ isOpen, onClose, selectedStack, projectName }: ArchitectureStudioProps)`
- Connects: "Open Studio & Export" button in `ArchitectureFlowView` to launch `ArchitectureStudio`.

- [ ] **Step 1: Implement `architecture-studio.tsx`**

Combine `StudioToolbar`, `StudioDiagramCanvas`, `StudioEditorPanel`, and `StudioExportActions` inside a full-screen overlay dialog.

- [ ] **Step 2: Update `architecture-flow-view.tsx`**

Add an "Open Studio & Export" CTA button to the Topology Map header.

- [ ] **Step 3: Update `tech-stack-builder.tsx`**

Pass `projectName` and studio triggers cleanly.

- [ ] **Step 4: Verify Next.js build**

Run: `npm run build`

- [ ] **Step 5: Commit**

```bash
git add src/components/tech-stack/architecture-studio.tsx src/components/tech-stack/architecture-flow-view.tsx src/components/tech-stack-builder.tsx
git commit -m "feat: integrate Full-Screen Architecture Studio into Stack Genie"
```

---

### Task 6: Full Verification & Quality Assurance

**Files:**
- Test: `tests/template-compatibility.ts`
- Test: `tests/verify-new-tech.ts`
- Test: `tests/test-icons.ts`
- Test: `tests/mermaid-generator.test.ts`
- Test: `test-functionality.ts`

- [ ] **Step 1: Run all verification test suites**

Run: `npm run test:templates && npx tsx tests/verify-new-tech.ts && npx tsx tests/test-icons.ts && npx tsx tests/mermaid-generator.test.ts && npx tsx test-functionality.ts`  
Expected: All suites PASS.

- [ ] **Step 2: Run Next.js production build**

Run: `npm run build`  
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "chore: verify architecture studio and exporter test suite"
```
