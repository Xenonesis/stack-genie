import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  images: {
    remotePatterns: [
      // CDN and GitHub
      { protocol: 'https', hostname: 'cdn.jsdelivr.net', pathname: '/**' },
      { protocol: 'https', hostname: '*.githubusercontent.com', pathname: '/**' },
      { protocol: 'https', hostname: 'github.com', pathname: '/**' },
      
      // Google services (consolidated)
      { protocol: 'https', hostname: '*.google.com', pathname: '/**' },
      { protocol: 'https', hostname: 'firebase.google.com', pathname: '/**' },
      
      // Major frameworks
      { protocol: 'https', hostname: 'nuxt.com', pathname: '/**' },
      { protocol: 'https', hostname: 'astro.build', pathname: '/**' },
      { protocol: 'https', hostname: '*.solidjs.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.builder.io', pathname: '/**' },
      { protocol: 'https', hostname: 'vitejs.dev', pathname: '/**' },
      
      // Database services
      { protocol: 'https', hostname: 'supabase.com', pathname: '/**' },
      { protocol: 'https', hostname: 'planetscale.com', pathname: '/**' },
      { protocol: 'https', hostname: 'turso.tech', pathname: '/**' },
      { protocol: 'https', hostname: '*.drizzle.team', pathname: '/**' },
      { protocol: 'https', hostname: 'sequelize.org', pathname: '/**' },
      { protocol: 'https', hostname: 'mongoosejs.com', pathname: '/**' },
      
      // UI frameworks
      { protocol: 'https', hostname: 'mui.com', pathname: '/**' },
      { protocol: 'https', hostname: 'mantine.dev', pathname: '/**' },
      { protocol: 'https', hostname: '*.shadcn.com', pathname: '/**' },
      { protocol: 'https', hostname: 'gw.alipayobjects.com', pathname: '/**' },
      
      // Build tools
      { protocol: 'https', hostname: 'bun.sh', pathname: '/**' },
      { protocol: 'https', hostname: 'pnpm.io', pathname: '/**' },
      { protocol: 'https', hostname: '*.build', pathname: '/**' },
      { protocol: 'https', hostname: 'nx.dev', pathname: '/**' },
      { protocol: 'https', hostname: '*.org', pathname: '/**' },
      { protocol: 'https', hostname: '*.github.io', pathname: '/**' },
      
      // Testing
      { protocol: 'https', hostname: 'playwright.dev', pathname: '/**' },
      { protocol: 'https', hostname: 'vitest.dev', pathname: '/**' },
      { protocol: 'https', hostname: 'testing-library.com', pathname: '/**' },
      
      // Authentication
      { protocol: 'https', hostname: '*.js.org', pathname: '/**' },
      { protocol: 'https', hostname: 'clerk.com', pathname: '/**' },
      { protocol: 'https', hostname: 'clerk.dev', pathname: '/**' },
      { protocol: 'https', hostname: '*.auth0.com', pathname: '/**' },
      
      // State management
      { protocol: 'https', hostname: '*.pmnd.rs', pathname: '/**' },
      { protocol: 'https', hostname: 'jotai.org', pathname: '/**' },
      { protocol: 'https', hostname: 'recoiljs.org', pathname: '/**' },
      
      // Hosting
      { protocol: 'https', hostname: '*.vercel.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.netlify.com', pathname: '/**' },
      { protocol: 'https', hostname: 'railway.app', pathname: '/**' },
      { protocol: 'https', hostname: 'render.com', pathname: '/**' },
      { protocol: 'https', hostname: 'fly.io', pathname: '/**' },
      { protocol: 'https', hostname: '*.cloudflare.com', pathname: '/**' },
      
      // Mobile/Native
      { protocol: 'https', hostname: '*.expo.dev', pathname: '/**' },
      { protocol: 'https', hostname: 'tauri.app', pathname: '/**' },
      
      // Other services
      { protocol: 'https', hostname: '*.io', pathname: '/**' },
      { protocol: 'https', hostname: '*.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.dev', pathname: '/**' },
    ],
    // Allow any HTTPS domain for development
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
