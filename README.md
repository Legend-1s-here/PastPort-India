# PastPort India — SIH26195 (Seven-Day MVP)

> **Theme:** Heritage & Culture  
> **Flagship Monument:** Taj Mahal  
> **Tech Stack:** React + TypeScript + Vite + Tailwind CSS + Three.js / R3F + MindAR  

---

## 🏛️ MVP Core User Flow

```text
Search Taj Mahal → Read history → Explore 3D → View in AR → Optional VR
```

---

## 🚀 Quick Start (Local Setup)

```bash
# 1. Navigate into client directory
cd client

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Production build check
npm run build
```

---

## 👥 Team Workspaces & File Boundaries

| Member | Role | Assigned Branch | Allowed Folder Boundaries |
|---|---|---|---|
| **Priyansh** | Leader & Architecture | `main` | Config, integration, setup, `README.md` |
| **Siddhant** | AR Lead | `feature/siddhant-ar` | `client/src/features/ar/*` |
| **Shreyas** | Frontend Co-lead | `feature/shreyas-frontend` | `client/src/pages/*`, `client/src/components/*` |
| **Manmath** | Research Lead | `feature/manmath-research` | `content/research/*` |
| **Khushi** | Main Speaker | — | Speaker outline (no code changes) |
| **Tanaya** | QA Support | — | QA checklist & source verification |

---

## 🛡️ Rule of Integration
- **Shared 3D Asset:** Both AR and VR modes MUST use the exact same `.glb` / `.gltf` model as the standard 3D viewer.
- **Branch Protection:** All changes must go through a Pull Request (PR) to `main`.
- **Fallback Protection:** If AR or VR is unsupported on a device, the user must seamlessly fall back to the 3D Viewer.
