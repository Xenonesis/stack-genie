import type { Metadata } from "next";
import { Open_Sans, Poppins, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { PerformanceMonitoring } from "@/components/performance-monitoring";
import { ThemeProvider } from "@/components/theme-provider";

const openSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
        className={`${openSans.variable} ${poppins.variable} ${ibmPlexMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary>
            <PerformanceMonitoring />
            {children}
            <Toaster />
          </ErrorBoundary>
        </ThemeProvider>
      </body>


    </html>
  );
}
