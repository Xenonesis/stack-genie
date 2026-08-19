"use client";

import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Technology, TechStack, AIRecommendation } from "@/types/tech-stack";
import { CategorySection } from "./category-section";
import { TechIcon } from "./tech-icon";

export interface TechCategoryGridProps {
  categories: readonly string[];
  getTechnologiesByCategory: (category: string) => Technology[];
  expandedCategories: Set<string>;
  toggleCategory: (category: string) => void;
  isTechnologySelected: (tech: Technology) => boolean;
  toggleTechnology: (tech: Technology) => void;
  aiRecommendations: AIRecommendation[];
  selectedStack: TechStack;
  techIconRenderer?: (props: { src?: string; alt: string; width: number; height?: number; className?: string }) => ReactNode;
}

export function TechCategoryGrid({
  categories,
  getTechnologiesByCategory,
  expandedCategories,
  toggleCategory,
  isTechnologySelected,
  toggleTechnology,
  aiRecommendations,
  selectedStack,
  techIconRenderer = TechIcon,
}: TechCategoryGridProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {categories.map((category) => {
          const categoryTechs = getTechnologiesByCategory(category);
          if (categoryTechs.length === 0) return null;
          const isExpanded = expandedCategories.has(category);

          return (
            <CategorySection
              key={category}
              category={category}
              categoryTechs={categoryTechs}
              isExpanded={isExpanded}
              toggleCategory={toggleCategory}
              isTechnologySelected={isTechnologySelected}
              toggleTechnology={toggleTechnology}
              aiRecommendations={aiRecommendations}
              selectedStack={selectedStack}
              techIconRenderer={techIconRenderer}
            />
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}
