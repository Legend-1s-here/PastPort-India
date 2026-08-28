import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Camera Keyframes — framing the grand gallery identical to the reference photo
// ---------------------------------------------------------------------------
interface CameraKeyframe {
  progress: number;
  position: [number, number, number];
  lookAt: [number, number, number];
}

const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  // Scene 1: Starting view matching reference photo — mahogany table in foreground, grand hall stretching into lit shrine
  { progress: 0.0, position: [0, 2.2, 6.2], lookAt: [0, 1.15, -4.0] },
  // Scene 2a: Gliding down the central colonnade aisle
  { progress: 0.3, position: [0, 2.1, 4.9], lookAt: [0, 1.05, -2.0] },
  // Scene 2b: Approaching the antique codex on the central table
  { progress: 0.55, position: [0, 1.95, 4.0], lookAt: [0, 0.94, 3.6] },
  // Scene 3a: Camera gracefully rises and tilts down towards the book
  { progress: 0.75, position: [0, 3.6, 3.6], lookAt: [0, 0.94, 3.6] },
  // Scene 3b: Perfect top-down view centered directly above the codex
  { progress: 1.0, position: [0, 5.2, 3.601], lookAt: [0, 0.94, 3.6] },
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

function CameraController({ progress }: { progress: number }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 2.2, 6.2));
  const targetLookAt = useRef(new THREE.Vector3(0, 1.15, -4.0));
  const currentLookAt = useRef(new THREE.Vector3(0, 1.15, -4.0));

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
// HTML5 Canvas Texture Generator for Classical Heritage Oil Paintings
// ---------------------------------------------------------------------------
function createArtworkTexture(subject: 'portrait' | 'apsara' | 'mural' | 'court'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // 1. Rich dark oil painting background gradient
    const bg = ctx.createLinearGradient(0, 0, 512, 768);
    if (subject === 'portrait') {
      bg.addColorStop(0, '#2d180c');
      bg.addColorStop(0.5, '#4a2b16');
      bg.addColorStop(1, '#140a05');
    } else if (subject === 'apsara') {
      bg.addColorStop(0, '#2b1019');
      bg.addColorStop(0.5, '#542232');
      bg.addColorStop(1, '#14060b');
    } else if (subject === 'mural') {
      bg.addColorStop(0, '#211c12');
      bg.addColorStop(0.5, '#473a24');
      bg.addColorStop(1, '#120f09');
    } else {
      bg.addColorStop(0, '#141d24');
      bg.addColorStop(0.5, '#2e3e4d');
      bg.addColorStop(1, '#090e12');
    }
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 512, 768);

    // 2. Warm golden spotlight aura on canvas
    const aura = ctx.createRadialGradient(256, 290, 20, 256, 290, 230);
    aura.addColorStop(0, 'rgba(240, 200, 120, 0.55)');
    aura.addColorStop(0.5, 'rgba(190, 140, 65, 0.22)');
    aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(256, 290, 230, 0, Math.PI * 2);
    ctx.fill();

    // 3. Artistic Classical Figure Motifs
    ctx.fillStyle = '#d4a359';
    ctx.strokeStyle = '#e5c875';
    ctx.lineWidth = 4;

    if (subject === 'portrait') {
      // Royal Emperor Silhouette & Crown
      ctx.beginPath();
      ctx.arc(256, 220, 65, 0, Math.PI * 2);
      ctx.fill();
      // Crown
      ctx.beginPath();
      ctx.moveTo(196, 175);
      ctx.lineTo(216, 115);
      ctx.lineTo(256, 145);
      ctx.lineTo(296, 115);
      ctx.lineTo(316, 175);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // Robes & Throne Seat
      ctx.beginPath();
      ctx.moveTo(140, 480);
      ctx.quadraticCurveTo(256, 310, 372, 480);
      ctx.lineTo(412, 710);
      ctx.lineTo(100, 710);
      ctx.closePath();
      ctx.fillStyle = '#8c5828';
      ctx.fill();
      ctx.stroke();
    } else if (subject === 'apsara') {
      // Celestial Dancer
      ctx.beginPath();
      ctx.arc(256, 210, 58, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(256, 268);
      ctx.bezierCurveTo(345, 330, 315, 470, 256, 540);
      ctx.bezierCurveTo(197, 470, 167, 330, 256, 268);
      ctx.fillStyle = '#b86b38';
      ctx.fill();
      ctx.stroke();
    } else if (subject === 'mural') {
      // Ancient Temple Archway Relief
      ctx.beginPath();
      ctx.arc(256, 360, 145, Math.PI, 0);
      ctx.lineTo(401, 620);
      ctx.lineTo(111, 620);
      ctx.closePath();
      ctx.fillStyle = '#7a623c';
      ctx.fill();
      ctx.stroke();
    } else {
      // Royal Palace Archway
      ctx.fillRect(175, 260, 162, 360);
      ctx.strokeRect(165, 250, 182, 380);
    }

    // 4. Ornate Gold Filigree Canvas Frame Border
    ctx.strokeStyle = '#c9a44c';
    ctx.lineWidth = 10;
    ctx.strokeRect(16, 16, 480, 736);
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 30, 452, 708);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ---------------------------------------------------------------------------
// Gilded Frame Oil Painting Component
// ---------------------------------------------------------------------------
interface GildedPaintingProps {
  position: [number, number, number];
  rotationY: number;
  subject: 'portrait' | 'apsara' | 'mural' | 'court';
}

