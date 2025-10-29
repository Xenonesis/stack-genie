"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Send, Bot, User, Sparkles, Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Technology, TechStack } from "@/types/tech-stack";
import { AI_CONFIG } from "@/config/ai";
import { logger } from "@/lib/logger";

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    technologies?: Technology[];
    helpful?: boolean;
}

interface AIChatPanelProps {
    selectedStack: TechStack;
    projectDescription: string;
    onTechnologyAdd: (tech: Technology) => void;
    onStackUpdate: (stack: TechStack) => void;
}

export function AIChatPanel({ selectedStack, projectDescription, onTechnologyAdd, onStackUpdate }: AIChatPanelProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hi! I'm your AI tech stack assistant. I can help you choose the right technologies, explain compatibility, suggest alternatives, and answer any questions about your stack. What would you like to know?",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const callAI = async (prompt: string): Promise<string> => {
        const response = await fetch(`${AI_CONFIG.url}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AI_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                model: AI_CONFIG.model,
                messages: [
                    {
                        role: "system",
                        content: `You are an expert tech stack consultant. Help users build optimal technology stacks. 
                        Current project: ${projectDescription || 'No description provided'}
                        Current stack: ${Object.values(selectedStack).flat().map(t => t.name).join(', ') || 'None selected'}
                        
                        Provide helpful, practical advice. If suggesting technologies, mention specific names that exist in the tech ecosystem.`
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: AI_CONFIG.maxTokens
            })
        });

        if (!response.ok) {
            throw new Error(`AI API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process that request.";
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const aiResponse = await callAI(input.trim());
            
            const assistantMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: aiResponse,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            logger.error('AI Chat Error:', error);
            const errorMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "I'm experiencing some technical difficulties. Please try again in a moment.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
            inputRef.current?.focus();
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const copyMessage = (content: string) => {
        navigator.clipboard.writeText(content);
    };

    const markHelpful = (messageId: string, helpful: boolean) => {
        setMessages(prev => prev.map(msg => 
            msg.id === messageId ? { ...msg, helpful } : msg
        ));
    };

    const quickQuestions = [
        "What's missing from my current stack?",
        "Suggest alternatives to my current choices",
        "How do these technologies work together?",
        "What are the pros and cons of my stack?",
        "Recommend testing tools for my project",
        "What deployment options work best?"
    ];

    return (
        <div className="flex flex-col h-full bg-[#0d1117] border-l border-gray-800">
            {/* Header */}
            <div className="p-4 border-b border-gray-800 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-white">AI Assistant</h3>
                        <p className="text-xs text-gray-400">Tech stack expert</p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    <AnimatePresence>
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {message.role === 'assistant' && (
                                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                )}
                                
                                <div className={`max-w-[80%] ${message.role === 'user' ? 'order-1' : ''}`}>
                                    <Card className={`${
                                        message.role === 'user' 
                                            ? 'bg-blue-600 border-blue-500' 
                                            : 'bg-[#161b22] border-gray-700'
                                    }`}>
                                        <CardContent className="p-3">
                                            <div className="text-sm text-white whitespace-pre-wrap">
                                                {message.content}
                                            </div>
                                            
                                            {message.role === 'assistant' && (
                                                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-700">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => copyMessage(message.content)}
                                                        className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                                                    >
                                                        <Copy className="w-3 h-3" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => markHelpful(message.id, true)}
                                                        className={`h-6 w-6 p-0 ${
                                                            message.helpful === true 
                                                                ? 'text-green-400' 
                                                                : 'text-gray-400 hover:text-green-400'
                                                        }`}
                                                    >
                                                        <ThumbsUp className="w-3 h-3" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => markHelpful(message.id, false)}
                                                        className={`h-6 w-6 p-0 ${
                                                            message.helpful === false 
                                                                ? 'text-red-400' 
                                                                : 'text-gray-400 hover:text-red-400'
                                                        }`}
                                                    >
                                                        <ThumbsDown className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                    <div className="text-xs text-gray-500 mt-1 px-1">
                                        {message.timestamp.toLocaleTimeString()}
                                    </div>
                                </div>

                                {message.role === 'user' && (
                                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex gap-3"
                        >
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                            <Card className="bg-[#161b22] border-gray-700">
                                <CardContent className="p-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </ScrollArea>

            {/* Quick Questions */}
            {messages.length <= 1 && (
                <div className="p-4 border-t border-gray-800">
                    <div className="text-xs text-gray-400 mb-2">Quick questions:</div>
                    <div className="grid grid-cols-1 gap-1">
                        {quickQuestions.slice(0, 3).map((question, index) => (
                            <Button
                                key={index}
                                variant="ghost"
                                size="sm"
                                onClick={() => setInput(question)}
                                className="justify-start text-xs text-gray-300 hover:text-white hover:bg-gray-800 h-8"
                            >
                                <MessageSquare className="w-3 h-3 mr-2" />
                                {question}
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-800 flex-shrink-0">
                <div className="flex gap-2">
                    <Input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask about your tech stack..."
                        className="bg-[#161b22] border-gray-700 text-white placeholder-gray-400"
                        disabled={isLoading}
                    />
                    <Button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0"
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}