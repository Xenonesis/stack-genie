import { Suspense } from "react";
import { TechStackBuilderContent } from "@/components/tech-stack-builder";

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold mx-auto mb-4">
          T
        </div>
        <div className="text-lg font-semibold text-slate-600 dark:text-slate-400">Loading Tech Stack Builder...</div>
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