
# Plan: Fix Background Image Scope and Add Section Transitions

## Overview
Currently, the background image is applied to the entire `<main>` wrapper, causing it to appear behind all sections as you scroll. This plan will move the background to only the Home section and restore the original black/sunlight theme backgrounds for About, Projects, and Contact sections, with smooth fade transitions between them.

## Changes

### 1. Restructure Index.tsx - Move Background to Home Section Only

**File:** `src/pages/Index.tsx`

- Remove the background image from the main `<main>` wrapper
- Apply the background image only to the `#home` section using inline styles
- The Home section will use `background-size: cover` and `background-position: center`
- Add a gradient overlay at the bottom of the Home section for a smooth fade to black

### 2. Restore Original Section Backgrounds

Each section will return to having its own distinct background with the black/sunlight theme:

- **About Section**: Pure black background (`bg-background`) with subtle sunlight glow effect
- **Projects Section**: Slightly lighter charcoal background with animated glow accents
- **Contact Section**: Dark background with sunlight radial gradient effect
- **Footer**: Dark background matching the overall theme

### 3. Add Smooth Section Transitions

Add fade transitions between sections using CSS gradients:

- Bottom of Home section: Gradient fade from transparent to black
- Top of About section: Gradient fade from black to the section's background
- Similar transitions between About → Projects → Contact → Footer

This creates a smooth visual flow as users scroll.

### 4. Update CSS (index.css)

Add a new utility class for section transitions:

```css
.section-fade-top {
  position: relative;
}

.section-fade-top::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 100%);
  pointer-events: none;
  z-index: 1;
}
```

---

## Technical Details

### Home Section Structure
```text
+----------------------------------+
|  Background Image (your image)  |
|  - background-size: cover       |
|  - background-position: center  |
|                                  |
|     [Hero Content]               |
|     - White text with shadows   |
|     - CTA buttons               |
|                                  |
|  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~   |
|  Gradient fade to black (100px) |
+----------------------------------+
```

### Other Sections Structure
```text
+----------------------------------+
|  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~   | ← Fade from black
|                                  |
|  Pure black/charcoal background |
|  with sunlight glow effects     |
|                                  |
|     [Section Content]            |
|                                  |
|  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~   | ← Fade to black
+----------------------------------+
```

### Files to Modify
1. **src/pages/Index.tsx** - Restructure backgrounds
2. **src/index.css** - Add transition utility classes

---

## Summary

| Section | Background |
|---------|-----------|
| Home | Your uploaded image (full viewport) |
| About | Pure black with sunlight glow |
| Projects | Charcoal with animated accents |
| Contact | Dark with sunlight gradient |
| Footer | Dark matching theme |

All transitions between sections will have a smooth 100px gradient fade for visual continuity.
