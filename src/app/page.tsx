import { Suspense, lazy } from "react";

// Lazy load the main component for better performance
const TechStackBuilderContent = lazy(() => 
  import("@/components/tech-stack-builder").then(mod => ({ 
    default: mod.TechStackBuilderContent 
  }))
);

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="text-center font-sans tracking-tight">
        <div className="w-10 h-10 bg-primary/10 rounded-xl border border-primary/20 flex items-center justify-center text-primary font-bold mx-auto mb-6 animate-pulse shadow-sm">
          TG
        </div>
        <div className="text-[14px] font-semibold text-foreground">Loading Tech Genie...</div>
        <div className="mt-2 text-xs text-muted-foreground">Preparing your AI-powered stack builder</div>
      </div>
    </div>
  );
}

export default function TechStackBuilder() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <TechStackBuilderContent />
    </Suspense>
  );
}