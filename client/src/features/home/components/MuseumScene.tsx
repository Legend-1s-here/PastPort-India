import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Camera Keyframes — defines the cinematic path through the grand museum
// Progress 0.0 → 1.0 maps smoothly across these keyframes
// ---------------------------------------------------------------------------
interface CameraKeyframe {
  progress: number;
  position: [number, number, number];
  lookAt: [number, number, number];
}

const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  // Scene 1: Wide establishing shot — standing at grand gallery entrance looking down the colonnade
  { progress: 0.0, position: [0, 3.4, 13.5], lookAt: [0, 1.4, 0] },
  // Scene 2a: Moving forward down the vaulted hall — table and artifacts becoming prominent
  { progress: 0.3, position: [0, 2.9, 7.8], lookAt: [0, 1.0, 0] },
  // Scene 2b: Approaching table — book is the dominant focal point with rich lighting
  { progress: 0.55, position: [0, 2.8, 3.4], lookAt: [0, 0.85, 0] },
  // Scene 3a: Camera gracefully rises and tilts down toward the table
  { progress: 0.75, position: [0, 5.2, 1.4], lookAt: [0, 0.85, 0] },
  // Scene 3b: Perfect top-down view — centered directly above the antique codex
  { progress: 1.0, position: [0, 7.2, 0.1], lookAt: [0, 0.85, 0] },
];

function lerpKeyframes(progress: number): { position: THREE.Vector3; lookAt: THREE.Vector3 } {
  const clamped = Math.max(0, Math.min(1, progress));

  let startIdx = 0;
  for (let i = 0; i < CAMERA_KEYFRAMES.length - 1; i++) {
    if (clamped >= CAMERA_KEYFRAMES[i].progress) {
      startIdx = i;
    }
  }

  const endIdx = Math.min(startIdx + 1, CAMERA_KEYFRAMES.length - 1);
  const start = CAMERA_KEYFRAMES[startIdx];
  const end = CAMERA_KEYFRAMES[endIdx];

  const range = end.progress - start.progress;
  const t = range > 0 ? (clamped - start.progress) / range : 0;
  // Smooth cubic ease in-out
  const eased = t * t * (3 - 2 * t);

  const position = new THREE.Vector3().lerpVectors(
    new THREE.Vector3(...start.position),
    new THREE.Vector3(...end.position),
    eased,
  );

  const lookAt = new THREE.Vector3().lerpVectors(
    new THREE.Vector3(...start.lookAt),
    new THREE.Vector3(...end.lookAt),
    eased,
  );

  return { position, lookAt };
}

// ---------------------------------------------------------------------------
// Camera Controller
// ---------------------------------------------------------------------------
function CameraController({ progress }: { progress: number }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 3.4, 13.5));
  const targetLookAt = useRef(new THREE.Vector3(0, 1.4, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 1.4, 0));

  useFrame(() => {
    const { position, lookAt } = lerpKeyframes(progress);
    targetPos.current.copy(position);
    targetLookAt.current.copy(lookAt);

    camera.position.lerp(targetPos.current, 0.08);
    currentLookAt.current.lerp(targetLookAt.current, 0.08);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

// ---------------------------------------------------------------------------
// Mughal Heritage Column with Stepped Plinth, Fluted Ring & Cusped Capital
// ---------------------------------------------------------------------------
interface ColumnProps {
  position: [number, number, number];
}

function HeritageColumn({ position }: ColumnProps) {
  return (
    <group position={position}>
      {/* 1. Multi-tier Stepped Base Plinth */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[1.3, 0.16, 1.3]} />
        <meshStandardMaterial color="#2d241c" roughness={0.75} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[1.05, 0.14, 1.05]} />
        <meshStandardMaterial color="#3a3026" roughness={0.7} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.48, 0.54, 0.16, 16]} />
        <meshStandardMaterial color="#4a3e32" roughness={0.65} metalness={0.2} />
      </mesh>

      {/* 2. Main Octagonal Stone Shaft */}
      <mesh position={[0, 2.9, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.42, 5.0, 12]} />
        <meshStandardMaterial color="#3e3328" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Decorative Brass Belt Rings on Shaft */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.43, 0.43, 0.06, 16]} />
        <meshStandardMaterial color="#c9a44c" roughness={0.35} metalness={0.7} />
      </mesh>
      <mesh position={[0, 4.4, 0]}>
        <cylinderGeometry args={[0.41, 0.41, 0.06, 16]} />
        <meshStandardMaterial color="#c9a44c" roughness={0.35} metalness={0.7} />
      </mesh>

      {/* 3. Flared Lotus Capital */}
      <mesh position={[0, 5.45, 0]}>
        <cylinderGeometry args={[0.56, 0.38, 0.2, 16]} />
        <meshStandardMaterial color="#4d3f32" roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[0, 5.62, 0]}>
        <cylinderGeometry args={[0.7, 0.52, 0.16, 16]} />
        <meshStandardMaterial color="#3a3026" roughness={0.7} metalness={0.15} />
      </mesh>
      <mesh position={[0, 5.78, 0]}>
        <boxGeometry args={[1.2, 0.18, 1.2]} />
        <meshStandardMaterial color="#2d241c" roughness={0.8} metalness={0.1} />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Cusped Mughal Arch Connecting Adjacent Columns
// ---------------------------------------------------------------------------
interface ArchSpanProps {
  start: [number, number, number];
  end: [number, number, number];
}

