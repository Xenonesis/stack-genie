# 🎯 Responsive Design Quick Reference Card

## 📱 At a Glance

```
Mobile        Tablet        Desktop       Large Desktop
(< 768px)     (768-1023px)  (1024-1535px) (≥ 1536px)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
├─────────┤   ├─────────┤   ├──┬──────┤   ├───┬──────┤
│    1    │   │  1   2  │   │ │ 1  2 │   │   │1 2 3 │
│  Column │   │ Columns │   │S│Col..│   │ S │Col.. │
│   Grid  │   │  Grid   │   │i│      │   │ i │      │
│         │   │         │   │d│      │   │ d │  4   │
└─────────┘   └─────────┘   └─┴──────┘   └───┴──────┘
Sidebar       Sidebar       Sidebar       Sidebar
Hidden        Hidden        Visible       Visible
(toggle)      (toggle)      (320px)       (384px)
```

## 🎨 Responsive Classes Cheat Sheet

### Layout & Visibility
```tsx
// Show/Hide based on screen size
hidden lg:flex              // Hide mobile, show desktop
block sm:hidden             // Show mobile, hide tablet+
flex flex-col lg:flex-row   // Vertical → Horizontal

// Width
w-full lg:w-80 xl:w-96     // Full → 320px → 384px
max-w-screen-2xl           // Maximum width container
```

### Typography
```tsx
// Headings
text-lg sm:text-xl lg:text-2xl     // 18px → 20px → 24px
text-base sm:text-lg               // 16px → 18px

// Body text
text-xs sm:text-sm                 // 12px → 14px
text-sm sm:text-base               // 14px → 16px

// Utility
truncate                           // Cut with ellipsis
line-clamp-2                       // Max 2 lines
```

### Spacing
```tsx
// Padding
p-3 sm:p-4 lg:p-6         // 12px → 16px → 24px
px-2 sm:px-4              // Horizontal padding
py-3 sm:py-4              // Vertical padding

// Margin
m-2 sm:m-4                // 8px → 16px
mb-2 sm:mb-3 lg:mb-4      // 8px → 12px → 16px

// Gap (for grid/flex)
gap-2 sm:gap-4            // 8px → 16px
gap-3 sm:gap-4            // 12px → 16px
```

### Grid Systems
```tsx
// Common patterns
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
// 1 col → 2 cols → 3 cols

grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4
// Full responsive grid: 1 → 2 → 2 → 3 → 4 columns
```

### Icons & Images
```tsx
// Icons
w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6    // 16px → 20px → 24px
w-3 h-3 sm:w-4 sm:h-4                   // 12px → 16px

// Images
w-full sm:w-auto                         // Full width on mobile
max-w-xs sm:max-w-sm md:max-w-md        // Responsive max-widths
```

## 📐 Breakpoint Reference

| Name | Value | Devices | When Sidebar Shows |
|------|-------|---------|-------------------|
| xs   | 475px | Large phones | ❌ |
| sm   | 640px | Tablets portrait | ❌ |
| md   | 768px | Tablets | ❌ |
| lg   | 1024px | Desktop | ✅ **Shows here** |
| xl   | 1280px | Large desktop | ✅ (wider) |
| 2xl  | 1536px | XL desktop | ✅ |
| 3xl  | 1920px | Ultra-wide | ✅ |

## 🎯 Common Patterns

### Responsive Container
```tsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content auto-centers with responsive padding */}
</div>
```

### Responsive Button
```tsx
<button className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm">
  <Icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
  <span className="hidden sm:inline">Full Text</span>
  <span className="sm:hidden">Short</span>
</button>
```

### Responsive Card
```tsx
<div className="p-3 sm:p-4 lg:p-6 rounded-lg">
  <h3 className="text-sm sm:text-base lg:text-lg mb-2">Title</h3>
  <p className="text-xs sm:text-sm text-gray-600">Description</p>
</div>
```

### Responsive Modal
```tsx
<div className="fixed inset-0 p-2 sm:p-4">
  <div className="bg-white rounded-lg 
                  max-w-full sm:max-w-2xl 
                  max-h-[90vh] sm:max-h-[80vh]
                  mx-auto">
    {/* Modal content */}
  </div>
</div>
```

