# Build Speed Optimization Plan

## Context

The project has slow compilation/build times. Investigation shows the codebase is small (73 TS/TSX files, ~558KB), so the slowness is in tooling/configuration overhead rather than code volume.

Key findings:
- `pnpm exec next build` completes in ~30s, which is acceptable for the dependency set
- `pnpm run build` is much slower due to pnpm script wrapper overhead, especially supply-chain lockfile verification (1-2 minutes)
- TypeScript checking varies between 15s-45s; including `.next/types` in `tsconfig.json` can cause unnecessary rechecks
- `prisma generate` runs before every build via `package.json` build script, adding ~17s mostly from startup overhead
- `build:production` and `scripts/build-production.*` still use `npm` instead of `pnpm`

## Approach

Target the highest-overhead items first: pnpm script/preflight overhead, TypeScript config inefficiency, and unnecessary repeated Prisma generation.

## Steps

- [ ] 1. Update `package.json` build scripts to use `pnpm` instead of `npm` for consistency and to avoid npm wrapper overhead
- [ ] 2. Remove `.next/types/**/*.ts` and `.next/dev/types/**/*.ts` from `tsconfig.json` `include` to avoid rechecking generated type files
- [ ] 3. Split `build` script so `prisma generate` is not run on every build, or add a separate fast-build path
- [ ] 4. Update `scripts/build-production.bat` and `scripts/build-production.sh` to use `pnpm`
- [ ] 5. Verify build time with `pnpm run build` and `pnpm run build:production`
- [ ] 6. Commit and push changes

## Expected Outcome

- Faster `pnpm run build` by eliminating pnpm preflight/verification overhead where possible
- Faster TypeScript checking by removing `.next` types from `tsconfig`
- Faster production builds by not regenerating Prisma client unnecessarily
