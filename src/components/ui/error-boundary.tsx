"use client";

import React, { Component, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { logger } from "@/lib/logger";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onReset?: () => void;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}

/**
 * Error Boundary component to catch and handle React errors gracefully
 * Wraps components to prevent entire app crashes
 */
export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI
        return {
            hasError: true,
            error,
            errorInfo: null,
        };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log error details to our logger
        logger.error('React Error Boundary caught an error:', error, errorInfo);
        
        this.setState({
            error,
            errorInfo,
        });

        // You can also send error to error reporting service here
        // Example: Sentry.captureException(error);
    }

    handleReset = () => {
        // Reset the error state
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });

        // Call custom reset handler if provided
        if (this.props.onReset) {
            this.props.onReset();
        }
    };

    handleReload = () => {
        // Full page reload as last resort
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            // Custom fallback UI if provided
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default fallback UI
            return (
                <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
                    <Card className="w-full max-w-2xl">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-destructive/10 rounded-lg">
                                    <AlertTriangle className="h-6 w-6 text-destructive" />
                                </div>
                                <CardTitle className="text-2xl">Something went wrong</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground">
                                We encountered an unexpected error. Don't worry, your data is safe. You can try the following options:
                            </p>

                            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                                <p className="font-mono text-sm text-destructive">
                                    {this.state.error?.message || "Unknown error occurred"}
                                </p>
                            </div>

                            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                                <details className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                                    <summary className="cursor-pointer font-semibold mb-2">
                                        Technical Details (Development Only)
                                    </summary>
                                    <pre className="text-xs overflow-auto whitespace-pre-wrap">
                                        {this.state.errorInfo.componentStack}
                                    </pre>
                                </details>
                            )}

                            <div className="flex gap-3 pt-4">
                                <Button
                                    onClick={this.handleReset}
                                    variant="default"
                                    className="flex-1"
                                >
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Try Again
                                </Button>
                                <Button
                                    onClick={this.handleReload}
                                    variant="outline"
                                    className="flex-1"
                                >
                                    <Home className="mr-2 h-4 w-4" />
                                    Reload Page
                                </Button>
                            </div>

                            <p className="text-xs text-muted-foreground text-center pt-2">
                                If the problem persists, please refresh the page or clear your browser cache.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            );
        }

        return this.props.children;
    }
}

/**
 * Functional wrapper for ErrorBoundary to use with hooks
 */
export function withErrorBoundary<P extends object>(
    Component: React.ComponentType<P>,
    fallback?: ReactNode
): React.FC<P> {
    return function WithErrorBoundaryWrapper(props: P) {
        return (
            <ErrorBoundary fallback={fallback}>
                <Component {...props} />
            </ErrorBoundary>
        );
    };
}
