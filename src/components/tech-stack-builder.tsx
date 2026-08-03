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
import { ChevronDown, Search, X, Plus, RotateCcw, Shuffle, Save, Share, Copy, Sparkles, Brain, Zap, MessageSquare, Scale, LayoutGrid, Layers, FileCode, ArrowRight, FilterX } from "lucide-react";
import { technologyData, categories } from "@/data/technologies";
import { Technology, TechStack, AIRecommendation, AIAnalysis } from "@/types/tech-stack";
import { generateCommand, generateSmartCommand } from "@/utils/commandGenerator";
import { useTechStack } from "@/hooks/useTechStack";
import { callAI } from "@/utils/ai";
import { ThemeToggle } from "@/components/theme-toggle";
import { logger } from "@/lib/logger";
import { TechCard } from "./tech-stack/tech-card";
import { CategorySection } from "./tech-stack/category-section";
import { SelectedStackSidebar } from "./tech-stack/selected-stack-sidebar";
import { ArchitectureFlowView } from "./tech-stack/architecture-flow-view";
import { TechComparatorModal } from "./tech-stack/tech-comparator-modal";
const FallbackIcon = ({ name, size = 32 }: { name: string; size?: number }) => (
  <div
    className="bg-muted rounded-md border border-border shadow-xs flex items-center justify-center text-foreground font-bold"
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
  height?: number;
  className?: string;
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  const iconHeight = height || width;

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  useEffect(() => {
    if (imgRef.current?.complete) {
      if (imgRef.current.naturalWidth === 0 && imgRef.current.naturalHeight === 0) {
        setHasError(true);
      } else {
        setIsLoading(false);
      }
    }
  }, [src]);

  if (!src || hasError) {
    return <FallbackIcon name={alt} size={width} />;
  }

  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: `${width}px`, height: `${iconHeight}px` }}>
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded" />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="eager"
        decoding="async"
        referrerPolicy="no-referrer"
        className={`${className || ''} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
        style={{ width: `${width}px`, height: `${iconHeight}px`, objectFit: "contain" }}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoading(false)}
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
  const [activeView, setActiveView] = useState<'grid' | 'architecture'>('grid');
  const [isComparatorOpen, setIsComparatorOpen] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");
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
    },
    {
      id: "ai-rag-stack",
      name: "AI RAG Stack",
      description: "Vercel AI SDK + LangChain + Postgres + pgvector + OpenAI",
      useCase: "AI",
      infra: "Production",
      aiReady: true,
      techIds: ["nextjs", "vercel-ai-sdk", "langchain", "openai", "postgresql", "pgvector", "pinecone", "tailwind", "docker", "vercel"]
    },
    {
      id: "edge-first-stack",
      name: "Edge-First Stack",
      description: "Hono + Cloudflare Workers + D1 + R2 + edge deploy",
      useCase: "API",
      infra: "Standard",
      aiReady: true,
      techIds: ["hono", "cloudflare-workers", "cloudflare-r2", "turso", "zod", "cloudflare-pages", "github-actions"]
    },
    {
      id: "realtime-crdt-collab",
      name: "Realtime CRDT Collab",
      description: "Next.js + Yjs + Liveblocks + Postgres + Redis",
      useCase: "Realtime",
      infra: "Production",
      aiReady: true,
      techIds: ["nextjs", "yjs", "liveblocks", "postgresql", "redis", "tailwind", "zustand", "vercel"]
    },
    {
      id: "serverless-baas-stack",
      name: "Serverless BaaS",
      description: "Next.js + Supabase + Edge functions + Vercel",
      useCase: "SaaS",
      infra: "Standard",
      aiReady: true,
      techIds: ["nextjs", "supabase", "supabase-auth", "vercel-edge", "tailwind", "shadcn", "zod", "vercel"]
    },
    {
      id: "analytics-warehouse",
      name: "Analytics Warehouse",
      description: "ClickHouse + Kafka + Redis + Grafana + Docker",
      useCase: "Enterprise",
      infra: "Production",
      aiReady: false,
      techIds: ["clickhouse", "apache-kafka", "redis", "grafana", "prometheus", "docker", "kubernetes", "aws"]
    },
    {
      id: "native-desktop-stack",
      name: "Native Desktop",
      description: "Tauri + Svelte + Rust + SQLite",
      useCase: "DevTools",
      infra: "Minimal",
      aiReady: false,
      techIds: ["tauri", "svelte", "rust", "sqlite", "typescript", "vite", "github-actions"]
    },
    {
      id: "micro-saas-indie",
      name: "Micro-SaaS Indie",
      description: "Next.js + Stripe + Lemon Squeezy + PostHog + Resend",
      useCase: "SaaS",
      infra: "Minimal",
      aiReady: true,
      techIds: ["nextjs", "tailwind", "shadcn", "stripe", "lemon-squeezy", "posthog", "resend", "sqlite", "vercel"]
    },
    {
      id: "devops-platform-stack",
      name: "DevOps Platform",
      description: "Kubernetes + Terraform + Prometheus + Grafana + CI",
      useCase: "Enterprise",
      infra: "Production",
      aiReady: false,
      techIds: ["kubernetes", "terraform", "docker", "prometheus", "grafana", "github-actions", "aws", "sentry", "postgresql"]
    },
    {
      id: "feature-flag-saas",
      name: "Feature-Flag SaaS",
      description: "Next.js + LaunchDarkly + Postgres + Stripe + analytics",
      useCase: "SaaS",
      infra: "Production",
      aiReady: true,
      techIds: ["nextjs", "launchdarkly", "postgresql", "prisma", "stripe", "posthog", "sentry", "vercel"]
    },
    {
      id: "background-jobs-platform",
      name: "Background Jobs Platform",
      description: "Next.js + Inngest + Postgres + Redis + monitoring",
      useCase: "SaaS",
      infra: "Production",
      aiReady: true,
      techIds: ["nextjs", "inngest", "postgresql", "redis", "tailwind", "sentry", "docker", "vercel"]
    },
    {
      id: "web3-dapp-stack",
      name: "Web3 DApp Stack",
      description: "Next.js + Wagmi + Viem + Solidity + IPFS",
      useCase: "SaaS",
      infra: "Standard",
      aiReady: true,
      techIds: ["nextjs", "wagmi", "viem", "solidity", "hardhat", "ipfs", "tailwind", "postgresql", "vercel"]
    },
    {
      id: "data-warehouse-stack",
      name: "Data Warehouse Stack",
      description: "ClickHouse + dbt + Airflow + Metabase + Kafka",
      useCase: "Enterprise",
      infra: "Production",
      aiReady: false,
      techIds: ["clickhouse", "dbt", "airflow", "metabase", "apache-kafka", "docker", "kubernetes", "aws", "grafana"]
    },
    {
      id: "api-gateway-stack",
      name: "API Gateway Stack",
      description: "Kong + Traefik + Envoy + Postgres + monitoring",
      useCase: "API",
      infra: "Production",
      aiReady: false,
      techIds: ["kong", "traefik", "envoy", "nginx", "express", "postgresql", "docker", "kubernetes", "prometheus", "grafana"]
    },
    {
      id: "security-hardened-stack",
      name: "Security-Hardened Stack",
      description: "Next.js + Snyk + Vault + Trivy + Sentry",
      useCase: "Enterprise",
      infra: "Production",
      aiReady: true,
      techIds: ["nextjs", "snyk", "trivy", "vault", "sentry", "github-actions", "docker", "aws", "postgresql"]
    },
    {
      id: "docs-platform-stack",
      name: "Docs Platform Stack",
      description: "Docusaurus + VitePress + Algolia + analytics",
      useCase: "Content",
      infra: "Minimal",
      aiReady: false,
      techIds: ["docusaurus", "vitepress", "astro", "algolia", "plausible", "netlify"]
    },
    {
      id: "baas-stack",
      name: "BaaS Stack",
      description: "Next.js + Appwrite + PocketBase + Directus",
      useCase: "SaaS",
      infra: "Standard",
      aiReady: true,
      techIds: ["nextjs", "appwrite", "pocketbase", "directus", "tailwind", "shadcn", "sqlite", "vercel"]
    },
    {
      id: "workflow-automation-stack",
      name: "Workflow Automation Stack",
      description: "Next.js + n8n + Windmill + Postgres + Redis",
      useCase: "SaaS",
      infra: "Standard",
      aiReady: true,
      techIds: ["nextjs", "n8n", "windmill", "postgresql", "redis", "docker", "vercel"]
    },
    {
      id: "data-viz-stack",
      name: "Data Visualization Stack",
      description: "React + D3 + ECharts + Chart.js + Recharts",
      useCase: "DevTools",
      infra: "Minimal",
      aiReady: true,
      techIds: ["react", "d3", "echarts", "chartjs", "recharts", "vite", "tailwind", "vitest", "github-actions"]
    },
    {
      id: "video-streaming-stack",
      name: "Video Streaming Stack",
      description: "Next.js + Mux + Cloudflare Stream + Twilio",
      useCase: "Content",
      infra: "Production",
      aiReady: true,
      techIds: ["nextjs", "mux", "cloudflare-stream", "twilio", "postgresql", "sanity", "tailwind", "vercel"]
    },
    {
      id: "mlops-stack",
      name: "MLOps Stack",
      description: "Python + MLflow + Ray + Weights & Biases + Postgres",
      useCase: "AI",
      infra: "Production",
      aiReady: true,
      techIds: ["python", "mlflow", "ray", "weights-biases", "fastapi", "postgresql", "docker", "kubernetes", "aws"]
    },
    {
      id: "ai-agent-stack",
      name: "AI Agent Stack",
      description: "Next.js + LangGraph + CrewAI + OpenAI + Postgres",
      useCase: "AI",
      infra: "Production",
      aiReady: true,
      techIds: ["nextjs", "langgraph", "crewai", "openai", "postgresql", "redis", "docker", "vercel"]
    },
    {
      id: "3d-web-stack",
      name: "3D Web Stack",
      description: "React + Three.js + React Three Fiber + WebSockets",
      useCase: "DevTools",
      infra: "Standard",
      aiReady: true,
      techIds: ["react", "threejs", "react-three-fiber", "babylonjs", "socketio", "vite", "tailwind", "vitest", "github-actions"]
    },
    {
      id: "maps-geo-stack",
      name: "Maps & Geo Stack",
      description: "Next.js + Mapbox + Leaflet + Postgres + Redis",
      useCase: "SaaS",
      infra: "Standard",
      aiReady: true,
      techIds: ["nextjs", "mapbox", "leaflet", "maplibre", "postgresql", "redis", "tailwind", "vercel"]
    },
    {
      id: "push-notification-stack",
      name: "Push Notification Stack",
      description: "Next.js + OneSignal + Firebase Messaging + Postgres",
      useCase: "SaaS",
      infra: "Standard",
      aiReady: true,
      techIds: ["nextjs", "onesignal", "firebase-messaging", "postgresql", "tailwind", "vercel"]
    },
    {
      id: "voice-ai-stack",
      name: "Voice AI Stack",
      description: "Next.js + Whisper + ElevenLabs + OpenAI + Postgres",
      useCase: "AI",
      infra: "Production",
      aiReady: true,
      techIds: ["nextjs", "whisper", "elevenlabs", "openai", "postgresql", "docker", "vercel"]
    },
    {
      id: "performance-stack",
      name: "Performance Stack",
      description: "Next.js + Lighthouse + Web Vitals + BundlePhobia",
      useCase: "DevTools",
      infra: "Minimal",
      aiReady: true,
      techIds: ["nextjs", "lighthouse", "web-vitals", "bundlephobia", "tailwind", "vercel"]
    },
    {
      id: "accessibility-stack",
      name: "Accessibility Stack",
      description: "Next.js + axe-core + Pa11y + Playwright + CI",
      useCase: "DevTools",
      infra: "Standard",
      aiReady: true,
      techIds: ["nextjs", "axe-core", "pa11y", "playwright", "github-actions", "vercel"]
    },
    {
      id: "i18n-stack",
      name: "i18n Stack",
      description: "Next.js + next-intl + i18next + Postgres + analytics",
      useCase: "SaaS",
      infra: "Standard",
      aiReady: true,
      techIds: ["nextjs", "next-intl", "i18next", "react-i18next", "postgresql", "tailwind", "vercel"]
    },
    {
      id: "observability-stack",
      name: "Observability Stack",
      description: "Next.js + OpenTelemetry + Prometheus + Grafana + Loki",
      useCase: "Enterprise",
      infra: "Production",
      aiReady: true,
      techIds: ["nextjs", "opentelemetry", "prometheus", "grafana", "grafana-loki", "postgresql", "docker", "kubernetes", "aws"]
    },
    {
      id: "iot-stack",
      name: "IoT Stack",
      description: "Node.js + MQTT + ESP32 + InfluxDB + Grafana",
      useCase: "Enterprise",
      infra: "Production",
      aiReady: false,
      techIds: ["nodejs", "mqtt", "esp32", "arduino", "influxdb", "grafana", "docker", "aws"]
    }
  ],
    []);

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

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showPopularStacks) {
        setShowPopularStacks(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showPopularStacks]);

  const hasActiveTemplateFilters = useMemo(() => {
    return (
      templateSearchTerm.trim() !== "" ||
      templateUseCaseFilter !== "All" ||
      templateInfraFilter !== "All" ||
      templateAiFilter !== "All"
    );
  }, [templateSearchTerm, templateUseCaseFilter, templateInfraFilter, templateAiFilter]);

  const resetTemplateFilters = useCallback(() => {
    setTemplateSearchTerm("");
    setTemplateUseCaseFilter("All");
    setTemplateInfraFilter("All");
    setTemplateAiFilter("All");
  }, []);

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
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 p-1 flex items-center justify-center shrink-0">
            <img src="/logo.svg" alt="Tech Genie Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-lg font-bold text-foreground font-display tracking-tight">Tech Genie</h1>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const sidebar = document.getElementById('mobile-sidebar');
            const overlay = document.getElementById('sidebar-overlay');
            if (sidebar) sidebar.classList.toggle('sidebar-open');
            if (overlay) overlay.classList.toggle('active');
          }}
          className="bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        id="sidebar-overlay"
        className="sidebar-overlay lg:hidden"
        onClick={() => {
          const sidebar = document.getElementById('mobile-sidebar');
          const overlay = document.getElementById('sidebar-overlay');
          if (sidebar) sidebar.classList.remove('sidebar-open');
          if (overlay) overlay.classList.remove('active');
        }}
      />

      {/* Sidebar */}
      <div
        id="mobile-sidebar"
        className="hidden lg:flex w-full lg:w-80 xl:w-96 bg-[#080808] border-r border-[#212121] flex-col lg:h-screen overflow-y-auto lg:sticky lg:top-0"
      >
        {/* Sidebar Brand Header */}
        <div className="p-6 flex items-center gap-4 flex-shrink-0 border-b border-[#212121]">
          <div className="w-9 h-9 rounded-md bg-[#101010] border border-[#212121] p-1.5 flex items-center justify-center shrink-0">
            <img src="/logo.svg" alt="Tech Genie Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="font-normal text-[18px] text-[#f3f3f3] tracking-tight font-sans">Tech Genie</h2>
            <p className="text-[10px] font-mono text-[#9c9c9c] uppercase tracking-widest">AI Stack Architect</p>
          </div>
        </div>

        {/* Fixed Header - Project Name */}
        <div className="px-6 py-6 flex-shrink-0 border-b border-[#212121]">
          <label className="block text-[11px] font-mono uppercase tracking-widest text-[#9c9c9c] mb-2.5">Project Details</label>
          <Input
            value={projectName}
            onChange={(e) => {
              // Convert to lowercase and remove invalid characters
              const value = e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '');
              setProjectName(value);
            }}
            className="bg-[#101010] border border-[#212121] text-[#f3f3f3] text-xs font-mono rounded-md focus-visible:ring-0 focus-visible:border-[#6f6759]"
            placeholder="my-tech-genie-app"
          />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col">

            {/* AI-Powered Section */}
            <div className="px-6 py-6 border-b border-[#212121] flex-shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#6f6759]" />
                <label className="text-[11px] font-mono uppercase tracking-widest text-[#9c9c9c]">AI Assistant</label>
              </div>

              <div className="space-y-3">
                <div>
                  <Input
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="bg-[#101010] border border-[#212121] text-[#f3f3f3] text-xs font-sans rounded-md focus-visible:ring-0 focus-visible:border-[#6f6759]"
                    placeholder="Describe your project goals..."
                  />
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={generateAIStack}
                    disabled={isAnalyzing || !projectDescription.trim()}
                    className="w-full bg-[#ffffff] text-[#101010] hover:bg-[#f3f3f3] rounded-full text-xs font-normal uppercase tracking-wider disabled:opacity-40"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-3 h-3 border-2 border-[#101010] border-t-transparent rounded-full animate-spin mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Brain className="w-3.5 h-3.5 mr-2 text-[#101010]" />
                        Generate AI Stack
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={analyzeStackWithAI}
                    disabled={isAnalyzing || !projectDescription.trim()}
                    className="w-full bg-transparent border border-[#212121] hover:border-[#474747] text-[#f3f3f3] hover:bg-[#121212] disabled:opacity-40 text-xs font-normal uppercase tracking-wider"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-3 h-3 border-2 border-[#f3f3f3] border-t-transparent rounded-full animate-spin mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5 mr-2 text-[#6f6759]" />
                        Analyze Current Stack
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* AI Recommendations Panel */}
            {showAiPanel && aiAnalysis && (
              <div className="px-6 py-6 border-b border-[#212121] flex-shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-[#6f6759]" />
                    <label className="text-[11px] font-mono uppercase tracking-widest text-[#9c9c9c]">AI Analysis</label>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAiPanel(false)}
                    className="h-6 w-6 p-0 text-[#9c9c9c] hover:text-[#f3f3f3]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </Button>
                </div>

                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {/* Project Analysis */}
                  <div className="bg-[#121212] border border-[#212121] rounded-md p-3">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#6f6759] mb-1">Project Type</div>
                    <div className="text-xs font-normal text-[#f3f3f3]">{aiAnalysis.projectType}</div>
                    <div className="text-xs text-[#9c9c9c] mt-1.5 flex items-center justify-between font-mono">
                      <span>Complexity:</span>
                      <span className="px-2 py-0.5 rounded-[4px] bg-[#1a1a1a] border border-[#212121] text-[10px] text-[#98ff38]">
                        {aiAnalysis.complexity}
                      </span>
                    </div>
                  </div>

                  {/* Recommendations */}
                  {aiAnalysis.recommendations.length > 0 && (
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#98ff38] mb-2">Recommended Tech</div>
                      <div className="space-y-2">
                        {aiAnalysis.recommendations.slice(0, 3).map((rec, index) => (
                          <div key={index} className="bg-[#121212] border border-[#212121] rounded-md p-2.5 hover:border-[#474747] transition-colors">
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-2">
                                <TechIcon
                                  src={rec.technology.icon || ""}
                                  alt={rec.technology.name}
                                  width={14}
                                  height={14}
                                  className="rounded-sm"
                                />
                                <span className="text-xs font-normal text-[#f3f3f3]">{rec.technology.name}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => applyAIRecommendation(rec)}
                                className="h-5 px-2 text-[10px] font-mono uppercase tracking-widest text-[#98ff38] hover:bg-[#1a1a1a]"
                              >
                                <Plus className="w-3 h-3 mr-1" /> Add
                              </Button>
                            </div>
                            <div className="text-[11px] text-[#9c9c9c] leading-snug">{rec.reason}</div>
                            <div className="text-[10px] font-mono text-[#6f6759] mt-1.5">
                              Confidence {rec.confidence}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="px-6 py-6 border-b border-[#212121] flex-shrink-0">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearStack}
                  className="bg-transparent border border-[#212121] hover:border-[#474747] text-[#f3f3f3] text-xs font-normal uppercase tracking-wider"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5 text-[#6f6759]" />
                  Reset
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generateRandomStack}
                  className="bg-transparent border border-[#212121] hover:border-[#474747] text-[#f3f3f3] text-xs font-normal uppercase tracking-wider"
                >
                  <Shuffle className="w-3.5 h-3.5 mr-1.5 text-[#6f6759]" />
                  Random
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPopularStacks(true)}
                  className="bg-transparent border border-[#212121] hover:border-[#474747] text-[#f3f3f3] text-xs font-normal uppercase tracking-wider"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#6f6759]" />
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
                  className="bg-transparent border border-[#212121] hover:border-[#474747] text-[#f3f3f3] text-xs font-normal uppercase tracking-wider disabled:opacity-30"
                >
                  <Save className="w-3.5 h-3.5 mr-1.5 text-[#6f6759]" />
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

                    if (navigator.clipboard && navigator.clipboard.writeText) {
                      navigator.clipboard.writeText(shareUrl);
                      toast({
                        title: "Share link copied!",
                        description: "Share this URL to let others see your tech stack.",
                      });
                    } else {
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
                  className="bg-transparent border border-[#212121] hover:border-[#474747] text-[#f3f3f3] text-xs font-normal uppercase tracking-wider disabled:opacity-30"
                >
                  <Share className="w-3.5 h-3.5 mr-1.5 text-[#6f6759]" />
                  Share
                </Button>
              </div>
            </div>

            {/* Command Generator */}
            <div className="px-6 py-6 border-b border-[#212121] flex-shrink-0">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-[11px] font-mono uppercase tracking-widest text-[#9c9c9c]">Generated Command</label>
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
                  className="h-5 px-2 text-[10px] font-mono tracking-widest uppercase text-[#98ff38] hover:bg-[#1a1a1a] disabled:opacity-30"
                >
                  <Sparkles className="w-3 h-3 mr-1 text-[#6f6759]" />
                  AI Enhance
                </Button>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <textarea
                    ref={commandTextareaRef}
                    value={command}
                    readOnly
                    className="w-full bg-[#101010] border border-[#212121] text-[#f3f3f3] text-xs font-mono rounded-md px-3 py-2 resize-none overflow-hidden focus-visible:ring-0 focus-visible:border-[#6f6759] transition-all duration-200"
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
                  className="bg-transparent border border-[#212121] hover:border-[#474747] text-[#f3f3f3] disabled:opacity-30 self-start shrink-0 h-10 w-10 p-0 flex items-center justify-center"
                >
                  <Copy className="w-4 h-4 text-[#6f6759]" />
                </Button>
              </div>
            </div>

            {/* Selected Stack */}
            <SelectedStackSidebar
              selectedStack={selectedStack}
              getTotalSelected={getTotalSelected}
              aiAnalysis={aiAnalysis}
              toggleTechnology={toggleTechnology}
              techIconRenderer={TechIcon}
            />

            {/* Quick Presets */}
            <div className="px-6 py-6 border-b border-[#212121] flex-shrink-0">
              <label className="block text-[11px] font-mono uppercase tracking-widest text-[#9c9c9c] mb-3">Quick Presets</label>
              <div className="space-y-1">
                {['default', 'convex-react', 'mobile', 'api-only', 'full-featured', 'saas-pro', 'ai-product'].map((preset) => (
                  <Button
                    key={preset}
                    variant="ghost"
                    size="sm"
                    onClick={() => applyPreset(preset)}
                    className="w-full justify-start text-[#9c9c9c] hover:text-[#f3f3f3] hover:bg-[#121212] transition-colors text-xs font-mono uppercase tracking-wider"
                  >
                    {preset.replace('-', ' ')}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full lg:h-screen overflow-hidden bg-[#101010]">
        {/* Header */}
        <div className="p-6 lg:p-8 border-b border-[#212121] flex-shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-normal text-[#f3f3f3] flex items-center gap-3 font-sans tracking-tight">
                <div className="w-8 h-8 rounded-md bg-[#121212] border border-[#212121] p-1 flex items-center justify-center shrink-0">
                  <img src="/logo.svg" alt="Tech Genie Logo" className="w-full h-full object-contain" />
                </div>
                <span className="truncate">Tech Genie Stack Builder</span>
                <Sparkles className="w-4 h-4 text-[#6f6759] flex-shrink-0" />
              </h1>
              <p className="text-xs font-normal text-[#9c9c9c] mt-1">Build your perfect tech stack with AI-powered recommendations</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsComparatorOpen(true)}
                className="bg-transparent border border-[#212121] hover:border-[#474747] text-[#f3f3f3] text-xs font-normal uppercase tracking-wider"
              >
                <Scale className="w-3.5 h-3.5 mr-1 text-[#6f6759]" />
                <span className="hidden sm:inline">Compare</span>
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => setShowAiPanel(!showAiPanel)}
                className="bg-[#ffffff] text-[#101010] hover:bg-[#f3f3f3] rounded-full text-xs font-normal uppercase tracking-wider"
              >
                <MessageSquare className="w-3.5 h-3.5 mr-1 text-[#101010]" />
                <span className="hidden sm:inline">AI Assistant</span>
                <span className="sm:hidden">AI</span>
              </Button>
            </div>
          </div>

          {/* Controls Bar: Search & View Switcher */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#9c9c9c] w-4 h-4" />
              <Input
                placeholder="Search technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-9 bg-[#121212] border border-[#212121] text-[#f3f3f3] placeholder:text-[#9c9c9c] text-xs focus-visible:ring-0 focus-visible:border-[#6f6759]"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-[#9c9c9c] hover:text-[#f3f3f3] transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* View Switcher Pills */}
            <div className="flex items-center gap-1 bg-[#121212] p-1 rounded-md border border-[#212121] w-full sm:w-auto shrink-0">
              <button
                onClick={() => setActiveView('grid')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1 rounded-[4px] text-xs font-mono uppercase tracking-wider transition-all ${
                  activeView === 'grid'
                    ? "bg-[#ffffff] text-[#101010]"
                    : "text-[#9c9c9c] hover:text-[#f3f3f3]"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Grid
              </button>
              <button
                onClick={() => setActiveView('architecture')}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1 rounded-[4px] text-xs font-mono uppercase tracking-wider transition-all ${
                  activeView === 'architecture'
                    ? "bg-[#ffffff] text-[#101010]"
                    : "text-[#9c9c9c] hover:text-[#f3f3f3]"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Topology Map
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8">
            {activeView === 'architecture' ? (
              <ArchitectureFlowView selectedStack={selectedStack} techIconRenderer={TechIcon} />
            ) : (
              <AnimatePresence>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                {categories.map((category) => {
                  const categoryTechs = getTechnologiesByCategory(category);
                  if (categoryTechs.length === 0) return null;
                  const isExpanded = expandedCategories.has(category);

                  return (
                    <CategorySection
                      key={category}
                      category={category}
                      categoryTechs={categoryTechs}
                      isExpanded={isExpanded}
                      toggleCategory={toggleCategory}
                      isTechnologySelected={isTechnologySelected}
                      toggleTechnology={toggleTechnology}
                      aiRecommendations={aiRecommendations}
                      selectedStack={selectedStack}
                      techIconRenderer={TechIcon}
                    />
                  );
                })}
              </motion.div>
            </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      {/* Popular Stacks Modal */}
      {showPopularStacks && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-5 transition-opacity animate-fade-in"
          onClick={() => setShowPopularStacks(false)}
        >
          <div 
            className="bg-background border border-border/80 rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-border/60 bg-background/95 backdrop-blur-md sticky top-0 z-20 flex-shrink-0">
              <div className="flex items-start sm:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2.5 font-display tracking-tight">
                    <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="truncate">Popular Stack Templates</span>
                  </h2>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-1 font-medium">Choose from curated tech stacks for common use cases</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateTemplateStack}
                    className="bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground text-xs font-semibold"
                  >
                    <Shuffle className="w-3.5 h-3.5 mr-1.5" />
                    Blend Random
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPopularStacks(false)}
                    className="h-8 w-8 p-0 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent flex-shrink-0"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
              {/* Filter Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search templates..."
                    value={templateSearchTerm}
                    onChange={(e) => setTemplateSearchTerm(e.target.value)}
                    className="pl-9 pr-8 bg-card border-border text-foreground text-xs sm:text-sm focus-visible:ring-1 focus-visible:ring-primary/50"
                  />
                  {templateSearchTerm && (
                    <button
                      onClick={() => setTemplateSearchTerm('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <select
                  value={templateUseCaseFilter}
                  onChange={(e) => setTemplateUseCaseFilter(e.target.value)}
                  className="themed-select h-9 rounded-md border border-border bg-card px-3 text-xs sm:text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 cursor-pointer"
                >
                  {templateUseCases.map((useCase) => (
                    <option key={useCase} value={useCase}>Use Case: {useCase}</option>
                  ))}
                </select>
                <select
                  value={templateInfraFilter}
                  onChange={(e) => setTemplateInfraFilter(e.target.value)}
                  className="themed-select h-9 rounded-md border border-border bg-card px-3 text-xs sm:text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 cursor-pointer"
                >
                  {['All', 'Minimal', 'Standard', 'Production'].map((infra) => (
                    <option key={infra} value={infra}>Infra: {infra}</option>
                  ))}
                </select>
                <select
                  value={templateAiFilter}
                  onChange={(e) => setTemplateAiFilter(e.target.value)}
                  className="themed-select h-9 rounded-md border border-border bg-card px-3 text-xs sm:text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 cursor-pointer"
                >
                  {['All', 'AI Ready', 'Non-AI'].map((ai) => (
                    <option key={ai} value={ai}>AI Capability: {ai}</option>
                  ))}
                </select>
              </div>

              {/* Status & Active Filter Reset Bar */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 pb-1">
                <span className="font-medium text-foreground">{filteredPopularStacks.length} templates available</span>
                {hasActiveTemplateFilters && (
                  <button
                    onClick={resetTemplateFilters}
                    className="flex items-center gap-1 text-xs text-primary hover:underline font-semibold transition-colors"
                  >
                    <FilterX className="w-3.5 h-3.5" />
                    Reset Filters
                  </button>
                )}
              </div>

              {invalidTemplateCount > 0 && (
                <div className="rounded-lg border border-warning/40 bg-warning/10 px-3.5 py-2.5 text-xs text-warning flex items-center gap-2">
                  <Brain className="w-4 h-4 shrink-0" />
                  <span>{invalidTemplateCount} template{invalidTemplateCount > 1 ? 's' : ''} have minor coverage recommendations. They load fully, and random generation optimizes completeness.</span>
                </div>
              )}

              {/* Empty State */}
              {filteredPopularStacks.length === 0 && (
                <div className="text-center py-12 px-4 rounded-xl border border-dashed border-border/70 bg-card/40 my-4">
                  <FilterX className="w-9 h-9 text-muted-foreground/40 mx-auto mb-3" />
                  <h3 className="text-sm font-bold text-foreground mb-1">No templates match your filters</h3>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto mb-4">Try clearing your search query or adjusting filter dropdowns.</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetTemplateFilters}
                    className="text-xs font-semibold bg-background"
                  >
                    Reset All Filters
                  </Button>
                </div>
              )}

              {/* Template Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredPopularStacks.map((stack) => (
                  <Card
                    key={stack.id}
                    className="group bg-card border-border hover:border-primary/40 cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden"
                    onClick={() => loadPopularStack(stack)}
                  >
                    <CardContent className="p-4 sm:p-5 flex flex-col justify-between h-full">
                      <div>
                        {/* Title & Badges */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                          <h3 className="font-bold text-foreground text-sm sm:text-base group-hover:text-primary transition-colors font-display tracking-tight">
                            {stack.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                            <Badge className="text-[10px] bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 border font-semibold">
                              {stack.useCase}
                            </Badge>
                            <Badge variant="secondary" className="text-[10px] bg-secondary/80 text-secondary-foreground font-medium">
                              {stack.infra}
                            </Badge>
                            {stack.aiReady && (
                              <Badge className="text-[10px] bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 border font-medium">
                                AI Ready
                              </Badge>
                            )}
                            {(() => {
                              const issues = templateIssuesById.get(stack.id);
                              if (!issues) return null;
                              if (issues.missingIds.length === 0 && issues.missingRequirements.length === 0) {
                                return (
                                  <Badge className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 border font-medium">
                                    Validated
                                  </Badge>
                                );
                              }
                              return (
                                <Badge className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 border font-medium">
                                  Needs review
                                </Badge>
                              );
                            })()}
                          </div>
                        </div>

                        <p className="text-muted-foreground text-xs leading-relaxed mb-4">{stack.description}</p>
                      </div>

                      {/* Tech Pills & Apply CTA */}
                      <div className="flex items-center justify-between pt-2 border-t border-border/40 gap-2">
                        <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                          {stack.techIds.slice(0, 6).map(techId => {
                            const tech = technologyData.find(t => t.id === techId);
                            if (!tech) return null;
                            return (
                              <div key={techId} className="flex items-center gap-1 bg-accent/60 text-accent-foreground rounded-md border border-border/50 px-1.5 py-0.5 shrink-0">
                                <TechIcon
                                  src={tech.icon}
                                  alt={tech.name}
                                  width={13}
                                  height={13}
                                  className="rounded"
                                />
                                <span className="text-[11px] font-medium text-foreground">{tech.name}</span>
                              </div>
                            );
                          })}
                          {stack.techIds.length > 6 && (
                            <div className="flex items-center justify-center bg-accent/40 rounded-md border border-border/50 px-1.5 py-0.5 shrink-0">
                              <span className="text-[10px] font-medium text-muted-foreground">+{stack.techIds.length - 6}</span>
                            </div>
                          )}
                        </div>

                        <div className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shrink-0">
                          <span>Use</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tech Comparator Modal */}
      <TechComparatorModal
        isOpen={isComparatorOpen}
        onClose={() => setIsComparatorOpen(false)}
        allTechnologies={technologyData}
        techIconRenderer={TechIcon}
      />
    </div>
  );
}