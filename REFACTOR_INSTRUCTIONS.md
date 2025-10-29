# Component Refactor - Remaining Manual Steps

## ✅ Completed
1. Created `src/utils/ai.ts` with AI utility functions
2. Created `src/utils/commandGenerator.ts` with command generation logic
3. Created `src/hooks/useTechStack.ts` with state management hook
4. Updated imports in `tech-stack-builder.tsx`
5. Removed some duplicate functions

## ⚠️ Remaining Manual Tasks

### In `src/components/tech-stack-builder.tsx`:

#### 1. Remove Duplicate Function Definitions (Lines ~228-640)
Delete these entire function blocks (they're already in the `useTechStack` hook):
- `analyzeStackWithAI` (line ~228-331)
- `generateFallbackStack` (line ~333-459) 
- `generateAIStack` (line ~461-611)
- `applyAIRecommendation` (line ~637-643)

#### 2. Fix `generateCommand` Calls
Replace all instances of:
```typescript
generateCommand()
```
With:
```typescript
generateCommand(selectedStack, projectName)
```

Locations to update:
- Line ~211: `const command = generateCommand(selectedStack, projectName);`
- Line ~993: `if (smartCommand !== generateCommand(selectedStack, projectName)) {`
- Line ~1000: `disabled={!generateCommand(selectedStack, projectName) || ...`
- Line ~1011: `value={generateCommand(selectedStack, projectName)}`
- Line ~1025: `disabled={!generateCommand(selectedStack, projectName)}`

#### 3. Fix `generateSmartCommand` Call
Line ~992, replace:
```typescript
const smartCommand = await generateSmartCommand();
```
With:
```typescript
const smartCommand = await generateSmartCommand(selectedStack, projectName, projectDescription);
```

#### 4. Add Missing Helper Function
The component needs a `askAIQuestion` function. Add this after line ~225:

```typescript
const askAIQuestion = useCallback(async (question: string) => {
    try {
        const prompt = `
        Answer this question about tech stacks:
        
        Question: ${question}
        Current Stack: ${Object.values(selectedStack).flat().map(t => t.name).join(', ') || 'No stack selected'}
        Project: ${projectDescription || 'No description provided'}
        
        Provide a helpful, concise answer focusing on practical advice.
        `;

        const answer = await callAI(prompt);
        return answer;
    } catch (error) {
        console.error('AI Question Error:', error);
        return "I'm having trouble connecting to the AI service right now. Please try again later.";
    }
}, [selectedStack, projectDescription]);
```

#### 5. Fix Missing `generateRandomStack` Function
The UI references `generateRandomStack` but it was removed. Add this function:

```typescript
const generateRandomStack = useCallback(() => {
    const randomTechs: Technology[] = [];
    const techsByCategory = categories.reduce((acc, category) => {
        acc[category] = technologyData.filter(tech => tech.category === category);
        return acc;
    }, {} as Record<string, Technology[]>);

    categories.forEach(category => {
        const categoryTechs = techsByCategory[category];
        if (categoryTechs.length > 0) {
            const count = Math.floor(Math.random() * 2) + 1;
            const shuffled = [...categoryTechs].sort(() => 0.5 - Math.random());
            randomTechs.push(...shuffled.slice(0, count));
        }
    });

    const newStack: TechStack = {};
    randomTechs.forEach(tech => {
        if (!newStack[tech.category]) {
            newStack[tech.category] = [];
        }
        newStack[tech.category].push(tech);
    });

    loadStack(newStack);
    toast({
        title: "Random stack generated!",
        description: `Selected ${randomTechs.length} technologies across ${Object.keys(newStack).length} categories.`,
    });
}, [loadStack, toast]);
```

## Quick Verification
After completing these steps, run:
```bash
npm run build
```

If there are no TypeScript errors, the refactor is complete!

## Expected Benefits
- **~60% reduction** in component file size (from 2000+ to ~800 lines)
- **Reusable utilities** that can be used in other components
- **Better performance** with memoized functions
- **Improved security** with input sanitization
- **Better error handling** with user-friendly messages
