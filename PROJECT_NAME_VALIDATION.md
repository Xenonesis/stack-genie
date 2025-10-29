# Project Name Validation Update

## Changes Made

### ✅ Enforced Lowercase Project Names

**What changed:**
- Project names now **automatically convert to lowercase**
- Only valid characters allowed: `a-z`, `0-9`, `-`, `_`
- Invalid characters (spaces, uppercase, special chars) are automatically removed

### Implementation Details

**Files Modified:**

1. **`src/hooks/useTechStack.ts`**
   - Added `setProjectName` wrapper function
   - Automatically validates and sanitizes project names
   - Ensures lowercase-only format

2. **`src/components/tech-stack-builder.tsx`**
   - Updated project name input with inline validation
   - Added helper text explaining valid characters
   - Real-time conversion as user types

### Behavior

**Before:**
- User could type: `MyAwesomeProject`
- Would generate invalid npm package names

**After:**
- User types: `MyAwesomeProject`
- Automatically converts to: `myawesomeproject`
- User types: `My Awesome Project!`
- Automatically converts to: `myawesomeproject`

### Validation Rules

✅ **Allowed Characters:**
- Lowercase letters: `a-z`
- Numbers: `0-9`
- Hyphens: `-`
- Underscores: `_`

❌ **Not Allowed (auto-removed):**
- Uppercase letters (converted to lowercase)
- Spaces
- Special characters (@, #, $, %, etc.)
- Any other non-alphanumeric characters

### Examples

| Input | Output |
|-------|--------|
| `MyProject` | `myproject` |
| `My Project` | `myproject` |
| `My-Awesome-App!` | `my-awesome-app` |
| `Project_123` | `project_123` |
| `Test@App#2024` | `testapp2024` |

### Why This Matters

1. **npm Package Names**: Must be lowercase for package.json
2. **Directory Names**: Avoids case-sensitivity issues across OS
3. **Git Repositories**: Follows best practices for repo naming
4. **CLI Tools**: Most scaffolding tools expect lowercase
5. **URLs**: Prevents case-related routing issues

### User Experience

- **Real-time feedback**: Characters convert as you type
- **Helper text**: Clear guidance shown below input
- **No errors**: Invalid input silently cleaned up
- **Consistent naming**: Ensures valid project structure

### Testing

Build verified: ✅ Successful
- TypeScript compilation: ✅ 0 errors
- Production build: ✅ Passing

---

**Date**: October 30, 2025
**Status**: ✅ Implemented and Verified
**Breaking Change**: No (existing project names remain valid)
