import { AIConfig } from '@/types/tech-stack';

// Multiple AI provider configurations for fallback
export const AI_PROVIDERS = [
    {
        name: "Chutes AI",
        url: "https://llm.chutes.ai/v1",
        apiKey: process.env.NEXT_PUBLIC_AI_API_KEY || "",
        model: "zai-org/GLM-4.5-Air",
        maxTokens: 4096,
        type: "openai"
    },
    {
        name: "OpenAI",
        url: "https://api.openai.com/v1",
        apiKey: process.env.NEXT_PUBLIC_AI_API_KEY || "",
        model: "gpt-3.5-turbo",
        maxTokens: 4096,
        type: "openai"
    },
    {
        name: "Local Fallback",
        url: "",
        apiKey: "",
        model: "fallback",
        maxTokens: 0,
        type: "fallback"
    }
];

export const AI_CONFIG: AIConfig = {
    url: process.env.NEXT_PUBLIC_AI_URL || "https://llm.chutes.ai/v1",
    apiKey: process.env.NEXT_PUBLIC_AI_API_KEY || "",
    model: process.env.NEXT_PUBLIC_AI_MODEL || "zai-org/GLM-4.5-Air",
    maxTokens: parseInt(process.env.NEXT_PUBLIC_AI_MAX_TOKENS || "4096")
};
