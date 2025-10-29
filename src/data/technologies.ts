import { Technology } from '@/types/tech-stack';

export const technologyData: Technology[] = [
    // Web Framework
    { id: "react", name: "React", category: "Web Framework", description: "A JavaScript library for building user interfaces", website: "https://reactjs.org", color: "#61DAFB", npm: "npm install react", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { id: "tanstack-router", name: "TanStack Router", category: "Web Framework", description: "Type-safe router for React applications", website: "https://tanstack.com/router", color: "#FD4F00", npm: "npm install @tanstack/react-router", icon: "https://avatars.githubusercontent.com/u/72518640?s=200&v=4" },
    { id: "nextjs", name: "Next.js", category: "Web Framework", description: "The React Framework for Production", website: "https://nextjs.org", color: "#000000", npm: "npx create-next-app@latest", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { id: "vue", name: "Vue.js", category: "Web Framework", description: "The Progressive JavaScript Framework", website: "https://vuejs.org", color: "#4FC08D", npm: "npm install vue", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
    { id: "nuxt", name: "Nuxt.js", category: "Web Framework", description: "The Intuitive Vue Framework", website: "https://nuxt.com", color: "#00DC82", npm: "npx nuxi@latest init", icon: "https://nuxt.com/assets/design-kit/icon-green.png" },
    { id: "angular", name: "Angular", category: "Web Framework", description: "Platform for building mobile and desktop web applications", website: "https://angular.io", color: "#DD0031", npm: "npm install -g @angular/cli", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
    { id: "svelte", name: "Svelte", category: "Web Framework", description: "Cybernetically enhanced web apps", website: "https://svelte.dev", color: "#FF3E00", npm: "npm create svelte@latest my-app", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg" },
    { id: "sveltekit", name: "SvelteKit", category: "Web Framework", description: "The fastest way to build svelte apps", website: "https://kit.svelte.dev", color: "#FF3E00", npm: "npm create sveltekit@latest", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg" },
    { id: "remix", name: "Remix", category: "Web Framework", description: "Full stack web framework focused on web standards", website: "https://remix.run", color: "#000000", npm: "npx create-remix@latest", icon: "https://avatars.githubusercontent.com/u/64235328?s=200&v=4" },
    { id: "astro", name: "Astro", category: "Web Framework", description: "The web framework for content-driven websites", website: "https://astro.build", color: "#FF5D01", npm: "npm create astro@latest", icon: "https://avatars.githubusercontent.com/u/44914786?s=200&v=4" },
    { id: "solid", name: "SolidJS", category: "Web Framework", description: "Simple and performant reactivity for building user interfaces", website: "https://solidjs.com", color: "#2C4F7C", npm: "npx degit solidjs/templates/js my-app", icon: "https://avatars.githubusercontent.com/u/79330284?s=200&v=4" },
    { id: "qwik", name: "Qwik", category: "Web Framework", description: "The HTML-first framework", website: "https://qwik.builder.io", color: "#AC7EF4", npm: "npm create qwik@latest", icon: "https://qwik.builder.io/logos/qwik-logo.svg" },

    // Database
    { id: "sqlite", name: "SQLite", category: "Database", description: "Self-contained, serverless, zero-configuration SQL database", website: "https://sqlite.org", color: "#003B57", npm: "npm install sqlite3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
    { id: "postgresql", name: "PostgreSQL", category: "Database", description: "Advanced open source relational database", website: "https://postgresql.org", color: "#336791", npm: "npm install pg", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { id: "mongodb", name: "MongoDB", category: "Database", description: "Document-oriented NoSQL database", website: "https://mongodb.com", color: "#47A248", npm: "npm install mongodb", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { id: "mysql", name: "MySQL", category: "Database", description: "The world's most popular open source database", website: "https://mysql.com", color: "#4479A1", npm: "npm install mysql2", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { id: "redis", name: "Redis", category: "Database", description: "In-memory data structure store", website: "https://redis.io", color: "#DC382D", npm: "npm install redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    { id: "supabase", name: "Supabase", category: "Database", description: "Open source Firebase alternative", website: "https://supabase.com", color: "#3ECF8E", npm: "npm install @supabase/supabase-js", icon: "https://supabase.com/favicon/favicon-32x32.png" },
    { id: "planetscale", name: "PlanetScale", category: "Database", description: "The MySQL-compatible serverless database platform", website: "https://planetscale.com", color: "#000000", npm: "npm install @planetscale/database", icon: "https://planetscale.com/favicon.ico" },
    { id: "turso", name: "Turso", category: "Database", description: "SQLite for Production", website: "https://turso.tech", color: "#4FF8D2", npm: "npm install @libsql/client", icon: "https://turso.tech/favicon.ico" },
    { id: "dynamodb", name: "DynamoDB", category: "Database", description: "NoSQL database service", website: "https://aws.amazon.com/dynamodb", color: "#FF9900", icon: "https://avatars.githubusercontent.com/u/2232217?s=200&v=4", npm: "npm install @aws-sdk/client-dynamodb" },
    { id: "cockroachdb", name: "CockroachDB", category: "Database", description: "Distributed SQL database", website: "https://cockroachlabs.com", color: "#6933FF", icon: "https://avatars.githubusercontent.com/u/6748139?s=200&v=4", npm: "npm install pg" },
    { id: "neon", name: "Neon", category: "Database", description: "Serverless Postgres", website: "https://neon.tech", color: "#00E599", icon: "https://neon.tech/favicon/favicon-32x32.png", npm: "npm install @neondatabase/serverless" },
    { id: "xata", name: "Xata", category: "Database", description: "Serverless database with built-in search", website: "https://xata.io", color: "#7C3AED", icon: "https://xata.io/favicon.ico", npm: "npm install @xata.io/client" },

    // Runtime
    { id: "bun", name: "Bun", category: "Runtime", description: "Fast all-in-one JavaScript runtime", website: "https://bun.sh", color: "#FBF0DF", npm: "curl -fsSL https://bun.sh/install | bash", icon: "https://avatars.githubusercontent.com/u/99155232?s=200&v=4" },
    { id: "nodejs", name: "Node.js", category: "Runtime", description: "JavaScript runtime built on Chrome's V8 engine", website: "https://nodejs.org", color: "#339933", npm: "# Install from nodejs.org", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { id: "deno", name: "Deno", category: "Runtime", description: "A secure runtime for JavaScript and TypeScript", website: "https://deno.land", color: "#000000", npm: "curl -fsSL https://deno.land/install.sh | sh", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/denojs/denojs-original.svg" },

    // Backend Framework
    { id: "hono", name: "Hono", category: "Backend Framework", description: "Fast, lightweight web framework", website: "https://hono.dev", color: "#E36002", npm: "npm install hono", icon: "https://avatars.githubusercontent.com/u/78773850?s=200&v=4" },
    { id: "express", name: "Express.js", category: "Backend Framework", description: "Fast, unopinionated, minimalist web framework for Node.js", website: "https://expressjs.com", color: "#000000", npm: "npm install express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { id: "fastify", name: "Fastify", category: "Backend Framework", description: "Fast and low overhead web framework for Node.js", website: "https://fastify.io", color: "#000000", npm: "npm install fastify", icon: "https://avatars.githubusercontent.com/u/24939410?s=200&v=4" },
    { id: "nestjs", name: "NestJS", category: "Backend Framework", description: "A progressive Node.js framework for building efficient server-side applications", website: "https://nestjs.com", color: "#E0234E", npm: "npm install @nestjs/core", icon: "https://avatars.githubusercontent.com/u/28507035?s=200&v=4" },
    { id: "koa", name: "Koa.js", category: "Backend Framework", description: "Expressive middleware for node.js using ES2017 async functions", website: "https://koajs.com", color: "#33333D", npm: "npm install koa", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { id: "trpc", name: "tRPC", category: "Backend Framework", description: "End-to-end typesafe APIs made easy", website: "https://trpc.io", color: "#398CCB", npm: "npm install @trpc/server", icon: "https://trpc.io/img/logo.svg" },
    { id: "adonisjs", name: "AdonisJS", category: "Backend Framework", description: "Node.js web framework", website: "https://adonisjs.com", color: "#220052", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/adonisjs/adonisjs-original.svg", npm: "npm init adonisjs@latest" },
    { id: "elysia", name: "Elysia", category: "Backend Framework", description: "Fast and ergonomic Bun web framework", website: "https://elysiajs.com", color: "#7C3AED", icon: "https://elysiajs.com/assets/elysia.svg", npm: "bun add elysia" },

    // CSS Framework
    { id: "tailwind", name: "Tailwind CSS", category: "CSS Framework", description: "Utility-first CSS framework", website: "https://tailwindcss.com", color: "#06B6D4", npm: "npm install tailwindcss", icon: "https://avatars.githubusercontent.com/u/67109815?s=200&v=4" },
    { id: "bootstrap", name: "Bootstrap", category: "CSS Framework", description: "The most popular HTML, CSS, and JS library", website: "https://getbootstrap.com", color: "#7952B3", npm: "npm install bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
    { id: "chakra", name: "Chakra UI", category: "CSS Framework", description: "Simple, modular and accessible component library", website: "https://chakra-ui.com", color: "#319795", npm: "npm install @chakra-ui/react", icon: "https://avatars.githubusercontent.com/u/54212428?s=200&v=4" },
    { id: "mui", name: "Material-UI", category: "CSS Framework", description: "React components for faster and easier web development", website: "https://mui.com", color: "#007FFF", npm: "npm install @mui/material", icon: "https://mui.com/static/logo.png" },
    { id: "antd", name: "Ant Design", category: "CSS Framework", description: "Enterprise-class UI design language and React UI library", website: "https://ant.design", color: "#1890FF", npm: "npm install antd", icon: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" },
    { id: "mantine", name: "Mantine", category: "CSS Framework", description: "Full-featured React components library", website: "https://mantine.dev", color: "#339AF0", npm: "npm install @mantine/core", icon: "https://mantine.dev/favicon.svg" },
    { id: "shadcn", name: "shadcn/ui", category: "CSS Framework", description: "Beautifully designed components built with Radix UI and Tailwind CSS", website: "https://ui.shadcn.com", color: "#000000", npm: "npx shadcn-ui@latest init", icon: "https://ui.shadcn.com/favicon.ico" },
    { id: "panda-css", name: "Panda CSS", category: "CSS Framework", description: "Zero-runtime CSS-in-JS", website: "https://panda-css.com", color: "#FED7AA", icon: "https://panda-css.com/favicon.ico", npm: "npm install -D @pandacss/dev" },
    { id: "unocss", name: "UnoCSS", category: "CSS Framework", description: "Instant on-demand atomic CSS engine", website: "https://unocss.dev", color: "#333333", icon: "https://unocss.dev/favicon.svg", npm: "npm install -D unocss" },
    { id: "styled-components", name: "Styled Components", category: "CSS Framework", description: "CSS-in-JS library", website: "https://styled-components.com", color: "#DB7093", icon: "https://styled-components.com/favicon.png", npm: "npm install styled-components" },
    { id: "emotion", name: "Emotion", category: "CSS Framework", description: "CSS-in-JS library", website: "https://emotion.sh", color: "#D26AC2", icon: "https://avatars.githubusercontent.com/u/28973759?s=200&v=4", npm: "npm install @emotion/react @emotion/styled" },

    // Native Framework
    { id: "reactnative", name: "React Native", category: "Native Framework", description: "Create native apps for Android and iOS using React", website: "https://reactnative.dev", color: "#61DAFB", npm: "npx react-native init", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { id: "flutter", name: "Flutter", category: "Native Framework", description: "Google's UI toolkit for building natively compiled applications", website: "https://flutter.dev", color: "#02569B", npm: "flutter create my_app", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
    { id: "ionic", name: "Ionic", category: "Native Framework", description: "Cross-platform mobile app development", website: "https://ionicframework.com", color: "#3880FF", npm: "npm install -g @ionic/cli", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg" },
    { id: "expo", name: "Expo", category: "Native Framework", description: "Platform for making universal native apps with React", website: "https://expo.dev", color: "#000020", npm: "npm install -g @expo/cli", icon: "https://avatars.githubusercontent.com/u/12504344?s=200&v=4" },
    { id: "tauri", name: "Tauri", category: "Native Framework", description: "Build smaller, faster, and more secure desktop applications", website: "https://tauri.app", color: "#FFC131", npm: "npm install @tauri-apps/cli", icon: "https://avatars.githubusercontent.com/u/54536011?s=200&v=4" },
    { id: "electron", name: "Electron", category: "Native Framework", description: "Build cross-platform desktop apps with JavaScript, HTML, and CSS", website: "https://electronjs.org", color: "#47848F", npm: "npm install electron", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg" },

    // ORM
    { id: "prisma", name: "Prisma", category: "ORM", description: "Next-generation Node.js and TypeScript ORM", website: "https://prisma.io", color: "#2D3748", npm: "npm install prisma", icon: "https://avatars.githubusercontent.com/u/17219288?s=200&v=4" },
    { id: "drizzle", name: "Drizzle ORM", category: "ORM", description: "TypeScript ORM that is production ready", website: "https://orm.drizzle.team", color: "#C5F74F", npm: "npm install drizzle-orm", icon: "https://orm.drizzle.team/favicon.ico" },
    { id: "typeorm", name: "TypeORM", category: "ORM", description: "ORM for TypeScript and JavaScript", website: "https://typeorm.io", color: "#E83524", npm: "npm install typeorm", icon: "https://avatars.githubusercontent.com/u/20165699?s=200&v=4" },
    { id: "sequelize", name: "Sequelize", category: "ORM", description: "Promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server", website: "https://sequelize.org", color: "#52B0E7", npm: "npm install sequelize", icon: "https://avatars.githubusercontent.com/u/3591786?s=200&v=4" },
    { id: "mongoose", name: "Mongoose", category: "ORM", description: "Elegant mongodb object modeling for node.js", website: "https://mongoosejs.com", color: "#880000", npm: "npm install mongoose", icon: "https://avatars.githubusercontent.com/u/7552965?s=200&v=4" },

    // Monorepo
    { id: "turborepo", name: "Turborepo", category: "Monorepo", description: "High-performance build system for JavaScript and TypeScript codebases", website: "https://turbo.build", color: "#EF4444", npm: "npm install turbo", icon: "https://avatars.githubusercontent.com/u/84177906?s=200&v=4" },
    { id: "nx", name: "Nx", category: "Monorepo", description: "Smart, fast and extensible build system", website: "https://nx.dev", color: "#143055", npm: "npx create-nx-workspace", icon: "https://avatars.githubusercontent.com/u/23692104?s=200&v=4" },
    { id: "lerna", name: "Lerna", category: "Monorepo", description: "A tool for managing JavaScript projects with multiple packages", website: "https://lerna.js.org", color: "#9333EA", npm: "npm install lerna", icon: "https://avatars.githubusercontent.com/u/19333396?s=200&v=4" },
    { id: "rush", name: "Rush", category: "Monorepo", description: "Scalable monorepo manager for the web", website: "https://rushjs.io", color: "#087CFA", npm: "npm install -g @microsoft/rush", icon: "https://avatars.githubusercontent.com/u/19333396?s=200&v=4" },

    // Package Manager
    { id: "npm", name: "npm", category: "Package Manager", description: "Node package manager", website: "https://npmjs.com", color: "#CB3837", npm: "# Built into Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" },
    { id: "yarn", name: "Yarn", category: "Package Manager", description: "Fast, reliable, and secure dependency management", website: "https://yarnpkg.com", color: "#2C8EBB", npm: "npm install -g yarn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yarn/yarn-original.svg" },
    { id: "pnpm", name: "pnpm", category: "Package Manager", description: "Fast, disk space efficient package manager", website: "https://pnpm.io", color: "#F69220", npm: "npm install -g pnpm", icon: "https://pnpm.io/img/pnpm-no-name-with-frame.svg" },
    { id: "bun-pm", name: "Bun (Package Manager)", category: "Package Manager", description: "Ultra-fast package manager", website: "https://bun.sh", color: "#FBF0DF", npm: "curl -fsSL https://bun.sh/install | bash", icon: "https://avatars.githubusercontent.com/u/99155232?s=200&v=4" },

    // Testing
    { id: "jest", name: "Jest", category: "Testing", description: "Delightful JavaScript testing framework", website: "https://jestjs.io", color: "#C21325", npm: "npm install jest", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
    { id: "vitest", name: "Vitest", category: "Testing", description: "A blazing fast unit test framework powered by Vite", website: "https://vitest.dev", color: "#6E9F18", npm: "npm install vitest", icon: "https://avatars.githubusercontent.com/u/95747107?s=200&v=4" },
    { id: "cypress", name: "Cypress", category: "Testing", description: "Fast, easy and reliable testing for anything that runs in a browser", website: "https://cypress.io", color: "#17202C", npm: "npm install cypress", icon: "https://avatars.githubusercontent.com/u/8908513?s=200&v=4" },
    { id: "playwright", name: "Playwright", category: "Testing", description: "Fast and reliable end-to-end testing for modern web apps", website: "https://playwright.dev", color: "#2EAD33", npm: "npm install @playwright/test", icon: "https://playwright.dev/img/playwright-logo.svg" },
    { id: "testing-library", name: "Testing Library", category: "Testing", description: "Simple and complete testing utilities", website: "https://testing-library.com", color: "#E33332", npm: "npm install @testing-library/react", icon: "https://testing-library.com/img/octopus-128x128.png" },
    { id: "storybook", name: "Storybook", category: "Testing", description: "UI component development environment", website: "https://storybook.js.org", color: "#FF4785", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/storybook/storybook-original.svg", npm: "npx storybook@latest init" },
    { id: "msw", name: "Mock Service Worker (MSW)", category: "Testing", description: "API mocking library", website: "https://mswjs.io", color: "#FF6A33", icon: "https://avatars.githubusercontent.com/u/64637271?s=200&v=4", npm: "npm install msw" },

    // Authentication
    { id: "nextauth", name: "NextAuth.js", category: "Authentication", description: "Complete open source authentication solution for Next.js applications", website: "https://next-auth.js.org", color: "#EB5424", npm: "npm install next-auth", icon: "https://avatars.githubusercontent.com/u/67470890?s=200&v=4" },
    { id: "auth0", name: "Auth0", category: "Authentication", description: "Secure access for everyone", website: "https://auth0.com", color: "#EB5424", npm: "npm install @auth0/nextjs-auth0", icon: "https://avatars.githubusercontent.com/u/2824157?s=200&v=4" },
    { id: "clerk", name: "Clerk", category: "Authentication", description: "More than authentication", website: "https://clerk.com", color: "#6C47FF", npm: "npm install @clerk/nextjs", icon: "https://avatars.githubusercontent.com/u/49538330?s=200&v=4" },
    { id: "supabase-auth", name: "Supabase Auth", category: "Authentication", description: "User management and authentication", website: "https://supabase.com/auth", color: "#3ECF8E", npm: "npm install @supabase/auth-ui-react", icon: "https://supabase.com/favicon/favicon-32x32.png" },
    { id: "firebase-auth", name: "Firebase Auth", category: "Authentication", description: "Simple, free multi-platform sign-in", website: "https://firebase.google.com/products/auth", color: "#FFCA28", npm: "npm install firebase", icon: "https://firebase.google.com/favicon.ico" },
    { id: "lucia", name: "Lucia", category: "Authentication", description: "Authentication library for TypeScript", website: "https://lucia-auth.com", color: "#5F57FF", icon: "https://avatars.githubusercontent.com/u/89729670?s=200&v=4", npm: "npm install lucia" },
    { id: "better-auth", name: "Better Auth", category: "Authentication", description: "The most comprehensive authentication framework", website: "https://better-auth.com", color: "#10B981", icon: "https://avatars.githubusercontent.com/u/180618636?s=200&v=4", npm: "npm install better-auth" },
    { id: "passport", name: "Passport.js", category: "Authentication", description: "Authentication middleware for Node.js", website: "https://passportjs.org", color: "#34E27A", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", npm: "npm install passport" },

    // State Management
    { id: "zustand", name: "Zustand", category: "State Management", description: "Small, fast and scalable bearbones state-management solution", website: "https://zustand-demo.pmnd.rs", color: "#443E38", npm: "npm install zustand", icon: "https://avatars.githubusercontent.com/u/45790596?s=200&v=4" },
    { id: "redux", name: "Redux Toolkit", category: "State Management", description: "The official, opinionated, batteries-included toolset for efficient Redux development", website: "https://redux-toolkit.js.org", color: "#764ABC", npm: "npm install @reduxjs/toolkit", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
    { id: "jotai", name: "Jotai", category: "State Management", description: "Primitive and flexible state management for React", website: "https://jotai.org", color: "#000000", npm: "npm install jotai", icon: "https://jotai.org/favicon.svg" },
    { id: "valtio", name: "Valtio", category: "State Management", description: "Makes proxy-state simple for React and Vanilla", website: "https://valtio.pmnd.rs", color: "#1E40AF", npm: "npm install valtio", icon: "https://valtio.pmnd.rs/favicon.ico" },
    { id: "recoil", name: "Recoil", category: "State Management", description: "Experimental state management library for React apps", website: "https://recoiljs.org", color: "#3578E5", npm: "npm install recoil", icon: "https://recoiljs.org/img/favicon.png" },
    { id: "mobx", name: "MobX", category: "State Management", description: "Simple, scalable state management", website: "https://mobx.js.org", color: "#FF9955", icon: "https://mobx.js.org/img/mobx.png", npm: "npm install mobx mobx-react-lite" },
    { id: "xstate", name: "XState", category: "State Management", description: "State machines and statecharts", website: "https://xstate.js.org", color: "#2C3E50", icon: "https://avatars.githubusercontent.com/u/28773662?s=200&v=4", npm: "npm install xstate" },
    { id: "nanostores", name: "Nanostores", category: "State Management", description: "Tiny state manager", website: "https://github.com/nanostores/nanostores", color: "#FF6B35", icon: "https://avatars.githubusercontent.com/u/84611369?s=200&v=4", npm: "npm install nanostores" },

    // Build Tools
    { id: "vite", name: "Vite", category: "Build Tools", description: "Next generation frontend tooling", website: "https://vitejs.dev", color: "#646CFF", npm: "npm create vite@latest", icon: "https://vitejs.dev/logo.svg" },
    { id: "webpack", name: "Webpack", category: "Build Tools", description: "Static module bundler for modern JavaScript applications", website: "https://webpack.js.org", color: "#8DD6F9", npm: "npm install webpack", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg" },
    { id: "rollup", name: "Rollup", category: "Build Tools", description: "Module bundler for JavaScript", website: "https://rollupjs.org", color: "#EC4A3F", npm: "npm install rollup", icon: "https://rollupjs.org/favicon.png" },
    { id: "parcel", name: "Parcel", category: "Build Tools", description: "The zero configuration build tool for the web", website: "https://parceljs.org", color: "#E7A427", npm: "npm install parcel", icon: "https://avatars.githubusercontent.com/u/22735755?s=200&v=4" },
    { id: "esbuild", name: "esbuild", category: "Build Tools", description: "An extremely fast JavaScript bundler", website: "https://esbuild.github.io", color: "#FFCF00", npm: "npm install esbuild", icon: "https://esbuild.github.io/favicon.svg" },

    // Hosting
    { id: "vercel", name: "Vercel", category: "Hosting", description: "Platform for frontend frameworks and static sites", website: "https://vercel.com", color: "#000000", npm: "npm install -g vercel", icon: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png" },
    { id: "netlify", name: "Netlify", category: "Hosting", description: "All-in-one platform for automating modern web projects", website: "https://netlify.com", color: "#00C7B7", npm: "npm install -g netlify-cli", icon: "https://www.netlify.com/v3/img/components/logomark.png" },
    { id: "railway", name: "Railway", category: "Hosting", description: "Deploy from GitHub with zero configuration", website: "https://railway.app", color: "#0B0D0E", npm: "npm install -g @railway/cli", icon: "https://railway.app/brand/logo-light.png" },
    { id: "render", name: "Render", category: "Hosting", description: "Cloud platform for developers and teams", website: "https://render.com", color: "#46E3B7", npm: "# Deploy via Git", icon: "https://avatars.githubusercontent.com/u/36424661?s=200&v=4" },
    { id: "fly", name: "Fly.io", category: "Hosting", description: "Deploy app servers close to your users", website: "https://fly.io", color: "#8B5CF6", npm: "npm install -g @fly/flyctl", icon: "https://avatars.githubusercontent.com/u/22525303?s=200&v=4" },
    { id: "cloudflare-pages", name: "Cloudflare Pages", category: "Hosting", description: "JAMstack platform for frontend developers", website: "https://pages.cloudflare.com", color: "#F38020", npm: "npm install -g wrangler", icon: "https://www.cloudflare.com/favicon.ico" },
    { id: "aws", name: "AWS", category: "Hosting", description: "Amazon Web Services cloud platform", website: "https://aws.amazon.com", color: "#FF9900", npm: "npm install aws-cdk", icon: "https://avatars.githubusercontent.com/u/2232217?s=200&v=4" },
    { id: "digitalocean", name: "DigitalOcean", category: "Hosting", description: "Cloud infrastructure for developers", website: "https://digitalocean.com", color: "#0080FF", npm: "npm install -g doctl", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg" },
    { id: "coolify", name: "Coolify", category: "Hosting", description: "Self-hostable Heroku/Netlify alternative", website: "https://coolify.io", color: "#6366F1", icon: "https://coolify.io/favicon.ico", npm: "# Deploy via Docker" },
    { id: "dokku", name: "Dokku", category: "Hosting", description: "Docker-powered PaaS", website: "https://dokku.com", color: "#3867D6", icon: "https://dokku.com/favicon.ico", npm: "# Deploy via Git push" },
    { id: "heroku", name: "Heroku", category: "Hosting", description: "Cloud platform as a service", website: "https://heroku.com", color: "#430098", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg", npm: "npm install -g heroku" },

    // API/GraphQL Tools
    { id: "apollo-graphql", name: "Apollo GraphQL", category: "API/GraphQL Tools", description: "Complete GraphQL platform", website: "https://apollographql.com", color: "#311C87", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apollographql/apollographql-original.svg", npm: "npm install @apollo/client graphql" },
    { id: "graphql-yoga", name: "GraphQL Yoga", category: "API/GraphQL Tools", description: "Fully-featured GraphQL server", website: "https://the-guild.dev/graphql/yoga-server", color: "#E10098", icon: "https://the-guild.dev/favicon.ico", npm: "npm install graphql-yoga graphql" },
    { id: "hasura", name: "Hasura", category: "API/GraphQL Tools", description: "Instant GraphQL on databases", website: "https://hasura.io", color: "#1EB4D4", icon: "https://hasura.io/favicon.ico", npm: "# Deploy via Docker" },
    { id: "pothos", name: "Pothos", category: "API/GraphQL Tools", description: "Code-first GraphQL schema builder", website: "https://pothos-graphql.dev", color: "#FF6B35", icon: "https://avatars.githubusercontent.com/u/25724306?s=200&v=4", npm: "npm install @pothos/core graphql" },
    { id: "graphql-codegen", name: "GraphQL Code Generator", category: "API/GraphQL Tools", description: "Generate code from GraphQL schemas", website: "https://the-guild.dev/graphql/codegen", color: "#E10098", icon: "https://the-guild.dev/favicon.ico", npm: "npm install -D @graphql-codegen/cli" },

    // Real-time/WebSocket
    { id: "socketio", name: "Socket.io", category: "Real-time/WebSocket", description: "Real-time bidirectional communication", website: "https://socket.io", color: "#010101", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg", npm: "npm install socket.io socket.io-client" },
    { id: "pusher", name: "Pusher", category: "Real-time/WebSocket", description: "Hosted real-time messaging service", website: "https://pusher.com", color: "#300D4F", icon: "https://avatars.githubusercontent.com/u/739550?s=200&v=4", npm: "npm install pusher pusher-js" },
    { id: "ably", name: "Ably", category: "Real-time/WebSocket", description: "Real-time messaging platform", website: "https://ably.com", color: "#ED760A", icon: "https://ably.com/favicon.ico", npm: "npm install ably" },
    { id: "partykit", name: "Partykit", category: "Real-time/WebSocket", description: "Real-time infrastructure for multiplayer apps", website: "https://partykit.io", color: "#FF6B9D", icon: "https://avatars.githubusercontent.com/u/98838967?s=200&v=4", npm: "npm install partykit" },

    // CMS (Content Management)
    { id: "sanity", name: "Sanity", category: "CMS (Content Management)", description: "Platform for structured content", website: "https://sanity.io", color: "#F03E2F", icon: "https://avatars.githubusercontent.com/u/17177659?s=200&v=4", npm: "npm install @sanity/client" },
    { id: "contentful", name: "Contentful", category: "CMS (Content Management)", description: "Headless CMS and content platform", website: "https://contentful.com", color: "#2478CC", icon: "https://www.contentful.com/favicon.ico", npm: "npm install contentful" },
    { id: "strapi", name: "Strapi", category: "CMS (Content Management)", description: "Open-source headless CMS", website: "https://strapi.io", color: "#2F2E8B", icon: "https://avatars.githubusercontent.com/u/19872173?s=200&v=4", npm: "npx create-strapi-app@latest" },
    { id: "payload", name: "Payload CMS", category: "CMS (Content Management)", description: "TypeScript headless CMS", website: "https://payloadcms.com", color: "#000000", icon: "https://avatars.githubusercontent.com/u/62968818?s=200&v=4", npm: "npx create-payload-app@latest" },
    { id: "keystatic", name: "Keystatic", category: "CMS (Content Management)", description: "Content management for the component age", website: "https://keystatic.com", color: "#6366F1", icon: "https://keystatic.com/favicon.ico", npm: "npm install @keystatic/core" },

    // Search
    { id: "algolia", name: "Algolia", category: "Search", description: "AI-powered search and discovery", website: "https://algolia.com", color: "#003DFF", icon: "https://www.algolia.com/favicon.ico", npm: "npm install algoliasearch" },
    { id: "meilisearch", name: "Meilisearch", category: "Search", description: "Lightning-fast search engine", website: "https://meilisearch.com", color: "#FF5CAA", icon: "https://www.meilisearch.com/favicon.ico", npm: "npm install meilisearch" },
    { id: "typesense", name: "Typesense", category: "Search", description: "Fast, typo-tolerant search engine", website: "https://typesense.org", color: "#D23669", icon: "https://avatars.githubusercontent.com/u/10323546?s=200&v=4", npm: "npm install typesense" },
    { id: "elasticsearch", name: "ElasticSearch", category: "Search", description: "Distributed search and analytics engine", website: "https://elastic.co", color: "#005571", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg", npm: "npm install @elastic/elasticsearch" },

    // Validation
    { id: "zod", name: "Zod", category: "Validation", description: "TypeScript-first schema validation", website: "https://zod.dev", color: "#3E67B1", icon: "https://avatars.githubusercontent.com/u/4998038?s=200&v=4", npm: "npm install zod" },
    { id: "yup", name: "Yup", category: "Validation", description: "Schema validation library", website: "https://github.com/jquense/yup", color: "#FF6B35", icon: "https://avatars.githubusercontent.com/u/6662086?s=200&v=4", npm: "npm install yup" },
    { id: "joi", name: "Joi", category: "Validation", description: "Data validator for JavaScript", website: "https://joi.dev", color: "#000000", icon: "https://avatars.githubusercontent.com/u/3774533?s=200&v=4", npm: "npm install joi" },
    { id: "valibot", name: "Valibot", category: "Validation", description: "Schema library with bundle size focus", website: "https://valibot.dev", color: "#FF5CAA", icon: "https://valibot.dev/favicon.ico", npm: "npm install valibot" },

    // Email
    { id: "resend", name: "Resend", category: "Email", description: "Modern email API for developers", website: "https://resend.com", color: "#000000", icon: "https://avatars.githubusercontent.com/u/90738394?s=200&v=4", npm: "npm install resend" },
    { id: "sendgrid", name: "SendGrid", category: "Email", description: "Email delivery service", website: "https://sendgrid.com", color: "#1A82E2", icon: "https://avatars.githubusercontent.com/u/181234?s=200&v=4", npm: "npm install @sendgrid/mail" },
    { id: "postmark", name: "Postmark", category: "Email", description: "Fast and reliable transactional email", website: "https://postmarkapp.com", color: "#FFDD00", icon: "https://avatars.githubusercontent.com/u/629503?s=200&v=4", npm: "npm install postmark" },
    { id: "react-email", name: "React Email", category: "Email", description: "Build and send emails using React", website: "https://react.email", color: "#000000", icon: "https://avatars.githubusercontent.com/u/102195965?s=200&v=4", npm: "npm install @react-email/components" },

    // Analytics
    { id: "posthog", name: "PostHog", category: "Analytics", description: "Product analytics platform", website: "https://posthog.com", color: "#1D4AFF", icon: "https://avatars.githubusercontent.com/u/53387734?s=200&v=4", npm: "npm install posthog-js" },
    { id: "plausible", name: "Plausible", category: "Analytics", description: "Privacy-friendly analytics", website: "https://plausible.io", color: "#5850EC", icon: "https://plausible.io/favicon.ico", npm: "npm install plausible-tracker" },
    { id: "umami", name: "Umami", category: "Analytics", description: "Simple, fast, privacy-focused analytics", website: "https://umami.is", color: "#FF6B35", icon: "https://umami.is/favicon.ico", npm: "# Deploy via Docker" },
    { id: "google-analytics", name: "Google Analytics", category: "Analytics", description: "Web analytics service", website: "https://analytics.google.com", color: "#E37400", icon: "https://www.google.com/favicon.ico", npm: "npm install @vercel/analytics" },

    // Payment
    { id: "stripe", name: "Stripe", category: "Payment", description: "Payment processing platform", website: "https://stripe.com", color: "#635BFF", icon: "https://stripe.com/favicon.ico", npm: "npm install stripe @stripe/stripe-js" },
    { id: "paypal", name: "PayPal", category: "Payment", description: "Online payment system", website: "https://paypal.com", color: "#003087", icon: "https://www.paypal.com/favicon.ico", npm: "npm install @paypal/checkout-server-sdk" },
    { id: "lemon-squeezy", name: "Lemon Squeezy", category: "Payment", description: "Merchant of record platform", website: "https://lemonsqueezy.com", color: "#FFC233", icon: "https://lemonsqueezy.com/favicon.ico", npm: "npm install @lemonsqueezy/lemonsqueezy.js" },

    // Storage/CDN
    { id: "cloudinary", name: "Cloudinary", category: "Storage/CDN", description: "Media management and optimization", website: "https://cloudinary.com", color: "#3448C5", icon: "https://cloudinary.com/favicon.ico", npm: "npm install cloudinary" },
    { id: "uploadthing", name: "UploadThing", category: "Storage/CDN", description: "File uploads for web apps", website: "https://uploadthing.com", color: "#F97316", icon: "https://uploadthing.com/favicon.ico", npm: "npm install uploadthing" },
    { id: "aws-s3", name: "AWS S3", category: "Storage/CDN", description: "Object storage service", website: "https://aws.amazon.com/s3", color: "#FF9900", icon: "https://avatars.githubusercontent.com/u/2232217?s=200&v=4", npm: "npm install @aws-sdk/client-s3" },
    { id: "vercel-blob", name: "Vercel Blob", category: "Storage/CDN", description: "Edge-compatible file storage", website: "https://vercel.com/storage/blob", color: "#000000", icon: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png", npm: "npm install @vercel/blob" }
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
    "Hosting",
    "API/GraphQL Tools",
    "Real-time/WebSocket",
    "CMS (Content Management)",
    "Search",
    "Validation",
    "Email",
    "Analytics",
    "Payment",
    "Storage/CDN"
];