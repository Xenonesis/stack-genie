"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { ChevronDown, Search, X, Plus, RotateCcw, Shuffle, Save, Share, Copy } from "lucide-react";

interface Technology {
    id: string;
    name: string;
    category: string;
    description: string;
    website?: string;
    color: string;
    installCommand?: string;
    icon: string;
}

interface TechStack {
    [category: string]: Technology[];
}

const technologyData: Technology[] = [
    // Web Framework
    { id: "react", name: "React", category: "Web Framework", description: "A JavaScript library for building user interfaces", website: "https://reactjs.org", color: "#61DAFB", installCommand: "npm install react", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { id: "tanstack-router", name: "TanStack Router", category: "Web Framework", description: "Type-safe router for React applications", website: "https://tanstack.com/router", color: "#FD4F00", installCommand: "npm install @tanstack/react-router", icon: "https://avatars.githubusercontent.com/u/72518640?s=200&v=4" },
    { id: "nextjs", name: "Next.js", category: "Web Framework", description: "The React Framework for Production", website: "https://nextjs.org", color: "#000000", installCommand: "npx create-next-app@latest", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { id: "vue", name: "Vue.js", category: "Web Framework", description: "The Progressive JavaScript Framework", website: "https://vuejs.org", color: "#4FC08D", installCommand: "npm install vue", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
    { id: "nuxt", name: "Nuxt.js", category: "Web Framework", description: "The Intuitive Vue Framework", website: "https://nuxt.com", color: "#00DC82", installCommand: "npx nuxi@latest init", icon: "https://nuxt.com/assets/design-kit/icon-green.png" },
    { id: "angular", name: "Angular", category: "Web Framework", description: "Platform for building mobile and desktop web applications", website: "https://angular.io", color: "#DD0031", installCommand: "npm install -g @angular/cli", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
    { id: "svelte", name: "Svelte", category: "Web Framework", description: "Cybernetically enhanced web apps", website: "https://svelte.dev", color: "#FF3E00", installCommand: "npm create svelte@latest my-app", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg" },
    { id: "sveltekit", name: "SvelteKit", category: "Web Framework", description: "The fastest way to build svelte apps", website: "https://kit.svelte.dev", color: "#FF3E00", installCommand: "npm create sveltekit@latest", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg" },
    { id: "remix", name: "Remix", category: "Web Framework", description: "Full stack web framework focused on web standards", website: "https://remix.run", color: "#000000", installCommand: "npx create-remix@latest", icon: "https://avatars.githubusercontent.com/u/64235328?s=200&v=4" },
    { id: "astro", name: "Astro", category: "Web Framework", description: "The web framework for content-driven websites", website: "https://astro.build", color: "#FF5D01", installCommand: "npm create astro@latest", icon: "https://astro.build/assets/press/astro-icon-light-gradient.svg" },
    { id: "solid", name: "SolidJS", category: "Web Framework", description: "Simple and performant reactivity for building user interfaces", website: "https://solidjs.com", color: "#2C4F7C", installCommand: "npx degit solidjs/templates/js my-app", icon: "https://www.solidjs.com/img/logo/without-wordmark/logo.svg" },
    { id: "qwik", name: "Qwik", category: "Web Framework", description: "The HTML-first framework", website: "https://qwik.builder.io", color: "#AC7EF4", installCommand: "npm create qwik@latest", icon: "https://qwik.builder.io/logos/qwik-logo.svg" },

    // Database
    { id: "sqlite", name: "SQLite", category: "Database", description: "Self-contained, serverless, zero-configuration SQL database", website: "https://sqlite.org", color: "#003B57", installCommand: "npm install sqlite3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
    { id: "postgresql", name: "PostgreSQL", category: "Database", description: "Advanced open source relational database", website: "https://postgresql.org", color: "#336791", installCommand: "npm install pg", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { id: "mongodb", name: "MongoDB", category: "Database", description: "Document-oriented NoSQL database", website: "https://mongodb.com", color: "#47A248", installCommand: "npm install mongodb", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { id: "mysql", name: "MySQL", category: "Database", description: "The world's most popular open source database", website: "https://mysql.com", color: "#4479A1", installCommand: "npm install mysql2", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { id: "redis", name: "Redis", category: "Database", description: "In-memory data structure store", website: "https://redis.io", color: "#DC382D", installCommand: "npm install redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    { id: "supabase", name: "Supabase", category: "Database", description: "Open source Firebase alternative", website: "https://supabase.com", color: "#3ECF8E", installCommand: "npm install @supabase/supabase-js", icon: "https://supabase.com/favicon/favicon-32x32.png" },
    { id: "planetscale", name: "PlanetScale", category: "Database", description: "The MySQL-compatible serverless database platform", website: "https://planetscale.com", color: "#000000", installCommand: "npm install @planetscale/database", icon: "https://planetscale.com/favicon.ico" },
    { id: "turso", name: "Turso", category: "Database", description: "SQLite for Production", website: "https://turso.tech", color: "#4FF8D2", installCommand: "npm install @libsql/client", icon: "https://turso.tech/favicon.ico" },

    // Runtime
    { id: "bun", name: "Bun", category: "Runtime", description: "Fast all-in-one JavaScript runtime", website: "https://bun.sh", color: "#FBF0DF", installCommand: "curl -fsSL https://bun.sh/install | bash", icon: "https://bun.sh/logo.svg" },
    { id: "nodejs", name: "Node.js", category: "Runtime", description: "JavaScript runtime built on Chrome's V8 engine", website: "https://nodejs.org", color: "#339933", installCommand: "# Install from nodejs.org", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { id: "deno", name: "Deno", category: "Runtime", description: "A secure runtime for JavaScript and TypeScript", website: "https://deno.land", color: "#000000", installCommand: "curl -fsSL https://deno.land/install.sh | sh", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/denojs/denojs-original.svg" },

    // Backend Framework
    { id: "hono", name: "Hono", category: "Backend Framework", description: "Fast, lightweight web framework", website: "https://hono.dev", color: "#E36002", installCommand: "npm install hono", icon: "https://raw.githubusercontent.com/honojs/hono/main/docs/images/hono-title.png" },
    { id: "express", name: "Express.js", category: "Backend Framework", description: "Fast, unopinionated, minimalist web framework for Node.js", website: "https://expressjs.com", color: "#000000", installCommand: "npm install express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { id: "fastify", name: "Fastify", category: "Backend Framework", description: "Fast and low overhead web framework for Node.js", website: "https://fastify.io", color: "#000000", installCommand: "npm install fastify", icon: "https://avatars.githubusercontent.com/u/24939410?s=200&v=4" },
    { id: "nestjs", name: "NestJS", category: "Backend Framework", description: "A progressive Node.js framework for building efficient server-side applications", website: "https://nestjs.com", color: "#E0234E", installCommand: "npm install @nestjs/core", icon: "https://avatars.githubusercontent.com/u/28507035?s=200&v=4" },
    { id: "koa", name: "Koa.js", category: "Backend Framework", description: "Expressive middleware for node.js using ES2017 async functions", website: "https://koajs.com", color: "#33333D", installCommand: "npm install koa", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { id: "trpc", name: "tRPC", category: "Backend Framework", description: "End-to-end typesafe APIs made easy", website: "https://trpc.io", color: "#398CCB", installCommand: "npm install @trpc/server", icon: "https://trpc.io/img/logo.svg" },

    // CSS Framework
    { id: "tailwind", name: "Tailwind CSS", category: "CSS Framework", description: "Utility-first CSS framework", website: "https://tailwindcss.com", color: "#06B6D4", installCommand: "npm install tailwindcss", icon: "https://avatars.githubusercontent.com/u/67109815?s=200&v=4" },
    { id: "bootstrap", name: "Bootstrap", category: "CSS Framework", description: "The most popular HTML, CSS, and JS library", website: "https://getbootstrap.com", color: "#7952B3", installCommand: "npm install bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
    { id: "chakra", name: "Chakra UI", category: "CSS Framework", description: "Simple, modular and accessible component library", website: "https://chakra-ui.com", color: "#319795", installCommand: "npm install @chakra-ui/react", icon: "https://avatars.githubusercontent.com/u/54212428?s=200&v=4" },
    { id: "mui", name: "Material-UI", category: "CSS Framework", description: "React components for faster and easier web development", website: "https://mui.com", color: "#007FFF", installCommand: "npm install @mui/material", icon: "https://mui.com/static/logo.png" },
    { id: "antd", name: "Ant Design", category: "CSS Framework", description: "Enterprise-class UI design language and React UI library", website: "https://ant.design", color: "#1890FF", installCommand: "npm install antd", icon: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" },
    { id: "mantine", name: "Mantine", category: "CSS Framework", description: "Full-featured React components library", website: "https://mantine.dev", color: "#339AF0", installCommand: "npm install @mantine/core", icon: "https://mantine.dev/favicon.svg" },
    { id: "shadcn", name: "shadcn/ui", category: "CSS Framework", description: "Beautifully designed components built with Radix UI and Tailwind CSS", website: "https://ui.shadcn.com", color: "#000000", installCommand: "npx shadcn-ui@latest init", icon: "https://ui.shadcn.com/favicon.ico" },

    // Native Framework
    { id: "reactnative", name: "React Native", category: "Native Framework", description: "Create native apps for Android and iOS using React", website: "https://reactnative.dev", color: "#61DAFB", installCommand: "npx react-native init", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { id: "flutter", name: "Flutter", category: "Native Framework", description: "Google's UI toolkit for building natively compiled applications", website: "https://flutter.dev", color: "#02569B", installCommand: "flutter create my_app", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
    { id: "ionic", name: "Ionic", category: "Native Framework", description: "Cross-platform mobile app development", website: "https://ionicframework.com", color: "#3880FF", installCommand: "npm install -g @ionic/cli", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg" },
    { id: "expo", name: "Expo", category: "Native Framework", description: "Platform for making universal native apps with React", website: "https://expo.dev", color: "#000020", installCommand: "npm install -g @expo/cli", icon: "https://static.expo.dev/static/brand/square-228x228.png" },
    { id: "tauri", name: "Tauri", category: "Native Framework", description: "Build smaller, faster, and more secure desktop applications", website: "https://tauri.app", color: "#FFC131", installCommand: "npm install @tauri-apps/cli", icon: "https://tauri.app/meta/favicon-32x32.png" },
    { id: "electron", name: "Electron", category: "Native Framework", description: "Build cross-platform desktop apps with JavaScript, HTML, and CSS", website: "https://electronjs.org", color: "#47848F", installCommand: "npm install electron", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg" },

    // ORM
    { id: "prisma", name: "Prisma", category: "ORM", description: "Next-generation Node.js and TypeScript ORM", website: "https://prisma.io", color: "#2D3748", installCommand: "npm install prisma", icon: "https://avatars.githubusercontent.com/u/17219288?s=200&v=4" },
    { id: "drizzle", name: "Drizzle ORM", category: "ORM", description: "TypeScript ORM that is production ready", website: "https://orm.drizzle.team", color: "#C5F74F", installCommand: "npm install drizzle-orm", icon: "https://orm.drizzle.team/favicon.ico" },
    { id: "typeorm", name: "TypeORM", category: "ORM", description: "ORM for TypeScript and JavaScript", website: "https://typeorm.io", color: "#E83524", installCommand: "npm install typeorm", icon: "https://avatars.githubusercontent.com/u/20165699?s=200&v=4" },
    { id: "sequelize", name: "Sequelize", category: "ORM", description: "Promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server", website: "https://sequelize.org", color: "#52B0E7", installCommand: "npm install sequelize", icon: "https://sequelize.org/img/logo.svg" },
    { id: "mongoose", name: "Mongoose", category: "ORM", description: "Elegant mongodb object modeling for node.js", website: "https://mongoosejs.com", color: "#880000", installCommand: "npm install mongoose", icon: "https://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png" },

    // Monorepo
    { id: "turborepo", name: "Turborepo", category: "Monorepo", description: "High-performance build system for JavaScript and TypeScript codebases", website: "https://turbo.build", color: "#EF4444", installCommand: "npm install turbo", icon: "https://avatars.githubusercontent.com/u/84177906?s=200&v=4" },
    { id: "nx", name: "Nx", category: "Monorepo", description: "Smart, fast and extensible build system", website: "https://nx.dev", color: "#143055", installCommand: "npx create-nx-workspace", icon: "https://avatars.githubusercontent.com/u/23692104?s=200&v=4" },
    { id: "lerna", name: "Lerna", category: "Monorepo", description: "A tool for managing JavaScript projects with multiple packages", website: "https://lerna.js.org", color: "#9333EA", installCommand: "npm install lerna", icon: "https://avatars.githubusercontent.com/u/19333396?s=200&v=4" },
    { id: "rush", name: "Rush", category: "Monorepo", description: "Scalable monorepo manager for the web", website: "https://rushjs.io", color: "#087CFA", installCommand: "npm install -g @microsoft/rush", icon: "https://rushjs.io/images/rush-logo.svg" },

    // Package Manager
    { id: "npm", name: "npm", category: "Package Manager", description: "Node package manager", website: "https://npmjs.com", color: "#CB3837", installCommand: "# Built into Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" },
    { id: "yarn", name: "Yarn", category: "Package Manager", description: "Fast, reliable, and secure dependency management", website: "https://yarnpkg.com", color: "#2C8EBB", installCommand: "npm install -g yarn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yarn/yarn-original.svg" },
    { id: "pnpm", name: "pnpm", category: "Package Manager", description: "Fast, disk space efficient package manager", website: "https://pnpm.io", color: "#F69220", installCommand: "npm install -g pnpm", icon: "https://pnpm.io/img/pnpm-no-name-with-frame.svg" },
    { id: "bun-pm", name: "Bun (Package Manager)", category: "Package Manager", description: "Ultra-fast package manager", website: "https://bun.sh", color: "#FBF0DF", installCommand: "curl -fsSL https://bun.sh/install | bash", icon: "https://bun.sh/logo.svg" },

    // Testing
    { id: "jest", name: "Jest", category: "Testing", description: "Delightful JavaScript testing framework", website: "https://jestjs.io", color: "#C21325", installCommand: "npm install jest", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
    { id: "vitest", name: "Vitest", category: "Testing", description: "A blazing fast unit test framework powered by Vite", website: "https://vitest.dev", color: "#6E9F18", installCommand: "npm install vitest", icon: "https://avatars.githubusercontent.com/u/95747107?s=200&v=4" },
    { id: "cypress", name: "Cypress", category: "Testing", description: "Fast, easy and reliable testing for anything that runs in a browser", website: "https://cypress.io", color: "#17202C", installCommand: "npm install cypress", icon: "https://asset.brandfetch.io/idIq_kF0rb/idv3zwmSiY.jpeg" },
    { id: "playwright", name: "Playwright", category: "Testing", description: "Fast and reliable end-to-end testing for modern web apps", website: "https://playwright.dev", color: "#2EAD33", installCommand: "npm install @playwright/test", icon: "https://playwright.dev/img/playwright-logo.svg" },
    { id: "testing-library", name: "Testing Library", category: "Testing", description: "Simple and complete testing utilities", website: "https://testing-library.com", color: "#E33332", installCommand: "npm install @testing-library/react", icon: "https://testing-library.com/img/octopus-128x128.png" },

    // Authentication
    { id: "nextauth", name: "NextAuth.js", category: "Authentication", description: "Complete open source authentication solution for Next.js applications", website: "https://next-auth.js.org", color: "#EB5424", installCommand: "npm install next-auth", icon: "https://next-auth.js.org/img/logo/logo-sm.png" },
    { id: "auth0", name: "Auth0", category: "Authentication", description: "Secure access for everyone", website: "https://auth0.com", color: "#EB5424", installCommand: "npm install @auth0/nextjs-auth0", icon: "https://cdn.auth0.com/website/bob/press/auth0-press-kit/auth0-logo-mark.svg" },
    { id: "clerk", name: "Clerk", category: "Authentication", description: "More than authentication", website: "https://clerk.com", color: "#6C47FF", installCommand: "npm install @clerk/nextjs", icon: "https://clerk.com/favicon.ico" },
    { id: "supabase-auth", name: "Supabase Auth", category: "Authentication", description: "User management and authentication", website: "https://supabase.com/auth", color: "#3ECF8E", installCommand: "npm install @supabase/auth-ui-react", icon: "https://supabase.com/favicon/favicon-32x32.png" },
    { id: "firebase-auth", name: "Firebase Auth", category: "Authentication", description: "Simple, free multi-platform sign-in", website: "https://firebase.google.com/products/auth", color: "#FFCA28", installCommand: "npm install firebase", icon: "https://firebase.google.com/favicon.ico" },

    // State Management
    { id: "zustand", name: "Zustand", category: "State Management", description: "Small, fast and scalable bearbones state-management solution", website: "https://zustand-demo.pmnd.rs", color: "#443E38", installCommand: "npm install zustand", icon: "https://raw.githubusercontent.com/pmndrs/zustand/main/bear.jpg" },
    { id: "redux", name: "Redux Toolkit", category: "State Management", description: "The official, opinionated, batteries-included toolset for efficient Redux development", website: "https://redux-toolkit.js.org", color: "#764ABC", installCommand: "npm install @reduxjs/toolkit", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
    { id: "jotai", name: "Jotai", category: "State Management", description: "Primitive and flexible state management for React", website: "https://jotai.org", color: "#000000", installCommand: "npm install jotai", icon: "https://jotai.org/favicon.svg" },
    { id: "valtio", name: "Valtio", category: "State Management", description: "Makes proxy-state simple for React and Vanilla", website: "https://valtio.pmnd.rs", color: "#1E40AF", installCommand: "npm install valtio", icon: "https://valtio.pmnd.rs/favicon.ico" },
    { id: "recoil", name: "Recoil", category: "State Management", description: "Experimental state management library for React apps", website: "https://recoiljs.org", color: "#3578E5", installCommand: "npm install recoil", icon: "https://recoiljs.org/img/favicon.png" },

    // Build Tools
    { id: "vite", name: "Vite", category: "Build Tools", description: "Next generation frontend tooling", website: "https://vitejs.dev", color: "#646CFF", installCommand: "npm create vite@latest", icon: "https://vitejs.dev/logo.svg" },
    { id: "webpack", name: "Webpack", category: "Build Tools", description: "Static module bundler for modern JavaScript applications", website: "https://webpack.js.org", color: "#8DD6F9", installCommand: "npm install webpack", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg" },
    { id: "rollup", name: "Rollup", category: "Build Tools", description: "Module bundler for JavaScript", website: "https://rollupjs.org", color: "#EC4A3F", installCommand: "npm install rollup", icon: "https://rollupjs.org/favicon.png" },
    { id: "parcel", name: "Parcel", category: "Build Tools", description: "The zero configuration build tool for the web", website: "https://parceljs.org", color: "#E7A427", installCommand: "npm install parcel", icon: "https://parceljs.org/favicon.ico" },
    { id: "esbuild", name: "esbuild", category: "Build Tools", description: "An extremely fast JavaScript bundler", website: "https://esbuild.github.io", color: "#FFCF00", installCommand: "npm install esbuild", icon: "https://esbuild.github.io/favicon.svg" },

    // Hosting
    { id: "vercel", name: "Vercel", category: "Hosting", description: "Platform for frontend frameworks and static sites", website: "https://vercel.com", color: "#000000", installCommand: "npm install -g vercel", icon: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png" },
    { id: "netlify", name: "Netlify", category: "Hosting", description: "All-in-one platform for automating modern web projects", website: "https://netlify.com", color: "#00C7B7", installCommand: "npm install -g netlify-cli", icon: "https://www.netlify.com/v3/img/components/logomark.png" },
    { id: "railway", name: "Railway", category: "Hosting", description: "Deploy from GitHub with zero configuration", website: "https://railway.app", color: "#0B0D0E", installCommand: "npm install -g @railway/cli", icon: "https://railway.app/brand/logo-light.png" },
    { id: "render", name: "Render", category: "Hosting", description: "Cloud platform for developers and teams", website: "https://render.com", color: "#46E3B7", installCommand: "# Deploy via Git", icon: "https://render.com/favicon.ico" },
    { id: "fly", name: "Fly.io", category: "Hosting", description: "Deploy app servers close to your users", website: "https://fly.io", color: "#8B5CF6", installCommand: "npm install -g @fly/flyctl", icon: "https://fly.io/favicon.ico" },
    { id: "cloudflare-pages", name: "Cloudflare Pages", category: "Hosting", description: "JAMstack platform for frontend developers", website: "https://pages.cloudflare.com", color: "#F38020", installCommand: "npm install -g wrangler", icon: "https://www.cloudflare.com/favicon.ico" },
    { id: "aws", name: "AWS", category: "Hosting", description: "Amazon Web Services cloud platform", website: "https://aws.amazon.com", color: "#FF9900", installCommand: "npm install aws-cdk", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" },
    { id: "digitalocean", name: "DigitalOcean", category: "Hosting", description: "Cloud infrastructure for developers", website: "https://digitalocean.com", color: "#0080FF", installCommand: "npm install -g doctl", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg" }
];

const categories = [
    "Web Framework",
    "Native Framework",
    "Backend Framework",
    "CSS Framework",
    "Database",
    "Runtime",
    "ORM",
    "Monorepo",
    "Package Manager",
    "Testing",
    "Authentication",
    "State Management",
    "Build Tools",
    "Hosting"
];

export function TechStackBuilderContent() {
    const [selectedStack, setSelectedStack] = useState<TechStack>({});
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(categories));
    const [projectName, setProjectName] = useState("my-tech-genie-app");
    const { toast } = useToast();
    const searchParams = useSearchParams();

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
        const hasBun = selectedTechs.some(tech => tech.id === "bun");
        const packageManager = hasBun ? "bun" : "npm";
        return `${packageManager} create tech-genie@latest ${projectName}`;
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
        <div className="min-h-screen bg-[#0d1117] text-white flex">
            {/* Sidebar */}
            <div className="w-80 bg-[#161b22] border-r border-gray-800 flex flex-col h-screen overflow-hidden">
                {/* Project Name Section */}
                <div className="p-4 border-b border-gray-800 flex-shrink-0">
                    <label className="block text-sm text-gray-400 mb-2">Project Name:</label>
                    <Input
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="bg-[#0d1117] border-gray-700 text-white"
                        placeholder="my-tech-genie-app"
                    />
                </div>

                {/* Action Buttons */}
                <div className="p-4 border-b border-gray-800 flex-shrink-0">
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
                                navigator.clipboard.writeText(shareUrl);
                                toast({
                                    title: "Share link copied!",
                                    description: "Share this URL to let others see your tech stack.",
                                });
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
                <div className="p-4 border-b border-gray-800 flex-shrink-0">
                    <label className="block text-sm text-gray-400 mb-2">Generated Command:</label>
                    <div className="flex gap-2">
                        <Input
                            value={generateCommand()}
                            readOnly
                            className="bg-[#0d1117] border-gray-700 text-white text-sm font-mono flex-1"
                            placeholder="Select technologies to generate command..."
                        />
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={copyCommand}
                            disabled={!generateCommand()}
                            className="bg-[#0d1117] border-gray-700 text-white hover:bg-gray-800 disabled:opacity-50"
                        >
                            <Copy className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Selected Stack */}
                <div className="p-4 border-b border-gray-800 flex-shrink-0">
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-gray-400">Selected Stack ({getTotalSelected()})</label>
                    </div>
                    <div className="h-32 overflow-y-auto">
                        <div className="space-y-1">
                            {Object.entries(selectedStack).map(([category, techs]) => (
                                <div key={category}>
                                    <div className="text-xs text-gray-500 font-medium mb-1">{category}</div>
                                    {techs.map((tech) => (
                                        <div key={tech.id} className="flex items-center justify-between bg-[#0d1117] rounded px-2 py-1 mb-1">
                                            <div className="flex items-center gap-2">
                                                <Image
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
                <div className="p-4 flex-shrink-0">
                    <label className="block text-sm text-gray-400 mb-2">Quick Presets:</label>
                    <div className="space-y-1">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => applyPreset('default')}
                            className="w-full justify-start bg-[#0d1117] border-gray-700 text-white hover:bg-gray-800 text-xs"
                        >
                            Default Stack
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => applyPreset('convex-react')}
                            className="w-full justify-start bg-[#0d1117] border-gray-700 text-white hover:bg-gray-800 text-xs"
                        >
                            Convex + React
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => applyPreset('mobile')}
                            className="w-full justify-start bg-[#0d1117] border-gray-700 text-white hover:bg-gray-800 text-xs"
                        >
                            Mobile App
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => applyPreset('api-only')}
                            className="w-full justify-start bg-[#0d1117] border-gray-700 text-white hover:bg-gray-800 text-xs"
                        >
                            API Only
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => applyPreset('full-featured')}
                            className="w-full justify-start bg-[#0d1117] border-gray-700 text-white hover:bg-gray-800 text-xs"
                        >
                            Full Featured
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-gray-800 flex-shrink-0">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Tech Genie Stack Builder</h1>
                            <p className="text-gray-400">Build your perfect tech stack with AI-powered recommendations</p>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Search technologies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-[#161b22] border-gray-700 text-white placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* Technology Grid */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-6">
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
                                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
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
                                                                    <CardContent className="p-4">
                                                                        <div className="flex items-start justify-between mb-3">
                                                                            <div className="flex items-center gap-3">
                                                                                <Image
                                                                                    src={tech.icon}
                                                                                    alt={tech.name}
                                                                                    width={32}
                                                                                    height={32}
                                                                                    className="rounded"
                                                                                />
                                                                                <div>
                                                                                    <h3 className="font-semibold text-white text-sm">{tech.name}</h3>
                                                                                </div>
                                                                            </div>
                                                                            {isSelected && (
                                                                                <motion.div
                                                                                    initial={{ scale: 0 }}
                                                                                    animate={{ scale: 1 }}
                                                                                    className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
                                                                                >
                                                                                    <Plus className="w-3 h-3 text-white rotate-45" />
                                                                                </motion.div>
                                                                            )}
                                                                        </div>
                                                                        <p className="text-gray-400 text-xs leading-relaxed">
                                                                            {tech.description}
                                                                        </p>
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
        </div>
    );
}