function ArchSpan({ start, end }: ArchSpanProps) {
  const midX = (start[0] + end[0]) / 2;
  const midZ = (start[2] + end[2]) / 2;
  const length = Math.hypot(end[0] - start[0], end[2] - start[2]);
  const angle = Math.atan2(end[0] - start[0], end[2] - start[2]);

  return (
    <group position={[midX, 5.6, midZ]} rotation={[0, angle, 0]}>
      {/* Arch Horizontal Top Beam */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.6, 0.25, length + 0.3]} />
        <meshStandardMaterial color="#2c2219" roughness={0.8} metalness={0.1} />
      </mesh>
      {/* Gold Trim Line along Arch */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.62, 0.04, length]} />
        <meshStandardMaterial color="#c9a44c" roughness={0.35} metalness={0.7} />
      </mesh>
      {/* Cusped Arch Intrados (Curved hanging segments) */}
      <mesh position={[0, -0.22, 0]}>
        <boxGeometry args={[0.5, 0.2, length * 0.75]} />
        <meshStandardMaterial color="#382e24" roughness={0.7} metalness={0.1} />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Wall Display Alcove with Museum Vitrine & Historical Artifact Silhouette
// ---------------------------------------------------------------------------
interface DisplayAlcoveProps {
  position: [number, number, number];
  rotationY: number;
  artifactType: 'urn' | 'tablet' | 'statue' | 'finial';
}

function DisplayAlcove({ position, rotationY, artifactType }: DisplayAlcoveProps) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Recessed Wall Frame */}
      <mesh position={[0, 2.8, -0.05]}>
        <boxGeometry args={[2.2, 3.4, 0.1]} />
        <meshStandardMaterial color="#1e1812" roughness={0.85} />
      </mesh>

      {/* Gold Inlaid Molding Border */}
      <mesh position={[0, 4.4, 0]}>
        <boxGeometry args={[2.2, 0.06, 0.06]} />
        <meshStandardMaterial color="#c9a44c" roughness={0.4} metalness={0.7} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[2.2, 0.06, 0.06]} />
        <meshStandardMaterial color="#c9a44c" roughness={0.4} metalness={0.7} />
      </mesh>
      <mesh position={[-1.07, 2.8, 0]}>
        <boxGeometry args={[0.06, 3.2, 0.06]} />
        <meshStandardMaterial color="#c9a44c" roughness={0.4} metalness={0.7} />
      </mesh>
      <mesh position={[1.07, 2.8, 0]}>
        <boxGeometry args={[0.06, 3.2, 0.06]} />
        <meshStandardMaterial color="#c9a44c" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Museum Display Pedestal */}
      <mesh position={[0, 0.7, 0.5]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 1.4, 0.6]} />
        <meshStandardMaterial color="#261e16" roughness={0.6} metalness={0.15} />
      </mesh>

      {/* Glass Showcase Cover */}
      <mesh position={[0, 1.85, 0.5]}>
        <boxGeometry args={[0.74, 0.9, 0.54]} />
        <meshStandardMaterial
          color="#d5e2e8"
          roughness={0.1}
          metalness={0.1}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Historical Artifact Inside Glass */}
      <group position={[0, 1.65, 0.5]}>
        {artifactType === 'urn' && (
          <>
            <mesh position={[0, 0, 0]} castShadow>
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshStandardMaterial color="#b89345" roughness={0.3} metalness={0.8} />
            </mesh>
            <mesh position={[0, 0.16, 0]}>
              <cylinderGeometry args={[0.06, 0.1, 0.12, 12]} />
              <meshStandardMaterial color="#b89345" roughness={0.3} metalness={0.8} />
            </mesh>
          </>
        )}

        {artifactType === 'tablet' && (
          <mesh rotation={[0.1, 0, 0]} castShadow>
            <boxGeometry args={[0.26, 0.35, 0.04]} />
            <meshStandardMaterial color="#8c7860" roughness={0.85} metalness={0.05} />
          </mesh>
        )}

        {artifactType === 'statue' && (
          <>
            <mesh position={[0, -0.05, 0]} castShadow>
              <cylinderGeometry args={[0.07, 0.12, 0.28, 12]} />
              <meshStandardMaterial color="#a6843c" roughness={0.4} metalness={0.7} />
            </mesh>
            <mesh position={[0, 0.14, 0]}>
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshStandardMaterial color="#a6843c" roughness={0.4} metalness={0.7} />
            </mesh>
          </>
        )}

        {artifactType === 'finial' && (
          <>
            <mesh position={[0, -0.08, 0]} castShadow>
              <cylinderGeometry args={[0.04, 0.1, 0.15, 12]} />
              <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.85} />
            </mesh>
            <mesh position={[0, 0.1, 0]}>
              <octahedronGeometry args={[0.12, 0]} />
              <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.85} />
            </mesh>
          </>
        )}
      </group>

      {/* Dedicated Soft Vitrine Spot Downlight */}
      <pointLight
        position={[0, 3.2, 0.6]}
        intensity={6}
        color="#ffe6b0"
        distance={4.5}
        decay={2}
      />
    </group>
  );
}

// ---------------------------------------------------------------------------
// Ornate Gilded Wall Painting with Dedicated Gallery Spotlight
// ---------------------------------------------------------------------------
interface GildedPaintingProps {
  position: [number, number, number];
  rotationY: number;
  subject: 'portrait' | 'court' | 'landscape' | 'apsara';
}

