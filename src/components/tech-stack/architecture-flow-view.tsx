"use client";

import { motion } from "framer-motion";
import { Technology, TechStack } from "@/types/tech-stack";
import { Layers, ArrowDownRight, Server, Database, Cpu, ShieldCheck, Activity } from "lucide-react";
import React from "react";

interface ArchitectureFlowViewProps {
  selectedStack: TechStack;
  techIconRenderer: (props: { src?: string; alt: string; width: number; height?: number; className?: string }) => React.ReactNode;
}

export function ArchitectureFlowView({ selectedStack, techIconRenderer: TechIcon }: ArchitectureFlowViewProps) {
  const allTechs = Object.values(selectedStack).flat();

  // Categorize tech into architectural layers
  const frontendLayer = allTechs.filter(t => 
    ["Frontend", "CSS Frameworks", "State Management", "UI Libraries"].includes(t.category)
  );

  const backendLayer = allTechs.filter(t => 
    ["Backend", "API Tools", "Authentication"].includes(t.category)
  );

  const databaseLayer = allTechs.filter(t => 
    ["Database", "ORM", "Caching"].includes(t.category)
  );

  const devopsLayer = allTechs.filter(t => 
    ["DevOps", "Testing", "Analytics", "Hosting"].includes(t.category)
  );

  const layers = [
    { title: "Client & UI Layer", icon: Cpu, items: frontendLayer, color: "from-blue-500/20 to-cyan-500/20", borderColor: "border-blue-500/30", badgeColor: "text-blue-400" },
    { title: "API & Business Logic", icon: Server, items: backendLayer, color: "from-indigo-500/20 to-purple-500/20", borderColor: "border-indigo-500/30", badgeColor: "text-indigo-400" },
    { title: "Data & Storage Layer", icon: Database, items: databaseLayer, color: "from-emerald-500/20 to-teal-500/20", borderColor: "border-emerald-500/30", badgeColor: "text-emerald-400" },
    { title: "Cloud & Infrastructure", icon: Activity, items: devopsLayer, color: "from-amber-500/20 to-orange-500/20", borderColor: "border-amber-500/30", badgeColor: "text-amber-400" },
  ];

  if (allTechs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-card/40 rounded-2xl border border-dashed border-border/40 text-center">
        <Layers className="w-12 h-12 text-muted-foreground/40 mb-4 animate-pulse" />
        <h3 className="text-base font-semibold text-foreground">No Architecture Connected</h3>
        <p className="text-xs text-muted-foreground mt-1 max-w-sm">
          Select technologies from the grid to visually map your application's architecture layers.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-card/60 backdrop-blur-md p-4 rounded-xl border border-border/40 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground tracking-tight">System Topology Map</h3>
            <p className="text-xs text-muted-foreground">Real-time data flow visualization of your selected stack</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-3 h-3" /> Validated Topology
          </span>
        </div>
      </div>

      <div className="relative space-y-4">
        {layers.map((layer, index) => {
          const Icon = layer.icon;
          return (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-gradient-to-r ${layer.color} bg-card/80 backdrop-blur-md rounded-2xl border ${layer.borderColor} p-5 shadow-lg overflow-hidden`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${layer.badgeColor}`} />
                  <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">{layer.title}</h4>
                  <span className="text-[10px] font-semibold text-muted-foreground px-2 py-0.5 rounded-md bg-accent/60">
                    {layer.items.length} {layer.items.length === 1 ? "component" : "components"}
                  </span>
                </div>
              </div>

              {layer.items.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {layer.items.map((tech) => (
                    <div
                      key={tech.id}
                      className="flex items-center gap-3 bg-background/80 backdrop-blur-sm rounded-xl p-3 border border-border/50 shadow-xs hover:border-primary/40 transition-all hover:scale-[1.02]"
                    >
                      <TechIcon src={tech.icon} alt={tech.name} width={20} height={20} className="rounded-md shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-foreground truncate">{tech.name}</div>
                        <div className="text-[10px] text-muted-foreground truncate">{tech.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-muted-foreground/60 italic py-2">
                  No technologies selected for this layer yet.
                </div>
              )}

              {index < layers.length - 1 && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center shadow-md">
                  <ArrowDownRight className="w-3 h-3 text-muted-foreground animate-bounce" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
