#!/bin/bash

# Production Build Script for Tech Genie

set -e

echo "🚀 Starting production build..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf dist

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
npm run db:generate

# Run linting
echo "🔍 Running linter..."
npm run lint

# Build the application
echo "🏗️ Building application..."
npm run build

# Check if build was successful
if [ -d ".next" ]; then
    echo "✅ Build completed successfully!"
    echo "📊 Build size:"
    du -sh .next
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🎉 Production build ready!"
echo "💡 To start the production server, run: npm start"