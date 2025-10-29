import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { PerformanceMonitoring } from "@/components/performance-monitoring";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tech Genie - AI-Powered Development",
  description: "Modern Next.js scaffold optimized for AI-powered development with Tech Genie. Built with TypeScript, Tailwind CSS, and shadcn/ui.",
  keywords: ["Tech Genie", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "AI development", "React"],
  authors: [{ name: "Tech Genie Team" }],
  openGraph: {
    title: "Tech Genie",
    description: "AI-powered development with modern React stack",
    url: "https://techgenie.dev",
    siteName: "Tech Genie",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Genie",
    description: "AI-powered development with modern React stack",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ErrorBoundary>
          <PerformanceMonitoring />
          {children}
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  );
}
