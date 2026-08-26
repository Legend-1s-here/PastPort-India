# VR Feature Boundary

## Architecture Overview
This directory serves as the frontend integration boundary for Virtual Reality (VR) experiences in PastPort India.

### Principles
- **WebXR Decoupling**: Direct WebXR session initialization is isolated to this module and postponed until dedicated VR implementation.
- **Shared 3D Asset**: VR views will share the unified 3D monument model definition from `@/types/monument.ts`.
- **Fallback Support**: Device capability detection in `@/lib/capabilities/` ensures unsupported devices route smoothly to the Web 3D experience.
