import { TechStack, Technology } from '@/types/tech-stack';

export interface MermaidOptions {
  direction?: 'TD' | 'LR';
  groupByLayers?: boolean;
  theme?: 'dark' | 'light' | 'neutral';
  projectName?: string;
}

export type LayerId = 'Client_UI' | 'API_Backend' | 'Data_Storage' | 'Cloud_DevOps';

export interface ArchitecturalLayer {
  id: LayerId;
  title: string;
  className: string;
  categories: string[];
}

export const ARCHITECTURAL_LAYERS: ArchitecturalLayer[] = [
  {
    id: 'Client_UI',
    title: 'Client & UI Layer',
    className: 'client',
    categories: [
      'Web Framework',
      'CSS Framework',
      'State Management',
      'UI Libraries',
      'Native Framework',
      'Data Visualization',
      '3D/Game Dev',
      'Maps/Geo'
    ]
  },
  {
    id: 'API_Backend',
    title: 'API & Backend Layer',
    className: 'api',
    categories: [
      'Backend Framework',
      'Authentication',
      'API Gateways',
      'API Gateway',
      'Microservices',
      'GraphQL/API',
      'API Documentation',
      'Runtime',
      'Languages',
      'Real-time',
      'Message Queues/Event Streaming',
      'Background Jobs',
      'Validation',
      'Security',
      'AI/LLM',
      'AI Agents',
      'MLOps',
      'Workflow Automation',
      'CMS',
      'BaaS',
      'Edge/Serverless',
      'Payment',
      'Email',
      'Video/Streaming',
      'Feature Flags',
      'Web3/Blockchain'
    ]
  },
  {
    id: 'Data_Storage',
    title: 'Data & Storage Layer',
    className: 'data',
    categories: [
      'Database',
      'ORM',
      'Caching',
      'Vector Database',
      'Storage',
      'Search',
      'Data Engineering'
    ]
  },
  {
    id: 'Cloud_DevOps',
    title: 'Cloud & DevOps Layer',
    className: 'cloud',
    categories: [
      'Hosting',
      'DevOps/Infrastructure',
      'CI/CD',
      'Monitoring/Observability',
      'Analytics',
      'Testing',
      'Build Tools',
      'Package Manager',
      'Monorepo',
      'Version Control',
      'Code Quality/Linting',
      'Documentation',
      'Dev Environments'
    ]
  }
];

const THEMES: Record<'dark' | 'light' | 'neutral', string[]> = {
  dark: [
    'classDef client fill:#1e293b,stroke:#38bdf8,stroke-width:2px,color:#f8fafc;',
    'classDef api fill:#1e293b,stroke:#818cf8,stroke-width:2px,color:#f8fafc;',
    'classDef data fill:#1e293b,stroke:#34d399,stroke-width:2px,color:#f8fafc;',
    'classDef cloud fill:#1e293b,stroke:#f472b6,stroke-width:2px,color:#f8fafc;',
    'classDef default fill:#0f172a,stroke:#475569,stroke-width:1px,color:#f8fafc;'
  ],
  light: [
    'classDef client fill:#f0f9ff,stroke:#0284c7,stroke-width:2px,color:#0f172a;',
    'classDef api fill:#eef2ff,stroke:#6366f1,stroke-width:2px,color:#0f172a;',
    'classDef data fill:#ecfdf5,stroke:#059669,stroke-width:2px,color:#0f172a;',
    'classDef cloud fill:#fdf2f8,stroke:#db2777,stroke-width:2px,color:#0f172a;',
    'classDef default fill:#ffffff,stroke:#cbd5e1,stroke-width:1px,color:#0f172a;'
  ],
  neutral: [
    'classDef client fill:#f3f4f6,stroke:#4b5563,stroke-width:2px,color:#111827;',
    'classDef api fill:#e5e7eb,stroke:#374151,stroke-width:2px,color:#111827;',
    'classDef data fill:#f3f4f6,stroke:#4b5563,stroke-width:2px,color:#111827;',
    'classDef cloud fill:#e5e7eb,stroke:#374151,stroke-width:2px,color:#111827;',
    'classDef default fill:#f9fafb,stroke:#9ca3af,stroke-width:1px,color:#111827;'
  ]
};

/**
 * Sanitizes a string to be a valid Mermaid node ID.
 * Replaces non-alphanumeric characters with underscores and ensures valid starting character.
 */