function GildedPainting({ position, rotationY, subject }: GildedPaintingProps) {
  // Theme colors for the classical oil painting canvas
  const canvasColors = useMemo(() => {
    switch (subject) {
      case 'portrait':
        return { base: '#2b1b12', highlight: '#9c6b38', accent: '#d4a359' };
      case 'court':
        return { base: '#1a1d24', highlight: '#7a5a32', accent: '#b88b4a' };
      case 'landscape':
        return { base: '#192017', highlight: '#6e5e3a', accent: '#c29b4e' };
      case 'apsara':
      default:
        return { base: '#24151a', highlight: '#945435', accent: '#d69f56' };
    }
  }, [subject]);

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* 1. Heavy Carved Dark Wood Backing */}
      <mesh position={[0, 2.8, -0.04]} castShadow>
        <boxGeometry args={[1.9, 2.7, 0.08]} />
        <meshStandardMaterial color="#1a120b" roughness={0.7} />
      </mesh>

      {/* 2. Outer Ornate Gold Frame Molding */}
      <mesh position={[0, 2.8, 0]}>
        <boxGeometry args={[2.0, 2.8, 0.06]} />
        <meshStandardMaterial color="#c9a44c" roughness={0.25} metalness={0.85} />
      </mesh>
      {/* Recessed Frame Cavity */}
      <mesh position={[0, 2.8, 0.02]}>
        <boxGeometry args={[1.72, 2.52, 0.04]} />
        <meshStandardMaterial color="#120c08" roughness={0.9} />
      </mesh>
      {/* Inner Beveled Gold Filigree Trim */}
      <mesh position={[0, 2.8, 0.03]}>
        <boxGeometry args={[1.68, 2.48, 0.03]} />
        <meshStandardMaterial color="#e5c875" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* 3. Textured Oil Painting Canvas */}
      <mesh position={[0, 2.8, 0.04]}>
        <planeGeometry args={[1.56, 2.36]} />
        <meshStandardMaterial
          color={canvasColors.base}
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>
      {/* Painted Figures Silhouette Layers */}
      <mesh position={[0, 2.9, 0.042]}>
        <planeGeometry args={[1.1, 1.6]} />
        <meshStandardMaterial
          color={canvasColors.highlight}
          roughness={0.65}
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh position={[0, 3.1, 0.044]}>
        <circleGeometry args={[0.35, 24]} />
        <meshStandardMaterial color={canvasColors.accent} roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, 2.5, 0.044]}>
        <boxGeometry args={[0.7, 0.8, 0.001]} />
        <meshStandardMaterial color="#4a321d" roughness={0.7} />
      </mesh>

      {/* 4. Overhead Brass Picture Light Fixture */}
      <mesh position={[0, 4.35, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.35, 8]} />
        <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.85} />
      </mesh>
      <mesh position={[0, 4.35, 0.38]}>
        <boxGeometry args={[0.7, 0.05, 0.08]} />
        <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.85} />
      </mesh>

      {/* Dedicated Downward Spotlight illuminating the Painting */}
      <spotLight
        position={[0, 4.3, 0.35]}
        target-position={[0, 2.8, 0]}
        angle={0.55}
        penumbra={0.6}
        intensity={18}
        color="#ffe8bd"
        distance={6}
        decay={2}
      />
    </group>
  );
}

// ---------------------------------------------------------------------------
// Hanging Mughal Brass Lantern with Warm Inner Light
// ---------------------------------------------------------------------------
function HangingLantern({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Suspension Chain */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.8, 8]} />
        <meshStandardMaterial color="#1a140f" roughness={0.8} metalness={0.8} />
      </mesh>

      {/* Brass Lantern Body */}
      <mesh position={[0, -0.1, 0]}>
        <octahedronGeometry args={[0.24, 0]} />
        <meshStandardMaterial
          color="#c9a44c"
          roughness={0.3}
          metalness={0.85}
          wireframe={false}
        />
      </mesh>

      {/* Glowing Inner Core */}
      <mesh position={[0, -0.1, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshBasicMaterial color="#ffe8b0" />
      </mesh>

      {/* Radiant Amber Point Light */}
      <pointLight position={[0, -0.1, 0]} intensity={9} color="#ffbe6b" distance={8} decay={2} />
    </group>
  );
}

