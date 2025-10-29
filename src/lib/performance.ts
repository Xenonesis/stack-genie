/**
 * Performance monitoring utility for tracking application metrics
 * Integrates with Web Vitals API to measure real user performance
 */

import { logger } from './logger';

export interface PerformanceMetric {
    name: string;
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
    timestamp: number;
}

type ReportCallback = (metric: PerformanceMetric) => void;

class PerformanceMonitor {
    private metrics: PerformanceMetric[] = [];
    private callbacks: ReportCallback[] = [];

    /**
     * Register a callback to be called when metrics are collected
     */
    onReport(callback: ReportCallback) {
        this.callbacks.push(callback);
    }

    /**
     * Report a metric to all registered callbacks
     */
    private report(metric: PerformanceMetric) {
        this.metrics.push(metric);
        logger.info(`Performance: ${metric.name} = ${metric.value}ms (${metric.rating})`);
        
        this.callbacks.forEach(callback => {
            try {
                callback(metric);
            } catch (error) {
                logger.error('Error in performance callback:', error);
            }
        });
    }

    /**
     * Measure time to first byte (TTFB)
     */
    measureTTFB() {
        if (typeof window === 'undefined') return;

        try {
            const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
            if (navigationEntry) {
                const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
                this.report({
                    name: 'TTFB',
                    value: Math.round(ttfb),
                    rating: ttfb < 600 ? 'good' : ttfb < 1500 ? 'needs-improvement' : 'poor',
                    timestamp: Date.now(),
                });
            }
        } catch (error) {
            logger.error('Error measuring TTFB:', error);
        }
    }

    /**
     * Measure page load time
     */
    measurePageLoad() {
        if (typeof window === 'undefined') return;

        try {
            window.addEventListener('load', () => {
                const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
                if (navigationEntry) {
                    const loadTime = navigationEntry.loadEventEnd - navigationEntry.fetchStart;
                    this.report({
                        name: 'Page Load',
                        value: Math.round(loadTime),
                        rating: loadTime < 2000 ? 'good' : loadTime < 4000 ? 'needs-improvement' : 'poor',
                        timestamp: Date.now(),
                    });
                }
            });
        } catch (error) {
            logger.error('Error measuring page load:', error);
        }
    }

    /**
     * Measure custom timing (e.g., component render time, API call time)
     */
    measureCustom(name: string, startTime: number, endTime: number = performance.now()) {
        const duration = endTime - startTime;
        this.report({
            name,
            value: Math.round(duration),
            rating: duration < 100 ? 'good' : duration < 300 ? 'needs-improvement' : 'poor',
            timestamp: Date.now(),
        });
    }

    /**
     * Start a custom performance measurement
     */
    startMeasure(name: string): () => void {
        const startTime = performance.now();
        return () => {
            this.measureCustom(name, startTime);
        };
    }

    /**
     * Get all collected metrics
     */
    getMetrics(): PerformanceMetric[] {
        return [...this.metrics];
    }

    /**
     * Clear all collected metrics
     */
    clearMetrics() {
        this.metrics = [];
    }

    /**
     * Get performance summary statistics
     */
    getSummary() {
        if (this.metrics.length === 0) {
            return {
                total: 0,
                good: 0,
                needsImprovement: 0,
                poor: 0,
                averageValue: 0,
            };
        }

        const summary = this.metrics.reduce(
            (acc, metric) => {
                acc.total++;
                acc[metric.rating === 'good' ? 'good' : metric.rating === 'needs-improvement' ? 'needsImprovement' : 'poor']++;
                acc.totalValue += metric.value;
                return acc;
            },
            { total: 0, good: 0, needsImprovement: 0, poor: 0, totalValue: 0 }
        );

        return {
            ...summary,
            averageValue: Math.round(summary.totalValue / summary.total),
        };
    }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

/**
 * Initialize Web Vitals monitoring (for Next.js)
 * Add this to your app or layout component
 */
export function initWebVitals() {
    if (typeof window === 'undefined') return;

    performanceMonitor.measureTTFB();
    performanceMonitor.measurePageLoad();

    // You can integrate with real analytics services here
    performanceMonitor.onReport((metric) => {
        // Example: Send to analytics service
        // analytics.track('Performance', metric);
        
        // For development, just log
        if (process.env.NODE_ENV === 'development') {
            console.table({
                Metric: metric.name,
                Value: `${metric.value}ms`,
                Rating: metric.rating,
            });
        }
    });
}

/**
 * Hook for measuring component render performance
 */
export function usePerformanceMonitor(componentName: string) {
    if (typeof window === 'undefined') return () => {};

    const endMeasure = performanceMonitor.startMeasure(`${componentName} render`);
    
    return () => {
        endMeasure();
    };
}
