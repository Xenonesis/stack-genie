"use client";

import React from "react";
import {
  ArrowDown,
  ArrowRight,
  Layers,
  Network,
  Moon,
  Sun,
  Palette,
  Code2,
  SlidersHorizontal,
  Sparkles,
  ChevronDown
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
import { cn } from "@/lib/utils";

export interface StudioToolbarProps {
  direction: 'TD' | 'LR';
  onDirectionChange: (direction: 'TD' | 'LR') => void;
  groupByLayers: boolean;
  onGroupByLayersChange: (group: boolean) => void;
  theme: 'dark' | 'light' | 'neutral';
  onThemeChange: (theme: 'dark' | 'light' | 'neutral') => void;
  isEditorOpen: boolean;
  onToggleEditor: () => void;
  className?: string;
}

export interface ThemeOption {
  id: 'dark' | 'light' | 'neutral';
  label: string;
  shortLabel: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  bgColor: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'dark',
    label: 'Dark Obsidian',
    shortLabel: 'Dark',
    description: 'High-contrast dark mode with glowing tier borders',
    icon: Moon,
    accentColor: '#38bdf8',
    bgColor: '#080808',
  },
  {
    id: 'light',
    label: 'Clean Light',
    shortLabel: 'Light',
    description: 'Crisp white canvas with soft architectural tinting',
    icon: Sun,
    accentColor: '#0284c7',
    bgColor: '#ffffff',
  },
  {
    id: 'neutral',
    label: 'Neutral Slate',
    shortLabel: 'Slate',
    description: 'Modern slate palette optimized for documentation',
    icon: Palette,
    accentColor: '#4b5563',
    bgColor: '#0f172a',
  },
];

