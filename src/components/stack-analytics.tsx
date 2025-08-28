"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar
} from "recharts";
import { 
    TrendingUp, 
    TrendingDown, 
    AlertTriangle, 
    CheckCircle, 
    Clock, 
    Users, 
    Star,
    Zap,
    Shield,
    Code,
    Database,
    Globe
} from "lucide-react";
import { Technology, TechStack } from "@/types/tech-stack";
import { technologyData } from "@/data/technologies";

interface StackAnalyticsProps {
    selectedStack: TechStack;
    projectDescription: string;
}

interface TechMetrics {
    popularity: number;
    learningCurve: number;
    performance: number;
    community: number;
    jobMarket: number;
    maintenance: number;
}

interface StackScore {
    overall: number;
    performance: number;
    scalability: number;
    maintainability: number;
    learningCurve: number;
    ecosystem: number;
}

export function StackAnalytics({ selectedStack, projectDescription }: StackAnalyticsProps) {
    const [activeTab, setActiveTab] = useState("overview");

    // Mock data - in real app, this would come from APIs or databases
    const getTechMetrics = (tech: Technology): TechMetrics => {
        const baseMetrics: Record<string, Partial<TechMetrics>> = {
            'react': { popularity: 95, learningCurve: 70, performance: 85, community: 98, jobMarket: 95, maintenance: 80 },
            'nextjs': { popularity: 90, learningCurve: 75, performance: 90, community: 85, jobMarket: 88, maintenance: 85 },
            'vue': { popularity: 80, learningCurve: 85, performance: 85, community: 75, jobMarket: 70, maintenance: 80 },
            'angular': { popularity: 75, learningCurve: 60, performance: 80, community: 80, jobMarket: 85, maintenance: 75 },
            'svelte': { popularity: 65, learningCurve: 90, performance: 95, community: 60, jobMarket: 50, maintenance: 85 },
            'nodejs': { popularity: 90, learningCurve: 75, performance: 85, community: 95, jobMarket: 90, maintenance: 80 },
            'typescript': { popularity: 85, learningCurve: 70, performance: 90, community: 90, jobMarket: 85, maintenance: 95 },
            'tailwind': { popularity: 85, learningCurve: 90, performance: 95, community: 80, jobMarket: 75, maintenance: 90 },
            'prisma': { popularity: 75, learningCurve: 80, performance: 85, community: 70, jobMarket: 65, maintenance: 85 },
            'postgresql': { popularity: 85, learningCurve: 70, performance: 90, community: 85, jobMarket: 90, maintenance: 85 },
        };

        const defaults: TechMetrics = {
            popularity: 60,
            learningCurve: 70,
            performance: 75,
            community: 65,
            jobMarket: 60,
            maintenance: 70
        };

        return { ...defaults, ...baseMetrics[tech.id] };   
 };

    const stackMetrics = useMemo(() => {
        return selectedStack.technologies.map(tech => ({
            name: tech.name,
            ...getTechMetrics(tech)
        }));
    }, [selectedStack]);

    const overallScore = useMemo(() => {
        const avgMetrics = stackMetrics.reduce((acc, tech) => {
            acc.popularity += tech.popularity;
            acc.learningCurve += tech.learningCurve;
            acc.performance += tech.performance;
            acc.community += tech.community;
            acc.jobMarket += tech.jobMarket;
            acc.maintenance += tech.maintenance;
            return acc;
        }, {
            popularity: 0,
            learningCurve: 0,
            performance: 0,
            community: 0,
            jobMarket: 0,
            maintenance: 0
        });

        const count = stackMetrics.length;
        return {
            overall: Math.round((avgMetrics.popularity + avgMetrics.performance + avgMetrics.community) / (3 * count)),
            performance: Math.round(avgMetrics.performance / count),
            scalability: Math.round((avgMetrics.performance + avgMetrics.maintenance) / (2 * count)),
            maintainability: Math.round(avgMetrics.maintenance / count),
            learningCurve: Math.round(avgMetrics.learningCurve / count),
            ecosystem: Math.round(avgMetrics.community / count)
        };
    }, [stackMetrics]);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart className="h-5 w-5" />
                        Stack Analytics
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="metrics">Metrics</TabsTrigger>
                            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-4">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Overall Score</p>
                                                <p className="text-2xl font-bold">{overallScore.overall}/100</p>
                                            </div>
                                            <Star className="h-8 w-8 text-yellow-500" />
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Performance</p>
                                                <p className="text-2xl font-bold">{overallScore.performance}/100</p>
                                            </div>
                                            <Zap className="h-8 w-8 text-blue-500" />
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Learning Curve</p>
                                                <p className="text-2xl font-bold">{overallScore.learningCurve}/100</p>
                                            </div>
                                            <Clock className="h-8 w-8 text-green-500" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="metrics" className="space-y-4">
                            <div className="space-y-4">
                                {stackMetrics.map((tech, index) => (
                                    <Card key={index}>
                                        <CardContent className="p-4">
                                            <h4 className="font-semibold mb-2">{tech.name}</h4>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm">Popularity</span>
                                                    <span className="text-sm font-medium">{tech.popularity}%</span>
                                                </div>
                                                <Progress value={tech.popularity} className="h-2" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="recommendations" className="space-y-4">
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                                        <div>
                                            <h4 className="font-semibold">Good Stack Choice</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Your selected technologies work well together and are suitable for most projects.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}