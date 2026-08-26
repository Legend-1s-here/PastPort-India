# PastPort India — Frontend Architecture Documentation (Phase P1)

## 1. Architectural Philosophy
PastPort India is designed as a feature-oriented, modular web application built to deliver a cinematic, historical, and immersive experience for exploring Indian monuments.

The architecture emphasizes:
- **Feature Encapsulation**: Domain features (`3d-viewer`, `ar`, `vr`, `experience`, `home`, `monuments`, `taj-mahal`) are self-contained modules with dedicated boundaries.
- **Lazy Loading & Performance**: Heavy 3D libraries (Three.js, React Three Fiber, Drei) and WebGL scenes are dynamically loaded on demand, keeping initial page load ultra-fast on mobile and desktop.
- **Decoupled Experience Runtimes**: Normal website browsing operates without requiring WebGL or WebXR capabilities. When AR or VR experiences are requested, the application checks device capabilities and provides graceful degradation to Web 3D.
- **Modular Code Ownership**: System architecture is organized around domain features and typed contracts, rather than individual team members.

---

## 2. Directory Structure

```
PastPort-India/
├── backend/
│   └── README.md                    # Backend integration boundary (P1 placeholder)
│
├── client/
│   ├── public/                      # Static public assets (icons, favicons)
│   ├── src/
│   │   ├── components/
│   │   │   ├── navigation/          # Navigation components (AppHeader)
│   │   │   └── ui/                  # Reusable UI primitives (LoadingSpinner)
│   │   │
│   │   ├── features/
│   │   │   ├── 3d-viewer/           # Web 3D experience layer (R3F Canvas, controls, hotspots)
│   │   │   ├── ar/                  # Augmented Reality integration boundary
│   │   │   ├── vr/                  # Virtual Reality WebXR integration boundary
│   │   │   ├── experience/          # Experience mode switching controls
│   │   │   ├── home/                # Homepage narrative & cinematic components
│   │   │   ├── monuments/           # Monument catalog & search features
│   │   │   └── taj-mahal/           # Flagship monument specific features
│   │   │
│   │   ├── layouts/                 # Page layouts (RootLayout with header/footer)
│   │   ├── pages/                   # Top-level routed views (Home, Explore, MonumentDetail)
│   │   ├── hooks/                   # Custom React hooks (useDeviceCapabilities)
│   │   ├── lib/
│   │   │   ├── capabilities/        # WebGL / AR / VR device capability detection
│   │   │   └── experience-launcher/ # Fallback logic and experience launch resolution
│   │   │
│   │   ├── data/                    # Centralized typed monument datasets (monuments.ts, tajMahal.ts)
│   │   ├── types/                   # TypeScript interfaces (monument.ts, experience.ts)
│   │   ├── index.css                # Tailwind CSS & global styles
│   │   ├── App.tsx                  # Declarative React Router routing configuration
│   │   └── main.tsx                 # Application entry point with BrowserRouter
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
└── docs/
    └── architecture/
        └── frontend.md              # This architecture document
```

---

## 3. Core Architectural Modules

### 3.1 Data Layer & Monument Contract (`@/types/monument.ts`, `@/data/monuments.ts`)
Monuments are represented as structured, strongly-typed objects containing:
- Identification & routing (`id`, `slug`)
- Historical metadata (`name`, `period`, `builtBy`, `historicalSummary`, `culturalSignificance`)
- Verified hotspots (`Hotspot[]`) with institutional citation IDs (`sourceIds`)
- Chronological timeline events (`TimelineEvent[]`)
- Experience availability flags (`web3d`, `ar`, `vr`)

When an external API or database is connected in future phases, the data layer (`@/data/monuments.ts`) can be swapped with async API fetchers without rewriting component UI.

### 3.2 Experience Launcher & Capability Architecture (`@/lib/`)
- **Capability Detection** (`@/lib/capabilities/capabilities.ts`): Detects WebGL runtime support and prepares hooks for future WebXR AR/VR device checks.
- **Experience Launcher** (`@/lib/experience-launcher/experience-launcher.ts`): Implements deterministic fallback logic:
  $$\text{AR / VR requested} \xrightarrow{\text{unsupported}} \text{Fallback to Web 3D} \xrightarrow{\text{unsupported}} \text{Informative notice}$$

### 3.3 3D Architecture Boundary (`@/features/3d-viewer/`)
- **`SceneContainer.tsx`**: Renders the React Three Fiber `<Canvas>`, lighting, camera, OrbitControls, and interactive 3D HTML hotspot markers.
- **`ModelViewerContainer.tsx`**: Wraps `SceneContainer` using `React.lazy()` and `React.Suspense` with a custom loading indicator.
- **Performance Guarantee**: Three.js and WebGL contexts are never initialized on the landing page or catalog views; they are bundled and loaded strictly when the user opens the 3D viewer.

### 3.4 AR & VR Integration Boundaries (`@/features/ar/`, `@/features/vr/`)
- Isolated feature folders providing clean interface points for upcoming AR and VR implementations.
- Decoupled from specific third-party AR runtime locks to maintain agility.

---

## 4. Routing Strategy
React Router (`react-router-dom`) manages client-side URL routing:
- `/` — Homepage featuring the flagship monument highlight and architecture pillars.
- `/explore` — Searchable catalog of Indian heritage monuments.
- `/monuments/:slug` — Monument deep dive with 3D/AR/VR experience selector, hotspots, timeline, and source ledger.
- `*` — Catch-all redirect to `/`.
