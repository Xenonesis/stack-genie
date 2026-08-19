import assert from 'node:assert';
import { generateMermaidDiagram, MermaidOptions } from '../src/utils/mermaidGenerator';
import { TechStack, Technology } from '../src/types/tech-stack';

// Helper mock technologies
const reactTech: Technology = {
  id: 'react',
  name: 'React',
  category: 'Web Framework',
  description: 'JavaScript library for UI',
  compatibleWith: ['tailwind', 'nextjs', 'typescript']
};

const tailwindTech: Technology = {
  id: 'tailwind-css',
  name: 'Tailwind CSS',
  category: 'CSS Framework',
  description: 'Utility-first CSS framework',
  compatibleWith: ['react', 'nextjs']
};

const expressTech: Technology = {
  id: 'express',
  name: 'Express.js',
  category: 'Backend Framework',
  description: 'Fast, unopinionated web framework for Node.js',
  compatibleWith: ['react', 'postgresql', 'prisma']
};

const prismaTech: Technology = {
  id: 'prisma',
  name: 'Prisma',
  category: 'ORM',
  description: 'Next-generation ORM',
  compatibleWith: ['postgresql', 'express']
};

const postgresTech: Technology = {
  id: 'postgresql',
  name: 'PostgreSQL',
  category: 'Database',
  description: 'Powerful, open source object-relational database system',
  compatibleWith: ['prisma']
};

const vercelTech: Technology = {
  id: 'vercel',
  name: 'Vercel',
  category: 'Hosting',
  description: 'Platform for frontend frameworks and static sites',
  compatibleWith: ['nextjs', 'react']
};

const tanstackRouterTech: Technology = {
  id: '@tanstack/react-router',
  name: 'TanStack Router',
  category: 'Web Framework',
  description: 'Type-safe router for React',
  compatibleWith: ['react']
};

