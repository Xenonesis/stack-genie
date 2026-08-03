import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { Technology, AIRecommendation } from "@/types/tech-stack";
import { TechCard } from "./tech-card";
import { ReactNode } from "react";

interface CategorySectionProps {
  category: string;
  categoryTechs: Technology[];
  isExpanded: boolean;
  toggleCategory: (category: string) => void;
  isTechnologySelected: (tech: Technology) => boolean;
  toggleTechnology: (tech: Technology) => void;
  aiRecommendations: AIRecommendation[];
  selectedStack: Record<string, Technology[]>;
  techIconRenderer: (props: { src?: string; alt: string; width: number; height?: number; className?: string }) => ReactNode;
}

export function CategorySection({
  category,
  categoryTechs,
  isExpanded,
  toggleCategory,
  isTechnologySelected,
  toggleTechnology,
  aiRecommendations,
  selectedStack,
  techIconRenderer
}: CategorySectionProps) {
  if (categoryTechs.length === 0) return null;

  return (
    <motion.div
      key={category}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-10"
    >
      <button
        onClick={() => toggleCategory(category)}
        className="group flex items-center justify-between w-full mb-6 pb-3 border-b border-[#212121] text-left transition-colors"
      >
        <h2 className={`text-lg sm:text-xl font-normal font-sans uppercase tracking-tight transition-colors ${isExpanded ? 'text-[#f3f3f3]' : 'text-[#9c9c9c] group-hover:text-[#f3f3f3]'}`}>
          {category}
        </h2>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-[#121212] border-[#212121] text-[#9c9c9c] font-mono text-[11px] px-2 py-0.5">
            {categoryTechs.length}
          </Badge>
          <ChevronDown
            className={`w-4 h-4 text-[#9c9c9c] transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#f3f3f3]' : ''
              }`}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, height: 0, transition: { duration: 0.3 } },
              visible: {
                opacity: 1,
                height: "auto",
                transition: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.3,
                  staggerChildren: 0.05
                }
              }
            }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {categoryTechs.map((tech) => {
              const isSelected = isTechnologySelected(tech);
              return (
                <TechCard
                  key={tech.id}
                  tech={tech}
                  isSelected={isSelected}
                  toggleTechnology={toggleTechnology}
                  aiRecommendations={aiRecommendations}
                  selectedStack={selectedStack}
                  techIconRenderer={techIconRenderer}
                />
              );
            })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
