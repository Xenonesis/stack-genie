import { Technology } from '@/types/tech-stack';

export const technologyData: Technology[] = [
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
    { id: "astro", name: "Astro", category: "Web Framework", description: "The web framework for content-driven websites", website: "https://astro.build", color: "#FF5D01", installCommand: "npm create astro@latest", icon: "https://avatars.githubusercontent.com/u/44914786?s=200&v=4" },
    { id: "solid", name: "SolidJS", category: "Web Framework", description: "Simple and performant reactivity for building user interfaces", website: "https://solidjs.com", color: "#2C4F7C", installCommand: "npx degit solidjs/templates/js my-app", icon: "https://avatars.githubusercontent.com/u/79330284?s=200&v=4" },
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
    { id: "bun", name: "Bun", category: "Runtime", description: "Fast all-in-one JavaScript runtime", website: "https://bun.sh", color: "#FBF0DF", installCommand: "curl -fsSL https://bun.sh/install | bash", icon: "https://avatars.githubusercontent.com/u/99155232?s=200&v=4" },
    { id: "nodejs", name: "Node.js", category: "Runtime", description: "JavaScript runtime built on Chrome's V8 engine", website: "https://nodejs.org", color: "#339933", installCommand: "# Install from nodejs.org", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { id: "deno", name: "Deno", category: "Runtime", description: "A secure runtime for JavaScript and TypeScript", website: "https://deno.land", color: "#000000", installCommand: "curl -fsSL https://deno.land/install.sh | sh", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/denojs/denojs-original.svg" },

    // Backend Framework
    { id: "hono", name: "Hono", category: "Backend Framework", description: "Fast, lightweight web framework", website: "https://hono.dev", color: "#E36002", installCommand: "npm install hono", icon: "https://avatars.githubusercontent.com/u/78773850?s=200&v=4" },
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
    { id: "expo", name: "Expo", category: "Native Framework", description: "Platform for making universal native apps with React", website: "https://expo.dev", color: "#000020", installCommand: "npm install -g @expo/cli", icon: "https://avatars.githubusercontent.com/u/12504344?s=200&v=4" },
    { id: "tauri", name: "Tauri", category: "Native Framework", description: "Build smaller, faster, and more secure desktop applications", website: "https://tauri.app", color: "#FFC131", installCommand: "npm install @tauri-apps/cli", icon: "https://avatars.githubusercontent.com/u/54536011?s=200&v=4" },
    { id: "electron", name: "Electron", category: "Native Framework", description: "Build cross-platform desktop apps with JavaScript, HTML, and CSS", website: "https://electronjs.org", color: "#47848F", installCommand: "npm install electron", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg" },

    // ORM
    { id: "prisma", name: "Prisma", category: "ORM", description: "Next-generation Node.js and TypeScript ORM", website: "https://prisma.io", color: "#2D3748", installCommand: "npm install prisma", icon: "https://avatars.githubusercontent.com/u/17219288?s=200&v=4" },
    { id: "drizzle", name: "Drizzle ORM", category: "ORM", description: "TypeScript ORM that is production ready", website: "https://orm.drizzle.team", color: "#C5F74F", installCommand: "npm install drizzle-orm", icon: "https://orm.drizzle.team/favicon.ico" },
    { id: "typeorm", name: "TypeORM", category: "ORM", description: "ORM for TypeScript and JavaScript", website: "https://typeorm.io", color: "#E83524", installCommand: "npm install typeorm", icon: "https://avatars.githubusercontent.com/u/20165699?s=200&v=4" },
    { id: "sequelize", name: "Sequelize", category: "ORM", description: "Promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server", website: "https://sequelize.org", color: "#52B0E7", installCommand: "npm install sequelize", icon: "https://avatars.githubusercontent.com/u/3591786?s=200&v=4" },
    { id: "mongoose", name: "Mongoose", category: "ORM", description: "Elegant mongodb object modeling for node.js", website: "https://mongoosejs.com", color: "#880000", installCommand: "npm install mongoose", icon: "https://avatars.githubusercontent.com/u/7552965?s=200&v=4" },

    // Monorepo
    { id: "turborepo", name: "Turborepo", category: "Monorepo", description: "High-performance build system for JavaScript and TypeScript codebases", website: "https://turbo.build", color: "#EF4444", installCommand: "npm install turbo", icon: "https://avatars.githubusercontent.com/u/84177906?s=200&v=4" },
    { id: "nx", name: "Nx", category: "Monorepo", description: "Smart, fast and extensible build system", website: "https://nx.dev", color: "#143055", installCommand: "npx create-nx-workspace", icon: "https://avatars.githubusercontent.com/u/23692104?s=200&v=4" },
    { id: "lerna", name: "Lerna", category: "Monorepo", description: "A tool for managing JavaScript projects with multiple packages", website: "https://lerna.js.org", color: "#9333EA", installCommand: "npm install lerna", icon: "https://avatars.githubusercontent.com/u/19333396?s=200&v=4" },
    { id: "rush", name: "Rush", category: "Monorepo", description: "Scalable monorepo manager for the web", website: "https://rushjs.io", color: "#087CFA", installCommand: "npm install -g @microsoft/rush", icon: "https://avatars.githubusercontent.com/u/19333396?s=200&v=4" },

    // Package Manager
    { id: "npm", name: "npm", category: "Package Manager", description: "Node package manager", website: "https://npmjs.com", color: "#CB3837", installCommand: "# Built into Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" },
    { id: "yarn", name: "Yarn", category: "Package Manager", description: "Fast, reliable, and secure dependency management", website: "https://yarnpkg.com", color: "#2C8EBB", installCommand: "npm install -g yarn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yarn/yarn-original.svg" },
    { id: "pnpm", name: "pnpm", category: "Package Manager", description: "Fast, disk space efficient package manager", website: "https://pnpm.io", color: "#F69220", installCommand: "npm install -g pnpm", icon: "https://pnpm.io/img/pnpm-no-name-with-frame.svg" },
    { id: "bun-pm", name: "Bun (Package Manager)", category: "Package Manager", description: "Ultra-fast package manager", website: "https://bun.sh", color: "#FBF0DF", installCommand: "curl -fsSL https://bun.sh/install | bash", icon: "https://avatars.githubusercontent.com/u/99155232?s=200&v=4" },

    // Testing
    { id: "jest", name: "Jest", category: "Testing", description: "Delightful JavaScript testing framework", website: "https://jestjs.io", color: "#C21325", installCommand: "npm install jest", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
    { id: "vitest", name: "Vitest", category: "Testing", description: "A blazing fast unit test framework powered by Vite", website: "https://vitest.dev", color: "#6E9F18", installCommand: "npm install vitest", icon: "https://avatars.githubusercontent.com/u/95747107?s=200&v=4" },
    { id: "cypress", name: "Cypress", category: "Testing", description: "Fast, easy and reliable testing for anything that runs in a browser", website: "https://cypress.io", color: "#17202C", installCommand: "npm install cypress", icon: "https://asset.brandfetch.io/idIq_kF0rb/idv3zwmSiY.jpeg" },
    { id: "playwright", name: "Playwright", category: "Testing", description: "Fast and reliable end-to-end testing for modern web apps", website: "https://playwright.dev", color: "#2EAD33", installCommand: "npm install @playwright/test", icon: "https://playwright.dev/img/playwright-logo.svg" },
    { id: "testing-library", name: "Testing Library", category: "Testing", description: "Simple and complete testing utilities", website: "https://testing-library.com", color: "#E33332", installCommand: "npm install @testing-library/react", icon: "https://testing-library.com/img/octopus-128x128.png" },

    // Authentication
    { id: "nextauth", name: "NextAuth.js", category: "Authentication", description: "Complete open source authentication solution for Next.js applications", website: "https://next-auth.js.org", color: "#EB5424", installCommand: "npm install next-auth", icon: "https://avatars.githubusercontent.com/u/67470890?s=200&v=4" },
    { id: "auth0", name: "Auth0", category: "Authentication", description: "Secure access for everyone", website: "https://auth0.com", color: "#EB5424", installCommand: "npm install @auth0/nextjs-auth0", icon: "https://avatars.githubusercontent.com/u/2824157?s=200&v=4" },
    { id: "clerk", name: "Clerk", category: "Authentication", description: "More than authentication", website: "https://clerk.com", color: "#6C47FF", installCommand: "npm install @clerk/nextjs", icon: "https://avatars.githubusercontent.com/u/49538330?s=200&v=4" },
    { id: "supabase-auth", name: "Supabase Auth", category: "Authentication", description: "User management and authentication", website: "https://supabase.com/auth", color: "#3ECF8E", installCommand: "npm install @supabase/auth-ui-react", icon: "https://supabase.com/favicon/favicon-32x32.png" },
    { id: "firebase-auth", name: "Firebase Auth", category: "Authentication", description: "Simple, free multi-platform sign-in", website: "https://firebase.google.com/products/auth", color: "#FFCA28", installCommand: "npm install firebase", icon: "https://firebase.google.com/favicon.ico" },

    // State Management
    { id: "zustand", name: "Zustand", category: "State Management", description: "Small, fast and scalable bearbones state-management solution", website: "https://zustand-demo.pmnd.rs", color: "#443E38", installCommand: "npm install zustand", icon: "https://avatars.githubusercontent.com/u/45790596?s=200&v=4" },
    { id: "redux", name: "Redux Toolkit", category: "State Management", description: "The official, opinionated, batteries-included toolset for efficient Redux development", website: "https://redux-toolkit.js.org", color: "#764ABC", installCommand: "npm install @reduxjs/toolkit", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
    { id: "jotai", name: "Jotai", category: "State Management", description: "Primitive and flexible state management for React", website: "https://jotai.org", color: "#000000", installCommand: "npm install jotai", icon: "https://jotai.org/favicon.svg" },
    { id: "valtio", name: "Valtio", category: "State Management", description: "Makes proxy-state simple for React and Vanilla", website: "https://valtio.pmnd.rs", color: "#1E40AF", installCommand: "npm install valtio", icon: "https://valtio.pmnd.rs/favicon.ico" },
    { id: "recoil", name: "Recoil", category: "State Management", description: "Experimental state management library for React apps", website: "https://recoiljs.org", color: "#3578E5", installCommand: "npm install recoil", icon: "https://recoiljs.org/img/favicon.png" },

    // Build Tools
    { id: "vite", name: "Vite", category: "Build Tools", description: "Next generation frontend tooling", website: "https://vitejs.dev", color: "#646CFF", installCommand: "npm create vite@latest", icon: "https://vitejs.dev/logo.svg" },
    { id: "webpack", name: "Webpack", category: "Build Tools", description: "Static module bundler for modern JavaScript applications", website: "https://webpack.js.org", color: "#8DD6F9", installCommand: "npm install webpack", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg" },
    { id: "rollup", name: "Rollup", category: "Build Tools", description: "Module bundler for JavaScript", website: "https://rollupjs.org", color: "#EC4A3F", installCommand: "npm install rollup", icon: "https://rollupjs.org/favicon.png" },
    { id: "parcel", name: "Parcel", category: "Build Tools", description: "The zero configuration build tool for the web", website: "https://parceljs.org", color: "#E7A427", installCommand: "npm install parcel", icon: "https://avatars.githubusercontent.com/u/22735755?s=200&v=4" },
    { id: "esbuild", name: "esbuild", category: "Build Tools", description: "An extremely fast JavaScript bundler", website: "https://esbuild.github.io", color: "#FFCF00", installCommand: "npm install esbuild", icon: "https://esbuild.github.io/favicon.svg" },

    // Hosting
    { id: "vercel", name: "Vercel", category: "Hosting", description: "Platform for frontend frameworks and static sites", website: "https://vercel.com", color: "#000000", installCommand: "npm install -g vercel", icon: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png" },
    { id: "netlify", name: "Netlify", category: "Hosting", description: "All-in-one platform for automating modern web projects", website: "https://netlify.com", color: "#00C7B7", installCommand: "npm install -g netlify-cli", icon: "https://www.netlify.com/v3/img/components/logomark.png" },
    { id: "railway", name: "Railway", category: "Hosting", description: "Deploy from GitHub with zero configuration", website: "https://railway.app", color: "#0B0D0E", installCommand: "npm install -g @railway/cli", icon: "https://railway.app/brand/logo-light.png" },
    { id: "render", name: "Render", category: "Hosting", description: "Cloud platform for developers and teams", website: "https://render.com", color: "#46E3B7", installCommand: "# Deploy via Git", icon: "https://avatars.githubusercontent.com/u/36424661?s=200&v=4" },
    { id: "fly", name: "Fly.io", category: "Hosting", description: "Deploy app servers close to your users", website: "https://fly.io", color: "#8B5CF6", installCommand: "npm install -g @fly/flyctl", icon: "https://avatars.githubusercontent.com/u/22525303?s=200&v=4" },
    { id: "cloudflare-pages", name: "Cloudflare Pages", category: "Hosting", description: "JAMstack platform for frontend developers", website: "https://pages.cloudflare.com", color: "#F38020", installCommand: "npm install -g wrangler", icon: "https://www.cloudflare.com/favicon.ico" },
    { id: "aws", name: "AWS", category: "Hosting", description: "Amazon Web Services cloud platform", website: "https://aws.amazon.com", color: "#FF9900", installCommand: "npm install aws-cdk", icon: "https://avatars.githubusercontent.com/u/2232217?s=200&v=4" },
    { id: "digitalocean", name: "DigitalOcean", category: "Hosting", description: "Cloud infrastructure for developers", website: "https://digitalocean.com", color: "#0080FF", installCommand: "npm install -g doctl", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg" }
];

export const categories = [
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