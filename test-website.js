// Simple test script to check website functionality
const http = require('http');

function testWebsite() {
    console.log('🧪 Testing Tech Stack Builder Website...\n');
    
    // Test if server is running
    const options = {
        hostname: 'localhost',
        port: 3001,
        path: '/',
        method: 'GET',
        timeout: 5000
    };

    const req = http.request(options, (res) => {
        console.log(`✅ Server Status: ${res.statusCode} ${res.statusMessage}`);
        console.log(`📦 Content-Type: ${res.headers['content-type']}`);
        
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            // Check for key elements in the HTML
            const checks = [
                { name: 'React App', test: data.includes('__NEXT_DATA__') },
                { name: 'Tech Stack Builder Title', test: data.includes('Tech Genie Stack Builder') || data.includes('tech-genie') },
                { name: 'CSS Styles', test: data.includes('tailwind') || data.includes('css') },
                { name: 'JavaScript Bundle', test: data.includes('script') },
                { name: 'No Critical Errors', test: !data.includes('Error') && !data.includes('500') }
            ];
            
            console.log('\n🔍 Website Health Checks:');
            checks.forEach(check => {
                const status = check.test ? '✅' : '❌';
                console.log(`${status} ${check.name}`);
            });
            
            // Check for new features
            console.log('\n🚀 New Features Check:');
            const newFeatures = [
                { name: 'Popular Templates', test: data.includes('Templates') || data.includes('popular') },
                { name: 'New Categories', test: data.includes('Validation') || data.includes('GraphQL') },
                { name: 'Enhanced UI', test: data.includes('Sparkles') || data.includes('sparkles') }
            ];
            
            newFeatures.forEach(feature => {
                const status = feature.test ? '✅' : '⚠️';
                console.log(`${status} ${feature.name}`);
            });
            
            console.log('\n📊 Summary:');
            const totalChecks = checks.length + newFeatures.length;
            const passedChecks = checks.filter(c => c.test).length + newFeatures.filter(f => f.test).length;
            console.log(`${passedChecks}/${totalChecks} checks passed`);
            
            if (passedChecks === totalChecks) {
                console.log('🎉 All tests passed! Website is working correctly.');
            } else if (passedChecks >= totalChecks * 0.8) {
                console.log('⚠️  Most tests passed. Minor issues detected.');
            } else {
                console.log('❌ Multiple issues detected. Check server logs.');
            }
        });
    });

    req.on('error', (err) => {
        console.log('❌ Connection Error:', err.message);
        console.log('\n💡 Troubleshooting:');
        console.log('1. Make sure the development server is running: npm run dev');
        console.log('2. Check if port 3001 is available');
        console.log('3. Verify no firewall is blocking the connection');
    });

    req.on('timeout', () => {
        console.log('⏰ Request timed out. Server might be slow or unresponsive.');
        req.destroy();
    });

    req.end();
}

// Run the test
testWebsite();