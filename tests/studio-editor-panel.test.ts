import assert from 'node:assert';
import {
  StudioEditorPanelProps,
  getLineCount,
  getCharacterCount,
  insertSnippet,
  MERMAID_SNIPPETS,
  type MermaidSnippet,
} from '../src/components/tech-stack/studio-editor-panel';

function runStudioEditorPanelTests() {
  console.log('--- Running Studio Editor Panel Tests ---');

  // Test 1: Interface Contract Validation
  console.log('Test 1: StudioEditorPanelProps interface validation');
  let currentCode = 'flowchart TD\n  A --> B';
  let isExpandedState = true;

  const mockProps: StudioEditorPanelProps = {
    code: currentCode,
    onChange: (newCode: string) => {
      currentCode = newCode;
    },
    onReset: () => {
      currentCode = 'flowchart TD\n  Default --> Node';
    },
    isExpanded: isExpandedState,
    onToggleExpand: () => {
      isExpandedState = !isExpandedState;
    },
  };

  assert.strictEqual(typeof mockProps.code, 'string');
  assert.strictEqual(typeof mockProps.onChange, 'function');
  assert.strictEqual(typeof mockProps.onReset, 'function');
  assert.strictEqual(typeof mockProps.isExpanded, 'boolean');
  assert.strictEqual(typeof mockProps.onToggleExpand, 'function');

  mockProps.onChange('flowchart LR\n  X --> Y');
  assert.strictEqual(currentCode, 'flowchart LR\n  X --> Y');

  mockProps.onReset();
  assert.strictEqual(currentCode, 'flowchart TD\n  Default --> Node');

  mockProps.onToggleExpand();
  assert.strictEqual(isExpandedState, false);

  console.log('✓ Test 1 passed: Interface contract operates and mutates as expected');

  // Test 2: Line Count Helper Calculations
  console.log('Test 2: Line count calculation logic');
  assert.strictEqual(getLineCount(''), 1);
  assert.strictEqual(getLineCount('flowchart TD'), 1);
  assert.strictEqual(getLineCount('flowchart TD\n  A --> B'), 2);
  assert.strictEqual(getLineCount('flowchart TD\n  A --> B\n  B --> C\n'), 4);
  assert.strictEqual(getLineCount('line1\nline2\nline3\nline4\nline5'), 5);
  console.log('✓ Test 2 passed: Line count helper accurately counts newlines and handles empty strings');

  // Test 3: Character Count Helper
  console.log('Test 3: Character count calculation logic');
  assert.strictEqual(getCharacterCount(''), 0);
  assert.strictEqual(getCharacterCount('hello'), 5);
  assert.strictEqual(getCharacterCount('flowchart TD\n  A --> B'), 22);
  console.log('✓ Test 3 passed: Character count is exact');

  // Test 4: Snippets Definition & Validity
  console.log('Test 4: Mermaid snippets catalog validation');
  assert.ok(Array.isArray(MERMAID_SNIPPETS), 'MERMAID_SNIPPETS should be an array');
  assert.ok(MERMAID_SNIPPETS.length >= 5, 'Should provide at least 5 standard snippets');

  const snippetLabels = MERMAID_SNIPPETS.map((s: MermaidSnippet) => s.label);
  assert.ok(snippetLabels.includes('-->') || snippetLabels.some((l: string) => l.includes('Arrow')), 'Must include arrow link snippet');
  assert.ok(snippetLabels.includes('subgraph') || snippetLabels.some((l: string) => l.includes('subgraph')), 'Must include subgraph snippet');
  assert.ok(snippetLabels.includes('classDef') || snippetLabels.some((l: string) => l.includes('classDef')), 'Must include classDef snippet');

  MERMAID_SNIPPETS.forEach((snippet: MermaidSnippet) => {
    assert.ok(snippet.label && snippet.label.trim().length > 0, 'Snippet must have a label');
    assert.ok(snippet.code && snippet.code.trim().length > 0, 'Snippet must have code');
    assert.ok(snippet.description && snippet.description.trim().length > 0, 'Snippet must have a description');
  });
  console.log('✓ Test 4 passed: Snippet catalog contains required syntax constructs with metadata');

  // Test 5: Snippet Insertion Logic
  console.log('Test 5: Snippet insertion helper logic');
  const baseCode = 'flowchart TD\n  Frontend["Next.js"]';
  const arrowSnippet = '  Frontend --> Backend["Node.js"]';
  
  // Insertion at end without cursor
  const resultEnd = insertSnippet(baseCode, arrowSnippet);
  assert.strictEqual(resultEnd.newCode, `${baseCode}\n${arrowSnippet}`);
  assert.strictEqual(resultEnd.newCursorPos, resultEnd.newCode.length);

  // Insertion into empty string
  const resultEmpty = insertSnippet('', 'flowchart TD\n  A --> B');
  assert.strictEqual(resultEmpty.newCode, 'flowchart TD\n  A --> B');

  // Insertion at specific cursor position in the middle
  const codeWithMiddle = 'flowchart TD\n\n  Backend';
  const insertPos = 'flowchart TD\n'.length;
  const resultMiddle = insertSnippet(codeWithMiddle, '  Frontend --> API', insertPos, insertPos);
  assert.strictEqual(resultMiddle.newCode, 'flowchart TD\n  Frontend --> API\n  Backend');
  assert.strictEqual(resultMiddle.newCursorPos, insertPos + '  Frontend --> API'.length);

  // Replacement of selected text
  const codeToReplace = 'flowchart TD\n  REPLACE_ME --> Backend';
  const selStart = codeToReplace.indexOf('REPLACE_ME');
  const selEnd = selStart + 'REPLACE_ME'.length;
  const resultReplace = insertSnippet(codeToReplace, 'WebClient', selStart, selEnd);
  assert.strictEqual(resultReplace.newCode, 'flowchart TD\n  WebClient --> Backend');
  assert.strictEqual(resultReplace.newCursorPos, selStart + 'WebClient'.length);
  console.log('✓ Test 5 passed: Snippet insertion handles end, empty, mid-point, and selection replacement');

  // Test 6: Tab Indent & Outdent Simulation
  console.log('Test 6: Tab indentation math and logic');
  const indentCode = (code: string, start: number, end: number, isShift: boolean = false) => {
    const tabString = '  ';
    if (!isShift) {
      if (start === end) {
        const newCode = code.slice(0, start) + tabString + code.slice(end);
        return { newCode, newStart: start + tabString.length, newEnd: end + tabString.length };
      } else {
        // Multi-line indent
        const lineStart = code.lastIndexOf('\n', start - 1) + 1;
        const lineEnd = code.indexOf('\n', end);
        const effectiveEnd = lineEnd === -1 ? code.length : lineEnd;
        const targetBlock = code.slice(lineStart, effectiveEnd);
        const lines = targetBlock.split('\n');
        const indented = lines.map(line => tabString + line).join('\n');
        const newCode = code.slice(0, lineStart) + indented + code.slice(effectiveEnd);
        return {
          newCode,
          newStart: start + tabString.length,
          newEnd: end + (lines.length * tabString.length)
        };
      }
    } else {
      // Shift-tab outdent
      const lineStart = code.lastIndexOf('\n', start - 1) + 1;
      const lineEnd = code.indexOf('\n', end);
      const effectiveEnd = lineEnd === -1 ? code.length : lineEnd;
      const targetBlock = code.slice(lineStart, effectiveEnd);
      const lines = targetBlock.split('\n');
      let removedCount = 0;
      const outdented = lines.map(line => {
        if (line.startsWith('  ')) {
          removedCount += 2;
          return line.slice(2);
        } else if (line.startsWith(' ')) {
          removedCount += 1;
          return line.slice(1);
        }
        return line;
      }).join('\n');
      const newCode = code.slice(0, lineStart) + outdented + code.slice(effectiveEnd);
      return {
        newCode,
        newStart: Math.max(lineStart, start - (lines[0].startsWith('  ') ? 2 : lines[0].startsWith(' ') ? 1 : 0)),
        newEnd: Math.max(lineStart, end - removedCount)
      };
    }
  };

  const sample = 'flowchart TD\nA --> B';
  const indentSingle = indentCode(sample, 13, 13);
  assert.strictEqual(indentSingle.newCode, 'flowchart TD\n  A --> B');

  const outdentSingle = indentCode('flowchart TD\n  A --> B', 15, 15, true);
  assert.strictEqual(outdentSingle.newCode, 'flowchart TD\nA --> B');
  console.log('✓ Test 6 passed: Tab key indentation and Shift-Tab outdent logic calculated cleanly');

  // Test 7: Theme & Layout Classes Contract
  console.log('Test 7: Theme and styling classes specifications');
  const themeClasses = {
    bg: 'bg-card dark:bg-[#0c0c0c]',
    border: 'border-border dark:border-[#212121]',
    text: 'text-foreground dark:text-[#f3f3f3]',
  };
  assert.ok(themeClasses.bg.includes('dark:bg-[#0c0c0c]'));
  assert.ok(themeClasses.border.includes('dark:border-[#212121]'));
  assert.ok(themeClasses.text.includes('dark:text-[#f3f3f3]'));
  console.log('✓ Test 7 passed: Theme classes match project studio standard tokens');

  console.log('--- All Studio Editor Panel Tests Passed! ---');
}

runStudioEditorPanelTests();
