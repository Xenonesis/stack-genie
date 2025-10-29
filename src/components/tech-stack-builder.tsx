"use client";

import { useState, useEffect, useRef } from "react";
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
import { AI_CONFIG, AI_PROVIDERS } from "@/config/ai";

// Fallback icon component
const FallbackIcon = ({ name, size = 32 }: { name: string; size?: number }) => (
    <div
        className="bg-gray-600 rounded flex items-center justify-center text-white font-bold"
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
                <div className="absolute inset-0 bg-gray-700 animate-pulse rounded" />
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







// AI Service Functions
const callAI = async (prompt: string): Promise<string> => {
    // Try multiple AI providers in sequence
    const providers = [
        // Try configured provider first
        {
            name: "Primary AI Service",
            url: AI_CONFIG.url,
            apiKey: AI_CONFIG.apiKey,
            model: AI_CONFIG.model,
            maxTokens: AI_CONFIG.maxTokens,
            type: "openai"
        },
        // Fallback providers from AI_PROVIDERS
        ...AI_PROVIDERS.filter(p => p.url && p.url !== AI_CONFIG.url)
    ];

    for (const provider of providers) {
        // Skip providers without API keys (except fallback)
        if (!provider.apiKey && provider.type !== "fallback") {
            console.log(`Skipping ${provider.name} - no API key available`);
            continue;
        }

        try {
            console.log(`Trying AI provider: ${provider.name} (${provider.url})`);
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000);

            try {
                const requestBody = {
                    model: provider.model,
                    messages: [
                        {
                            role: "system",
                            content: "You are an expert software architect and tech stack consultant. When asked to generate a tech stack, respond ONLY with valid JSON in the exact format requested. Do not include any explanatory text before or after the JSON. Your response must be parseable by JSON.parse()."
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: provider.maxTokens || 4096
                };

                const headers: HeadersInit = {
                    'Content-Type': 'application/json'
                };

                // Add authorization header if API key exists
                if (provider.apiKey && provider.apiKey.trim()) {
                    headers['Authorization'] = `Bearer ${provider.apiKey}`;
                }

                const response = await fetch(`${provider.url}/chat/completions`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(requestBody),
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                console.log(`${provider.name} response status:`, response.status);

                if (response.ok) {
                    const data = await response.json();
                    const content = data.choices?.[0]?.message?.content || data.content;
                    if (content && content.trim()) {
                        console.log(`✅ Successfully got response from ${provider.name}`);
                        return content;
                    }
                } else {
                    const errorText = await response.text();
                    console.log(`❌ ${provider.name} failed with status ${response.status}:`, errorText);
                }
                
            } catch (error) {
                clearTimeout(timeoutId);
                console.log(`❌ ${provider.name} request failed:`, error);
            }
            
        } catch (error) {
            console.log(`❌ Provider ${provider.name} failed:`, error);
            continue;
        }
    }

    // All providers failed, throw error for fallback handling
    console.log('❌ All AI providers failed, using fallback');
    throw new Error('ALL_PROVIDERS_FAILED');
};

export function TechStackBuilderContent() {
    const [selectedStack, setSelectedStack] = useState<TechStack>({});
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(categories));
    const [projectName, setProjectName] = useState("my-tech-genie-app");
    const [projectDescription, setProjectDescription] = useState("");
    const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([]);
    const [showAiPanel, setShowAiPanel] = useState(false);
    const [showPopularStacks, setShowPopularStacks] = useState(false);
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const commandTextareaRef = useRef<HTMLTextAreaElement>(null);

    // Popular stack templates
    const popularStacks = [
        {
            name: "Modern Full-Stack",
            description: "Next.js + TypeScript + Tailwind + Prisma + PostgreSQL",
            techIds: ["nextjs", "typescript", "tailwind", "shadcn", "prisma", "postgresql", "nextauth", "zod", "stripe"]
        },
        {
            name: "E-commerce Store",
            description: "Next.js + Stripe + CMS + Analytics",
            techIds: ["nextjs", "tailwind", "shadcn", "stripe", "sanity", "posthog", "zod", "nextauth", "vercel"]
        },
        {
            name: "Real-time Chat App",
            description: "React + Socket.io + MongoDB + Authentication",
            techIds: ["react", "socketio", "mongodb", "mongoose", "nextauth", "tailwind", "zustand", "vite"]
        },
        {
            name: "SaaS Starter",
            description: "Next.js + Supabase + Stripe + Email + Analytics",
            techIds: ["nextjs", "supabase", "stripe", "resend", "posthog", "tailwind", "shadcn", "zod", "lucia"]
        },
        {
            name: "Content Site",
            description: "Astro + CMS + Search + Analytics",
            techIds: ["astro", "sanity", "algolia", "tailwind", "plausible", "cloudinary"]
        },
        {
            name: "Mobile App",
            description: "React Native + Expo + Supabase + Stripe",
            techIds: ["reactnative", "expo", "supabase", "stripe", "zustand"]
        }
    ];

    const loadPopularStack = (stackTemplate: typeof popularStacks[0]) => {
        const newStack: TechStack = {};
        
        stackTemplate.techIds.forEach(techId => {
            const tech = technologyData.find(t => t.id === techId);
            if (tech) {
                if (!newStack[tech.category]) {
                    newStack[tech.category] = [];
                }
                newStack[tech.category].push(tech);
            }
        });

        setSelectedStack(newStack);
        setProjectName(stackTemplate.name.toLowerCase().replace(/\s+/g, '-'));
        setProjectDescription(stackTemplate.description);
        setShowPopularStacks(false);
        
        toast({
            title: "Stack loaded!",
            description: `${stackTemplate.name} template has been applied.`,
        });
    };

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

                setSelectedStack(newStack);
            } catch (error) {
                console.error('Failed to parse shared stack:', error);
            }
        }
    }, [searchParams]);

    // Auto-resize command textarea when command changes
    useEffect(() => {
        const textarea = commandTextareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.max(40, textarea.scrollHeight) + 'px';
        }
    }, [selectedStack, projectName]); // Re-run when stack or project name changes

    const toggleTechnology = (tech: Technology) => {
        setSelectedStack(prev => {
            const currentCategoryStack = prev[tech.category] || [];
            const isSelected = currentCategoryStack.some(t => t.id === tech.id);

            if (isSelected) {
                const newCategoryStack = currentCategoryStack.filter(t => t.id !== tech.id);
                if (newCategoryStack.length === 0) {
                    const { [tech.category]: _, ...rest } = prev;
                    return rest;
                }
                return { ...prev, [tech.category]: newCategoryStack };
            } else {
                return { ...prev, [tech.category]: [...currentCategoryStack, tech] };
            }
        });
    };

    const isTechnologySelected = (tech: Technology) => {
        return selectedStack[tech.category]?.some(t => t.id === tech.id) || false;
    };

    const getTechnologiesByCategory = (category: string) => {
        return technologyData.filter(tech =>
            tech.category === category &&
            tech.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const getTotalSelected = () => {
        return Object.values(selectedStack).reduce((total, techs) => total + techs.length, 0);
    };

    const toggleCategory = (category: string) => {
        setExpandedCategories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(category)) {
                newSet.delete(category);
            } else {
                newSet.add(category);
            }
            return newSet;
        });
    };

    const clearStack = () => {
        setSelectedStack({});
        toast({
            title: "Stack cleared!",
            description: "All technologies have been removed from your stack.",
        });
    };

    const generateCommand = () => {
        const selectedTechs = Object.values(selectedStack).flat();
        if (selectedTechs.length === 0) return "";

        // Determine package manager
        const packageManagerTech = selectedTechs.find(tech => tech.category === "Package Manager");
        const runtimeTech = selectedTechs.find(tech => tech.category === "Runtime");
        let packageManager = "npm";

        if (packageManagerTech) {
            if (packageManagerTech.id === "bun-pm" || packageManagerTech.id === "bun") packageManager = "bun";
            else if (packageManagerTech.id === "yarn") packageManager = "yarn";
            else if (packageManagerTech.id === "pnpm") packageManager = "pnpm";
        } else if (runtimeTech?.id === "bun") {
            packageManager = "bun";
        }

        // Find primary framework for project creation
        const webFramework: Technology | undefined = selectedTechs.find(tech => tech.category === "Web Framework");
        const nativeFramework = selectedTechs.find(tech => tech.category === "Native Framework");
        const backendFramework = selectedTechs.find(tech => tech.category === "Backend Framework");
        const monorepo = selectedTechs.find(tech => tech.category === "Monorepo");

        // Generate creation command based on primary framework
        let createCommand = "";

        // Handle monorepo first as it affects project structure
        if (monorepo) {
            switch (monorepo.id) {
                case "turborepo":
                    createCommand = `npx create-turbo@latest ${projectName}`;
                    break;
                case "nx":
                    createCommand = `npx create-nx-workspace@latest ${projectName}`;
                    break;
                case "lerna":
                    createCommand = `mkdir ${projectName} && cd ${projectName} && ${packageManager} init -y && npx lerna init`;
                    break;
                case "rush":
                    createCommand = `mkdir ${projectName} && cd ${projectName} && rush init`;
                    break;
                default:
                    createCommand = `npx create-turbo@latest ${projectName}`;
            }
        } else if (webFramework) {
            switch (webFramework.id) {
                case "nextjs":
                    // Use package manager for Next.js if specified
                    if (packageManager === "bun") {
                        createCommand = `bun create next-app ${projectName}`;
                    } else if (packageManager === "yarn") {
                        createCommand = `yarn create next-app ${projectName}`;
                    } else if (packageManager === "pnpm") {
                        createCommand = `pnpm create next-app ${projectName}`;
                    } else {
                        createCommand = `npx create-next-app@latest ${projectName}`;
                    }
                    break;
                case "react":
                    createCommand = `${packageManager} create vite@latest ${projectName} -- --template react-ts`;
                    break;
                case "tanstack-router":
                    createCommand = `${packageManager} create vite@latest ${projectName} -- --template react-ts`;
                    break;
                case "vue":
                    createCommand = `${packageManager} create vue@latest ${projectName}`;
                    break;
                case "nuxt":
                    createCommand = `npx nuxi@latest init ${projectName}`;
                    break;
                case "angular":
                    createCommand = `npx @angular/cli@latest new ${projectName} --routing --style=css`;
                    break;
                case "svelte":
                    createCommand = `${packageManager} create svelte@latest ${projectName}`;
                    break;
                case "sveltekit":
                    createCommand = `${packageManager} create sveltekit@latest ${projectName}`;
                    break;
                case "remix":
                    createCommand = `npx create-remix@latest ${projectName}`;
                    break;
                case "astro":
                    createCommand = `${packageManager} create astro@latest ${projectName}`;
                    break;
                case "solid":
                    createCommand = `npx degit solidjs/templates/ts ${projectName}`;
                    break;
                case "qwik":
                    createCommand = `${packageManager} create qwik@latest ${projectName}`;
                    break;
                default:
                    createCommand = `${packageManager} create vite@latest ${projectName} -- --template react-ts`;
            }
        } else if (nativeFramework) {
            switch (nativeFramework.id) {
                case "reactnative":
                    createCommand = `npx @react-native-community/cli@latest init ${projectName}`;
                    break;
                case "flutter":
                    createCommand = `flutter create ${projectName}`;
                    break;
                case "expo":
                    createCommand = `npx create-expo-app@latest ${projectName} --template`;
                    break;
                case "ionic":
                    const ionicType = ((webFramework as Technology | undefined)?.id === "vue") ? "vue" : 
                                     ((webFramework as Technology | undefined)?.id === "angular") ? "angular" : "react";
                    createCommand = `ionic start ${projectName} tabs --type=${ionicType}`;
                    break;
                case "tauri":
                    createCommand = `${packageManager} create tauri-app@latest ${projectName}`;
                    break;
                case "electron":
                    createCommand = `${packageManager} create electron-app ${projectName}`;
                    break;
                default:
                    createCommand = `npx create-expo-app@latest ${projectName}`;
            }
        } else if (backendFramework) {
            switch (backendFramework.id) {
                case "hono":
                    createCommand = `${packageManager} create hono@latest ${projectName}`;
                    break;
                case "express":
                    createCommand = `mkdir ${projectName} && cd ${projectName} && ${packageManager} init -y && ${packageManager} install express @types/express`;
                    break;
                case "fastify":
                    createCommand = `mkdir ${projectName} && cd ${projectName} && ${packageManager} init -y && ${packageManager} install fastify`;
                    break;
                case "nestjs":
                    createCommand = `npx @nestjs/cli@latest new ${projectName}`;
                    break;
                case "koa":
                    createCommand = `mkdir ${projectName} && cd ${projectName} && ${packageManager} init -y && ${packageManager} install koa @types/koa`;
                    break;
                case "trpc":
                    createCommand = `${packageManager} create t3-app@latest ${projectName}`;
                    break;
                default:
                    createCommand = `mkdir ${projectName} && cd ${projectName} && ${packageManager} init -y`;
            }
        } else {
            // Default to a basic Node.js project
            createCommand = `mkdir ${projectName} && cd ${projectName} && ${packageManager} init -y`;
        }

        // Add additional setup commands for other technologies
        const additionalCommands: string[] = [];

        // TanStack Router specific setup
        if (webFramework?.id === "tanstack-router") {
            additionalCommands.push(`cd ${projectName} && ${packageManager} install @tanstack/react-router @tanstack/router-devtools`);
        }

        // CSS Framework setup
        const cssFramework = selectedTechs.find(tech => tech.category === "CSS Framework");
        if (cssFramework && (webFramework || nativeFramework)) {
            switch (cssFramework.id) {
                case "tailwind":
                    if (webFramework?.id === "nextjs") {
                        // Next.js has built-in Tailwind support
                        additionalCommands.push(`cd ${projectName} && ${packageManager} install tailwindcss postcss autoprefixer && npx tailwindcss init -p`);
                    } else {
                        additionalCommands.push(`cd ${projectName} && ${packageManager} install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p`);
                    }
                    break;
                case "shadcn":
                    additionalCommands.push(`cd ${projectName} && npx shadcn-ui@latest init`);
                    break;
                case "chakra":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install @chakra-ui/react @emotion/react @emotion/styled framer-motion`);
                    break;
                case "mui":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install @mui/material @emotion/react @emotion/styled @mui/icons-material`);
                    break;
                case "antd":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install antd`);
                    break;
                case "mantine":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install @mantine/core @mantine/hooks @mantine/notifications`);
                    break;
                case "bootstrap":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install bootstrap`);
                    break;
            }
        }

        // Database setup
        const database = selectedTechs.find(tech => tech.category === "Database");
        if (database) {
            switch (database.id) {
                case "sqlite":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install sqlite3 @types/sqlite3`);
                    break;
                case "postgresql":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install pg @types/pg`);
                    break;
                case "mongodb":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install mongodb @types/mongodb`);
                    break;
                case "mysql":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install mysql2 @types/mysql2`);
                    break;
                case "redis":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install redis @types/redis`);
                    break;
                case "supabase":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install @supabase/supabase-js`);
                    break;
                case "planetscale":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install @planetscale/database`);
                    break;
                case "turso":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install @libsql/client`);
                    break;
            }
        }

        // ORM setup
        const orm = selectedTechs.find(tech => tech.category === "ORM");
        if (orm) {
            switch (orm.id) {
                case "prisma":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install prisma @prisma/client && npx prisma init`);
                    break;
                case "drizzle":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install drizzle-orm drizzle-kit`);
                    break;
                case "typeorm":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install typeorm reflect-metadata @types/node`);
                    break;
                case "sequelize":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install sequelize @types/sequelize`);
                    break;
                case "mongoose":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install mongoose @types/mongoose`);
                    break;
            }
        }

        // Authentication setup
        const auth = selectedTechs.find(tech => tech.category === "Authentication");
        if (auth && (webFramework || nativeFramework)) {
            switch (auth.id) {
                case "nextauth":
                    if (webFramework?.id === "nextjs") {
                        additionalCommands.push(`cd ${projectName} && ${packageManager} install next-auth`);
                    }
                    break;
                case "clerk":
                    if (webFramework?.id === "nextjs") {
                        additionalCommands.push(`cd ${projectName} && ${packageManager} install @clerk/nextjs`);
                    } else if (webFramework?.id === "react") {
                        additionalCommands.push(`cd ${projectName} && ${packageManager} install @clerk/clerk-react`);
                    }
                    break;
                case "auth0":
                    if (webFramework?.id === "nextjs") {
                        additionalCommands.push(`cd ${projectName} && ${packageManager} install @auth0/nextjs-auth0`);
                    } else if (webFramework?.id === "react") {
                        additionalCommands.push(`cd ${projectName} && ${packageManager} install @auth0/auth0-react`);
                    }
                    break;
                case "supabase-auth":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install @supabase/auth-ui-react @supabase/auth-ui-shared`);
                    break;
                case "firebase-auth":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install firebase`);
                    break;
            }
        }

        // State Management setup
        const stateManagement = selectedTechs.find(tech => tech.category === "State Management");
        if (stateManagement && (webFramework || nativeFramework)) {
            switch (stateManagement.id) {
                case "zustand":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install zustand`);
                    break;
                case "redux":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install @reduxjs/toolkit react-redux`);
                    break;
                case "jotai":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install jotai`);
                    break;
                case "valtio":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install valtio`);
                    break;
                case "recoil":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install recoil`);
                    break;
            }
        }

        // Testing setup
        const testing = selectedTechs.find(tech => tech.category === "Testing");
        if (testing) {
            switch (testing.id) {
                case "jest":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install --save-dev jest @types/jest ts-jest`);
                    break;
                case "vitest":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install --save-dev vitest @vitest/ui`);
                    break;
                case "cypress":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install --save-dev cypress`);
                    break;
                case "playwright":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install --save-dev @playwright/test && npx playwright install`);
                    break;
                case "testing-library":
                    if (webFramework?.id === "react" || webFramework?.id === "nextjs") {
                        additionalCommands.push(`cd ${projectName} && ${packageManager} install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event`);
                    }
                    break;
            }
        }

        // Build Tools setup (only if not already included in framework)
        const buildTool = selectedTechs.find(tech => tech.category === "Build Tools");
        if (buildTool && !webFramework) {
            switch (buildTool.id) {
                case "vite":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install --save-dev vite`);
                    break;
                case "webpack":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install --save-dev webpack webpack-cli webpack-dev-server`);
                    break;
                case "rollup":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install --save-dev rollup`);
                    break;
                case "parcel":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install --save-dev parcel`);
                    break;
                case "esbuild":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install --save-dev esbuild`);
                    break;
            }
        }

        // Validation setup
        const validation = selectedTechs.find(tech => tech.category === "Validation");
        if (validation) {
            switch (validation.id) {
                case "zod":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install zod`);
                    break;
                case "yup":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install yup`);
                    break;
                case "joi":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install joi`);
                    break;
                case "valibot":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install valibot`);
                    break;
            }
        }

        // GraphQL/API setup
        const graphql = selectedTechs.find(tech => tech.category === "GraphQL/API");
        if (graphql) {
            switch (graphql.id) {
                case "apollo-graphql":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install @apollo/client graphql`);
                    break;
                case "graphql-yoga":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install graphql-yoga graphql`);
                    break;
                case "pothos":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install @pothos/core graphql`);
                    break;
                case "graphql-codegen":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install -D @graphql-codegen/cli`);
                    break;
            }
        }

        // Real-time setup
        const realtime = selectedTechs.find(tech => tech.category === "Real-time");
        if (realtime) {
            switch (realtime.id) {
                case "socketio":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install socket.io socket.io-client`);
                    break;
                case "pusher":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install pusher pusher-js`);
                    break;
                case "ably":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install ably`);
                    break;
                case "partykit":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install partykit`);
                    break;
            }
        }

        // CMS setup
        const cms = selectedTechs.find(tech => tech.category === "CMS");
        if (cms) {
            switch (cms.id) {
                case "sanity":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install @sanity/client`);
                    break;
                case "contentful":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install contentful`);
                    break;
                case "strapi":
                    additionalCommands.push(`# Strapi: Create separate CMS project with 'npx create-strapi-app@latest ${projectName}-cms'`);
                    break;
                case "payload":
                    additionalCommands.push(`# Payload: Create separate CMS project with 'npx create-payload-app@latest ${projectName}-cms'`);
                    break;
                case "keystatic":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install @keystatic/core`);
                    break;
            }
        }

        // Search setup
        const search = selectedTechs.find(tech => tech.category === "Search");
        if (search) {
            switch (search.id) {
                case "algolia":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install algoliasearch`);
                    break;
                case "meilisearch":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install meilisearch`);
                    break;
                case "typesense":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install typesense`);
                    break;
                case "elasticsearch":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install @elastic/elasticsearch`);
                    break;
            }
        }

        // Email setup
        const email = selectedTechs.find(tech => tech.category === "Email");
        if (email) {
            switch (email.id) {
                case "resend":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install resend`);
                    break;
                case "sendgrid":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install @sendgrid/mail`);
                    break;
                case "postmark":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install postmark`);
                    break;
                case "react-email":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install @react-email/components`);
                    break;
            }
        }

        // Analytics setup
        const analytics = selectedTechs.find(tech => tech.category === "Analytics");
        if (analytics) {
            switch (analytics.id) {
                case "posthog":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install posthog-js`);
                    break;
                case "plausible":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install plausible-tracker`);
                    break;
                case "google-analytics":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install @vercel/analytics`);
                    break;
            }
        }

        // Payment setup
        const payment = selectedTechs.find(tech => tech.category === "Payment");
        if (payment) {
            switch (payment.id) {
                case "stripe":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install stripe @stripe/stripe-js`);
                    break;
                case "paypal":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install @paypal/checkout-server-sdk`);
                    break;
                case "lemon-squeezy":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install @lemonsqueezy/lemonsqueezy.js`);
                    break;
            }
        }

        // Storage setup
        const storage = selectedTechs.find(tech => tech.category === "Storage");
        if (storage) {
            switch (storage.id) {
                case "cloudinary":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install cloudinary`);
                    break;
                case "uploadthing":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install uploadthing`);
                    break;
                case "aws-s3":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install @aws-sdk/client-s3`);
                    break;
                case "vercel-blob":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install @vercel/blob`);
                    break;
            }
        }

        // Hosting/Deployment setup
        const hosting = selectedTechs.find(tech => tech.category === "Hosting");
        if (hosting) {
            switch (hosting.id) {
                case "vercel":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install --save-dev vercel`);
                    break;
                case "netlify":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install --save-dev netlify-cli`);
                    break;
                case "railway":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install --save-dev @railway/cli`);
                    break;
                case "render":
                    // Render doesn't require a CLI installation, deployment is via Git
                    additionalCommands.push(`# Render: Deploy via Git by connecting your repository at https://render.com`);
                    break;
                case "fly":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install --save-dev @fly/flyctl`);
                    break;
                case "cloudflare-pages":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install --save-dev wrangler`);
                    break;
                case "aws":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install --save-dev aws-cdk-lib constructs`);
                    break;
                case "digitalocean":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install --save-dev doctl`);
                    break;
                case "coolify":
                    additionalCommands.push(`# Coolify: Deploy via Docker - visit https://coolify.io for setup instructions`);
                    break;
                case "dokku":
                    additionalCommands.push(`# Dokku: Deploy via Git push - visit https://dokku.com for setup instructions`);
                    break;
                case "heroku":
                    additionalCommands.push(`cd ${projectName} && ${packageManager} install -g heroku`);
                    break;
            }
        }

        // Combine all commands
        const allCommands = [createCommand, ...additionalCommands].filter(cmd => cmd.length > 0);
        return allCommands.join(" && ");
    };

    const generateSmartCommand = async () => {
        const basicCommand = generateCommand();
        if (!basicCommand || !projectDescription.trim()) return basicCommand;

        try {
            const selectedTechs = Object.values(selectedStack).flat();
            const techNames = selectedTechs.map(t => t.name).join(', ');

            const prompt = `
            Optimize this command sequence for a ${projectDescription} project:
            
            Current command: ${basicCommand}
            Technologies: ${techNames}
            
            Please provide an optimized command that:
            1. Adds any missing essential dependencies
            2. Includes proper configuration steps
            3. Sets up development environment
            4. Adds useful scripts or configurations
            
            Return only the optimized command sequence, no explanations.
            `;

            const optimizedCommand = await callAI(prompt);
            return optimizedCommand.trim() || basicCommand;
        } catch (error) {
            console.error('Smart command generation failed:', error);
            return basicCommand;
        }
    };

    const copyCommand = async () => {
        const command = generateCommand();
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

    const generateRandomStack = () => {
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

        setSelectedStack(newStack);
        toast({
            title: "Random stack generated!",
            description: `Selected ${randomTechs.length} technologies across ${Object.keys(newStack).length} categories.`,
        });
    };

    // AI-Powered Functions
    const analyzeStackWithAI = async () => {
        if (!projectDescription.trim()) {
            toast({
                title: "Project description required",
                description: "Please provide a project description for AI analysis.",
                variant: "destructive",
            });
            return;
        }

        setIsAnalyzing(true);
        try {
            const selectedTechs = Object.values(selectedStack).flat();
            const techNames = selectedTechs.map(t => t.name).join(', ');

            const prompt = `
            Analyze this tech stack for a project:
            
            Project Description: "${projectDescription}"
            Current Stack: ${techNames || 'No technologies selected'}
            
            Please provide a JSON response with:
            {
                "recommendations": [
                    {
                        "technologyId": "string (must match existing tech IDs)",
                        "reason": "string",
                        "confidence": number (0-100)
                    }
                ],
                "warnings": ["string array of potential issues"],
                "suggestions": ["string array of improvements"],
                "projectType": "string (e.g., 'E-commerce Platform', 'Social Media App')",
                "complexity": "Simple|Moderate|Complex"
            }
            
            Available technologies: ${technologyData.map(t => `${t.id}:${t.name}`).join(', ')}
            `;

            const response = await callAI(prompt);
            const analysis = JSON.parse(response);

            // Map recommendations to full technology objects
            const recommendations: AIRecommendation[] = analysis.recommendations.map((rec: any) => {
                const tech = technologyData.find(t => t.id === rec.technologyId);
                return tech ? {
                    technology: tech,
                    reason: rec.reason,
                    confidence: rec.confidence
                } : null;
            }).filter(Boolean);

            setAiAnalysis({
                recommendations,
                warnings: analysis.warnings || [],
                suggestions: analysis.suggestions || [],
                projectType: analysis.projectType || 'Web Application',
                complexity: analysis.complexity || 'Moderate'
            });

            setAiRecommendations(recommendations);
            setShowAiPanel(true);

            toast({
                title: "AI Analysis Complete!",
                description: `Found ${recommendations.length} recommendations for your project.`,
            });
        } catch (error) {
            console.error('AI Analysis Error:', error);
            
            // Handle specific AI API errors
            let errorTitle = "AI Analysis Failed";
            let errorDescription = "Unable to analyze your stack. Please try again.";
            
            if (error instanceof Error) {
                if (error.message === 'ALL_PROVIDERS_FAILED') {
                    errorTitle = "AI Services Unavailable";
                    errorDescription = "All AI providers failed to respond. Please try again later or check your API configuration.";
                } else if (error.message === 'NO_API_KEY') {
                    errorTitle = "AI Service Not Configured";
                    errorDescription = "No API key is configured for AI analysis. Please configure an API key to use AI features.";
                } else if (error.message === 'UNAUTHORIZED') {
                    errorTitle = "AI Service Authentication Failed";
                    errorDescription = "Cannot connect to AI service due to authentication issues. Please try again later.";
                } else if (error.message === 'TIMEOUT') {
                    errorTitle = "AI Analysis Timed Out";
                    errorDescription = "The AI service took too long to respond. Please try again.";
                } else if (error.message === 'RATE_LIMITED') {
                    errorTitle = "AI Service Busy";
                    errorDescription = "Too many requests to the AI service. Please wait a moment and try again.";
                } else if (error.message === 'SERVER_ERROR') {
                    errorTitle = "AI Service Error";
                    errorDescription = "The AI service is experiencing issues. Please try again later.";
                }
            }
            
            toast({
                title: errorTitle,
                description: errorDescription,
                variant: "destructive",
            });
        } finally {
            setIsAnalyzing(false);
        }
    };

    // Fallback stack generation based on keywords
    const generateFallbackStack = (description: string): TechStack => {
        const desc = description.toLowerCase();
        const stack: TechStack = {};

        const addTech = (techId: string) => {
            const tech = technologyData.find(t => t.id === techId);
            if (tech) {
                if (!stack[tech.category]) {
                    stack[tech.category] = [];
                }
                stack[tech.category].push(tech);
            }
        };

        // Framework selection based on keywords
        if (desc.includes('vue') || desc.includes('nuxt')) {
            addTech('vue');
            addTech('nuxt');
        } else if (desc.includes('angular')) {
            addTech('angular');
        } else if (desc.includes('svelte')) {
            addTech('svelte');
            addTech('sveltekit');
        } else if (desc.includes('mobile') || desc.includes('app') || desc.includes('native')) {
            addTech('reactnative');
            addTech('expo');
        } else if (desc.includes('desktop')) {
            addTech('electron');
        } else {
            // Default to React/Next.js for web projects
            addTech('react');
            addTech('nextjs');
        }

        // Database selection
        if (desc.includes('database') || desc.includes('data') || desc.includes('storage')) {
            if (desc.includes('postgres') || desc.includes('postgresql')) {
                addTech('postgresql');
                addTech('prisma');
            } else if (desc.includes('mongo')) {
                addTech('mongodb');
                addTech('mongoose');
            } else if (desc.includes('simple') || desc.includes('small')) {
                addTech('sqlite');
                addTech('prisma');
            } else {
                addTech('supabase'); // Modern default
            }
        }

        // Authentication
        if (desc.includes('auth') || desc.includes('login') || desc.includes('user')) {
            addTech('nextauth');
        }

        // State management for complex apps
        if (desc.includes('state') || desc.includes('complex') || desc.includes('large')) {
            addTech('zustand');
        }

        // Validation for forms
        if (desc.includes('form') || desc.includes('validation') || desc.includes('schema')) {
            addTech('zod');
        }

        // Payment for e-commerce
        if (desc.includes('payment') || desc.includes('ecommerce') || desc.includes('shop') || desc.includes('store')) {
            addTech('stripe');
        }

        // Real-time for chat/collaboration
        if (desc.includes('chat') || desc.includes('realtime') || desc.includes('live') || desc.includes('socket')) {
            addTech('socketio');
        }

        // CMS for content-driven sites
        if (desc.includes('cms') || desc.includes('content') || desc.includes('blog') || desc.includes('article')) {
            addTech('sanity');
        }

        // Search for complex data
        if (desc.includes('search') || desc.includes('filter') || desc.includes('find')) {
            addTech('algolia');
        }

        // Email for notifications
        if (desc.includes('email') || desc.includes('notification') || desc.includes('mail')) {
            addTech('resend');
        }

        // Analytics for tracking
        if (desc.includes('analytics') || desc.includes('tracking') || desc.includes('metrics')) {
            addTech('posthog');
        }

        // Styling
        addTech('tailwind');
        if (desc.includes('component') || desc.includes('ui library')) {
            addTech('shadcn');
        }

        // Testing
        if (desc.includes('test') || desc.includes('quality')) {
            addTech('vitest');
        }

        // Package manager
        if (desc.includes('fast') || desc.includes('performance')) {
            addTech('pnpm');
        } else {
            addTech('npm');
        }

        // Runtime
        addTech('nodejs');

        // Hosting
        if (desc.includes('aws') || desc.includes('amazon')) {
            addTech('aws');
        } else {
            addTech('vercel'); // Default for Next.js
        }

        return stack;
    };

    const generateAIStack = async () => {
        if (!projectDescription.trim()) {
            toast({
                title: "Project description required",
                description: "Please describe your project for AI recommendations.",
                variant: "destructive",
            });
            return;
        }

        setIsAnalyzing(true);

        // Try real AI first
        try {
            const prompt = `
            Generate a complete tech stack for this project:
            
            Project Description: "${projectDescription}"
            
            IMPORTANT: Respond ONLY with valid JSON in this exact format:
            {
                "stack": ["array of technology IDs from the list below"],
                "reasoning": "brief explanation of why these technologies work well together"
            }
            
            Available technologies: ${technologyData.map(t => `${t.id}:${t.name} (${t.category})`).join(', ')}
            
            Rules:
            - Choose 4-8 technologies that work well together
            - Use only technology IDs from the available list above
            - Ensure technologies complement each other
            - Return ONLY the JSON object, no additional text
            `;

            const response = await callAI(prompt);
            console.log('AI Response:', response);

            if (!response || response.trim() === '') {
                throw new Error('Empty AI response');
            }

            // Try to parse JSON response, with fallback handling
            let result;
            try {
                result = JSON.parse(response);
            } catch (parseError) {
                console.warn('Failed to parse AI response as JSON:', response);
                // Try to extract JSON from the response if it's wrapped in text
                const jsonMatch = response.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    try {
                        result = JSON.parse(jsonMatch[0]);
                        console.log('Extracted JSON:', result);
                    } catch (secondParseError) {
                        console.error('Second parse error:', secondParseError);
                        throw new Error('AI response is not valid JSON');
                    }
                } else {
                    throw new Error('No JSON found in AI response');
                }
            }

            // Validate the result structure
            if (!result || !Array.isArray(result.stack)) {
                throw new Error('Invalid AI response structure');
            }

            const newStack: TechStack = {};
            result.stack.forEach((techId: string) => {
                const tech = technologyData.find(t => t.id === techId);
                if (tech) {
                    if (!newStack[tech.category]) {
                        newStack[tech.category] = [];
                    }
                    newStack[tech.category].push(tech);
                }
            });

            setSelectedStack(newStack);

            toast({
                title: "AI Stack Generated!",
                description: result.reasoning || "AI has analyzed your project and created a personalized tech stack recommendation.",
            });
        } catch (error) {
            console.error('AI Stack Generation Error:', error);

            // Handle specific AI API errors with user-friendly messages
            if (error instanceof Error) {
                if (error.message === 'ALL_PROVIDERS_FAILED') {
                    toast({
                        title: "AI Services Unavailable",
                        description: "All AI providers failed to respond. Using smart local recommendation instead.",
                        variant: "default",
                    });
                } else if (error.message === 'NO_API_KEY') {
                    toast({
                        title: "AI Service Not Configured",
                        description: "No API key is configured. Using local fallback recommendation instead.",
                        variant: "default",
                    });
                } else if (error.message === 'UNAUTHORIZED') {
                    toast({
                        title: "AI Service Authentication Failed",
                        description: "The AI service is currently unavailable due to authentication issues. Using fallback recommendation instead.",
                        variant: "default",
                    });
                } else if (error.message === 'TIMEOUT') {
                    toast({
                        title: "AI Request Timed Out",
                        description: "The AI service took too long to respond. Using fallback recommendation instead.",
                        variant: "default",
                    });
                } else if (error.message === 'RATE_LIMITED') {
                    toast({
                        title: "AI Service Busy",
                        description: "Too many requests to the AI service. Please try again in a moment or use the fallback.",
                        variant: "default",
                    });
                } else if (error.message === 'SERVER_ERROR') {
                    toast({
                        title: "AI Service Error",
                        description: "The AI service is experiencing issues. Using fallback recommendation instead.",
                        variant: "default",
                    });
                }
            }

            // Fallback: Generate a basic stack based on project description keywords
            const fallbackStack = generateFallbackStack(projectDescription);
            if (fallbackStack && Object.keys(fallbackStack).length > 0) {
                setSelectedStack(fallbackStack);
                
                // Only show fallback message if we haven't shown a specific error message
                if (!(error instanceof Error && ['ALL_PROVIDERS_FAILED', 'NO_API_KEY', 'UNAUTHORIZED', 'TIMEOUT', 'RATE_LIMITED', 'SERVER_ERROR'].includes(error.message))) {
                    toast({
                        title: "Smart Fallback Stack Generated",
                        description: "AI service unavailable. Generated an intelligent stack based on your description.",
                        variant: "default",
                    });
                }
            } else {
                toast({
                    title: "Unable to Generate Stack",
                    description: "Both AI service and fallback failed. Please select technologies manually or try again later.",
                    variant: "destructive",
                });
            }
        } finally {
            setIsAnalyzing(false);
        }
    };

    const askAIQuestion = async (question: string) => {
        try {
            const selectedTechs = Object.values(selectedStack).flat();
            const techNames = selectedTechs.map(t => t.name).join(', ');

            const prompt = `
            Answer this question about the tech stack:
            
            Question: "${question}"
            Current Stack: ${techNames || 'No technologies selected'}
            Project: "${projectDescription || 'No description provided'}"
            
            Provide a helpful, concise answer focusing on practical advice.
            `;

            const response = await callAI(prompt);
            return response;
        } catch (error) {
            console.error('AI Question Error:', error);
            throw error;
        }
    };

    const applyAIRecommendation = (recommendation: AIRecommendation) => {
        toggleTechnology(recommendation.technology);
        toast({
            title: "Recommendation Applied!",
            description: `Added ${recommendation.technology.name} to your stack.`,
        });
    };

    const applyPreset = (presetType: string) => {
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
        }

        const newStack: TechStack = {};
        presetTechs.forEach(techId => {
            const tech = technologyData.find(t => t.id === techId);
            if (tech) {
                if (!newStack[tech.category]) {
                    newStack[tech.category] = [];
                }
                newStack[tech.category].push(tech);
            }
        });

        setSelectedStack(newStack);
        toast({
            title: "Preset applied!",
            description: `Applied ${presetType} preset with ${presetTechs.length} technologies.`,
        });
    };

    return (
        <div className="min-h-screen bg-[#0d1117] text-white flex flex-col lg:flex-row">
            {/* Mobile Header - Show/Hide Sidebar Toggle */}
            <div className="lg:hidden bg-[#161b22] border-b border-gray-800 p-4 flex items-center justify-between sticky top-0 z-30">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        TG
                    </div>
                    <h1 className="text-lg font-bold text-white">Tech Genie</h1>
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
                    className="bg-[#0d1117] border-gray-700 text-white hover:bg-gray-800"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </Button>
            </div>

            {/* Sidebar */}
            <div 
                id="mobile-sidebar"
                className="hidden lg:flex w-full lg:w-80 xl:w-96 bg-[#161b22] border-r border-gray-800 flex-col lg:h-screen overflow-y-auto lg:sticky lg:top-0"
            >
                {/* Fixed Header - Project Name */}
                <div className="p-3 sm:p-4 border-b border-gray-800 flex-shrink-0">
                    <label className="block text-xs sm:text-sm text-gray-400 mb-2">Project Name:</label>
                    <Input
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="bg-[#0d1117] border-gray-700 text-white text-sm"
                        placeholder="my-tech-genie-app"
                    />
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="flex flex-col">

                {/* AI-Powered Section */}
                <div className="p-3 sm:p-4 border-b border-gray-800 flex-shrink-0">
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                        <label className="text-xs sm:text-sm text-gray-400 font-medium">AI Assistant</label>
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                        <div>
                            <Input
                                value={projectDescription}
                                onChange={(e) => setProjectDescription(e.target.value)}
                                className="bg-[#0d1117] border-gray-700 text-white text-xs sm:text-sm"
                                placeholder="Describe your project..."
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={generateAIStack}
                                disabled={isAnalyzing || !projectDescription.trim()}
                                className="bg-gradient-to-r from-purple-600 to-blue-600 border-0 text-white hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 text-xs"
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
                                className="bg-[#0d1117] border-purple-600 text-purple-400 hover:bg-purple-900/20 disabled:opacity-50 text-xs"
                            >
                                {isAnalyzing ? (
                                    <>
                                        <div className="w-3 h-3 border border-purple-400 border-t-transparent rounded-full animate-spin mr-1" />
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
                    <div className="p-3 sm:p-4 border-b border-gray-800 flex-shrink-0">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                                <label className="text-xs sm:text-sm text-gray-400 font-medium">AI Analysis</label>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowAiPanel(false)}
                                className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                            >
                                <X className="w-3 h-3" />
                            </Button>
                        </div>

                        <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-64 overflow-y-auto">
                            {/* Project Analysis */}
                            <div className="bg-[#0d1117] rounded p-3">
                                <div className="text-xs text-purple-400 font-medium mb-1">Project Type</div>
                                <div className="text-xs text-white">{aiAnalysis.projectType}</div>
                                <div className="text-xs text-gray-400 mt-1">
                                    Complexity: <span className={`font-medium ${aiAnalysis.complexity === 'Simple' ? 'text-green-400' :
                                        aiAnalysis.complexity === 'Moderate' ? 'text-yellow-400' : 'text-red-400'
                                        }`}>{aiAnalysis.complexity}</span>
                                </div>
                            </div>

                            {/* Recommendations */}
                            {aiAnalysis.recommendations.length > 0 && (
                                <div>
                                    <div className="text-xs text-green-400 font-medium mb-2">Recommendations</div>
                                    <div className="space-y-2">
                                        {aiAnalysis.recommendations.slice(0, 3).map((rec, index) => (
                                            <div key={index} className="bg-[#0d1117] rounded p-2">
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="flex items-center gap-2">
                                                        <TechIcon
                                                            src={rec.technology.icon || ""}
                                                            alt={rec.technology.name}
                                                            width={12}
                                                            height={12}
                                                            className="rounded"
                                                        />
                                                        <span className="text-xs text-white font-medium">{rec.technology.name}</span>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => applyAIRecommendation(rec)}
                                                        className="h-5 w-5 p-0 text-green-400 hover:text-green-300"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                                <div className="text-xs text-gray-400">{rec.reason}</div>
                                                <div className="text-xs text-purple-400 mt-1">
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
                                    <div className="text-xs text-yellow-400 font-medium mb-2">Warnings</div>
                                    <div className="space-y-1">
                                        {aiAnalysis.warnings.slice(0, 2).map((warning, index) => (
                                            <div key={index} className="bg-yellow-900/20 border border-yellow-600/30 rounded p-2">
                                                <div className="text-xs text-yellow-200">{warning}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Suggestions */}
                            {aiAnalysis.suggestions.length > 0 && (
                                <div>
                                    <div className="text-xs text-blue-400 font-medium mb-2">Suggestions</div>
                                    <div className="space-y-1">
                                        {aiAnalysis.suggestions.slice(0, 2).map((suggestion, index) => (
                                            <div key={index} className="bg-blue-900/20 border border-blue-600/30 rounded p-2">
                                                <div className="text-xs text-blue-200">{suggestion}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="p-3 sm:p-4 border-b border-gray-800 flex-shrink-0">
                    <div className="grid grid-cols-2 gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={clearStack}
                            className="bg-[#0d1117] border-gray-700 text-white hover:bg-gray-800"
                        >
                            <RotateCcw className="w-4 h-4 mr-1" />
                            Reset
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={generateRandomStack}
                            className="bg-[#0d1117] border-gray-700 text-white hover:bg-gray-800"
                        >
                            <Shuffle className="w-4 h-4 mr-1" />
                            Random
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowPopularStacks(true)}
                            className="bg-[#0d1117] border-gray-700 text-white hover:bg-gray-800"
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
                            className="bg-[#0d1117] border-gray-700 text-white hover:bg-gray-800 disabled:opacity-50"
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
                            className="bg-[#0d1117] border-gray-700 text-white hover:bg-gray-800 disabled:opacity-50"
                        >
                            <Share className="w-4 h-4 mr-1" />
                            Share
                        </Button>
                    </div>
                </div>

                {/* Command Generator */}
                <div className="p-3 sm:p-4 border-b border-gray-800 flex-shrink-0">
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs sm:text-sm text-gray-400">Generated Command:</label>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={async () => {
                                const smartCommand = await generateSmartCommand();
                                if (smartCommand !== generateCommand()) {
                                    toast({
                                        title: "AI Enhanced Command!",
                                        description: "Command optimized with AI suggestions.",
                                    });
                                }
                            }}
                            disabled={!generateCommand() || !projectDescription.trim()}
                            className="h-6 text-xs text-purple-400 hover:text-purple-300 disabled:opacity-50"
                        >
                            <Sparkles className="w-3 h-3 mr-1" />
                            AI Enhance
                        </Button>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <textarea
                                ref={commandTextareaRef}
                                value={generateCommand()}
                                readOnly
                                className="w-full bg-[#0d1117] border border-gray-700 text-white text-sm font-mono rounded-md px-3 py-2 resize-none overflow-hidden transition-all duration-200"
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
                            disabled={!generateCommand()}
                            className="bg-[#0d1117] border-gray-700 text-white hover:bg-gray-800 disabled:opacity-50 self-start"
                        >
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Selected Stack */}
                <div className="p-3 sm:p-4 border-b border-gray-800 flex-shrink-0">
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs sm:text-sm text-gray-400">Selected Stack ({getTotalSelected()})</label>
                        {getTotalSelected() > 0 && (
                            <div className="flex items-center gap-1 text-xs">
                                {aiAnalysis && (
                                    <div className={`px-2 py-1 rounded text-xs font-medium ${aiAnalysis.complexity === 'Simple' ? 'bg-green-900/30 text-green-400' :
                                        aiAnalysis.complexity === 'Moderate' ? 'bg-yellow-900/30 text-yellow-400' :
                                            'bg-red-900/30 text-red-400'
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
                                    <div className="text-xs text-gray-500 font-medium mb-1">{category}</div>
                                    {techs.map((tech) => (
                                        <div key={tech.id} className="flex items-center justify-between bg-[#0d1117] rounded px-2 py-1 mb-1">
                                            <div className="flex items-center gap-2">
                                                <TechIcon
                                                    src={tech.icon}
                                                    alt={tech.name}
                                                    width={16}
                                                    height={16}
                                                    className="rounded"
                                                />
                                                <span className="text-sm text-white">{tech.name}</span>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => toggleTechnology(tech)}
                                                className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
                                            >
                                                <X className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ))}
                            {getTotalSelected() === 0 && (
                                <div className="text-sm text-gray-500 text-center py-4">
                                    No technologies selected
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Presets */}
                <div className="p-3 sm:p-4 flex-shrink-0">
                    <label className="block text-xs sm:text-sm text-gray-400 mb-2">Quick Presets:</label>
                    <div className="space-y-1">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => applyPreset('default')}
                            className="w-full justify-start bg-[#0d1117] border-gray-700 !text-white hover:bg-gray-800 hover:!text-white text-xs font-medium"
                        >
                            Default Stack
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => applyPreset('convex-react')}
                            className="w-full justify-start bg-[#0d1117] border-gray-700 !text-white hover:bg-gray-800 hover:!text-white text-xs font-medium"
                        >
                            Convex + React
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => applyPreset('mobile')}
                            className="w-full justify-start bg-[#0d1117] border-gray-700 !text-white hover:bg-gray-800 hover:!text-white text-xs font-medium"
                        >
                            Mobile App
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => applyPreset('api-only')}
                            className="w-full justify-start bg-[#0d1117] border-gray-700 !text-white hover:bg-gray-800 hover:!text-white text-xs font-medium"
                        >
                            API Only
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => applyPreset('full-featured')}
                            className="w-full justify-start bg-[#0d1117] border-gray-700 !text-white hover:bg-gray-800 hover:!text-white text-xs font-medium"
                        >
                            Full Featured
                        </Button>
                    </div>
                </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col w-full lg:h-screen overflow-hidden">
                {/* Header */}
                <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-800 flex-shrink-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="flex-1 min-w-0">
                            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white flex items-center gap-2">
                                <span className="truncate">Tech Genie Stack Builder</span>
                                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-400 flex-shrink-0" />
                            </h1>
                            <p className="text-xs sm:text-sm text-gray-400 mt-1">Build your perfect tech stack with AI-powered recommendations</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowAiPanel(!showAiPanel)}
                                className="bg-gradient-to-r from-purple-600 to-blue-600 border-0 text-white hover:from-purple-700 hover:to-blue-700 text-xs sm:text-sm"
                            >
                                <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                <span className="hidden sm:inline">AI Assistant</span>
                                <span className="sm:hidden">AI</span>
                            </Button>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                        <Input
                            placeholder="Search technologies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8 sm:pl-10 bg-[#161b22] border-gray-700 text-white placeholder-gray-400 text-sm"
                        />
                    </div>
                </div>

                {/* Technology Grid */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-3 sm:p-4 lg:p-6">
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
                                            <h2 className="text-xl font-semibold text-white">{category}</h2>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                                                    {categoryTechs.length}
                                                </Badge>
                                                <ChevronDown
                                                    className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''
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
                                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4"
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
                                                                        ? 'bg-blue-900/20 border-blue-500 ring-1 ring-blue-500/50'
                                                                        : 'bg-[#161b22] border-gray-700 hover:border-gray-600 hover:bg-[#1c2128]'
                                                                        }`}
                                                                    onClick={() => toggleTechnology(tech)}
                                                                >
                                                                    <CardContent className="p-3 sm:p-4">
                                                                        <div className="flex items-start justify-between mb-2 sm:mb-3">
                                                                            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                                                                <TechIcon
                                                                                    src={tech.icon}
                                                                                    alt={tech.name}
                                                                                    width={28}
                                                                                    height={28}
                                                                                    className="rounded flex-shrink-0"
                                                                                />
                                                                                <div className="flex-1 min-w-0">
                                                                                    <div className="flex items-center gap-1 sm:gap-2 mb-1 flex-wrap">
                                                                                        <h3 className="font-semibold text-white text-xs sm:text-sm truncate">{tech.name}</h3>
                                                                                        {aiRecommendations.some(rec => rec.technology.id === tech.id) && (
                                                                                            <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
                                                                                                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-400" />
                                                                                                <span className="text-[10px] sm:text-xs text-purple-400 font-medium">AI Pick</span>
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
                                                                                                            <span className="text-[10px] sm:text-xs text-green-400">Compatible</span>
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
                                                                                    <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white rotate-45" />
                                                                                </motion.div>
                                                                            )}
                                                                        </div>
                                                                        <p className="text-gray-400 text-[11px] sm:text-xs leading-relaxed mb-2 line-clamp-2">
                                                                            {tech.description}
                                                                        </p>

                                                                        {/* AI Recommendation Reason */}
                                                                        {(() => {
                                                                            const recommendation = aiRecommendations.find(rec => rec.technology.id === tech.id);
                                                                            if (recommendation) {
                                                                                return (
                                                                                    <div className="bg-purple-900/20 border border-purple-600/30 rounded p-1.5 sm:p-2 mt-2">
                                                                                        <div className="flex items-center gap-1 mb-1">
                                                                                            <Brain className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-400" />
                                                                                            <span className="text-[10px] sm:text-xs text-purple-400 font-medium">AI Insight</span>
                                                                                        </div>
                                                                                        <p className="text-[10px] sm:text-xs text-purple-200 line-clamp-2">{recommendation.reason}</p>
                                                                                        <div className="text-[10px] sm:text-xs text-purple-400 mt-1">
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
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
                    <div className="bg-[#0d1117] border border-gray-700 rounded-lg max-w-4xl w-full max-h-[90vh] sm:max-h-[80vh] overflow-y-auto">
                        <div className="p-4 sm:p-6 border-b border-gray-700 sticky top-0 bg-[#0d1117] z-10">
                            <div className="flex items-start sm:items-center justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0" />
                                        <span className="truncate">Popular Stack Templates</span>
                                    </h2>
                                    <p className="text-gray-400 text-xs sm:text-sm mt-1">Choose from curated tech stacks for common use cases</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowPopularStacks(false)}
                                    className="text-gray-400 hover:text-white flex-shrink-0"
                                >
                                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                                </Button>
                            </div>
                        </div>
                        <div className="p-4 sm:p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                                {popularStacks.map((stack, index) => (
                                    <Card
                                        key={index}
                                        className="bg-[#161b22] border-gray-700 hover:border-gray-600 cursor-pointer transition-all duration-200 hover:bg-[#1c2128]"
                                        onClick={() => loadPopularStack(stack)}
                                    >
                                        <CardContent className="p-3 sm:p-4">
                                            <h3 className="font-semibold text-white text-sm sm:text-base mb-2">{stack.name}</h3>
                                            <p className="text-gray-400 text-xs sm:text-sm mb-3">{stack.description}</p>
                                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                {stack.techIds.slice(0, 6).map(techId => {
                                                    const tech = technologyData.find(t => t.id === techId);
                                                    if (!tech) return null;
                                                    return (
                                                        <div key={techId} className="flex items-center gap-1 bg-gray-800 rounded px-1.5 sm:px-2 py-1">
                                                            <TechIcon
                                                                src={tech.icon}
                                                                alt={tech.name}
                                                                width={14}
                                                                height={14}
                                                                className="rounded"
                                                            />
                                                            <span className="text-xs text-white hidden sm:inline">{tech.name}</span>
                                                        </div>
                                                    );
                                                })}
                                                {stack.techIds.length > 6 && (
                                                    <div className="flex items-center justify-center bg-gray-800 rounded px-2 py-1">
                                                        <span className="text-xs text-gray-400">+{stack.techIds.length - 6} more</span>
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