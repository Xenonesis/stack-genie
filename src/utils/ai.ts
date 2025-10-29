import { AI_CONFIG, AI_PROVIDERS } from "@/config/ai";
import { TechStack, Technology } from "@/types/tech-stack";
import { technologyData } from "@/data/technologies";

export interface AIAnalysisResult {
    recommendations: Array<{
        technologyId: string;
        reason: string;
        confidence: number;
    }>;
    warnings: string[];
    suggestions: string[];
    projectType: string;
    complexity: 'Simple' | 'Moderate' | 'Complex';
}

export interface AIStackResult {
    stack: string[];
    reasoning: string;
}

/**
 * Calls AI providers in sequence until one succeeds
 * @param prompt The prompt to send to the AI
 * @param timeout Optional timeout in milliseconds (default: 30000)
 * @returns The AI response text
 */
export const callAI = async (prompt: string, timeout: number = 30000): Promise<string> => {
    // Try multiple AI providers in sequence
    const providers = [
        // Try configured provider first
        {
            name: "Primary AI Service",
            url: AI_CONFIG.url,
            apiKey: AI_CONFIG.apiKey,
            model: AI_CONFIG.model,
            maxTokens: AI_CONFIG.maxTokens,
            type: "openai"
        },
        // Fallback providers from AI_PROVIDERS
        ...AI_PROVIDERS.filter(p => p.url && p.url !== AI_CONFIG.url)
    ];

    for (const provider of providers) {
        // Skip providers without API keys (except fallback)
        if (!provider.apiKey && provider.type !== "fallback") {
            console.log(`Skipping ${provider.name} - no API key available`);
            continue;
        }

        try {
            console.log(`Trying AI provider: ${provider.name} (${provider.url})`);
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            try {
                const response = await fetch(provider.url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...(provider.apiKey ? { "Authorization": `Bearer ${provider.apiKey}` } : {})
                    },
                    body: JSON.stringify({
                        model: provider.model,
                        messages: [
                            {
                                role: "system",
                                content: "You are a helpful tech stack advisor. Provide concise, practical advice. When asked for JSON, return ONLY valid JSON without markdown formatting or explanations."
                            },
                            {
                                role: "user",
                                content: prompt
                            }
                        ],
                        max_tokens: provider.maxTokens,
                        temperature: 0.7
                    }),
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
                }

                const data = await response.json();
                const content = data.choices?.[0]?.message?.content;

                if (!content) {
                    throw new Error('No content in response');
                }

                console.log(`✅ Success with ${provider.name}`);
                return content.trim();
            } catch (error) {
                clearTimeout(timeoutId);
                throw error;
            }
            
        } catch (error) {
            console.log(`❌ Provider ${provider.name} failed:`, error);
            continue;
        }
    }

    // All providers failed, throw error for fallback handling
    console.log('❌ All AI providers failed, using fallback');
    throw new Error('ALL_PROVIDERS_FAILED');
};

/**
 * Generates a fallback tech stack based on keyword analysis
 * @param description The project description to analyze
 * @returns A TechStack object with recommended technologies
 */
export const generateFallbackStack = (description: string): TechStack => {
    const desc = description.toLowerCase();
    const stack: TechStack = {};

    const addTech = (techId: string) => {
        const tech = technologyData.find(t => t.id === techId);
        if (tech) {
            if (!stack[tech.category]) {
                stack[tech.category] = [];
            }
            stack[tech.category].push(tech);
        }
    };

    // Framework selection based on keywords
    if (desc.includes('vue') || desc.includes('nuxt')) {
        addTech('vue');
        addTech('nuxt');
    } else if (desc.includes('angular')) {
        addTech('angular');
    } else if (desc.includes('svelte')) {
        addTech('svelte');
        addTech('sveltekit');
    } else if (desc.includes('mobile') || desc.includes('app') || desc.includes('native')) {
        addTech('reactnative');
        addTech('expo');
    } else if (desc.includes('desktop')) {
        addTech('electron');
    } else {
        // Default to React/Next.js for web projects
        addTech('react');
        addTech('nextjs');
    }

    // Database selection
    if (desc.includes('database') || desc.includes('data') || desc.includes('storage')) {
        if (desc.includes('postgres') || desc.includes('postgresql')) {
            addTech('postgresql');
        } else if (desc.includes('mongo')) {
            addTech('mongodb');
        } else if (desc.includes('simple') || desc.includes('small')) {
            addTech('sqlite');
        } else {
            addTech('postgresql'); // Default
        }
    }

    // Authentication
    if (desc.includes('auth') || desc.includes('login') || desc.includes('user')) {
        addTech('nextauth');
    }

    // State management for complex apps
    if (desc.includes('state') || desc.includes('complex') || desc.includes('large')) {
        addTech('zustand');
    }

    // Validation for forms
    if (desc.includes('form') || desc.includes('validation') || desc.includes('schema')) {
        addTech('zod');
    }

    // Payment for e-commerce
    if (desc.includes('payment') || desc.includes('ecommerce') || desc.includes('shop') || desc.includes('store')) {
        addTech('stripe');
    }

    // Real-time for chat/collaboration
    if (desc.includes('chat') || desc.includes('realtime') || desc.includes('live') || desc.includes('socket')) {
        addTech('socketio');
    }

    // CMS for content-driven sites
    if (desc.includes('cms') || desc.includes('content') || desc.includes('blog') || desc.includes('article')) {
        addTech('sanity');
    }

    // Search for complex data
    if (desc.includes('search') || desc.includes('filter') || desc.includes('find')) {
        addTech('algolia');
    }

    // Email for notifications
    if (desc.includes('email') || desc.includes('notification') || desc.includes('mail')) {
        addTech('resend');
    }

    // Analytics for tracking
    if (desc.includes('analytics') || desc.includes('tracking') || desc.includes('metrics')) {
        addTech('posthog');
    }

    // Styling
    addTech('tailwind');
    if (desc.includes('component') || desc.includes('ui library')) {
        addTech('shadcn');
    }

    // Testing
    if (desc.includes('test') || desc.includes('quality')) {
        addTech('vitest');
    }

    // Package manager
    if (desc.includes('fast') || desc.includes('performance')) {
        addTech('pnpm');
    } else {
        addTech('npm');
    }

    // Runtime
    addTech('nodejs');

    // Hosting
    if (desc.includes('aws') || desc.includes('amazon')) {
        addTech('aws');
    } else {
        addTech('vercel'); // Default for Next.js
    }

    return stack;
};

/**
 * Parses AI response to extract JSON, handling various formats
 * @param response The raw AI response
 * @returns Parsed JSON object
 */
export const parseAIResponse = (response: string): any => {
    // Try direct JSON parse first
    try {
        return JSON.parse(response);
    } catch {
        // Try to extract JSON from markdown code blocks
        const jsonMatch = response.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[1]);
        }
        
        // Try to find JSON object in the text
        const objectMatch = response.match(/\{[\s\S]*\}/);
        if (objectMatch) {
            return JSON.parse(objectMatch[0]);
        }
        
        throw new Error('Could not parse AI response as JSON');
    }
};

/**
 * Sanitizes user input to prevent injection attacks
 * @param input The user input to sanitize
 * @returns Sanitized input
 */
export const sanitizeInput = (input: string): string => {
    return input
        .replace(/[<>]/g, '') // Remove HTML tags
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, '') // Remove event handlers
        .trim()
        .slice(0, 1000); // Limit length
};
