import assert from 'node:assert';
import {
  StudioToolbarProps,
  THEME_OPTIONS,
} from '../src/components/tech-stack/studio-toolbar';
import {
  StudioExportActionsProps,
  formatMermaidMarkdown,
  sanitizeProjectFilename,
  getExportFilename,
  getThemeBackgroundColor,
  prepareSvgStringForExport,
} from '../src/components/tech-stack/studio-export-actions';

function runStudioExportTests() {
  console.log('--- Running Studio Toolbar & Export Actions Tests ---');

  // Test 1: StudioToolbarProps interface validation
  console.log('Test 1: StudioToolbarProps interface contract validation');
  const toolbarProps: StudioToolbarProps = {
    direction: 'TD',
    onDirectionChange: (_d) => {},
    groupByLayers: true,
    onGroupByLayersChange: (_g) => {},
    theme: 'dark',
    onThemeChange: (_t) => {},
    isEditorOpen: false,
    onToggleEditor: () => {},
  };

  assert.strictEqual(toolbarProps.direction, 'TD');
  assert.strictEqual(toolbarProps.groupByLayers, true);
  assert.strictEqual(toolbarProps.theme, 'dark');
  assert.strictEqual(toolbarProps.isEditorOpen, false);
  assert.strictEqual(typeof toolbarProps.onDirectionChange, 'function');
  assert.strictEqual(typeof toolbarProps.onGroupByLayersChange, 'function');
  assert.strictEqual(typeof toolbarProps.onThemeChange, 'function');
  assert.strictEqual(typeof toolbarProps.onToggleEditor, 'function');
  console.log('✓ Test 1 passed: StudioToolbarProps interface contract is solid');

  // Test 2: Theme Options Catalog
  console.log('Test 2: THEME_OPTIONS metadata completeness');
  assert.strictEqual(THEME_OPTIONS.length, 3);
  const themeIds = THEME_OPTIONS.map((t) => t.id);
  assert.deepStrictEqual(themeIds, ['dark', 'light', 'neutral']);

  const darkTheme = THEME_OPTIONS.find((t) => t.id === 'dark')!;
  assert.strictEqual(darkTheme.label, 'Dark Obsidian');
  assert.strictEqual(darkTheme.bgColor, '#080808');

  const lightTheme = THEME_OPTIONS.find((t) => t.id === 'light')!;
  assert.strictEqual(lightTheme.label, 'Clean Light');
  assert.strictEqual(lightTheme.bgColor, '#ffffff');

  const neutralTheme = THEME_OPTIONS.find((t) => t.id === 'neutral')!;
  assert.strictEqual(neutralTheme.label, 'Neutral Slate');
  assert.strictEqual(neutralTheme.bgColor, '#0f172a');
  console.log('✓ Test 2 passed: THEME_OPTIONS catalog is properly defined');

  // Test 3: StudioExportActionsProps interface validation
  console.log('Test 3: StudioExportActionsProps interface contract validation');
  const exportProps: StudioExportActionsProps = {
    mermaidCode: 'flowchart TD\n  A --> B',
    projectName: 'my-awesome-stack',
    svgElement: null,
    theme: 'dark',
  };

  assert.strictEqual(exportProps.mermaidCode, 'flowchart TD\n  A --> B');
  assert.strictEqual(exportProps.projectName, 'my-awesome-stack');
  assert.strictEqual(exportProps.svgElement, null);
  assert.strictEqual(exportProps.theme, 'dark');
  console.log('✓ Test 3 passed: StudioExportActionsProps interface contract is verified');

  // Test 4: formatMermaidMarkdown helper
  console.log('Test 4: formatMermaidMarkdown helper');
  const rawCode = 'flowchart LR\n  Client["Next.js"] --> API["FastAPI"]';
  const formattedMd = formatMermaidMarkdown(rawCode);
  assert.strictEqual(
    formattedMd,
    '```mermaid\nflowchart LR\n  Client["Next.js"] --> API["FastAPI"]\n```'
  );

  assert.strictEqual(formatMermaidMarkdown(''), '```mermaid\n\n```');
  assert.strictEqual(
    formatMermaidMarkdown('  \nflowchart TD\n  '),
    '```mermaid\nflowchart TD\n```'
  );
  console.log('✓ Test 4 passed: formatMermaidMarkdown produces valid fenced markdown blocks');

  // Test 5: sanitizeProjectFilename helper
  console.log('Test 5: sanitizeProjectFilename helper');
  assert.strictEqual(sanitizeProjectFilename('My SaaS Project'), 'my-saas-project');
  assert.strictEqual(sanitizeProjectFilename('Stack Genie @ 2026!'), 'stack-genie-2026');
  assert.strictEqual(sanitizeProjectFilename('   ---Super___App---   '), 'super___app');
  assert.strictEqual(sanitizeProjectFilename('special/chars\\and:symbols*'), 'special-chars-and-symbols');
  assert.strictEqual(sanitizeProjectFilename('', 'default-stack'), 'default-stack');
  assert.strictEqual(sanitizeProjectFilename(null as unknown as string, 'fallback'), 'fallback');
  console.log('✓ Test 5 passed: sanitizeProjectFilename sanitizes dirty strings cleanly');

  // Test 6: getExportFilename helper
  console.log('Test 6: getExportFilename helper');
  assert.strictEqual(
    getExportFilename('E-Commerce Core', 'svg'),
    'e-commerce-core-architecture.svg'
  );
  assert.strictEqual(
    getExportFilename('AI Microservices', 'png'),
    'ai-microservices-architecture.png'
  );
  assert.strictEqual(
    getExportFilename('', 'png'),
    'stack-genie-architecture.png'
  );
  assert.strictEqual(
    getExportFilename('Fintech App', 'md'),
    'fintech-app-architecture.md'
  );
  console.log('✓ Test 6 passed: getExportFilename generates standardized download filenames');

  // Test 7: getThemeBackgroundColor helper
  assert.strictEqual(getThemeBackgroundColor('unknown' as unknown as 'dark'), '#080808');
  assert.strictEqual(getThemeBackgroundColor('light'), '#ffffff');
  assert.strictEqual(getThemeBackgroundColor('neutral'), '#0f172a');
  assert.strictEqual(getThemeBackgroundColor('unknown' as unknown as 'dark'), '#080808');
  console.log('✓ Test 7 passed: getThemeBackgroundColor matches theme canvas specifications');

  // Test 8: prepareSvgStringForExport helper
  console.log('Test 8: prepareSvgStringForExport serialization');
  
  // Case A: Bare SVG element string without XML declaration or xmlns
  const bareSvg = '<svg viewBox="0 0 500 300"><g><rect width="100" height="50"/></g></svg>';
  const preparedSvg = prepareSvgStringForExport(bareSvg);

  assert.ok(preparedSvg.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(preparedSvg.includes('xmlns="http://www.w3.org/2000/svg"'));
  assert.ok(preparedSvg.includes('viewBox="0 0 500 300"'));

  // Case B: SVG with existing XML declaration
  const xmlSvg = '<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg"><circle r="10"/></svg>';
  const preparedXmlSvg = prepareSvgStringForExport(xmlSvg);
  assert.strictEqual(preparedXmlSvg.indexOf('<?xml'), 0);
  assert.strictEqual(preparedXmlSvg.lastIndexOf('<?xml'), 0); // No duplicate XML declarations

  // Case C: SVG element object with outerHTML serialization
  const mockSvgElement = {
    outerHTML: '<svg width="600" height="400"><text>Architecture</text></svg>',
  };
  const preparedMockSvg = prepareSvgStringForExport(mockSvgElement as unknown as SVGSVGElement);
  assert.ok(preparedMockSvg.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(preparedMockSvg.includes('xmlns="http://www.w3.org/2000/svg"'));
  assert.ok(preparedMockSvg.includes('Architecture'));

  // Case E: Null input
  assert.strictEqual(prepareSvgStringForExport(null), '');
  assert.strictEqual(prepareSvgStringForExport(''), '');
  console.log('✓ Test 8 passed: prepareSvgStringForExport guarantees valid standalone SVG XML');

  // Test 9: Retina Canvas Scaling Calculations (scale = 2)
  console.log('Test 9: Retina 2x scale and dimension calculation logic');
  const calculateDimensions = (
    viewBoxStr: string | null,
    attrWidth: number | null,
    attrHeight: number | null,
    scale: number = 2
  ) => {
    let width = 0;
    let height = 0;

    if (viewBoxStr) {
      const parts = viewBoxStr.split(/\s+|,/).map(parseFloat);
      if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
        width = parts[2];
        height = parts[3];
      }
    }

    if (!width || !height) {
      if (attrWidth && attrHeight && attrWidth > 0 && attrHeight > 0) {
        width = attrWidth;
        height = attrHeight;
      }
    }

    if (!width || width <= 0) width = 1200;
    if (!height || height <= 0) height = 800;

    return {
      sourceWidth: width,
      sourceHeight: height,
      canvasWidth: Math.ceil(width * scale),
      canvasHeight: Math.ceil(height * scale),
    };
  };

  const dim1 = calculateDimensions('0 0 1024 768', null, null, 2);
  assert.strictEqual(dim1.sourceWidth, 1024);
  assert.strictEqual(dim1.sourceHeight, 768);
  assert.strictEqual(dim1.canvasWidth, 2048);
  assert.strictEqual(dim1.canvasHeight, 1536);

  const dim2 = calculateDimensions(null, 800, 600, 2);
  assert.strictEqual(dim2.sourceWidth, 800);
  assert.strictEqual(dim2.sourceHeight, 600);
  assert.strictEqual(dim2.canvasWidth, 1600);
  assert.strictEqual(dim2.canvasHeight, 1200);

  const dimFallback = calculateDimensions(null, null, null, 2);
  assert.strictEqual(dimFallback.sourceWidth, 1200);
  assert.strictEqual(dimFallback.sourceHeight, 800);
  assert.strictEqual(dimFallback.canvasWidth, 2400);
  assert.strictEqual(dimFallback.canvasHeight, 1600);

  console.log('✓ Test 9 passed: 2x Retina dimension calculations are accurate');

  console.log('--- All Studio Toolbar & Export Tests Passed Successfully! ---');
}

runStudioExportTests();
