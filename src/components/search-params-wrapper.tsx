"use client";

import { Suspense } from "react";

interface SearchParamsWrapperProps {
  children: React.ReactNode;
}

export function SearchParamsWrapper({ children }: SearchParamsWrapperProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  );
}