"use client";

import React from "react";
import { RotateCcw, Shuffle, Sparkles, Save, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TechStack } from "@/types/tech-stack";
import { useToast } from "@/hooks/use-toast";

export interface SidebarActionButtonsProps {
  selectedStack: TechStack;
  getTotalSelected: () => number;
  clearStack: () => void;
  generateRandomStack: () => void;
  onOpenPopularStacks: () => void;
}

export function SidebarActionButtons({
  selectedStack,
  getTotalSelected,
  clearStack,
  generateRandomStack,
  onOpenPopularStacks,
}: SidebarActionButtonsProps) {
  const { toast } = useToast();
  const totalSelected = getTotalSelected();

  const handleExportMarkdown = () => {
    if (totalSelected === 0) return;
    const stackText = Object.entries(selectedStack)
      .filter(([_, techs]) => techs.length > 0)
      .map(([category, techs]) =>
        `**${category}:**\n${techs.map(tech => `- ${tech.name}`).join('\n')}`
      )
      .join('\n\n');
    navigator.clipboard.writeText(`# My Tech Stack\n\n${stackText}`);
    toast({
      title: "Stack exported!",
      description: "Your tech stack has been copied to clipboard as Markdown.",
    });
  };

  const handleShareLink = () => {
    if (totalSelected === 0) return;
    const stackData = Object.entries(selectedStack).reduce((acc, [category, techs]) => {
      acc[category] = techs.map(tech => tech.id);
      return acc;
    }, {} as Record<string, string[]>);
    const encodedStack = btoa(JSON.stringify(stackData));
    const shareUrl = `${window.location.origin}${window.location.pathname}?stack=${encodedStack}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Share link copied!",
        description: "Share this URL to let others see your tech stack.",
      });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast({
        title: "Share link copied!",
        description: "Share this URL to let others see your tech stack.",
      });
    }
  };

  return (
    <div className="px-6 py-6 border-b border-border dark:border-[#212121] flex-shrink-0">
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={clearStack}
          className="bg-transparent border border-border dark:border-[#212121] hover:border-foreground/30 dark:hover:border-[#474747] text-foreground dark:text-[#f3f3f3] text-xs font-medium dark:font-normal uppercase tracking-wider"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1.5 text-amber-600 dark:text-[#6f6759]" />
          Reset
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={generateRandomStack}
          className="bg-transparent border border-border dark:border-[#212121] hover:border-foreground/30 dark:hover:border-[#474747] text-foreground dark:text-[#f3f3f3] text-xs font-medium dark:font-normal uppercase tracking-wider"
        >
          <Shuffle className="w-3.5 h-3.5 mr-1.5 text-amber-600 dark:text-[#6f6759]" />
          Random
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenPopularStacks}
          className="bg-transparent border border-border dark:border-[#212121] hover:border-foreground/30 dark:hover:border-[#474747] text-foreground dark:text-[#f3f3f3] text-xs font-medium dark:font-normal uppercase tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-600 dark:text-[#6f6759]" />
          Templates
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportMarkdown}
          disabled={totalSelected === 0}
          className="bg-transparent border border-border dark:border-[#212121] hover:border-foreground/30 dark:hover:border-[#474747] text-foreground dark:text-[#f3f3f3] text-xs font-medium dark:font-normal uppercase tracking-wider disabled:opacity-30"
        >
          <Save className="w-3.5 h-3.5 mr-1.5 text-amber-600 dark:text-[#6f6759]" />
          Save
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleShareLink}
          disabled={totalSelected === 0}
          className="bg-transparent border border-border dark:border-[#212121] hover:border-foreground/30 dark:hover:border-[#474747] text-foreground dark:text-[#f3f3f3] text-xs font-medium dark:font-normal uppercase tracking-wider disabled:opacity-30"
        >
          <Share className="w-3.5 h-3.5 mr-1.5 text-amber-600 dark:text-[#6f6759]" />
          Share
        </Button>
      </div>
    </div>
  );
}
