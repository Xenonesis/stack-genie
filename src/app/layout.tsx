import type { Metadata } from "next";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { PerformanceMonitoring } from "@/components/performance-monitoring";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Stack Genie — AI Stack Architect",
  description: "Build, analyze, and optimize your perfect tech stack with Stack Genie AI.",
  keywords: ["Stack Genie", "Tech Stack", "Next.js", "TypeScript", "Tailwind CSS", "AI Development", "React"],
  icons: {
    icon: "/icon",
    apple: "/icon",
  },
  openGraph: {
    title: "Stack Genie",
    description: "AI Stack Architect & Infrastructure Builder",
    url: "https://stackgenie.dev",
    siteName: "Stack Genie",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stack Genie",
    description: "AI Stack Architect & Infrastructure Builder",
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
        className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
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
