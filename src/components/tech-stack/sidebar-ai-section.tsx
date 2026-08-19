"use client";

import React from "react";
import { Sparkles, Brain, Zap, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AIAnalysis, AIRecommendation } from "@/types/tech-stack";
import { TechIcon } from "./tech-icon";

export interface SidebarAiSectionProps {
  projectDescription: string;
  setProjectDescription: (desc: string) => void;
  isAnalyzing: boolean;
  generateAIStack: () => void;
  analyzeStackWithAI: () => void;
  showAiPanel: boolean;
  setShowAiPanel: (show: boolean) => void;
  aiAnalysis: AIAnalysis | null;
  applyAIRecommendation: (rec: AIRecommendation) => void;
}

export function SidebarAiSection({
  projectDescription,
  setProjectDescription,
  isAnalyzing,
  generateAIStack,
  analyzeStackWithAI,
  showAiPanel,
  setShowAiPanel,
  aiAnalysis,
  applyAIRecommendation,
}: SidebarAiSectionProps) {
  return (
    <>
      {/* AI-Powered Section */}
      <div className="px-6 py-6 border-b border-border dark:border-[#212121] flex-shrink-0">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-[#6f6759]" />
          <label className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground dark:text-[#9c9c9c]">
            AI Assistant
          </label>
        </div>

        <div className="space-y-3">
          <div>
            <Input
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              className="bg-background dark:bg-[#101010] border border-border dark:border-[#212121] text-foreground dark:text-[#f3f3f3] text-xs font-sans rounded-md focus-visible:ring-0 focus-visible:border-primary dark:focus-visible:border-[#6f6759]"
              placeholder="Describe your project goals..."
            />
          </div>

          <div className="grid grid-cols-1 gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={generateAIStack}
              disabled={isAnalyzing || !projectDescription.trim()}
              className="w-full bg-primary text-primary-foreground dark:bg-[#ffffff] dark:text-[#101010] hover:bg-primary/90 dark:hover:bg-[#f3f3f3] rounded-full text-xs font-medium dark:font-normal uppercase tracking-wider disabled:opacity-40"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-3 h-3 border-2 border-primary-foreground dark:border-[#101010] border-t-transparent rounded-full animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Brain className="w-3.5 h-3.5 mr-2" />
                  Generate AI Stack
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={analyzeStackWithAI}
              disabled={isAnalyzing || !projectDescription.trim()}
              className="w-full bg-transparent border border-border dark:border-[#212121] hover:border-foreground/30 dark:hover:border-[#474747] text-foreground dark:text-[#f3f3f3] hover:bg-muted dark:hover:bg-[#121212] disabled:opacity-40 text-xs font-medium dark:font-normal uppercase tracking-wider"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-3 h-3 border-2 border-foreground dark:border-[#f3f3f3] border-t-transparent rounded-full animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 mr-2 text-amber-600 dark:text-[#6f6759]" />
                  Analyze Current Stack
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* AI Recommendations Panel */}
      {showAiPanel && aiAnalysis && (
        <div className="px-6 py-6 border-b border-border dark:border-[#212121] flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-amber-600 dark:text-[#6f6759]" />
              <label className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground dark:text-[#9c9c9c]">
                AI Analysis
              </label>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAiPanel(false)}
              className="h-6 w-6 p-0 text-muted-foreground dark:text-[#9c9c9c] hover:text-foreground dark:hover:text-[#f3f3f3]"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {/* Project Analysis */}
            <div className="bg-muted/50 dark:bg-[#121212] border border-border dark:border-[#212121] rounded-md p-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-amber-600 dark:text-[#6f6759] mb-1">
                Project Type
              </div>
              <div className="text-xs font-medium dark:font-normal text-foreground dark:text-[#f3f3f3]">
                {aiAnalysis.projectType}
              </div>
              <div className="text-xs text-muted-foreground dark:text-[#9c9c9c] mt-1.5 flex items-center justify-between font-mono">
                <span>Complexity:</span>
                <span className="px-2 py-0.5 rounded-[4px] bg-muted dark:bg-[#1a1a1a] border border-border dark:border-[#212121] text-[10px] text-emerald-600 dark:text-[#98ff38]">
                  {aiAnalysis.complexity}
                </span>
              </div>
            </div>

            {/* Recommendations */}
            {aiAnalysis.recommendations.length > 0 && (
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 dark:text-[#98ff38] mb-2">
                  Recommended Tech
                </div>
                <div className="space-y-2">
                  {aiAnalysis.recommendations.slice(0, 3).map((rec, index) => (
                    <div
                      key={index}
                      className="bg-muted/40 dark:bg-[#121212] border border-border dark:border-[#212121] rounded-md p-2.5 hover:border-foreground/30 dark:hover:border-[#474747] transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <TechIcon
                            src={rec.technology.icon || ""}
                            alt={rec.technology.name}
                            width={14}
                            height={14}
                            className="rounded-sm"
                          />
                          <span className="text-xs font-medium dark:font-normal text-foreground dark:text-[#f3f3f3]">
                            {rec.technology.name}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => applyAIRecommendation(rec)}
                          className="h-5 px-2 text-[10px] font-mono uppercase tracking-widest text-emerald-600 dark:text-[#98ff38] hover:bg-muted dark:hover:bg-[#1a1a1a]"
                        >
                          <Plus className="w-3 h-3 mr-1" /> Add
                        </Button>
                      </div>
                      <div className="text-[11px] text-muted-foreground dark:text-[#9c9c9c] leading-snug">
                        {rec.reason}
                      </div>
                      <div className="text-[10px] font-mono text-amber-600 dark:text-[#6f6759] mt-1.5">
                        Confidence {rec.confidence}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
