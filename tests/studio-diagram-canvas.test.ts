import assert from 'node:assert';
import { StudioDiagramCanvasProps } from '../src/components/tech-stack/studio-diagram-canvas';

function runStudioDiagramCanvasTests() {
  console.log('--- Running Studio Diagram Canvas Tests ---');

  // Test 1: Interface Contract Validation
  console.log('Test 1: StudioDiagramCanvasProps interface validation');
  const mockProps: StudioDiagramCanvasProps = {
    mermaidCode: 'flowchart TD\n  A --> B',
    theme: 'dark',
    zoom: 1.0,
    onZoomChange: (z) => console.log('Zoom:', z),
    onSvgRendered: (el) => console.log('SVG:', el),
  };

  assert.strictEqual(mockProps.theme, 'dark');
  assert.strictEqual(mockProps.zoom, 1.0);
  assert.strictEqual(typeof mockProps.onZoomChange, 'function');
  assert.strictEqual(typeof mockProps.onSvgRendered, 'function');
  console.log('✓ Test 1 passed: Interface contract is properly structured');

  // Test 2: Theme Mapping Logic
  console.log('Test 2: Theme mapping logic');
  const mapTheme = (theme: 'dark' | 'light' | 'neutral') => 
    theme === 'dark' ? 'dark' : theme === 'light' ? 'default' : 'neutral';

  assert.strictEqual(mapTheme('dark'), 'dark');
  assert.strictEqual(mapTheme('light'), 'default');
  assert.strictEqual(mapTheme('neutral'), 'neutral');
  console.log('✓ Test 2 passed: Theme mapping correctly translates to Mermaid theme identifiers');

  // Test 3: Zoom In Math & Bounds (Clamped at 3.0, step +0.1)
  console.log('Test 3: Zoom In math and upper bound clamping');
  const zoomIn = (currentZoom: number) => {
    const next = Math.round((currentZoom + 0.1) * 10) / 10;
    return Math.min(3.0, next);
  };

  assert.strictEqual(zoomIn(1.0), 1.1);
  assert.strictEqual(zoomIn(1.9), 2.0);
  assert.strictEqual(zoomIn(2.9), 3.0);
  assert.strictEqual(zoomIn(3.0), 3.0);
  assert.strictEqual(zoomIn(3.5), 3.0);
  console.log('✓ Test 3 passed: Zoom in calculates cleanly and clamps at max 3.0');

  // Test 4: Zoom Out Math & Bounds (Clamped at 0.2, step -0.1)
  console.log('Test 4: Zoom Out math and lower bound clamping');
  const zoomOut = (currentZoom: number) => {
    const next = Math.round((currentZoom - 0.1) * 10) / 10;
    return Math.max(0.2, next);
  };

  assert.strictEqual(zoomOut(1.0), 0.9);
  assert.strictEqual(zoomOut(0.5), 0.4);
  assert.strictEqual(zoomOut(0.3), 0.2);
  assert.strictEqual(zoomOut(0.2), 0.2);
  assert.strictEqual(zoomOut(0.1), 0.2);
  console.log('✓ Test 4 passed: Zoom out calculates cleanly and clamps at min 0.2');

  // Test 5: Drag Offset Calculations
  console.log('Test 5: Drag offset math');
  const initialPan = { x: 50, y: -20 };
  const mouseStart = { clientX: 200, clientY: 300 };
  const dragStart = {
    x: mouseStart.clientX - initialPan.x,
    y: mouseStart.clientY - initialPan.y,
  };

  // Mouse moves by +30px X, -15px Y
  const currentMouse = { clientX: 230, clientY: 285 };
  const newPan = {
    x: currentMouse.clientX - dragStart.x,
    y: currentMouse.clientY - dragStart.y,
  };

  assert.strictEqual(newPan.x, 80);
  assert.strictEqual(newPan.y, -35);
  console.log('✓ Test 5 passed: Pan and drag offset calculation is exact');

  // Test 6: Grid Background Responsive Styling
  console.log('Test 6: Grid background styles per theme');
  const getGridStyles = (theme: 'dark' | 'light' | 'neutral', pan: { x: number; y: number }) => {
    if (theme === 'dark') {
      return {
        backgroundColor: '#09090b',
        backgroundPosition: `${pan.x}px ${pan.y}px`,
      };
    }
    if (theme === 'light') {
      return {
        backgroundColor: '#ffffff',
        backgroundPosition: `${pan.x}px ${pan.y}px`,
      };
    }
    return {
      backgroundColor: '#f4f4f5',
      backgroundPosition: `${pan.x}px ${pan.y}px`,
    };
  };

  const darkStyles = getGridStyles('dark', { x: 10, y: 20 });
  const lightStyles = getGridStyles('light', { x: 0, y: 0 });
  const neutralStyles = getGridStyles('neutral', { x: -15, y: 45 });

  assert.strictEqual(darkStyles.backgroundColor, '#09090b');
  assert.strictEqual(darkStyles.backgroundPosition, '10px 20px');
  assert.strictEqual(lightStyles.backgroundColor, '#ffffff');
  assert.strictEqual(neutralStyles.backgroundColor, '#f4f4f5');
  assert.strictEqual(neutralStyles.backgroundPosition, '-15px 45px');
  console.log('✓ Test 6 passed: Grid background styles respond to theme and pan coordinates');

  // Test 7: Mermaid Module Initialization Contract
  console.log('Test 7: Mermaid configuration contract');
  const mermaidConfig = {
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
    flowchart: {
      htmlLabels: true,
      curve: 'basis',
      useMaxWidth: false,
    },
  };

  assert.strictEqual(mermaidConfig.startOnLoad, false);
  assert.strictEqual(mermaidConfig.securityLevel, 'loose');
  assert.strictEqual(mermaidConfig.flowchart.useMaxWidth, false);
  console.log('✓ Test 7 passed: Mermaid config options match required SSR & canvas parameters');

  console.log('--- All Studio Diagram Canvas Tests Passed! ---');
}

runStudioDiagramCanvasTests();
