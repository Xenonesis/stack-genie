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
    { id: "fresh", name: "Fresh", category: "Web Framework", description: "The next-gen web framework for Deno", website: "https://fresh.deno.dev", color: "#00D2FF", npm: "deno run -A -r https://fresh.deno.dev", icon: "https://avatars.githubusercontent.com/u/86735756?s=200&v=4" },
    { id: "lit", name: "Lit", category: "Web Framework", description: "Simple. Fast. Web Components.", website: "https://lit.dev", color: "#324FFF", npm: "npm install lit", icon: "https://avatars.githubusercontent.com/u/18489846?s=200&v=4" },
    { id: "preact", name: "Preact", category: "Web Framework", description: "Fast 3kB React alternative", website: "https://preactjs.com", color: "#673AB8", npm: "npm install preact", icon: "https://avatars.githubusercontent.com/u/26872990?s=200&v=4" },

    // Database
    { id: "sqlite", name: "SQLite", category: "Database", description: "Self-contained, serverless, zero-configuration SQL database", website: "https://sqlite.org", color: "#003B57", npm: "npm install sqlite3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
    { id: "postgresql", name: "PostgreSQL", category: "Database", description: "Advanced open source relational database", website: "https://postgresql.org", color: "#336791", npm: "npm install pg", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { id: "mongodb", name: "MongoDB", category: "Database", description: "Document-oriented NoSQL database", website: "https://mongodb.com", color: "#47A248", npm: "npm install mongodb", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { id: "mysql", name: "MySQL", category: "Database", description: "The world's most popular open source database", website: "https://mysql.com", color: "#4479A1", npm: "npm install mysql2", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { id: "redis", name: "Redis", category: "Database", description: "In-memory data structure store", website: "https://redis.io", color: "#DC382D", npm: "npm install redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    { id: "supabase", name: "Supabase", category: "Database", description: "Open source Firebase alternative", website: "https://supabase.com", color: "#3ECF8E", npm: "npm install @supabase/supabase-js", icon: "https://supabase.com/favicon/favicon-32x32.png" },
    { id: "planetscale", name: "PlanetScale", category: "Database", description: "The MySQL-compatible serverless database platform", website: "https://planetscale.com", color: "#000000", npm: "npm install @planetscale/database", icon: "https://avatars.githubusercontent.com/u/35612527?s=200&v=4" },
    { id: "turso", name: "Turso", category: "Database", description: "SQLite for Production", website: "https://turso.tech", color: "#4FF8D2", npm: "npm install @libsql/client", icon: "https://avatars.githubusercontent.com/u/88491428?s=200&v=4" },
    { id: "dynamodb", name: "DynamoDB", category: "Database", description: "NoSQL database service", website: "https://aws.amazon.com/dynamodb", color: "#FF9900", icon: "https://avatars.githubusercontent.com/u/2232217?s=200&v=4", npm: "npm install @aws-sdk/client-dynamodb" },
    { id: "cockroachdb", name: "CockroachDB", category: "Database", description: "Distributed SQL database", website: "https://cockroachlabs.com", color: "#6933FF", icon: "https://avatars.githubusercontent.com/u/6748139?s=200&v=4", npm: "npm install pg" },
    { id: "neon", name: "Neon", category: "Database", description: "Serverless Postgres", website: "https://neon.tech", color: "#00E599", icon: "https://neon.tech/favicon/favicon-32x32.png", npm: "npm install @neondatabase/serverless" },
    { id: "xata", name: "Xata", category: "Database", description: "Serverless database with built-in search", website: "https://xata.io", color: "#7C3AED", icon: "https://avatars.githubusercontent.com/u/75191490?s=200&v=4", npm: "npm install @xata.io/client" },
    { id: "firebase-firestore", name: "Firebase Firestore", category: "Database", description: "NoSQL document database", website: "https://firebase.google.com/products/firestore", color: "#FFCA28", npm: "npm install firebase", icon: "https://avatars.githubusercontent.com/u/1335026?s=200&v=4" },
    { id: "cassandra", name: "Apache Cassandra", category: "Database", description: "Distributed NoSQL database", website: "https://cassandra.apache.org", color: "#1287B1", npm: "npm install cassandra-driver", icon: "https://avatars.githubusercontent.com/u/47359?s=200&v=4" },
    { id: "influxdb", name: "InfluxDB", category: "Database", description: "Time series database", website: "https://influxdata.com", color: "#22ADF6", npm: "npm install @influxdata/influxdb-client", icon: "https://avatars.githubusercontent.com/u/5713248?s=200&v=4" },
    { id: "neo4j", name: "Neo4j", category: "Database", description: "Graph database", website: "https://neo4j.com", color: "#008CC1", npm: "npm install neo4j-driver", icon: "https://avatars.githubusercontent.com/u/201120?s=200&v=4" },

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
    { id: "django", name: "Django", category: "Backend Framework", description: "Python web framework", website: "https://djangoproject.com", color: "#092E20", npm: "pip install django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
    { id: "flask", name: "Flask", category: "Backend Framework", description: "Lightweight Python web framework", website: "https://flask.palletsprojects.com", color: "#000000", npm: "pip install flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
    { id: "spring", name: "Spring Boot", category: "Backend Framework", description: "Java application framework", website: "https://spring.io/projects/spring-boot", color: "#6DB33F", npm: "# Use Spring Initializr", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
    { id: "laravel", name: "Laravel", category: "Backend Framework", description: "PHP web application framework", website: "https://laravel.com", color: "#FF2D20", npm: "composer create-project laravel/laravel", icon: "https://avatars.githubusercontent.com/u/958072?s=200&v=4" },
    { id: "rails", name: "Ruby on Rails", category: "Backend Framework", description: "Ruby web application framework", website: "https://rubyonrails.org", color: "#CC0000", npm: "gem install rails", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-original-wordmark.svg" },
    { id: "gin", name: "Gin", category: "Backend Framework", description: "Go web framework", website: "https://gin-gonic.com", color: "#00ADD8", npm: "go get github.com/gin-gonic/gin", icon: "https://avatars.githubusercontent.com/u/7894478?s=200&v=4" },
    { id: "fiber", name: "Fiber", category: "Backend Framework", description: "Express inspired Go web framework", website: "https://gofiber.io", color: "#00ADD8", npm: "go get github.com/gofiber/fiber/v2", icon: "https://avatars.githubusercontent.com/u/59947262?s=200&v=4" },

    // CSS Framework
    { id: "tailwind", name: "Tailwind CSS", category: "CSS Framework", description: "Utility-first CSS framework", website: "https://tailwindcss.com", color: "#06B6D4", npm: "npm install tailwindcss", icon: "https://avatars.githubusercontent.com/u/67109815?s=200&v=4" },
    { id: "bootstrap", name: "Bootstrap", category: "CSS Framework", description: "The most popular HTML, CSS, and JS library", website: "https://getbootstrap.com", color: "#7952B3", npm: "npm install bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
    { id: "chakra", name: "Chakra UI", category: "CSS Framework", description: "Simple, modular and accessible component library", website: "https://chakra-ui.com", color: "#319795", npm: "npm install @chakra-ui/react", icon: "https://avatars.githubusercontent.com/u/54212428?s=200&v=4" },
    { id: "mui", name: "Material-UI", category: "CSS Framework", description: "React components for faster and easier web development", website: "https://mui.com", color: "#007FFF", npm: "npm install @mui/material", icon: "https://mui.com/static/logo.png" },
    { id: "antd", name: "Ant Design", category: "CSS Framework", description: "Enterprise-class UI design language and React UI library", website: "https://ant.design", color: "#1890FF", npm: "npm install antd", icon: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" },
    { id: "mantine", name: "Mantine", category: "CSS Framework", description: "Full-featured React components library", website: "https://mantine.dev", color: "#339AF0", npm: "npm install @mantine/core", icon: "https://mantine.dev/favicon.svg" },
    { id: "shadcn", name: "shadcn/ui", category: "CSS Framework", description: "Beautifully designed components built with Radix UI and Tailwind CSS", website: "https://ui.shadcn.com", color: "#000000", npm: "npx shadcn-ui@latest init", icon: "https://avatars.githubusercontent.com/u/124599?s=200&v=4" },
    { id: "panda-css", name: "Panda CSS", category: "CSS Framework", description: "Zero-runtime CSS-in-JS", website: "https://panda-css.com", color: "#FED7AA", icon: "https://avatars.githubusercontent.com/u/155136102?s=200&v=4", npm: "npm install -D @pandacss/dev" },
    { id: "unocss", name: "UnoCSS", category: "CSS Framework", description: "Instant on-demand atomic CSS engine", website: "https://unocss.dev", color: "#333333", icon: "https://unocss.dev/favicon.svg", npm: "npm install -D unocss" },
    { id: "styled-components", name: "Styled Components", category: "CSS Framework", description: "CSS-in-JS library", website: "https://styled-components.com", color: "#DB7093", icon: "https://styled-components.com/favicon.png", npm: "npm install styled-components" },
    { id: "emotion", name: "Emotion", category: "CSS Framework", description: "CSS-in-JS library", website: "https://emotion.sh", color: "#D26AC2", icon: "https://avatars.githubusercontent.com/u/28973759?s=200&v=4", npm: "npm install @emotion/react @emotion/styled" },
    { id: "bulma", name: "Bulma", category: "CSS Framework", description: "Modern CSS framework based on Flexbox", website: "https://bulma.io", color: "#00D1B2", npm: "npm install bulma", icon: "https://avatars.githubusercontent.com/u/22254154?s=200&v=4" },
    { id: "foundation", name: "Foundation", category: "CSS Framework", description: "Responsive front-end framework", website: "https://get.foundation", color: "#1779BA", npm: "npm install foundation-sites", icon: "https://avatars.githubusercontent.com/u/1142434?s=200&v=4" },
    { id: "semantic-ui", name: "Semantic UI", category: "CSS Framework", description: "User interface component framework", website: "https://semantic-ui.com", color: "#35BDB2", npm: "npm install semantic-ui", icon: "https://avatars.githubusercontent.com/u/6543015?s=200&v=4" },
    { id: "windicss", name: "Windi CSS", category: "CSS Framework", description: "Next generation utility-first CSS framework", website: "https://windicss.org", color: "#48B0F1", npm: "npm install windicss", icon: "https://avatars.githubusercontent.com/u/78513062?s=200&v=4" },

    // Native Framework
    { id: "reactnative", name: "React Native", category: "Native Framework", description: "Create native apps for Android and iOS using React", website: "https://reactnative.dev", color: "#61DAFB", npm: "npx react-native init", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { id: "flutter", name: "Flutter", category: "Native Framework", description: "Google's UI toolkit for building natively compiled applications", website: "https://flutter.dev", color: "#02569B", npm: "flutter create my_app", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
    { id: "ionic", name: "Ionic", category: "Native Framework", description: "Cross-platform mobile app development", website: "https://ionicframework.com", color: "#3880FF", npm: "npm install -g @ionic/cli", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg" },
    { id: "expo", name: "Expo", category: "Native Framework", description: "Platform for making universal native apps with React", website: "https://expo.dev", color: "#000020", npm: "npm install -g @expo/cli", icon: "https://avatars.githubusercontent.com/u/12504344?s=200&v=4" },
    { id: "tauri", name: "Tauri", category: "Native Framework", description: "Build smaller, faster, and more secure desktop applications", website: "https://tauri.app", color: "#FFC131", npm: "npm install @tauri-apps/cli", icon: "https://avatars.githubusercontent.com/u/54536011?s=200&v=4" },
    { id: "electron", name: "Electron", category: "Native Framework", description: "Build cross-platform desktop apps with JavaScript, HTML, and CSS", website: "https://electronjs.org", color: "#47848F", npm: "npm install electron", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg" },
    { id: "capacitor", name: "Capacitor", category: "Native Framework", description: "Cross-platform native runtime for web apps", website: "https://capacitorjs.com", color: "#119EFF", npm: "npm install @capacitor/core", icon: "https://avatars.githubusercontent.com/u/32264020?s=200&v=4" },
    { id: "cordova", name: "Apache Cordova", category: "Native Framework", description: "Mobile app development framework", website: "https://cordova.apache.org", color: "#E8E8E8", npm: "npm install -g cordova", icon: "https://avatars.githubusercontent.com/u/47359?s=200&v=4" },
    { id: "nwjs", name: "NW.js", category: "Native Framework", description: "Desktop app framework with web technologies", website: "https://nwjs.io", color: "#3D3D3D", npm: "npm install nw", icon: "https://avatars.githubusercontent.com/u/10180421?s=200&v=4" },

    // ORM
    { id: "prisma", name: "Prisma", category: "ORM", description: "Next-generation Node.js and TypeScript ORM", website: "https://prisma.io", color: "#2D3748", npm: "npm install prisma", icon: "https://avatars.githubusercontent.com/u/17219288?s=200&v=4" },
    { id: "drizzle", name: "Drizzle ORM", category: "ORM", description: "TypeScript ORM that is production ready", website: "https://orm.drizzle.team", color: "#C5F74F", npm: "npm install drizzle-orm", icon: "https://avatars.githubusercontent.com/u/108468352?s=200&v=4" },
    { id: "typeorm", name: "TypeORM", category: "ORM", description: "ORM for TypeScript and JavaScript", website: "https://typeorm.io", color: "#E83524", npm: "npm install typeorm", icon: "https://avatars.githubusercontent.com/u/20165699?s=200&v=4" },
    { id: "sequelize", name: "Sequelize", category: "ORM", description: "Promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server", website: "https://sequelize.org", color: "#52B0E7", npm: "npm install sequelize", icon: "https://avatars.githubusercontent.com/u/3591786?s=200&v=4" },
    { id: "mongoose", name: "Mongoose", category: "ORM", description: "Elegant mongodb object modeling for node.js", website: "https://mongoosejs.com", color: "#880000", npm: "npm install mongoose", icon: "https://avatars.githubusercontent.com/u/7552965?s=200&v=4" },
    { id: "knex", name: "Knex.js", category: "ORM", description: "SQL query builder for JavaScript", website: "https://knexjs.org", color: "#D26B38", npm: "npm install knex", icon: "https://avatars.githubusercontent.com/u/13896769?s=200&v=4" },
    { id: "objection", name: "Objection.js", category: "ORM", description: "SQL-friendly ORM for Node.js", website: "https://vincit.github.io/objection.js", color: "#FF6B35", npm: "npm install objection", icon: "https://avatars.githubusercontent.com/u/3514357?s=200&v=4" },

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
    { id: "jasmine", name: "Jasmine", category: "Testing", description: "Behavior-driven development framework", website: "https://jasmine.github.io", color: "#8A4182", npm: "npm install jasmine", icon: "https://avatars.githubusercontent.com/u/4624710?s=200&v=4" },
    { id: "mocha", name: "Mocha", category: "Testing", description: "JavaScript test framework", website: "https://mochajs.org", color: "#8D6748", npm: "npm install mocha", icon: "https://avatars.githubusercontent.com/u/8770005?s=200&v=4" },
    { id: "ava", name: "AVA", category: "Testing", description: "Node.js test runner", website: "https://github.com/avajs/ava", color: "#663399", npm: "npm install ava", icon: "https://avatars.githubusercontent.com/u/8527916?s=200&v=4" },
    { id: "webdriverio", name: "WebdriverIO", category: "Testing", description: "Browser and mobile automation test framework", website: "https://webdriver.io", color: "#EA5906", npm: "npm install @wdio/cli", icon: "https://avatars.githubusercontent.com/u/6512473?s=200&v=4" },

    // Authentication
    { id: "nextauth", name: "NextAuth.js", category: "Authentication", description: "Complete open source authentication solution for Next.js applications", website: "https://next-auth.js.org", color: "#EB5424", npm: "npm install next-auth", icon: "https://avatars.githubusercontent.com/u/67470890?s=200&v=4" },
    { id: "auth0", name: "Auth0", category: "Authentication", description: "Secure access for everyone", website: "https://auth0.com", color: "#EB5424", npm: "npm install @auth0/nextjs-auth0", icon: "https://avatars.githubusercontent.com/u/2824157?s=200&v=4" },
    { id: "clerk", name: "Clerk", category: "Authentication", description: "More than authentication", website: "https://clerk.com", color: "#6C47FF", npm: "npm install @clerk/nextjs", icon: "https://avatars.githubusercontent.com/u/49538330?s=200&v=4" },
    { id: "supabase-auth", name: "Supabase Auth", category: "Authentication", description: "User management and authentication", website: "https://supabase.com/auth", color: "#3ECF8E", npm: "npm install @supabase/auth-ui-react", icon: "https://supabase.com/favicon/favicon-32x32.png" },
    { id: "firebase-auth", name: "Firebase Auth", category: "Authentication", description: "Simple, free multi-platform sign-in", website: "https://firebase.google.com/products/auth", color: "#FFCA28", npm: "npm install firebase", icon: "https://avatars.githubusercontent.com/u/1335026?s=200&v=4" },
    { id: "lucia", name: "Lucia", category: "Authentication", description: "Authentication library for TypeScript", website: "https://lucia-auth.com", color: "#5F57FF", icon: "https://avatars.githubusercontent.com/u/89729670?s=200&v=4", npm: "npm install lucia" },
    { id: "better-auth", name: "Better Auth", category: "Authentication", description: "The most comprehensive authentication framework", website: "https://better-auth.com", color: "#10B981", icon: "https://avatars.githubusercontent.com/u/180618636?s=200&v=4", npm: "npm install better-auth" },
    { id: "passport", name: "Passport.js", category: "Authentication", description: "Authentication middleware for Node.js", website: "https://passportjs.org", color: "#34E27A", npm: "npm install passport", icon: "https://avatars.githubusercontent.com/u/1160530?s=200&v=4" },

    // Validation
    { id: "zod", name: "Zod", category: "Validation", description: "TypeScript-first schema validation with static type inference", website: "https://zod.dev", color: "#3E67B1", npm: "npm install zod", icon: "https://zod.dev/logo.svg" },
    { id: "yup", name: "Yup", category: "Validation", description: "Dead simple Object schema validation", website: "https://github.com/jquense/yup", color: "#FF6B6B", npm: "npm install yup", icon: "https://avatars.githubusercontent.com/u/1496508?s=200&v=4" },
    { id: "joi", name: "Joi", category: "Validation", description: "The most powerful schema description language and data validator for JavaScript", website: "https://joi.dev", color: "#F7931E", npm: "npm install joi", icon: "https://joi.dev/img/joiLogo.svg" },
    { id: "valibot", name: "Valibot", category: "Validation", description: "The modular and type safe schema library for validating structural data", website: "https://valibot.dev", color: "#8B5CF6", npm: "npm install valibot", icon: "https://valibot.dev/favicon.svg" },

    // GraphQL/API
    { id: "apollo-graphql", name: "Apollo GraphQL", category: "GraphQL/API", description: "Comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL", website: "https://apollographql.com", color: "#311C87", npm: "npm install @apollo/client graphql", icon: "https://avatars.githubusercontent.com/u/17189275?s=200&v=4" },
    { id: "graphql-yoga", name: "GraphQL Yoga", category: "GraphQL/API", description: "Fully-featured GraphQL Server with focus on easy setup, performance & great developer experience", website: "https://the-guild.dev/graphql/yoga-server", color: "#E10098", npm: "npm install graphql-yoga graphql", icon: "https://avatars.githubusercontent.com/u/20284515?s=200&v=4" },
    { id: "hasura", name: "Hasura", category: "GraphQL/API", description: "Instant GraphQL on all your data", website: "https://hasura.io", color: "#1EB4D4", npm: "# Deploy via Docker", icon: "https://avatars.githubusercontent.com/u/25479918?s=200&v=4" },
    { id: "pothos", name: "Pothos", category: "GraphQL/API", description: "Pothos GraphQL is library for creating GraphQL schemas in typescript using a strongly typed code first approach", website: "https://pothos-graphql.dev", color: "#FF6B35", npm: "npm install @pothos/core graphql", icon: "https://pothos-graphql.dev/assets/logo.svg" },
    { id: "graphql-codegen", name: "GraphQL Code Generator", category: "GraphQL/API", description: "Generate code from your GraphQL schema and operations with a simple CLI", website: "https://the-guild.dev/graphql/codegen", color: "#E535AB", npm: "npm install -D @graphql-codegen/cli", icon: "https://avatars.githubusercontent.com/u/20284515?s=200&v=4" },

    // Real-time/WebSocket
    { id: "socketio", name: "Socket.io", category: "Real-time", description: "Bidirectional and low-latency communication for every platform", website: "https://socket.io", color: "#010101", npm: "npm install socket.io socket.io-client", icon: "https://socket.io/images/logo.svg" },
    { id: "pusher", name: "Pusher", category: "Real-time", description: "Hosted APIs to build realtime features", website: "https://pusher.com", color: "#300D4F", npm: "npm install pusher pusher-js", icon: "https://avatars.githubusercontent.com/u/739550?s=200&v=4" },
    { id: "ably", name: "Ably", category: "Real-time", description: "APIs to build, extend, and deliver powerful digital experiences in realtime", website: "https://ably.com", color: "#FF5416", npm: "npm install ably", icon: "https://avatars.githubusercontent.com/u/5665186?s=200&v=4" },
    { id: "partykit", name: "PartyKit", category: "Real-time", description: "Everything's better with friends. Add a real-time, collaborative layer to your app, fast", website: "https://partykit.io", color: "#FF6B9D", npm: "npm install partykit", icon: "https://avatars.githubusercontent.com/u/98838967?s=200&v=4" },

    // CMS (Content Management)
    { id: "sanity", name: "Sanity", category: "CMS", description: "Platform for structured content that comes with an open-source editing environment", website: "https://sanity.io", color: "#F03E2F", npm: "npm install @sanity/client", icon: "https://avatars.githubusercontent.com/u/17177659?s=200&v=4" },
    { id: "contentful", name: "Contentful", category: "CMS", description: "The composable content platform for business at scale", website: "https://contentful.com", color: "#2478CC", npm: "npm install contentful", icon: "https://avatars.githubusercontent.com/u/472182?s=200&v=4" },
    { id: "strapi", name: "Strapi", category: "CMS", description: "The leading open-source headless CMS", website: "https://strapi.io", color: "#4945FF", npm: "npx create-strapi-app@latest", icon: "https://avatars.githubusercontent.com/u/19872173?s=200&v=4" },
    { id: "payload", name: "Payload CMS", category: "CMS", description: "The best way to build a modern backend + admin UI. No black magic, all TypeScript", website: "https://payloadcms.com", color: "#000000", npm: "npx create-payload-app@latest", icon: "https://avatars.githubusercontent.com/u/62968818?s=200&v=4" },
    { id: "keystatic", name: "Keystatic", category: "CMS", description: "The content management system for the component age", website: "https://keystatic.com", color: "#6366F1", npm: "npm install @keystatic/core", icon: "https://avatars.githubusercontent.com/u/84868432?s=200&v=4" },

    // Search
    { id: "algolia", name: "Algolia", category: "Search", description: "AI-powered search and discovery platform", website: "https://algolia.com", color: "#003DFF", npm: "npm install algoliasearch", icon: "https://avatars.githubusercontent.com/u/2034458?s=200&v=4" },
    { id: "meilisearch", name: "Meilisearch", category: "Search", description: "A lightning-fast search engine that fits effortlessly into your apps, websites, and workflow", website: "https://meilisearch.com", color: "#FF5CAA", npm: "npm install meilisearch", icon: "https://avatars.githubusercontent.com/u/43250847?s=200&v=4" },
    { id: "typesense", name: "Typesense", category: "Search", description: "Fast, typo-tolerant search engine for building delightful search experiences", website: "https://typesense.org", color: "#D23669", npm: "npm install typesense", icon: "https://avatars.githubusercontent.com/u/10323546?s=200&v=4" },
    { id: "elasticsearch", name: "Elasticsearch", category: "Search", description: "Distributed, RESTful search and analytics engine", website: "https://elastic.co", color: "#005571", npm: "npm install @elastic/elasticsearch", icon: "https://avatars.githubusercontent.com/u/6764390?s=200&v=4" },

    // Email
    { id: "resend", name: "Resend", category: "Email", description: "The best API to reach humans instead of spam folders", website: "https://resend.com", color: "#000000", npm: "npm install resend", icon: "https://avatars.githubusercontent.com/u/96661497?s=200&v=4" },
    { id: "sendgrid", name: "SendGrid", category: "Email", description: "Email delivery service", website: "https://sendgrid.com", color: "#1A82E2", npm: "npm install @sendgrid/mail", icon: "https://avatars.githubusercontent.com/u/181234?s=200&v=4" },
    { id: "postmark", name: "Postmark", category: "Email", description: "Fast and reliable transactional email service", website: "https://postmarkapp.com", color: "#FFDD00", npm: "npm install postmark", icon: "https://avatars.githubusercontent.com/u/629503?s=200&v=4" },
    { id: "react-email", name: "React Email", category: "Email", description: "Build and send emails using React", website: "https://react.email", color: "#000000", npm: "npm install @react-email/components", icon: "https://avatars.githubusercontent.com/u/109174925?s=200&v=4" },

    // Analytics
    { id: "posthog", name: "PostHog", category: "Analytics", description: "How engineers build successful products", website: "https://posthog.com", color: "#1D4AFF", npm: "npm install posthog-js", icon: "https://avatars.githubusercontent.com/u/53387734?s=200&v=4" },
    { id: "plausible", name: "Plausible Analytics", category: "Analytics", description: "Simple and privacy-friendly alternative to Google Analytics", website: "https://plausible.io", color: "#5850EC", npm: "npm install plausible-tracker", icon: "https://avatars.githubusercontent.com/u/52078544?s=200&v=4" },
    { id: "umami", name: "Umami", category: "Analytics", description: "Simple, fast, privacy-focused alternative to Google Analytics", website: "https://umami.is", color: "#FF6B35", npm: "# Deploy via Docker", icon: "https://avatars.githubusercontent.com/u/65772953?s=200&v=4" },
    { id: "google-analytics", name: "Google Analytics", category: "Analytics", description: "Web analytics service offered by Google", website: "https://analytics.google.com", color: "#E37400", npm: "npm install @vercel/analytics", icon: "https://avatars.githubusercontent.com/u/1342004?s=200&v=4" },

    // Payment
    { id: "stripe", name: "Stripe", category: "Payment", description: "Online payment processing for internet businesses", website: "https://stripe.com", color: "#635BFF", npm: "npm install stripe @stripe/stripe-js", icon: "https://avatars.githubusercontent.com/u/856813?s=200&v=4" },
    { id: "paypal", name: "PayPal", category: "Payment", description: "Online payments system", website: "https://paypal.com", color: "#00457C", npm: "npm install @paypal/checkout-server-sdk", icon: "https://avatars.githubusercontent.com/u/476675?s=200&v=4" },
    { id: "lemon-squeezy", name: "Lemon Squeezy", category: "Payment", description: "The all-in-one platform for running your SaaS business", website: "https://lemonsqueezy.com", color: "#FFD23F", npm: "npm install @lemonsqueezy/lemonsqueezy.js", icon: "https://avatars.githubusercontent.com/u/82379168?s=200&v=4" },

    // Storage/CDN
    { id: "cloudinary", name: "Cloudinary", category: "Storage", description: "Image and video management in the cloud", website: "https://cloudinary.com", color: "#3448C5", npm: "npm install cloudinary", icon: "https://avatars.githubusercontent.com/u/1460763?s=200&v=4" },
    { id: "uploadthing", name: "UploadThing", category: "Storage", description: "File uploads for modern web apps", website: "https://uploadthing.com", color: "#F97316", npm: "npm install uploadthing", icon: "https://avatars.githubusercontent.com/u/106103625?s=200&v=4" },
    { id: "aws-s3", name: "AWS S3", category: "Storage", description: "Object storage built to retrieve any amount of data from anywhere", website: "https://aws.amazon.com/s3", color: "#FF9900", npm: "npm install @aws-sdk/client-s3", icon: "https://avatars.githubusercontent.com/u/2232217?s=200&v=4" },
    { id: "vercel-blob", name: "Vercel Blob", category: "Storage", description: "Fast object storage for the frontend", website: "https://vercel.com/storage/blob", color: "#000000", npm: "npm install @vercel/blob", icon: "https://avatars.githubusercontent.com/u/14985020?s=200&v=4" },


    // Additional Build Tools
    { id: "turbopack", name: "Turbopack", category: "Build Tools", description: "The Rust-powered successor to Webpack", website: "https://turbo.build/pack", color: "#0EA5E9", npm: "# Built into Next.js 13+", icon: "https://avatars.githubusercontent.com/u/84177906?s=200&v=4" },
    { id: "rspack", name: "Rspack", category: "Build Tools", description: "A fast Rust-based web bundler", website: "https://rspack.dev", color: "#FF6B35", npm: "npm install @rspack/cli", icon: "https://avatars.githubusercontent.com/u/108205785?s=200&v=4" },
    { id: "farm", name: "Farm", category: "Build Tools", description: "Extremely fast Vite-compatible web build tool written in Rust", website: "https://farmfe.org", color: "#00D8FF", npm: "npm create farm@latest", icon: "https://avatars.githubusercontent.com/u/108205785?s=200&v=4" },

    // Additional Hosting
    { id: "coolify", name: "Coolify", category: "Hosting", description: "An open-source & self-hostable Heroku / Netlify / Vercel alternative", website: "https://coolify.io", color: "#6366F1", npm: "# Deploy via Docker", icon: "https://avatars.githubusercontent.com/u/83192107?s=200&v=4" },
    { id: "dokku", name: "Dokku", category: "Hosting", description: "A docker-powered PaaS that helps you build and manage the lifecycle of applications", website: "https://dokku.com", color: "#3E4C96", npm: "# Deploy via Git push", icon: "https://avatars.githubusercontent.com/u/13455795?s=200&v=4" },
    { id: "heroku", name: "Heroku", category: "Hosting", description: "Cloud platform as a service supporting several programming languages", website: "https://heroku.com", color: "#430098", npm: "npm install -g heroku", icon: "https://avatars.githubusercontent.com/u/23211?s=200&v=4" },

    // State Management
    { id: "zustand", name: "Zustand", category: "State Management", description: "Small, fast and scalable bearbones state-management solution", website: "https://zustand-demo.pmnd.rs", color: "#443E38", npm: "npm install zustand", icon: "https://avatars.githubusercontent.com/u/45790596?s=200&v=4" },
    { id: "redux", name: "Redux Toolkit", category: "State Management", description: "The official, opinionated, batteries-included toolset for efficient Redux development", website: "https://redux-toolkit.js.org", color: "#764ABC", npm: "npm install @reduxjs/toolkit", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
    { id: "jotai", name: "Jotai", category: "State Management", description: "Primitive and flexible state management for React", website: "https://jotai.org", color: "#000000", npm: "npm install jotai", icon: "https://jotai.org/favicon.svg" },
    { id: "valtio", name: "Valtio", category: "State Management", description: "Makes proxy-state simple for React and Vanilla", website: "https://valtio.pmnd.rs", color: "#1E40AF", npm: "npm install valtio", icon: "https://avatars.githubusercontent.com/u/45790596?s=200&v=4" },
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
    { id: "cloudflare-pages", name: "Cloudflare Pages", category: "Hosting", description: "JAMstack platform for frontend developers", website: "https://pages.cloudflare.com", color: "#F38020", npm: "npm install -g wrangler", icon: "https://avatars.githubusercontent.com/u/314135?s=200&v=4" },
    { id: "aws", name: "AWS", category: "Hosting", description: "Amazon Web Services cloud platform", website: "https://aws.amazon.com", color: "#FF9900", npm: "npm install aws-cdk", icon: "https://avatars.githubusercontent.com/u/2232217?s=200&v=4" },
    { id: "digitalocean", name: "DigitalOcean", category: "Hosting", description: "Cloud infrastructure for developers", website: "https://digitalocean.com", color: "#0080FF", npm: "npm install -g doctl", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg" },



    // Languages
    { id: "typescript", name: "TypeScript", category: "Languages", description: "Typed superset of JavaScript", website: "https://typescriptlang.org", color: "#3178C6", npm: "npm install typescript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { id: "javascript", name: "JavaScript", category: "Languages", description: "Programming language of the web", website: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", color: "#F7DF1E", npm: "# Built into browsers", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { id: "python", name: "Python", category: "Languages", description: "High-level programming language", website: "https://python.org", color: "#3776AB", npm: "# Install from python.org", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { id: "go", name: "Go", category: "Languages", description: "Open source programming language", website: "https://golang.org", color: "#00ADD8", npm: "# Install from golang.org", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
    { id: "rust", name: "Rust", category: "Languages", description: "Systems programming language", website: "https://rust-lang.org", color: "#000000", npm: "# Install from rustup.rs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg" },
    { id: "java", name: "Java", category: "Languages", description: "Object-oriented programming language", website: "https://java.com", color: "#ED8B00", npm: "# Install JDK", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { id: "csharp", name: "C#", category: "Languages", description: "Modern object-oriented language", website: "https://docs.microsoft.com/en-us/dotnet/csharp", color: "#239120", npm: "# Install .NET SDK", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
    { id: "php", name: "PHP", category: "Languages", description: "Server-side scripting language", website: "https://php.net", color: "#777BB4", npm: "# Install from php.net", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
    { id: "ruby", name: "Ruby", category: "Languages", description: "Dynamic programming language", website: "https://ruby-lang.org", color: "#CC342D", npm: "# Install from ruby-lang.org", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg" },
    { id: "kotlin", name: "Kotlin", category: "Languages", description: "Modern programming language", website: "https://kotlinlang.org", color: "#7F52FF", npm: "# Install Kotlin compiler", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
    { id: "swift", name: "Swift", category: "Languages", description: "Apple's programming language", website: "https://swift.org", color: "#FA7343", npm: "# Install Xcode", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
    { id: "dart", name: "Dart", category: "Languages", description: "Client-optimized language", website: "https://dart.dev", color: "#0175C2", npm: "# Install Dart SDK", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },

    // DevOps/Infrastructure
    { id: "docker", name: "Docker", category: "DevOps/Infrastructure", description: "Containerization platform", website: "https://docker.com", color: "#2496ED", npm: "# Install Docker Desktop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { id: "kubernetes", name: "Kubernetes", category: "DevOps/Infrastructure", description: "Container orchestration", website: "https://kubernetes.io", color: "#326CE5", npm: "# Install kubectl", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
    { id: "terraform", name: "Terraform", category: "DevOps/Infrastructure", description: "Infrastructure as code", website: "https://terraform.io", color: "#623CE4", npm: "# Install from terraform.io", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
    { id: "ansible", name: "Ansible", category: "DevOps/Infrastructure", description: "IT automation platform", website: "https://ansible.com", color: "#EE0000", npm: "pip install ansible", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg" },
    { id: "jenkins", name: "Jenkins", category: "DevOps/Infrastructure", description: "Automation server", website: "https://jenkins.io", color: "#D33833", npm: "# Install from jenkins.io", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
    { id: "github-actions", name: "GitHub Actions", category: "DevOps/Infrastructure", description: "CI/CD platform", website: "https://github.com/features/actions", color: "#2088FF", npm: "# Configure in .github/workflows", icon: "https://avatars.githubusercontent.com/u/44036562?s=200&v=4" },
    { id: "gitlab-ci", name: "GitLab CI", category: "DevOps/Infrastructure", description: "Continuous integration", website: "https://docs.gitlab.com/ee/ci", color: "#FC6D26", npm: "# Configure in .gitlab-ci.yml", icon: "https://avatars.githubusercontent.com/u/22032?s=200&v=4" },
    { id: "circleci", name: "CircleCI", category: "DevOps/Infrastructure", description: "Continuous integration platform", website: "https://circleci.com", color: "#343434", npm: "# Configure in .circleci/config.yml", icon: "https://avatars.githubusercontent.com/u/1231870?s=200&v=4" },

    // Monitoring/Observability
    { id: "sentry", name: "Sentry", category: "Monitoring/Observability", description: "Error tracking and performance monitoring", website: "https://sentry.io", color: "#362D59", npm: "npm install @sentry/node", icon: "https://avatars.githubusercontent.com/u/1396951?s=200&v=4" },
    { id: "datadog", name: "Datadog", category: "Monitoring/Observability", description: "Monitoring and analytics platform", website: "https://datadoghq.com", color: "#632CA6", npm: "npm install dd-trace", icon: "https://avatars.githubusercontent.com/u/365230?s=200&v=4" },
    { id: "newrelic", name: "New Relic", category: "Monitoring/Observability", description: "Application performance monitoring", website: "https://newrelic.com", color: "#008C99", npm: "npm install newrelic", icon: "https://avatars.githubusercontent.com/u/31739?s=200&v=4" },
    { id: "prometheus", name: "Prometheus", category: "Monitoring/Observability", description: "Monitoring system and time series database", website: "https://prometheus.io", color: "#E6522C", npm: "npm install prom-client", icon: "https://avatars.githubusercontent.com/u/3380462?s=200&v=4" },
    { id: "grafana", name: "Grafana", category: "Monitoring/Observability", description: "Analytics and monitoring platform", website: "https://grafana.com", color: "#F46800", npm: "# Install Grafana server", icon: "https://avatars.githubusercontent.com/u/7195757?s=200&v=4" },
    { id: "jaeger", name: "Jaeger", category: "Monitoring/Observability", description: "Distributed tracing system", website: "https://jaegertracing.io", color: "#60D0E4", npm: "npm install jaeger-client", icon: "https://avatars.githubusercontent.com/u/28545596?s=200&v=4" },

    // Message Queues/Event Streaming
    { id: "rabbitmq", name: "RabbitMQ", category: "Message Queues/Event Streaming", description: "Message broker", website: "https://rabbitmq.com", color: "#FF6600", npm: "npm install amqplib", icon: "https://avatars.githubusercontent.com/u/96669?s=200&v=4" },
    { id: "apache-kafka", name: "Apache Kafka", category: "Message Queues/Event Streaming", description: "Distributed event streaming platform", website: "https://kafka.apache.org", color: "#231F20", npm: "npm install kafkajs", icon: "https://avatars.githubusercontent.com/u/47359?s=200&v=4" },
    { id: "nats", name: "NATS", category: "Message Queues/Event Streaming", description: "Cloud native messaging system", website: "https://nats.io", color: "#199bfc", npm: "npm install nats", icon: "https://avatars.githubusercontent.com/u/6501170?s=200&v=4" },
    { id: "bull", name: "Bull", category: "Message Queues/Event Streaming", description: "Redis-based queue for Node.js", website: "https://github.com/OptimalBits/bull", color: "#D82C20", npm: "npm install bull", icon: "https://avatars.githubusercontent.com/u/1045194?s=200&v=4" },

    // API Documentation
    { id: "swagger", name: "Swagger/OpenAPI", category: "API Documentation", description: "API documentation and design", website: "https://swagger.io", color: "#85EA2D", npm: "npm install swagger-ui-express", icon: "https://avatars.githubusercontent.com/u/7658037?s=200&v=4" },
    { id: "postman", name: "Postman", category: "API Documentation", description: "API development platform", website: "https://postman.com", color: "#FF6C37", npm: "# Install Postman app", icon: "https://avatars.githubusercontent.com/u/10251060?s=200&v=4" },
    { id: "insomnia", name: "Insomnia", category: "API Documentation", description: "API client and design tool", website: "https://insomnia.rest", color: "#4000BF", npm: "# Install Insomnia app", icon: "https://avatars.githubusercontent.com/u/25882507?s=200&v=4" },

    // Version Control
    { id: "git", name: "Git", category: "Version Control", description: "Distributed version control system", website: "https://git-scm.com", color: "#F05032", npm: "# Install from git-scm.com", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { id: "github", name: "GitHub", category: "Version Control", description: "Git repository hosting service", website: "https://github.com", color: "#181717", npm: "# Create account at github.com", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { id: "gitlab", name: "GitLab", category: "Version Control", description: "Git repository manager", website: "https://gitlab.com", color: "#FC6D26", npm: "# Create account at gitlab.com", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" },
    { id: "bitbucket", name: "Bitbucket", category: "Version Control", description: "Git repository hosting", website: "https://bitbucket.org", color: "#0052CC", npm: "# Create account at bitbucket.org", icon: "https://avatars.githubusercontent.com/u/2263316?s=200&v=4" },

    // Code Quality/Linting
    { id: "eslint", name: "ESLint", category: "Code Quality/Linting", description: "JavaScript linter", website: "https://eslint.org", color: "#4B32C3", npm: "npm install eslint", icon: "https://avatars.githubusercontent.com/u/6019716?s=200&v=4" },
    { id: "prettier", name: "Prettier", category: "Code Quality/Linting", description: "Code formatter", website: "https://prettier.io", color: "#F7B93E", npm: "npm install prettier", icon: "https://avatars.githubusercontent.com/u/25822731?s=200&v=4" },
    { id: "husky", name: "Husky", category: "Code Quality/Linting", description: "Git hooks made easy", website: "https://typicode.github.io/husky", color: "#42B883", npm: "npm install husky", icon: "https://avatars.githubusercontent.com/u/5502029?s=200&v=4" },
    { id: "lint-staged", name: "lint-staged", category: "Code Quality/Linting", description: "Run linters on git staged files", website: "https://github.com/okonet/lint-staged", color: "#000000", npm: "npm install lint-staged", icon: "https://avatars.githubusercontent.com/u/1282980?s=200&v=4" },
    { id: "sonarqube", name: "SonarQube", category: "Code Quality/Linting", description: "Code quality and security analysis", website: "https://sonarqube.org", color: "#4E9BCD", npm: "# Install SonarQube server", icon: "https://avatars.githubusercontent.com/u/2607971?s=200&v=4" }
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
    "Validation",
    "GraphQL/API",
    "Real-time",
    "CMS",
    "Search",
    "Email",
    "Analytics",
    "Payment",
    "Storage",
    "Languages",
    "DevOps/Infrastructure",
    "Monitoring/Observability",
    "Message Queues/Event Streaming",
    "API Documentation",
    "Version Control",
    "Code Quality/Linting"
];