export function StudioToolbar({
  direction,
  onDirectionChange,
  groupByLayers,
  onGroupByLayersChange,
  theme,
  onThemeChange,
  isEditorOpen,
  onToggleEditor,
  className,
}: StudioToolbarProps) {
  const currentTheme = THEME_OPTIONS.find((t) => t.id === theme) || THEME_OPTIONS[0];
  const CurrentThemeIcon = currentTheme.icon;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-2.5 p-2 rounded-xl",
        "bg-card/90 dark:bg-[#0c0c0c]/90 backdrop-blur-md",
        "border border-border/80 dark:border-[#212121]",
        "shadow-xs transition-all",
        className
      )}
      role="toolbar"
      aria-label="Architecture Studio Toolbar"
    >
      {/* Left Control Group: Layout & Graph Topology */}
      <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
        {/* Layout Direction Toggle */}
        <div className="flex items-center rounded-lg bg-muted/60 dark:bg-[#141414] p-0.5 border border-border/60 dark:border-[#212121]">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => onDirectionChange('TD')}
                aria-pressed={direction === 'TD'}
                aria-label="Top-to-Bottom Layout"
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all",
                  direction === 'TD'
                    ? "bg-background dark:bg-[#202020] text-foreground dark:text-[#f3f3f3] shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50 dark:hover:bg-[#1a1a1a]"
                )}
              >
                <ArrowDown className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Top-Down</span>
                <span className="sm:hidden">TD</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              <p className="font-semibold">Top-to-Bottom Flow (TD)</p>
              <p className="text-[11px] text-muted-foreground">Standard hierarchical vertical layout</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => onDirectionChange('LR')}
                aria-pressed={direction === 'LR'}
                aria-label="Left-to-Right Layout"
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all",
                  direction === 'LR'
                    ? "bg-background dark:bg-[#202020] text-foreground dark:text-[#f3f3f3] shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50 dark:hover:bg-[#1a1a1a]"
                )}
              >
                <ArrowRight className="w-3.5 h-3.5 text-sky-500" />
                <span className="hidden sm:inline">Left-Right</span>
                <span className="sm:hidden">LR</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              <p className="font-semibold">Left-to-Right Flow (LR)</p>
              <p className="text-[11px] text-muted-foreground">Horizontal pipeline layout for wide screens</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-5 w-px bg-border/80 dark:bg-[#212121]" aria-hidden="true" />

        {/* Tier Grouping Toggle */}
        <div className="flex items-center rounded-lg bg-muted/60 dark:bg-[#141414] p-0.5 border border-border/60 dark:border-[#212121]">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => onGroupByLayersChange(true)}
                aria-pressed={groupByLayers}
                aria-label="Layer Subgraphs Grouping"
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all",
                  groupByLayers
                    ? "bg-background dark:bg-[#202020] text-foreground dark:text-[#f3f3f3] shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50 dark:hover:bg-[#1a1a1a]"
                )}
              >
                <Layers className="w-3.5 h-3.5 text-emerald-500" />
                <span className="hidden md:inline">Tier Subgraphs</span>
                <span className="md:hidden">Tiered</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              <p className="font-semibold">Layer Subgraphs</p>
              <p className="text-[11px] text-muted-foreground">Groups components into architectural tiers (Client, API, Data, Cloud)</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => onGroupByLayersChange(false)}
                aria-pressed={!groupByLayers}
                aria-label="Flat Graph Layout"
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all",
                  !groupByLayers
                    ? "bg-background dark:bg-[#202020] text-foreground dark:text-[#f3f3f3] shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50 dark:hover:bg-[#1a1a1a]"
                )}
              >
                <Network className="w-3.5 h-3.5 text-purple-500" />
                <span className="hidden md:inline">Flat Graph</span>
                <span className="md:hidden">Flat</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              <p className="font-semibold">Flat Graph Flow</p>
              <p className="text-[11px] text-muted-foreground">Shows raw interconnected node network without bounding layer boxes</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Right Control Group: Theme & Editor Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Theme Selector Dropdown */}
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-8 px-2.5 gap-2 text-xs font-medium bg-background dark:bg-[#141414] border-border/80 dark:border-[#212121] hover:bg-muted/70 dark:hover:bg-[#1f1f1f]"
                  )}
                  aria-label={`Current Theme: ${currentTheme.label}`}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-border/50"
                      style={{ backgroundColor: currentTheme.bgColor }}
                      aria-hidden="true"
                    />
                    <CurrentThemeIcon className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="hidden sm:inline">{currentTheme.label}</span>
                    <span className="sm:hidden">{currentTheme.shortLabel}</span>
                  </div>
                  <ChevronDown className="w-3 h-3 text-muted-foreground opacity-60 ml-0.5" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              <p className="font-semibold">Diagram Color Theme</p>
              <p className="text-[11px] text-muted-foreground">Select color style for diagram export and rendering</p>
            </TooltipContent>
          </Tooltip>

          <DropdownMenuContent align="end" className="w-48 bg-popover dark:bg-[#121212] border-border dark:border-[#262626]">
            <DropdownMenuLabel className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground">
              Diagram Theme
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="dark:bg-[#212121]" />
            {THEME_OPTIONS.map((t) => {
              const Icon = t.icon;
              const isSelected = t.id === theme;
              return (
                <DropdownMenuItem
                  key={t.id}
                  onClick={() => onThemeChange(t.id)}
                  className={cn(
                    "flex items-center justify-between text-xs py-2 cursor-pointer transition-colors",
                    isSelected && "bg-muted/80 dark:bg-[#1f1f1f] font-medium"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full border border-border/60 shadow-2xs shrink-0"
                      style={{ backgroundColor: t.bgColor }}
                    />
                    <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>{t.label}</span>
                  </div>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  )}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Live Code Editor Toggle Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant={isEditorOpen ? "default" : "outline"}
              size="sm"
              onClick={onToggleEditor}
              aria-pressed={isEditorOpen}
              className={cn(
                "h-8 px-2.5 gap-1.5 text-xs font-medium transition-all",
                isEditorOpen
                  ? "bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-black shadow-xs font-semibold"
                  : "bg-background dark:bg-[#141414] border-border/80 dark:border-[#212121] text-foreground dark:text-[#f3f3f3] hover:bg-muted/70 dark:hover:bg-[#1f1f1f]"
              )}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Code Editor</span>
              {isEditorOpen && (
                <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-black animate-pulse ml-0.5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">
            <p className="font-semibold">{isEditorOpen ? "Close Mermaid Editor" : "Open Mermaid Editor"}</p>
            <p className="text-[11px] text-muted-foreground">Live edit diagram syntax with instant visual feedback</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
