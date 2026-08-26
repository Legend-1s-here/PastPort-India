# AR Feature Boundary

## Architecture Overview
This directory serves as the frontend integration boundary for Augmented Reality (AR) experiences in PastPort India.

### Principles
- **Framework Independence**: The application remains decoupled from any specific AR runtime or library during the foundation phase.
- **Shared Asset Contract**: When AR is activated, it consumes the exact same typed monument and 3D model contracts defined in `@/types/monument.ts`.
- **Graceful Degradation**: Devices without AR capability seamlessly fall back to the Web 3D interactive viewer via the experience launcher (`@/lib/experience-launcher/experience-launcher.ts`).
