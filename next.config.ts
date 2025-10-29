import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.org', pathname: '/**' },
      { protocol: 'https', hostname: '**.dev', pathname: '/**' },
      { protocol: 'https', hostname: '**.net', pathname: '/**' },
      { protocol: 'https', hostname: '**.io', pathname: '/**' },
      { protocol: 'https', hostname: '**.sh', pathname: '/**' },
      { protocol: 'https', hostname: '**.app', pathname: '/**' },
      { protocol: 'https', hostname: '**.tech', pathname: '/**' },
      { protocol: 'https', hostname: '**.build', pathname: '/**' },
      { protocol: 'https', hostname: '**.rs', pathname: '/**' },
      { protocol: 'https', hostname: '**.team', pathname: '/**' },
      { protocol: 'https', hostname: 'react.email', pathname: '/**' },
      { protocol: 'https', hostname: 'umami.is', pathname: '/**' },
      { protocol: 'https', hostname: 'asset.brandfetch.io', pathname: '/**' },
    ],
    // Allow any HTTPS domain for development
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
