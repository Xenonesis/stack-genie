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
    { id: "react-router", name: "React Router", category: "Web Framework", description: "Declarative routing for React", website: "https://reactrouter.com", color: "#CA4245", npm: "npm install react-router-dom", icon: "https://avatars.githubusercontent.com/u/12504344?s=200&v=4" },
    { id: "tanstack-start", name: "TanStack Start", category: "Web Framework", description: "Full-stack React framework powered by TanStack Router", website: "https://tanstack.com/start", color: "#FD4F00", npm: "npm create @tanstack/start@latest", icon: "https://avatars.githubusercontent.com/u/72518640?s=200&v=4" },
    { id: "redwoodjs", name: "RedwoodJS", category: "Web Framework", description: "Full-stack JS framework for the JAMstack", website: "https://redwoodjs.com", color: "#BF4722", npm: "yarn create redwood-app", icon: "https://avatars.githubusercontent.com/u/45009844?s=200&v=4" },
    { id: "analog", name: "Analog", category: "Web Framework", description: "Full-stack meta-framework for Angular", website: "https://analogjs.org", color: "#DD0031", npm: "npm create analog@latest", icon: "https://avatars.githubusercontent.com/u/107374264?s=200&v=4" },

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
    { id: "neon", name: "Neon", category: "Database", description: "Serverless Postgres", website: "https://neon.tech", color: "#00E599", icon: "https://avatars.githubusercontent.com/u/77690634?s=200&v=4", npm: "npm install @neondatabase/serverless" },
    { id: "xata", name: "Xata", category: "Database", description: "Serverless database with built-in search", website: "https://xata.io", color: "#7C3AED", icon: "https://avatars.githubusercontent.com/u/75191490?s=200&v=4", npm: "npm install @xata.io/client" },
    { id: "firebase-firestore", name: "Firebase Firestore", category: "Database", description: "NoSQL document database", website: "https://firebase.google.com/products/firestore", color: "#FFCA28", npm: "npm install firebase", icon: "https://avatars.githubusercontent.com/u/1335026?s=200&v=4" },
    { id: "cassandra", name: "Apache Cassandra", category: "Database", description: "Distributed NoSQL database", website: "https://cassandra.apache.org", color: "#1287B1", npm: "npm install cassandra-driver", icon: "https://avatars.githubusercontent.com/u/47359?s=200&v=4" },
    { id: "influxdb", name: "InfluxDB", category: "Database", description: "Time series database", website: "https://influxdata.com", color: "#22ADF6", npm: "npm install @influxdata/influxdb-client", icon: "https://avatars.githubusercontent.com/u/5713248?s=200&v=4" },
    { id: "neo4j", name: "Neo4j", category: "Database", description: "Graph database", website: "https://neo4j.com", color: "#008CC1", npm: "npm install neo4j-driver", icon: "https://avatars.githubusercontent.com/u/201120?s=200&v=4" },
    { id: "clickhouse", name: "ClickHouse", category: "Database", description: "Open-source columnar database for analytics", website: "https://clickhouse.com", color: "#FFCC01", npm: "npm install @clickhouse/client", icon: "https://avatars.githubusercontent.com/u/54801242?s=200&v=4" },
    { id: "tidb", name: "TiDB", category: "Database", description: "Distributed SQL database with MySQL compatibility", website: "https://tidbcloud.com", color: "#E6006D", npm: "npm install mysql2", icon: "https://avatars.githubusercontent.com/u/41984085?s=200&v=4" },
    { id: "mariadb", name: "MariaDB", category: "Database", description: "Open-source relational database, MySQL drop-in replacement", website: "https://mariadb.org", color: "#003545", npm: "npm install mariadb", icon: "https://avatars.githubusercontent.com/u/111519?s=200&v=4" },
    { id: "surrealdb", name: "SurrealDB", category: "Database", description: "Multi-model database for modern applications", website: "https://surrealdb.com", color: "#FF00A0", npm: "npm install surrealdb.js", icon: "https://avatars.githubusercontent.com/u/10026800?s=200&v=4" },

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
    { id: "fastapi", name: "FastAPI", category: "Backend Framework", description: "Modern Python web framework for building APIs", website: "https://fastapi.tiangolo.com", color: "#009688", npm: "pip install fastapi", icon: "https://avatars.githubusercontent.com/u/15635592?s=200&v=4" },
    { id: "aspnet-core", name: "ASP.NET Core", category: "Backend Framework", description: "Cross-platform .NET web framework", website: "https://dotnet.microsoft.com/apps/aspnet", color: "#512BD4", npm: "dotnet new webapi", icon: "https://avatars.githubusercontent.com/u/9141961?s=200&v=4" },
    { id: "phoenix", name: "Phoenix", category: "Backend Framework", description: "Productive web framework for Elixir", website: "https://phoenixframework.org", color: "#FD4F00", npm: "mix archive.install hex phx_new", icon: "https://avatars.githubusercontent.com/u/164?s=200&v=4" },
    { id: "axum", name: "Axum", category: "Backend Framework", description: "Ergonomic Rust web framework", website: "https://github.com/tokio-rs/axum", color: "#000000", npm: "cargo add axum", icon: "https://avatars.githubusercontent.com/u/14062570?s=200&v=4" },

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
    { id: "styled-components", name: "Styled Components", category: "CSS Framework", description: "CSS-in-JS library", website: "https://styled-components.com", color: "#DB7093", icon: "https://avatars.githubusercontent.com/u/20658825?s=200&v=4", npm: "npm install styled-components" },
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
    { id: "testing-library", name: "Testing Library", category: "Testing", description: "Simple and complete testing utilities", website: "https://testing-library.com", color: "#E33332", npm: "npm install @testing-library/react", icon: "https://avatars.githubusercontent.com/u/49996085?s=200&v=4" },
    { id: "storybook", name: "Storybook", category: "Testing", description: "UI component development environment", website: "https://storybook.js.org", color: "#FF4785", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/storybook/storybook-original.svg", npm: "npx storybook@latest init" },
    { id: "msw", name: "Mock Service Worker (MSW)", category: "Testing", description: "API mocking library", website: "https://mswjs.io", color: "#FF6A33", icon: "https://avatars.githubusercontent.com/u/64637271?s=200&v=4", npm: "npm install msw" },
    { id: "jasmine", name: "Jasmine", category: "Testing", description: "Behavior-driven development framework", website: "https://jasmine.github.io", color: "#8A4182", npm: "npm install jasmine", icon: "https://avatars.githubusercontent.com/u/4624710?s=200&v=4" },
    { id: "mocha", name: "Mocha", category: "Testing", description: "JavaScript test framework", website: "https://mochajs.org", color: "#8D6748", npm: "npm install mocha", icon: "https://avatars.githubusercontent.com/u/8770005?s=200&v=4" },
    { id: "ava", name: "AVA", category: "Testing", description: "Node.js test runner", website: "https://github.com/avajs/ava", color: "#663399", npm: "npm install ava", icon: "https://avatars.githubusercontent.com/u/8527916?s=200&v=4" },
    { id: "webdriverio", name: "WebdriverIO", category: "Testing", description: "Browser and mobile automation test framework", website: "https://webdriver.io", color: "#EA5906", npm: "npm install @wdio/cli", icon: "https://avatars.githubusercontent.com/u/6512473?s=200&v=4" },
    { id: "k6", name: "k6", category: "Testing", description: "Developer-first load testing tool", website: "https://k6.io", color: "#7D64FF", npm: "npm install -g k6", icon: "https://avatars.githubusercontent.com/u/17356833?s=200&v=4" },
    { id: "testcontainers", name: "Testcontainers", category: "Testing", description: "Throwaway Docker containers for testing", website: "https://testcontainers.com", color: "#0F2B4D", npm: "npm install -D @testcontainers/postgresql", icon: "https://avatars.githubusercontent.com/u/15209772?s=200&v=4" },
    { id: "pact", name: "Pact", category: "Testing", description: "Contract testing framework", website: "https://pact.io", color: "#FFA000", npm: "npm install -D @pact-foundation/pact", icon: "https://avatars.githubusercontent.com/u/2013204?s=200&v=4" },
    { id: "faker", name: "Faker", category: "Testing", description: "Generate massive amounts of fake data", website: "https://fakerjs.dev", color: "#0F9D58", npm: "npm install -D @faker-js/faker", icon: "https://avatars.githubusercontent.com/u/29155814?s=200&v=4" },

    // Authentication
    { id: "nextauth", name: "NextAuth.js", category: "Authentication", description: "Complete open source authentication solution for Next.js applications", website: "https://next-auth.js.org", color: "#EB5424", npm: "npm install next-auth", icon: "https://avatars.githubusercontent.com/u/67470890?s=200&v=4" },
    { id: "auth0", name: "Auth0", category: "Authentication", description: "Secure access for everyone", website: "https://auth0.com", color: "#EB5424", npm: "npm install @auth0/nextjs-auth0", icon: "https://avatars.githubusercontent.com/u/2824157?s=200&v=4" },
    { id: "clerk", name: "Clerk", category: "Authentication", description: "More than authentication", website: "https://clerk.com", color: "#6C47FF", npm: "npm install @clerk/nextjs", icon: "https://avatars.githubusercontent.com/u/49538330?s=200&v=4" },
    { id: "supabase-auth", name: "Supabase Auth", category: "Authentication", description: "User management and authentication", website: "https://supabase.com/auth", color: "#3ECF8E", npm: "npm install @supabase/auth-ui-react", icon: "https://supabase.com/favicon/favicon-32x32.png" },
    { id: "firebase-auth", name: "Firebase Auth", category: "Authentication", description: "Simple, free multi-platform sign-in", website: "https://firebase.google.com/products/auth", color: "#FFCA28", npm: "npm install firebase", icon: "https://avatars.githubusercontent.com/u/1335026?s=200&v=4" },
    { id: "lucia", name: "Lucia", category: "Authentication", description: "Authentication library for TypeScript", website: "https://lucia-auth.com", color: "#5F57FF", icon: "https://avatars.githubusercontent.com/u/89729670?s=200&v=4", npm: "npm install lucia" },
    { id: "better-auth", name: "Better Auth", category: "Authentication", description: "The most comprehensive authentication framework", website: "https://better-auth.com", color: "#10B981", icon: "https://avatars.githubusercontent.com/u/180618636?s=200&v=4", npm: "npm install better-auth" },
    { id: "passport", name: "Passport.js", category: "Authentication", description: "Authentication middleware for Node.js", website: "https://passportjs.org", color: "#34E27A", npm: "npm install passport", icon: "https://avatars.githubusercontent.com/u/1160530?s=200&v=4" },
    { id: "kinde", name: "Kinde", category: "Authentication", description: "Modern authentication for apps", website: "https://kinde.com", color: "#FFC700", npm: "npm install @kinde-oss/kinde-auth-nextjs", icon: "https://avatars.githubusercontent.com/u/101196420?s=200&v=4" },
    { id: "workos", name: "WorkOS", category: "Authentication", description: "Enterprise-grade auth for developers", website: "https://workos.com", color: "#6366F1", npm: "npm install @workos-inc/node", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "keycloak", name: "Keycloak", category: "Authentication", description: "Open-source identity and access management", website: "https://keycloak.org", color: "#008AAA", npm: "# Deploy via Docker", icon: "https://avatars.githubusercontent.com/u/10639145?s=200&v=4" },

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
    { id: "liveblocks", name: "Liveblocks", category: "Real-time", description: "Real-time collaboration infrastructure", website: "https://liveblocks.io", color: "#F00000", npm: "npm install @liveblocks/client", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "livekit", name: "LiveKit", category: "Real-time", description: "Open-source WebRTC infrastructure", website: "https://livekit.io", color: "#00A3FF", npm: "npm install livekit-client", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "yjs", name: "Yjs", category: "Real-time", description: "CRDT framework for collaborative applications", website: "https://yjs.dev", color: "#000000", npm: "npm install yjs", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

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
    { id: "mixpanel", name: "Mixpanel", category: "Analytics", description: "Product analytics for modern teams", website: "https://mixpanel.com", color: "#7856FF", npm: "npm install mixpanel-browser", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "amplitude", name: "Amplitude", category: "Analytics", description: "Product analytics platform", website: "https://amplitude.com", color: "#1D4ED8", npm: "npm install @amplitude/analytics-browser", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "segment", name: "Segment", category: "Analytics", description: "Customer data platform", website: "https://segment.com", color: "#00B295", npm: "npm install @segment/analytics-next", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // Payment
    { id: "stripe", name: "Stripe", category: "Payment", description: "Online payment processing for internet businesses", website: "https://stripe.com", color: "#635BFF", npm: "npm install stripe @stripe/stripe-js", icon: "https://avatars.githubusercontent.com/u/856813?s=200&v=4" },
    { id: "paypal", name: "PayPal", category: "Payment", description: "Online payments system", website: "https://paypal.com", color: "#00457C", npm: "npm install @paypal/checkout-server-sdk", icon: "https://avatars.githubusercontent.com/u/476675?s=200&v=4" },
    { id: "lemon-squeezy", name: "Lemon Squeezy", category: "Payment", description: "The all-in-one platform for running your SaaS business", website: "https://lemonsqueezy.com", color: "#FFD23F", npm: "npm install @lemonsqueezy/lemonsqueezy.js", icon: "https://avatars.githubusercontent.com/u/82379168?s=200&v=4" },
    { id: "paddle", name: "Paddle", category: "Payment", description: "Merchant of record for SaaS businesses", website: "https://paddle.com", color: "#FFD23F", npm: "npm install @paddle/paddle-js", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // Storage/CDN
    { id: "cloudinary", name: "Cloudinary", category: "Storage", description: "Image and video management in the cloud", website: "https://cloudinary.com", color: "#3448C5", npm: "npm install cloudinary", icon: "https://avatars.githubusercontent.com/u/1460763?s=200&v=4" },
    { id: "uploadthing", name: "UploadThing", category: "Storage", description: "File uploads for modern web apps", website: "https://uploadthing.com", color: "#F97316", npm: "npm install uploadthing", icon: "https://avatars.githubusercontent.com/u/106103625?s=200&v=4" },
    { id: "aws-s3", name: "AWS S3", category: "Storage", description: "Object storage built to retrieve any amount of data from anywhere", website: "https://aws.amazon.com/s3", color: "#FF9900", npm: "npm install @aws-sdk/client-s3", icon: "https://avatars.githubusercontent.com/u/2232217?s=200&v=4" },
    { id: "vercel-blob", name: "Vercel Blob", category: "Storage", description: "Fast object storage for the frontend", website: "https://vercel.com/storage/blob", color: "#000000", npm: "npm install @vercel/blob", icon: "https://avatars.githubusercontent.com/u/14985020?s=200&v=4" },
    { id: "cloudflare-r2", name: "Cloudflare R2", category: "Storage", description: "S3-compatible object storage with zero egress fees", website: "https://cloudflare.com/r2", color: "#F38020", npm: "npm install @aws-sdk/client-s3", icon: "https://avatars.githubusercontent.com/u/314135?s=200&v=4" },
    { id: "backblaze-b2", name: "Backblaze B2", category: "Storage", description: "Affordable cloud object storage", website: "https://backblaze.com/b2", color: "#E31F24", npm: "npm install b2sdk", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },


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
    { id: "mobx", name: "MobX", category: "State Management", description: "Simple, scalable state management", website: "https://mobx.js.org", color: "#FF9955", icon: "https://avatars.githubusercontent.com/u/17475736?s=200&v=4", npm: "npm install mobx mobx-react-lite" },
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
    { id: "sonarqube", name: "SonarQube", category: "Code Quality/Linting", description: "Code quality and security analysis", website: "https://sonarqube.org", color: "#4E9BCD", npm: "# Install SonarQube server", icon: "https://avatars.githubusercontent.com/u/2607971?s=200&v=4" },

    // AI / LLM Tooling
    { id: "vercel-ai-sdk", name: "Vercel AI SDK", category: "AI/LLM", description: "TypeScript toolkit for building AI applications", website: "https://ai-sdk.dev", color: "#000000", npm: "npm install ai", icon: "https://avatars.githubusercontent.com/u/14985020?s=200&v=4" },
    { id: "langchain", name: "LangChain", category: "AI/LLM", description: "Framework for developing LLM-powered applications", website: "https://langchain.com", color: "#1C3C3C", npm: "npm install langchain", icon: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4" },
    { id: "llamaindex", name: "LlamaIndex", category: "AI/LLM", description: "Data framework for LLM applications", website: "https://llamaindex.ai", color: "#FF6F00", npm: "npm install llamaindex", icon: "https://avatars.githubusercontent.com/u/108554348?s=200&v=4" },
    { id: "openai", name: "OpenAI", category: "AI/LLM", description: "AI models and APIs for building intelligent applications", website: "https://openai.com", color: "#412991", npm: "npm install openai", icon: "https://avatars.githubusercontent.com/u/14957082?s=200&v=4" },
    { id: "anthropic", name: "Anthropic", category: "AI/LLM", description: "Claude AI models and API", website: "https://anthropic.com", color: "#D97757", npm: "npm install @anthropic-ai/sdk", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "huggingface", name: "Hugging Face", category: "AI/LLM", description: "AI model hub and inference API", website: "https://huggingface.co", color: "#FFD21E", npm: "npm install @huggingface/inference", icon: "https://avatars.githubusercontent.com/u/25720743?s=200&v=4" },
    { id: "ollama", name: "Ollama", category: "AI/LLM", description: "Run LLMs locally", website: "https://ollama.com", color: "#000000", npm: "curl -fsSL https://ollama.com/install.sh | sh", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "pgvector", name: "pgvector", category: "AI/LLM", description: "Open-source vector similarity search for Postgres", website: "https://github.com/pgvector/pgvector", color: "#336791", npm: "# Postgres extension", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // Vector Databases
    { id: "pinecone", name: "Pinecone", category: "Vector Database", description: "Vector database for AI applications", website: "https://pinecone.io", color: "#00C853", npm: "npm install @pinecone-database/pinecone", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "weaviate", name: "Weaviate", category: "Vector Database", description: "Open-source vector database", website: "https://weaviate.io", color: "#5A67D8", npm: "npm install weaviate-ts-client", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "qdrant", name: "Qdrant", category: "Vector Database", description: "Vector search engine", website: "https://qdrant.tech", color: "#FF3D00", npm: "npm install @qdrant/js-client-rest", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "chroma", name: "Chroma", category: "Vector Database", description: "AI-native open-source embedding database", website: "https://trychroma.com", color: "#7C3AED", npm: "npm install chromadb", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "milvus", name: "Milvus", category: "Vector Database", description: "Vector database for scalable similarity search", website: "https://milvus.io", color: "#00A1EA", npm: "npm install @zilliz/milvus2-sdk-node", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // Edge / Serverless Compute
    { id: "cloudflare-workers", name: "Cloudflare Workers", category: "Edge/Serverless", description: "Serverless execution at the edge", website: "https://workers.cloudflare.com", color: "#F38020", npm: "npm install -g wrangler", icon: "https://avatars.githubusercontent.com/u/314135?s=200&v=4" },
    { id: "deno-deploy", name: "Deno Deploy", category: "Edge/Serverless", description: "Global edge runtime for JavaScript and TypeScript", website: "https://deno.com/deploy", color: "#000000", npm: "npm install -g deployctl", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "aws-lambda", name: "AWS Lambda", category: "Edge/Serverless", description: "Serverless compute service", website: "https://aws.amazon.com/lambda", color: "#FF9900", npm: "npm install @aws-sdk/client-lambda", icon: "https://avatars.githubusercontent.com/u/2232217?s=200&v=4" },
    { id: "vercel-edge", name: "Vercel Edge", category: "Edge/Serverless", description: "Edge functions on Vercel", website: "https://vercel.com/docs/edge-network", color: "#000000", npm: "# Built into Vercel", icon: "https://avatars.githubusercontent.com/u/14985020?s=200&v=4" },

    // Feature Flags
    { id: "launchdarkly", name: "LaunchDarkly", category: "Feature Flags", description: "Feature management platform", website: "https://launchdarkly.com", color: "#00A3FF", npm: "npm install launchdarkly-node-server-sdk", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "flagsmith", name: "Flagsmith", category: "Feature Flags", description: "Open-source feature flag and remote config service", website: "https://flagsmith.com", color: "#FF6B35", npm: "npm install flagsmith", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "unleash", name: "Unleash", category: "Feature Flags", description: "Open-source feature management", website: "https://getunleash.io", color: "#E11D48", npm: "npm install unleash-client", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "growthbook", name: "GrowthBook", category: "Feature Flags", description: "Open-source feature flags and A/B testing", website: "https://growthbook.io", color: "#7C3AED", npm: "npm install @growthbook/growthbook", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // Background Jobs / Queues
    { id: "inngest", name: "Inngest", category: "Background Jobs", description: "Serverless background jobs and workflows", website: "https://inngest.com", color: "#7C3AED", npm: "npm install inngest", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "trigger-dev", name: "Trigger.dev", category: "Background Jobs", description: "Background jobs for TypeScript", website: "https://trigger.dev", color: "#FF4D00", npm: "npm install @trigger.dev/sdk", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "temporal", name: "Temporal", category: "Background Jobs", description: "Durable execution platform", website: "https://temporal.io", color: "#000000", npm: "npm install @temporalio/client", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // Dev Containers / Environments
    { id: "dev-container", name: "Dev Container", category: "Dev Environments", description: "Development containers specification", website: "https://containers.dev", color: "#2496ED", npm: "# VS Code extension", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "devpod", name: "DevPod", category: "Dev Environments", description: "Client-only, open-source dev environment tool", website: "https://devpod.sh", color: "#7C3AED", npm: "curl -fsSL https://devpod.sh/install.sh | bash", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "codespaces", name: "GitHub Codespaces", category: "Dev Environments", description: "Cloud development environments", website: "https://github.com/features/codespaces", color: "#2088FF", npm: "# GitHub feature", icon: "https://avatars.githubusercontent.com/u/44036562?s=200&v=4" },
    { id: "nix", name: "Nix", category: "Dev Environments", description: "Reproducible builds and dev environments", website: "https://nixos.org", color: "#5277C3", npm: "curl -L https://nixos.org/nix/install | sh", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // Web3 / Blockchain
    { id: "solidity", name: "Solidity", category: "Web3/Blockchain", description: "Contract-oriented programming language for Ethereum", website: "https://soliditylang.org", color: "#363636", npm: "npm install solc", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "hardhat", name: "Hardhat", category: "Web3/Blockchain", description: "Ethereum development environment", website: "https://hardhat.org", color: "#FFF100", npm: "npm install -D hardhat", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "foundry", name: "Foundry", category: "Web3/Blockchain", description: "Blazing fast, portable toolkit for Ethereum", website: "https://getfoundry.sh", color: "#FF6B35", npm: "curl -L https://foundry.paradigm.xyz | bash", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "wagmi", name: "Wagmi", category: "Web3/Blockchain", description: "React Hooks for Ethereum", website: "https://wagmi.sh", color: "#000000", npm: "npm install wagmi viem", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "viem", name: "Viem", category: "Web3/Blockchain", description: "TypeScript interface for Ethereum", website: "https://viem.sh", color: "#FFC94D", npm: "npm install viem", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "ipfs", name: "IPFS", category: "Web3/Blockchain", description: "Peer-to-peer hypermedia protocol", website: "https://ipfs.tech", color: "#65C2CB", npm: "npm install ipfs-http-client", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "thirdweb", name: "Thirdweb", category: "Web3/Blockchain", description: "Complete web3 development framework", website: "https://thirdweb.com", color: "#F213A4", npm: "npm install thirdweb", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // Data Engineering
    { id: "dbt", name: "dbt", category: "Data Engineering", description: "Data build tool for analytics engineering", website: "https://getdbt.com", color: "#FF694B", npm: "pip install dbt-core", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "airflow", name: "Apache Airflow", category: "Data Engineering", description: "Platform to programmatically author and schedule workflows", website: "https://airflow.apache.org", color: "#017CEE", npm: "pip install apache-airflow", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "metabase", name: "Metabase", category: "Data Engineering", description: "Open-source business intelligence tool", website: "https://metabase.com", color: "#509EE3", npm: "# Deploy via Docker", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "dagster", name: "Dagster", category: "Data Engineering", description: "Orchestration platform for data pipelines", website: "https://dagster.io", color: "#4E61A6", npm: "pip install dagster", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "prefect", name: "Prefect", category: "Data Engineering", description: "Workflow orchestration for data teams", website: "https://prefect.io", color: "#024DFF", npm: "pip install prefect", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "great-expectations", name: "Great Expectations", category: "Data Engineering", description: "Data quality validation framework", website: "https://greatexpectations.io", color: "#FF6B35", npm: "pip install great-expectations", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // API Gateway
    { id: "kong", name: "Kong", category: "API Gateway", description: "Cloud-native API gateway", website: "https://konghq.com", color: "#003459", npm: "# Deploy via Docker", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "traefik", name: "Traefik", category: "API Gateway", description: "Cloud-native application proxy", website: "https://traefik.io", color: "#24A1C1", npm: "# Deploy via Docker", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "envoy", name: "Envoy", category: "API Gateway", description: "Cloud-native high-performance proxy", website: "https://envoyproxy.io", color: "#AC6199", npm: "# Deploy via Docker", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "nginx", name: "NGINX", category: "API Gateway", description: "High-performance web server and reverse proxy", website: "https://nginx.org", color: "#009639", npm: "# Install from nginx.org", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "istio", name: "Istio", category: "API Gateway", description: "Service mesh for Kubernetes", website: "https://istio.io", color: "#466BB0", npm: "curl -L https://istio.io/downloadIstio | sh", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // Security
    { id: "snyk", name: "Snyk", category: "Security", description: "Developer security platform", website: "https://snyk.io", color: "#4C4A73", npm: "npm install -g snyk", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "trivy", name: "Trivy", category: "Security", description: "Comprehensive vulnerability scanner", website: "https://trivy.dev", color: "#1904DA", npm: "brew install trivy", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "vault", name: "HashiCorp Vault", category: "Security", description: "Secrets management and data protection", website: "https://vaultproject.io", color: "#000000", npm: "# Install from vaultproject.io", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "owasp-zap", name: "OWASP ZAP", category: "Security", description: "Web application security scanner", website: "https://zaproxy.org", color: "#4B4B4B", npm: "# Install ZAP app", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // Documentation
    { id: "docusaurus", name: "Docusaurus", category: "Documentation", description: "Documentation website generator", website: "https://docusaurus.io", color: "#3ECC5F", npm: "npx create-docusaurus@latest", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "vitepress", name: "VitePress", category: "Documentation", description: "Vite-powered static site generator for docs", website: "https://vitepress.dev", color: "#646CFF", npm: "npm install -D vitepress", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "mintlify", name: "Mintlify", category: "Documentation", description: "Modern documentation platform", website: "https://mintlify.com", color: "#0B0B0F", npm: "npm install -g mintlify", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "gitbook", name: "GitBook", category: "Documentation", description: "Documentation and knowledge base platform", website: "https://gitbook.com", color: "#3884FF", npm: "# Web platform", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // BaaS / Low-code
    { id: "appwrite", name: "Appwrite", category: "BaaS", description: "Open-source backend server", website: "https://appwrite.io", color: "#FD366E", npm: "npm install appwrite", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "pocketbase", name: "PocketBase", category: "BaaS", description: "Open-source backend in a single file", website: "https://pocketbase.io", color: "#B8DBE4", npm: "# Download binary", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "directus", name: "Directus", category: "BaaS", description: "Open-source data platform", website: "https://directus.io", color: "#263238", npm: "npm install directus", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "nhost", name: "Nhost", category: "BaaS", description: "Open-source Firebase alternative with GraphQL", website: "https://nhost.io", color: "#0EA5E9", npm: "npm install @nhost/react", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // Workflow Automation
    { id: "n8n", name: "n8n", category: "Workflow Automation", description: "Fair-code workflow automation tool", website: "https://n8n.io", color: "#EA4B71", npm: "npx n8n", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "windmill", name: "Windmill", category: "Workflow Automation", description: "Developer platform for workflows and internal tools", website: "https://windmill.dev", color: "#4E80EE", npm: "npm install -g windmill-cli", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // Data Visualization
    { id: "d3", name: "D3.js", category: "Data Visualization", description: "Data-driven documents for the web", website: "https://d3js.org", color: "#F9A03C", npm: "npm install d3", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "chartjs", name: "Chart.js", category: "Data Visualization", description: "Simple yet flexible JavaScript charting", website: "https://chartjs.org", color: "#FF6384", npm: "npm install chart.js", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "echarts", name: "Apache ECharts", category: "Data Visualization", description: "Powerful charting and visualization library", website: "https://echarts.apache.org", color: "#AA344D", npm: "npm install echarts", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "recharts", name: "Recharts", category: "Data Visualization", description: "Composable charting library built on React components", website: "https://recharts.org", color: "#22B8CF", npm: "npm install recharts", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // Video / Streaming
    { id: "mux", name: "Mux", category: "Video/Streaming", description: "Video API for developers", website: "https://mux.com", color: "#1B1B1F", npm: "npm install @mux/mux-node", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "cloudflare-stream", name: "Cloudflare Stream", category: "Video/Streaming", description: "Video streaming and encoding", website: "https://cloudflare.com/stream", color: "#F38020", npm: "# Cloudflare API", icon: "https://avatars.githubusercontent.com/u/314135?s=200&v=4" },
    { id: "twilio", name: "Twilio", category: "Video/Streaming", description: "Communication APIs for voice, video, and messaging", website: "https://twilio.com", color: "#F22F46", npm: "npm install twilio", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // MLOps
    { id: "mlflow", name: "MLflow", category: "MLOps", description: "Open-source platform for ML lifecycle", website: "https://mlflow.org", color: "#0194E2", npm: "pip install mlflow", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "weights-biases", name: "Weights & Biases", category: "MLOps", description: "ML experiment tracking and visualization", website: "https://wandb.ai", color: "#FFBE00", npm: "pip install wandb", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "ray", name: "Ray", category: "MLOps", description: "Distributed computing framework for AI", website: "https://ray.io", color: "#028CF0", npm: "pip install ray", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // Additional Languages
    { id: "elixir", name: "Elixir", category: "Languages", description: "Functional language built on the Erlang VM", website: "https://elixir-lang.org", color: "#4E2A8E", npm: "# Install from elixir-lang.org", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "zig", name: "Zig", category: "Languages", description: "General-purpose low-level programming language", website: "https://ziglang.org", color: "#F7A41D", npm: "# Install from ziglang.org", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // Additional Databases
    { id: "timescaledb", name: "TimescaleDB", category: "Database", description: "Time-series database built on PostgreSQL", website: "https://timescale.com", color: "#FDB515", npm: "# Postgres extension", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "duckdb", name: "DuckDB", category: "Database", description: "In-process analytical database", website: "https://duckdb.org", color: "#FFF000", npm: "npm install duckdb", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // Additional Monitoring
    { id: "grafana-loki", name: "Grafana Loki", category: "Monitoring/Observability", description: "Log aggregation system", website: "https://grafana.com/oss/loki", color: "#F46800", npm: "# Deploy via Docker", icon: "https://avatars.githubusercontent.com/u/7195757?s=200&v=4" },
    { id: "better-stack", name: "Better Stack", category: "Monitoring/Observability", description: "Log management and uptime monitoring", website: "https://betterstack.com", color: "#000000", npm: "npm install @betterstack/logging", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // AI Agents / Orchestration
    { id: "langgraph", name: "LangGraph", category: "AI Agents", description: "Build stateful, agentic AI applications", website: "https://langchain-ai.github.io/langgraph", color: "#1C3C3C", npm: "npm install @langchain/langgraph", icon: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4" },
    { id: "crewai", name: "CrewAI", category: "AI Agents", description: "Framework for orchestrating role-playing AI agents", website: "https://crewai.com", color: "#FF5A5F", npm: "pip install crewai", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "autogen", name: "AutoGen", category: "AI Agents", description: "Multi-agent conversation framework from Microsoft", website: "https://microsoft.github.io/autogen", color: "#0078D4", npm: "pip install pyautogen", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "flowise", name: "Flowise", category: "AI Agents", description: "Drag & drop UI to build LLM apps", website: "https://flowiseai.com", color: "#7C3AED", npm: "npx flowise start", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // 3D / Game Development
    { id: "threejs", name: "Three.js", category: "3D/Game Dev", description: "3D library for the web", website: "https://threejs.org", color: "#000000", npm: "npm install three", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "babylonjs", name: "Babylon.js", category: "3D/Game Dev", description: "Powerful 3D engine for the web", website: "https://babylonjs.com", color: "#BB464B", npm: "npm install @babylonjs/core", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "phaser", name: "Phaser", category: "3D/Game Dev", description: "Fast 2D game framework", website: "https://phaser.io", color: "#8BC34A", npm: "npm install phaser", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "react-three-fiber", name: "React Three Fiber", category: "3D/Game Dev", description: "React renderer for Three.js", website: "https://docs.pmnd.rs/react-three-fiber", color: "#000000", npm: "npm install @react-three/fiber", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // Maps / Geolocation
    { id: "mapbox", name: "Mapbox", category: "Maps/Geo", description: "Custom maps and location services", website: "https://mapbox.com", color: "#4264FB", npm: "npm install mapbox-gl", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "leaflet", name: "Leaflet", category: "Maps/Geo", description: "Open-source interactive maps", website: "https://leafletjs.com", color: "#199900", npm: "npm install leaflet", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "maplibre", name: "MapLibre GL", category: "Maps/Geo", description: "Open-source vector map renderer", website: "https://maplibre.org", color: "#396CB2", npm: "npm install maplibre-gl", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "google-maps", name: "Google Maps", category: "Maps/Geo", description: "Google Maps Platform", website: "https://developers.google.com/maps", color: "#4285F4", npm: "npm install @googlemaps/js-api-loader", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // Push Notifications
    { id: "onesignal", name: "OneSignal", category: "Push Notifications", description: "Push notifications for web and mobile", website: "https://onesignal.com", color: "#E54B4B", npm: "npm install onesignal", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "firebase-messaging", name: "Firebase Cloud Messaging", category: "Push Notifications", description: "Cross-platform messaging solution", website: "https://firebase.google.com/products/cloud-messaging", color: "#FFCA28", npm: "npm install firebase", icon: "https://avatars.githubusercontent.com/u/1335026?s=200&v=4" },

    // Voice / Audio
    { id: "whisper", name: "OpenAI Whisper", category: "Voice/Audio", description: "Speech recognition and transcription", website: "https://openai.com/research/whisper", color: "#412991", npm: "pip install openai-whisper", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "elevenlabs", name: "ElevenLabs", category: "Voice/Audio", description: "AI voice generation and text-to-speech", website: "https://elevenlabs.io", color: "#000000", npm: "npm install elevenlabs", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "howler", name: "Howler.js", category: "Voice/Audio", description: "Audio library for the modern web", website: "https://howlerjs.com", color: "#FF6B35", npm: "npm install howler", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // Performance / Web Vitals
    { id: "lighthouse", name: "Lighthouse", category: "Performance", description: "Automated auditing for web performance", website: "https://developers.google.com/web/tools/lighthouse", color: "#F44B21", npm: "npm install -g lighthouse", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "web-vitals", name: "Web Vitals", category: "Performance", description: "Essential metrics for healthy site", website: "https://web.dev/vitals", color: "#4285F4", npm: "npm install web-vitals", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "bundlephobia", name: "BundlePhobia", category: "Performance", description: "Bundle size analysis for npm packages", website: "https://bundlephobia.com", color: "#EF4444", npm: "# Web tool", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // Accessibility
    { id: "axe-core", name: "axe-core", category: "Accessibility", description: "Accessibility testing engine", website: "https://deque.com/axe", color: "#F04E23", npm: "npm install axe-core", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "pa11y", name: "Pa11y", category: "Accessibility", description: "Automated accessibility testing", website: "https://pa11y.org", color: "#4B0082", npm: "npm install -g pa11y", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // Internationalization
    { id: "i18next", name: "i18next", category: "Internationalization", description: "Internationalization framework for JavaScript", website: "https://i18next.com", color: "#26A69A", npm: "npm install i18next", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "next-intl", name: "next-intl", category: "Internationalization", description: "Internationalization for Next.js", website: "https://next-intl-docs.vercel.app", color: "#000000", npm: "npm install next-intl", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "react-i18next", name: "react-i18next", category: "Internationalization", description: "React bindings for i18next", website: "https://react.i18next.com", color: "#26A69A", npm: "npm install react-i18next", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // OpenTelemetry
    { id: "opentelemetry", name: "OpenTelemetry", category: "OpenTelemetry", description: "Open-source observability framework", website: "https://opentelemetry.io", color: "#425CC7", npm: "npm install @opentelemetry/api", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // IoT
    { id: "mqtt", name: "MQTT", category: "IoT", description: "Lightweight messaging protocol for IoT", website: "https://mqtt.org", color: "#660066", npm: "npm install mqtt", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "esp32", name: "ESP32", category: "IoT", description: "Low-cost microcontroller with WiFi/Bluetooth", website: "https://espressif.com", color: "#E7352C", npm: "# Hardware platform", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "arduino", name: "Arduino", category: "IoT", description: "Open-source electronics platform", website: "https://arduino.cc", color: "#00979D", npm: "# Hardware platform", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" }
,
    // Additional Technologies - State Management
    { id: "redux", name: "Redux", category: "State Management", description: "Predictable state container for JavaScript apps", website: "https://redux.js.org", color: "#764ABC", npm: "npm install @reduxjs/toolkit react-redux", icon: "https://redux.js.org/icons/redux-131x131.png" },
    { id: "mobx", name: "MobX", category: "State Management", description: "Simple, scalable state management", website: "https://mobx.js.org", color: "#FF9955", npm: "npm install mobx mobx-react-lite", icon: "https://avatars.githubusercontent.com/u/17475736?s=200&v=4" },
    { id: "xstate", name: "XState", category: "State Management", description: "State machines and statecharts", website: "https://xstate.js.org", color: "#2C3E50", npm: "npm install xstate", icon: "https://avatars.githubusercontent.com/u/28773662?s=200&v=4" },
    { id: "valtio", name: "Valtio", category: "State Management", description: "Makes proxy-state simple for React and Vanilla", website: "https://valtio.pmnd.rs", color: "#1E40AF", npm: "npm install valtio", icon: "https://avatars.githubusercontent.com/u/45790596?s=200&v=4" },
    { id: "nanostores", name: "Nanostores", category: "State Management", description: "Tiny state manager", website: "https://github.com/nanostores/nanostores", color: "#FF6B35", npm: "npm install nanostores", icon: "https://avatars.githubusercontent.com/u/84611369?s=200&v=4" },
    { id: "jotai", name: "Jotai", category: "State Management", description: "Primitive and flexible state management for React", website: "https://jotai.org", color: "#000000", npm: "npm install jotai", icon: "https://jotai.org/favicon.svg" },
    { id: "recoil", name: "Recoil", category: "State Management", description: "Experimental state management library for React apps", website: "https://recoiljs.org", color: "#3578E5", npm: "npm install recoil", icon: "https://recoiljs.org/img/favicon.png" },

    // GraphQL/API
    { id: "graphql", name: "GraphQL", category: "GraphQL/API", description: "Query language for APIs and runtime for executing those queries", website: "https://graphql.org", color: "#E535AB", npm: "npm install graphql", icon: "https://graphql.org/img/favicon.ico" },
    { id: "grpc", name: "gRPC", category: "GraphQL/API", description: "High-performance RPC framework using HTTP/2", website: "https://grpc.io", color: "#4285F4", npm: "npm install @grpc/grpc-js @grpc/proto-loader", icon: "https://grpc.io/img/icons/icon-192x192.png" },

    // API Gateway
    { id: "aws-api-gateway", name: "AWS API Gateway", category: "API Gateway", description: "Fully managed service for creating, publishing, and maintaining APIs at any scale", website: "https://aws.amazon.com/api-gateway", color: "#FF9900", npm: "npm install aws-sdk", icon: "https://avatars.githubusercontent.com/u/2232217?s=200&v=4" },
    { id: "kong", name: "Kong", category: "API Gateway", description: "Commercial-grade API gateway and micro-service management layer", website: "https://konghq.com", color: "#003459", npm: "# Deploy via Docker", icon: "https://konghq.com/images/new-kong-logo.svg" },

    // Monitoring/Observability
    { id: "logrocket", name: "LogRocket", category: "Monitoring/Observability", description: "Session replay and performance monitoring for web apps", website: "https://logrocket.com", color: "#00A884", npm: "npm install logrocket", icon: "https://logrocket.com/favicon.ico" },
    { id: "raptor", name: "Raptor", category: "Monitoring/Observability", description: "Real-user monitoring for web applications", website: "https://raptor.com.au", color: "#0066CC", npm: "# Browser RUM" },
    { id: "google-lighthouse", name: "Google Lighthouse", category: "Performance", description: "Automated auditing tool for web performance, accessibility, and SEO", website: "https://developers.google.com/web/tools/lighthouse", color: "#4CAF50", npm: "npm install -g lighthouse", icon: "https://www.google.com/favicon.ico" },
    { id: "webpagetest", name: "WebPageTest", category: "Performance", description: "Website speed test from global locations with real browsers", website: "https://webpagetest.org", color: "#0F60AB", npm: "# Web tool", icon: "https://www.webpagetest.org/assets/images/favicon.ico" },
    { id: "sitespeedio", name: "Sitespeed.io", category: "Performance", description: "Web performance monitoring and benchmarking tool", website: "https://sitespeed.io", color: "#FF8C00", npm: "npm install -g @sitespeedio/sitespeed.io", icon: "https://sitespeed.io/images/favicons/favicon.ico" },

    // Security
    { id: "dependency-check", name: "OWASP Dependency-Check", category: "Security", description: "Identify project dependencies with known vulnerabilities", website: "https://owasp.org/www-project-dependency-check/", color: "#000000", npm: "npm install -g dependency-check", icon: "https://owasp.org/assets/img/pages/projects/dependency-check/logo-horizontal.svg" },

    // Background Jobs
    { id: "bullmq", name: "BullMQ", category: "Background Jobs", description: "Redis-based queue for Node.js with priority and delayed jobs", website: "https://github.com/taskforcesh/bullmq", color: "#00AD66", npm: "npm install bullmq", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },
    { id: "agenda", name: "Agenda", category: "Background Jobs", description: "Mongo-backed job scheduling for Node.js", website: "https://github.com/rs/node-agenda", color: "#456194", npm: "npm install agenda", icon: "https://avatars.githubusercontent.com/u/10022570?s=200&v=4" },

    // Video/Streaming
    { id: "videojs", name: "Video.js", category: "Video/Streaming", description: "HTML5 video player library", website: "https://videojs.com", color: "#000000", npm: "npm install video.js", icon: "https://videojs.com/img/favicon.ico" },
    { id: "plyr", name: "Plyr", category: "Video/Streaming", description: "Simple, responsive HTML5 media player", website: "https://plyr.io", color: "#000000", npm: "npm install plyr", icon: "https://plyr.io/img/favicon-192x192.png" },
    { id: "hlsjs", name: "HLS.js", category: "Video/Streaming", description: "JavaScript HLS client for adaptive streaming", website: "https://github.com/video-dev/hls.js", color: "#000000", npm: "npm install hls.js", icon: "https://github.com/video-dev/hls.js/raw/master/docs/images/favicon.ico" },

    // Voice/Audio
    { id: "howler", name: "Howler.js", category: "Voice/Audio", description: "Audio library for the modern web with Web Audio API", website: "https://howlerjs.com", color: "#FF6B35", npm: "npm install howler", icon: "https://howlerjs.com/img/favicon.ico" },
    { id: "tonejs", name: "Tone.js", category: "Voice/Audio", description: "Web Audio framework for creating musically meaningful sounds", website: "https://tonejs.github.io", color: "#FF6B35", npm: "npm install tone", icon: "https://tonejs.github.io/img/tone.svg" },

    // DevOps/Infrastructure
    { id: "aws-cdk", name: "AWS CDK", category: "DevOps/Infrastructure", description: "Infrastructure as code using familiar programming languages", website: "https://docs.aws.amazon.com/cdk", color: "#FF9900", npm: "npm install aws-cdk", icon: "https://docs.aws.amazon.com/cdk/api/latest/img/aws-cdk-icon.png" },
    { id: "argo-cd", name: "Argo CD", category: "DevOps/Infrastructure", description: "Continuous delivery tool for Kubernetes with GitOps", website: "https://argoproj.github.io/argo-cd/", color: "#0084B5", npm: "kubectl apply -n argocd", icon: "https://argoproj.github.io/img/logo-argo-cd.svg" },

    // Internationalization
    { id: "crowdin", name: "Crowdin", category: "Internationalization", description: "Continuous localization platform for software and content", website: "https://crowdin.com", color: "#00C1B5", npm: "# Web service", icon: "https://crowdin.com/favicon.ico" },
    { id: "lokalise", name: "Lokalise", category: "Internationalization", description: "Translation management platform for teams", website: "https://lokalise.com", color: "#FF6F00", npm: "# Web service", icon: "https://lokalise.com/favicon.ico" },

    // Workflow Automation
    { id: "zapier", name: "Zapier", category: "Workflow Automation", description: "No-code automation platform connecting 5,000+ apps", website: "https://zapier.com", color: "#FF4D00", npm: "# Web service", icon: "https://zapier.com/favicon.ico" },
    { id: "make", name: "Make (Integromat)", category: "Workflow Automation", description: "Visual automation platform for business workflows", website: "https://make.com", color: "#002B5C", npm: "# Web service", icon: "https://make.com/img/favicon.ico" },

    // IoT
    { id: "raspberrypi", name: "Raspberry Pi", category: "IoT", description: "Single-board computer for IoT projects", website: "https://raspberrypi.org", color: "#A2AAAD", npm: "# Hardware platform", icon: "https://avatars.githubusercontent.com/u/43035311?s=200&v=4" },
    { id: "micropython", name: "MicroPython", category: "IoT", description: "Python implementation for microcontrollers", website: "https://micropython.org", color: "#A2AAAD", npm: "pip install micropython", icon: "https://avatars.githubusercontent.com/u/41427671?s=200&v=4" },

    // Database
    { id: "duckdb", name: "DuckDB", category: "Database", description: "In-process analytical database system", website: "https://duckdb.org", color: "#FFF000", npm: "npm install duckdb", icon: "https://duckdb.org/img/duckdb-logo.svg" },
    { id: "timescaledb", name: "TimescaleDB", category: "Database", description: "PostgreSQL extension for time-series data", website: "https://timescale.com", color: "#FDB515", npm: "# Postgres extension", icon: "https://timescale.com/images/timescale-logo-colour.svg" },

    // ORM
    { id: "prisma-client", name: "Prisma Client", category: "ORM", description: "Generated TypeScript/JavaScript ORM for type-safe database access", website: "https://www.prisma.io", color: "#2D3748", npm: "npm install @prisma/client", icon: "https://www.prisma.io/images/favicon/favicon.ico" },
    { id: "typeorm", name: "TypeORM", category: "ORM", description: "ORM for TypeScript and JavaScript supporting many databases", website: "https://typeorm.io", color: "#E83524", npm: "npm install typeorm", icon: "https://typeorm.io/img/typeorm.png" },
    { id: "sequelize", name: "Sequelize", category: "ORM", description: "Promise-based ORM for Postgres, MySQL, SQLite and more", website: "https://sequelize.org", color: "#52B0E7", npm: "npm install sequelize", icon: "https://sequelize.org/img/logo-gradient.svg" },
    { id: "mongoose", name: "Mongoose", category: "ORM", description: "Elegant MongoDB object modeling for Node.js", website: "https://mongoosejs.com", color: "#880000", npm: "npm install mongoose", icon: "https://mongoosejs.com/docs/images/mongoose-logo-white.png" },
    { id: "knex", name: "Knex.js", category: "ORM", description: "SQL query builder for PostgreSQL, MySQL, SQLite and more", website: "https://knexjs.org", color: "#D26B38", npm: "npm install knex", icon: "https://knexjs.org/img/knex-icon.svg" },

    // OpenTelemetry
    { id: "opentelemetry", name: "OpenTelemetry", category: "OpenTelemetry", description: "Vendor-neutral observability framework for distributed systems", website: "https://opentelemetry.io", color: "#425CC7", npm: "npm install @opentelemetry/api", icon: "https://opentelemetry.io/img/full-colorLogo.svg" },
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
    "Code Quality/Linting",
    "AI/LLM",
    "Vector Database",
    "Edge/Serverless",
    "Feature Flags",
    "Background Jobs",
    "Dev Environments",
    "Web3/Blockchain",
    "Data Engineering",
    "API Gateway",
    "Security",
    "Documentation",
    "BaaS",
    "Workflow Automation",
    "Data Visualization",
    "Video/Streaming",
    "MLOps",
    "AI Agents",
    "3D/Game Dev",
    "Maps/Geo",
    "Push Notifications",
    "Voice/Audio",
    "Performance",
    "Accessibility",
    "Internationalization",
    "OpenTelemetry",
    "IoT"
];