function GildedPainting({ position, rotationY, subject }: GildedPaintingProps) {
  const texture = useMemo(() => createArtworkTexture(subject), [subject]);

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* 1. Heavy Dark Wood Backing Board */}
      <mesh position={[0, 2.7, -0.04]} castShadow>
        <boxGeometry args={[2.05, 2.85, 0.08]} />
        <meshStandardMaterial color="#1a120b" roughness={0.7} />
      </mesh>

      {/* 2. Outer Ornate Gold Frame Molding */}
      <mesh position={[0, 2.7, 0]}>
        <boxGeometry args={[2.15, 2.95, 0.07]} />
        <meshStandardMaterial color="#c9a44c" roughness={0.25} metalness={0.85} />
      </mesh>

      {/* Inner Beveled Gold Filigree Trim */}
      <mesh position={[0, 2.7, 0.035]}>
        <boxGeometry args={[1.85, 2.65, 0.03]} />
        <meshStandardMaterial color="#e5c875" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* 3. Illuminated Oil Painting Canvas with Custom Texture */}
      <mesh position={[0, 2.7, 0.045]}>
        <planeGeometry args={[1.72, 2.52]} />
        <meshStandardMaterial map={texture} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* 4. Overhead Brass Picture Light Fixture */}
      <mesh position={[0, 4.25, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.45, 8]} />
        <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.85} />
      </mesh>
      <mesh position={[0, 4.25, 0.42]}>
        <boxGeometry args={[0.85, 0.05, 0.08]} />
        <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.85} />
      </mesh>

      {/* Gallery Spotlight focused directly on the canvas */}
      <spotLight
        position={[0, 4.2, 0.4]}
        target-position={[0, 2.7, 0]}
        angle={0.65}
        penumbra={0.5}
        intensity={22}
        color="#ffe8bd"
        distance={7}
        decay={2}
      />
    </group>
  );
}

// ---------------------------------------------------------------------------
// Museum Statue & Pedestal Exhibit Component
// ---------------------------------------------------------------------------
interface PedestalStatueProps {
  position: [number, number, number];
  rotationY: number;
  statueType: 'king' | 'deity' | 'vessel';
}

