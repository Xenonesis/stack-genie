import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Brain } from "lucide-react";
import { Technology, AIRecommendation } from "@/types/tech-stack";
import { ReactNode } from "react";

export interface TechCardProps {
  tech: Technology;
  isSelected: boolean;
  toggleTechnology: (tech: Technology) => void;
  aiRecommendations: AIRecommendation[];
  selectedStack: Record<string, Technology[]>;
  techIconRenderer: (props: { src?: string; alt: string; width: number; height?: number; className?: string }) => ReactNode;
}

export function TechCard({
  tech,
  isSelected,
  toggleTechnology,
  aiRecommendations,
  selectedStack,
  techIconRenderer: TechIcon
}: TechCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => toggleTechnology(tech)}
      className={`group cursor-pointer h-full relative overflow-hidden rounded-lg transition-colors duration-200 border ${
        isSelected
          ? 'bg-card border-foreground/80 dark:bg-[#181818] dark:border-white/80 shadow-xs'
          : 'bg-card border-border hover:border-foreground/30 dark:bg-[#0c0c0c] dark:border-[#212121] dark:hover:border-[#474747]'
      }`}
    >
      <Card className="h-full bg-transparent border-0 shadow-none relative z-10">
        <CardContent className="p-5 flex flex-col h-full justify-between">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-md bg-muted/70 dark:bg-[#101010] border transition-colors ${
                  isSelected ? 'border-foreground/30 dark:border-white/40' : 'border-border dark:border-[#212121]'
                }`}>
                  <TechIcon
                    src={tech.icon}
                    alt={tech.name}
                    width={28}
                    height={28}
                    className="rounded-sm"
                  />
                </div>
                <div>
                  <h3 className="font-medium dark:font-normal text-foreground dark:text-[#f3f3f3] text-sm uppercase tracking-tight font-sans">
                    {tech.name}
                  </h3>
                  {aiRecommendations.some(rec => rec.technology.id === tech.id) && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <Sparkles className="w-3 h-3 text-amber-600 dark:text-[#6f6759]" />
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground dark:text-[#9c9c9c]">AI Pick</span>
                    </div>
                  )}
                </div>
              </div>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-2 py-0.5 bg-primary text-primary-foreground dark:bg-white dark:text-[#101010] rounded-full text-[10px] font-mono font-medium uppercase tracking-widest"
                >
                  Active
                </motion.div>
              )}
            </div>

            <p className="text-muted-foreground dark:text-[#9c9c9c] text-xs font-normal leading-relaxed mb-3 line-clamp-2">
              {tech.description}
            </p>
          </div>

          {/* AI Recommendation Reason */}
          {(() => {
            const recommendation = aiRecommendations.find(rec => rec.technology.id === tech.id);
            if (recommendation) {
              return (
                <div className="bg-muted/60 dark:bg-[#121212] border border-border dark:border-[#212121] rounded-md p-2.5 mt-2">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Brain className="w-3 h-3 text-amber-600 dark:text-[#6f6759]" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-foreground dark:text-[#f3f3f3]">AI Rationale</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground dark:text-[#9c9c9c] leading-normal line-clamp-2">{recommendation.reason}</p>
                  <div className="text-[10px] font-mono text-amber-600 dark:text-[#6f6759] mt-1">
                    Confidence {recommendation.confidence}%
                  </div>
                </div>
              );
            }
            return null;
          })()}
        </CardContent>
      </Card>
    </motion.div>
  );
}
