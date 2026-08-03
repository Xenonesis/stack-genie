import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Sparkles, Brain } from "lucide-react";
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => toggleTechnology(tech)}
      className={`group cursor-pointer h-full relative overflow-hidden rounded-xl transition-all duration-300 ${
        isSelected
          ? 'bg-primary/10 border border-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.2)]'
          : 'bg-card border border-border/50 hover:border-border hover:shadow-md'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      <Card className="h-full bg-transparent border-0 shadow-none relative z-10">
        <CardContent className="p-4 sm:p-5 flex flex-col h-full">
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-background border border-border/50 transition-colors ${isSelected ? 'border-primary/30 shadow-sm' : ''}`}>
                <TechIcon
                  src={tech.icon}
                  alt={tech.name}
                  width={32}
                  height={32}
                  className="rounded-md"
                />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm sm:text-base tracking-tight">{tech.name}</h3>
                {aiRecommendations.some(rec => rec.technology.id === tech.id) && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-medium text-primary">AI Pick</span>
                  </div>
                )}
              </div>
            </div>
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-foreground rotate-45" />
              </motion.div>
            )}
          </div>

          <p className="text-muted-foreground text-xs sm:text-xs font-medium tracking-wider leading-relaxed mb-2 line-clamp-2">
            {tech.description}
          </p>

          {/* AI Recommendation Reason */}
          {(() => {
            const recommendation = aiRecommendations.find(rec => rec.technology.id === tech.id);
            if (recommendation) {
              return (
                <div className="bg-primary/15 border border-primary/35 rounded-md shadow-xs p-1.5 sm:p-2 mt-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Brain className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
                    <span className="text-[10px] sm:text-xs font-medium tracking-wider text-primary font-medium">AI Insight</span>
                  </div>
                  <p className="text-[10px] sm:text-xs font-medium tracking-wider text-foreground/85 line-clamp-2">{recommendation.reason}</p>
                  <div className="text-[10px] sm:text-xs font-medium tracking-wider text-primary mt-1">
                    Confidence: {recommendation.confidence}%
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
