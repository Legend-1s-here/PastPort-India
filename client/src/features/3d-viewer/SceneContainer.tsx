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
      {/* Base Plinth - Sandstone & Marble */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[4.5, 0.2, 4.5]} />
        <meshStandardMaterial color="#cbb493" roughness={0.5} metalness={0.05} />
      </mesh>

      {/* Main Arch Base - White Marble */}
      <mesh position={[0, 1.0, 0]}>
        <boxGeometry args={[2.6, 1.6, 2.6]} />
        <meshStandardMaterial color="#f7f1e7" roughness={0.3} metalness={0.05} />
      </mesh>

      {/* Central Onion Dome (Amrud) */}
      <mesh position={[0, 2.3, 0]}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial color="#fcf9f2" roughness={0.2} metalness={0.05} />
      </mesh>

      {/* Finial / Spire - Antique Brass */}
      <mesh position={[0, 3.4, 0]}>
        <cylinderGeometry args={[0.04, 0.08, 0.8, 16]} />
        <meshStandardMaterial color="#c9a44c" roughness={0.25} metalness={0.8} />
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
            <meshStandardMaterial color="#ede2cf" roughness={0.4} />
          </mesh>
          <mesh position={[0, 2.3, 0]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#fcf9f2" roughness={0.3} />
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
    <div className="relative w-full h-[420px] rounded-xl overflow-hidden bg-charcoal-950">
      <Canvas
        camera={{ position: [0, 2.5, 6], fov: 45 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#0c0a09']} />
        <ambientLight intensity={0.85} color="#f7f1e7" />
        <directionalLight position={[10, 15, 10]} intensity={1.4} color="#fffbeb" />
        <directionalLight position={[-10, 10, -10]} intensity={0.4} color="#cbb493" />
        <pointLight position={[0, 4, 0]} intensity={0.7} color="#fef3c7" />

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
                        isActive ? 'bg-brass-400 opacity-75' : 'bg-brass-500 opacity-40'
                      }`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-6 w-6 border-2 ${
                        isActive
                          ? 'bg-brass-500 border-parchment-100 text-charcoal-950 scale-110'
                          : 'bg-charcoal-900 border-brass-400 text-brass-300'
                      } text-xs font-bold items-center justify-center shadow-lg font-sans`}
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
