"use client";

import React, { useEffect, useRef, useState, useId, useCallback } from "react";
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  AlertTriangle, 
  Loader2, 
  Layers, 
  Crosshair 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { THEME_CANVAS_BG } from "./studio-theme";

export interface StudioDiagramCanvasProps {
  mermaidCode: string;
  theme: "dark" | "light" | "neutral";
  zoom: number;
  onZoomChange: (zoom: number | ((prev: number) => number)) => void;
  onSvgRendered?: (svgElement: SVGSVGElement | null) => void;
}

export function StudioDiagramCanvas({
  mermaidCode,
  theme,
  zoom,
  onZoomChange,
  onSvgRendered,
}: StudioDiagramCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgWrapperRef = useRef<HTMLDivElement>(null);
  const rawId = useId();
  const idSuffix = rawId.replace(/[^a-zA-Z0-9]/g, "");
  const renderCounterRef = useRef(0);

  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);
  
  // Pan and drag navigation state
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Client-side mount check for SSR safety
  useEffect(() => {
    setMounted(true);
  }, []);

  // Mermaid render effect
  useEffect(() => {
    if (!mounted) return;

    let isCancelled = false;

    async function renderMermaid() {
      if (!mermaidCode || !mermaidCode.trim()) {
        if (!isCancelled) {
          if (svgWrapperRef.current) {
            svgWrapperRef.current.innerHTML = "";
          }
          setRenderError(null);
          setIsLoading(false);
          onSvgRendered?.(null);
        }
        return;
      }

      setIsLoading(true);
      setRenderError(null);

      try {
        // Dynamic import of mermaid is required for browser-only execution and SSR safety in Next.js
        const mermaidModule = await import("mermaid");
        const mermaid = mermaidModule.default;

        if (isCancelled) return;

        const mermaidTheme =
          theme === "dark" ? "dark" : theme === "light" ? "default" : "neutral";

        mermaid.initialize({
          startOnLoad: false,
          theme: mermaidTheme,
          securityLevel: "loose",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          flowchart: {
            htmlLabels: true,
            curve: "basis",
            useMaxWidth: false,
          },
        });

        const renderId = `mermaid-svg-${idSuffix}-${renderCounterRef.current++}`;
        const { svg, bindFunctions } = await mermaid.render(renderId, mermaidCode);

        if (isCancelled) return;

        if (svgWrapperRef.current) {
          svgWrapperRef.current.innerHTML = svg;
          bindFunctions?.(svgWrapperRef.current);

          const svgEl = svgWrapperRef.current.querySelector("svg");
          if (svgEl) {
            svgEl.style.maxWidth = "100%";
            svgEl.style.height = "auto";
            svgEl.style.display = "block";
            svgEl.classList.add("select-none", "pointer-events-auto");
          }
          onSvgRendered?.(svgEl);
        }
        setRenderError(null);
      } catch (err: unknown) {
        if (isCancelled) return;
        const msg = err instanceof Error ? err.message : String(err);
        setRenderError(msg);
        onSvgRendered?.(null);

        // Remove any error element mermaid might have appended to document.body
        const danglingErrors = document.querySelectorAll(`[id^="dmermaid-svg-"]`);
        danglingErrors.forEach((el) => el.remove());
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    renderMermaid();

    return () => {
      isCancelled = true;
    };
  }, [mermaidCode, theme, mounted, idSuffix, onSvgRendered]);

  // Mouse pan handlers
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Only primary mouse button (left-click)
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - pan.x,
      y: e.clientY - pan.y,
    };
  }, [pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Native non-passive wheel listener for zoom (Ctrl/Cmd + wheel) and pan.
  // React's onWheel is passive (preventDefault is a no-op), which lets the
  // browser double-zoom and scroll the page behind the modal; a manual
  // { passive: false } listener prevents both.
  useEffect(() => {
    if (!mounted) return;
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        // Zoom with clamped step (bounds 0.2..3.0)
        const delta = e.deltaY < 0 ? 0.1 : -0.1;
        onZoomChange((prev) => {
          const next = Math.round((prev + delta) * 10) / 10;
          return Math.min(3.0, Math.max(0.2, next));
        });
      } else {
        // Pan canvas
        setPan((prev) => ({
          x: prev.x - e.deltaX,
          y: prev.y - e.deltaY,
        }));
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [mounted, onZoomChange]);

  // Zoom control actions
  const handleZoomIn = useCallback(() => {
    onZoomChange((prev) => {
      const next = Math.round((prev + 0.1) * 10) / 10;
      return Math.min(3.0, next);
    });
  }, [onZoomChange]);

  const handleZoomOut = useCallback(() => {
    onZoomChange((prev) => {
      const next = Math.round((prev - 0.1) * 10) / 10;
      return Math.max(0.2, next);
    });
  }, [onZoomChange]);

  const handleResetZoom = useCallback(() => {
    onZoomChange(1.0);
    setPan({ x: 0, y: 0 });
  }, [onZoomChange]);

  const handleCenter = useCallback(() => {
    setPan({ x: 0, y: 0 });
  }, []);

  // Theme-aware grid background styles (bg colors shared with export)
  const gridBackground = {
    backgroundColor: THEME_CANVAS_BG[theme],
    backgroundImage:
      theme === "dark"
        ? "radial-gradient(circle, rgba(255, 255, 255, 0.08) 1.2px, transparent 1.2px)"
        : theme === "light"
        ? "radial-gradient(circle, rgba(0, 0, 0, 0.08) 1.2px, transparent 1.2px)"
        : "radial-gradient(circle, rgba(100, 116, 139, 0.12) 1.2px, transparent 1.2px)",
    backgroundSize: "24px 24px",
    backgroundPosition: `${pan.x}px ${pan.y}px`,
  };

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[450px] flex items-center justify-center bg-muted/10 rounded-xl border border-border animate-pulse">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Initializing Diagram Canvas...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Interactive Diagram Canvas"
      tabIndex={0}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={gridBackground}
      className={`relative w-full h-full min-h-[450px] overflow-hidden rounded-xl border border-border/80 dark:border-[#212124] select-none transition-colors duration-200 outline-none focus-visible:ring-1 focus-visible:ring-ring ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 dark:bg-zinc-900/80 backdrop-blur-md border border-border text-xs text-muted-foreground shadow-sm animate-in fade-in duration-200">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-500" />
          <span>Rendering...</span>
        </div>
      )}

      {/* Syntax Error Banner */}
      {renderError && (
        <div className="absolute top-4 left-4 right-4 max-w-xl mx-auto z-30 p-3.5 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive dark:bg-red-950/40 dark:border-red-800/40 dark:text-red-300 backdrop-blur-md shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold uppercase tracking-wider">
                Mermaid Syntax Error
              </h4>
              <p className="text-xs mt-1 font-mono opacity-90 break-words line-clamp-3">
                {renderError}
              </p>
              <p className="text-[11px] mt-1.5 opacity-75">
                Check your diagram syntax in the editor to resolve this issue.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!mermaidCode?.trim() && !renderError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 pointer-events-none">
          <div className="w-12 h-12 rounded-xl bg-muted/40 dark:bg-zinc-900/60 border border-border flex items-center justify-center text-muted-foreground mb-3">
            <Layers className="w-6 h-6 opacity-60" />
          </div>
          <h3 className="text-sm font-medium text-foreground">No Architecture Selected</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs">
            Select technologies or write Mermaid flowchart syntax to view your architecture diagram.
          </p>
        </div>
      )}

      {/* SVG Canvas Workspace with pan & zoom transform */}
      <div className="w-full h-full flex items-center justify-center pointer-events-none">
        <div
          ref={svgWrapperRef}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.05s ease-out",
          }}
          className="flex items-center justify-center pointer-events-auto p-8"
        />
      </div>

      {/* Floating Canvas Controls Toolbar */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1 p-1 bg-background/80 dark:bg-zinc-900/80 backdrop-blur-md border border-border/80 dark:border-zinc-800 shadow-md rounded-xl">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground"
          onClick={handleZoomOut}
          disabled={zoom <= 0.2}
          title="Zoom Out (Ctrl + Scroll Down)"
        >
          <ZoomOut className="w-4 h-4" />
          <span className="sr-only">Zoom Out</span>
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="h-8 px-2 rounded-lg text-xs font-mono font-medium text-muted-foreground hover:text-foreground"
          onClick={handleResetZoom}
          title="Reset Zoom to 100%"
        >
          {Math.round(zoom * 100)}%
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground"
          onClick={handleZoomIn}
          disabled={zoom >= 3.0}
          title="Zoom In (Ctrl + Scroll Up)"
        >
          <ZoomIn className="w-4 h-4" />
          <span className="sr-only">Zoom In</span>
        </Button>

        <div className="w-px h-4 bg-border/80 mx-0.5" />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground"
          onClick={handleCenter}
          title="Center Diagram"
        >
          <Crosshair className="w-4 h-4" />
          <span className="sr-only">Center View</span>
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground"
          onClick={handleResetZoom}
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="sr-only">Reset</span>
        </Button>
      </div>
    </div>
  );
}
