import React, { Suspense, useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { Hotspot } from '@/types/monument';

// ── Real GLB bounds from inspect_glb_geo.mjs ──────────────────────────────────
// Width 1.18 (X: -0.59→0.59) | Height 0.678 (Y: 0→0.678) | Depth 1.20 (Z: -0.60→0.60)
// Model is already centred in X/Z and bottom is at Y=0 in native GLB space.
// ──────────────────────────────────────────────────────────────────────────────

// 3D positions of each hotspot locked directly onto the GLB model surface
const HOTSPOT_3D: Array<[number, number, number]> = [
  [0,      0.58,  0   ],   // 1 – Main Dome tip
  [0.46,   0.48,  0.46],   // 2 – Top of Right Front Minaret pillar
  [0,      0.22,  0.30],   // 3 – Grand Pishtaq main entrance arch facade
  [0,      0.02,  0.55],   // 4 – Charbagh Garden terrace plinth
];

interface ScreenPt { x: number; y: number; visible: boolean }

// ── Inner component: projects 3D hotspot positions to screen pixels ──────────
const HotspotProjector: React.FC<{
  onUpdate: (pts: ScreenPt[]) => void;
}> = ({ onUpdate }) => {
  const { camera, size } = useThree();
  const _v = useRef(new THREE.Vector3());

  useFrame(() => {
    const pts: ScreenPt[] = HOTSPOT_3D.map(([x, y, z]) => {
      _v.current.set(x, y, z);
      _v.current.project(camera);
      // NDC → pixel
      const px = (_v.current.x * 0.5 + 0.5) * size.width;
      const py = (-_v.current.y * 0.5 + 0.5) * size.height;
      // Cull if behind camera
      const visible = _v.current.z < 1;
      return { x: px, y: py, visible };
    });
    onUpdate(pts);
  });

  return null;
};

// ── GLB model mesh ────────────────────────────────────────────────────────────
const GLBModel: React.FC = () => {
  const { scene } = useGLTF('/models/tajmahal.glb');

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
};

// ── Public component ──────────────────────────────────────────────────────────
interface SceneContainerProps {
  hotspots: Hotspot[];
  activeHotspotId: string | null;
  onSelectHotspot: (hotspot: Hotspot) => void;
}

export const SceneContainer: React.FC<SceneContainerProps> = ({
  hotspots,
  activeHotspotId,
  onSelectHotspot,
}) => {
  const [screenPts, setScreenPts] = useState<ScreenPt[]>([]);
  const onUpdate = useCallback((pts: ScreenPt[]) => setScreenPts(pts), []);

  return (
    <div className="relative w-full h-[420px] rounded-xl overflow-hidden bg-charcoal-950">
      {/* ── 3D Canvas ─────────────────────────────────────────────────── */}
      <Canvas
        camera={{ position: [0, 0.30, 2.6], fov: 40 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#0c0a09']} />
        <ambientLight intensity={1.1} color="#f7f1e7" />
        <directionalLight position={[5, 8, 5]}  intensity={1.6} color="#fffbeb" />
        <directionalLight position={[-5, 6, -5]} intensity={0.45} color="#cbb493" />
        <pointLight position={[0, 1.0, 1.0]} intensity={0.6} color="#fef3c7" />

        <Suspense fallback={null}>
          <GLBModel />
        </Suspense>

        {/* Projects 3D positions → screen pixels every frame */}
        <HotspotProjector onUpdate={onUpdate} />

        <OrbitControls
          target={[0, 0.27, 0]}
          enablePan={false}
          minDistance={0.9}
          maxDistance={6.0}
          maxPolarAngle={Math.PI / 2 + 0.05}
          zoomSpeed={0.8}
          rotateSpeed={0.6}
        />
      </Canvas>

      {/* ── 2D Hotspot Overlays — pixel-perfect projected from 3D ─────── */}
      {hotspots.map((spot, idx) => {
        const pt = screenPts[idx];
        if (!pt || !pt.visible) return null;
        const isActive = activeHotspotId === spot.id;
        return (
          <button
            key={spot.id}
            type="button"
            onClick={() => onSelectHotspot(spot)}
            style={{
              position: 'absolute',
              left: pt.x,
              top: pt.y,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'auto',
            }}
            className="group focus:outline-none z-20"
            title={spot.title}
          >
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                  isActive ? 'bg-brass-400 opacity-75' : 'bg-brass-500 opacity-40'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-7 w-7 border-2 ${
                  isActive
                    ? 'bg-brass-500 border-parchment-100 text-charcoal-950 scale-110'
                    : 'bg-charcoal-900/90 border-brass-400 text-brass-300'
                } text-xs font-bold items-center justify-center shadow-lg font-sans transition-transform group-hover:scale-125`}
              >
                {idx + 1}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default SceneContainer;
