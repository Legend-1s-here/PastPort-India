import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface TajMahalModelProps {
  /** When true, the model is inside a parent positioning group and should NOT apply its own offset. */
  embedded?: boolean;
}

export const TajMahalModel: React.FC<TajMahalModelProps> = ({ embedded = false }) => {
  const { scene } = useGLTF('/models/tajmahal.glb');
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.frustumCulled = true;
        if (child.material) {
          child.material.roughness = Math.max(child.material.roughness ?? 1.0, 0.45);
          child.material.metalness = Math.min(child.material.metalness ?? 0.0, 0.05);
          child.material.side = THREE.FrontSide;
          child.material.depthWrite = true;
          child.material.depthTest = true;
        }
      }
    });

    // Auto-center: shift scene so its bottom sits at Y=0
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const bottomY = box.min.y;
    scene.position.set(-center.x, -bottomY, -center.z);
  }, [scene]);

  // When embedded, parent group controls position/scale — we render at origin
  if (embedded) {
    return (
      <group ref={groupRef}>
        <primitive object={scene} />
      </group>
    );
  }

  // Standalone use (e.g. TajMahal3DScene): apply its own offset
  return (
    <group ref={groupRef} position={[0, -0.8, 0]} scale={[1.8, 1.8, 1.8]}>
      <primitive object={scene} />
    </group>
  );
};

useGLTF.preload('/models/tajmahal.glb');

export default TajMahalModel;
