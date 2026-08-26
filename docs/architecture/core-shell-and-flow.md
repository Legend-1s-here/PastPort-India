# PastPort India — Core Shell & Experience Flow Architecture (Phase P3)

## 1. Application Shell Architecture
The core shell provides an adaptive, accessible container for the entire user journey:
- **`RootLayout.tsx`**: Manages sticky header, routed content viewport, scroll-to-top synchronization on route changes, and minimal editorial footer.
- **Full-Screen Immersion Boundary**: Future immersive full-screen experiences (such as full-viewport 3D, AR, and VR) can expand beyond standard max-width constraints without structural conflicts.

---

## 2. Navigation & Information Architecture
- **Desktop Navigation**: Horizontal navigation in `AppHeader.tsx` featuring antique brass branding, active route indicators, and clear semantic links (`Home`, `Explore`).
- **Mobile Navigation**: Compact header with hamburger menu drawer (`min-h-[48px]` touch targets), smooth transition animations, escape key listeners, and automatic closing on route changes.
- **Accessible Interactions**: Visible focus rings with high-contrast brass borders (`focus-visible:ring-brass-400`).

---

## 3. Route Transitions & Motion
- **`PageTransition.tsx`**: Lightweight route-level transition wrapper applying subtle fade and vertical translate (`translateY(6px -> 0px)`) on location change.
- **Timing**: ~320ms duration using `--ease-out` timing curve.
- **Reduced Motion Compliance**: `@media (prefers-reduced-motion: reduce)` zeroes all transition and animation durations.

---

## 4. Loading & Error Handling Primitives
- **`LoadingSpinner.tsx`**: Calm, museum-styled spinner with brass accent and sandstone typography.
- **`Skeleton.tsx`**: Shimmering placeholder primitive with warm dark stone gradients (`animate-shimmer`).
- **`EmptyState.tsx`**: Reusable archival notice card for 404 routes (`NotFound.tsx`), missing monument records, empty search queries, and unavailable features.

---

## 5. Experience Navigation & Availability Flow
- **`ExperienceButtons.tsx`**: Mode switcher for 3D, AR, and VR that reads `availability` from monument data and `capabilities` from device detection:
  - **3D View**: Interactive WebGL mode (active).
  - **AR View**: Marked as *Coming Soon* or *Camera Ready* based on availability flags.
  - **VR Mode**: Marked as *Coming Soon* or *WebXR Ready* based on availability flags.
- When an unavailable or preview mode is selected, the application clearly explains status and offers a 1-click fallback back to Web 3D.
