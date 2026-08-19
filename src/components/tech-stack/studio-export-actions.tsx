"use client";

import React, { useState, useCallback } from "react";
import {
  Copy,
  Check,
  FileCode,
  FileText,
  ImageIcon,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { THEME_CANVAS_BG } from "./studio-theme";

export interface StudioExportActionsProps {
  mermaidCode: string;
  projectName: string;
  svgElement: SVGSVGElement | null;
  theme: 'dark' | 'light' | 'neutral';
  className?: string;
}

/**
 * Returns background fill color for canvas rendering based on selected diagram theme.
 * Value comes from THEME_CANVAS_BG so preview and exported PNG always match.
 */
export function getThemeBackgroundColor(theme: 'dark' | 'light' | 'neutral'): string {
  return THEME_CANVAS_BG[theme] ?? THEME_CANVAS_BG.dark;
}

/**
 * Wraps raw Mermaid diagram syntax into GitHub/Notion compatible markdown code block.
 */
export function formatMermaidMarkdown(mermaidCode: string): string {
  const code = (mermaidCode || '').trim();
  return `\`\`\`mermaid\n${code}\n\`\`\``;
}

/**
 * Sanitizes a project name for clean, safe filename usage across filesystems.
 */
export function sanitizeProjectFilename(name: string, fallback: string = 'stack'): string {
  if (!name || typeof name !== 'string') return fallback;
  const sanitized = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
  return sanitized || fallback;
}

/**
 * Generates formatted filename for export files.
 */
export function getExportFilename(
  projectName: string,
  extension: 'svg' | 'png' | 'md' | 'mmd'
): string {
  const safeName = sanitizeProjectFilename(projectName, 'stack-genie');
  return `${safeName}-architecture.${extension}`;
}

/**
 * Serializes SVGSVGElement or SVG string into a valid standalone XML document.
 * Ensures XML declaration, SVG namespaces (xmlns, xmlns:xlink), and dimensions.
 */
export function prepareSvgStringForExport(
  svgInput: SVGSVGElement | string | null,
  options?: {
    theme?: 'dark' | 'light' | 'neutral';
    width?: number;
    height?: number;
  }
): string {
  if (!svgInput) return '';

  let svgString = '';
  if (typeof svgInput === 'string') {
    svgString = svgInput.trim();
  } else if (typeof XMLSerializer !== 'undefined' && svgInput instanceof Node) {
    const serializer = new XMLSerializer();
    svgString = serializer.serializeToString(svgInput);
  } else if (svgInput && typeof svgInput === 'object' && 'outerHTML' in svgInput) {
    const rawOuter = (svgInput as { outerHTML: unknown }).outerHTML;
    if (typeof rawOuter === 'string') {
      svgString = rawOuter;
    }
  }

  if (!svgString) return '';

  // Ensure root xmlns attribute is present
  if (!svgString.includes('xmlns="http://www.w3.org/2000/svg"')) {
    svgString = svgString.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  // Ensure xlink namespace is present if xlink references exist
  if (svgString.includes('xlink:') && !svgString.includes('xmlns:xlink="http://www.w3.org/1999/xlink"')) {
    svgString = svgString.replace('<svg', '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
  }

  // Prepend standard XML declaration if missing
  if (!svgString.startsWith('<?xml')) {
    svgString = `<?xml version="1.0" encoding="UTF-8"?>\n${svgString}`;
  }

  return svgString;
}

/**
 * Robust clipboard writing with fallback support.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Clipboard API blocked or restricted, try document.execCommand fallback
  }

  try {
    if (typeof document !== 'undefined') {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '-9999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      return successful;
    }
  } catch {
    return false;
  }

  return false;
}

/**
 * Triggers client-side browser file download from Blob.
 */
export function triggerFileDownload(blob: Blob, filename: string): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 100);
}

/**
 * Serializes SVG and initiates browser file download for .svg format.
 */
export async function exportSvg(
  svgElement: SVGSVGElement | null,
  projectName: string,
  theme: 'dark' | 'light' | 'neutral' = 'dark'
): Promise<boolean> {
  if (!svgElement) return false;

  try {
    const serializedSvg = prepareSvgStringForExport(svgElement, { theme });
    if (!serializedSvg) return false;

    const blob = new Blob([serializedSvg], { type: 'image/svg+xml;charset=utf-8' });
    const filename = getExportFilename(projectName, 'svg');
    triggerFileDownload(blob, filename);
    return true;
  } catch (error) {
    console.error('Failed to export SVG:', error);
    return false;
  }
}

/**
 * Renders SVG to HTML5 Canvas at 2x resolution (Retina) and triggers .png download.
 */
export async function exportRetinaPng(
  svgElement: SVGSVGElement | null,
  projectName: string,
  theme: 'dark' | 'light' | 'neutral' = 'dark',
  scale: number = 2
): Promise<boolean> {
  if (!svgElement) return false;

  return new Promise<boolean>((resolve) => {
    try {
      const serializedSvg = prepareSvgStringForExport(svgElement, { theme });
      if (!serializedSvg) {
        resolve(false);
        return;
      }

      // Determine dimensions
      let width = 0;
      let height = 0;

      // 1. Try viewBox attribute
      const viewBoxAttr = svgElement.getAttribute('viewBox');
      if (viewBoxAttr) {
        const parts = viewBoxAttr.split(/\s+|,/).map(parseFloat);
        if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
          width = parts[2];
          height = parts[3];
        }
      }

      // 2. Try SVG width / height attributes
      if (!width || !height) {
        const w = parseFloat(svgElement.getAttribute('width') || '');
        const h = parseFloat(svgElement.getAttribute('height') || '');
        if (w > 0 && h > 0) {
          width = w;
          height = h;
        }
      }

      // 3. Try getBoundingClientRect
      if (!width || !height) {
        const rect = svgElement.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          width = rect.width;
          height = rect.height;
        }
      }

      // 4. Default fallback dimensions
      if (!width || width <= 0) width = 1200;
      if (!height || height <= 0) height = 800;

      const svgBlob = new Blob([serializedSvg], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);

      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const targetWidth = Math.ceil(width * scale);
          const targetHeight = Math.ceil(height * scale);

          canvas.width = targetWidth;
          canvas.height = targetHeight;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            URL.revokeObjectURL(svgUrl);
            resolve(false);
            return;
          }

          // Fill canvas background with matching theme color
          const bgColor = getThemeBackgroundColor(theme);
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, targetWidth, targetHeight);

          // Draw scaled SVG image
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          // Generate PNG Blob
          canvas.toBlob((pngBlob) => {
            URL.revokeObjectURL(svgUrl);
            if (!pngBlob) {
              resolve(false);
              return;
            }

            const filename = getExportFilename(projectName, 'png');
            triggerFileDownload(pngBlob, filename);
            resolve(true);
          }, 'image/png');
        } catch (canvasError) {
          URL.revokeObjectURL(svgUrl);
          console.error('Canvas draw error:', canvasError);
          resolve(false);
        }
      };

      img.onerror = (imgError) => {
        URL.revokeObjectURL(svgUrl);
        console.error('Image load error during PNG generation:', imgError);
        resolve(false);
      };

      img.src = svgUrl;
    } catch (error) {
      console.error('Failed to initiate PNG export:', error);
      resolve(false);
    }
  });
}

