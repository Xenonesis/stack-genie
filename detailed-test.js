// Detailed test for Tech Stack Builder
const http = require('http');

function detailedTest() {
    console.log('🔍 Detailed Tech Stack Builder Test\n');
    
    const options = {
        hostname: 'localhost',
        port: 3001,
        path: '/',
        method: 'GET',
        timeout: 10000
    };

    const req = http.request(options, (res) => {
        console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
        
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            console.log(`📄 Response size: ${data.length} bytes\n`);
            
            // Check for specific new technologies
            const newTechs = [
                'Zod', 'Stripe', 'Socket.io', 'Sanity', 'Algolia', 
                'Resend', 'PostHog', 'Cloudinary', 'Apollo GraphQL'
            ];
            
            console.log('🆕 New Technologies Check:');
            newTechs.forEach(tech => {
                const found = data.includes(tech);
                console.log(`${found ? '✅' : '❌'} ${tech}`);
            });
            
            // Check for new categories
            const newCategories = [
                'Validation', 'GraphQL/API', 'Real-time', 'CMS', 
                'Search', 'Email', 'Analytics', 'Payment', 'Storage'
            ];
            
            console.log('\n📂 New Categories Check:');
            newCategories.forEach(category => {
                const found = data.includes(category);
                console.log(`${found ? '✅' : '❌'} ${category}`);
            });
            
            // Check for UI elements
            const uiElements = [
                'Templates', 'Popular Stack', 'Sparkles', 'AI Assistant'
            ];
            
            console.log('\n🎨 UI Elements Check:');
            uiElements.forEach(element => {
                const found = data.includes(element);
                console.log(`${found ? '✅' : '❌'} ${element}`);
            });
            
            // Check for errors
            console.log('\n🚨 Error Check:');
            const errorPatterns = [
                'Error:', 'TypeError:', 'ReferenceError:', 'SyntaxError:', 
                'Cannot read', 'undefined is not', '500', 'Internal Server Error'
            ];
            
            const errors = errorPatterns.filter(pattern => data.includes(pattern));
            if (errors.length === 0) {
                console.log('✅ No obvious errors detected');
            } else {
                console.log('❌ Potential errors found:');
                errors.forEach(error => console.log(`   - ${error}`));
            }
            
            // Check for React hydration
            console.log('\n⚛️  React Check:');
            const hasReact = data.includes('__NEXT_DATA__') || data.includes('_app');
            const hasHydration = data.includes('hydrate') || data.includes('render');
            console.log(`${hasReact ? '✅' : '❌'} Next.js data found`);
            console.log(`${hasHydration ? '✅' : '❌'} React hydration indicators`);
            
            // Performance check
            console.log('\n⚡ Performance Indicators:');
            const hasLazyLoading = data.includes('lazy') || data.includes('dynamic');
            const hasOptimization = data.includes('optimize') || data.includes('minified');
            console.log(`${hasLazyLoading ? '✅' : '❌'} Lazy loading detected`);
            console.log(`${hasOptimization ? '✅' : '❌'} Optimization detected`);
            
            console.log('\n🎯 Overall Assessment:');
            if (data.length > 50000) {
                console.log('✅ Rich content loaded successfully');
            } else {
                console.log('⚠️  Content seems minimal - possible loading issues');
            }
            
            if (res.statusCode === 200 && data.includes('Tech Genie')) {
                console.log('🎉 Website is loading correctly!');
            } else {
                console.log('❌ Website has issues loading');
            }
        });
    });

    req.on('error', (err) => {
        console.log('❌ Connection failed:', err.message);
    });

    req.on('timeout', () => {
        console.log('⏰ Request timed out');
        req.destroy();
    });

    req.end();
}

detailedTest();