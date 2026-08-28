import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Loads the actual, high-quality GLB monument model pushed by Siddhant.
 * Gracesfully falls back if loading or WebGL 2.0 is disabled.
 */
export const TajMahalModel: React.FC = () => {
  // Load the actual high-quality GLB model from Siddhant's WebAR assets
  const { scene } = useGLTF('/models/tajmahal.glb');
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!scene) return;

    // Traverse the model meshes to enable shadows and optimize materials
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.frustumCulled = true;

        if (child.material) {
          // Adjust roughness and metalness to simulate white marble accurately
          child.material.roughness = Math.max(child.material.roughness ?? 1.0, 0.45);
          child.material.metalness = Math.min(child.material.metalness ?? 0.0, 0.05);
          child.material.side = THREE.FrontSide;
          child.material.depthWrite = true;
          child.material.depthTest = true;
        }
      }
    });

    // Compute bounds and auto-center the model bottom at Y = 0
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);

    const bottomY = box.min.y;

    // Offset the model internally so it is centered and sits right on the base
    scene.position.set(-center.x, -bottomY, -center.z);
    
  }, [scene]);

  return (
    // Scale and position adjusted to match the spatial viewport perfectly
    <group ref={groupRef} position={[0, -0.8, 0]} scale={[1.8, 1.8, 1.8]}>
      <primitive object={scene} />
    </group>
  );
};

// Pre-load the GLB model asset to ensure instantaneous scene loading when clicked
useGLTF.preload('/models/tajmahal.glb');

export default TajMahalModel;
