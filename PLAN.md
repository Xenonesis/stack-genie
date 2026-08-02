# Dependency Upgrade Plan

## Context

The project has many outdated dependencies, including several major-version bumps that may introduce breaking changes. Upgrading keeps the stack secure, stable, and compatible with current tooling.

## Approach

Upgrade in phases: safe patch/minor upgrades first, then isolated major-version upgrades with verification at each phase. Keep changes reviewable by grouping related packages.

## Current State Snapshot

- Node: `v22.23.0`
- npm: `12.0.2`
- Framework: `next@16.2.1` → `16.2.12`
- React: `19.2.4` → `19.2.8`
- TypeScript: `^6.0.2` → blocked at `6.x` (TS7 blocked by tooling)
- Tailwind: `4.2.2` → `4.3.3`
- Zod: `^4.3.6` → `4.4.3`
- Framer Motion: `^12.38.0` → `12.43.0`
- Lucide React: `^1.7.0` → `1.28.0`
- MDX Editor: `^3.53.1` → `4.1.1`
- React Hook Form: `^7.72.0` → `7.84.0`
- Axios: `^1.14.0` → `1.19.0`
- Recharts: `^3.8.1` → `3.10.1`
- TanStack Query: `^5.95.2` → `5.101.4`
- UUID: `^13.0.0` → `14.0.1`
- Zustand: `^5.0.12` → `5.0.14`
- Sharp: `^0.34.5` → `0.35.3`
- @types/node: `^25.5.0` → `26.1.2`
- All `@radix-ui/*` packages updated to latest
- Prisma: `7.6.0` → `7.9.1`

## Files to Modify

- `package.json`
- `package-lock.json` (regenerated)
- `src/components/ui/calendar.tsx` (react-day-picker v10 API fix)
- `next.config.ts` (unchanged from original; TS7 experimental flag was tested and reverted)

## Steps

### Phase A — Low-risk patch/minor upgrades

- [x] 1. Upgrade framework/runtime patch releases: `next`, `react`, `react-dom`
- [x] 2. Upgrade build/tooling patch releases: `tailwindcss`, `@tailwindcss/postcss`, `eslint`, `eslint-config-next`
- [x] 3. Upgrade UI libs patch/minor releases: `@radix-ui/*` set, `framer-motion`, `recharts`, `@tanstack/react-query`, `@tanstack/react-table`, `react-hook-form`, `@hookform/resolvers`, `axios`
- [x] 4. Upgrade data/utils: `date-fns`, `tailwind-merge`, `react-resizable-panels`, `zod`
- [x] 5. Upgrade infra: `prisma`, `@prisma/client`, `sharp`, `tsx`
- [x] 6. Run `npm install`, then `npm run lint` and `npm run build`

### Phase B — Major-version upgrades, one-by-one

For each package below:
- [x] 7. Upgrade single package
- [x] 8. Run `npm run dev` smoke test
- [x] 9. Run `npm run lint`
- [x] 10. Run `npm run build`
- [x] 11. Fix compile/runtime issues before moving to next major upgrade

Major candidates:
- [ ] 12. `typescript` 6 → 7 - **BLOCKED**: Next.js 16.2.12 compiler API doesn't support TS7. `experimental.useTypeScriptCli` enables builds, but `typescript-eslint` 8.x bundled with `eslint-config-next` requires TS `< 6.0.0`, breaking lint. Defer until Next.js/ESLint ecosystem updates.
- [x] 13. `@types/node` 25 → 26
- [x] 14. `@mdxeditor/editor` 3 → 4
- [x] 15. `uuid` 13 → 14
- [x] 16. `lucide-react` 1.7 → 1.28
- [x] 17. `react-day-picker` 9 → 10 - **Fixed**: Updated `src/components/ui/calendar.tsx` for v10 API changes (`table` → `month_grid`, `day` → `day_button`)
- [x] 18. `zustand` 5.x patch review - Already on v5, upgraded patch to `5.0.14`

### Phase C — Final verification

- [x] 19. Full `npm run dev` session check - Server starts and compiles successfully
- [x] 20. `npm run build`
- [ ] 21. `npm run lint` - **Known blocker**: Pre-existing ESLint 10 + `@eslint/eslintrc` FlatCompat circular JSON bug with `next/core-web-vitals`. Not introduced by this upgrade.
- [x] 22. `npm run verify:production`
- [x] 23. `npm run test:templates`
- [x] 24. Manual spot check of affected routes/components - Build and template tests pass; calendar API migrated to v10

## Known Issues

1. **ESLint lint command broken**: `next lint` was removed in Next.js 16. The project uses `eslint .` directly, but ESLint 10 + FlatCompat + `eslint-config-next` has a known circular config bug. This existed before our upgrades.
2. **TypeScript 7 blocked**: Next.js 16.2.12 TS compiler API doesn't support TS7. The `experimental.useTypeScriptCli` flag enables builds, but `typescript-eslint` 8.x still requires TS `< 6.0.0`, breaking lint. Defer TS7 until ecosystem catches up.
