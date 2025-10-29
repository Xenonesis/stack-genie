# Tech Genie - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation & Setup

```bash
# 1. Install dependencies
npm install

# 2. Setup database
npm run db:push

# 3. Start development server
npm run dev
```

Visit: **http://localhost:3000**

## 🎯 Main Features

### 1. Tech Stack Builder
- Browse and select technologies across 20+ categories
- Drag and drop to organize your stack
- Generate installation commands automatically
- Export and share your stack via URL

### 2. Popular Stack Templates
Click "Show Popular Stacks" to load pre-configured templates:
- Modern Full-Stack (Next.js + TypeScript + Tailwind)
- E-commerce Store
- Real-time Chat App
- SaaS Starter
- Content Site
- Mobile App

### 3. AI-Powered Features (Optional)
Configure AI API key in `.env` to enable:
- AI Stack Recommendations
- Project Analysis
- Smart Command Generation
- Interactive AI Chat Assistant

### 4. Project Configuration
- Set project name
- Add project description
- Get customized setup commands
- Copy commands with one click

## 🛠️ Available Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm start               # Start production server

# Database
npm run db:push         # Push schema to database
npm run db:generate     # Generate Prisma client
npm run db:migrate      # Run migrations

# Quality Checks
npm run lint            # Run ESLint
npm audit               # Check for vulnerabilities
```

## 🔧 Configuration

### Environment Variables (.env)
```env
# Database
DATABASE_URL="file:./db/custom.db"

# AI Features (Optional)
NEXT_PUBLIC_AI_URL=https://llm.chutes.ai/v1
NEXT_PUBLIC_AI_API_KEY=your-api-key-here
NEXT_PUBLIC_AI_MODEL=zai-org/GLM-4.5-Air
NEXT_PUBLIC_AI_MAX_TOKENS=4096
```

## 📱 Using the Website

### Building Your Tech Stack

1. **Select Technologies**
   - Click on technology cards to add them to your stack
   - Click again to remove
   - Use search to find specific technologies

2. **Configure Project**
   - Enter your project name (e.g., "my-awesome-app")
   - Add a description for better AI recommendations
   - View the generated command in real-time

3. **Generate Commands**
   - Commands are automatically generated based on your selections
   - Click "Copy Command" to copy to clipboard
   - Run the command in your terminal to create the project

4. **Use AI Features** (if configured)
   - Click "Analyze with AI" for stack recommendations
   - Use "Ask AI" to generate a complete stack from description
   - Chat with AI for guidance and suggestions

5. **Share Your Stack**
   - Click "Share Stack" to generate a shareable URL
   - Send the URL to teammates
   - Load shared stacks automatically

### Keyboard Shortcuts

- `Ctrl/Cmd + K` - Focus search
- `Ctrl/Cmd + Enter` - Copy command
- `Escape` - Clear search / Close panels

## 🎨 Categories Available

- **Web Framework**: Next.js, React, Vue, Angular, Svelte, etc.
- **CSS Framework**: Tailwind, shadcn/ui, MUI, Chakra, etc.
- **Backend Framework**: Express, NestJS, Hono, Fastify, etc.
- **Database**: PostgreSQL, MongoDB, SQLite, Supabase, etc.
- **ORM**: Prisma, Drizzle, TypeORM, Sequelize, etc.
- **Authentication**: NextAuth, Clerk, Auth0, Supabase Auth, etc.
- **State Management**: Zustand, Redux, Jotai, Recoil, etc.
- **Testing**: Jest, Vitest, Cypress, Playwright, etc.
- **Payment**: Stripe, PayPal, Lemon Squeezy, etc.
- **Deployment**: Vercel, Netlify, Railway, AWS, etc.
- And 10+ more categories...

## 🔥 Pro Tips

1. **Start with a Framework**: Select a web or backend framework first
2. **Package Manager**: Choose your preferred package manager early
3. **Use Templates**: Popular stacks are great starting points
4. **AI Analysis**: Let AI suggest complementary technologies
5. **Share Often**: Generate URLs to save and share your configurations

## 🐛 Troubleshooting

### Server won't start
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run dev
```

### Database issues
```bash
# Reset database
rm db/custom.db
npm run db:push
```

### Build errors
```bash
# Clean install
npm run build
# Check TypeScript
npx tsc --noEmit
```

## 📚 Learn More

- **Next.js Documentation**: https://nextjs.org/docs
- **Prisma Documentation**: https://www.prisma.io/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com

## 🆘 Need Help?

- Check `/README.md` for detailed documentation
- Review `/DEPLOYMENT.md` for production deployment
- See `/FIXES_APPLIED.md` for recent fixes and improvements

## ✨ What's Next?

After building your stack:
1. Run the generated command in your terminal
2. Follow framework-specific setup instructions
3. Configure environment variables
4. Start building your project!

---

**Happy Coding! 🚀**
