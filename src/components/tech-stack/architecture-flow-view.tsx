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
    { title: "Client & UI Layer", icon: Cpu, items: frontendLayer },
    { title: "API & Business Logic", icon: Server, items: backendLayer },
    { title: "Data & Storage Layer", icon: Database, items: databaseLayer },
    { title: "Cloud & Infrastructure", icon: Activity, items: devopsLayer },
  ];

  if (allTechs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-[#0c0c0c] rounded-lg border border-dashed border-[#212121] text-center">
        <Layers className="w-10 h-10 text-[#6f6759] mb-4" />
        <h3 className="text-sm font-normal uppercase tracking-wider text-[#f3f3f3]">No Architecture Connected</h3>
        <p className="text-xs text-[#9c9c9c] mt-1 max-w-sm">
          Select technologies from the grid to visually map your application's architecture layers.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-[#080808] p-4 rounded-lg border border-[#212121]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[#101010] border border-[#212121] flex items-center justify-center text-[#6f6759]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-normal uppercase tracking-wider text-[#f3f3f3]">System Topology Map</h3>
            <p className="text-[11px] text-[#9c9c9c]">Real-time data flow visualization of your selected stack</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-[10px] font-mono tracking-widest uppercase bg-[#1a1a1a] text-[#98ff38] border border-[#212121]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#98ff38]" /> Validated Topology
          </span>
        </div>
      </div>

      <div className="relative space-y-4">
        {layers.map((layer, index) => {
          const Icon = layer.icon;
          return (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="relative bg-[#0c0c0c] rounded-lg border border-[#212121] p-5 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#212121]">
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-[#6f6759]" />
                  <h4 className="text-xs font-normal uppercase tracking-widest text-[#f3f3f3]">{layer.title}</h4>
                  <span className="text-[10px] font-mono text-[#9c9c9c] px-2 py-0.5 rounded-[4px] bg-[#121212] border border-[#212121]">
                    {layer.items.length} {layer.items.length === 1 ? "component" : "components"}
                  </span>
                </div>
              </div>

              {layer.items.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {layer.items.map((tech) => (
                    <div
                      key={tech.id}
                      className="flex items-center gap-3 bg-[#101010] rounded-md p-3 border border-[#212121] hover:border-[#474747] transition-colors"
                    >
                      <TechIcon src={tech.icon} alt={tech.name} width={20} height={20} className="rounded-sm shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-normal text-[#f3f3f3] truncate">{tech.name}</div>
                        <div className="text-[10px] font-mono text-[#9c9c9c] truncate">{tech.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs font-mono text-[#9c9c9c] italic py-2">
                  No technologies selected for this layer yet.
                </div>
              )}

              {index < layers.length - 1 && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 w-6 h-6 rounded-full bg-[#101010] border border-[#212121] flex items-center justify-center">
                  <ArrowDownRight className="w-3 h-3 text-[#6f6759]" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
