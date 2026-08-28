# PastPort India — Visual Design System & Motion Tokens (Phase P2)

## 1. Design Philosophy
PastPort India's visual system evokes a **cinematic historical archive** and an **exclusive digital museum**. The visual language draws inspiration from Indian architectural materials:
- **Charcoal Brown & Slate**: Deep, atmospheric near-black surfaces (`#0c0a09`, `#14110f`)
- **Indian Sandstone & Marble**: Warm ivory and aged stone (`#f7f1e7`, `#cbb493`)
- **Antique Brass & Gold**: Reserved, luminous accent tones (`#c9a44c`, `#e2c170`)
- **Terracotta & Imperial Burgundy**: Authentic historical pigments (`#c46849`, `#6b212c`)

---

## 2. Color Palette & Semantic Tokens

| Semantic Token | Hex / Value | Usage |
|---|---|---|
| `--color-charcoal-950` | `#0c0a09` | Deepest application background |
| `--color-charcoal-900` | `#14110f` | Museum panel & card surfaces |
| `--color-charcoal-850` | `#1a1614` | Secondary interactive surfaces |
| `--color-parchment-200` | `#f7f1e7` | Primary ivory text |
| `--color-sandstone-400` | `#cbb493` | Secondary text & subtle borders |
| `--color-brass-500` | `#c9a44c` | Antique brass accent & primary CTA |
| `--color-brass-400` | `#e2c170` | Luminous gold highlights & focus rings |
| `--color-terracotta-500` | `#c46849` | AR mode accent & historical highlights |
| `--color-burgundy-600` | `#541620` | VR mode accent & royal callouts |

---

## 3. Typography Scale

```css
--font-display: 'Cinzel', serif;              /* Major headings, monument titles, branding */
--font-editorial: 'Cormorant Garamond', serif; /* Narrative prose, quotes, historical summaries */
--font-sans: 'Plus Jakarta Sans', sans-serif; /* UI labels, buttons, navigation, metadata */
```

| Level | Font Family | Size | Weight |
|---|---|---|---|
| **Display / Brand** | `Cinzel` | 2.25rem – 3rem | Extrabold (800) |
| **H1 / Monument Title** | `Cinzel` | 1.875rem – 2.25rem | Bold (700) |
| **H2 / Section Title** | `Cinzel` | 1.25rem – 1.5rem | Bold (700) |
| **Editorial Prose** | `Cormorant Garamond` | 1.125rem – 1.25rem | Regular / Medium (400–500) |
| **UI Body / Default** | `Plus Jakarta Sans` | 0.875rem (14px) | Regular (400) |
| **Label / Metadata** | `Plus Jakarta Sans` | 0.6875rem (11px) | Semibold (600), Uppercase |

---

## 4. UI Primitives (`@/components/ui`)

1. **`Button`**:
   - `primary`: Antique brass gradient with dark charcoal text.
   - `secondary`: Sandstone-bordered charcoal surface with warm hover.
   - `ghost`: Transparent with subtle charcoal hover.
   - `burgundy`: Royal burgundy background for immersive callouts.
   - `outline`: Fine brass-bordered button.
   - Focus-visible ring in luminous brass (`#e2c170`).
2. **`Surface`**:
   - `museum`: Charcoal panel with hairline brass border and top inner highlight.
   - `cinematic`: Dark radial gradient with brass atmospheric shadow.
   - `subtle`: Translucent stone glassmorphism with backdrop blur.
   - `parchment`: Warm aged paper texture with dark ink text.
3. **`Badge`**:
   - Historical tags for periods, status, and metadata in `brass`, `sandstone`, `terracotta`, `burgundy`, or `charcoal`.
4. **`Container`**:
   - Standardized layout widths: `narrow` (max 3xl), `editorial` (max 5xl), `wide` (max 6xl), `full`.

---

## 5. Motion Tokens & Accessibility (`@/lib/motion`)

```ts
export const MOTION_DURATIONS = {
  FAST: 0.18,      // UI micro-interactions, button hover
  NORMAL: 0.35,    // Panel transitions, tab switches
  CINEMATIC: 0.8,  // Hero entries, modal reveals
  DRAMATIC: 1.2,   // Chapter shifts, full-screen transitions
};

export const MOTION_EASES = {
  OUT: 'power2.out',
  IN_OUT: 'power2.inOut',
  CINEMATIC: 'power3.out',
  EXPRESSIVE: 'expo.out',
};
```

### Reduced Motion Compliance:
- Global CSS rule (`@media (prefers-reduced-motion: reduce)`) zeroes animation and transition durations.
- Utility `isReducedMotion()` and `safeAnimate()` in `@/lib/motion/motion.ts` ensure GSAP animations degrade to instantaneous state changes when reduced motion is requested.
