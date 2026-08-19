"use client";

import React, { useRef, useEffect } from "react";
import { Sparkles, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TechStack } from "@/types/tech-stack";
import { generateSmartCommand } from "@/utils/commandGenerator";
import { useToast } from "@/hooks/use-toast";

export interface SidebarCommandSectionProps {
  command: string;
  selectedStack: TechStack;
  projectName: string;
  projectDescription: string;
  onCopyCommand: () => void;
}

export function SidebarCommandSection({
  command,
  selectedStack,
  projectName,
  projectDescription,
  onCopyCommand,
}: SidebarCommandSectionProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Auto-resize command textarea when command changes
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.max(40, textarea.scrollHeight) + 'px';
    }
  }, [command]);

  const handleAiEnhance = async () => {
    const smartCommand = await generateSmartCommand(selectedStack, projectName, projectDescription);
    if (smartCommand !== command) {
      toast({
        title: "AI Enhanced Command!",
        description: "Command optimized with AI suggestions.",
      });
    }
  };

  return (
    <div className="px-6 py-6 border-b border-border dark:border-[#212121] flex-shrink-0">
      <div className="flex items-center justify-between mb-3">
        <label className="block text-[11px] font-mono uppercase tracking-widest text-muted-foreground dark:text-[#9c9c9c]">
          Generated Command
        </label>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAiEnhance}
          disabled={!command || !projectDescription.trim()}
          className="h-5 px-2 text-[10px] font-mono tracking-widest uppercase text-emerald-600 dark:text-[#98ff38] hover:bg-muted dark:hover:bg-[#1a1a1a] disabled:opacity-30"
        >
          <Sparkles className="w-3 h-3 mr-1 text-amber-600 dark:text-[#6f6759]" />
          AI Enhance
        </Button>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={command}
            readOnly
            className="w-full bg-muted/40 dark:bg-[#101010] border border-border dark:border-[#212121] text-foreground dark:text-[#f3f3f3] text-xs font-mono rounded-md px-3 py-2 resize-none overflow-hidden focus-visible:ring-0 focus-visible:border-primary dark:focus-visible:border-[#6f6759] transition-all duration-200"
            placeholder="Select technologies to generate command..."
            style={{
              minHeight: '40px',
              height: 'auto',
            }}
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onCopyCommand}
          disabled={!command}
          className="bg-transparent border border-border dark:border-[#212121] hover:border-foreground/30 dark:hover:border-[#474747] text-foreground dark:text-[#f3f3f3] disabled:opacity-30 self-start shrink-0 h-10 w-10 p-0 flex items-center justify-center"
        >
          <Copy className="w-4 h-4 text-amber-600 dark:text-[#6f6759]" />
        </Button>
      </div>
    </div>
  );
}
