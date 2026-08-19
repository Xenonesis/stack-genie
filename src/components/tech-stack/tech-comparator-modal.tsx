"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Technology } from "@/types/tech-stack";
import { Scale, Check, X, ExternalLink, Zap } from "lucide-react";

interface TechComparatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  allTechnologies: Technology[];
  techIconRenderer: (props: { src?: string; alt: string; width: number; height?: number; className?: string }) => React.ReactNode;
}

export function TechComparatorModal({ isOpen, onClose, allTechnologies, techIconRenderer: TechIcon }: TechComparatorModalProps) {
  const [selectedTechIds, setSelectedTechIds] = useState<string[]>([]);

  const toggleSelectTech = (id: string) => {
    if (selectedTechIds.includes(id)) {
      setSelectedTechIds(selectedTechIds.filter(i => i !== id));
    } else {
      if (selectedTechIds.length >= 3) return;
      setSelectedTechIds([...selectedTechIds, id]);
    }
  };

  const comparedTechs = allTechnologies.filter(t => selectedTechIds.includes(t.id));

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl bg-card dark:bg-[#080808] border border-border dark:border-[#212121] text-foreground dark:text-[#f3f3f3] p-6 rounded-lg shadow-xl">
        <DialogHeader className="mb-4">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-600 dark:text-[#6f6759]" />
            <DialogTitle className="text-base font-medium dark:font-normal uppercase tracking-tight text-foreground dark:text-[#f3f3f3]">Tech Comparator</DialogTitle>
          </div>
          <DialogDescription className="text-xs font-mono text-muted-foreground dark:text-[#9c9c9c]">
            Select up to 3 technologies to compare features, ecosystem, and suitability side-by-side.
          </DialogDescription>
        </DialogHeader>

        {/* Selection bar */}
        <div className="mb-6 space-y-2">
          <label className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground dark:text-[#9c9c9c]">
            Select Technologies ({selectedTechIds.length}/3)
          </label>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-3 bg-muted/40 dark:bg-[#101010] rounded-md border border-border dark:border-[#212121]">
            {allTechnologies.slice(0, 24).map((tech) => {
              const isSelected = selectedTechIds.includes(tech.id);
              return (
                <button
                  key={tech.id}
                  onClick={() => toggleSelectTech(tech.id)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground dark:bg-white dark:text-[#101010]"
                      : "bg-background dark:bg-[#121212] hover:bg-muted dark:hover:bg-[#1f1f1f] text-muted-foreground dark:text-[#9c9c9c] border border-border dark:border-[#212121]"
                  }`}
                >
                  <TechIcon src={tech.icon} alt={tech.name} width={14} height={14} className="rounded-sm" />
                  <span>{tech.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Side by side comparison table */}
        {comparedTechs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {comparedTechs.map((tech) => (
              <div key={tech.id} className="bg-muted/30 dark:bg-[#101010] rounded-md p-4 border border-border dark:border-[#212121] space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3 pb-2 border-b border-border dark:border-[#212121]">
                    <TechIcon src={tech.icon} alt={tech.name} width={28} height={28} className="rounded-sm" />
                    <div>
                      <h4 className="text-xs font-medium dark:font-normal uppercase text-foreground dark:text-[#f3f3f3]">{tech.name}</h4>
                      <span className="text-[10px] font-mono text-amber-600 dark:text-[#6f6759] uppercase tracking-wider">{tech.category}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground dark:text-[#9c9c9c] leading-relaxed">{tech.description}</p>
                </div>

                <div className="pt-3 border-t border-border dark:border-[#212121] space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-center text-muted-foreground dark:text-[#9c9c9c]">
                    <span>NPM Package:</span>
                    <span className="text-foreground dark:text-[#f3f3f3]">{tech.npm || "N/A"}</span>
                  </div>
                  {tech.website && (
                    <a
                      href={tech.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-foreground dark:text-[#f3f3f3] hover:underline text-xs font-mono"
                    >
                      Official Site <ExternalLink className="w-3 h-3 text-amber-600 dark:text-[#6f6759]" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-xs font-mono text-muted-foreground dark:text-[#9c9c9c] border border-dashed border-border dark:border-[#212121] rounded-md">
            Click on technologies above to start side-by-side comparison
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