export function StudioExportActions({
  mermaidCode,
  projectName,
  svgElement,
  theme,
  className,
}: StudioExportActionsProps) {
  const { toast } = useToast();
  const [isCopiedMermaid, setIsCopiedMermaid] = useState(false);
  const [isCopiedMarkdown, setIsCopiedMarkdown] = useState(false);
  const [isExportingPng, setIsExportingPng] = useState(false);
  const [isExportingSvg, setIsExportingSvg] = useState(false);

  // Copy raw Mermaid syntax
  const handleCopyMermaid = useCallback(async () => {
    if (!mermaidCode || !mermaidCode.trim()) {
      toast({
        title: "No diagram code",
        description: "There is no Mermaid syntax to copy.",
        variant: "destructive",
      });
      return;
    }

    const success = await copyToClipboard(mermaidCode);
    if (success) {
      setIsCopiedMermaid(true);
      toast({
        title: "Mermaid code copied!",
        description: "Raw flowchart syntax has been copied to your clipboard.",
      });
      setTimeout(() => setIsCopiedMermaid(false), 2000);
    } else {
      toast({
        title: "Copy failed",
        description: "Could not copy Mermaid syntax to clipboard.",
        variant: "destructive",
      });
    }
  }, [mermaidCode, toast]);

  // Copy formatted Markdown block
  const handleCopyMarkdown = useCallback(async () => {
    if (!mermaidCode || !mermaidCode.trim()) {
      toast({
        title: "No diagram code",
        description: "There is no Mermaid syntax to format into Markdown.",
        variant: "destructive",
      });
      return;
    }

    const markdown = formatMermaidMarkdown(mermaidCode);
    const success = await copyToClipboard(markdown);
    if (success) {
      setIsCopiedMarkdown(true);
      toast({
        title: "Markdown block copied!",
        description: "Formatted ```mermaid code block ready for GitHub or Notion.",
      });
      setTimeout(() => setIsCopiedMarkdown(false), 2000);
    } else {
      toast({
        title: "Copy failed",
        description: "Could not copy Markdown block to clipboard.",
        variant: "destructive",
      });
    }
  }, [mermaidCode, toast]);

  // Download SVG
  const handleDownloadSvg = useCallback(async () => {
    if (!svgElement) {
      toast({
        title: "Diagram not ready",
        description: "Please wait for the diagram to finish rendering before exporting SVG.",
        variant: "destructive",
      });
      return;
    }

    setIsExportingSvg(true);
    try {
      const success = await exportSvg(svgElement, projectName, theme);
      if (success) {
        toast({
          title: "SVG downloaded!",
          description: `Saved vector architecture diagram as ${getExportFilename(projectName, 'svg')}`,
        });
      } else {
        toast({
          title: "SVG export failed",
          description: "Could not serialize the diagram to SVG format.",
          variant: "destructive",
        });
      }
    } finally {
      setIsExportingSvg(false);
    }
  }, [svgElement, projectName, theme, toast]);

  // Download Retina PNG (2x)
  const handleDownloadPng = useCallback(async () => {
    if (!svgElement) {
      toast({
        title: "Diagram not ready",
        description: "Please wait for the diagram to finish rendering before exporting PNG.",
        variant: "destructive",
      });
      return;
    }

    setIsExportingPng(true);
    try {
      const success = await exportRetinaPng(svgElement, projectName, theme, 2);
      if (success) {
        toast({
          title: "Retina PNG downloaded!",
          description: `Saved 2x high-resolution image as ${getExportFilename(projectName, 'png')}`,
        });
      } else {
        toast({
          title: "PNG export failed",
          description: "Could not render the diagram canvas into PNG format.",
          variant: "destructive",
        });
      }
    } finally {
      setIsExportingPng(false);
    }
  }, [svgElement, projectName, theme, toast]);

  return (
    <div
      className={cn("flex items-center flex-wrap gap-2", className)}
      role="group"
      aria-label="Diagram Export and Sharing Actions"
    >
      {/* Primary Action: Download 2x Retina PNG */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="sm"
            onClick={handleDownloadPng}
            disabled={!svgElement || isExportingPng}
            className={cn(
              "h-8 px-3 gap-1.5 text-xs font-semibold shadow-xs transition-all",
              "bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-black"
            )}
          >
            {isExportingPng ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <ImageIcon className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">Download PNG</span>
            <span className="sm:hidden">PNG</span>
            <span className="text-[10px] font-mono opacity-85 px-1 py-0.2 rounded bg-black/20 dark:bg-black/20">
              2x
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          <p className="font-semibold">Download Retina PNG (2x)</p>
          <p className="text-[11px] text-muted-foreground">High-definition raster image with theme background</p>
        </TooltipContent>
      </Tooltip>

      {/* Secondary Action: Download SVG */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDownloadSvg}
            disabled={!svgElement || isExportingSvg}
            className={cn(
              "h-8 px-2.5 gap-1.5 text-xs font-medium",
              "bg-background dark:bg-[#141414] border-border/80 dark:border-[#212121] hover:bg-muted/70 dark:hover:bg-[#1f1f1f]"
            )}
          >
            {isExportingSvg ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-500" />
            ) : (
              <FileCode className="w-3.5 h-3.5 text-sky-500" />
            )}
            <span>SVG</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          <p className="font-semibold">Download Scalable Vector (SVG)</p>
          <p className="text-[11px] text-muted-foreground">Infinite crisp resolution vector graphic for Figma/Illustrator</p>
        </TooltipContent>
      </Tooltip>

      {/* Copy Dropdown Menu */}
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className={cn(
                  "h-8 px-2.5 gap-1 text-xs font-medium",
                  "bg-background dark:bg-[#141414] border-border/80 dark:border-[#212121] hover:bg-muted/70 dark:hover:bg-[#1f1f1f]"
                )}
                aria-label="Copy Mermaid Code or Markdown"
              >
                {isCopiedMermaid || isCopiedMarkdown ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                )}
                <span>Copy</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground opacity-60 ml-0.5" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">
            <p className="font-semibold">Copy Diagram Syntax</p>
            <p className="text-[11px] text-muted-foreground">Copy raw Mermaid code or formatted Markdown block</p>
          </TooltipContent>
        </Tooltip>

        <DropdownMenuContent align="end" className="w-56 bg-popover dark:bg-[#121212] border-border dark:border-[#262626]">
          <DropdownMenuLabel className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground">
            Clipboard Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="dark:bg-[#212121]" />
          
          <DropdownMenuItem
            onClick={handleCopyMermaid}
            className="flex items-center justify-between text-xs py-2 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <FileCode className="w-3.5 h-3.5 text-amber-500" />
              <div>
                <p className="font-medium">Copy Raw Mermaid</p>
                <p className="text-[10px] text-muted-foreground">Pure syntax for live editors</p>
              </div>
            </div>
            {isCopiedMermaid && <Check className="w-3.5 h-3.5 text-emerald-500" />}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleCopyMarkdown}
            className="flex items-center justify-between text-xs py-2 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-blue-500" />
              <div>
                <p className="font-medium">Copy Markdown Block</p>
                <p className="text-[10px] text-muted-foreground">Wrapped for READMEs & docs</p>
              </div>
            </div>
            {isCopiedMarkdown && <Check className="w-3.5 h-3.5 text-emerald-500" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