// ---------------------------------------------------------------------------
// Realistic 3D Antique Leather-Bound Codex Model
// ---------------------------------------------------------------------------
function AntiqueBook3D() {
  return (
    <group position={[0, 0.94, 0]}>
      {/* 1. Main Leather Cover Boards (Top & Bottom Cover) */}
      <mesh position={[0, 0.01, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.08, 0.025, 0.78]} />
        <meshStandardMaterial color="#1a0f0a" roughness={0.35} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.125, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.08, 0.025, 0.78]} />
        <meshStandardMaterial color="#1a0f0a" roughness={0.35} metalness={0.1} />
      </mesh>

      {/* 2. Rounded Leather Spine & Raised Horizontal Ribs */}
      <mesh position={[-0.54, 0.067, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.78, 16, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#160c08" roughness={0.4} metalness={0.15} />
      </mesh>
      {/* 5 Raised Spine Ribs (Bands) */}
      {[-0.30, -0.15, 0, 0.15, 0.30].map((zPos, idx) => (
        <mesh key={idx} position={[-0.55, 0.067, zPos]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.064, 0.012, 12, 16, Math.PI]} />
          <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.8} />
        </mesh>
      ))}

      {/* 3. Stacked Parchment Paper Block (Gilded Edges) */}
      <mesh position={[0.02, 0.067, 0]} castShadow>
        <boxGeometry args={[1.0, 0.09, 0.72]} />
        <meshStandardMaterial color="#e8d8b8" roughness={0.7} metalness={0.1} />
      </mesh>
      <mesh position={[0.521, 0.067, 0]}>
        <boxGeometry args={[0.004, 0.088, 0.71]} />
        <meshStandardMaterial color="#c9a44c" roughness={0.4} metalness={0.7} />
      </mesh>
      <mesh position={[0.02, 0.067, 0.361]}>
        <boxGeometry args={[0.99, 0.088, 0.004]} />
        <meshStandardMaterial color="#c9a44c" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* 4. Ornate Gold Filigree Corner Clasps */}
      {[
        [-0.48, 0.138, -0.34],
        [0.48, 0.138, -0.34],
        [-0.48, 0.138, 0.34],
        [0.48, 0.138, 0.34],
      ].map((pos, idx) => (
        <group key={idx} position={pos as [number, number, number]}>
          <mesh>
            <boxGeometry args={[0.12, 0.006, 0.12]} />
            <meshStandardMaterial color="#e5c875" roughness={0.25} metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.004, 0]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color="#c9a44c" roughness={0.2} metalness={0.95} />
          </mesh>
        </group>
      ))}

      {/* 5. Embossed Gold Frame & Center Royal Medallion on Cover */}
      <mesh position={[0.02, 0.138, 0]}>
        <boxGeometry args={[0.92, 0.003, 0.62]} />
        <meshStandardMaterial color="#c9a44c" roughness={0.25} metalness={0.85} />
      </mesh>
      <mesh position={[0.02, 0.140, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.004, 16]} />
        <meshStandardMaterial color="#e5c875" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[0.02, 0.143, 0]}>
        <octahedronGeometry args={[0.1, 0]} />
        <meshStandardMaterial color="#d4af37" roughness={0.15} metalness={0.95} />
      </mesh>

      {/* 6. Crimson Silk Bookmark Ribbon Draped onto the Table */}
      <mesh position={[0.1, 0.07, 0.37]} rotation={[0.2, 0.1, -0.1]}>
        <boxGeometry args={[0.08, 0.004, 0.12]} />
        <meshStandardMaterial color="#990000" roughness={0.3} />
      </mesh>
      <mesh position={[0.12, 0.0, 0.44]} rotation={[0.9, 0.05, 0.0]}>
        <boxGeometry args={[0.08, 0.003, 0.22]} />
        <meshStandardMaterial color="#990000" roughness={0.3} />
      </mesh>
      <mesh position={[0.12, -0.11, 0.52]}>
        <coneGeometry args={[0.025, 0.06, 12]} />
        <meshStandardMaterial color="#e5c875" roughness={0.3} metalness={0.85} />
      </mesh>

      {/* 7. Antique Brass Magnifying Glass on Tabletop */}
      <group position={[-0.6, 0.01, 0.2]} rotation={[0.1, -0.4, 0]}>
        {/* Brass Ring */}
        <mesh castShadow>
          <torusGeometry args={[0.12, 0.015, 12, 24]} />
          <meshStandardMaterial color="#c9a44c" roughness={0.25} metalness={0.9} />
        </mesh>
        {/* Glass Lens */}
        <mesh>
          <cylinderGeometry args={[0.11, 0.11, 0.005, 24]} />
          <meshStandardMaterial color="#e0f2fe" roughness={0.1} metalness={0.1} transparent opacity={0.35} />
        </mesh>
        {/* Carved Wood/Brass Handle */}
        <mesh position={[-0.22, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.018, 0.024, 0.22, 12]} />
          <meshStandardMaterial color="#2c1e13" roughness={0.5} />
        </mesh>
      </group>

      {/* 8. Carved Brass Incense Censer (Dhoopdani) with Glowing Ember */}
      <group position={[0.62, 0.01, -0.22]}>
        {/* Base & Bowl */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.09, 0.04, 16]} />
          <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.85} />
        </mesh>
        <mesh position={[0, 0.08, 0]} castShadow>
          <sphereGeometry args={[0.1, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#b89345" roughness={0.35} metalness={0.85} />
        </mesh>
        {/* Glowing Soft Incense Ember */}
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color="#ff9933" />
        </mesh>
        <pointLight position={[0, 0.12, 0]} intensity={3} color="#ff8822" distance={2.5} decay={2} />
      </group>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Grand Central Table & Surrounding Museum Exhibition Zone
// ---------------------------------------------------------------------------
function CentralTable() {
  return (
    <group position={[0, 0, 0]}>
      {/* 1. Low Plinth Dais */}
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <boxGeometry args={[3.4, 0.08, 2.5]} />
        <meshStandardMaterial color="#140d09" roughness={0.8} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.081, 0]}>
        <boxGeometry args={[3.42, 0.01, 2.52]} />
        <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* 2. Dark Polished Mahogany Table Top */}
      <mesh position={[0, 0.84, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.09, 1.65]} />
        <meshStandardMaterial color="#1c120c" roughness={0.3} metalness={0.15} />
      </mesh>

      {/* Gold Corner Bracket Filigree Caps (4 Corners of Table Top) */}
      {[
        [-1.23, 0.886, -0.81],
        [1.23, 0.886, -0.81],
        [-1.23, 0.886, 0.81],
        [1.23, 0.886, 0.81],
      ].map((pos, idx) => (
        <group key={idx} position={pos as [number, number, number]}>
          <mesh>
            <boxGeometry args={[0.14, 0.02, 0.14]} />
            <meshStandardMaterial color="#e5c875" roughness={0.25} metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Inlaid Gold Filigree Table Border */}
      <mesh position={[0, 0.886, 0]}>
        <boxGeometry args={[2.4, 0.002, 1.55]} />
        <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.75} />
      </mesh>

      {/* Dark Velvet Display Runner */}
      <mesh position={[0, 0.888, 0]}>
        <boxGeometry args={[1.6, 0.002, 1.15]} />
        <meshStandardMaterial color="#120c09" roughness={0.95} />
      </mesh>

      {/* 3. Table Legs with Carved Brass Caps */}
      {[
        [-1.08, 0.44, -0.68],
        [1.08, 0.44, -0.68],
        [-1.08, 0.44, 0.68],
        [1.08, 0.44, 0.68],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.07, 0.09, 0.76, 12]} />
            <meshStandardMaterial color="#180e08" roughness={0.5} metalness={0.15} />
          </mesh>
          <mesh position={[0, -0.34, 0]}>
            <boxGeometry args={[0.18, 0.08, 0.18]} />
            <meshStandardMaterial color="#c9a44c" roughness={0.35} metalness={0.7} />
          </mesh>
        </group>
      ))}

      {/* Under-table Arched Apron Trim */}
      <mesh position={[0, 0.76, -0.68]}>
        <boxGeometry args={[2.0, 0.08, 0.04]} />
        <meshStandardMaterial color="#1c120c" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.76, 0.68]}>
        <boxGeometry args={[2.0, 0.08, 0.04]} />
        <meshStandardMaterial color="#1c120c" roughness={0.6} />
      </mesh>

      {/* 4. Detailed Antique 3D Codex Model & Accessories Placed Centrally */}
      <AntiqueBook3D />

      {/* 5. Angled Brass Exhibition Plaque Stand (Front of Table) */}
      <group position={[0, 0.45, 1.05]} rotation={[-0.35, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.32, 0.02]} />
          <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.85} />
        </mesh>
        <mesh position={[0, 0, 0.012]}>
          <planeGeometry args={[0.64, 0.26]} />
          <meshStandardMaterial color="#1c1611" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0, 0.014]}>
          <planeGeometry args={[0.54, 0.16]} />
          <meshStandardMaterial color="#e5c875" roughness={0.3} metalness={0.7} />
        </mesh>
      </group>

      {/* 6. Museum Brass Stanchion Barriers & Crimson Velvet Ropes */}
      {[
        [-1.8, 0, -1.3],
        [1.8, 0, -1.3],
        [-1.8, 0, 1.3],
        [1.8, 0, 1.3],
      ].map((pos, idx) => (
        <group key={idx} position={pos as [number, number, number]}>
          {/* Stanchion Base */}
          <mesh position={[0, 0.03, 0]}>
            <cylinderGeometry args={[0.18, 0.22, 0.06, 16]} />
            <meshStandardMaterial color="#c9a44c" roughness={0.25} metalness={0.9} />
          </mesh>
          {/* Brass Post */}
          <mesh position={[0, 0.52, 0]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 1.0, 12]} />
            <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Decorative Post Top Ball */}
          <mesh position={[0, 1.05, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="#e5c875" roughness={0.15} metalness={0.95} />
          </mesh>
        </group>
      ))}

      {/* Velvet Ropes between Stanchions (Front & Back Barriers) */}
      <mesh position={[0, 0.88, 1.3]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 3.4, 12]} />
        <meshStandardMaterial color="#800020" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.88, -1.3]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 3.4, 12]} />
        <meshStandardMaterial color="#800020" roughness={0.3} />
      </mesh>

      {/* 7. Flanking Free-Standing Vitrine Pedestals (Left & Right of Dais) */}
      {/* Left Pedestal: Chola Bronze Relic */}
      <group position={[-2.4, 0, 0]}>
        <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.7, 1.3, 0.7]} />
          <meshStandardMaterial color="#261e16" roughness={0.5} metalness={0.15} />
        </mesh>
        <mesh position={[0, 1.6, 0]}>
          <boxGeometry args={[0.64, 0.6, 0.64]} />
          <meshStandardMaterial color="#d5e2e8" roughness={0.1} metalness={0.1} transparent opacity={0.25} />
        </mesh>
        {/* Chola Bronze Idol */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.12, 0.4, 12]} />
          <meshStandardMaterial color="#a6843c" roughness={0.35} metalness={0.8} />
        </mesh>
        <mesh position={[0, 1.76, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#a6843c" roughness={0.35} metalness={0.8} />
        </mesh>
        <spotLight position={[0, 3.0, 0.2]} target-position={[0, 1.5, 0]} angle={0.4} intensity={12} color="#ffe0b0" distance={5} decay={2} />
      </group>

      {/* Right Pedestal: Ashoka Lion Capital Emblem Relic */}
      <group position={[2.4, 0, 0]}>
        <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.7, 1.3, 0.7]} />
          <meshStandardMaterial color="#261e16" roughness={0.5} metalness={0.15} />
        </mesh>
        <mesh position={[0, 1.6, 0]}>
          <boxGeometry args={[0.64, 0.6, 0.64]} />
          <meshStandardMaterial color="#d5e2e8" roughness={0.1} metalness={0.1} transparent opacity={0.25} />
        </mesh>
        {/* Ashoka Lion Capital Golden Relic */}
        <mesh position={[0, 1.45, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.12, 0.15, 16]} />
          <meshStandardMaterial color="#d4af37" roughness={0.25} metalness={0.85} />
        </mesh>
        <mesh position={[0, 1.65, 0]} castShadow>
          <boxGeometry args={[0.22, 0.25, 0.22]} />
          <meshStandardMaterial color="#e5c875" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[0, 1.82, 0]}>
          <octahedronGeometry args={[0.08, 0]} />
          <meshStandardMaterial color="#ffd700" roughness={0.15} metalness={0.95} />
        </mesh>
        <spotLight position={[0, 3.0, 0.2]} target-position={[0, 1.5, 0]} angle={0.4} intensity={12} color="#ffe0b0" distance={5} decay={2} />
      </group>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Museum Gallery Environment (Colonnade, Arches, Backwall Portals, Floor)
