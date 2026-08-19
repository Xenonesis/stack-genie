"use client";

import React, { useState, useRef, useCallback, useMemo } from "react";
import {
  Code2,
  RotateCcw,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  HelpCircle,
  Layers,
  ArrowRight,
  Database,
  Palette,
  Terminal,
  Zap,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface StudioEditorPanelProps {
  code: string;
  onChange: (code: string) => void;
  onReset: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  className?: string;
}

export interface MermaidSnippet {
  label: string;
  code: string;
  description: string;
  category?: "flow" | "structure" | "styling" | "shape";
}

export const MERMAID_SNIPPETS: MermaidSnippet[] = [
  {
    label: "-->",
    code: "  NodeA --> NodeB",
    description: "Solid directional arrow link between nodes",
    category: "flow",
  },
  {
    label: "-->|text|",
    code: "  NodeA -->|HTTP / JSON| NodeB",
    description: "Arrow link with labeled relationship description",
    category: "flow",
  },
  {
    label: "-.->",
    code: "  NodeA -.->|Async Event| NodeB",
    description: "Dotted link for asynchronous or optional connections",
    category: "flow",
  },
  {
    label: "==>",
    code: "  NodeA ==>|Primary Flow| NodeB",
    description: "Thick arrow for primary data pipeline or high-priority link",
    category: "flow",
  },
  {
    label: "subgraph",
    code: "  subgraph Layer_Name [\"Layer Title\"]\n    Node1\n    Node2\n  end",
    description: "Grouping container for architecture layers or microservices",
    category: "structure",
  },
  {
    label: "[(Database)]",
    code: "  DB[(\"PostgreSQL\\n(Relational DB)\")]",
    description: "Cylindrical storage/database node shape",
    category: "shape",
  },
  {
    label: "[[Process]]",
    code: "  Worker[[\"Queue Worker\\n(Background Process)\"]]",
    description: "Subroutine / double-bordered worker node shape",
    category: "shape",
  },
  {
    label: "(Rounded)",
    code: "  App(\"React Web App\\n(Frontend UI)\")",
    description: "Rounded rectangular node for UI or apps",
    category: "shape",
  },
  {
    label: "{{Hexagon}}",
    code: "  Gateway{{\"API Gateway\\n(Reverse Proxy)\"}}",
    description: "Hexagonal node shape for gateways, auth, or decision blocks",
    category: "shape",
  },
  {
    label: "classDef",
    code: "  classDef highlight fill:#3b82f6,stroke:#1d4ed8,color:#ffffff,stroke-width:2px;",
    description: "Reusable custom node styling class definition",
    category: "styling",
  },
];

/**
 * Calculates number of lines in Mermaid code.
 */
export function getLineCount(code: string): number {
  if (!code) return 1;
  return code.split("\n").length;
}

/**
 * Calculates character count of code string.
 */
export function getCharacterCount(code: string): number {
  return code ? code.length : 0;
}

/**
 * Inserts or appends a code snippet into current Mermaid code.
 */
export function insertSnippet(
  currentCode: string,
  snippet: string,
  selectionStart?: number,
  selectionEnd?: number
): { newCode: string; newCursorPos: number } {
  if (!currentCode || currentCode.trim() === "") {
    return {
      newCode: snippet,
      newCursorPos: snippet.length,
    };
  }

  if (selectionStart !== undefined && selectionEnd !== undefined) {
    const before = currentCode.slice(0, selectionStart);
    const after = currentCode.slice(selectionEnd);
    
    // Check if we are inserting at a newline boundary
    const needsLeadingNewline = before.length > 0 && !before.endsWith("\n") && !before.endsWith(" ");
    const prefix = needsLeadingNewline && snippet.startsWith("  ") ? "\n" : "";
    
    const newCode = `${before}${prefix}${snippet}${after}`;
    const newCursorPos = selectionStart + prefix.length + snippet.length;
    return { newCode, newCursorPos };
  }

  // Append at end with newline
  const separator = currentCode.endsWith("\n") ? "" : "\n";
  const newCode = `${currentCode}${separator}${snippet}`;
  return {
    newCode,
    newCursorPos: newCode.length,
  };
}

export function StudioEditorPanel({
  code,
  onChange,
  onReset,
  isExpanded,
  onToggleExpand,
  className,
}: StudioEditorPanelProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [showQuickHelp, setShowQuickHelp] = useState(false);

  const lineCount = useMemo(() => getLineCount(code), [code]);
  const charCount = useMemo(() => getCharacterCount(code), [code]);

  // Synchronize line numbers scroll with textarea scroll
  const handleScroll = useCallback(() => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, []);

  // Handle Tab and Shift-Tab key indentation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
        const tabString = "  "; // 2 spaces

        if (!e.shiftKey) {
          if (start === end) {
            // Single cursor insert
            const updated = value.substring(0, start) + tabString + value.substring(end);
            onChange(updated);
            requestAnimationFrame(() => {
              textarea.selectionStart = textarea.selectionEnd = start + tabString.length;
            });
          } else {
            // Multi-line indent
            const lineStart = value.lastIndexOf("\n", start - 1) + 1;
            const lineEnd = value.indexOf("\n", end);
            const effectiveEnd = lineEnd === -1 ? value.length : lineEnd;
            const targetBlock = value.substring(lineStart, effectiveEnd);
            const lines = targetBlock.split("\n");
            const indented = lines.map((line) => tabString + line).join("\n");
            const updated = value.substring(0, lineStart) + indented + value.substring(effectiveEnd);
            
            onChange(updated);
            requestAnimationFrame(() => {
              textarea.selectionStart = start + tabString.length;
              textarea.selectionEnd = end + lines.length * tabString.length;
            });
          }
        } else {
          // Shift+Tab: Outdent
          const lineStart = value.lastIndexOf("\n", start - 1) + 1;
          const lineEnd = value.indexOf("\n", end);
          const effectiveEnd = lineEnd === -1 ? value.length : lineEnd;
          const targetBlock = value.substring(lineStart, effectiveEnd);
          const lines = targetBlock.split("\n");
          let removedTotal = 0;
          let firstLineRemoved = 0;

          const outdented = lines
            .map((line, idx) => {
              if (line.startsWith("  ")) {
                removedTotal += 2;
                if (idx === 0) firstLineRemoved = 2;
                return line.substring(2);
              } else if (line.startsWith(" ")) {
                removedTotal += 1;
                if (idx === 0) firstLineRemoved = 1;
                return line.substring(1);
              }
              return line;
            })
            .join("\n");

          const updated = value.substring(0, lineStart) + outdented + value.substring(effectiveEnd);
          onChange(updated);
          requestAnimationFrame(() => {
            textarea.selectionStart = Math.max(lineStart, start - firstLineRemoved);
            textarea.selectionEnd = Math.max(lineStart, end - removedTotal);
          });
        }
      }
    },
    [onChange]
  );

  // Copy code to clipboard
  const handleCopyCode = useCallback(async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback if clipboard API is restricted
      setCopied(false);
    }
  }, [code]);

  // Insert a snippet at cursor
  const handleInsertSnippet = useCallback(
    (snippetCode: string) => {
      const textarea = textareaRef.current;
      const start = textarea ? textarea.selectionStart : undefined;
      const end = textarea ? textarea.selectionEnd : undefined;

      const { newCode, newCursorPos } = insertSnippet(code, snippetCode, start, end);
      onChange(newCode);

      if (textarea) {
        requestAnimationFrame(() => {
          textarea.focus();
          textarea.selectionStart = textarea.selectionEnd = newCursorPos;
        });
      }
    },
    [code, onChange]
  );

  return (
    <div
      className={cn(
        "flex flex-col w-full border transition-all duration-300 ease-in-out select-none",
        "bg-card dark:bg-[#0c0c0c] border-border dark:border-[#212121] text-foreground dark:text-[#f3f3f3]",
        isExpanded ? "h-[320px] sm:h-[380px] shadow-lg" : "h-[48px]",
        className
      )}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-muted/40 dark:bg-[#121212] border-b border-border dark:border-[#212121] shrink-0 h-[48px]">
        {/* Left: Icon & Title */}
        <div
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          onClick={onToggleExpand}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onToggleExpand();
            }
          }}
          aria-label={isExpanded ? "Collapse Mermaid Code Editor" : "Expand Mermaid Code Editor"}
        >
          <div className="flex items-center justify-center size-7 rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
            <Code2 className="size-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-semibold tracking-tight text-foreground dark:text-[#f3f3f3]">
              Mermaid Syntax
            </span>
            <Badge
              variant="outline"
              className="text-[10px] font-mono px-1.5 py-0 h-4 bg-background/50 dark:bg-[#1a1a1a] text-muted-foreground border-border dark:border-[#2a2a2a]"
            >
              {lineCount} {lineCount === 1 ? "line" : "lines"}
            </Badge>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5">
          {/* Quick Help Guide Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowQuickHelp((prev) => !prev)}
            className={cn(
              "h-7 px-2 text-xs gap-1 text-muted-foreground hover:text-foreground",
              showQuickHelp && "bg-muted text-foreground"
            )}
            title="Mermaid Syntax Cheat Sheet"
          >
            <HelpCircle className="size-3.5" />
            <span className="hidden sm:inline">Cheat Sheet</span>
          </Button>

          {/* Reset Code Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-7 px-2 text-xs gap-1 text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-[#1e1e1e]"
            title="Reset code to auto-generated diagram"
          >
            <RotateCcw className="size-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </Button>

          {/* Copy Code Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyCode}
            className="h-7 px-2 text-xs gap-1 text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-[#1e1e1e]"
            title="Copy Mermaid Code"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-emerald-500" />
                <span className="text-emerald-500 text-[11px]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </Button>

          {/* Expand / Collapse Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleExpand}
            className="size-7 text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-[#1e1e1e]"
            aria-label={isExpanded ? "Collapse Editor" : "Expand Editor"}
            title={isExpanded ? "Collapse Editor" : "Expand Editor"}
          >
            {isExpanded ? <ChevronDown className="size-4" /> : <ChevronUp className="size-4" />}
          </Button>
        </div>
      </div>

      {/* Expanded Editor Body */}
      {isExpanded && (
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden bg-card dark:bg-[#0c0c0c]">
          {/* Quick Snippets Helper Bar */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/20 dark:bg-[#141414] border-b border-border/60 dark:border-[#1e1e1e] overflow-x-auto no-scrollbar shrink-0 text-xs">
            <div className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground shrink-0 pr-1 border-r border-border dark:border-[#262626]">
              <Sparkles className="size-3 text-primary" />
              <span>Snippets:</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {MERMAID_SNIPPETS.map((snippet) => (
                <button
                  key={snippet.label}
                  type="button"
                  onClick={() => handleInsertSnippet(snippet.code)}
                  title={`${snippet.description}\nClick to insert snippet`}
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono",
                    "bg-background/80 dark:bg-[#1c1c1c] text-foreground/80 hover:text-foreground",
                    "border border-border/80 dark:border-[#2a2a2a] hover:border-primary/40 hover:bg-primary/5",
                    "transition-colors whitespace-nowrap cursor-pointer shadow-xs active:scale-95"
                  )}
                >
                  <Plus className="size-2.5 opacity-60" />
                  <span>{snippet.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Help Reference Overlay / Drawer */}
          {showQuickHelp && (
            <div className="p-3 bg-muted/40 dark:bg-[#141414] border-b border-border dark:border-[#212121] text-xs text-muted-foreground shrink-0 max-h-40 overflow-y-auto">
              <div className="flex items-center justify-between font-semibold text-foreground dark:text-[#f3f3f3] mb-2">
                <div className="flex items-center gap-1.5">
                  <Zap className="size-3.5 text-amber-500" />
                  <span>Mermaid Architecture Syntax Cheat Sheet</span>
                </div>
                <button
                  onClick={() => setShowQuickHelp(false)}
                  className="text-xs text-muted-foreground hover:text-foreground underline cursor-pointer"
                >
                  Close
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-[11px]">
                <div className="p-2 rounded bg-background/60 dark:bg-[#1a1a1a] border border-border/60 dark:border-[#262626]">
                  <div className="font-medium text-foreground dark:text-zinc-200 mb-1 flex items-center gap-1">
                    <ArrowRight className="size-3 text-primary" /> Directions
                  </div>
                  <div className="font-mono text-[10px] space-y-0.5 text-muted-foreground">
                    <div><span className="text-primary font-semibold">flowchart TD</span>: Top to Down</div>
                    <div><span className="text-primary font-semibold">flowchart LR</span>: Left to Right</div>
                  </div>
                </div>

                <div className="p-2 rounded bg-background/60 dark:bg-[#1a1a1a] border border-border/60 dark:border-[#262626]">
                  <div className="font-medium text-foreground dark:text-zinc-200 mb-1 flex items-center gap-1">
                    <Layers className="size-3 text-primary" /> Subgraphs
                  </div>
                  <div className="font-mono text-[10px] space-y-0.5 text-muted-foreground">
                    <div><span className="text-foreground dark:text-zinc-300">subgraph</span> LayerName</div>
                    <div>&nbsp;&nbsp;Node1 --- Node2</div>
                    <div><span className="text-foreground dark:text-zinc-300">end</span></div>
                  </div>
                </div>

                <div className="p-2 rounded bg-background/60 dark:bg-[#1a1a1a] border border-border/60 dark:border-[#262626]">
                  <div className="font-medium text-foreground dark:text-zinc-200 mb-1 flex items-center gap-1">
                    <Database className="size-3 text-primary" /> Node Shapes
                  </div>
                  <div className="font-mono text-[10px] space-y-0.5 text-muted-foreground">
                    <div><span className="text-primary">[Name]</span> : Box</div>
                    <div><span className="text-primary">(Name)</span> : Rounded</div>
                    <div><span className="text-primary">[(DB)]</span> : Database</div>
                    <div><span className="text-primary">{`{{Hex}}`}</span> : Gateway</div>
                  </div>
                </div>

                <div className="p-2 rounded bg-background/60 dark:bg-[#1a1a1a] border border-border/60 dark:border-[#262626]">
                  <div className="font-medium text-foreground dark:text-zinc-200 mb-1 flex items-center gap-1">
                    <Palette className="size-3 text-primary" /> Class & Styles
                  </div>
                  <div className="font-mono text-[10px] space-y-0.5 text-muted-foreground">
                    <div><span className="text-primary">classDef</span> name fill:#...,stroke:#...</div>
                    <div><span className="text-primary">class</span> NodeA name;</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Monospace Editor Area */}
          <div className="relative flex flex-1 min-h-0 overflow-hidden font-mono text-xs sm:text-sm">
            {/* Gutter / Line Numbers */}
            <div
              ref={lineNumbersRef}
              aria-hidden="true"
              className={cn(
                "hidden sm:flex flex-col py-3 px-2 text-right select-none overflow-hidden",
                "bg-muted/30 dark:bg-[#101010] text-muted-foreground/40 border-r border-border dark:border-[#212121]",
                "w-10 sm:w-12 text-[11px] leading-6 font-mono shrink-0"
              )}
            >
              {Array.from({ length: Math.max(lineCount, 1) }, (_, i) => (
                <div key={i + 1} className="h-6">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Code Textarea */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onScroll={handleScroll}
              placeholder="%% Enter Mermaid Architecture Diagram Syntax here...&#10;flowchart TD&#10;  Frontend[&quot;Next.js App&quot;] --> API[&quot;Express API&quot;]&#10;  API --> DB[(&quot;PostgreSQL&quot;)]"
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              className={cn(
                "w-full h-full p-3 resize-none bg-transparent outline-none",
                "text-foreground dark:text-[#f3f3f3] placeholder:text-muted-foreground/40",
                "font-mono text-xs sm:text-[13px] leading-6 tracking-wide overflow-y-auto",
                "selection:bg-primary/25 focus-visible:ring-0 focus-visible:outline-none"
              )}
            />
          </div>

          {/* Footer Status Bar */}
          <div className="flex items-center justify-between px-3 py-1 bg-muted/30 dark:bg-[#0f0f0f] border-t border-border/80 dark:border-[#212121] text-[10px] text-muted-foreground font-mono select-none shrink-0">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Terminal className="size-3 text-primary/70" />
                <span>Mermaid v11 Flowchart</span>
              </span>
              <span>•</span>
              <span>Press <kbd className="px-1 py-0.2 rounded bg-muted dark:bg-[#202020] border border-border/60 text-[9px]">Tab</kbd> to indent</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{charCount} chars</span>
              <span>•</span>
              <span>UTF-8</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
