import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  serverExternalPackages: ['sharp', 'canvas'],
  experimental: {
    // Enable webpack 5 features
    webpackBuildWorker: true,
  },
  // Use the latest Next.js image optimization
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.org', pathname: '/**' },
      { protocol: 'https', hostname: '*.dev', pathname: '/**' },
      { protocol: 'https', hostname: '*.net', pathname: '/**' },
      { protocol: 'https', hostname: '*.io', pathname: '/**' },
      { protocol: 'https', hostname: '*.sh', pathname: '/**' },
      { protocol: 'https', hostname: '*.app', pathname: '/**' },
      { protocol: 'https', hostname: '*.tech', pathname: '/**' },
      { protocol: 'https', hostname: '*.build', pathname: '/**' },
      { protocol: 'https', hostname: '*.rs', pathname: '/**' },
      { protocol: 'https', hostname: '*.team', pathname: '/**' },
      { protocol: 'https', hostname: 'react.email', pathname: '/**' },
      { protocol: 'https', hostname: 'umami.is', pathname: '/**' },
      { protocol: 'https', hostname: 'asset.brandfetch.io', pathname: '/**' },
      // Specific domains for tech stack icons
      { protocol: 'https', hostname: 'testing-library.com', pathname: '/**' },
      { protocol: 'https', hostname: 'mobx.js.org', pathname: '/**' },
      { protocol: 'https', hostname: 'rollupjs.org', pathname: '/**' },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Enable the latest image optimization features
    formats: ['image/avif', 'image/webp'],
    // Use the fetch API for remote patterns
    unoptimized: false,
  },
};

export default nextConfig;
