const fs = require('fs');
let content = fs.readFileSync('src/components/tech-stack-builder.tsx', 'utf8');

const replacements = [
  { pattern: /bg-\[#0d1117\]/g, replacement: 'bg-background' },
  { pattern: /bg-\[#161b22\]/g, replacement: 'bg-card' },
  { pattern: /bg-\[#1c2128\]/g, replacement: 'bg-accent text-accent-foreground' },
  { pattern: /border-gray-[78]00/g, replacement: 'border-border' },
  { pattern: /text-gray-[45]00/g, replacement: 'text-muted-foreground' },
  { pattern: /text-gray-[32]00/g, replacement: 'text-foreground' },
  { pattern: /text-white/g, replacement: 'text-foreground' },
  { pattern: /bg-gray-800/g, replacement: 'bg-accent text-accent-foreground' },
  { pattern: /hover:bg-gray-800/g, replacement: 'hover:bg-accent hover:text-accent-foreground' },
  { pattern: /bg-gray-700/g, replacement: 'bg-muted' },
  { pattern: /border-gray-600/g, replacement: 'border-input/50' },
  { pattern: /bg-purple-[98]00\/20/g, replacement: 'bg-primary/20' },
  { pattern: /border-purple-[65]00\/30/g, replacement: 'border-primary/30' },
  { pattern: /bg-green-[98]00\/30/g, replacement: 'bg-success/30' },
  { pattern: /text-green-400/g, replacement: 'text-success' },
  { pattern: /text-purple-400/g, replacement: 'text-primary' },
  { pattern: /hover:text-purple-[34]00/g, replacement: 'hover:text-primary-foreground' },
  { pattern: /from-purple-600 to-blue-600/g, replacement: 'from-primary to-secondary' },
  { pattern: /hover:from-purple-700 hover:to-blue-700/g, replacement: 'hover:from-primary/90 hover:to-secondary/90' },
  { pattern: /text-yellow-400/g, replacement: 'text-warning' },
  { pattern: /text-red-400/g, replacement: 'text-destructive' },
  { pattern: /bg-yellow-900\/[23]0/g, replacement: 'bg-warning/20' },
  { pattern: /bg-red-900\/[23]0/g, replacement: 'bg-destructive/20' },
  { pattern: /text-yellow-200/g, replacement: 'text-warning-foreground' },
  { pattern: /border-yellow-600\/30/g, replacement: 'border-warning/30' },
  { pattern: /bg-blue-900\/[23]0/g, replacement: 'bg-primary/20' },
  { pattern: /text-blue-200/g, replacement: 'text-primary-foreground' },
  { pattern: /border-blue-600\/30/g, replacement: 'border-primary/30' },
  { pattern: /text-xs/g, replacement: 'text-[11px] font-medium tracking-wider' },
  { pattern: /p-3/g, replacement: 'p-4' },
  { pattern: /gap-3/g, replacement: 'gap-4' },
  { pattern: /mb-3/g, replacement: 'mb-4' },
  { pattern: /<h1 className=\"([^\"]+)\">/g, replacement: '<h1 className=\"$1 font-display tracking-tight\">' },
  { pattern: /<h2 className=\"([^\"]+)\">/g, replacement: '<h2 className=\"$1 font-display tracking-tight\">' },
  { pattern: /rounded /g, replacement: 'rounded-md shadow-sm border border-border/50 backdrop-blur-md ' },
  { pattern: /font-mono/g, replacement: 'font-mono tracking-tight' },
  { pattern: /text-blue-400/g, replacement: 'text-primary' },
  { pattern: /hover:border-gray-600/g, replacement: 'hover:border-primary/50' }
];

for (const {pattern, replacement} of replacements) {
    content = content.replace(pattern, replacement);
}

fs.writeFileSync('src/components/tech-stack-builder.tsx', content);
console.log('Script updated successfully');
