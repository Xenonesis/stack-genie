import { TechStack, Technology } from "@/types/tech-stack";
import { callAI } from "./ai";
import { logger } from "@/lib/logger";

/**
 * Generates installation command based on selected tech stack
 * @param selectedStack The selected technologies organized by category
 * @param projectName The name of the project
 * @returns Command string to set up the project
 */
export const generateCommand = (selectedStack: TechStack, projectName: string): string => {
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
                const ionicType = (webFramework as Technology | undefined)?.id === "vue" ? "vue" : 
                                 (webFramework as Technology | undefined)?.id === "angular" ? "angular" : "react";
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

/**
 * Generates an AI-optimized command sequence for project setup
 * @param selectedStack The selected technologies
 * @param projectName The project name
 * @param projectDescription Description of the project
 * @returns Optimized command string or basic command if AI fails
 */
export const generateSmartCommand = async (
    selectedStack: TechStack,
    projectName: string,
    projectDescription: string
): Promise<string> => {
    const basicCommand = generateCommand(selectedStack, projectName);
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
        logger.error('Smart command generation failed:', error);
        return basicCommand;
    }
};
