"use client";

import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  isSidebarOpen: boolean;
  onCloseSidebar: () => void;
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
  isSidebarOpen,
  onCloseSidebar,
}: BuilderSidebarProps) {
  return (
    <aside
      className={`flex flex-col bg-card dark:bg-[#080808] border-r border-border dark:border-[#212121] fixed inset-y-0 left-0 z-40 w-[85vw] max-w-sm transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:translate-x-0 lg:shrink-0 lg:overflow-hidden lg:transition-[width] ${
        isSidebarOpen ? "lg:w-80 xl:w-96" : "lg:w-0 lg:border-r-0"
      }`}
    >
      {/* Sidebar Brand Header */}
      <div className="p-6 flex items-center gap-4 flex-shrink-0 border-b border-border dark:border-[#212121] lg:min-w-80 xl:min-w-96">
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
        <Button
          variant="ghost"
          size="sm"
          onClick={onCloseSidebar}
          aria-label="Close sidebar"
          className="lg:hidden ml-auto h-8 w-8 p-0 text-muted-foreground dark:text-[#9c9c9c] hover:text-foreground dark:hover:text-[#f3f3f3]"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Fixed Header - Project Name */}
      <div className="px-6 py-6 flex-shrink-0 border-b border-border dark:border-[#212121] lg:min-w-80 xl:min-w-96">
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
      <div className="flex-1 overflow-y-auto lg:min-w-80 xl:min-w-96">
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
