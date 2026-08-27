import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ModelMaterials {
  whiteMarble: THREE.MeshStandardMaterial;
  pinkMarble: THREE.MeshStandardMaterial;
  sandstone: THREE.MeshStandardMaterial;
  redSandstone: THREE.MeshStandardMaterial;
  brass: THREE.MeshStandardMaterial;
  water: THREE.MeshStandardMaterial;
  garden: THREE.MeshStandardMaterial;
  pathMarble: THREE.MeshStandardMaterial;
}

// ─── Minaret Subcomponent (Declared outside render for React 19 / R3F optimization) ───

interface MinaretProps {
  position: [number, number, number];
  materials: ModelMaterials;
}

const Minaret: React.FC<MinaretProps> = ({ position, materials }) => (
  <group position={position}>
    {/* Base octagonal pedestal */}
    <mesh position={[0, 0.15, 0]}>
      <cylinderGeometry args={[0.25, 0.3, 0.3, 8]} />
      <primitive object={materials.sandstone} attach="material" />
    </mesh>
    {/* Main shaft */}
    <mesh position={[0, 1.35, 0]}>
      <cylinderGeometry args={[0.16, 0.22, 2.4, 16]} />
      <primitive object={materials.whiteMarble} attach="material" />
    </mesh>
    {/* Balcony rings */}
    {[0.9, 1.6, 2.2].map((y, i) => (
      <mesh key={i} position={[0, y, 0]}>
        <torusGeometry args={[0.22, 0.03, 8, 16]} />
        <primitive object={materials.pinkMarble} attach="material" />
      </mesh>
    ))}
    {/* Top chattri dome */}
    <mesh position={[0, 2.75, 0]}>
      <sphereGeometry args={[0.16, 16, 16]} />
      <primitive object={materials.whiteMarble} attach="material" />
    </mesh>
    {/* Mini finial */}
    <mesh position={[0, 3.0, 0]}>
      <cylinderGeometry args={[0.015, 0.04, 0.25, 8]} />
      <primitive object={materials.brass} attach="material" />
    </mesh>
  </group>
);

// ─── Chattri Subcomponent (Decorative Rooftop Pavilions) ───

interface ChattriProps {
  position: [number, number, number];
  scale?: number;
  materials: ModelMaterials;
}

const Chattri: React.FC<ChattriProps> = ({ position, scale = 1, materials }) => (
  <group position={position} scale={scale}>
    {/* Pillars */}
    {[[-0.08, 0, -0.08], [0.08, 0, -0.08], [-0.08, 0, 0.08], [0.08, 0, 0.08]].map(([x, , z], i) => (
      <mesh key={i} position={[x, 0.12, z]}>
        <cylinderGeometry args={[0.015, 0.015, 0.24, 6]} />
        <primitive object={materials.whiteMarble} attach="material" />
      </mesh>
    ))}
    {/* Dome */}
    <mesh position={[0, 0.3, 0]}>
      <sphereGeometry args={[0.1, 12, 12]} />
      <primitive object={materials.whiteMarble} attach="material" />
    </mesh>
    {/* Finial */}
    <mesh position={[0, 0.42, 0]}>
      <cylinderGeometry args={[0.008, 0.02, 0.12, 6]} />
      <primitive object={materials.brass} attach="material" />
    </mesh>
  </group>
);

/**
 * Procedural Taj Mahal mesh — high-detail architectural representation
 * used as the primary 3D model. Carefully crafted geometry with proper
 * materials simulating Makrana white marble, sandstone, and brass.
 * 
 * Optimized for React 19 Compiler, WebGL 2.0, and WebXR AR frame rates.
 */
