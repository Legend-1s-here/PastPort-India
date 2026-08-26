# 3D Viewer Feature Boundary

## Architecture Overview
This module houses the Web 3D experience layer powered by **React Three Fiber (R3F)**, **Three.js**, and **@react-three/drei**.

### Key Rules
1. **Lazy Loading Isolation**: The 3D Scene (`SceneContainer.tsx`) is dynamically loaded on demand via `React.lazy()` inside `ModelViewerContainer.tsx`. The initial application bundle never eagerly initializes WebGL contexts or loads Three.js runtime until the user navigates into a 3D experience.
2. **Shared Data Contract**: Hotspots and monument geometry references are passed via typed interfaces from `src/types/monument.ts`.
3. **No Heavy Assets in Foundation**: Actual high-resolution GLB/GLTF assets are loaded via URLs configured in the monument data, with loading/error fallbacks.