export function sanitizeNodeId(id: string): string {
  if (!id) return 'node_unknown';

  let sanitized = id
    .replace(/^@+/, '')
    .replace(/[^a-zA-Z0-9_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');

  if (!sanitized) {
    sanitized = 'node';
  }

  // Node ID cannot start with a digit in strict Mermaid syntax
  if (/^[0-9]/.test(sanitized)) {
    sanitized = `n_${sanitized}`;
  }

  return sanitized;
}

/**
 * Escapes characters that may break Mermaid node labels.
 */
function escapeLabel(label: string): string {
  if (!label) return '';
  return label.replace(/"/g, "'").replace(/\n/g, ' ');
}

/**
 * Determines which architectural layer a category belongs to.
 */
export function getLayerForCategory(category: string): LayerId {
  const normalized = (category || '').trim().toLowerCase();

  for (const layer of ARCHITECTURAL_LAYERS) {
    if (layer.categories.some(c => c.toLowerCase() === normalized)) {
      return layer.id;
    }
  }

  // Fallback heuristics for unknown categories
  if (normalized.includes('ui') || normalized.includes('css') || normalized.includes('front') || normalized.includes('web')) {
    return 'Client_UI';
  }
  if (normalized.includes('data') || normalized.includes('db') || normalized.includes('store') || normalized.includes('sql')) {
    return 'Data_Storage';
  }
  if (normalized.includes('cloud') || normalized.includes('ops') || normalized.includes('deploy') || normalized.includes('infra')) {
    return 'Cloud_DevOps';
  }

  return 'API_Backend';
}

/**
 * Generates Mermaid diagram code from a selected TechStack.
 *
 * @param selectedStack The user-selected technologies organized by category
 * @param options Configuration options for the diagram layout and styling
 * @returns Clean, valid Mermaid.js flowchart definition string
 */
export function generateMermaidDiagram(
  selectedStack: TechStack,
  options?: MermaidOptions
): string {
  const direction = options?.direction || 'TD';
  const groupByLayers = options?.groupByLayers ?? true;
  const theme = options?.theme || 'dark';
  const projectName = options?.projectName?.trim();

  // Extract all non-empty technologies
  const allTechs: Technology[] = [];
  const seenIds = new Set<string>();

  for (const category of Object.keys(selectedStack)) {
    const list = selectedStack[category];
    if (Array.isArray(list)) {
      for (const tech of list) {
        if (tech && tech.id && !seenIds.has(tech.id)) {
          seenIds.add(tech.id);
          allTechs.push(tech);
        }
      }
    }
  }

  // Graceful empty state
  if (allTechs.length === 0) {
    const emptyLines: string[] = [];
    if (projectName) {
      emptyLines.push('---');
      emptyLines.push(`title: ${escapeLabel(projectName)}`);
      emptyLines.push('---');
    }
    emptyLines.push(`flowchart ${direction}`);
    emptyLines.push('  Empty["No Technologies Selected"]');
    return emptyLines.join('\n');
  }

  const lines: string[] = [];

  // Frontmatter title if project name provided
  if (projectName) {
    lines.push('---');
    lines.push(`title: ${escapeLabel(projectName)}`);
    lines.push('---');
  }

  lines.push(`flowchart ${direction}`);

  // Create technology lookup map for compatibility linking
  const techMap = new Map<string, Technology>();
  for (const tech of allTechs) {
    techMap.set(tech.id, tech);
  }

  // Group technologies by layer
  const layerMap: Record<LayerId, Technology[]> = {
    Client_UI: [],
    API_Backend: [],
    Data_Storage: [],
    Cloud_DevOps: []
  };

  for (const tech of allTechs) {
    const layerId = getLayerForCategory(tech.category);
    layerMap[layerId].push(tech);
  }

  if (groupByLayers) {
    // Render layer subgraphs
    for (const layer of ARCHITECTURAL_LAYERS) {
      const layerTechs = layerMap[layer.id];
      if (layerTechs.length > 0) {
        lines.push(`  subgraph ${layer.id} ["${layer.title}"]`);
        for (const tech of layerTechs) {
          const sId = sanitizeNodeId(tech.id);
          lines.push(`    ${sId}["${escapeLabel(tech.name)}"]:::${layer.className}`);
        }
        lines.push('  end');
      }
    }

    // Inter-tier directional links between present subgraphs
    const hasClient = layerMap.Client_UI.length > 0;
    const hasBackend = layerMap.API_Backend.length > 0;
    const hasData = layerMap.Data_Storage.length > 0;
    const hasCloud = layerMap.Cloud_DevOps.length > 0;

    if (hasClient && hasBackend) {
      lines.push('  Client_UI --> API_Backend');
    }
    if (hasBackend && hasData) {
      lines.push('  API_Backend --> Data_Storage');
    }
    if (hasClient && hasData && !hasBackend) {
      lines.push('  Client_UI --> Data_Storage');
    }
    if (hasCloud) {
      if (hasBackend) {
        lines.push('  API_Backend --> Cloud_DevOps');
      } else if (hasClient) {
        lines.push('  Client_UI --> Cloud_DevOps');
      } else if (hasData) {
        lines.push('  Data_Storage --> Cloud_DevOps');
      }
    }
  } else {
    // Flat / category grouping
    for (const tech of allTechs) {
      const sId = sanitizeNodeId(tech.id);
      const layerId = getLayerForCategory(tech.category);
      const layer = ARCHITECTURAL_LAYERS.find(l => l.id === layerId);
      const className = layer ? layer.className : 'default';
      lines.push(`  ${sId}["${escapeLabel(tech.name)}"]:::${className}`);
    }
  }

  // Technology compatibleWith link synthesis (specific direct relationships)
  const seenEdges = new Set<string>();
  for (const tech of allTechs) {
    if (Array.isArray(tech.compatibleWith)) {
      for (const compId of tech.compatibleWith) {
        if (techMap.has(compId) && compId !== tech.id) {
          const sourceId = sanitizeNodeId(tech.id);
          const targetId = sanitizeNodeId(compId);
          const edgeKey = `${sourceId}-->${targetId}`;
          const reverseKey = `${targetId}-->${sourceId}`;

          if (!seenEdges.has(edgeKey) && !seenEdges.has(reverseKey)) {
            seenEdges.add(edgeKey);
            lines.push(`  ${sourceId} -.-> ${targetId}`);
          }
        }
      }
    }
  }

  // Inject theme classDef rules
  const themeRules = THEMES[theme] || THEMES.dark;
  lines.push('');
  for (const rule of themeRules) {
    lines.push(`  ${rule}`);
  }

  return lines.join('\n');
}
