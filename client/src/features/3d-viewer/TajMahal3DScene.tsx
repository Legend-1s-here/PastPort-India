import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Stars,
  Center,
  PerspectiveCamera,
} from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { TajMahalModel } from './TajMahalModel';

// ─── Animated lighting rig ─────────────────────────────────────────────

const LightingRig: React.FC = () => {
  const mainLightRef = useRef<THREE.DirectionalLight>(null);

  return (
    <>
      {/* Primary Sun — warm morning golden light */}
      <directionalLight
        ref={mainLightRef}
        position={[12, 18, 10]}
        intensity={2.2}
        color="#fff5e0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0004}
      />

      {/* Fill — cool blue from opposite side */}
      <directionalLight position={[-8, 12, -6]} intensity={0.5} color="#b8d4e3" />

      {/* Rim / back light — warm accent highlighting silhouette */}
      <directionalLight position={[0, 8, -14]} intensity={0.6} color="#fcd9a0" />

      {/* Ambient — soft overall fill to prevent harsh shadows */}
      <ambientLight intensity={0.35} color="#e8dfd4" />

      {/* Gentle hemisphere for sky/ground color bleed */}
      <hemisphereLight
        color="#fef3c7"
        groundColor="#2d2621"
        intensity={0.4}
      />
    </>
  );
};

// ─── Ground plane with contact shadows ─────────────────────────────────

const Ground: React.FC = () => {
  return (
    <>
      <ContactShadows
        position={[0, -1.01, 0]}
        opacity={0.4}
        scale={20}
        blur={2.5}
        far={12}
        color="#1a1614"
      />
      {/* Subtle reflective ground plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.02, 0]}
        receiveShadow
      >
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#1a1614"
          roughness={0.95}
          metalness={0.0}
        />
      </mesh>
    </>
  );
};

// ─── Camera reset helper ───────────────────────────────────────────────

const DEFAULT_CAMERA_POS: [number, number, number] = [6, 4.5, 8];
const DEFAULT_TARGET: [number, number, number] = [0, 1.0, 0];

interface CameraControllerProps {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  resetTrigger: number;
}

const CameraController: React.FC<CameraControllerProps> = ({ controlsRef, resetTrigger }) => {
  const { camera } = useThree();

  useEffect(() => {
    if (resetTrigger > 0 && controlsRef.current) {
      camera.position.set(...DEFAULT_CAMERA_POS);
      controlsRef.current.target.set(...DEFAULT_TARGET);
      controlsRef.current.update();
    }
  }, [resetTrigger, camera, controlsRef]);

  return null;
};

// ─── Loading indicator inside the canvas ───────────────────────────────

const CanvasLoader: React.FC = () => {
  return (
    <mesh position={[0, 1.5, 0]}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial color="#c9a44c" wireframe emissive="#c9a44c" emissiveIntensity={0.5} />
    </mesh>
  );
};

// ─── Main 3D Scene Component ───────────────────────────────────────────

export interface TajMahal3DSceneProps {
  /** Incremented to trigger a camera reset */
  resetTrigger?: number;
  /** Height class override */
  heightClass?: string;
  /** Auto-rotate */
  autoRotate?: boolean;
}

export const TajMahal3DScene: React.FC<TajMahal3DSceneProps> = ({
  resetTrigger = 0,
  heightClass = 'h-[500px] sm:h-[600px] lg:h-[700px]',
  autoRotate = true,
}) => {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden bg-charcoal-950`}>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
      >
        <PerspectiveCamera
          makeDefault
          position={DEFAULT_CAMERA_POS}
          fov={40}
          near={0.1}
          far={100}
        />

        <color attach="background" args={['#0c0a09']} />

        {/* Atmospheric fog */}
        <fog attach="fog" args={['#14110f', 20, 55]} />

        {/* Lighting */}
        <LightingRig />

        {/* Starry sky backdrop */}
        <Stars
          radius={60}
          depth={40}
          count={1500}
          factor={3}
          saturation={0.1}
          fade
          speed={0.3}
        />

        {/* Environment map for reflections */}
        <Environment preset="sunset" environmentIntensity={0.3} />

        {/* Model with suspense */}
        <Suspense fallback={<CanvasLoader />}>
          <Center>
            <TajMahalModel />
          </Center>
        </Suspense>

        {/* Ground & shadows */}
        <Ground />

        {/* Camera reset controller */}
        <CameraController controlsRef={controlsRef} resetTrigger={resetTrigger} />

        {/* Orbit Controls */}
        <OrbitControls
          ref={controlsRef}
          target={DEFAULT_TARGET}
          enablePan={true}
          enableDamping={true}
          dampingFactor={0.06}
          minDistance={3}
          maxDistance={22}
          maxPolarAngle={Math.PI / 2 + 0.08}
          minPolarAngle={0.1}
          autoRotate={autoRotate}
          autoRotateSpeed={0.3}
          enableZoom={true}
          zoomSpeed={0.8}
          rotateSpeed={0.6}
          panSpeed={0.5}
          // Touch settings
          touches={{
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN,
          }}
        />
      </Canvas>
    </div>
  );
};

export default TajMahal3DScene;
