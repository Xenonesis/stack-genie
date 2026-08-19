"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Technology, TechStack, AIAnalysis, AIRecommendation } from "@/types/tech-stack";
import { SidebarAiSection } from "./sidebar-ai-section";
import { SidebarActionButtons } from "./sidebar-action-buttons";
import { SidebarCommandSection } from "./sidebar-command-section";
import { SelectedStackSidebar } from "./selected-stack-sidebar";
import { SidebarQuickPresets } from "./sidebar-quick-presets";
import { TechIcon } from "./tech-icon";

export interface BuilderSidebarProps {
  projectName: string;
  setProjectName: (name: string) => void;
  projectDescription: string;
  setProjectDescription: (desc: string) => void;
  isAnalyzing: boolean;
  generateAIStack: () => void;
  analyzeStackWithAI: () => void;
  showAiPanel: boolean;
  setShowAiPanel: (show: boolean) => void;
  aiAnalysis: AIAnalysis | null;
  applyAIRecommendation: (rec: AIRecommendation) => void;
  selectedStack: TechStack;
  getTotalSelected: () => number;
  clearStack: () => void;
  generateRandomStack: () => void;
  onOpenPopularStacks: () => void;
  command: string;
  onCopyCommand: () => void;
  toggleTechnology: (tech: Technology) => void;
  onApplyPreset: (presetType: string) => void;
}

export function BuilderSidebar({
  projectName,
  setProjectName,
  projectDescription,
  setProjectDescription,
  isAnalyzing,
  generateAIStack,
  analyzeStackWithAI,
  showAiPanel,
  setShowAiPanel,
  aiAnalysis,
  applyAIRecommendation,
  selectedStack,
  getTotalSelected,
  clearStack,
  generateRandomStack,
  onOpenPopularStacks,
  command,
  onCopyCommand,
  toggleTechnology,
  onApplyPreset,
}: BuilderSidebarProps) {
  return (
    <aside
      id="mobile-sidebar"
      className="hidden lg:flex w-full lg:w-80 xl:w-96 bg-card dark:bg-[#080808] border-r border-border dark:border-[#212121] flex-col lg:h-screen overflow-y-auto lg:sticky lg:top-0"
    >
      {/* Sidebar Brand Header */}
      <div className="p-6 flex items-center gap-4 flex-shrink-0 border-b border-border dark:border-[#212121]">
        <div className="w-9 h-9 rounded-md bg-muted/60 dark:bg-[#101010] border border-border dark:border-[#212121] p-1.5 flex items-center justify-center shrink-0">
          <img src="/logo.svg" alt="Stack Genie Logo" className="w-full h-full object-contain" />
        </div>
        <div>
          <h2 className="font-medium dark:font-normal text-[18px] text-foreground dark:text-[#f3f3f3] tracking-tight font-sans">
            Stack Genie
          </h2>
          <p className="text-[10px] font-mono text-muted-foreground dark:text-[#9c9c9c] uppercase tracking-widest">
            AI Stack Architect
          </p>
        </div>
      </div>

      {/* Fixed Header - Project Name */}
      <div className="px-6 py-6 flex-shrink-0 border-b border-border dark:border-[#212121]">
        <label className="block text-[11px] font-mono uppercase tracking-widest text-muted-foreground dark:text-[#9c9c9c] mb-2.5">
          Project Details
        </label>
        <Input
          value={projectName}
          onChange={(e) => {
            // Convert to lowercase and remove invalid characters
            const value = e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '');
            setProjectName(value);
          }}
          className="bg-background dark:bg-[#101010] border border-border dark:border-[#212121] text-foreground dark:text-[#f3f3f3] text-xs font-mono rounded-md focus-visible:ring-0 focus-visible:border-primary dark:focus-visible:border-[#6f6759]"
          placeholder="my-stack-genie-app"
        />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col">
          {/* AI-Powered Section */}
          <SidebarAiSection
            projectDescription={projectDescription}
            setProjectDescription={setProjectDescription}
            isAnalyzing={isAnalyzing}
            generateAIStack={generateAIStack}
            analyzeStackWithAI={analyzeStackWithAI}
            showAiPanel={showAiPanel}
            setShowAiPanel={setShowAiPanel}
            aiAnalysis={aiAnalysis}
            applyAIRecommendation={applyAIRecommendation}
          />

          {/* Action Buttons */}
          <SidebarActionButtons
            selectedStack={selectedStack}
            getTotalSelected={getTotalSelected}
            clearStack={clearStack}
            generateRandomStack={generateRandomStack}
            onOpenPopularStacks={onOpenPopularStacks}
          />

          {/* Command Generator */}
          <SidebarCommandSection
            command={command}
            selectedStack={selectedStack}
            projectName={projectName}
            projectDescription={projectDescription}
            onCopyCommand={onCopyCommand}
          />

          {/* Selected Stack */}
          <SelectedStackSidebar
            selectedStack={selectedStack}
            getTotalSelected={getTotalSelected}
            aiAnalysis={aiAnalysis}
            toggleTechnology={toggleTechnology}
            techIconRenderer={TechIcon}
          />

          {/* Quick Presets */}
          <SidebarQuickPresets onApplyPreset={onApplyPreset} />
        </div>
      </div>
    </aside>
  );
}
