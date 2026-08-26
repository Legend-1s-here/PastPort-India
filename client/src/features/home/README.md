# Home Feature Architecture (Phase P4)

## Architecture Overview
The homepage introduces the cinematic historical narrative of PastPort India, serving as the immersive portal into India's monumental architecture.

### Key Components
- **`CinematicHero.tsx`**: Layered atmospheric hero environment with warm lighting, editorial typography, and coordinated GSAP entry animations.
- **`HistoricalBook.tsx`**: Hybrid 2D/CSS 3D perspective manuscript object that serves as the tactile metaphor for exploring history. Supports closed codex state and dual-page parchment spread with direct entry into the flagship Taj Mahal portal.
- **`DiscoverySection.tsx`**: Curated gateway section showcasing the flagship Taj Mahal experience with verified highlights, spatial capability badges, and secondary archival teasers.
- **`HeritagePillars.tsx`**: Explains the core architectural pillars (Source Rigor, Unified Spatial Core, Hardware Fallback Protection).

### Motion & Accessibility
- Coordinated GSAP entry timeline using `gsap.context()` for clean React cleanup.
- Full `prefers-reduced-motion` compliance: animations gracefully degrade to instant render without blocking visibility.
- Mobile-first responsive layouts across 360px–1440px.
