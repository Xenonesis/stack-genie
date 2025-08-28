# Production Deployment Guide

## Pre-deployment Checklist

### 1. Environment Variables
- [ ] Copy `.env.production` to `.env.local`
- [ ] Update `NEXT_PUBLIC_AI_API_KEY` with your production API key
- [ ] Set `NODE_ENV=production`
- [ ] Configure database URL if using external database

### 2. Build Optimization
```bash
# Install dependencies
npm ci

# Generate Prisma client
npm run db:generate

# Build for production
npm run build
```

### 3. Database Setup
```bash
# Deploy database migrations
npm run db:migrate

# Push schema changes (alternative)
npm run db:push
```

## Deployment Options

### Option 1: Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Option 2: Docker
```dockerfile
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM base AS build
COPY . .
RUN npm run build

FROM base AS runtime
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/server.ts ./server.ts

EXPOSE 3000
CMD ["npm", "start"]
```

### Option 3: Traditional Server
```bash
# On your server
git clone your-repo
cd your-repo
npm ci
npm run build
npm start
```

## Performance Optimizations

### 1. Image Optimization
- Images are automatically optimized by Next.js
- Use `next/image` component for all images
- Configure image domains in `next.config.ts`

### 2. Bundle Analysis
```bash
# Analyze bundle size
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```

### 3. Caching
- Static assets are cached automatically
- API routes can implement custom caching
- Use CDN for global distribution

## Security Checklist

- [ ] Remove development API keys
- [ ] Enable HTTPS in production
- [ ] Set secure headers in `next.config.ts`
- [ ] Validate all environment variables
- [ ] Use secrets management for sensitive data

## Monitoring

### 1. Error Tracking
Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- DataDog for performance monitoring

### 2. Analytics
- Google Analytics
- Vercel Analytics
- Custom analytics solution

## Maintenance

### 1. Updates
```bash
# Update dependencies
npm update
npm audit fix

# Update Next.js
npm install next@latest
```

### 2. Database Maintenance
```bash
# Backup database
# (command depends on your database provider)

# Run migrations
npm run db:migrate
```

## Troubleshooting

### Common Issues
1. **Build Errors**: Check TypeScript errors and fix them
2. **Environment Variables**: Ensure all required variables are set
3. **Database Connection**: Verify database URL and credentials
4. **API Limits**: Monitor AI API usage and limits

### Performance Issues
1. **Slow Loading**: Check bundle size and optimize imports
2. **Memory Issues**: Monitor server resources
3. **Database Queries**: Optimize Prisma queries

## Support
For deployment issues, check:
1. Next.js deployment documentation
2. Your hosting provider's documentation
3. Project README.md for specific instructions