// ---------------------------------------------------------------------------
interface GrandGalleryProps {
  isMobile: boolean;
}

function GrandGallery({ isMobile }: GrandGalleryProps) {
  const columnSpacing = 4.2;
  const colCount = isMobile ? 3 : 4;

  const columnPairs = useMemo(() => {
    const pairs: Array<{ left: [number, number, number]; right: [number, number, number] }> = [];
    for (let i = 0; i < colCount; i++) {
      const z = -columnSpacing * i + 4.2;
      pairs.push({
        left: [-3.8, 0, z],
        right: [3.8, 0, z],
      });
    }
    return pairs;
  }, [colCount]);

  return (
    <group>
      {/* 1. Polished Marble Gallery Floor with Subtle Sheen */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[32, 44]} />
        <meshStandardMaterial
          color="#14100c"
          roughness={0.28}
          metalness={0.22}
        />
      </mesh>

      {/* Central Aisle Carpet / Marble Inlay Pathway */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} receiveShadow>
        <planeGeometry args={[4.4, 40]} />
        <meshStandardMaterial
          color="#1c1611"
          roughness={0.45}
          metalness={0.15}
        />
      </mesh>
      {/* Gold Inlay Borders along Central Walkway */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2.2, 0.008, 0]}>
        <planeGeometry args={[0.08, 40]} />
        <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2.2, 0.008, 0]}>
        <planeGeometry args={[0.08, 40]} />
        <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* 2. Coffered Timber Ceiling with Beams */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6.2, 0]}>
        <planeGeometry args={[32, 44]} />
        <meshStandardMaterial color="#120e0a" roughness={0.9} />
      </mesh>
      {/* Transverse Ceiling Beams */}
      {[-8, -4, 0, 4, 8].map((z, idx) => (
        <mesh key={idx} position={[0, 6.05, z]}>
          <boxGeometry args={[18, 0.3, 0.4]} />
          <meshStandardMaterial color="#221810" roughness={0.75} />
        </mesh>
      ))}

      {/* 3. Colonnade of Columns & Arches */}
      {columnPairs.map((pair, idx) => (
        <React.Fragment key={idx}>
          <HeritageColumn position={pair.left} />
          <HeritageColumn position={pair.right} />

          {/* Transverse Arch spanning Left & Right columns across the ceiling */}
          <ArchSpan start={pair.left} end={pair.right} />

          {/* Longitudinal Arch connecting to next column pair in the row */}
          {idx < columnPairs.length - 1 && (
            <>
              <ArchSpan start={pair.left} end={columnPairs[idx + 1].left} />
              <ArchSpan start={pair.right} end={columnPairs[idx + 1].right} />
            </>
          )}
        </React.Fragment>
      ))}

      {/* 4. Hanging Lanterns along the Center Aisle */}
      <HangingLantern position={[0, 5.0, 4.2]} />
      <HangingLantern position={[0, 5.0, 0]} />
      <HangingLantern position={[0, 5.0, -4.2]} />

      {/* 5. Side Wall Gallery Exhibits (Illuminated Paintings & Pedestal Vitrines) */}
      {/* Left Wall Corridor */}
      <GildedPainting position={[-5.8, 0, 4.2]} rotationY={Math.PI / 2} subject="portrait" />
      <DisplayAlcove position={[-5.8, 0, 0]} rotationY={Math.PI / 2} artifactType="statue" />
      <GildedPainting position={[-5.8, 0, -4.2]} rotationY={Math.PI / 2} subject="apsara" />
      <GildedPainting position={[-5.8, 0, -8.4]} rotationY={Math.PI / 2} subject="court" />

      {/* Right Wall Corridor */}
      <GildedPainting position={[5.8, 0, 4.2]} rotationY={-Math.PI / 2} subject="court" />
      <DisplayAlcove position={[5.8, 0, 0]} rotationY={-Math.PI / 2} artifactType="urn" />
      <GildedPainting position={[5.8, 0, -4.2]} rotationY={-Math.PI / 2} subject="landscape" />
      <DisplayAlcove position={[5.8, 0, -8.4]} rotationY={-Math.PI / 2} artifactType="tablet" />

      {/* Outer Side Walls */}
      <mesh position={[-6.2, 3.1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[44, 6.2]} />
        <meshStandardMaterial color="#16120e" roughness={0.9} />
      </mesh>
      <mesh position={[6.2, 3.1, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[44, 6.2]} />
        <meshStandardMaterial color="#16120e" roughness={0.9} />
      </mesh>

      {/* 6. Grand Back Wall with High-Quality Indian Heritage Artifacts */}
      <group position={[0, 0, -12]}>
        {/* Solid Back Wall */}
        <mesh position={[0, 3.1, 0]}>
          <planeGeometry args={[24, 6.2]} />
          <meshStandardMaterial color="#18130f" roughness={0.88} />
        </mesh>

        {/* Central Monumental Archway Portal */}
        <mesh position={[0, 3.2, 0.08]}>
          <boxGeometry args={[4.2, 5.0, 0.15]} />
          <meshStandardMaterial color="#0d0a08" roughness={0.95} />
        </mesh>
        {/* Arch Gold Filigree Border */}
        <mesh position={[0, 5.75, 0.12]}>
          <boxGeometry args={[4.4, 0.1, 0.1]} />
          <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.85} />
        </mesh>
        <mesh position={[-2.15, 3.2, 0.12]}>
          <boxGeometry args={[0.1, 5.0, 0.1]} />
          <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.85} />
        </mesh>
        <mesh position={[2.15, 3.2, 0.12]}>
          <boxGeometry args={[0.1, 5.0, 0.1]} />
          <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.85} />
        </mesh>

        {/* ── BACK ASSET 1: Golden Temple Shrine Sanctum (Center Arch Background) ── */}
        <group position={[0, 0, 0.4]}>
          {/* Stepped Marble & Gold Dais */}
          <mesh position={[0, 0.2, 0]} receiveShadow>
            <boxGeometry args={[2.6, 0.4, 1.8]} />
            <meshStandardMaterial color="#261e16" roughness={0.5} metalness={0.2} />
          </mesh>
          <mesh position={[0, 0.41, 0]}>
            <boxGeometry args={[2.62, 0.02, 1.82]} />
            <meshStandardMaterial color="#e5c875" roughness={0.25} metalness={0.9} />
          </mesh>

          {/* 4 Carved Golden Shrine Pillars */}
          {[
            [-1.0, 1.5, -0.6],
            [1.0, 1.5, -0.6],
            [-1.0, 1.5, 0.6],
            [1.0, 1.5, 0.6],
          ].map((p, idx) => (
            <mesh key={idx} position={p as [number, number, number]} castShadow>
              <cylinderGeometry args={[0.08, 0.1, 2.2, 16]} />
              <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.9} />
            </mesh>
          ))}

          {/* Golden Cusped Arch Canopy */}
          <mesh position={[0, 2.7, 0]}>
            <boxGeometry args={[2.3, 0.2, 1.4]} />
            <meshStandardMaterial color="#c9a44c" roughness={0.25} metalness={0.85} />
          </mesh>

          {/* Tiered Golden Temple Shikhara Spires (Dome & Kalash) */}
          <mesh position={[0, 3.3, 0]} castShadow>
            <coneGeometry args={[0.75, 1.0, 16]} />
            <meshStandardMaterial color="#e5c875" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0, 3.95, 0]}>
            <octahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial color="#ffd700" roughness={0.15} metalness={0.95} />
          </mesh>
          <mesh position={[0, 4.25, 0]}>
            <cylinderGeometry args={[0.02, 0.04, 0.4, 12]} />
            <meshStandardMaterial color="#ffd700" roughness={0.15} metalness={0.95} />
          </mesh>

          {/* Radiant Sacred Gold Relic / Stupa inside Shrine */}
          <mesh position={[0, 1.2, 0]} castShadow>
            <sphereGeometry args={[0.35, 24, 24]} />
            <meshStandardMaterial color="#ffe58f" roughness={0.15} metalness={0.95} />
          </mesh>
          <mesh position={[0, 1.6, 0]}>
            <cylinderGeometry args={[0.1, 0.22, 0.4, 16]} />
            <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.9} />
          </mesh>

          {/* Intense Golden Sanctum Spotlight */}
          <spotLight
            position={[0, 4.5, 0.8]}
            target-position={[0, 1.2, 0]}
            angle={0.6}
            penumbra={0.5}
            intensity={35}
            color="#ffdf88"
            distance={14}
            decay={2}
          />
        </group>

        {/* ── BACK ASSET 2: Bronze Nataraja Shrine (Left Back Niche) ── */}
        <group position={[-4.2, 0, 0.3]}>
          {/* Niche Alcove Frame */}
          <mesh position={[0, 2.7, -0.05]}>
            <boxGeometry args={[2.8, 4.6, 0.1]} />
            <meshStandardMaterial color="#140f0c" roughness={0.9} />
          </mesh>
          <mesh position={[0, 5.0, 0]}>
            <boxGeometry args={[2.9, 0.08, 0.08]} />
            <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.8} />
          </mesh>

          {/* Display Dais */}
          <mesh position={[0, 0.6, 0.4]} castShadow receiveShadow>
            <boxGeometry args={[1.5, 1.2, 0.9]} />
            <meshStandardMaterial color="#221a14" roughness={0.6} metalness={0.1} />
          </mesh>

          {/* Sacred Bronze Nataraja Ring of Fire (Prabhamandala) */}
          <group position={[0, 2.2, 0.4]}>
            {/* Outer Flame Ring */}
            <mesh castShadow>
              <torusGeometry args={[0.65, 0.04, 16, 32]} />
              <meshStandardMaterial color="#b88b4a" roughness={0.35} metalness={0.8} />
            </mesh>
            {/* Ring Base Lotus Stand */}
            <mesh position={[0, -0.65, 0]}>
              <cylinderGeometry args={[0.25, 0.38, 0.15, 16]} />
              <meshStandardMaterial color="#b88b4a" roughness={0.35} metalness={0.8} />
            </mesh>
            {/* Central Dancing Deity Silhouette */}
            <mesh position={[0, 0.05, 0]} castShadow>
              <cylinderGeometry args={[0.08, 0.18, 0.75, 12]} />
              <meshStandardMaterial color="#a37637" roughness={0.4} metalness={0.75} />
            </mesh>
            <mesh position={[0, 0.48, 0]}>
              <sphereGeometry args={[0.11, 16, 16]} />
              <meshStandardMaterial color="#a37637" roughness={0.4} metalness={0.75} />
            </mesh>
            {/* Four Outstretched Arms */}
            <mesh position={[0.3, 0.2, 0]} rotation={[0, 0, -0.4]}>
              <cylinderGeometry args={[0.025, 0.035, 0.5, 8]} />
              <meshStandardMaterial color="#a37637" roughness={0.4} metalness={0.75} />
            </mesh>
            <mesh position={[-0.3, 0.2, 0]} rotation={[0, 0, 0.4]}>
              <cylinderGeometry args={[0.025, 0.035, 0.5, 8]} />
              <meshStandardMaterial color="#a37637" roughness={0.4} metalness={0.75} />
            </mesh>
          </group>

          {/* Dedicated Spotlight on Nataraja */}
          <spotLight
            position={[0, 4.6, 0.8]}
            target-position={[0, 2.2, 0.4]}
            angle={0.5}
            penumbra={0.6}
            intensity={22}
            color="#ffd999"
            distance={8}
            decay={2}
          />
        </group>

        {/* ── BACK ASSET 3: Imperial Mughal Peacock Throne Relic (Right Back Niche) ── */}
        <group position={[4.2, 0, 0.3]}>
          {/* Niche Alcove Frame */}
          <mesh position={[0, 2.7, -0.05]}>
            <boxGeometry args={[2.8, 4.6, 0.1]} />
            <meshStandardMaterial color="#140f0c" roughness={0.9} />
          </mesh>
          <mesh position={[0, 5.0, 0]}>
            <boxGeometry args={[2.9, 0.08, 0.08]} />
            <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.8} />
          </mesh>

          {/* Marble Throne Platform */}
          <mesh position={[0, 0.5, 0.4]} castShadow receiveShadow>
            <boxGeometry args={[1.6, 1.0, 1.0]} />
            <meshStandardMaterial color="#282018" roughness={0.5} metalness={0.15} />
          </mesh>
          <mesh position={[0, 1.01, 0.4]}>
            <boxGeometry args={[1.62, 0.02, 1.02]} />
            <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.85} />
          </mesh>

          {/* Carved Gold & Ruby Velvet Peacock Throne */}
          <group position={[0, 1.6, 0.4]}>
            {/* Throne Backrest */}
            <mesh position={[0, 0.45, -0.3]} castShadow>
              <boxGeometry args={[1.1, 0.9, 0.12]} />
              <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.9} />
            </mesh>
            {/* Ruby Velvet Seat Cushion */}
            <mesh position={[0, 0.08, 0]} castShadow>
              <boxGeometry args={[1.0, 0.14, 0.7]} />
              <meshStandardMaterial color="#800020" roughness={0.3} />
            </mesh>
            {/* Gold Peacock Crown Ornament atop Throne */}
            <mesh position={[0, 1.0, -0.3]}>
              <octahedronGeometry args={[0.18, 0]} />
              <meshStandardMaterial color="#ffd700" roughness={0.15} metalness={0.95} />
            </mesh>
            {/* Twin Peacock Statuettes */}
            {[-0.4, 0.4].map((x, idx) => (
              <mesh key={idx} position={[x, 0.9, -0.3]}>
                <sphereGeometry args={[0.08, 12, 12]} />
                <meshStandardMaterial color="#308070" roughness={0.3} metalness={0.8} />
              </mesh>
            ))}
          </group>

          {/* Dedicated Spotlight on Peacock Throne */}
          <spotLight
            position={[0, 4.6, 0.8]}
            target-position={[0, 1.6, 0.4]}
            angle={0.5}
            penumbra={0.6}
            intensity={22}
            color="#ffe2a6"
            distance={8}
            decay={2}
          />
        </group>

        {/* Ambient Deep Gallery Backlight Glow */}
        <pointLight position={[0, 3.5, 0.8]} intensity={18} color="#f0b868" distance={18} decay={2} />
      </group>

      {/* 7. Central Display Table with Historical Book */}
      <CentralTable />
    </group>
  );
}

