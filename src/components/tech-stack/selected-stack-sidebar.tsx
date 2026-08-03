import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Technology, AIAnalysis } from "@/types/tech-stack";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface SelectedStackSidebarProps {
  selectedStack: Record<string, Technology[]>;
  getTotalSelected: () => number;
  aiAnalysis: AIAnalysis | null;
  toggleTechnology: (tech: Technology) => void;
  techIconRenderer: (props: { src?: string; alt: string; width: number; height?: number; className?: string }) => ReactNode;
}

export function SelectedStackSidebar({
  selectedStack,
  getTotalSelected,
  aiAnalysis,
  toggleTechnology,
  techIconRenderer: TechIcon
}: SelectedStackSidebarProps) {
  return (
    <div className="px-6 py-6 border-t border-border/30 flex-shrink-0">
      <div className="flex items-center justify-between mb-4">
        <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Selected Stack ({getTotalSelected()})</label>
        {getTotalSelected() > 0 && (
          <div className="flex items-center gap-1">
            {aiAnalysis && (
              <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase ${aiAnalysis.complexity === 'Simple' ? 'bg-success/20 text-success' :
                aiAnalysis.complexity === 'Moderate' ? 'bg-warning/20 text-warning' :
                  'bg-destructive/20 text-destructive'
                }`}>
                {aiAnalysis.complexity}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="h-40 overflow-y-auto pr-2 -mr-2">
        <div className="space-y-3">
          <AnimatePresence>
            {Object.entries(selectedStack).map(([category, techs]) => (
              <div key={category}>
                {techs.length > 0 && <div className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground/60 mb-2">{category}</div>}
                <AnimatePresence>
                  {techs.map((tech) => (
                    <motion.div
                      key={tech.id}
                      initial={{ opacity: 0, x: -10, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: "auto" }}
                      exit={{ opacity: 0, x: 10, height: 0 }}
                      className="flex items-center justify-between bg-accent/40 rounded-lg px-3 py-2 mb-2 group transition-colors hover:bg-accent/60"
                    >
                      <div className="flex items-center gap-3">
                        <TechIcon
                          src={tech.icon}
                          alt={tech.name}
                          width={16}
                          height={16}
                          className="rounded-sm"
                        />
                        <span className="text-sm font-medium text-foreground">{tech.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleTechnology(tech)}
                        className="h-6 w-6 p-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20 hover:text-destructive"
                      >
                        <X className="w-3.5 h-3.5" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ))}
          </AnimatePresence>
          {getTotalSelected() === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-medium text-muted-foreground/60 text-center py-6 border border-dashed border-border/40 rounded-xl"
            >
              No technologies selected
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
