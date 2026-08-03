import { Suspense, lazy } from "react";

// Lazy load the main component for better performance
const TechStackBuilderContent = lazy(() => 
  import("@/components/tech-stack-builder").then(mod => ({ 
    default: mod.TechStackBuilderContent 
  }))
);

function LoadingFallback() {
  return (
    <div className="app-shell min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="text-center font-sans tracking-tight">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl border border-primary/20 flex items-center justify-center mx-auto mb-6 shadow-sm p-2">
          <img src="/logo.svg" alt="Tech Genie Logo" className="w-full h-full object-contain animate-pulse" />
        </div>
        <div className="text-[14px] font-semibold text-foreground">Loading Tech Genie...</div>
        <div className="mt-2 text-xs text-muted-foreground">Preparing your AI-powered stack builder</div>
      </div>
    </div>
  );
}

export default function TechStackBuilder() {
  return (
    <div className="app-shell">
      <Suspense fallback={<LoadingFallback />}>
        <TechStackBuilderContent />
      </Suspense>
    </div>
  );
}