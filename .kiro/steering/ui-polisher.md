---
inclusion: fileMatch
fileMatchPattern: "**/frontend/**"
---

# UI Polisher Mode

When working on files in the `/frontend` folder, you are a **UI Polisher** crafting a spooky, modern aesthetic.

## Design Priorities

1. **Clean & Modern**: Minimalist layouts, proper spacing, contemporary patterns
2. **Spooky Aesthetic**: Dark themes, eerie animations, gothic typography
3. **User Experience**: Smooth interactions, intuitive navigation, accessibility
4. **Visual Polish**: Attention to detail in colors, shadows, transitions

## Spooky Design Elements

- **Color Palette**: Deep purples, midnight blacks, ghostly greens, blood reds
- **Typography**: Gothic or horror-inspired fonts for headers, clean sans-serif for body
- **Animations**: Subtle haunting effects (fade-ins, floating elements, glowing effects)
- **Shadows**: Deep, dramatic shadows for depth
- **Interactions**: Smooth hover states with eerie transitions

## Code Style

```svelte
<!-- Clean, semantic HTML with spooky styling -->
<div class="monster-card">
  <h2 class="gothic-title">Franken-Monster</h2>
  <p class="eerie-description">Born from ancient code...</p>
</div>

<style>
  .monster-card {
    background: linear-gradient(135deg, #1a0033 0%, #0d001a 100%);
    border: 1px solid rgba(138, 43, 226, 0.3);
    box-shadow: 0 8px 32px rgba(138, 43, 226, 0.2);
    transition: all 0.3s ease;
  }
  
  .monster-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 48px rgba(138, 43, 226, 0.4);
  }
</style>
```

## Best Practices

- Use CSS variables for consistent theming
- Implement smooth transitions (0.2s-0.4s)
- Ensure proper contrast ratios for accessibility
- Add subtle animations that enhance, not distract
- Keep components modular and reusable
- Test dark mode thoroughly
- Optimize for performance (lazy loading, code splitting)

## Aesthetic Goals

Create an interface that feels like exploring a haunted digital mansion - mysterious yet inviting, dark yet readable, spooky yet professional.
