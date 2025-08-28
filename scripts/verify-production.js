#!/usr/bin/env node

/**
 * Production Verification Script
 * Checks if the application is properly configured for production deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying production readiness...\n');

const checks = [];

// Check 1: Environment file exists
const envExists = fs.existsSync('.env.local') || fs.existsSync('.env.production');
checks.push({
  name: 'Environment Configuration',
  passed: envExists,
  message: envExists ? '✅ Environment file found' : '❌ No .env.local or .env.production file found'
});

// Check 2: No sensitive data in git
const gitignoreContent = fs.existsSync('.gitignore') ? fs.readFileSync('.gitignore', 'utf8') : '';
const gitignoreHasEnv = gitignoreContent.includes('.env');
checks.push({
  name: 'Git Security',
  passed: gitignoreHasEnv,
  message: gitignoreHasEnv ? '✅ Environment files are gitignored' : '❌ Environment files not properly gitignored'
});

// Check 3: Build directory exists
const buildExists = fs.existsSync('.next');
checks.push({
  name: 'Build Status',
  passed: buildExists,
  message: buildExists ? '✅ Application has been built' : '⚠️ Application not built yet (run npm run build)'
});

// Check 4: Package.json has production scripts
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const hasStartScript = packageJson.scripts && packageJson.scripts.start;
const hasBuildScript = packageJson.scripts && packageJson.scripts.build;
checks.push({
  name: 'Production Scripts',
  passed: hasStartScript && hasBuildScript,
  message: (hasStartScript && hasBuildScript) ? '✅ Production scripts configured' : '❌ Missing production scripts'
});

// Check 5: TypeScript configuration
const tsconfigExists = fs.existsSync('tsconfig.json');
checks.push({
  name: 'TypeScript Configuration',
  passed: tsconfigExists,
  message: tsconfigExists ? '✅ TypeScript configuration found' : '❌ TypeScript configuration missing'
});

// Check 6: Docker configuration
const dockerfileExists = fs.existsSync('Dockerfile');
const dockerComposeExists = fs.existsSync('docker-compose.yml');
checks.push({
  name: 'Docker Configuration',
  passed: dockerfileExists && dockerComposeExists,
  message: (dockerfileExists && dockerComposeExists) ? '✅ Docker configuration complete' : '⚠️ Docker configuration incomplete'
});

// Check 7: Health endpoint exists
const healthEndpointExists = fs.existsSync('src/app/api/health/route.ts');
checks.push({
  name: 'Health Check Endpoint',
  passed: healthEndpointExists,
  message: healthEndpointExists ? '✅ Health check endpoint configured' : '❌ Health check endpoint missing'
});

// Display results
console.log('📋 Production Readiness Report:\n');
checks.forEach(check => {
  console.log(`${check.message}`);
});

const passedChecks = checks.filter(check => check.passed).length;
const totalChecks = checks.length;

console.log(`\n📊 Score: ${passedChecks}/${totalChecks} checks passed\n`);

if (passedChecks === totalChecks) {
  console.log('🎉 All checks passed! Your application is production-ready.');
  console.log('💡 Next steps:');
  console.log('   1. Set your production environment variables');
  console.log('   2. Deploy using your preferred method');
  console.log('   3. Monitor your application health');
} else {
  console.log('⚠️ Some checks failed. Please address the issues above before deploying.');
  process.exit(1);
}

console.log('\n📚 For deployment instructions, see DEPLOYMENT.md');