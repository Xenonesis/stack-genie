export interface Technology {
    id: string;
    name: string;
    category: string;
    description: string;
    website?: string;
    color: string;
    installCommand?: string;
    icon: string;
}

export interface TechStack {
    [category: string]: Technology[];
}

export interface AIRecommendation {
    technology: Technology;
    reason: string;
    confidence: number;
}

export interface AIAnalysis {
    recommendations: AIRecommendation[];
    warnings: string[];
    suggestions: string[];
    projectType: string;
    complexity: 'Simple' | 'Moderate' | 'Complex';
}

export interface AIConfig {
    url: string;
    apiKey: string;
    model: string;
}