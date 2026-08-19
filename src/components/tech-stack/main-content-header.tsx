"use client";

import React from "react";
import { Sparkles, Scale, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export interface MainContentHeaderProps {
  onOpenComparator: () => void;
  showAiPanel: boolean;
  onToggleAiPanel: () => void;
}

export function MainContentHeader({
  onOpenComparator,
  showAiPanel,
  onToggleAiPanel,
}: MainContentHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
      <div className="flex-1 min-w-0">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-medium dark:font-normal text-foreground dark:text-[#f3f3f3] flex items-center gap-3 font-sans tracking-tight">
          <div className="w-8 h-8 rounded-md bg-muted/60 dark:bg-[#121212] border border-border dark:border-[#212121] p-1 flex items-center justify-center shrink-0">
            <img src="/logo.svg" alt="Stack Genie Logo" className="w-full h-full object-contain" />
          </div>
          <span className="truncate">Stack Genie Builder</span>
          <Sparkles className="w-4 h-4 text-amber-600 dark:text-[#6f6759] flex-shrink-0" />
        </h1>
        <p className="text-xs font-normal text-muted-foreground dark:text-[#9c9c9c] mt-1">
          Build your perfect tech stack with AI-powered recommendations
        </p>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenComparator}
          className="bg-transparent border border-border dark:border-[#212121] hover:border-foreground/30 dark:hover:border-[#474747] text-foreground dark:text-[#f3f3f3] text-xs font-medium dark:font-normal uppercase tracking-wider"
        >
          <Scale className="w-3.5 h-3.5 mr-1 text-amber-600 dark:text-[#6f6759]" />
          <span className="hidden sm:inline">Compare</span>
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={onToggleAiPanel}
          className="bg-primary text-primary-foreground dark:bg-[#ffffff] dark:text-[#101010] hover:bg-primary/90 dark:hover:bg-[#f3f3f3] rounded-full text-xs font-medium dark:font-normal uppercase tracking-wider"
        >
          <MessageSquare className="w-3.5 h-3.5 mr-1" />
          <span className="hidden sm:inline">AI Assistant</span>
          <span className="sm:hidden">AI</span>
        </Button>
      </div>
    </div>
  );
}