// ---------------------------------------------------------------------------
// Museum Lighting Scheme (High-end Atmospheric Gallery)
// ---------------------------------------------------------------------------
function GrandLighting({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      {/* Subtle Warm Ambient Base */}
      <ambientLight intensity={0.22} color="#f4e4c3" />

      {/* Main Overhead Key Light for the Colonnade */}
      <pointLight
        position={[0, 5.4, 5.0]}
        intensity={isMobile ? 35 : 55}
        color="#ffe2b0"
        distance={22}
        decay={2}
        castShadow={!isMobile}
      />

      {/* Focused Gallery Spotlight directly on the Historical Book */}
      <spotLight
        position={[0, 4.8, 0.6]}
        angle={0.42}
        penumbra={0.75}
        intensity={isMobile ? 45 : 75}
        color="#fff1d0"
        distance={12}
        decay={2}
        target-position={[0, 0.9, 0]}
        castShadow={!isMobile}
      />

      {/* Warm Sconce Lights along Colonnade Columns */}
      <pointLight position={[-3.6, 3.2, 4.2]} intensity={8} color="#d4a366" distance={8} decay={2} />
      <pointLight position={[3.6, 3.2, 4.2]} intensity={8} color="#d4a366" distance={8} decay={2} />
      <pointLight position={[-3.6, 3.2, 0]} intensity={8} color="#d4a366" distance={8} decay={2} />
      <pointLight position={[3.6, 3.2, 0]} intensity={8} color="#d4a366" distance={8} decay={2} />

      {/* Soft Ground Warm Bounce */}
      <pointLight position={[0, 0.4, 1.8]} intensity={4} color="#8c6a46" distance={6} decay={2} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Main Exported MuseumScene Component
// ---------------------------------------------------------------------------
export interface MuseumSceneProps {
  /** Scroll progress 0.0 → 1.0 driving the camera */
  progress: number;
  /** Whether the 3D scene should be rendered */
  visible?: boolean;
  className?: string;
}

export const MuseumScene: React.FC<MuseumSceneProps> = ({
  progress,
  visible = true,
  className = '',
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.innerHeight < 600);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease' }}
    >
      <Canvas
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: !isMobile,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        shadows={!isMobile}
        camera={{ fov: isMobile ? 58 : 48, near: 0.1, far: 80 }}
        style={{ background: '#0a0807' }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        {/* Rich Atmospheric Fog */}
        <fog attach="fog" args={['#0a0807', 7, 24]} />

        <CameraController progress={progress} />
        <GrandLighting isMobile={isMobile} />
        <GrandGallery isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default MuseumScene;