function PedestalStatue({ position, rotationY, statueType }: PedestalStatueProps) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Dark Marble Pedestal */}
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 1.3, 0.7]} />
        <meshStandardMaterial color="#1f1812" roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Gold Trim Cap on Pedestal */}
      <mesh position={[0, 1.31, 0]}>
        <boxGeometry args={[0.92, 0.02, 0.72]} />
        <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Glass Vitrine Showcase (if vessel/small relic) */}
      {statueType === 'vessel' && (
        <mesh position={[0, 1.8, 0]}>
          <boxGeometry args={[0.8, 0.95, 0.6]} />
          <meshStandardMaterial
            color="#d5e2e8"
            roughness={0.1}
            metalness={0.1}
            transparent
            opacity={0.25}
          />
        </mesh>
      )}

      {/* 3D Sculpted Bronze / Sandstone Statue */}
      <group position={[0, 1.32, 0]}>
        {statueType === 'king' && (
          <>
            {/* Throne Base */}
            <mesh position={[0, 0.15, 0]} castShadow>
              <boxGeometry args={[0.55, 0.3, 0.45]} />
              <meshStandardMaterial color="#2d2218" roughness={0.6} />
            </mesh>
            {/* Seated King Figure */}
            <mesh position={[0, 0.55, 0]} castShadow>
              <cylinderGeometry args={[0.18, 0.24, 0.55, 12]} />
              <meshStandardMaterial color="#967543" roughness={0.4} metalness={0.7} />
            </mesh>
            {/* King Crown */}
            <mesh position={[0, 0.92, 0]} castShadow>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.85} />
            </mesh>
          </>
        )}

        {statueType === 'deity' && (
          <>
            {/* Standing Deity Figure */}
            <mesh position={[0, 0.5, 0]} castShadow>
              <cylinderGeometry args={[0.12, 0.18, 0.85, 12]} />
              <meshStandardMaterial color="#a88b59" roughness={0.45} metalness={0.6} />
            </mesh>
            <mesh position={[0, 1.0, 0]} castShadow>
              <sphereGeometry args={[0.11, 16, 16]} />
              <meshStandardMaterial color="#a88b59" roughness={0.45} metalness={0.6} />
            </mesh>
          </>
        )}

        {statueType === 'vessel' && (
          <>
            {/* Antique Golden Urn */}
            <mesh position={[0, 0.25, 0]} castShadow>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.85} />
            </mesh>
            <mesh position={[0, 0.48, 0]} castShadow>
              <cylinderGeometry args={[0.08, 0.12, 0.16, 12]} />
              <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.85} />
            </mesh>
          </>
        )}
      </group>

      {/* Vitrine Downward Spotlight */}
      <pointLight position={[0, 3.0, 0]} intensity={10} color="#ffe6b0" distance={5} decay={2} />
    </group>
  );
}

// ---------------------------------------------------------------------------
// Mughal Heritage Column with Stepped Plinth, Fluted Ring & Capital
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

      {/* 3. Lotus Capital */}
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
      {/* Cusped Arch Intrados */}
      <mesh position={[0, -0.22, 0]}>
        <boxGeometry args={[0.5, 0.2, length * 0.75]} />
        <meshStandardMaterial color="#382e24" roughness={0.7} metalness={0.1} />
      </mesh>
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
        <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.85} />
      </mesh>

      {/* Glowing Inner Core */}
      <mesh position={[0, -0.1, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshBasicMaterial color="#ffe8b0" />
      </mesh>

      {/* Radiant Amber Point Light */}
      <pointLight position={[0, -0.1, 0]} intensity={12} color="#ffbe6b" distance={9} decay={2} />
    </group>
  );
}

// ---------------------------------------------------------------------------
// Far Golden Shrine / Monument at the End of the Gallery Corridor
// ---------------------------------------------------------------------------
function FarGoldenShrine({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Multi-tiered Plinth */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[2.8, 0.6, 1.8]} />
        <meshStandardMaterial color="#2d2218" roughness={0.6} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <boxGeometry args={[2.84, 0.04, 1.84]} />
        <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.85} />
      </mesh>

      {/* Golden Shrine Portal */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[2.0, 2.4, 1.2]} />
        <meshStandardMaterial color="#18110a" roughness={0.5} metalness={0.4} />
      </mesh>

      {/* Radiant Golden Arch Frame */}
      <mesh position={[0, 3.1, 0.62]}>
        <boxGeometry args={[2.2, 0.15, 0.08]} />
        <meshStandardMaterial color="#e5c875" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[-1.05, 1.8, 0.62]}>
        <boxGeometry args={[0.15, 2.5, 0.08]} />
        <meshStandardMaterial color="#e5c875" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[1.05, 1.8, 0.62]}>
        <boxGeometry args={[0.15, 2.5, 0.08]} />
        <meshStandardMaterial color="#e5c875" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Top Onion Finial */}
      <mesh position={[0, 3.45, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#e5c875" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Intense Golden Backlight illuminating the Shrine */}
      <pointLight position={[0, 2.2, 0.8]} intensity={45} color="#ffd480" distance={15} decay={2} />
    </group>
  );
}