export const TajMahalModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Shared materials (memoized across renders for performance)
  const materials: ModelMaterials = useMemo(() => ({
    whiteMarble: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f5f0e8'),
      roughness: 0.22,
      metalness: 0.02,
      envMapIntensity: 0.8,
    }),
    pinkMarble: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ece4da'),
      roughness: 0.35,
      metalness: 0.02,
    }),
    sandstone: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#c4a882'),
      roughness: 0.55,
      metalness: 0.03,
    }),
    redSandstone: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#a0745a'),
      roughness: 0.6,
      metalness: 0.03,
    }),
    brass: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#c9a44c'),
      roughness: 0.2,
      metalness: 0.85,
    }),
    water: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#3a6b78'),
      roughness: 0.05,
      metalness: 0.3,
      transparent: true,
      opacity: 0.7,
    }),
    garden: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2d4a2d'),
      roughness: 0.8,
      metalness: 0.0,
    }),
    pathMarble: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#d6ccc0'),
      roughness: 0.4,
      metalness: 0.02,
    }),
  }), []);

  // Subtle floating micro-oscillation for ambient cinematic effect
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.002;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.0, 0]}>
      {/* ====== GROUND PLANE & CHARBAGH GARDENS ====== */}

      {/* Large ground base */}
      <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <primitive object={materials.garden} attach="material" />
      </mesh>

      {/* Central reflecting pool / water channel */}
      <mesh position={[0, 0.02, 2.8]} receiveShadow>
        <boxGeometry args={[0.4, 0.04, 4.5]} />
        <primitive object={materials.water} attach="material" />
      </mesh>

      {/* Cross water channels */}
      <mesh position={[0, 0.02, 2.0]}>
        <boxGeometry args={[4.0, 0.04, 0.3]} />
        <primitive object={materials.water} attach="material" />
      </mesh>

      {/* Marble walkway paths */}
      <mesh position={[0, 0.03, 2.8]}>
        <boxGeometry args={[0.55, 0.06, 5.0]} />
        <primitive object={materials.pathMarble} attach="material" />
      </mesh>
      <mesh position={[0, 0.03, 2.0]}>
        <boxGeometry args={[4.5, 0.06, 0.45]} />
        <primitive object={materials.pathMarble} attach="material" />
      </mesh>

      {/* Garden beds (4 quadrants) */}
      {[
        [-1.4, 0.01, 3.5],
        [1.4, 0.01, 3.5],
        [-1.4, 0.01, 1.0],
        [1.4, 0.01, 1.0],
      ].map(([x, y, z], i) => (
        <mesh key={`garden-${i}`} position={[x, y, z]}>
          <boxGeometry args={[2.0, 0.02, 2.0]} />
          <primitive object={materials.garden} attach="material" />
        </mesh>
      ))}

      {/* ====== MAIN PLATFORM / PLINTH ====== */}

      {/* Raised platform base */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.5, 0.4, 5.5]} />
        <primitive object={materials.sandstone} attach="material" />
      </mesh>

      {/* Upper marble plinth */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.8, 0.2, 4.8]} />
        <primitive object={materials.pinkMarble} attach="material" />
      </mesh>

      {/* ====== MAIN MAUSOLEUM BODY ====== */}

      {/* Central octagonal base */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[1.8, 1.9, 1.2, 8]} />
        <primitive object={materials.whiteMarble} attach="material" />
      </mesh>

      {/* Four pishtaq arched facades */}
      {[
        [0, 1.3, 1.95, 0],              // Front
        [0, 1.3, -1.95, Math.PI],       // Back
        [1.95, 1.3, 0, Math.PI / 2],    // Right
        [-1.95, 1.3, 0, -Math.PI / 2],  // Left
      ].map(([x, y, z, ry], i) => (
        <group key={`pishtaq-${i}`} position={[x, y, z]} rotation={[0, ry, 0]}>
          {/* Pishtaq frame */}
          <mesh castShadow>
            <boxGeometry args={[1.6, 1.6, 0.15]} />
            <primitive object={materials.whiteMarble} attach="material" />
          </mesh>
          {/* Arch recess (darker) */}
          <mesh position={[0, 0.1, 0.06]}>
            <boxGeometry args={[0.9, 1.3, 0.08]} />
            <primitive object={materials.pinkMarble} attach="material" />
          </mesh>
        </group>
      ))}

      {/* ====== CENTRAL DOME ====== */}

      {/* Drum (cylindrical base for dome) */}
      <mesh position={[0, 2.1, 0]} castShadow>
        <cylinderGeometry args={[1.1, 1.2, 0.5, 24]} />
        <primitive object={materials.whiteMarble} attach="material" />
      </mesh>

      {/* Main onion dome */}
      <mesh position={[0, 3.0, 0]} castShadow>
        <sphereGeometry args={[1.05, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
        <primitive object={materials.whiteMarble} attach="material" />
      </mesh>

      {/* Dome peak cap */}
      <mesh position={[0, 3.55, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <primitive object={materials.whiteMarble} attach="material" />
      </mesh>

      {/* Gilded lotus finial */}
      <mesh position={[0, 3.95, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.07, 0.6, 12]} />
        <primitive object={materials.brass} attach="material" />
      </mesh>

      {/* Finial crescent */}
      <mesh position={[0, 4.3, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <primitive object={materials.brass} attach="material" />
      </mesh>

      {/* ====== DECORATIVE CHATTRIS (rooftop pavilions) ====== */}
      {[
        [-1.3, 2.3, -1.3],
        [1.3, 2.3, -1.3],
        [-1.3, 2.3, 1.3],
        [1.3, 2.3, 1.3],
      ].map(([x, y, z], i) => (
        <Chattri key={`chattri-main-${i}`} position={[x, y, z]} scale={1.2} materials={materials} />
      ))}

      {/* Mid-level chattris */}
      {[
        [-1.6, 1.9, 0],
        [1.6, 1.9, 0],
        [0, 1.9, -1.6],
        [0, 1.9, 1.6],
      ].map(([x, y, z], i) => (
        <Chattri key={`chattri-mid-${i}`} position={[x, y, z]} scale={0.9} materials={materials} />
      ))}

      {/* ====== FOUR CORNER MINARETS ====== */}
      <Minaret position={[-2.4, 0.4, -2.4]} materials={materials} />
      <Minaret position={[2.4, 0.4, -2.4]} materials={materials} />
      <Minaret position={[-2.4, 0.4, 2.4]} materials={materials} />
      <Minaret position={[2.4, 0.4, 2.4]} materials={materials} />

      {/* ====== FLANKING BUILDINGS (Mosque & Jawab) ====== */}
      {[-3.5, 3.5].map((x, i) => (
        <group key={`flank-${i}`} position={[x, 0.4, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.5, 0.8, 2.0]} />
            <primitive object={materials.redSandstone} attach="material" />
          </mesh>
          {/* Flanking dome */}
          <mesh position={[0, 0.7, 0]}>
            <sphereGeometry args={[0.4, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            <primitive object={materials.whiteMarble} attach="material" />
          </mesh>
        </group>
      ))}

      {/* ====== GREAT GATE (Darwaza-i Rauza) ====== */}
      <group position={[0, 0.0, 5.5]}>
        <mesh castShadow>
          <boxGeometry args={[3.0, 1.2, 0.6]} />
          <primitive object={materials.redSandstone} attach="material" />
        </mesh>
        {/* Gate arch */}
        <mesh position={[0, 0.1, 0.25]}>
          <boxGeometry args={[0.8, 0.9, 0.15]} />
          <primitive object={materials.pinkMarble} attach="material" />
        </mesh>
        {/* Gate dome */}
        <mesh position={[0, 0.9, 0]}>
          <sphereGeometry args={[0.35, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <primitive object={materials.whiteMarble} attach="material" />
        </mesh>
        {/* Gate finial */}
        <mesh position={[0, 1.28, 0]}>
          <cylinderGeometry args={[0.015, 0.035, 0.2, 8]} />
          <primitive object={materials.brass} attach="material" />
        </mesh>
      </group>
    </group>
  );
};

export default TajMahalModel;