function runTests() {
  console.log('Running Mermaid Generator Tests...\n');

  // Test 1: Empty stack handling
  console.log('Test 1: Empty stack handling');
  const emptyResultTD = generateMermaidDiagram({});
  assert.ok(
    emptyResultTD.includes('flowchart TD') && emptyResultTD.includes('Empty["No Technologies Selected"]'),
    'Empty stack should return empty flowchart TD'
  );

  const emptyResultLR = generateMermaidDiagram({}, { direction: 'LR' });
  assert.ok(
    emptyResultLR.includes('flowchart LR') && emptyResultLR.includes('Empty["No Technologies Selected"]'),
    'Empty stack with LR should return empty flowchart LR'
  );

  const emptyCategoriesResult = generateMermaidDiagram({ 'Web Framework': [] });
  assert.ok(
    emptyCategoriesResult.includes('Empty["No Technologies Selected"]'),
    'Stack with empty category arrays should return empty diagram'
  );

  // Test 2: Direction options (TD vs LR)
  console.log('Test 2: Direction options (TD vs LR)');
  const sampleStack: TechStack = {
    'Web Framework': [reactTech],
    'Backend Framework': [expressTech],
    'Database': [postgresTech],
    'Hosting': [vercelTech]
  };

  const tdDiagram = generateMermaidDiagram(sampleStack, { direction: 'TD' });
  assert.ok(tdDiagram.includes('flowchart TD'), 'Diagram should declare flowchart TD');

  const lrDiagram = generateMermaidDiagram(sampleStack, { direction: 'LR' });
  assert.ok(lrDiagram.includes('flowchart LR'), 'Diagram should declare flowchart LR');

  // Test 3: Subgraph grouping into 4 architectural layers
  console.log('Test 3: Subgraph grouping into architectural layers');
  const fullStack: TechStack = {
    'Web Framework': [reactTech, tanstackRouterTech],
    'CSS Framework': [tailwindTech],
    'Backend Framework': [expressTech],
    'ORM': [prismaTech],
    'Database': [postgresTech],
    'Hosting': [vercelTech]
  };

  const layeredDiagram = generateMermaidDiagram(fullStack, { groupByLayers: true });
  assert.ok(layeredDiagram.includes('subgraph Client_UI'), 'Should contain Client & UI layer subgraph');
  assert.ok(layeredDiagram.includes('Client & UI Layer'), 'Should contain Client & UI Layer title');
  assert.ok(layeredDiagram.includes('subgraph API_Backend'), 'Should contain API & Backend layer subgraph');
  assert.ok(layeredDiagram.includes('API & Backend Layer'), 'Should contain API & Backend Layer title');
  assert.ok(layeredDiagram.includes('subgraph Data_Storage'), 'Should contain Data & Storage layer subgraph');
  assert.ok(layeredDiagram.includes('Data & Storage Layer'), 'Should contain Data & Storage Layer title');
  assert.ok(layeredDiagram.includes('subgraph Cloud_DevOps'), 'Should contain Cloud & DevOps layer subgraph');
  assert.ok(layeredDiagram.includes('Cloud & DevOps Layer'), 'Should contain Cloud & DevOps Layer title');

  // Test 4: Node ID Sanitization
  console.log('Test 4: Node ID sanitization');
  assert.ok(layeredDiagram.includes('react["React"]'), 'Should sanitize and render React node');
  assert.ok(layeredDiagram.includes('tailwind_css["Tailwind CSS"]'), 'Should sanitize hyphenated node ID tailwind-css');
  assert.ok(!layeredDiagram.includes('@tanstack/react-router['), 'Should not contain raw special characters in node ID');
  assert.ok(layeredDiagram.includes('TanStack Router'), 'Should preserve node display title');

  // Test 5: Inter-tier links
  console.log('Test 5: Inter-tier directional links');
  assert.ok(
    layeredDiagram.includes('Client_UI --> API_Backend'),
    'Should contain link from Client_UI to API_Backend'
  );
  assert.ok(
    layeredDiagram.includes('API_Backend --> Data_Storage'),
    'Should contain link from API_Backend to Data_Storage'
  );

  // Test 6: Technology compatibleWith link synthesis
  console.log('Test 6: Technology compatibleWith link synthesis');
  // React is compatible with Tailwind CSS and TanStack Router is compatible with React
  assert.ok(
    layeredDiagram.includes('react') && layeredDiagram.includes('tailwind_css'),
    'Should contain both compatible nodes'
  );

  // Test 7: Theme class definitions and injection
  console.log('Test 7: Theme class definitions and injection');
  const darkDiagram = generateMermaidDiagram(fullStack, { theme: 'dark' });
  assert.ok(darkDiagram.includes('classDef client'), 'Dark theme should inject classDef client');
  assert.ok(darkDiagram.includes('classDef api'), 'Dark theme should inject classDef api');
  assert.ok(darkDiagram.includes('classDef data'), 'Dark theme should inject classDef data');
  assert.ok(darkDiagram.includes('classDef cloud'), 'Dark theme should inject classDef cloud');
  assert.ok(darkDiagram.includes('#1e293b') || darkDiagram.includes('#0f172a'), 'Dark theme should have dark colors');

  const lightDiagram = generateMermaidDiagram(fullStack, { theme: 'light' });
  assert.ok(lightDiagram.includes('classDef client'), 'Light theme should inject classDef client');
  assert.ok(lightDiagram.includes('#f0f9ff') || lightDiagram.includes('#ffffff'), 'Light theme should have light colors');

  const neutralDiagram = generateMermaidDiagram(fullStack, { theme: 'neutral' });
  assert.ok(neutralDiagram.includes('classDef client'), 'Neutral theme should inject classDef client');
  assert.ok(neutralDiagram.includes('#f3f4f6') || neutralDiagram.includes('#e5e7eb'), 'Neutral theme should have neutral colors');

  // Test 8: Project name title
  console.log('Test 8: Project name title');
  const projectDiagram = generateMermaidDiagram(sampleStack, { projectName: 'My Super App' });
  assert.ok(projectDiagram.includes('My Super App'), 'Diagram should include project name');

  // Test 9: Partial layers (only subgraphs for present layers)
  console.log('Test 9: Partial layers (omits empty layers)');
  const clientOnlyStack: TechStack = {
    'Web Framework': [reactTech]
  };
  const clientOnlyDiagram = generateMermaidDiagram(clientOnlyStack);
  assert.ok(clientOnlyDiagram.includes('subgraph Client_UI'), 'Client_UI subgraph should be present');
  assert.ok(!clientOnlyDiagram.includes('subgraph API_Backend'), 'API_Backend subgraph should be absent');
  assert.ok(!clientOnlyDiagram.includes('subgraph Data_Storage'), 'Data_Storage subgraph should be absent');
  assert.ok(!clientOnlyDiagram.includes('subgraph Cloud_DevOps'), 'Cloud_DevOps subgraph should be absent');
  assert.ok(!clientOnlyDiagram.includes('Client_UI --> API_Backend'), 'No inter-layer link to absent layer');

  // Test 10: Non-layer grouping mode (groupByLayers: false)
  console.log('Test 10: Non-layer grouping mode');
  const flatDiagram = generateMermaidDiagram(sampleStack, { groupByLayers: false });
  assert.ok(!flatDiagram.includes('subgraph Client_UI'), 'Should not contain Client_UI layer subgraph when groupByLayers is false');
  assert.ok(flatDiagram.includes('react["React"]'), 'Should still render technology nodes');

  console.log('\nMermaid generator test passed successfully.');
}

runTests();
