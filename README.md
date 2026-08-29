# 🏛️ PastPort India — Interactive 3D & AR Cultural Heritage Archive

<div align="center">

![PastPort India Poster](https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop)

### **SIH Problem Statement: SIH26197 • Theme: Heritage & Culture**  
*Bringing India's timeless monuments and ancient scriptures into immersive 3D and WebXR Augmented Reality.*

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![WebXR](https://img.shields.io/badge/WebXR-Spatial_AR-FF4400?style=for-the-badge&logo=webxr&logoColor=white)](https://immersiveweb.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## 📜 About PastPort India

**PastPort India** is an immersive digital archive designed to preserve, celebrate, and explore the rich architectural and cultural tapestry of India. From the rock-cut caves of Ajanta to the marble mausoleum of the Taj Mahal, PastPort India allows users to walk through virtual museum galleries, examine rare historical manuscripts in 3D, and project full-scale heritage monuments directly onto their physical surroundings using **WebXR Spatial Augmented Reality**.

---

## ✨ Key Features & Experience Highlights

### 🖼️ 1. Cinematic 3D Grand Museum Gallery
- **Dynamic Camera Scroll Path**: Smooth 3D scroll animation gliding past illuminated Mughal archways and ancient Indian artwork.
- **Cultural Shrines & Exhibits**: Features a gilded **Golden Temple Sanctum**, a bronze **Nataraja Prabhamandala Shrine**, and the **Imperial Peacock Throne**.
- **Museum Vitrines**: Flanked by display cases showcasing the **Chola Bronze** and **Ashoka Lion Capital**.

### 📖 2. Authentic 3D Codex & Antique Book Display
- **3D Antique Manuscript**: Detailed open manuscript complete with gold filigree borders, ink script lines, ruby drop-cap initials, and a draped crimson silk ribbon.
- **Carved Lectern Easel Stand**: Supported by a mahogany and brass museum stand with an angled easel backrest board and rear support struts.
- **Interactive Accessories**: Accompanied by an antique brass magnifying glass and a glowing brass incense censer (*Dhoopdani*).

### 📱 3. Instant WebXR Augmented Reality
- **One-Tap AR Launch**: Direct seamless launch into the WebXR AR engine with placement reticle and surface snapping.
- **Camera Fallback Protection**: Graceful degradation with spatial 3D preview and fallback guidance when operating under HTTP or unsupported devices.

---

## 🛠️ Complete Technology Stack

<table width="100%">
  <tr>
    <th width="30%">Layer</th>
    <th width="70%">Technologies Used</th>
  </tr>
  <tr>
    <td><b>Frontend Core</b></td>
    <td>React 18 • TypeScript • Vite • React Router DOM</td>
  </tr>
  <tr>
    <td><b>3D Rendering & Math</b></td>
    <td>Three.js • @react-three/fiber (R3F) • @react-three/drei (useGLTF, Center, AdaptiveDpr)</td>
  </tr>
  <tr>
    <td><b>Augmented Reality</b></td>
    <td>WebXR Device API • Custom WebAR Engine (`/ar/index.html`) • Camera Passthrough</td>
  </tr>
  <tr>
    <td><b>UI & Design System</b></td>
    <td>Tailwind CSS • Custom Glassmorphism & Gold Foil Gradients • Lucide React Icons</td>
  </tr>
  <tr>
    <td><b>Asset Formats</b></td>
    <td>Binary GLTF/GLB 3D Models • High-Resolution Compressed Textures • SVG Vector Icons</td>
  </tr>
  <tr>
    <td><b>Deployment & Infrastructure</b></td>
    <td>Vercel Edge Network • Free Automated SSL/HTTPS (enabling mobile camera AR) • GitHub CI/CD</td>
  </tr>
</table>

---

## 🔄 User Journey & Interactive Flow

```text
  ┌───────────────────────┐
  │  Landing Page Arrival │
  └───────────┬───────────┘
              ▼
  ┌───────────────────────┐
  │  Scroll Down Gallery  │ ──► Glides past Nataraja Shrine & Golden Temple Sanctum
  └───────────┬───────────┘
              ▼
  ┌───────────────────────┐
  │  Hero 3D Book View    │ ──► Resting on Mahogany Lectern Stand with Magnifying Glass
  └───────────┬───────────┘
              ▼
  ┌───────────────────────┐
  │  Explore Monument     │ ──► Historical Chronicles, Architectural Details & 3D Viewer
  └───────────┬───────────┘
              ▼
  ┌───────────────────────┐
  │  Launch WebXR AR      │ ──► Project Taj Mahal in Real-World Environment
  └───────────────────────┘
```

---

## 🚀 Quick Start (Local Setup)

Follow these steps to run PastPort India locally on your machine:

```bash
# 1. Clone the repository
git clone https://github.com/Legend-1s-here/PastPort-India.git

# 2. Navigate into the client directory
cd PastPort-India/client

# 3. Install dependencies
npm install

# 4. Start local development server (accessible on local network)
npm run dev -- --host

# 5. Build for production check
npm run build
```

Open your browser at `http://localhost:5173` or access on your mobile phone via your local IP (`http://192.168.x.x:5173`).

---

## 👥 Team Workspaces & Roles

| Team Member | Role | Primary Responsibility |
|:---|:---|:---|
| **Priyansh** | Team Lead & Architect | System Architecture, 3D Museum Scene & Deployment |
| **Siddhant** | AR Lead | WebXR Engine & Camera Passthrough Integration |
| **Shreyas** | Frontend Co-lead | UI Components, Routing & Responsive Layouts |
| **Manmath** | Research Lead | Monument History & Historical Asset Curation |
| **Khushi** | Main Speaker | Presentation Strategy & Narrative Flow |
| **Tanaya** | QA Support | Verification, Cross-Device Testing & Asset QA |

---

<div align="center">

Made with ❤️ for **Smart India Hackathon (SIH 2026)**  
*Preserving India's Living History Through Modern Technology.*

</div>