### Responsive Sidebar Layout
```tsx
<div className="flex flex-col lg:flex-row">
  {/* Sidebar */}
  <aside className="hidden lg:flex w-full lg:w-80 xl:w-96">
    {/* Sidebar content */}
  </aside>
  
  {/* Main */}
  <main className="flex-1">
    {/* Main content */}
  </main>
</div>
```

## 🔥 Power Tips

### 1. Mobile-First Thinking
```tsx
// ❌ Wrong - Desktop first
className="p-6 sm:p-4 xs:p-2"

// ✅ Right - Mobile first
className="p-2 sm:p-4 lg:p-6"
```

### 2. Flexible Sizing
```tsx
// Use min-w-0 to allow text truncation in flex
<div className="flex-1 min-w-0">
  <p className="truncate">Long text that truncates...</p>
</div>
```

### 3. Touch Targets
```tsx
// Ensure minimum 44x44px for touch
className="min-h-[44px] min-w-[44px] p-2"
```

### 4. Responsive Gaps
```tsx
// Use gap instead of margins for flex/grid
<div className="flex gap-2 sm:gap-4">
  {/* Items automatically spaced */}
</div>
```

### 5. Content Wrapping
```tsx
// Allow items to wrap on small screens
<div className="flex flex-wrap gap-2">
  {items.map(item => <Badge key={item} />)}
</div>
```

## ⚡ Quick Wins

### Make Any Component Responsive in 3 Steps

**Step 1: Add responsive padding**
```tsx
className="p-3 sm:p-4 lg:p-6"
```

**Step 2: Add responsive text**
```tsx
className="text-xs sm:text-sm lg:text-base"
```

**Step 3: Add responsive spacing**
```tsx
className="gap-2 sm:gap-4"
```

## 🎨 Component Examples

### Header
```tsx
<header className="p-3 sm:p-4 lg:p-6">
  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">
    Tech Genie
  </h1>
</header>
```

### Grid of Cards
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
  {cards.map(card => (
    <div key={card.id} className="p-3 sm:p-4 rounded-lg">
      {card.content}
    </div>
  ))}
</div>
```

### Responsive Image
```tsx
<img 
  src="/image.jpg"
  alt="Description"
  className="w-full sm:w-auto max-w-md rounded-lg"
/>
```

## 📊 Sizing Reference

### Text Sizes
| Class | Mobile | Desktop | Use Case |
|-------|--------|---------|----------|
| text-xs | 12px | 12px | Small labels |
| text-sm | 14px | 14px | Body text |
| text-base | 16px | 16px | Default |
| text-lg | 18px | 18px | Subheadings |
| text-xl | 20px | 20px | Headings |
| text-2xl | 24px | 24px | Titles |

### Spacing Scale
| Class | Value | Use Case |
|-------|-------|----------|
| p-1 | 4px | Tight spacing |
| p-2 | 8px | Compact |
| p-3 | 12px | Mobile default |
| p-4 | 16px | Tablet default |
| p-6 | 24px | Desktop default |
| p-8 | 32px | Generous |

## 🐛 Common Pitfalls to Avoid

### ❌ Don't Do This
```tsx
// Fixed widths
<div className="w-[320px]">

// Desktop-first responsive
className="p-6 sm:p-4"

// No min-w-0 with truncate
<div className="flex-1">
  <p className="truncate">Text</p>
</div>
```

### ✅ Do This Instead
```tsx
// Flexible widths
<div className="w-full max-w-md">

// Mobile-first responsive
className="p-3 sm:p-4 lg:p-6"

// min-w-0 with truncate
<div className="flex-1 min-w-0">
  <p className="truncate">Text</p>
</div>
```

## 🎓 Pro Tips

1. **Use Tailwind's arbitrary values** for custom sizes
   ```tsx
   className="max-w-[85vw]"
   ```

2. **Combine responsive classes** for complex layouts
   ```tsx
   className="flex flex-col lg:flex-row gap-4 lg:gap-8"
   ```

3. **Test on actual devices** not just DevTools
   - Touch behavior can differ
   - Font rendering varies
   - Performance matters

4. **Use semantic breakpoints**
   - Think "mobile", "tablet", "desktop"
   - Not "small", "medium", "large"

5. **Progressive enhancement**
   - Start with working mobile version
   - Add features for larger screens

---

## 🚀 Ready to Use!

This reference card covers 90% of responsive design needs. Keep it handy while building responsive layouts!

**Remember**: Mobile first, test often, and keep it simple! 📱➡️🖥️