// ---------------------------------------------------------------------------
// Grand Central Table with Polished Mahogany Finish & Gold Filigree Corner Caps
// ---------------------------------------------------------------------------
function CentralTable({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* 1. Low Plinth Dais */}
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <boxGeometry args={[3.2, 0.08, 2.4]} />
        <meshStandardMaterial color="#140d09" roughness={0.8} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.081, 0]}>
        <boxGeometry args={[3.22, 0.01, 2.42]} />
        <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.85} />
      </mesh>

      {/* 2. Dark Polished Mahogany Table Top */}
      <mesh position={[0, 0.84, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.09, 1.65]} />
        <meshStandardMaterial color="#1c120c" roughness={0.3} metalness={0.15} />
      </mesh>

      {/* Gold Corner Filigree Caps */}
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
        <meshStandardMaterial color="#c9a44c" roughness={0.3} metalness={0.8} />
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

      {/* Under-table Arched Trim */}
      <mesh position={[0, 0.76, -0.68]}>
        <boxGeometry args={[2.0, 0.08, 0.04]} />
        <meshStandardMaterial color="#1c120c" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.76, 0.68]}>
        <boxGeometry args={[2.0, 0.08, 0.04]} />
        <meshStandardMaterial color="#1c120c" roughness={0.6} />
      </mesh>

      {/* 4. Antique Leather Codex Placed Centrally on Tabletop */}
      <group position={[0, 0.94, 0]}>
        {/* Antique Dark Leather Casing */}
        <mesh castShadow>
          <boxGeometry args={[0.96, 0.095, 0.68]} />
          <meshStandardMaterial color="#170d09" roughness={0.35} metalness={0.1} />
        </mesh>
        {/* Embossed Outer Gold Border */}
        <mesh position={[0, 0.049, 0]}>
          <boxGeometry args={[0.88, 0.002, 0.60]} />
          <meshStandardMaterial color="#c9a44c" roughness={0.25} metalness={0.85} />
        </mesh>
        {/* Inner Gold Medallion Emblem */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[0.32, 0.002, 0.32]} />
          <meshStandardMaterial color="#e5c875" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Stacked Gilded Page Edges */}
        <mesh position={[0.45, -0.004, 0]}>
          <boxGeometry args={[0.04, 0.07, 0.62]} />
          <meshStandardMaterial color="#e6d5b3" roughness={0.65} metalness={0.25} />
        </mesh>
        <mesh position={[0, -0.004, 0.31]}>
          <boxGeometry args={[0.92, 0.07, 0.04]} />
          <meshStandardMaterial color="#e6d5b3" roughness={0.65} metalness={0.25} />
        </mesh>
      </group>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Grand Gallery Environment
// ---------------------------------------------------------------------------
interface GrandGalleryProps {
  isMobile: boolean;
}

