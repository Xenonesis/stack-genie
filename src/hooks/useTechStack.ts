import { useState, useCallback } from "react";
import { TechStack, Technology, AIAnalysis, AIRecommendation } from "@/types/tech-stack";
import { technologyData } from "@/data/technologies";
import { callAI, generateFallbackStack, parseAIResponse, sanitizeInput } from "@/utils/ai";
import { useToast } from "./use-toast";

export const useTechStack = () => {
    const [selectedStack, setSelectedStack] = useState<TechStack>({});
    const [projectName, setProjectName] = useState("my-tech-genie-app");
    const [projectDescription, setProjectDescription] = useState("");
    const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([]);
    const { toast } = useToast();

    const toggleTechnology = useCallback((tech: Technology) => {
        setSelectedStack(prev => {
            const currentCategoryStack = prev[tech.category] || [];
            const isSelected = currentCategoryStack.some(t => t.id === tech.id);

            if (isSelected) {
                const newCategoryStack = currentCategoryStack.filter(t => t.id !== tech.id);
                if (newCategoryStack.length === 0) {
                    const { [tech.category]: _, ...rest } = prev;
                    return rest;
                }
                return { ...prev, [tech.category]: newCategoryStack };
            } else {
                return { ...prev, [tech.category]: [...currentCategoryStack, tech] };
            }
        });
    }, []);

    const isTechnologySelected = useCallback((tech: Technology) => {
        return selectedStack[tech.category]?.some(t => t.id === tech.id) || false;
    }, [selectedStack]);

    const getTotalSelected = useCallback(() => {
        return Object.values(selectedStack).reduce((total, techs) => total + techs.length, 0);
    }, [selectedStack]);

    const clearStack = useCallback(() => {
        setSelectedStack({});
        toast({
            title: "Stack cleared!",
            description: "All technologies have been removed from your stack.",
        });
    }, [toast]);

    const loadStack = useCallback((stack: TechStack, name?: string, description?: string) => {
        setSelectedStack(stack);
        if (name) setProjectName(name);
        if (description) setProjectDescription(description);
    }, []);

    const analyzeStackWithAI = useCallback(async () => {
        const sanitizedDescription = sanitizeInput(projectDescription);
        
        if (!sanitizedDescription.trim()) {
            toast({
                title: "Project description required",
                description: "Please provide a project description for AI analysis.",
                variant: "destructive",
            });
            return;
        }

        setIsAnalyzing(true);
        try {
            const selectedTechs = Object.values(selectedStack).flat();
            const techNames = selectedTechs.map(t => t.name).join(', ');

            const prompt = `
            Analyze this tech stack for a project:
            
            Project Description: "${sanitizedDescription}"
            Current Stack: ${techNames || 'No technologies selected'}
            
            Please provide a JSON response with:
            {
                "recommendations": [
                    {
                        "technologyId": "string (must match existing tech IDs)",
                        "reason": "string",
                        "confidence": number (0-100)
                    }
                ],
                "warnings": ["string array of potential issues"],
                "suggestions": ["string array of improvements"],
                "projectType": "string (e.g., 'E-commerce Platform', 'Social Media App')",
                "complexity": "Simple|Moderate|Complex"
            }
            
            Available technologies: ${technologyData.map(t => `${t.id}:${t.name}`).join(', ')}
            `;

            const response = await callAI(prompt);
            const analysis = parseAIResponse(response);

            // Map recommendations to full technology objects
            const recommendations: AIRecommendation[] = analysis.recommendations
                .map((rec: any) => {
                    const tech = technologyData.find(t => t.id === rec.technologyId);
                    if (!tech) return null;
                    return {
                        technology: tech,
                        reason: rec.reason,
                        confidence: rec.confidence
                    };
                })
                .filter(Boolean);

            setAiAnalysis({
                recommendations,
                warnings: analysis.warnings || [],
                suggestions: analysis.suggestions || [],
                projectType: analysis.projectType || 'Web Application',
                complexity: analysis.complexity || 'Moderate'
            });

            setAiRecommendations(recommendations);

            toast({
                title: "AI Analysis Complete!",
                description: `Found ${recommendations.length} recommendations for your project.`,
            });

            return { analysis, recommendations };
        } catch (error) {
            console.error('AI Analysis Error:', error);
            
            let errorTitle = "AI Analysis Failed";
            let errorDescription = "Unable to analyze your stack. Please try again.";
            
            if (error instanceof Error) {
                if (error.message === 'ALL_PROVIDERS_FAILED') {
                    errorTitle = "AI Service Unavailable";
                    errorDescription = "All AI providers are currently unavailable. Please try again later.";
                } else if (error.message.includes('JSON')) {
                    errorTitle = "AI Response Error";
                    errorDescription = "Could not parse AI response. Please try again.";
                }
            }
            
            toast({
                title: errorTitle,
                description: errorDescription,
                variant: "destructive",
            });
        } finally {
            setIsAnalyzing(false);
        }
    }, [selectedStack, projectDescription, toast]);

    const generateAIStack = useCallback(async () => {
        const sanitizedDescription = sanitizeInput(projectDescription);
        
        if (!sanitizedDescription.trim()) {
            toast({
                title: "Project description required",
                description: "Please describe your project for AI recommendations.",
                variant: "destructive",
            });
            return;
        }

        setIsAnalyzing(true);

        try {
            const prompt = `
            Based on this project description, recommend a complete tech stack:
            
            Description: "${sanitizedDescription}"
            
            Return a JSON response with:
            {
                "stack": ["array of technology IDs that match existing IDs"],
                "reasoning": "brief explanation of the stack choices"
            }
            
            Available technologies: ${technologyData.map(t => `${t.id}:${t.name} (${t.category})`).join(', ')}
            
            Choose technologies that work well together and match the project needs.
            `;

            const response = await callAI(prompt);
            const result = parseAIResponse(response);

            const newStack: TechStack = {};
            result.stack.forEach((techId: string) => {
                const tech = technologyData.find(t => t.id === techId);
                if (tech) {
                    if (!newStack[tech.category]) {
                        newStack[tech.category] = [];
                    }
                    newStack[tech.category].push(tech);
                }
            });

            setSelectedStack(newStack);

            toast({
                title: "AI Stack Generated!",
                description: result.reasoning || `Generated a stack with ${Object.keys(newStack).length} categories.`,
            });
        } catch (error) {
            console.error('AI Stack Generation Error:', error);
            
            // Fallback to keyword-based generation
            const fallbackStack = generateFallbackStack(sanitizedDescription);
            setSelectedStack(fallbackStack);

            toast({
                title: "Generated Smart Recommendations",
                description: `Created a stack based on your description with ${Object.keys(fallbackStack).length} categories.`,
            });
        } finally {
            setIsAnalyzing(false);
        }
    }, [projectDescription, toast]);

    const applyAIRecommendation = useCallback((recommendation: AIRecommendation) => {
        toggleTechnology(recommendation.technology);
        toast({
            title: "Recommendation Applied!",
            description: `Added ${recommendation.technology.name} to your stack.`,
        });
    }, [toggleTechnology, toast]);

    return {
        // State
        selectedStack,
        projectName,
        projectDescription,
        aiAnalysis,
        isAnalyzing,
        aiRecommendations,
        
        // Setters
        setProjectName,
        setProjectDescription,
        setSelectedStack,
        
        // Actions
        toggleTechnology,
        isTechnologySelected,
        getTotalSelected,
        clearStack,
        loadStack,
        analyzeStackWithAI,
        generateAIStack,
        applyAIRecommendation,
    };
};
