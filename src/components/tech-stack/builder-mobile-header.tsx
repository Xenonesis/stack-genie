"use client";

import React from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export interface BuilderMobileHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onCloseSidebar: () => void;
}

export function BuilderMobileHeader({ isSidebarOpen, onToggleSidebar, onCloseSidebar }: BuilderMobileHeaderProps) {
  return (
    <>
      {/* Mobile Header - Show/Hide Sidebar Toggle */}
      <div className="lg:hidden bg-card/90 dark:bg-[#080808]/90 backdrop-blur-md border-b border-border dark:border-[#212121] p-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-md bg-muted/60 dark:bg-[#101010] border border-border dark:border-[#212121] p-1 flex items-center justify-center shrink-0">
            <img src="/logo.svg" alt="Stack Genie Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-lg font-medium dark:font-normal text-foreground dark:text-[#f3f3f3] font-sans tracking-tight">Stack Genie</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleSidebar}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            aria-expanded={isSidebarOpen}
            className="bg-transparent border-border dark:border-[#212121] text-foreground dark:text-[#f3f3f3]"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-20 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onCloseSidebar}
        aria-hidden="true"
      />
    </>
  );
}
