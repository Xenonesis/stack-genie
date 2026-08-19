"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function BuilderMobileHeader() {
  const toggleMobileSidebar = () => {
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.toggle('sidebar-open');
    if (overlay) overlay.classList.toggle('active');
  };

  const closeMobileSidebar = () => {
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('sidebar-open');
    if (overlay) overlay.classList.remove('active');
  };

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
            onClick={toggleMobileSidebar}
            className="bg-transparent border-border dark:border-[#212121] text-foreground dark:text-[#f3f3f3]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        id="sidebar-overlay"
        className="sidebar-overlay lg:hidden"
        onClick={closeMobileSidebar}
      />
    </>
  );
}
