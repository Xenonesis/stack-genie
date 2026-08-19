"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export interface SidebarQuickPresetsProps {
  onApplyPreset: (presetType: string) => void;
}

const PRESET_KEYS = [
  'default',
  'convex-react',
  'mobile',
  'api-only',
  'full-featured',
  'saas-pro',
  'ai-product',
] as const;

export function SidebarQuickPresets({ onApplyPreset }: SidebarQuickPresetsProps) {
  return (
    <div className="px-6 py-6 border-b border-border dark:border-[#212121] flex-shrink-0">
      <label className="block text-[11px] font-mono uppercase tracking-widest text-muted-foreground dark:text-[#9c9c9c] mb-3">
        Quick Presets
      </label>
      <div className="space-y-1">
        {PRESET_KEYS.map((preset) => (
          <Button
            key={preset}
            variant="ghost"
            size="sm"
            onClick={() => onApplyPreset(preset)}
            className="w-full justify-start text-muted-foreground dark:text-[#9c9c9c] hover:text-foreground dark:hover:text-[#f3f3f3] hover:bg-muted dark:hover:bg-[#121212] transition-colors text-xs font-mono uppercase tracking-wider"
          >
            {preset.replace('-', ' ')}
          </Button>
        ))}
      </div>
    </div>
  );
}
