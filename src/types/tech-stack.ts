export interface Technology {
    id: string;
    name: string;
    category: string;
    description: string;
    website?: string;
    color?: string;
    npm?: string;
    icon?: string;
}

export interface TechStack {
    [category: string]: Technology[];
}

export interface AIRecommendation {
    technology: Technology;
    reason: string;
    confidence: number;
    category?: string;
    priority?: 'High' | 'Medium' | 'Low';
}

export interface AIAnalysis {
    recommendations: AIRecommendation[];
    warnings: string[];
    suggestions: string[];
    projectType: string;
    complexity: 'Simple' | 'Moderate' | 'Complex';
    stackScore?: number;
    missingCategories?: string[];
    architecturalPatterns?: string[];
    deploymentStrategy?: string;
    scalabilityNotes?: string;
    securityConsiderations?: string[];
    performanceOptimizations?: string[];
}

export interface AIConfig {
    url: string;
    apiKey: string;
    model: string;
    maxTokens: number;
}