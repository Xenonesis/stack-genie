"use client";

import React, { useCallback, useEffect, useState } from "react";
import { X, Layers, ExternalLink } from "lucide-react";
import { TechStack } from "@/types/tech-stack";
import { generateMermaidDiagram } from "@/utils/mermaidGenerator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StudioToolbar } from "./studio-toolbar";
import { StudioDiagramCanvas } from "./studio-diagram-canvas";
import { StudioEditorPanel } from "./studio-editor-panel";
import { StudioExportActions } from "./studio-export-actions";

export interface ArchitectureStudioProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStack: TechStack;
  projectName: string;
  projectDescription?: string;
}

/**
 * Full-screen Architecture Studio overlay composing the toolbar, diagram
 * canvas, live Mermaid editor, and export actions for the selected stack.
 */
export function ArchitectureStudio({
  isOpen,
  onClose,
  selectedStack,
  projectName,
  projectDescription,
}: ArchitectureStudioProps) {
  // Studio state
  const [direction, setDirection] = useState<'TD' | 'LR'>('TD');
  const [groupByLayers, setGroupByLayers] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light' | 'neutral'>('dark');
  const [zoom, setZoom] = useState(1);
  const [editorOpen, setEditorOpen] = useState(true);
  const [manualCode, setManualCode] = useState<string | null>(null);

  // Captured rendered SVG for export actions (kept in state so the footer
  // re-renders once the diagram becomes available).
  const [svgElement, setSvgElement] = useState<SVGSVGElement | null>(null);

  // Auto-generated diagram unless the user has edited the code manually
  const mermaidCode =
    manualCode ??
    generateMermaidDiagram(selectedStack, {
      direction,
      groupByLayers,
      theme,
      projectName,
    });

  const handleSvgRendered = useCallback((svg: SVGSVGElement | null) => {
    setSvgElement(svg);
  }, []);

  // Reset manual edits so a re-open regenerates a fresh diagram.
  const handleReset = useCallback(() => {
    setManualCode(null);
  }, []);

  const handleClose = useCallback(() => {
    setManualCode(null);
    onClose();
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Architecture Studio">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Studio Panel (full-screen) */}
      <div className="absolute inset-0 flex flex-col bg-background dark:bg-[#0a0a0a]">
        {/* Header */}
        <header className="flex items-center justify-between gap-4 px-4 sm:px-6 h-14 shrink-0 border-b border-border dark:border-[#212121] bg-background/90 dark:bg-[#0a0a0a]/90 backdrop-blur-sm">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-md bg-amber-50 dark:bg-[#141414] border border-amber-200 dark:border-[#212121] flex items-center justify-center text-amber-600 dark:text-[#98ff38] shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-semibold dark:font-normal text-foreground dark:text-[#f3f3f3] uppercase tracking-wider">
                Architecture Studio
              </h2>
              <p className="text-[11px] text-muted-foreground dark:text-[#9c9c9c] truncate">
                {projectName || "Untitled Project"}
                {projectDescription ? ` — ${projectDescription}` : ""}
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClose}
            aria-label="Close studio"
            className="w-8 h-8 rounded-md text-muted-foreground hover:text-foreground shrink-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </header>

        {/* Toolbar */}
        <StudioToolbar
          direction={direction}
          onDirectionChange={setDirection}
          groupByLayers={groupByLayers}
          onGroupByLayersChange={setGroupByLayers}
          theme={theme}
          onThemeChange={setTheme}
          isEditorOpen={editorOpen}
          onToggleEditor={() => setEditorOpen((open) => !open)}
          className="shrink-0"
        />

        {/* Canvas + Editor */}
        <div className="flex-1 min-h-0 flex flex-col gap-3 px-3 sm:px-6 py-4">
          <div className="flex-1 min-h-0">
            <StudioDiagramCanvas
              mermaidCode={mermaidCode}
              theme={theme}
              zoom={zoom}
              onZoomChange={setZoom}
              onSvgRendered={handleSvgRendered}
            />
          </div>

          <StudioEditorPanel
            code={mermaidCode}
            onChange={(code: string) => setManualCode(code)}
            onReset={handleReset}
            isExpanded={editorOpen}
            onToggleExpand={() => setEditorOpen((open) => !open)}
            className="shrink-0"
          />
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-between gap-3 flex-wrap px-4 sm:px-6 py-3 shrink-0 border-t border-border dark:border-[#212121] bg-background/90 dark:bg-[#101010]/90 backdrop-blur-sm">
          <p className="hidden md:flex items-center gap-1.5 text-[11px] text-muted-foreground dark:text-[#9c9c9c]">
            <ExternalLink className="w-3 h-3" />
            Export your diagram as PNG, SVG, or Mermaid Markdown
          </p>
          <StudioExportActions
            mermaidCode={mermaidCode}
            projectName={projectName}
            svgElement={svgElement}
            theme={theme}
            className="justify-end"
          />
        </footer>
      </div>
    </div>
  );
}
