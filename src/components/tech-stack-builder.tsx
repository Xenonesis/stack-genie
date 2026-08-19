"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { technologyData, categories } from "@/data/technologies";
import { popularStackTemplates, useCaseRequirementGroups } from "@/data/stack-templates";
import { Technology, TechStack, StackTemplate, StackTemplateIssues } from "@/types/tech-stack";
import { generateCommand } from "@/utils/commandGenerator";
import { useTechStack } from "@/hooks/useTechStack";
import { logger } from "@/lib/logger";

import { BuilderMobileHeader } from "./tech-stack/builder-mobile-header";
import { BuilderSidebar } from "./tech-stack/builder-sidebar";
import { MainContentHeader } from "./tech-stack/main-content-header";
import { SearchControlsBar } from "./tech-stack/search-controls-bar";
import { TechCategoryGrid } from "./tech-stack/tech-category-grid";
import { ArchitectureFlowView } from "./tech-stack/architecture-flow-view";
import { PopularStacksModal } from "./tech-stack/popular-stacks-modal";
import { TechComparatorModal } from "./tech-stack/tech-comparator-modal";
import { TechIcon } from "./tech-stack/tech-icon";

export function TechStackBuilderContent() {
  // Use custom hook for tech stack management
  const techStackHook = useTechStack();
  const {
    selectedStack,
    projectName,
    projectDescription,
    aiAnalysis,
    isAnalyzing,
    aiRecommendations,
    setProjectName,
    setProjectDescription,
    toggleTechnology,
    isTechnologySelected,
    getTotalSelected,
    clearStack,
    loadStack,
    analyzeStackWithAI,
    generateAIStack,
    applyAIRecommendation,
  } = techStackHook;

  // Local UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => new Set(categories));
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [showPopularStacks, setShowPopularStacks] = useState(false);
  const [activeView, setActiveView] = useState<'grid' | 'architecture'>('grid');
  const [isComparatorOpen, setIsComparatorOpen] = useState(false);
  // Sidebar visibility: open by default on desktop, closed (drawer) on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => typeof window === "undefined" || window.innerWidth >= 1024);

  const { toast } = useToast();
  const searchParams = useSearchParams();

  const technologiesById = useMemo(
    () => new Map(technologyData.map((tech) => [tech.id, tech])),
    []
  );

  const getCategoriesForTechIds = useCallback((techIds: string[]) => {
    const categoriesSet = new Set<string>();
    techIds.forEach((id) => {
      const tech = technologiesById.get(id);
      if (tech) {
        categoriesSet.add(tech.category);
      }
    });
    return categoriesSet;
  }, [technologiesById]);

  const getMissingRequirementGroups = useCallback((techIds: string[], useCase: string) => {
    const requirements = useCaseRequirementGroups[useCase] || [];
    const categoriesSet = getCategoriesForTechIds(techIds);
    return requirements.filter((requiredGroup) => !requiredGroup.some((category) => categoriesSet.has(category)));
  }, [getCategoriesForTechIds]);

  const formatRequirementGroup = useCallback((requirementGroup: string[]) => requirementGroup.join(" / "), []);

  const templateIssuesById = useMemo(() => {
    return new Map<string, StackTemplateIssues>(
      popularStackTemplates.map((stack) => {
        const missingIds = stack.techIds.filter((id) => !technologiesById.has(id));
        const missingRequirementGroups = getMissingRequirementGroups(stack.techIds, stack.useCase);
        const missingRequirements = missingRequirementGroups.map(formatRequirementGroup);
        return [stack.id, { missingIds, missingRequirements }];
      })
    );
  }, [technologiesById, getMissingRequirementGroups, formatRequirementGroup]);

  const invalidTemplateCount = useMemo(() => {
    let count = 0;
    templateIssuesById.forEach((issues) => {
      if (issues.missingIds.length > 0 || issues.missingRequirements.length > 0) {
        count += 1;
      }
    });
    return count;
  }, [templateIssuesById]);

  const mapTechIdsToStack = useCallback((techIds: string[]) => {
    const newStack: TechStack = {};

    techIds.forEach(techId => {
      const tech = technologyData.find(t => t.id === techId);
      if (tech) {
        if (!newStack[tech.category]) {
          newStack[tech.category] = [];
        }
        newStack[tech.category].push(tech);
      }
    });

    return newStack;
  }, []);

  const generateCompatibleTechIds = useCallback((primary: StackTemplate, secondary: StackTemplate) => {
    const mergedIds: string[] = [];
    const seen = new Set<string>();

    const addTechId = (techId: string) => {
      if (!seen.has(techId) && technologiesById.has(techId)) {
        seen.add(techId);
        mergedIds.push(techId);
      }
    };

    primary.techIds.forEach(addTechId);
    secondary.techIds.forEach(addTechId);

    const missingRequirementGroups = getMissingRequirementGroups(mergedIds, primary.useCase);

    missingRequirementGroups.forEach((requiredGroup) => {
      const candidateFromTemplates = popularStackTemplates
        .filter((stack) => stack.useCase === primary.useCase || stack.useCase === secondary.useCase)
        .flatMap((stack) => stack.techIds)
        .find((techId) => {
          const category = technologiesById.get(techId)?.category;
          return category ? requiredGroup.includes(category) : false;
        });

      if (candidateFromTemplates) {
        addTechId(candidateFromTemplates);
        return;
      }

      const fallback = technologyData.find((tech) => requiredGroup.includes(tech.category));
      if (fallback) {
        addTechId(fallback.id);
      }
    });

    return mergedIds.slice(0, 12);
  }, [getMissingRequirementGroups, technologiesById]);

  const loadPopularStack = useCallback((stackTemplate: StackTemplate) => {
    const newStack = mapTechIdsToStack(stackTemplate.techIds);
    const stackIssues = templateIssuesById.get(stackTemplate.id);

    loadStack(newStack, stackTemplate.name.toLowerCase().replace(/\s+/g, '-'), stackTemplate.description);
    setShowPopularStacks(false);

    toast({
      title: "Stack loaded!",
      description: stackIssues && stackIssues.missingRequirements.length > 0
        ? `${stackTemplate.name} loaded. Missing recommended categories: ${stackIssues.missingRequirements.join(', ')}.`
        : `${stackTemplate.name} template has been applied.`,
    });
  }, [loadStack, mapTechIdsToStack, templateIssuesById, toast]);

  const generateTemplateStack = useCallback((filteredCandidates?: StackTemplate[]) => {
    const candidateStacks = filteredCandidates && filteredCandidates.length > 0
      ? filteredCandidates
      : popularStackTemplates;

    if (candidateStacks.length === 0) {
      toast({
        title: "No matching templates",
        description: "Adjust filters to generate a stack.",
      });
      return;
    }

    const primary = candidateStacks[Math.floor(Math.random() * candidateStacks.length)];
    const secondary = candidateStacks[Math.floor(Math.random() * candidateStacks.length)];
    const mergedTechIds = generateCompatibleTechIds(primary, secondary);
    const generatedStack = mapTechIdsToStack(mergedTechIds);
    const unresolvedRequirementGroups = getMissingRequirementGroups(mergedTechIds, primary.useCase);
    const unresolvedRequirements = unresolvedRequirementGroups.map(formatRequirementGroup);

    loadStack(
      generatedStack,
      `${primary.name.toLowerCase().replace(/\s+/g, '-')}-blend`,
      `${primary.description} + ${secondary.description}`
    );
    setShowPopularStacks(false);
    toast({
      title: "Generated stack ready!",
      description: unresolvedRequirements.length > 0
        ? `Created a stack blend from ${primary.name} and ${secondary.name}. Remaining optional gaps: ${unresolvedRequirements.join(', ')}.`
        : `Created a stack blend from ${primary.name} and ${secondary.name} with required categories covered.`,
    });
  }, [formatRequirementGroup, generateCompatibleTechIds, getMissingRequirementGroups, loadStack, mapTechIdsToStack, toast]);

  // Close the mobile sidebar drawer with Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && window.matchMedia("(max-width: 1023px)").matches) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Load shared stack from URL on mount
  useEffect(() => {
    const stackParam = searchParams.get('stack');
    if (stackParam) {
      try {
        const decodedStack = JSON.parse(atob(stackParam));
        const newStack: TechStack = {};

        Object.entries(decodedStack).forEach(([category, techIds]) => {
          if (Array.isArray(techIds)) {
            techIds.forEach((techId: string) => {
              const tech = technologyData.find(t => t.id === techId);
              if (tech) {
                if (!newStack[tech.category]) {
                  newStack[tech.category] = [];
                }
                newStack[tech.category].push(tech);
              }
            });
          }
        });

        loadStack(newStack);
      } catch (error) {
        logger.error('Failed to parse shared stack:', error);
      }
    }
  }, [searchParams, loadStack]);

  // Helper functions
  const getTechnologiesByCategory = useCallback((category: string) => {
    return technologyData.filter(tech =>
      tech.category === category &&
      tech.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const toggleCategory = useCallback((category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  }, []);

  const copyCommand = async () => {
    const command = generateCommand(selectedStack, projectName);
    try {
      await navigator.clipboard.writeText(command);
      toast({
        title: "Command copied!",
        description: "The command has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy command to clipboard.",
        variant: "destructive",
      });
    }
  };

  const generateRandomStack = useCallback(() => {
    const randomTechs: Technology[] = [];
    const techsByCategory = categories.reduce((acc, category) => {
      acc[category] = technologyData.filter(tech => tech.category === category);
      return acc;
    }, {} as Record<string, Technology[]>);

    categories.forEach(category => {
      const categoryTechs = techsByCategory[category];
      if (categoryTechs.length > 0) {
        const count = Math.floor(Math.random() * 2) + 1;
        const shuffled = [...categoryTechs].sort(() => 0.5 - Math.random());
        randomTechs.push(...shuffled.slice(0, count));
      }
    });

    const newStack: TechStack = {};
    randomTechs.forEach(tech => {
      if (!newStack[tech.category]) {
        newStack[tech.category] = [];
      }
      newStack[tech.category].push(tech);
    });

    loadStack(newStack);
    toast({
      title: "Random stack generated!",
      description: `Selected ${randomTechs.length} technologies across ${Object.keys(newStack).length} categories.`,
    });
  }, [loadStack, toast]);

  const applyPreset = useCallback((presetType: string) => {
    let presetTechs: string[] = [];
    switch (presetType) {
      case 'default':
        presetTechs = ['tanstack-router', 'bun', 'hono', 'sqlite'];
        break;
      case 'convex-react':
        presetTechs = ['react', 'tanstack-router', 'mongodb', 'tailwind'];
        break;
      case 'mobile':
        presetTechs = ['reactnative', 'sqlite', 'nodejs'];
        break;
      case 'api-only':
        presetTechs = ['hono', 'sqlite', 'bun'];
        break;
      case 'full-featured':
        presetTechs = ['react', 'reactnative', 'turborepo', 'postgresql', 'tailwind'];
        break;
      case 'saas-pro':
        presetTechs = ['nextjs', 'typescript', 'tailwind', 'shadcn', 'postgresql', 'prisma', 'clerk', 'stripe', 'posthog', 'resend', 'vercel'];
        break;
      case 'ai-product':
        presetTechs = ['nextjs', 'typescript', 'tailwind', 'fastify', 'postgresql', 'redis', 'docker', 'sentry', 'aws'];
        break;
    }

    const newStack = mapTechIdsToStack(presetTechs);
    loadStack(newStack);
    toast({
      title: "Preset applied!",
      description: `Applied ${presetType} preset with ${presetTechs.length} technologies.`,
    });
  }, [loadStack, mapTechIdsToStack, toast]);

  // Generate command - memoized for performance
  const command = useMemo(() => generateCommand(selectedStack, projectName), [selectedStack, projectName]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row">
      <BuilderMobileHeader
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((open) => !open)}
        onCloseSidebar={() => setIsSidebarOpen(false)}
      />

      <BuilderSidebar
        projectName={projectName}
        setProjectName={setProjectName}
        projectDescription={projectDescription}
        setProjectDescription={setProjectDescription}
        isAnalyzing={isAnalyzing}
        generateAIStack={generateAIStack}
        analyzeStackWithAI={analyzeStackWithAI}
        showAiPanel={showAiPanel}
        setShowAiPanel={setShowAiPanel}
        aiAnalysis={aiAnalysis}
        applyAIRecommendation={applyAIRecommendation}
        selectedStack={selectedStack}
        getTotalSelected={getTotalSelected}
        clearStack={clearStack}
        generateRandomStack={generateRandomStack}
        onOpenPopularStacks={() => setShowPopularStacks(true)}
        command={command}
        onCopyCommand={copyCommand}
        toggleTechnology={toggleTechnology}
        onApplyPreset={applyPreset}
        isSidebarOpen={isSidebarOpen}
        onCloseSidebar={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full lg:h-screen overflow-hidden bg-background dark:bg-[#101010]">
        {/* Header */}
        <div className="p-6 lg:p-8 border-b border-border dark:border-[#212121] flex-shrink-0 bg-background/80 dark:bg-[#101010]/80 backdrop-blur-xs">
          <MainContentHeader
            onOpenComparator={() => setIsComparatorOpen(true)}
            showAiPanel={showAiPanel}
            onToggleAiPanel={() => setShowAiPanel(!showAiPanel)}
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen((open) => !open)}
          />

          <SearchControlsBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeView={activeView}
            setActiveView={setActiveView}
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8">
            {activeView === 'architecture' ? (
              <ArchitectureFlowView selectedStack={selectedStack} techIconRenderer={TechIcon} />
            ) : (
              <TechCategoryGrid
                categories={categories}
                getTechnologiesByCategory={getTechnologiesByCategory}
                expandedCategories={expandedCategories}
                toggleCategory={toggleCategory}
                isTechnologySelected={isTechnologySelected}
                toggleTechnology={toggleTechnology}
                aiRecommendations={aiRecommendations}
                selectedStack={selectedStack}
                techIconRenderer={TechIcon}
              />
            )}
          </div>
        </div>
      </main>

      {/* Popular Stacks Modal */}
      <PopularStacksModal
        isOpen={showPopularStacks}
        onClose={() => setShowPopularStacks(false)}
        popularStacks={popularStackTemplates}
        templateIssuesById={templateIssuesById}
        invalidTemplateCount={invalidTemplateCount}
        onLoadPopularStack={loadPopularStack}
        onGenerateTemplateStack={generateTemplateStack}
      />

      {/* Tech Comparator Modal */}
      <TechComparatorModal
        isOpen={isComparatorOpen}
        onClose={() => setIsComparatorOpen(false)}
        allTechnologies={technologyData}
        techIconRenderer={TechIcon}
      />
    </div>
  );
}
