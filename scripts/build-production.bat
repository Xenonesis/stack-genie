@echo off
setlocal enabledelayedexpansion

echo 🚀 Starting production build...

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18 or higher.
    exit /b 1
)

echo ✅ Node.js version:
node -v

:: Clean previous builds
echo 🧹 Cleaning previous builds...
if exist .next rmdir /s /q .next
if exist dist rmdir /s /q dist

:: Install dependencies
echo 📦 Installing dependencies...
call npm ci --only=production
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    exit /b 1
)

:: Generate Prisma client
echo 🗄️ Generating Prisma client...
call npm run db:generate
if %errorlevel% neq 0 (
    echo ❌ Failed to generate Prisma client
    exit /b 1
)

:: Run linting
echo 🔍 Running linter...
call npm run lint
if %errorlevel% neq 0 (
    echo ⚠️ Linting issues found, but continuing...
)

:: Build the application
echo 🏗️ Building application...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed!
    exit /b 1
)

:: Check if build was successful
if exist .next (
    echo ✅ Build completed successfully!
) else (
    echo ❌ Build failed!
    exit /b 1
)

echo 🎉 Production build ready!
echo 💡 To start the production server, run: npm start

pause