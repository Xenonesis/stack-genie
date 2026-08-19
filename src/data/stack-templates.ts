import { StackTemplate } from "@/types/tech-stack";

export const useCaseRequirementGroups: Record<string, string[][]> = {
  "SaaS": [
    [
      "Database"
    ],
    [
      "Web Framework",
      "Backend Framework"
    ],
    [
      "Hosting",
      "DevOps/Infrastructure"
    ]
  ],
  "AI": [
    [
      "Database"
    ],
    [
      "Backend Framework",
      "Web Framework"
    ],
    [
      "Hosting",
      "DevOps/Infrastructure"
    ]
  ],
  "API": [
    [
      "Database"
    ],
    [
      "Backend Framework",
      "GraphQL/API",
      "API Documentation"
    ]
  ],
  "Enterprise": [
    [
      "Database"
    ],
    [
      "Monitoring/Observability"
    ],
    [
      "Hosting",
      "DevOps/Infrastructure"
    ]
  ],
  "Realtime": [
    [
      "Database"
    ],
    [
      "Real-time",
      "Message Queues/Event Streaming"
    ]
  ],
  "Content": [
    [
      "Web Framework"
    ],
    [
      "CMS",
      "Search"
    ]
  ],
  "Mobile": [
    [
      "Native Framework",
      "Web Framework"
    ],
    [
      "Database"
    ]
  ],
  "E-commerce": [
    [
      "Web Framework"
    ],
    [
      "Payment"
    ],
    [
      "Database",
      "CMS"
    ]
  ],
  "DevTools": [
    [
      "Web Framework",
      "Build Tools",
      "Backend Framework"
    ],
    [
      "DevOps/Infrastructure",
      "Testing",
      "Hosting"
    ]
  ]
};