function GrandGallery({ isMobile }: GrandGalleryProps) {
  const columnSpacing = 4.0;
  const colCount = isMobile ? 3 : 5;

  const columnPairs = useMemo(() => {
    const pairs: Array<{ left: [number, number, number]; right: [number, number, number] }> = [];
    for (let i = 0; i < colCount; i++) {
      const z = -columnSpacing * i + 4.0;
      pairs.push({
        left: [-3.2, 0, z],
        right: [3.2, 0, z],
      });
    }
    return pairs;
  }, [colCount]);

  return (
    <group>
      {/* 1. Polished Marble Gallery Floor with Sheen */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[32, 44]} />
        <meshStandardMaterial color="#14100c" roughness={0.28} metalness={0.22} />
      </mesh>

      {/* Central Aisle Walkway */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} receiveShadow>
        <planeGeometry args={[4.4, 40]} />
        <meshStandardMaterial color="#1c1611" roughness={0.45} metalness={0.15} />
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

      {/* 2. Coffered Vaulted Ceiling */}
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

          <ArchSpan start={pair.left} end={pair.right} />

          {idx < columnPairs.length - 1 && (
            <>
              <ArchSpan start={pair.left} end={columnPairs[idx + 1].left} />
              <ArchSpan start={pair.right} end={columnPairs[idx + 1].right} />
            </>
          )}
        </React.Fragment>
      ))}

      {/* 4. Hanging Lanterns along Central Aisle */}
      <HangingLantern position={[0, 5.0, 4.0]} />
      <HangingLantern position={[0, 5.0, 0.0]} />
      <HangingLantern position={[0, 5.0, -4.0]} />
      <HangingLantern position={[0, 5.0, -8.0]} />

      {/* 5. Illuminated Side Wall Oil Paintings */}
      {/* Left Wall Corridor */}
      <GildedPainting position={[-4.6, 0, 4.0]} rotationY={Math.PI / 2} subject="portrait" />
      <PedestalStatue position={[-3.2, 0, 1.8]} rotationY={Math.PI / 3} statueType="king" />
      <GildedPainting position={[-4.6, 0, -0.4]} rotationY={Math.PI / 2} subject="apsara" />
      <PedestalStatue position={[-3.2, 0, -2.6]} rotationY={Math.PI / 3} statueType="deity" />
      <GildedPainting position={[-4.6, 0, -4.8]} rotationY={Math.PI / 2} subject="mural" />

      {/* Right Wall Corridor */}
      <GildedPainting position={[4.6, 0, 4.0]} rotationY={-Math.PI / 2} subject="court" />
      <PedestalStatue position={[3.2, 0, 1.8]} rotationY={-Math.PI / 3} statueType="deity" />
      <GildedPainting position={[4.6, 0, -0.4]} rotationY={-Math.PI / 2} subject="mural" />
      <PedestalStatue position={[3.2, 0, -2.6]} rotationY={-Math.PI / 3} statueType="vessel" />
      <GildedPainting position={[4.6, 0, -4.8]} rotationY={-Math.PI / 2} subject="portrait" />

      {/* Outer Side Walls */}
      <mesh position={[-5.2, 3.1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[44, 6.2]} />
        <meshStandardMaterial color="#16120e" roughness={0.9} />
      </mesh>
      <mesh position={[5.2, 3.1, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[44, 6.2]} />
        <meshStandardMaterial color="#16120e" roughness={0.9} />
      </mesh>

      {/* 6. Glowing Golden Altar Shrine at the End of the Gallery */}
      <FarGoldenShrine position={[0, 0, -11.5]} />

      {/* 7. Foreground Mahogany Central Table with Antique Book */}
      <CentralTable position={[0, 0, 3.6]} />
    </group>
  );
}

// ---------------------------------------------------------------------------
// Museum Gallery Lighting Scheme
// ---------------------------------------------------------------------------
function GrandLighting({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      {/* Warm Ambient Base */}
      <ambientLight intensity={0.35} color="#f4e4c3" />

      {/* Main Overhead Key Light */}
      <pointLight
        position={[0, 5.4, 3.0]}
        intensity={isMobile ? 40 : 65}
        color="#ffe2b0"
        distance={24}
        decay={2}
        castShadow={!isMobile}
      />

      {/* Focused Spotlight directly on Foreground Book & Table */}
      <spotLight
        position={[0, 4.8, 4.2]}
        target-position={[0, 0.94, 3.6]}
        angle={0.5}
        penumbra={0.7}
        intensity={isMobile ? 50 : 85}
        color="#fff1d0"
        distance={12}
        decay={2}
        castShadow={!isMobile}
      />

      {/* Sconce Lights along Colonnade Columns */}
      <pointLight position={[-3.0, 3.2, 4.0]} intensity={10} color="#d4a366" distance={8} decay={2} />
      <pointLight position={[3.0, 3.2, 4.0]} intensity={10} color="#d4a366" distance={8} decay={2} />
      <pointLight position={[-3.0, 3.2, 0.0]} intensity={10} color="#d4a366" distance={8} decay={2} />
      <pointLight position={[3.0, 3.2, 0.0]} intensity={10} color="#d4a366" distance={8} decay={2} />
      <pointLight position={[-3.0, 3.2, -4.0]} intensity={10} color="#d4a366" distance={8} decay={2} />
      <pointLight position={[3.0, 3.2, -4.0]} intensity={10} color="#d4a366" distance={8} decay={2} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Main Exported MuseumScene Component
// ---------------------------------------------------------------------------
export interface MuseumSceneProps {
  progress: number;
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
        camera={{ fov: isMobile ? 56 : 46, near: 0.1, far: 80 }}
        style={{ background: '#0a0807' }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        {/* Rich Warm Atmospheric Fog extending down the hall */}
        <fog attach="fog" args={['#080605', 9, 38]} />

        <CameraController progress={progress} />
        <GrandLighting isMobile={isMobile} />
        <GrandGallery isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default MuseumScene;
