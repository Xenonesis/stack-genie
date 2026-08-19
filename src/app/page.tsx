"use client";

import { Suspense, lazy } from "react";
import { motion } from "framer-motion";

// Lazy load the main component for better performance
const TechStackBuilderContent = lazy(() => 
  import("@/components/tech-stack-builder").then(mod => ({ 
    default: mod.TechStackBuilderContent 
  }))
);
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Skeleton */}
      <div className="hidden lg:flex w-72 flex-col border-r border-border bg-card">
        <div className="p-4 border-b border-border flex items-center gap-4">
          <motion.div 
            className="w-9 h-9 rounded-md bg-muted"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
          <div className="space-y-2">
            <motion.div className="h-4 w-32 bg-muted rounded-sm" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} />
            <motion.div className="h-3 w-20 bg-muted rounded-sm" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} />
          </div>
        </div>
        <div className="p-4 space-y-4 flex-1">
          <motion.div className="h-10 w-full bg-muted rounded-md" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.1 }} />
          <motion.div className="h-24 w-full bg-muted rounded-md" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.2 }} />
        </div>
      </div>
      
      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col min-w-0 bg-background">
        <div className="p-6 lg:p-8 border-b border-border">
          <motion.div className="h-8 w-64 bg-muted rounded-md mb-4" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} />
          <motion.div className="h-10 w-full max-w-md bg-muted rounded-md" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.1 }} />
        </div>
        <div className="p-6 lg:p-8 space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <motion.div className="h-6 w-32 bg-muted rounded-md" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: i * 0.1 }} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((j) => (
                  <motion.div 
                    key={j} 
                    className="h-24 bg-card border border-border rounded-lg"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: (i * 0.1) + (j * 0.05) }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TechStackBuilder() {
  return (
    <div className="app-shell ">
      <Suspense fallback={<LoadingFallback />}>
        <TechStackBuilderContent />
      </Suspense>
    </div>
  );
}