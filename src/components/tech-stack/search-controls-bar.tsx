"use client";

import React from "react";
import { Search, X, LayoutGrid, Layers } from "lucide-react";
import { Input } from "@/components/ui/input";

export interface SearchControlsBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeView: 'grid' | 'architecture';
  setActiveView: (view: 'grid' | 'architecture') => void;
}

export function SearchControlsBar({
  searchTerm,
  setSearchTerm,
  activeView,
  setActiveView,
}: SearchControlsBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-muted-foreground dark:text-[#9c9c9c] w-4 h-4" />
        <Input
          placeholder="Search technologies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-9 bg-card dark:bg-[#121212] border border-border dark:border-[#212121] text-foreground dark:text-[#f3f3f3] placeholder:text-muted-foreground dark:placeholder:text-[#9c9c9c] text-xs focus-visible:ring-0 focus-visible:border-primary dark:focus-visible:border-[#6f6759]"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-muted-foreground dark:text-[#9c9c9c] hover:text-foreground dark:hover:text-[#f3f3f3] transition-colors"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* View Switcher Pills */}
      <div className="flex items-center gap-1 bg-muted/60 dark:bg-[#121212] p-1 rounded-md border border-border dark:border-[#212121] w-full sm:w-auto shrink-0">
        <button
          onClick={() => setActiveView('grid')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1 rounded-[4px] text-xs font-mono uppercase tracking-wider transition-all ${
            activeView === 'grid'
              ? "bg-card text-foreground shadow-xs dark:bg-[#ffffff] dark:text-[#101010]"
              : "text-muted-foreground dark:text-[#9c9c9c] hover:text-foreground dark:hover:text-[#f3f3f3]"
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          Grid
        </button>
        <button
          onClick={() => setActiveView('architecture')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1 rounded-[4px] text-xs font-mono uppercase tracking-wider transition-all ${
            activeView === 'architecture'
              ? "bg-card text-foreground shadow-xs dark:bg-[#ffffff] dark:text-[#101010]"
              : "text-muted-foreground dark:text-[#9c9c9c] hover:text-foreground dark:hover:text-[#f3f3f3]"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Topology Map
        </button>
      </div>
    </div>
  );
}
