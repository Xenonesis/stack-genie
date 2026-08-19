# Task 1: Core Mermaid Diagram Generator Engine

## Goal
Build `src/utils/mermaidGenerator.ts` to automatically generate clean, valid, domain-aware Mermaid.js diagram code from any `TechStack` object with support for layout directions, subgraphs, inter-component connections, and theme styles.

## Files
- Create: `src/utils/mermaidGenerator.ts`
- Test: `tests/mermaid-generator.test.ts`

## Requirements
1. Export `generateMermaidDiagram(selectedStack: TechStack, options?: MermaidOptions): string`
2. `MermaidOptions` interface:
   ```typescript
   export interface MermaidOptions {
     direction?: 'TD' | 'LR';
     groupByLayers?: boolean;
     theme?: 'dark' | 'light' | 'neutral';
     projectName?: string;
   }
   ```
3. Support grouping into 4 architectural layers:
   - Client & UI Layer (Web Framework, CSS Framework, State Management, UI Libraries)
   - API & Backend Layer (Backend Framework, Authentication, API Gateways, Microservices, GraphQL/API, API Documentation)
   - Data & Storage Layer (Database, ORM, Caching, Vector Database, Storage)
   - Cloud & DevOps Layer (Hosting, DevOps/Infrastructure, CI/CD, Monitoring/Observability, Analytics)
4. Inter-tier directional links (`Client_UI --> API_Backend`, `API_Backend --> Data_Storage`, etc.) and specific technology `compatibleWith` link synthesis when both ends are in `selectedStack`.
5. Sanitized node IDs (e.g. replacing hyphens/slashes with underscores) with proper display titles.
6. Injected `classDef` rules matching `dark`, `light`, and `neutral` themes.
7. Graceful empty state when stack is empty (`flowchart TD\n  Empty["No Technologies Selected"]`).

## Test Requirements
Create and run `tests/mermaid-generator.test.ts` to verify:
- Diagram generation with TD and LR direction.
- Subgraph grouping with technology names and layer names.
- Theme classes injected correctly.
- Inter-layer links present.

Run command: `npx tsx tests/mermaid-generator.test.ts`
Expected: Output `Mermaid generator test passed successfully.`
