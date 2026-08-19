"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Sparkles, Shuffle, X, Search, FilterX, Brain, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StackTemplate, StackTemplateIssues } from "@/types/tech-stack";
import { technologyData } from "@/data/technologies";
import { TechIcon } from "./tech-icon";

export interface PopularStacksModalProps {
  isOpen: boolean;
  onClose: () => void;
  popularStacks: StackTemplate[];
  templateIssuesById: Map<string, StackTemplateIssues>;
  invalidTemplateCount: number;
  onLoadPopularStack: (stack: StackTemplate) => void;
  onGenerateTemplateStack: (filteredCandidates?: StackTemplate[]) => void;
}

export function PopularStacksModal({
  isOpen,
  onClose,
  popularStacks,
  templateIssuesById,
  invalidTemplateCount,
  onLoadPopularStack,
  onGenerateTemplateStack,
}: PopularStacksModalProps) {
  const [templateSearchTerm, setTemplateSearchTerm] = useState("");
  const [templateUseCaseFilter, setTemplateUseCaseFilter] = useState("All");
  const [templateInfraFilter, setTemplateInfraFilter] = useState("All");
  const [templateAiFilter, setTemplateAiFilter] = useState("All");

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const templateUseCases = useMemo(
    () => ["All", ...new Set(popularStacks.map((stack) => stack.useCase))],
    [popularStacks]
  );

  const filteredPopularStacks = useMemo(() => {
    return popularStacks.filter((stack) => {
      const matchesSearch =
        stack.name.toLowerCase().includes(templateSearchTerm.toLowerCase()) ||
        stack.description.toLowerCase().includes(templateSearchTerm.toLowerCase());
      const matchesUseCase = templateUseCaseFilter === "All" || stack.useCase === templateUseCaseFilter;
      const matchesInfra = templateInfraFilter === "All" || stack.infra === templateInfraFilter;
      const matchesAi =
        templateAiFilter === "All" ||
        (templateAiFilter === "AI Ready" && stack.aiReady) ||
        (templateAiFilter === "Non-AI" && !stack.aiReady);
      return matchesSearch && matchesUseCase && matchesInfra && matchesAi;
    });
  }, [popularStacks, templateSearchTerm, templateUseCaseFilter, templateInfraFilter, templateAiFilter]);

  const hasActiveTemplateFilters = useMemo(() => {
    return (
      templateSearchTerm.trim() !== "" ||
      templateUseCaseFilter !== "All" ||
      templateInfraFilter !== "All" ||
      templateAiFilter !== "All"
    );
  }, [templateSearchTerm, templateUseCaseFilter, templateInfraFilter, templateAiFilter]);

  const resetTemplateFilters = () => {
    setTemplateSearchTerm("");
    setTemplateUseCaseFilter("All");
    setTemplateInfraFilter("All");
    setTemplateAiFilter("All");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-5 transition-opacity animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-background border border-border/80 rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-border/60 bg-background/95 backdrop-blur-md sticky top-0 z-20 flex-shrink-0">
          <div className="flex items-start sm:items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2.5 font-display tracking-tight">
                <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="truncate">Popular Stack Templates</span>
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1 font-medium">
                Choose from curated tech stacks for common use cases
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onGenerateTemplateStack(filteredPopularStacks)}
                className="bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground text-xs font-semibold"
              >
                <Shuffle className="w-3.5 h-3.5 mr-1.5" />
                Blend Random
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent flex-shrink-0"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {/* Filter Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search templates..."
                value={templateSearchTerm}
                onChange={(e) => setTemplateSearchTerm(e.target.value)}
                className="pl-9 pr-8 bg-card border-border text-foreground text-xs sm:text-sm focus-visible:ring-1 focus-visible:ring-primary/50"
              />
              {templateSearchTerm && (
                <button
                  onClick={() => setTemplateSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <select
              value={templateUseCaseFilter}
              onChange={(e) => setTemplateUseCaseFilter(e.target.value)}
              className="themed-select h-9 rounded-md border border-border bg-card px-3 text-xs sm:text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 cursor-pointer"
            >
              {templateUseCases.map((useCase) => (
                <option key={useCase} value={useCase}>Use Case: {useCase}</option>
              ))}
            </select>
            <select
              value={templateInfraFilter}
              onChange={(e) => setTemplateInfraFilter(e.target.value)}
              className="themed-select h-9 rounded-md border border-border bg-card px-3 text-xs sm:text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 cursor-pointer"
            >
              {['All', 'Minimal', 'Standard', 'Production'].map((infra) => (
                <option key={infra} value={infra}>Infra: {infra}</option>
              ))}
            </select>
            <select
              value={templateAiFilter}
              onChange={(e) => setTemplateAiFilter(e.target.value)}
              className="themed-select h-9 rounded-md border border-border bg-card px-3 text-xs sm:text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 cursor-pointer"
            >
              {['All', 'AI Ready', 'Non-AI'].map((ai) => (
                <option key={ai} value={ai}>AI Capability: {ai}</option>
              ))}
            </select>
          </div>

          {/* Status & Active Filter Reset Bar */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 pb-1">
            <span className="font-medium text-foreground">{filteredPopularStacks.length} templates available</span>
            {hasActiveTemplateFilters && (
              <button
                onClick={resetTemplateFilters}
                className="flex items-center gap-1 text-xs text-primary hover:underline font-semibold transition-colors"
              >
                <FilterX className="w-3.5 h-3.5" />
                Reset Filters
              </button>
            )}
          </div>

          {invalidTemplateCount > 0 && (
            <div className="rounded-lg border border-warning/40 bg-warning/10 px-3.5 py-2.5 text-xs text-warning flex items-center gap-2">
              <Brain className="w-4 h-4 shrink-0" />
              <span>
                {invalidTemplateCount} template{invalidTemplateCount > 1 ? 's' : ''} have minor coverage recommendations. They load fully, and random generation optimizes completeness.
              </span>
            </div>
          )}

          {/* Empty State */}
          {filteredPopularStacks.length === 0 && (
            <div className="text-center py-12 px-4 rounded-xl border border-dashed border-border/70 bg-card/40 my-4">
              <FilterX className="w-9 h-9 text-muted-foreground/40 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-foreground mb-1">No templates match your filters</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto mb-4">
                Try clearing your search query or adjusting filter dropdowns.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={resetTemplateFilters}
                className="text-xs font-semibold bg-background"
              >
                Reset All Filters
              </Button>
            </div>
          )}

          {/* Template Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredPopularStacks.map((stack) => (
              <Card
                key={stack.id}
                className="group bg-card border-border hover:border-primary/40 cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden"
                onClick={() => onLoadPopularStack(stack)}
              >
                <CardContent className="p-4 sm:p-5 flex flex-col justify-between h-full">
                  <div>
                    {/* Title & Badges */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-foreground text-sm sm:text-base group-hover:text-primary transition-colors font-display tracking-tight">
                        {stack.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                        <Badge className="text-[10px] bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 border font-semibold">
                          {stack.useCase}
                        </Badge>
                        <Badge variant="secondary" className="text-[10px] bg-secondary/80 text-secondary-foreground font-medium">
                          {stack.infra}
                        </Badge>
                        {stack.aiReady && (
                          <Badge className="text-[10px] bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 border font-medium">
                            AI Ready
                          </Badge>
                        )}
                        {(() => {
                          const issues = templateIssuesById.get(stack.id);
                          if (!issues) return null;
                          if (issues.missingIds.length === 0 && issues.missingRequirements.length === 0) {
                            return (
                              <Badge className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 border font-medium">
                                Validated
                              </Badge>
                            );
                          }
                          return (
                            <Badge className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 border font-medium">
                              Needs review
                            </Badge>
                          );
                        })()}
                      </div>
                    </div>

                    <p className="text-muted-foreground text-xs leading-relaxed mb-4">{stack.description}</p>
                  </div>

                  {/* Tech Pills & Apply CTA */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/40 gap-2">
                    <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                      {stack.techIds.slice(0, 6).map((techId) => {
                        const tech = technologyData.find((t) => t.id === techId);
                        if (!tech) return null;
                        return (
                          <div
                            key={techId}
                            className="flex items-center gap-1 bg-accent/60 text-accent-foreground rounded-md border border-border/50 px-1.5 py-0.5 shrink-0"
                          >
                            <TechIcon
                              src={tech.icon}
                              alt={tech.name}
                              width={13}
                              height={13}
                              className="rounded"
                            />
                            <span className="text-[11px] font-medium text-foreground">{tech.name}</span>
                          </div>
                        );
                      })}
                      {stack.techIds.length > 6 && (
                        <div className="flex items-center justify-center bg-accent/40 rounded-md border border-border/50 px-1.5 py-0.5 shrink-0">
                          <span className="text-[10px] font-medium text-muted-foreground">
                            +{stack.techIds.length - 6}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shrink-0">
                      <span>Use</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
