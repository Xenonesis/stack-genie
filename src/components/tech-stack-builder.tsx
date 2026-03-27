"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { ChevronDown, Search, X, Plus, RotateCcw, Shuffle, Save, Share, Copy, Sparkles, Brain, Zap, MessageSquare } from "lucide-react";
import { technologyData, categories } from "@/data/technologies";
import { Technology, TechStack, AIRecommendation, AIAnalysis } from "@/types/tech-stack";
import { generateCommand, generateSmartCommand } from "@/utils/commandGenerator";
import { useTechStack } from "@/hooks/useTechStack";
import { callAI } from "@/utils/ai";
import { ThemeToggle } from "@/components/theme-toggle";
import { logger } from "@/lib/logger";

// Fallback icon component
const FallbackIcon = ({ name, size = 32 }: { name: string; size?: number }) => (
 <div
 className="bg-gray-600 rounded-md border border-border shadow-xs flex items-center justify-center text-foreground font-bold"
 style={{ width: `${size}px`, height: `${size}px`, fontSize: `${size * 0.4}px` }}
 >
 {name.charAt(0).toUpperCase()}
 </div>
);

// Custom Image component with error handling
const TechIcon = ({ src, alt, width, height, className }: {
 src?: string;
 alt: string;
 width: number;
 height: number;
 className?: string;
}) => {
 const [hasError, setHasError] = useState(false);
 const [isLoading, setIsLoading] = useState(true);

 if (!src || hasError) {
 return <FallbackIcon name={alt} size={width} />;
 }

 return (
 <div className="relative" style={{ width: `${width}px`, height: `${width}px` }}>
 {isLoading && (
 <div className="absolute inset-0 bg-muted animate-pulse rounded" />
 )}
 <Image
 src={src}
 alt={alt}
 width={width}
 height={height}
 className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
 style={{ width: `${width}px`, height: "auto", maxHeight: `${width}px`, objectFit: "contain" }}
 onError={() => setHasError(true)}
 onLoad={() => setIsLoading(false)}
 unoptimized={!!src && src.includes('.svg')}
 />
 </div>
 );
};

