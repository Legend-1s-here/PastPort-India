import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import type { Hotspot } from '@/types/monument';

interface SceneContainerProps {
  hotspots: Hotspot[];
  activeHotspotId: string | null;
  onSelectHotspot: (hotspot: Hotspot) => void;
}

/**
 * Procedural architectural placeholder mesh for 3D viewer foundation.
 * This represents the monument structure before final GLB model asset integration in later phases.
 */
const MonumentMesh: React.FC = () => {
  const meshRef = useRef<THREE.Group>(null);

  return (
    <group ref={meshRef} position={[0, -0.5, 0]}>
      {/* Base Plinth */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[4.5, 0.2, 4.5]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Main Arch Base */}
      <mesh position={[0, 1.0, 0]}>
        <boxGeometry args={[2.6, 1.6, 2.6]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Central Onion Dome (Amrud) */}
      <mesh position={[0, 2.3, 0]}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Finial / Spire */}
      <mesh position={[0, 3.4, 0]}>
        <cylinderGeometry args={[0.04, 0.08, 0.8, 16]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* 4 Corner Minarets */}
      {[
        [-1.8, -1.8],
        [1.8, -1.8],
        [-1.8, 1.8],
        [1.8, 1.8],
      ].map(([x, z], idx) => (
        <group key={idx} position={[x, 0.2, z]}>
          <mesh position={[0, 1.1, 0]}>
            <cylinderGeometry args={[0.15, 0.2, 2.2, 16]} />
            <meshStandardMaterial color="#f1f5f9" roughness={0.4} />
          </mesh>
          <mesh position={[0, 2.3, 0]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export const SceneContainer: React.FC<SceneContainerProps> = ({
  hotspots,
  activeHotspotId,
  onSelectHotspot,
}) => {
  return (
    <div className="relative w-full h-[420px] rounded-xl overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Canvas
        camera={{ position: [0, 2.5, 6], fov: 45 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 15, 10]} intensity={1.5} color="#fffbeb" />
        <directionalLight position={[-10, 10, -10]} intensity={0.5} color="#93c5fd" />
        <pointLight position={[0, 4, 0]} intensity={0.8} color="#fef3c7" />

        {/* Monument Geometry */}
        <MonumentMesh />

        {/* Interactive 3D Hotspot Annotations */}
        {hotspots.map((spot, idx) => {
          const isActive = activeHotspotId === spot.id;
          return (
            <group key={spot.id} position={spot.position}>
              <Html center distanceFactor={8}>
                <button
                  type="button"
                  onClick={() => onSelectHotspot(spot)}
                  className="group relative cursor-pointer focus:outline-none transition-transform transform hover:scale-125"
                  title={spot.title}
                >
                  <span className="relative flex h-7 w-7 items-center justify-center">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                        isActive ? 'bg-amber-400 opacity-75' : 'bg-amber-500 opacity-40'
                      }`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-6 w-6 border-2 ${
                        isActive
                          ? 'bg-amber-500 border-white text-slate-950 scale-110'
                          : 'bg-slate-900 border-amber-400 text-amber-300'
                      } text-xs font-bold items-center justify-center shadow-lg`}
                    >
                      {idx + 1}
                    </span>
                  </span>
                </button>
              </Html>
            </group>
          );
        })}

        {/* Orbit Controls with bounded angles */}
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={12}
          maxPolarAngle={Math.PI / 2 + 0.05}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default SceneContainer;
