"use client";

import { useEffect } from "react";
import { initWebVitals } from "@/lib/performance";

/**
 * Client-side performance monitoring initialization
 * Automatically tracks Web Vitals and custom metrics
 */
export function PerformanceMonitoring() {
    useEffect(() => {
        // Initialize Web Vitals monitoring on mount
        initWebVitals();
    }, []);

    return null; // This component doesn't render anything
}