export function TechStackBuilderContent() {
 type StackTemplate = {
 id: string;
 name: string;
 description: string;
 useCase: string;
 infra: "Minimal" | "Standard" | "Production";
 aiReady: boolean;
 techIds: string[];
 };

 // Use custom hook for tech stack management
 const techStackHook = useTechStack();
 const {
 selectedStack,
 projectName,
 projectDescription,
 aiAnalysis,
 isAnalyzing,
 aiRecommendations,
 setProjectName,
 setProjectDescription,
 toggleTechnology,
 isTechnologySelected,
 getTotalSelected,
 clearStack,
 loadStack,
 analyzeStackWithAI,
 generateAIStack,
 applyAIRecommendation,
 } = techStackHook;

 // Local UI state
 const [searchTerm, setSearchTerm] = useState("");
 const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(categories));
 const [showAiPanel, setShowAiPanel] = useState(false);
 const [showPopularStacks, setShowPopularStacks] = useState(false);
 const [templateSearchTerm, setTemplateSearchTerm] = useState("");
 const [templateUseCaseFilter, setTemplateUseCaseFilter] = useState("All");
 const [templateInfraFilter, setTemplateInfraFilter] = useState("All");
 const [templateAiFilter, setTemplateAiFilter] = useState("All");
 const { toast } = useToast();
 const searchParams = useSearchParams();
 const commandTextareaRef = useRef<HTMLTextAreaElement>(null);

 // Memoized popular stack templates
 const popularStacks = useMemo<StackTemplate[]>(() => [
 {
 id: "modern-full-stack",
 name: "Modern Full-Stack",
 description: "Next.js + TypeScript + Tailwind + Prisma + PostgreSQL",
 useCase: "SaaS",
 infra: "Standard",
 aiReady: true,
 techIds: ["nextjs", "typescript", "tailwind", "shadcn", "prisma", "postgresql", "nextauth", "zod", "stripe", "vercel"]
 },
 {
 id: "ecommerce-store",
 name: "E-commerce Store",
 description: "Next.js + Stripe + CMS + Analytics",
 useCase: "E-commerce",
 infra: "Standard",
 aiReady: false,
 techIds: ["nextjs", "tailwind", "shadcn", "stripe", "sanity", "posthog", "zod", "nextauth", "vercel"]
 },
 {
 id: "realtime-chat-app",
 name: "Real-time Chat App",
 description: "React + Socket.io + MongoDB + Authentication",
 useCase: "Realtime",
 infra: "Standard",
 aiReady: true,
 techIds: ["react", "socketio", "mongodb", "mongoose", "nextauth", "tailwind", "zustand", "vite"]
 },
 {
 id: "saas-starter",
 name: "SaaS Starter",
 description: "Next.js + Supabase + Stripe + Email + Analytics",
 useCase: "SaaS",
 infra: "Standard",
 aiReady: true,
 techIds: ["nextjs", "supabase", "stripe", "resend", "posthog", "tailwind", "shadcn", "zod", "lucia", "vercel"]
 },
 {
 id: "content-site",
 name: "Content Site",
 description: "Astro + CMS + Search + Analytics",
 useCase: "Content",
 infra: "Minimal",
 aiReady: false,
 techIds: ["astro", "sanity", "algolia", "tailwind", "plausible", "cloudinary"]
 },
 {
 id: "mobile-app",
 name: "Mobile App",
 description: "React Native + Expo + Supabase + Stripe",
 useCase: "Mobile",
 infra: "Standard",
 aiReady: true,
 techIds: ["reactnative", "expo", "supabase", "stripe", "zustand"]
 },
 {
 id: "ai-saas-copilot",
 name: "AI SaaS Copilot",
 description: "Next.js + FastAPI + PostgreSQL + Redis + vector-ready infra",
 useCase: "AI",
 infra: "Production",
 aiReady: true,
 techIds: ["nextjs", "tailwind", "shadcn", "fastify", "postgresql", "redis", "docker", "kubernetes", "sentry", "aws"]
 },
 {
 id: "api-platform-typesafe",
 name: "Type-Safe API Platform",
 description: "Hono + tRPC + Zod + PostgreSQL + Drizzle",
 useCase: "API",
 infra: "Production",
 aiReady: true,
 techIds: ["hono", "trpc", "zod", "postgresql", "drizzle", "bun", "docker", "github-actions", "swagger"]
 },
 {
 id: "nextjs-enterprise-saas",
 name: "Enterprise SaaS",
 description: "Next.js + Clerk + Stripe + Postgres + observability",
 useCase: "Enterprise",
 infra: "Production",
 aiReady: true,
 techIds: ["nextjs", "typescript", "tailwind", "clerk", "stripe", "postgresql", "prisma", "sentry", "datadog", "vercel"]
 },
 {
 id: "realtime-collaboration-suite",
 name: "Realtime Collaboration",
 description: "React + PartyKit + Postgres + Redis + edge deploy",
 useCase: "Realtime",
 infra: "Production",
 aiReady: true,
 techIds: ["react", "partykit", "postgresql", "redis", "tailwind", "zustand", "cloudflare-pages", "docker"]
 },
 {
 id: "ai-rag-dashboard",
 name: "AI RAG Dashboard",
 description: "Next.js + Fastify + Postgres + Elasticsearch + monitoring",
 useCase: "AI",
 infra: "Production",
 aiReady: true,
 techIds: ["nextjs", "typescript", "tailwind", "fastify", "postgresql", "elasticsearch", "docker", "prometheus", "grafana", "aws"]
 },
 {
 id: "lean-startup-stack",
 name: "Lean Startup",
 description: "Vite + React + Supabase + Resend + Vercel",
 useCase: "SaaS",
 infra: "Minimal",
 aiReady: true,
 techIds: ["vite", "react", "tailwind", "supabase", "supabase-auth", "resend", "posthog", "vercel"]
 },
 {
 id: "microservice-core-platform",
 name: "Microservice Core",
 description: "NestJS + Kafka + PostgreSQL + Redis + K8s",
 useCase: "Enterprise",
 infra: "Production",
 aiReady: true,
 techIds: ["nestjs", "postgresql", "redis", "apache-kafka", "docker", "kubernetes", "terraform", "prometheus", "grafana"]
 },
 {
 id: "content-commerce-hybrid",
 name: "Content + Commerce",
 description: "Next.js + Payload + Stripe + Search + CDN",
 useCase: "E-commerce",
 infra: "Standard",
 aiReady: true,
 techIds: ["nextjs", "tailwind", "payload", "stripe", "typesense", "cloudinary", "posthog", "vercel"]
 },
 {
 id: "developer-tooling-webapp",
 name: "Developer Tooling",
 description: "React + Hono + Turborepo + Docker + CI",
 useCase: "DevTools",
 infra: "Production",
 aiReady: true,
 techIds: ["react", "hono", "typescript", "turborepo", "pnpm", "postgresql", "drizzle", "docker", "github-actions"]
 },
 {
 id: "python-api-starter",
 name: "Python API Starter",
 description: "FastAPI style stack with Postgres and Redis",
 useCase: "API",
 infra: "Standard",
 aiReady: true,
 techIds: ["python", "flask", "postgresql", "redis", "docker", "github-actions", "swagger"]
 },
 {
 id: "nextjs-supabase-billing",
 name: "Supabase Billing SaaS",
 description: "Next.js + Supabase + Stripe + PostHog + Resend",
 useCase: "SaaS",
 infra: "Standard",
 aiReady: true,
 techIds: ["nextjs", "tailwind", "shadcn", "supabase", "supabase-auth", "stripe", "posthog", "resend", "vercel"]
 },
 {
 id: "cms-editorial-platform",
 name: "Editorial Platform",
 description: "Astro + Sanity + Algolia + Plausible + CDN",
 useCase: "Content",
 infra: "Standard",
 aiReady: false,
 techIds: ["astro", "sanity", "algolia", "plausible", "cloudinary", "netlify"]
 },
 {
 id: "b2b-admin-suite",
 name: "B2B Admin Suite",
 description: "Next.js + Clerk + Postgres + Sentry + Datadog",
 useCase: "SaaS",
 infra: "Production",
 aiReady: true,
 techIds: ["nextjs", "typescript", "tailwind", "clerk", "postgresql", "prisma", "sentry", "datadog", "aws"]
 },
 {
 id: "realtime-support-platform",
 name: "Realtime Support Platform",
 description: "React + Ably + Hono + Redis + analytics",
 useCase: "Realtime",
 infra: "Production",
 aiReady: true,
 techIds: ["react", "ably", "hono", "redis", "postgresql", "tailwind", "posthog", "docker", "render"]
 },
 {
 id: "graphql-enterprise-stack",
 name: "GraphQL Enterprise",
 description: "Apollo + Yoga + Postgres + Redis + observability",
 useCase: "API",
 infra: "Production",
 aiReady: true,
 techIds: ["react", "apollo-graphql", "graphql-yoga", "graphql-codegen", "postgresql", "redis", "docker", "sentry", "aws"]
 },
 {
 id: "edge-api-performance",
 name: "Edge API Performance",
 description: "Hono + Bun + Turso + Cloudflare + Zod",
 useCase: "API",
 infra: "Standard",
 aiReady: true,
 techIds: ["hono", "bun", "turso", "zod", "cloudflare-pages", "github-actions"]
 },
 {
 id: "full-mobile-platform",
 name: "Full Mobile Platform",
 description: "React Native + Expo + Node + Stripe + analytics",
 useCase: "Mobile",
 infra: "Production",
 aiReady: true,
 techIds: ["reactnative", "expo", "nodejs", "postgresql", "stripe", "posthog", "sentry", "aws"]
 },
 {
 id: "modular-monorepo-stack",
 name: "Modular Monorepo",
 description: "Turborepo + Next.js + React Native + shared core",
 useCase: "DevTools",
 infra: "Production",
 aiReady: true,
 techIds: ["turborepo", "nextjs", "reactnative", "typescript", "pnpm", "postgresql", "drizzle", "docker", "github-actions"]
 },
 {
 id: "event-driven-saas",
 name: "Event-Driven SaaS",
 description: "NestJS + Bull + Redis + Postgres + observability",
 useCase: "SaaS",
 infra: "Production",
 aiReady: true,
 techIds: ["nestjs", "bull", "redis", "postgresql", "typeorm", "docker", "kubernetes", "prometheus", "grafana"]
 },
 {
 id: "search-heavy-platform",
 name: "Search-Heavy Platform",
 description: "Next.js + Meilisearch + PostgreSQL + Cloud storage",
 useCase: "Content",
 infra: "Production",
 aiReady: true,
 techIds: ["nextjs", "tailwind", "meilisearch", "postgresql", "uploadthing", "sentry", "render"]
 },
 {
 id: "serverless-data-product",
 name: "Serverless Data Product",
 description: "Next.js + Neon + Drizzle + Vercel Blob + analytics",
 useCase: "SaaS",
 infra: "Standard",
 aiReady: true,
 techIds: ["nextjs", "neon", "drizzle", "vercel-blob", "posthog", "tailwind", "vercel"]
 },
 {
 id: "payments-api-core",
 name: "Payments API Core",
 description: "Express + PostgreSQL + Stripe + auth + monitoring",
 useCase: "API",
 infra: "Production",
 aiReady: false,
 techIds: ["express", "postgresql", "stripe", "passport", "zod", "docker", "sentry", "aws"]
 },
 {
 id: "enterprise-java-platform",
 name: "Enterprise Java Platform",
 description: "Spring Boot + PostgreSQL + Kafka + Kubernetes",
 useCase: "Enterprise",
 infra: "Production",
 aiReady: true,
 techIds: ["java", "spring", "postgresql", "apache-kafka", "docker", "kubernetes", "prometheus", "grafana", "aws"]
 },
 {
 id: "docs-and-api-hub",
 name: "Docs + API Hub",
 description: "Astro + Express + OpenAPI + search + analytics",
 useCase: "DevTools",
 infra: "Standard",
 aiReady: false,
 techIds: ["astro", "express", "swagger", "algolia", "plausible", "netlify"]
 },
 {
 id: "ai-agent-backend-core",
 name: "AI Agent Backend Core",
 description: "Fastify + PostgreSQL + Redis + queue + observability",
 useCase: "AI",
 infra: "Production",
 aiReady: true,
 techIds: ["fastify", "postgresql", "redis", "rabbitmq", "docker", "kubernetes", "sentry", "datadog", "aws"]
 },
 {
 id: "frontend-performance-stack",
 name: "Frontend Performance Stack",
 description: "Vite + React + Zustand + TanStack Router + tests",
 useCase: "DevTools",
 infra: "Minimal",
 aiReady: true,
 techIds: ["vite", "react", "tanstack-router", "zustand", "tailwind", "vitest", "playwright", "cloudflare-pages"]
 },
 {
 id: "security-first-platform",
 name: "Security-First Platform",
 description: "Next.js + Better Auth + PostgreSQL + Sentry + CI",
 useCase: "Enterprise",
 infra: "Production",
 aiReady: true,
 techIds: ["nextjs", "better-auth", "postgresql", "prisma", "sentry", "github-actions", "docker", "aws"]
 }
 ], []);

 const templateUseCases = useMemo(
 () => ["All", ...new Set(popularStacks.map((stack) => stack.useCase))],
 [popularStacks]
 );

 const filteredPopularStacks = useMemo(() => {
 return popularStacks.filter((stack) => {
 const matchesSearch =
 stack.name.toLowerCase().includes(templateSearchTerm.toLowerCase()) ||
 stack.description.toLowerCase().includes(templateSearchTerm.toLowerCase());
 const matchesUseCase = templateUseCaseFilter === "All" || stack.useCase === templateUseCaseFilter;
 const matchesInfra = templateInfraFilter === "All" || stack.infra === templateInfraFilter;
 const matchesAi =
 templateAiFilter === "All" ||
 (templateAiFilter === "AI Ready" && stack.aiReady) ||
 (templateAiFilter === "Non-AI" && !stack.aiReady);
 return matchesSearch && matchesUseCase && matchesInfra && matchesAi;
 });
 }, [popularStacks, templateSearchTerm, templateUseCaseFilter, templateInfraFilter, templateAiFilter]);

 const technologiesById = useMemo(
 () => new Map(technologyData.map((tech) => [tech.id, tech])),
 []
 );

 const useCaseRequirementGroups = useMemo<Record<string, string[][]>>(() => ({
 SaaS: [["Database"], ["Web Framework", "Backend Framework"], ["Hosting", "DevOps/Infrastructure"]],
 AI: [["Database"], ["Backend Framework", "Web Framework"], ["Hosting", "DevOps/Infrastructure"]],
 API: [["Database"], ["Backend Framework", "GraphQL/API", "API Documentation"]],
 Enterprise: [["Database"], ["Monitoring/Observability"], ["Hosting", "DevOps/Infrastructure"]],
 Realtime: [["Database"], ["Real-time", "Message Queues/Event Streaming"]],
 Content: [["Web Framework"], ["CMS", "Search"]],
 Mobile: [["Native Framework", "Web Framework"], ["Database"]],
 "E-commerce": [["Web Framework"], ["Payment"], ["Database", "CMS"]],
 DevTools: [["Web Framework", "Build Tools", "Backend Framework"], ["DevOps/Infrastructure", "Testing", "Hosting"]],
 }), []);

 const getCategoriesForTechIds = useCallback((techIds: string[]) => {
 const categoriesSet = new Set<string>();
 techIds.forEach((id) => {
 const tech = technologiesById.get(id);
 if (tech) {
 categoriesSet.add(tech.category);
 }
 });
 return categoriesSet;
 }, [technologiesById]);

 const getMissingRequirementGroups = useCallback((techIds: string[], useCase: string) => {
 const requirements = useCaseRequirementGroups[useCase] || [];
 const categoriesSet = getCategoriesForTechIds(techIds);
 return requirements.filter((requiredGroup) => !requiredGroup.some((category) => categoriesSet.has(category)));
 }, [getCategoriesForTechIds, useCaseRequirementGroups]);

 const formatRequirementGroup = useCallback((requirementGroup: string[]) => requirementGroup.join(" / "), []);

 const templateIssuesById = useMemo(() => {
 return new Map(
 popularStacks.map((stack) => {
 const missingIds = stack.techIds.filter((id) => !technologiesById.has(id));
 const missingRequirementGroups = getMissingRequirementGroups(stack.techIds, stack.useCase);
 const missingRequirements = missingRequirementGroups.map(formatRequirementGroup);
 return [stack.id, { missingIds, missingRequirements }];
 })
 );
 }, [popularStacks, technologiesById, getMissingRequirementGroups, formatRequirementGroup]);

 const invalidTemplateCount = useMemo(() => {
 let count = 0;
 templateIssuesById.forEach((issues) => {
 if (issues.missingIds.length > 0 || issues.missingRequirements.length > 0) {
 count += 1;
 }
 });
 return count;
 }, [templateIssuesById]);

 const generateCompatibleTechIds = useCallback((primary: StackTemplate, secondary: StackTemplate) => {
 const mergedIds: string[] = [];
 const seen = new Set<string>();

 const addTechId = (techId: string) => {
 if (!seen.has(techId) && technologiesById.has(techId)) {
 seen.add(techId);
 mergedIds.push(techId);
 }
 };

 primary.techIds.forEach(addTechId);
 secondary.techIds.forEach(addTechId);

 const missingRequirementGroups = getMissingRequirementGroups(mergedIds, primary.useCase);

 missingRequirementGroups.forEach((requiredGroup) => {
 const candidateFromTemplates = popularStacks
 .filter((stack) => stack.useCase === primary.useCase || stack.useCase === secondary.useCase)
 .flatMap((stack) => stack.techIds)
 .find((techId) => {
 const category = technologiesById.get(techId)?.category;
 return category ? requiredGroup.includes(category) : false;
 });

 if (candidateFromTemplates) {
 addTechId(candidateFromTemplates);
 return;
 }

 const fallback = technologyData.find((tech) => requiredGroup.includes(tech.category));
 if (fallback) {
 addTechId(fallback.id);
 }
 });

 return mergedIds.slice(0, 12);
 }, [getMissingRequirementGroups, popularStacks, technologiesById]);

 const mapTechIdsToStack = useCallback((techIds: string[]) => {
 const newStack: TechStack = {};
 
 techIds.forEach(techId => {
 const tech = technologyData.find(t => t.id === techId);
 if (tech) {
 if (!newStack[tech.category]) {
 newStack[tech.category] = [];
 }
 newStack[tech.category].push(tech);
 }
 });

 return newStack;
 }, []);

 const loadPopularStack = useCallback((stackTemplate: StackTemplate) => {
 const newStack = mapTechIdsToStack(stackTemplate.techIds);
 const stackIssues = templateIssuesById.get(stackTemplate.id);

 loadStack(newStack, stackTemplate.name.toLowerCase().replace(/\s+/g, '-'), stackTemplate.description);
 setShowPopularStacks(false);
 
 toast({
 title: "Stack loaded!",
 description: stackIssues && stackIssues.missingRequirements.length > 0
 ? `${stackTemplate.name} loaded. Missing recommended categories: ${stackIssues.missingRequirements.join(', ')}.`
 : `${stackTemplate.name} template has been applied.`,
 });
 }, [loadStack, mapTechIdsToStack, templateIssuesById, toast]);

 const generateTemplateStack = useCallback(() => {
 const candidateStacks = filteredPopularStacks.length > 0 ? filteredPopularStacks : popularStacks;
 if (candidateStacks.length === 0) {
 toast({
 title: "No matching templates",
 description: "Adjust filters to generate a stack.",
 });
 return;
 }

 const primary = candidateStacks[Math.floor(Math.random() * candidateStacks.length)];
 const secondary = candidateStacks[Math.floor(Math.random() * candidateStacks.length)];
 const mergedTechIds = generateCompatibleTechIds(primary, secondary);
 const generatedStack = mapTechIdsToStack(mergedTechIds);
 const unresolvedRequirementGroups = getMissingRequirementGroups(mergedTechIds, primary.useCase);
 const unresolvedRequirements = unresolvedRequirementGroups.map(formatRequirementGroup);

 loadStack(generatedStack, `${primary.name.toLowerCase().replace(/\s+/g, '-')}-blend`, `${primary.description} + ${secondary.description}`);
 setShowPopularStacks(false);
 toast({
 title: "Generated stack ready!",
 description: unresolvedRequirements.length > 0
 ? `Created a stack blend from ${primary.name} and ${secondary.name}. Remaining optional gaps: ${unresolvedRequirements.join(', ')}.`
 : `Created a stack blend from ${primary.name} and ${secondary.name} with required categories covered.`,
 });
 }, [filteredPopularStacks, formatRequirementGroup, generateCompatibleTechIds, getMissingRequirementGroups, loadStack, mapTechIdsToStack, popularStacks, toast]);

 // Load shared stack from URL on mount
 useEffect(() => {
 const stackParam = searchParams.get('stack');
 if (stackParam) {
 try {
 const decodedStack = JSON.parse(atob(stackParam));
 const newStack: TechStack = {};

 Object.entries(decodedStack).forEach(([category, techIds]) => {
 if (Array.isArray(techIds)) {
 techIds.forEach((techId: string) => {
 const tech = technologyData.find(t => t.id === techId);
 if (tech) {
 if (!newStack[tech.category]) {
 newStack[tech.category] = [];
 }
 newStack[tech.category].push(tech);
 }
 });
 }
 });

 loadStack(newStack);
 } catch (error) {
 logger.error('Failed to parse shared stack:', error);
 }
 }
 }, [searchParams, loadStack]);

 // Auto-resize command textarea when command changes
 useEffect(() => {
 const textarea = commandTextareaRef.current;
 if (textarea) {
 textarea.style.height = 'auto';
 textarea.style.height = Math.max(40, textarea.scrollHeight) + 'px';
 }
 }, [selectedStack, projectName]); // Re-run when stack or project name changes

 // Helper functions
 const getTechnologiesByCategory = useCallback((category: string) => {
 return technologyData.filter(tech =>
 tech.category === category &&
 tech.name.toLowerCase().includes(searchTerm.toLowerCase())
 );
 }, [searchTerm]);

 const toggleCategory = useCallback((category: string) => {
 setExpandedCategories(prev => {
 const newSet = new Set(prev);
 if (newSet.has(category)) {
 newSet.delete(category);
 } else {
 newSet.add(category);
 }
 return newSet;
 });
 }, []);

 const copyCommand = async () => {
 const command = generateCommand(selectedStack, projectName);
 try {
 await navigator.clipboard.writeText(command);
 toast({
 title: "Command copied!",
 description: "The command has been copied to your clipboard.",
 });
 } catch (error) {
 toast({
 title: "Failed to copy",
 description: "Could not copy command to clipboard.",
 variant: "destructive",
 });
 }
 };

 // Helper: Ask AI questions about tech stack 
 const askAIQuestion = useCallback(async (question: string) => {
 try {
 const prompt = `
 Answer this question about tech stacks:
 
 Question: ${question}
 Current Stack: ${Object.values(selectedStack).flat().map(t => t.name).join(', ') || 'No stack selected'}
 Project: ${projectDescription || 'No description provided'}
 
 Provide a helpful, concise answer focusing on practical advice.
 `;

 const response = await callAI(prompt);
 return response;
 } catch (error) {
 logger.error('AI Question Error:', error);
 return "I'm having trouble connecting to the AI service right now. Please try again later.";
 }
 }, [selectedStack, projectDescription]);

 // Helper: Generate random tech stack
 const generateRandomStack = useCallback(() => {
 const randomTechs: Technology[] = [];
 const techsByCategory = categories.reduce((acc, category) => {
 acc[category] = technologyData.filter(tech => tech.category === category);
 return acc;
 }, {} as Record<string, Technology[]>);

 categories.forEach(category => {
 const categoryTechs = techsByCategory[category];
 if (categoryTechs.length > 0) {
 const count = Math.floor(Math.random() * 2) + 1;
 const shuffled = [...categoryTechs].sort(() => 0.5 - Math.random());
 randomTechs.push(...shuffled.slice(0, count));
 }
 });

 const newStack: TechStack = {};
 randomTechs.forEach(tech => {
 if (!newStack[tech.category]) {
 newStack[tech.category] = [];
 }
 newStack[tech.category].push(tech);
 });

 loadStack(newStack);
 toast({
 title: "Random stack generated!",
 description: `Selected ${randomTechs.length} technologies across ${Object.keys(newStack).length} categories.`,
 });
 }, [loadStack, toast]);

 const applyPreset = useCallback((presetType: string) => {
 let presetTechs: string[] = [];
 switch (presetType) {
 case 'default':
 presetTechs = ['tanstack-router', 'bun', 'hono', 'sqlite'];
 break;
 case 'convex-react':
 presetTechs = ['react', 'tanstack-router', 'mongodb', 'tailwind'];
 break;
 case 'mobile':
 presetTechs = ['reactnative', 'sqlite', 'nodejs'];
 break;
 case 'api-only':
 presetTechs = ['hono', 'sqlite', 'bun'];
 break;
 case 'full-featured':
 presetTechs = ['react', 'reactnative', 'turborepo', 'postgresql', 'tailwind'];
 break;
 case 'saas-pro':
 presetTechs = ['nextjs', 'typescript', 'tailwind', 'shadcn', 'postgresql', 'prisma', 'clerk', 'stripe', 'posthog', 'resend', 'vercel'];
 break;
 case 'ai-product':
 presetTechs = ['nextjs', 'typescript', 'tailwind', 'fastify', 'postgresql', 'redis', 'docker', 'sentry', 'aws'];
 break;
 }

 const newStack = mapTechIdsToStack(presetTechs);

 loadStack(newStack);
 toast({
 title: "Preset applied!",
 description: `Applied ${presetType} preset with ${presetTechs.length} technologies.`,
 });
 }, [loadStack, mapTechIdsToStack, toast]);

 // Generate command - memoized for performance
 const command = useMemo(() => generateCommand(selectedStack, projectName), [selectedStack, projectName]);

 return (
 <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row">
 {/* Mobile Header - Show/Hide Sidebar Toggle */}
 <div className="lg:hidden bg-card/90 backdrop-blur-md border-b border-border/80 shadow-sm p-4 flex items-center justify-between sticky top-0 z-30">
 <div className="flex items-center gap-2">
 <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-foreground font-bold text-sm">
 TG
 </div>
 <h1 className="text-lg font-bold text-foreground font-display tracking-tight font-semibold">Tech Genie</h1>
 </div>
 <Button
 variant="outline"
 size="sm"
 onClick={() => {
 const sidebar = document.getElementById('mobile-sidebar');
 if (sidebar) {
 sidebar.classList.toggle('hidden');
 }
 }}
 className="bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground"
 >
 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
 </svg>
 </Button>
 </div>

 {/* Sidebar */}
 <div 
 id="mobile-sidebar"
 className="hidden lg:flex w-full lg:w-80 xl:w-96 bg-card/95 backdrop-blur-sm border-r border-border/80 flex-col lg:h-screen overflow-y-auto lg:sticky lg:top-0"
 >
 {/* Fixed Header - Project Name */}
 <div className="p-4 sm:p-4 border-b border-border flex-shrink-0">
 <label className="block text-xs font-medium tracking-wider sm:text-sm text-muted-foreground mb-2">Project Name:</label>
 <Input
 value={projectName}
 onChange={(e) => {
 // Convert to lowercase and remove invalid characters
 const value = e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '');
 setProjectName(value);
 }}
 className="bg-background border-border text-foreground text-sm"
 placeholder="my-tech-genie-app"
 />
 <p className="text-xs font-medium tracking-wider text-muted-foreground mt-1">Only lowercase letters, numbers, hyphens, and underscores</p>
 </div>

 {/* Scrollable Content */}
 <div className="flex-1 overflow-y-auto">
 <div className="flex flex-col">

 {/* AI-Powered Section */}
 <div className="p-4 sm:p-4 border-b border-border flex-shrink-0">
 <div className="flex items-center gap-2 mb-4">
 <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
 <label className="text-xs font-medium tracking-wider sm:text-sm text-muted-foreground font-medium">AI Assistant</label>
 </div>

 <div className="space-y-2 sm:space-y-3">
 <div>
 <Input
 value={projectDescription}
 onChange={(e) => setProjectDescription(e.target.value)}
 className="bg-background border-border text-foreground text-xs font-medium tracking-wider sm:text-sm"
 placeholder="Describe your project..."
 />
 </div>

 <div className="grid grid-cols-1 gap-2">
 <Button
 variant="outline"
 size="sm"
 onClick={generateAIStack}
 disabled={isAnalyzing || !projectDescription.trim()}
 className="bg-primary border-0 text-foreground hover:bg-primary/90 disabled:opacity-50 text-xs font-medium tracking-wider"
 >
 {isAnalyzing ? (
 <>
 <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin mr-1" />
 Generating...
 </>
 ) : (
 <>
 <Brain className="w-3 h-3 mr-1" />
 Generate AI Stack
 </>
 )}
 </Button>

 <Button
 variant="outline"
 size="sm"
 onClick={analyzeStackWithAI}
 disabled={isAnalyzing || !projectDescription.trim()}
 className="bg-background border-primary/40 text-primary hover:bg-primary/15 disabled:opacity-50 text-xs font-medium tracking-wider"
 >
 {isAnalyzing ? (
 <>
 <div className="w-3 h-3 border border-primary/60 border-t-transparent rounded-full animate-spin mr-1" />
 Analyzing...
 </>
 ) : (
 <>
 <Zap className="w-3 h-3 mr-1" />
 Analyze Current Stack
 </>
 )}
 </Button>
 </div>
 </div>
 </div>

 {/* AI Recommendations Panel */}
 {showAiPanel && aiAnalysis && (
 <div className="p-4 sm:p-4 border-b border-border flex-shrink-0">
 <div className="flex items-center justify-between mb-4">
 <div className="flex items-center gap-2">
 <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
 <label className="text-xs font-medium tracking-wider sm:text-sm text-muted-foreground font-medium">AI Analysis</label>
 </div>
 <Button
 variant="ghost"
 size="sm"
 onClick={() => setShowAiPanel(false)}
 className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
 >
 <X className="w-3 h-3" />
 </Button>
 </div>

 <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-64 overflow-y-auto">
 {/* Project Analysis */}
 <div className="bg-background rounded-md border border-border shadow-xs p-4">
 <div className="text-xs font-medium tracking-wider text-primary font-medium mb-1">Project Type</div>
 <div className="text-xs font-medium tracking-wider text-foreground">{aiAnalysis.projectType}</div>
 <div className="text-xs font-medium tracking-wider text-muted-foreground mt-1">
 Complexity: <span className={`font-medium ${aiAnalysis.complexity === 'Simple' ? 'text-success' :
 aiAnalysis.complexity === 'Moderate' ? 'text-warning' : 'text-destructive'
 }`}>{aiAnalysis.complexity}</span>
 </div>
 </div>

 {/* Recommendations */}
 {aiAnalysis.recommendations.length > 0 && (
 <div>
 <div className="text-xs font-medium tracking-wider text-success font-medium mb-2">Recommendations</div>
 <div className="space-y-2">
 {aiAnalysis.recommendations.slice(0, 3).map((rec, index) => (
 <div key={index} className="bg-background rounded-md border border-border shadow-xs p-2">
 <div className="flex items-center justify-between mb-1">
 <div className="flex items-center gap-2">
 <TechIcon
 src={rec.technology.icon || ""}
 alt={rec.technology.name}
 width={12}
 height={12}
 className="rounded"
 />
 <span className="text-xs font-medium tracking-wider text-foreground font-medium">{rec.technology.name}</span>
 </div>
 <Button
 variant="ghost"
 size="sm"
 onClick={() => applyAIRecommendation(rec)}
 className="h-5 w-5 p-0 text-success hover:text-success"
 >
 <Plus className="w-3 h-3" />
 </Button>
 </div>
 <div className="text-xs font-medium tracking-wider text-muted-foreground">{rec.reason}</div>
 <div className="text-xs font-medium tracking-wider text-primary mt-1">
 Confidence: {rec.confidence}%
 </div>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Warnings */}
 {aiAnalysis.warnings.length > 0 && (
 <div>
 <div className="text-xs font-medium tracking-wider text-warning font-medium mb-2">Warnings</div>
 <div className="space-y-1">
 {aiAnalysis.warnings.slice(0, 2).map((warning, index) => (
 <div key={index} className="bg-warning/15 border border-warning/40 rounded-md shadow-xs p-2">
 <div className="text-xs font-medium tracking-wider text-foreground">{warning}</div>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Suggestions */}
 {aiAnalysis.suggestions.length > 0 && (
 <div>
 <div className="text-xs font-medium tracking-wider text-primary font-medium mb-2">Suggestions</div>
 <div className="space-y-1">
 {aiAnalysis.suggestions.slice(0, 2).map((suggestion, index) => (
 <div key={index} className="bg-primary/15 border border-primary/40 rounded-md shadow-xs p-2">
 <div className="text-xs font-medium tracking-wider text-foreground">{suggestion}</div>
 </div>
 ))}
 </div>
 </div>
 )}
 </div>
 </div>
 )}

 {/* Action Buttons */}
 <div className="p-4 sm:p-4 border-b border-border flex-shrink-0">
 <div className="grid grid-cols-2 gap-2">
 <Button
 variant="outline"
 size="sm"
 onClick={clearStack}
 className="bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground"
 >
 <RotateCcw className="w-4 h-4 mr-1" />
 Reset
 </Button>
 <Button
 variant="outline"
 size="sm"
 onClick={generateRandomStack}
 className="bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground"
 >
 <Shuffle className="w-4 h-4 mr-1" />
 Random
 </Button>
 <Button
 variant="outline"
 size="sm"
 onClick={() => setShowPopularStacks(true)}
 className="bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground"
 >
 <Sparkles className="w-4 h-4 mr-1" />
 Templates
 </Button>
 <Button
 variant="outline"
 size="sm"
 onClick={() => {
 if (getTotalSelected() === 0) return;
 const stackText = Object.entries(selectedStack)
 .filter(([_, techs]) => techs.length > 0)
 .map(([category, techs]) =>
 `**${category}:**\n${techs.map(tech => `- ${tech.name}`).join('\n')}`
 )
 .join('\n\n');
 navigator.clipboard.writeText(`# My Tech Stack\n\n${stackText}`);
 toast({
 title: "Stack exported!",
 description: "Your tech stack has been copied to clipboard as Markdown.",
 });
 }}
 disabled={getTotalSelected() === 0}
 className="bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
 >
 <Save className="w-4 h-4 mr-1" />
 Save
 </Button>
 <Button
 variant="outline"
 size="sm"
 onClick={() => {
 if (getTotalSelected() === 0) return;
 const stackData = Object.entries(selectedStack).reduce((acc, [category, techs]) => {
 acc[category] = techs.map(tech => tech.id);
 return acc;
 }, {} as Record<string, string[]>);
 const encodedStack = btoa(JSON.stringify(stackData));
 const shareUrl = `${window.location.origin}${window.location.pathname}?stack=${encodedStack}`;
 
 // Try to copy to clipboard with fallback
 if (navigator.clipboard && navigator.clipboard.writeText) {
 navigator.clipboard.writeText(shareUrl);
 toast({
 title: "Share link copied!",
 description: "Share this URL to let others see your tech stack.",
 });
 } else {
 // Fallback for browsers without clipboard API
 const textArea = document.createElement('textarea');
 textArea.value = shareUrl;
 document.body.appendChild(textArea);
 textArea.select();
 document.execCommand('copy');
 document.body.removeChild(textArea);
 toast({
 title: "Share link copied!",
 description: "Share this URL to let others see your tech stack.",
 });
 }
 }}
 disabled={getTotalSelected() === 0}
 className="bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
 >
 <Share className="w-4 h-4 mr-1" />
 Share
 </Button>
 </div>
 </div>

 {/* Command Generator */}
 <div className="p-4 sm:p-4 border-b border-border flex-shrink-0">
 <div className="flex items-center justify-between mb-2">
 <label className="block text-xs font-medium tracking-wider sm:text-sm text-muted-foreground">Generated Command:</label>
 <Button
 variant="ghost"
 size="sm"
 onClick={async () => {
 const smartCommand = await generateSmartCommand(selectedStack, projectName, projectDescription);
 if (smartCommand !== command) {
 toast({
 title: "AI Enhanced Command!",
 description: "Command optimized with AI suggestions.",
 });
 }
 }}
 disabled={!command || !projectDescription.trim()}
 className="h-6 text-xs font-medium tracking-wider text-primary hover:text-primary-foreground disabled:opacity-50"
 >
 <Sparkles className="w-3 h-3 mr-1" />
 AI Enhance
 </Button>
 </div>
 <div className="flex gap-2">
 <div className="flex-1 relative">
 <textarea
 ref={commandTextareaRef}
 value={command}
 readOnly
 className="w-full bg-background border border-border text-foreground text-sm font-mono tracking-tight rounded-md px-3 py-2 resize-none overflow-hidden transition-all duration-200"
 placeholder="Select technologies to generate command..."
 style={{
 minHeight: '40px',
 height: 'auto'
 }}
 />
 </div>
 <Button
 variant="outline"
 size="sm"
 onClick={copyCommand}
 disabled={!command}
 className="bg-background border-border text-foreground hover:bg-accent text-accent-foreground disabled:opacity-50 self-start"
 >
 <Copy className="w-4 h-4" />
 </Button>
 </div>
 </div>

 {/* Selected Stack */}
 <div className="p-4 sm:p-4 border-b border-border flex-shrink-0">
 <div className="flex items-center justify-between mb-2">
 <label className="text-xs font-medium tracking-wider sm:text-sm text-muted-foreground">Selected Stack ({getTotalSelected()})</label>
 {getTotalSelected() > 0 && (
 <div className="flex items-center gap-1 text-xs font-medium tracking-wider">
 {aiAnalysis && (
 <div className={`px-2 py-1 rounded-md border border-border shadow-xs text-xs font-medium tracking-wider font-medium ${aiAnalysis.complexity === 'Simple' ? 'bg-success/30 text-success' :
 aiAnalysis.complexity === 'Moderate' ? 'bg-warning/20 text-warning' :
 'bg-destructive/20 text-destructive'
 }`}>
 {aiAnalysis.complexity}
 </div>
 )}
 </div>
 )}
 </div>
 <div className="h-32 overflow-y-auto">
 <div className="space-y-1">
 {Object.entries(selectedStack).map(([category, techs]) => (
 <div key={category}>
 <div className="text-xs font-medium tracking-wider text-muted-foreground font-medium mb-1">{category}</div>
 {techs.map((tech) => (
 <div key={tech.id} className="flex items-center justify-between bg-background rounded-md border border-border shadow-xs px-2 py-1 mb-1">
 <div className="flex items-center gap-2">
 <TechIcon
 src={tech.icon}
 alt={tech.name}
 width={16}
 height={16}
 className="rounded"
 />
 <span className="text-sm text-foreground">{tech.name}</span>
 </div>
 <Button
 variant="ghost"
 size="sm"
 onClick={() => toggleTechnology(tech)}
 className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground hover:bg-accent text-accent-foreground"
 >
 <X className="w-3 h-3" />
 </Button>
 </div>
 ))}
 </div>
 ))}
 {getTotalSelected() === 0 && (
 <div className="text-sm text-muted-foreground text-center py-4">
 No technologies selected
 </div>
 )}
 </div>
 </div>
 </div>

 {/* Quick Presets */}
 <div className="p-4 sm:p-4 flex-shrink-0">
 <label className="block text-xs font-medium tracking-wider sm:text-sm text-muted-foreground mb-2">Quick Presets:</label>
 <div className="space-y-1">
 <Button
 variant="outline"
 size="sm"
 onClick={() => applyPreset('default')}
 className="w-full justify-start bg-card border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-colors text-xs font-medium tracking-wider font-medium"
 >
 Default Stack
 </Button>
 <Button
 variant="outline"
 size="sm"
 onClick={() => applyPreset('convex-react')}
 className="w-full justify-start bg-card border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-colors text-xs font-medium tracking-wider font-medium"
 >
 Convex + React
 </Button>
 <Button
 variant="outline"
 size="sm"
 onClick={() => applyPreset('mobile')}
 className="w-full justify-start bg-card border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-colors text-xs font-medium tracking-wider font-medium"
 >
 Mobile App
 </Button>
 <Button
 variant="outline"
 size="sm"
 onClick={() => applyPreset('api-only')}
 className="w-full justify-start bg-card border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-colors text-xs font-medium tracking-wider font-medium"
 >
 API Only
 </Button>
 <Button
 variant="outline"
 size="sm"
 onClick={() => applyPreset('full-featured')}
 className="w-full justify-start bg-card border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-colors text-xs font-medium tracking-wider font-medium"
 >
 Full Featured
 </Button>
 <Button
 variant="outline"
 size="sm"
 onClick={() => applyPreset('saas-pro')}
 className="w-full justify-start bg-card border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-colors text-xs font-medium tracking-wider font-medium"
 >
 SaaS Pro
 </Button>
 <Button
 variant="outline"
 size="sm"
 onClick={() => applyPreset('ai-product')}
 className="w-full justify-start bg-card border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-colors text-xs font-medium tracking-wider font-medium"
 >
 AI Product
 </Button>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Main Content */}
 <div className="flex-1 flex flex-col w-full lg:h-screen overflow-hidden">
 {/* Header */}
 <div className="p-6 lg:p-8 border-b border-border flex-shrink-0">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-4 mb-4 sm:mb-4">
 <div className="flex-1 min-w-0">
 <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground flex items-center gap-2 font-display tracking-tight font-semibold">
 <span className="truncate">Tech Genie Stack Builder</span>
 <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary flex-shrink-0" />
 </h1>
 <p className="text-xs font-medium tracking-wider sm:text-sm text-muted-foreground mt-1">Build your perfect tech stack with AI-powered recommendations</p>
 </div>
 <div className="flex items-center gap-2">
 <ThemeToggle />
 <Button
 variant="outline"
 size="sm"
 onClick={() => setShowAiPanel(!showAiPanel)}
 className="bg-primary border-0 text-foreground hover:bg-primary/90 text-xs font-medium tracking-wider sm:text-sm"
 >
 <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
 <span className="hidden sm:inline">AI Assistant</span>
 <span className="sm:hidden">AI</span>
 </Button>
 </div>
 </div>

 {/* Search */}
 <div className="relative">
 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 h-3 sm:w-4 sm:h-4" />
 <Input
 placeholder="Search technologies..."
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 className="pl-8 sm:pl-10 bg-card border-border text-foreground placeholder-gray-400 text-sm"
 />
 </div>
 </div>

 {/* Technology Grid */}
 <div className="flex-1 overflow-y-auto">
 <div className="p-6 lg:p-8">
 <AnimatePresence>
 {categories.map((category) => {
 const categoryTechs = getTechnologiesByCategory(category);
 if (categoryTechs.length === 0) return null;
 const isExpanded = expandedCategories.has(category);

 return (
 <motion.div
 key={category}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -20 }}
 className="mb-8"
 >
 <button
 onClick={() => toggleCategory(category)}
 className="flex items-center justify-between w-full mb-4 text-left"
 >
 <h2 className="text-xl font-semibold text-foreground font-display tracking-tight font-semibold">{category}</h2>
 <div className="flex items-center gap-2">
 <Badge variant="secondary" className="bg-accent text-accent-foreground text-foreground">
 {categoryTechs.length}
 </Badge>
 <ChevronDown
 className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''
 }`}
 />
 </div>
 </button>

 <AnimatePresence>
 {isExpanded && (
 <motion.div
 initial={{ opacity: 0, height: 0 }}
 animate={{ opacity: 1, height: "auto" }}
 exit={{ opacity: 0, height: 0 }}
 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-4"
 >
 {categoryTechs.map((tech) => {
 const isSelected = isTechnologySelected(tech);
 return (
 <motion.div
 key={tech.id}
 layout
 whileHover={{ scale: 1.02 }}
 whileTap={{ scale: 0.98 }}
 >
 <Card
 className={`cursor-pointer transition-all duration-200 ${isSelected
 ? 'bg-primary/20 border-blue-500 ring-1 ring-blue-500/50'
 : 'bg-card border-border hover:border-input/50 hover:bg-accent text-accent-foreground'
 }`}
 onClick={() => toggleTechnology(tech)}
 >
 <CardContent className="p-4 sm:p-4">
 <div className="flex items-start justify-between mb-2 sm:mb-4">
 <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
 <TechIcon
 src={tech.icon}
 alt={tech.name}
 width={28}
 height={28}
 className="rounded-md border border-border shadow-xs flex-shrink-0"
 />
 <div className="flex-1 min-w-0">
 <div className="flex items-center gap-1 sm:gap-2 mb-1 flex-wrap">
 <h3 className="font-semibold text-foreground text-xs font-medium tracking-wider sm:text-sm truncate">{tech.name}</h3>
 {aiRecommendations.some(rec => rec.technology.id === tech.id) && (
 <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
 <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
 <span className="text-[10px] sm:text-xs font-medium tracking-wider text-primary font-medium">AI Pick</span>
 </div>
 )}
 </div>
 {/* AI Compatibility Indicator */}
 {Object.values(selectedStack).flat().length > 0 && (
 <div className="flex items-center gap-0.5 sm:gap-1">
 {(() => {
 const selectedTechs = Object.values(selectedStack).flat();
 const hasCompatibleFramework = selectedTechs.some(selected => {
 // Simple compatibility logic
 if (tech.category === "CSS Framework" && selected.category === "Web Framework") return true;
 if (tech.category === "Database" && (selected.category === "Backend Framework" || selected.category === "Web Framework")) return true;
 if (tech.category === "ORM" && selected.category === "Database") return true;
 if (tech.category === "Authentication" && selected.category === "Web Framework") return true;
 if (tech.category === "State Management" && selected.category === "Web Framework") return true;
 return false;
 });

 if (hasCompatibleFramework) {
 return (
 <>
 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full flex-shrink-0"></div>
 <span className="text-[10px] sm:text-xs font-medium tracking-wider text-success">Compatible</span>
 </>
 );
 }
 return null;
 })()}
 </div>
 )}
 </div>
 </div>
 {isSelected && (
 <motion.div
 initial={{ scale: 0 }}
 animate={{ scale: 1 }}
 className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0"
 >
 <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-foreground rotate-45" />
 </motion.div>
 )}
 </div>
 <p className="text-muted-foreground text-xs sm:text-xs font-medium tracking-wider leading-relaxed mb-2 line-clamp-2">
 {tech.description}
 </p>

 {/* AI Recommendation Reason */}
 {(() => {
 const recommendation = aiRecommendations.find(rec => rec.technology.id === tech.id);
 if (recommendation) {
 return (
 <div className="bg-primary/15 border border-primary/35 rounded-md shadow-xs p-1.5 sm:p-2 mt-2">
 <div className="flex items-center gap-1 mb-1">
 <Brain className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
 <span className="text-[10px] sm:text-xs font-medium tracking-wider text-primary font-medium">AI Insight</span>
 </div>
 <p className="text-[10px] sm:text-xs font-medium tracking-wider text-foreground/85 line-clamp-2">{recommendation.reason}</p>
 <div className="text-[10px] sm:text-xs font-medium tracking-wider text-primary mt-1">
 Confidence: {recommendation.confidence}%
 </div>
 </div>
 );
 }
 return null;
 })()}
 </CardContent>
 </Card>
 </motion.div>
 );
 })}
 </motion.div>
 )}
 </AnimatePresence>
 </motion.div>
 );
 })}
 </AnimatePresence>
 </div>
 </div>
 </div>

 {/* Popular Stacks Modal */}
 {showPopularStacks && (
 <div className="fixed inset-0 bg-black/65 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
 <div className="bg-background border border-border rounded-lg max-w-4xl w-full max-h-[90vh] sm:max-h-[80vh] overflow-y-auto">
 <div className="p-4 sm:p-6 border-b border-border sticky top-0 bg-background z-10">
 <div className="flex items-start sm:items-center justify-between gap-4">
 <div className="flex-1 min-w-0">
 <h2 className="text-base sm:text-lg lg:text-xl font-bold text-foreground flex items-center gap-2 font-display tracking-tight font-semibold">
 <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
 <span className="truncate">Popular Stack Templates</span>
 </h2>
 <p className="text-muted-foreground text-xs font-medium tracking-wider sm:text-sm mt-1">Choose from curated tech stacks for common use cases</p>
 </div>
 <div className="flex items-center gap-2">
 <Button
 variant="outline"
 size="sm"
 onClick={generateTemplateStack}
 className="bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground"
 >
 <Shuffle className="w-4 h-4 mr-1" />
 Generate
 </Button>
 <Button
 variant="ghost"
 size="sm"
 onClick={() => setShowPopularStacks(false)}
 className="text-muted-foreground hover:text-foreground flex-shrink-0"
 >
 <X className="w-4 h-4 sm:w-5 sm:h-5" />
 </Button>
 </div>
 </div>
 </div>
 <div className="p-4 sm:p-6">
 <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 mb-4">
 <Input
 placeholder="Search templates..."
 value={templateSearchTerm}
 onChange={(e) => setTemplateSearchTerm(e.target.value)}
 className="bg-card border-border text-foreground"
 />
 <select
 value={templateUseCaseFilter}
 onChange={(e) => setTemplateUseCaseFilter(e.target.value)}
 className="h-9 rounded-md border border-border bg-card px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
 >
 {templateUseCases.map((useCase) => (
 <option key={useCase} value={useCase}>{useCase}</option>
 ))}
 </select>
 <select
 value={templateInfraFilter}
 onChange={(e) => setTemplateInfraFilter(e.target.value)}
 className="h-9 rounded-md border border-border bg-card px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
 >
 {['All', 'Minimal', 'Standard', 'Production'].map((infra) => (
 <option key={infra} value={infra}>{infra}</option>
 ))}
 </select>
 <select
 value={templateAiFilter}
 onChange={(e) => setTemplateAiFilter(e.target.value)}
 className="h-9 rounded-md border border-border bg-card px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
 >
 {['All', 'AI Ready', 'Non-AI'].map((ai) => (
 <option key={ai} value={ai}>{ai}</option>
 ))}
 </select>
 </div>
 <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
 <span>{filteredPopularStacks.length} templates</span>
 <span>Research-backed for SaaS, B2B, AI, and realtime products</span>
 </div>
 {invalidTemplateCount > 0 && (
 <div className="mb-4 rounded-md border border-warning/40 bg-warning/10 px-3 py-2 text-xs text-warning">
 {invalidTemplateCount} template{invalidTemplateCount > 1 ? 's' : ''} have recommendation gaps. They still load, but generation prioritizes requirement-complete combinations.
 </div>
 )}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-4">
 {filteredPopularStacks.map((stack) => (
 <Card
 key={stack.id}
 className="bg-card border-border hover:border-input/50 cursor-pointer transition-all duration-200 hover:bg-accent text-accent-foreground"
 onClick={() => loadPopularStack(stack)}
 >
 <CardContent className="p-4 sm:p-4">
 <div className="flex items-center justify-between gap-2 mb-2">
 <h3 className="font-semibold text-foreground text-sm sm:text-base">{stack.name}</h3>
 <div className="flex items-center gap-1">
 <Badge variant="secondary" className="text-[10px]">{stack.useCase}</Badge>
 <Badge variant="secondary" className="text-[10px]">{stack.infra}</Badge>
 {stack.aiReady && <Badge variant="secondary" className="text-[10px]">AI Ready</Badge>}
 {(() => {
 const issues = templateIssuesById.get(stack.id);
 if (!issues) return null;
 if (issues.missingIds.length === 0 && issues.missingRequirements.length === 0) {
 return <Badge variant="secondary" className="text-[10px]">Validated</Badge>;
 }
 return <Badge variant="secondary" className="text-[10px]">Needs review</Badge>;
 })()}
 </div>
 </div>
 <p className="text-muted-foreground text-xs font-medium tracking-wider sm:text-sm mb-4">{stack.description}</p>
 <div className="flex flex-wrap gap-1.5 sm:gap-2">
 {stack.techIds.slice(0, 6).map(techId => {
 const tech = technologyData.find(t => t.id === techId);
 if (!tech) return null;
 return (
 <div key={techId} className="flex items-center gap-1 bg-accent text-accent-foreground rounded-md border border-border shadow-xs px-1.5 sm:px-2 py-1">
 <TechIcon
 src={tech.icon}
 alt={tech.name}
 width={14}
 height={14}
 className="rounded"
 />
 <span className="text-xs font-medium tracking-wider text-foreground hidden sm:inline">{tech.name}</span>
 </div>
 );
 })}
 {stack.techIds.length > 6 && (
 <div className="flex items-center justify-center bg-accent text-accent-foreground rounded-md border border-border shadow-xs px-2 py-1">
 <span className="text-xs font-medium tracking-wider text-muted-foreground">+{stack.techIds.length - 6} more</span>
 </div>
 )}
 </div>
 </CardContent>
 </Card>
 ))}
 </div>
 </div>
 </div>
 </div>
 )}
 </div>
 );
}