export const popularStackTemplates: StackTemplate[] = [
  {
    "id": "modern-full-stack",
    "name": "Modern Full-Stack",
    "description": "Next.js + TypeScript + Tailwind + Prisma + PostgreSQL",
    "useCase": "SaaS",
    "infra": "Standard",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "typescript",
      "tailwind",
      "shadcn",
      "prisma",
      "postgresql",
      "nextauth",
      "zod",
      "stripe",
      "vercel"
    ]
  },
  {
    "id": "ecommerce-store",
    "name": "E-commerce Store",
    "description": "Next.js + Stripe + CMS + Analytics",
    "useCase": "E-commerce",
    "infra": "Standard",
    "aiReady": false,
    "techIds": [
      "nextjs",
      "tailwind",
      "shadcn",
      "stripe",
      "sanity",
      "posthog",
      "zod",
      "nextauth",
      "vercel"
    ]
  },
  {
    "id": "realtime-chat-app",
    "name": "Real-time Chat App",
    "description": "React + Socket.io + MongoDB + Authentication",
    "useCase": "Realtime",
    "infra": "Standard",
    "aiReady": true,
    "techIds": [
      "react",
      "socketio",
      "mongodb",
      "mongoose",
      "nextauth",
      "tailwind",
      "zustand",
      "vite"
    ]
  },
  {
    "id": "saas-starter",
    "name": "SaaS Starter",
    "description": "Next.js + Supabase + Stripe + Email + Analytics",
    "useCase": "SaaS",
    "infra": "Standard",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "supabase",
      "stripe",
      "resend",
      "posthog",
      "tailwind",
      "shadcn",
      "zod",
      "lucia",
      "vercel"
    ]
  },
  {
    "id": "content-site",
    "name": "Content Site",
    "description": "Astro + CMS + Search + Analytics",
    "useCase": "Content",
    "infra": "Minimal",
    "aiReady": false,
    "techIds": [
      "astro",
      "sanity",
      "algolia",
      "tailwind",
      "plausible",
      "cloudinary"
    ]
  },
  {
    "id": "mobile-app",
    "name": "Mobile App",
    "description": "React Native + Expo + Supabase + Stripe",
    "useCase": "Mobile",
    "infra": "Standard",
    "aiReady": true,
    "techIds": [
      "reactnative",
      "expo",
      "supabase",
      "stripe",
      "zustand"
    ]
  },
  {
    "id": "ai-saas-copilot",
    "name": "AI SaaS Copilot",
    "description": "Next.js + FastAPI + PostgreSQL + Redis + vector-ready infra",
    "useCase": "AI",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "tailwind",
      "shadcn",
      "fastify",
      "postgresql",
      "redis",
      "docker",
      "kubernetes",
      "sentry",
      "aws"
    ]
  },
  {
    "id": "api-platform-typesafe",
    "name": "Type-Safe API Platform",
    "description": "Hono + tRPC + Zod + PostgreSQL + Drizzle",
    "useCase": "API",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "hono",
      "trpc",
      "zod",
      "postgresql",
      "drizzle",
      "bun",
      "docker",
      "github-actions",
      "swagger"
    ]
  },
  {
    "id": "nextjs-enterprise-saas",
    "name": "Enterprise SaaS",
    "description": "Next.js + Clerk + Stripe + Postgres + observability",
    "useCase": "Enterprise",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "typescript",
      "tailwind",
      "clerk",
      "stripe",
      "postgresql",
      "prisma",
      "sentry",
      "datadog",
      "vercel"
    ]
  },
  {
    "id": "realtime-collaboration-suite",
    "name": "Realtime Collaboration",
    "description": "React + PartyKit + Postgres + Redis + edge deploy",
    "useCase": "Realtime",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "react",
      "partykit",
      "postgresql",
      "redis",
      "tailwind",
      "zustand",
      "cloudflare-pages",
      "docker"
    ]
  },
  {
    "id": "ai-rag-dashboard",
    "name": "AI RAG Dashboard",
    "description": "Next.js + Fastify + Postgres + Elasticsearch + monitoring",
    "useCase": "AI",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "typescript",
      "tailwind",
      "fastify",
      "postgresql",
      "elasticsearch",
      "docker",
      "prometheus",
      "grafana",
      "aws"
    ]
  },
  {
    "id": "lean-startup-stack",
    "name": "Lean Startup",
    "description": "Vite + React + Supabase + Resend + Vercel",
    "useCase": "SaaS",
    "infra": "Minimal",
    "aiReady": true,
    "techIds": [
      "vite",
      "react",
      "tailwind",
      "supabase",
      "supabase-auth",
      "resend",
      "posthog",
      "vercel"
    ]
  },
  {
    "id": "microservice-core-platform",
    "name": "Microservice Core",
    "description": "NestJS + Kafka + PostgreSQL + Redis + K8s",
    "useCase": "Enterprise",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "nestjs",
      "postgresql",
      "redis",
      "apache-kafka",
      "docker",
      "kubernetes",
      "terraform",
      "prometheus",
      "grafana"
    ]
  },
  {
    "id": "content-commerce-hybrid",
    "name": "Content + Commerce",
    "description": "Next.js + Payload + Stripe + Search + CDN",
    "useCase": "E-commerce",
    "infra": "Standard",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "tailwind",
      "payload",
      "stripe",
      "typesense",
      "cloudinary",
      "posthog",
      "vercel"
    ]
  },
  {
    "id": "developer-tooling-webapp",
    "name": "Developer Tooling",
    "description": "React + Hono + Turborepo + Docker + CI",
    "useCase": "DevTools",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "react",
      "hono",
      "typescript",
      "turborepo",
      "pnpm",
      "postgresql",
      "drizzle",
      "docker",
      "github-actions"
    ]
  },
  {
    "id": "python-api-starter",
    "name": "Python API Starter",
    "description": "FastAPI style stack with Postgres and Redis",
    "useCase": "API",
    "infra": "Standard",
    "aiReady": true,
    "techIds": [
      "python",
      "flask",
      "postgresql",
      "redis",
      "docker",
      "github-actions",
      "swagger"
    ]
  },
  {
    "id": "nextjs-supabase-billing",
    "name": "Supabase Billing SaaS",
    "description": "Next.js + Supabase + Stripe + PostHog + Resend",
    "useCase": "SaaS",
    "infra": "Standard",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "tailwind",
      "shadcn",
      "supabase",
      "supabase-auth",
      "stripe",
      "posthog",
      "resend",
      "vercel"
    ]
  },
  {
    "id": "cms-editorial-platform",
    "name": "Editorial Platform",
    "description": "Astro + Sanity + Algolia + Plausible + CDN",
    "useCase": "Content",
    "infra": "Standard",
    "aiReady": false,
    "techIds": [
      "astro",
      "sanity",
      "algolia",
      "plausible",
      "cloudinary",
      "netlify"
    ]
  },
  {
    "id": "b2b-admin-suite",
    "name": "B2B Admin Suite",
    "description": "Next.js + Clerk + Postgres + Sentry + Datadog",
    "useCase": "SaaS",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "typescript",
      "tailwind",
      "clerk",
      "postgresql",
      "prisma",
      "sentry",
      "datadog",
      "aws"
    ]
  },
  {
    "id": "realtime-support-platform",
    "name": "Realtime Support Platform",
    "description": "React + Ably + Hono + Redis + analytics",
    "useCase": "Realtime",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "react",
      "ably",
      "hono",
      "redis",
      "postgresql",
      "tailwind",
      "posthog",
      "docker",
      "render"
    ]
  },
  {
    "id": "graphql-enterprise-stack",
    "name": "GraphQL Enterprise",
    "description": "Apollo + Yoga + Postgres + Redis + observability",
    "useCase": "API",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "react",
      "apollo-graphql",
      "graphql-yoga",
      "graphql-codegen",
      "postgresql",
      "redis",
      "docker",
      "sentry",
      "aws"
    ]
  },
  {
    "id": "edge-api-performance",
    "name": "Edge API Performance",
    "description": "Hono + Bun + Turso + Cloudflare + Zod",
    "useCase": "API",
    "infra": "Standard",
    "aiReady": true,
    "techIds": [
      "hono",
      "bun",
      "turso",
      "zod",
      "cloudflare-pages",
      "github-actions"
    ]
  },
  {
    "id": "full-mobile-platform",
    "name": "Full Mobile Platform",
    "description": "React Native + Expo + Node + Stripe + analytics",
    "useCase": "Mobile",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "reactnative",
      "expo",
      "nodejs",
      "postgresql",
      "stripe",
      "posthog",
      "sentry",
      "aws"
    ]
  },
  {
    "id": "modular-monorepo-stack",
    "name": "Modular Monorepo",
    "description": "Turborepo + Next.js + React Native + shared core",
    "useCase": "DevTools",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "turborepo",
      "nextjs",
      "reactnative",
      "typescript",
      "pnpm",
      "postgresql",
      "drizzle",
      "docker",
      "github-actions"
    ]
  },
  {
    "id": "event-driven-saas",
    "name": "Event-Driven SaaS",
    "description": "NestJS + Bull + Redis + Postgres + observability",
    "useCase": "SaaS",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "nestjs",
      "bull",
      "redis",
      "postgresql",
      "typeorm",
      "docker",
      "kubernetes",
      "prometheus",
      "grafana"
    ]
  },
  {
    "id": "search-heavy-platform",
    "name": "Search-Heavy Platform",
    "description": "Next.js + Meilisearch + PostgreSQL + Cloud storage",
    "useCase": "Content",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "tailwind",
      "meilisearch",
      "postgresql",
      "uploadthing",
      "sentry",
      "render"
    ]
  },
  {
    "id": "serverless-data-product",
    "name": "Serverless Data Product",
    "description": "Next.js + Neon + Drizzle + Vercel Blob + analytics",
    "useCase": "SaaS",
    "infra": "Standard",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "neon",
      "drizzle",
      "vercel-blob",
      "posthog",
      "tailwind",
      "vercel"
    ]
  },
  {
    "id": "payments-api-core",
    "name": "Payments API Core",
    "description": "Express + PostgreSQL + Stripe + auth + monitoring",
    "useCase": "API",
    "infra": "Production",
    "aiReady": false,
    "techIds": [
      "express",
      "postgresql",
      "stripe",
      "passport",
      "zod",
      "docker",
      "sentry",
      "aws"
    ]
  },
  {
    "id": "enterprise-java-platform",
    "name": "Enterprise Java Platform",
    "description": "Spring Boot + PostgreSQL + Kafka + Kubernetes",
    "useCase": "Enterprise",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "java",
      "spring",
      "postgresql",
      "apache-kafka",
      "docker",
      "kubernetes",
      "prometheus",
      "grafana",
      "aws"
    ]
  },
  {
    "id": "docs-and-api-hub",
    "name": "Docs + API Hub",
    "description": "Astro + Express + OpenAPI + search + analytics",
    "useCase": "DevTools",
    "infra": "Standard",
    "aiReady": false,
    "techIds": [
      "astro",
      "express",
      "swagger",
      "algolia",
      "plausible",
      "netlify"
    ]
  },
  {
    "id": "ai-agent-backend-core",
    "name": "AI Agent Backend Core",
    "description": "Fastify + PostgreSQL + Redis + queue + observability",
    "useCase": "AI",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "fastify",
      "postgresql",
      "redis",
      "rabbitmq",
      "docker",
      "kubernetes",
      "sentry",
      "datadog",
      "aws"
    ]
  },
  {
    "id": "frontend-performance-stack",
    "name": "Frontend Performance Stack",
    "description": "Vite + React + Zustand + TanStack Router + tests",
    "useCase": "DevTools",
    "infra": "Minimal",
    "aiReady": true,
    "techIds": [
      "vite",
      "react",
      "tanstack-router",
      "zustand",
      "tailwind",
      "vitest",
      "playwright",
      "cloudflare-pages"
    ]
  },
  {
    "id": "security-first-platform",
    "name": "Security-First Platform",
    "description": "Next.js + Better Auth + PostgreSQL + Sentry + CI",
    "useCase": "Enterprise",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "better-auth",
      "postgresql",
      "prisma",
      "sentry",
      "github-actions",
      "docker",
      "aws"
    ]
  },
  {
    "id": "ai-rag-stack",
    "name": "AI RAG Stack",
    "description": "Vercel AI SDK + LangChain + Postgres + pgvector + OpenAI",
    "useCase": "AI",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "vercel-ai-sdk",
      "langchain",
      "openai",
      "postgresql",
      "pgvector",
      "pinecone",
      "tailwind",
      "docker",
      "vercel"
    ]
  },
  {
    "id": "edge-first-stack",
    "name": "Edge-First Stack",
    "description": "Hono + Cloudflare Workers + D1 + R2 + edge deploy",
    "useCase": "API",
    "infra": "Standard",
    "aiReady": true,
    "techIds": [
      "hono",
      "cloudflare-workers",
      "cloudflare-r2",
      "turso",
      "zod",
      "cloudflare-pages",
      "github-actions"
    ]
  },
  {
    "id": "realtime-crdt-collab",
    "name": "Realtime CRDT Collab",
    "description": "Next.js + Yjs + Liveblocks + Postgres + Redis",
    "useCase": "Realtime",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "yjs",
      "liveblocks",
      "postgresql",
      "redis",
      "tailwind",
      "zustand",
      "vercel"
    ]
  },
  {
    "id": "serverless-baas-stack",
    "name": "Serverless BaaS",
    "description": "Next.js + Supabase + Edge functions + Vercel",
    "useCase": "SaaS",
    "infra": "Standard",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "supabase",
      "supabase-auth",
      "vercel-edge",
      "tailwind",
      "shadcn",
      "zod",
      "vercel"
    ]
  },
  {
    "id": "analytics-warehouse",
    "name": "Analytics Warehouse",
    "description": "ClickHouse + Kafka + Redis + Grafana + Docker",
    "useCase": "Enterprise",
    "infra": "Production",
    "aiReady": false,
    "techIds": [
      "clickhouse",
      "apache-kafka",
      "redis",
      "grafana",
      "prometheus",
      "docker",
      "kubernetes",
      "aws"
    ]
  },
  {
    "id": "native-desktop-stack",
    "name": "Native Desktop",
    "description": "Tauri + Svelte + Rust + SQLite",
    "useCase": "DevTools",
    "infra": "Minimal",
    "aiReady": false,
    "techIds": [
      "tauri",
      "svelte",
      "rust",
      "sqlite",
      "typescript",
      "vite",
      "github-actions"
    ]
  },
  {
    "id": "micro-saas-indie",
    "name": "Micro-SaaS Indie",
    "description": "Next.js + Stripe + Lemon Squeezy + PostHog + Resend",
    "useCase": "SaaS",
    "infra": "Minimal",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "tailwind",
      "shadcn",
      "stripe",
      "lemon-squeezy",
      "posthog",
      "resend",
      "sqlite",
      "vercel"
    ]
  },
  {
    "id": "devops-platform-stack",
    "name": "DevOps Platform",
    "description": "Kubernetes + Terraform + Prometheus + Grafana + CI",
    "useCase": "Enterprise",
    "infra": "Production",
    "aiReady": false,
    "techIds": [
      "kubernetes",
      "terraform",
      "docker",
      "prometheus",
      "grafana",
      "github-actions",
      "aws",
      "sentry",
      "postgresql"
    ]
  },
  {
    "id": "feature-flag-saas",
    "name": "Feature-Flag SaaS",
    "description": "Next.js + LaunchDarkly + Postgres + Stripe + analytics",
    "useCase": "SaaS",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "launchdarkly",
      "postgresql",
      "prisma",
      "stripe",
      "posthog",
      "sentry",
      "vercel"
    ]
  },
  {
    "id": "background-jobs-platform",
    "name": "Background Jobs Platform",
    "description": "Next.js + Inngest + Postgres + Redis + monitoring",
    "useCase": "SaaS",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "inngest",
      "postgresql",
      "redis",
      "tailwind",
      "sentry",
      "docker",
      "vercel"
    ]
  },
  {
    "id": "web3-dapp-stack",
    "name": "Web3 DApp Stack",
    "description": "Next.js + Wagmi + Viem + Solidity + IPFS",
    "useCase": "SaaS",
    "infra": "Standard",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "wagmi",
      "viem",
      "solidity",
      "hardhat",
      "ipfs",
      "tailwind",
      "postgresql",
      "vercel"
    ]
  },
  {
    "id": "data-warehouse-stack",
    "name": "Data Warehouse Stack",
    "description": "ClickHouse + dbt + Airflow + Metabase + Kafka",
    "useCase": "Enterprise",
    "infra": "Production",
    "aiReady": false,
    "techIds": [
      "clickhouse",
      "dbt",
      "airflow",
      "metabase",
      "apache-kafka",
      "docker",
      "kubernetes",
      "aws",
      "grafana"
    ]
  },
  {
    "id": "api-gateway-stack",
    "name": "API Gateway Stack",
    "description": "Kong + Traefik + Envoy + Postgres + monitoring",
    "useCase": "API",
    "infra": "Production",
    "aiReady": false,
    "techIds": [
      "kong",
      "traefik",
      "envoy",
      "nginx",
      "express",
      "postgresql",
      "docker",
      "kubernetes",
      "prometheus",
      "grafana"
    ]
  },
  {
    "id": "security-hardened-stack",
    "name": "Security-Hardened Stack",
    "description": "Next.js + Snyk + Vault + Trivy + Sentry",
    "useCase": "Enterprise",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "snyk",
      "trivy",
      "vault",
      "sentry",
      "github-actions",
      "docker",
      "aws",
      "postgresql"
    ]
  },
  {
    "id": "docs-platform-stack",
    "name": "Docs Platform Stack",
    "description": "Docusaurus + VitePress + Algolia + analytics",
    "useCase": "Content",
    "infra": "Minimal",
    "aiReady": false,
    "techIds": [
      "docusaurus",
      "vitepress",
      "astro",
      "algolia",
      "plausible",
      "netlify"
    ]
  },
  {
    "id": "baas-stack",
    "name": "BaaS Stack",
    "description": "Next.js + Appwrite + PocketBase + Directus",
    "useCase": "SaaS",
    "infra": "Standard",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "appwrite",
      "pocketbase",
      "directus",
      "tailwind",
      "shadcn",
      "sqlite",
      "vercel"
    ]
  },
  {
    "id": "workflow-automation-stack",
    "name": "Workflow Automation Stack",
    "description": "Next.js + n8n + Windmill + Postgres + Redis",
    "useCase": "SaaS",
    "infra": "Standard",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "n8n",
      "windmill",
      "postgresql",
      "redis",
      "docker",
      "vercel"
    ]
  },
  {
    "id": "data-viz-stack",
    "name": "Data Visualization Stack",
    "description": "React + D3 + ECharts + Chart.js + Recharts",
    "useCase": "DevTools",
    "infra": "Minimal",
    "aiReady": true,
    "techIds": [
      "react",
      "d3",
      "echarts",
      "chartjs",
      "recharts",
      "vite",
      "tailwind",
      "vitest",
      "github-actions"
    ]
  },
  {
    "id": "video-streaming-stack",
    "name": "Video Streaming Stack",
    "description": "Next.js + Mux + Cloudflare Stream + Twilio",
    "useCase": "Content",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "mux",
      "cloudflare-stream",
      "twilio",
      "postgresql",
      "sanity",
      "tailwind",
      "vercel"
    ]
  },
  {
    "id": "mlops-stack",
    "name": "MLOps Stack",
    "description": "Python + MLflow + Ray + Weights & Biases + Postgres",
    "useCase": "AI",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "python",
      "mlflow",
      "ray",
      "weights-biases",
      "fastapi",
      "postgresql",
      "docker",
      "kubernetes",
      "aws"
    ]
  },
  {
    "id": "ai-agent-stack",
    "name": "AI Agent Stack",
    "description": "Next.js + LangGraph + CrewAI + OpenAI + Postgres",
    "useCase": "AI",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "langgraph",
      "crewai",
      "openai",
      "postgresql",
      "redis",
      "docker",
      "vercel"
    ]
  },
  {
    "id": "3d-web-stack",
    "name": "3D Web Stack",
    "description": "React + Three.js + React Three Fiber + WebSockets",
    "useCase": "DevTools",
    "infra": "Standard",
    "aiReady": true,
    "techIds": [
      "react",
      "threejs",
      "react-three-fiber",
      "babylonjs",
      "socketio",
      "vite",
      "tailwind",
      "vitest",
      "github-actions"
    ]
  },
  {
    "id": "maps-geo-stack",
    "name": "Maps & Geo Stack",
    "description": "Next.js + Mapbox + Leaflet + Postgres + Redis",
    "useCase": "SaaS",
    "infra": "Standard",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "mapbox",
      "leaflet",
      "maplibre",
      "postgresql",
      "redis",
      "tailwind",
      "vercel"
    ]
  },
  {
    "id": "push-notification-stack",
    "name": "Push Notification Stack",
    "description": "Next.js + OneSignal + Firebase Messaging + Postgres",
    "useCase": "SaaS",
    "infra": "Standard",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "onesignal",
      "firebase-messaging",
      "postgresql",
      "tailwind",
      "vercel"
    ]
  },
  {
    "id": "voice-ai-stack",
    "name": "Voice AI Stack",
    "description": "Next.js + Whisper + ElevenLabs + OpenAI + Postgres",
    "useCase": "AI",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "whisper",
      "elevenlabs",
      "openai",
      "postgresql",
      "docker",
      "vercel"
    ]
  },
  {
    "id": "performance-stack",
    "name": "Performance Stack",
    "description": "Next.js + Lighthouse + Web Vitals + BundlePhobia",
    "useCase": "DevTools",
    "infra": "Minimal",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "lighthouse",
      "web-vitals",
      "bundlephobia",
      "tailwind",
      "vercel"
    ]
  },
  {
    "id": "accessibility-stack",
    "name": "Accessibility Stack",
    "description": "Next.js + axe-core + Pa11y + Playwright + CI",
    "useCase": "DevTools",
    "infra": "Standard",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "axe-core",
      "pa11y",
      "playwright",
      "github-actions",
      "vercel"
    ]
  },
  {
    "id": "i18n-stack",
    "name": "i18n Stack",
    "description": "Next.js + next-intl + i18next + Postgres + analytics",
    "useCase": "SaaS",
    "infra": "Standard",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "next-intl",
      "i18next",
      "react-i18next",
      "postgresql",
      "tailwind",
      "vercel"
    ]
  },
  {
    "id": "observability-stack",
    "name": "Observability Stack",
    "description": "Next.js + OpenTelemetry + Prometheus + Grafana + Loki",
    "useCase": "Enterprise",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "opentelemetry",
      "prometheus",
      "grafana",
      "grafana-loki",
      "postgresql",
      "docker",
      "kubernetes",
      "aws"
    ]
  },
  {
    "id": "iot-stack",
    "name": "IoT Stack",
    "description": "Node.js + MQTT + ESP32 + InfluxDB + Grafana",
    "useCase": "Enterprise",
    "infra": "Production",
    "aiReady": false,
    "techIds": [
      "nodejs",
      "mqtt",
      "esp32",
      "arduino",
      "influxdb",
      "grafana",
      "docker",
      "aws"
    ]
  },
  {
    "id": "mcp-agentic-server",
    "name": "MCP Agentic Server",
    "description": "Bun + Hono + Model Context Protocol + LangGraph + Qdrant + Better-Auth",
    "useCase": "AI",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "bun",
      "hono",
      "mcp",
      "langgraph",
      "qdrant",
      "better-auth",
      "typescript",
      "postgresql",
      "docker"
    ]
  },
  {
    "id": "local-first-reactive-saas",
    "name": "Local-First Reactive SaaS",
    "description": "React + TanStack Router + Zero + PostgreSQL + Better-Auth + Tailwind",
    "useCase": "SaaS",
    "infra": "Standard",
    "aiReady": true,
    "techIds": [
      "react",
      "tanstack-router",
      "zero-sync",
      "postgresql",
      "better-auth",
      "tailwind",
      "typescript",
      "vercel"
    ]
  },
  {
    "id": "deepseek-reasoning-pipeline",
    "name": "DeepSeek Reasoning Pipeline",
    "description": "Next.js + Fastify + DeepSeek + pgvector + Redis + Docker + Sentry",
    "useCase": "AI",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "fastify",
      "deepseek",
      "pgvector",
      "redis",
      "docker",
      "sentry",
      "typescript",
      "postgresql"
    ]
  },
  {
    "id": "rust-high-perf-api",
    "name": "Rust High-Performance API",
    "description": "Axum + PostgreSQL + Dragonfly + React + Vite + Tailwind",
    "useCase": "API",
    "infra": "Production",
    "aiReady": false,
    "techIds": [
      "axum",
      "postgresql",
      "dragonfly",
      "react",
      "vite",
      "tailwind",
      "docker",
      "swagger"
    ]
  },
  {
    "id": "enterprise-multitenant-saas",
    "name": "Enterprise Multi-Tenant SaaS",
    "description": "Next.js + WorkOS + Stripe + Drizzle + Neon + Arcjet + Datadog",
    "useCase": "Enterprise",
    "infra": "Production",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "workos",
      "stripe",
      "drizzle",
      "neon",
      "arcjet",
      "datadog",
      "typescript",
      "docker"
    ]
  },
  {
    "id": "mobile-cross-platform-pro",
    "name": "Mobile Cross-Platform Pro",
    "description": "React Native + Expo + Tamagui + Supabase + PostHog",
    "useCase": "Mobile",
    "infra": "Standard",
    "aiReady": true,
    "techIds": [
      "reactnative",
      "expo",
      "tamagui",
      "supabase",
      "posthog",
      "typescript",
      "sqlite"
    ]
  },
  {
    "id": "ai-coding-workflow",
    "name": "AI-Accelerated Dev Flow",
    "description": "Next.js + Cursor + v0 + Repomix + Biome + Vercel",
    "useCase": "DevTools",
    "infra": "Standard",
    "aiReady": true,
    "techIds": [
      "nextjs",
      "cursor",
      "v0",
      "repomix",
      "biome",
      "vercel",
      "typescript",
      "docker",
      "vitest"
    ]
  },
  {
    "id": "offline-first-mobile-sync",
    "name": "Offline-First Mobile Sync",
    "description": "Flutter + PowerSync + Supabase + SQLite",
    "useCase": "Mobile",
    "infra": "Standard",
    "aiReady": false,
    "techIds": [
      "flutter",
      "powersync",
      "supabase",
      "sqlite"
    ]
  }
];
