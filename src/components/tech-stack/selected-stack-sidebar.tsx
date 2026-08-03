import { X, AlertTriangle } from "lucide-react";
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
  const allTechs = Object.values(selectedStack).flat();

  // Conflict detection rules
  const conflicts: string[] = [];
  const orms = allTechs.filter(t => t.category === "ORM");
  if (orms.length > 1) conflicts.push(`Multiple ORMs selected (${orms.map(o => o.name).join(", ")})`);

  const css = allTechs.filter(t => t.category === "CSS Frameworks");
  if (css.length > 1) conflicts.push(`Multiple CSS frameworks selected`);

  const frontends = allTechs.filter(t => t.category === "Frontend");
  if (frontends.length > 1) conflicts.push(`Multiple UI frameworks selected (${frontends.map(f => f.name).join(", ")})`);

  return (
    <div className="px-6 py-6 border-t border-[#212121] flex-shrink-0">
      <div className="flex items-center justify-between mb-3">
        <label className="text-[11px] font-mono uppercase tracking-widest text-[#9c9c9c]">Selected Stack ({getTotalSelected()})</label>
        {getTotalSelected() > 0 && (
          <div className="flex items-center gap-1">
            {aiAnalysis && (
              <div className="px-2 py-0.5 rounded-[4px] bg-[#1a1a1a] border border-[#212121] text-[10px] font-mono uppercase tracking-widest text-[#9c9c9c] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#98ff38]" />
                {aiAnalysis.complexity}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Conflicts Alert Banner */}
      {conflicts.length > 0 && (
        <div className="mb-3 p-2 bg-[#1a1010] border border-[#472121] rounded-[4px] text-[11px] font-mono text-[#ff8080] flex items-start gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#ff8080]" />
          <div className="space-y-0.5">
            {conflicts.map((c, i) => (
              <div key={i}>{c}</div>
            ))}
          </div>
        </div>
      )}
      <div className="relative">
        <div className="h-52 overflow-y-auto pr-2 -mr-2 stack-scroll-container">
          <div className="space-y-3">
            <AnimatePresence>
              {Object.entries(selectedStack).map(([category, techs]) => (
                <div key={category}>
                  {techs.length > 0 && <div className="text-[10px] font-mono tracking-widest uppercase text-[#9c9c9c] mb-2">{category}</div>}
                  <AnimatePresence>
                    {techs.map((tech) => (
                      <motion.div
                        key={tech.id}
                        initial={{ opacity: 0, x: -10, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: "auto" }}
                        exit={{ opacity: 0, x: 10, height: 0 }}
                        className="flex items-center justify-between bg-[#121212] border border-[#212121] rounded-[4px] px-3 py-2 mb-2 group transition-colors hover:border-[#474747]"
                      >
                        <div className="flex items-center gap-3">
                          <TechIcon
                            src={tech.icon}
                            alt={tech.name}
                            width={16}
                            height={16}
                            className="rounded-sm"
                          />
                          <span className="text-xs font-normal text-[#f3f3f3]">{tech.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleTechnology(tech)}
                          className="h-5 w-5 p-0 text-[#9c9c9c] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#212121] hover:text-[#f3f3f3]"
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
                className="text-xs font-mono text-[#9c9c9c] text-center py-6 border border-dashed border-[#212121] rounded-[4px]"
              >
                No technologies selected
              </motion.div>
            )}
          </div>
        </div>
        {/* Fade-out bottom hint to indicate more content can be scrolled */}
        {getTotalSelected() > 3 && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#080808] to-transparent rounded-b-lg" />
        )}
      </div>
    </div>
  );
}
