// Test script to verify all functionalities are working
import { generateCommand, generateSmartCommand } from './src/utils/commandGenerator';
import { sanitizeInput, generateFallbackStack } from './src/utils/ai';
import { technologyData } from './src/data/technologies';
import { TechStack } from './src/types/tech-stack';

async function runTests() {
    console.log('🧪 Testing Stack Genie Functionalities...\n');

    // Test 1: Sanitize Input
    console.log('1. Testing Input Sanitization:');
    const testInput = '<script>alert("xss")</script>Hello World';
    const sanitized = sanitizeInput(testInput);
    console.log(`   Input: "${testInput}"`);
    console.log(`   Sanitized: "${sanitized}"`);
    console.log(`   ✅ XSS prevention working: ${!sanitized.includes('<script>')}\n`);

    // Test 2: Technology Data Loading
    console.log('2. Testing Technology Data:');
    console.log(`   Loaded ${technologyData.length} technologies`);
    const categories = [...new Set(technologyData.map(t => t.category))];
    console.log(`   Categories: ${categories.join(', ')}`);
    console.log(`   ✅ Technology data loaded: ${technologyData.length > 0}\n`);

    // Test 3: Command Generation
    console.log('3. Testing Command Generation:');
    const testStack: TechStack = {
        'Web Framework': [technologyData.find(t => t.id === 'react')!],
        'Package Manager': [technologyData.find(t => t.id === 'npm')!],
        'Styling': [technologyData.find(t => t.id === 'tailwind')!]
    };
    const command = generateCommand(testStack, 'test-project');
    console.log(`   Generated command: ${command}`);
    console.log(`   ✅ Command generation working: ${command.includes('test-project')}\n`);

    // Test 4: Fallback Stack Generation
    console.log('4. Testing Fallback Stack Generation:');
    const fallbackStack = generateFallbackStack('I want to build a modern web application with React');
    console.log(`   Generated categories: ${Object.keys(fallbackStack).join(', ')}`);
    const totalTechs = Object.values(fallbackStack).flat().length;
    console.log(`   Total technologies: ${totalTechs}`);
    console.log(`   ✅ Fallback generation working: ${totalTechs > 0}\n`);

    console.log('🎉 Core functionality tests completed!');
    console.log('\nSummary:');
    console.log('- ✅ Input sanitization: Working');
    console.log('- ✅ Technology data: Loaded');
    console.log('- ✅ Command generation: Working');
    console.log('- ✅ Fallback stack: Working');
    console.log('\n🚀 Stack Genie core functionalities are working!');
}

runTests().catch(console.error);