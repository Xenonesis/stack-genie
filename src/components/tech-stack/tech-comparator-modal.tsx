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
      <DialogContent className="max-w-4xl bg-card border-border/50 text-foreground p-6 rounded-2xl shadow-2xl">
        <DialogHeader className="mb-4">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-primary" />
            <DialogTitle className="text-lg font-bold">Tech Comparator</DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Select up to 3 technologies to compare features, ecosystem, and suitability side-by-side.
          </DialogDescription>
        </DialogHeader>

        {/* Selection bar */}
        <div className="mb-6 space-y-2">
          <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Select Technologies ({selectedTechIds.length}/3)
          </label>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-accent/30 rounded-xl border border-border/30">
            {allTechnologies.slice(0, 24).map((tech) => {
              const isSelected = selectedTechIds.includes(tech.id);
              return (
                <button
                  key={tech.id}
                  onClick={() => toggleSelectTech(tech.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-background/80 hover:bg-accent text-foreground border border-border/40"
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
              <div key={tech.id} className="bg-accent/40 rounded-xl p-4 border border-border/40 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <TechIcon src={tech.icon} alt={tech.name} width={28} height={28} className="rounded-md" />
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{tech.name}</h4>
                      <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">{tech.category}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tech.description}</p>
                </div>

                <div className="pt-3 border-t border-border/30 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>NPM Package:</span>
                    <span className="font-mono text-foreground">{tech.npm || "N/A"}</span>
                  </div>
                  {tech.website && (
                    <a
                      href={tech.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline text-xs font-semibold"
                    >
                      Official Site <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-muted-foreground">
            Select technologies above to start comparing.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
