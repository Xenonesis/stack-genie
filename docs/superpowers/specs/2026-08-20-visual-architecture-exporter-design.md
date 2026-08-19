# Visual Architecture Exporter & Studio Design Specification

**Date:** 2026-08-20  
**Status:** Approved  
**Topic:** Full-Screen Architecture Studio & Multi-Format Diagram Exporter (Mermaid, SVG, PNG)

---

## 1. Overview & Objectives
The **Visual Architecture Exporter & Studio** extends Stack Genie's Topology Map into a full-featured, interactive architectural design and export studio. It enables developers, engineering leads, and CTOs to:
- Visualize the data flow and architectural tiers of any configured `TechStack`.
- Customize layout directions (`Top-to-Bottom` vs `Left-to-Right`), grouping modes, and color themes.
- Edit diagram code in real-time with instant live canvas preview.
- Export production-ready assets in multiple formats: **Mermaid.js code**, **Markdown codeblock**, **Vector SVG (`.svg`)**, and **High-Resolution Retina PNG (`.png`)**.

---

## 2. Component Architecture & File Layout

```
src/
├── components/tech-stack/
│   ├── architecture-studio.tsx          # Full-screen modal / studio view container
│   ├── studio-diagram-canvas.tsx        # Live Mermaid SVG canvas renderer with pan/zoom controls
│   ├── studio-editor-panel.tsx          # Real-time editable Mermaid code editor
│   ├── studio-toolbar.tsx               # Direction toggle (TD/LR), theme selector, subgraph toggle
│   └── studio-export-actions.tsx        # Multi-format export actions (PNG, SVG, Mermaid, Markdown)
└── utils/
    └── mermaidGenerator.ts              # Automatic Mermaid syntax generator from TechStack & metadata
```

---

## 3. Data Flow & State Specification

### 3.1 Studio State
- `mermaidCode: string`: Auto-generated Mermaid syntax, live-editable by the user.
- `direction: 'TD' | 'LR'`: Layout flow direction (Top-Down or Left-to-Right).
- `groupByLayers: boolean`: Grouping by architectural subgraphs (Client, API, Data, DevOps) vs flat connected graph.
- `theme: 'dark' | 'light' | 'neutral'`: Styling presets applied to diagram nodes, edges, and canvas.
- `zoom: number`: Zoom scaling factor for diagram canvas navigation.

### 3.2 Diagram Generator Engine (`mermaidGenerator.ts`)
1. **Tier Partitioning**:
   - **Client & UI Layer**: Web Frameworks, CSS Frameworks, State Management, UI Libraries.
   - **API & Backend Layer**: Backend Frameworks, Authentication, API Gateways, Microservices.
   - **Data & Storage Layer**: Databases, ORMs, In-Memory Caching, Vector Databases.
   - **Cloud & DevOps Layer**: Hosting, DevOps/Infrastructure, CI/CD, Monitoring/Observability.
2. **Inter-Tier Edge Synthesis**:
   - Generates directional links between layers (`Client_UI --> API_Backend --> Data_Storage --> Cloud_DevOps`).
   - Uses individual technology `compatibleWith` connections to synthesize targeted intra- and inter-layer connection paths.
3. **Theme Style Injection**:
   - Injects Mermaid `classDef` definitions for nodes, subgraphs, cluster borders, and link lines.

---

## 4. Multi-Format Export Engine

### 4.1 Mermaid & Markdown Export
- **Copy Mermaid**: Raw syntax for direct use in diagramming tools.
- **Copy Markdown**: Wrapped in ` ```mermaid ... ``` ` block ready for GitHub READMEs, RFCs, and Notion pages.

### 4.2 Vector SVG Export (`.svg`)
- Extracts the rendered SVG DOM element.
- Injects explicit `viewBox`, `width`, `height`, and inline font definitions.
- Generates a standalone downloadable `.svg` file.

### 4.3 High-Resolution Retina PNG Export (`.png`)
- Serializes the SVG into an off-screen HTML5 `<canvas>` scaled at `2x` device pixel ratio.
- Draws smooth anti-aliased backgrounds matching the selected theme.
- Triggers instant `.png` download named `[project-name]-architecture.png`.

---

## 5. User Experience & Interactions
1. In the **Topology Map** tab, the user clicks **"Open Studio & Export"**.
2. The Full-Screen Architecture Studio opens with a live-rendered diagram on the canvas.
3. The user can toggle between `Top-Down` and `Left-to-Right` layouts or switch between `Dark Obsidian`, `Clean Light`, and `Neutral` themes.
4. An optional side editor pane allows editing the generated Mermaid code with instant re-rendering.
5. With one click, the user copies the code or downloads a `.png` or `.svg`.

---

## 6. Testing & Quality Assurance
- Unit test for `mermaidGenerator.ts` validating syntax generation across diverse tech stacks.
- Canvas and SVG serialization verification tests.
- Full Next.js production build check.
