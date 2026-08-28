// Inspect GLB geometry dimensions without loading textures
// Run: node inspect_glb_geo.mjs
import { readFileSync } from 'fs';

const buffer = readFileSync('./public/models/tajmahal.glb');

// Parse GLB header
const magic = buffer.readUInt32LE(0);
const version = buffer.readUInt32LE(4);
const length = buffer.readUInt32LE(8);

console.log('GLB Magic:', magic.toString(16), '(should be 0x46546c67)');
console.log('GLB Version:', version);
console.log('GLB Total Size:', (length / 1024 / 1024).toFixed(2), 'MB');

// Find JSON chunk
const jsonChunkLength = buffer.readUInt32LE(12);
const jsonChunkType = buffer.readUInt32LE(16);
const jsonData = JSON.parse(buffer.slice(20, 20 + jsonChunkLength).toString('utf8'));

// Print mesh/accessor info
console.log('\nNodes:', jsonData.nodes?.length ?? 0);
console.log('Meshes:', jsonData.meshes?.length ?? 0);

// Find binary chunk offset
const binChunkOffset = 20 + jsonChunkLength;
const binChunkLength = buffer.readUInt32LE(binChunkOffset);
const binStart = binChunkOffset + 8;
console.log('Binary chunk size:', (binChunkLength / 1024 / 1024).toFixed(2), 'MB');

// Parse accessors to compute actual vertex bounding box
let globalMin = [Infinity, Infinity, Infinity];
let globalMax = [-Infinity, -Infinity, -Infinity];
let positionsFound = 0;

for (const mesh of (jsonData.meshes || [])) {
  for (const prim of (mesh.primitives || [])) {
    const posAccessorIdx = prim.attributes?.POSITION;
    if (posAccessorIdx == null) continue;

    const accessor = jsonData.accessors[posAccessorIdx];
    if (!accessor) continue;

    // Use accessor min/max (GLB spec requires them for POSITION)
    if (accessor.min && accessor.max) {
      globalMin[0] = Math.min(globalMin[0], accessor.min[0]);
      globalMin[1] = Math.min(globalMin[1], accessor.min[1]);
      globalMin[2] = Math.min(globalMin[2], accessor.min[2]);
      globalMax[0] = Math.max(globalMax[0], accessor.max[0]);
      globalMax[1] = Math.max(globalMax[1], accessor.max[1]);
      globalMax[2] = Math.max(globalMax[2], accessor.max[2]);
      positionsFound++;
    }
  }
}

if (positionsFound === 0) {
  console.log('\nNo POSITION accessor min/max found in GLB!');
} else {
  const size = [
    globalMax[0] - globalMin[0],
    globalMax[1] - globalMin[1],
    globalMax[2] - globalMin[2],
  ];
  const center = [
    (globalMax[0] + globalMin[0]) / 2,
    (globalMax[1] + globalMin[1]) / 2,
    (globalMax[2] + globalMin[2]) / 2,
  ];

  console.log(`\n=== GLB Geometry Bounds (${positionsFound} accessors) ===`);
  console.log('Min X/Y/Z:', globalMin.map(v => v.toFixed(4)).join(', '));
  console.log('Max X/Y/Z:', globalMax.map(v => v.toFixed(4)).join(', '));
  console.log('Size W x H x D:', size.map(v => v.toFixed(4)).join(' x '));
  console.log('Center:', center.map(v => v.toFixed(4)).join(', '));

  console.log('\n=== After auto-centering (X/Z centred, bottom at Y=0) ===');
  console.log('Y spans: 0 to', size[1].toFixed(4));
  console.log('X spans:', (-size[0]/2).toFixed(4), 'to', (size[0]/2).toFixed(4));
  console.log('Z spans:', (-size[2]/2).toFixed(4), 'to', (size[2]/2).toFixed(4));

  console.log('\n=== Camera setup ===');
  const maxDim = Math.max(...size);
  const fovRad = 45 * Math.PI / 180;
  const camDist = (maxDim / 2) / Math.tan(fovRad / 2) * 1.5;
  const camY = size[1] * 0.4;
  console.log('Recommended camera position: [0,', camY.toFixed(3), ',', camDist.toFixed(3), ']');
  console.log('Recommended camera target:   [0,', (size[1] * 0.35).toFixed(3), ', 0]');
  console.log('Recommended OrbitControls minDist:', (camDist * 0.4).toFixed(2));
  console.log('Recommended OrbitControls maxDist:', (camDist * 3).toFixed(2));

  console.log('\n=== Hotspot positions (in local space after centering) ===');
  console.log('1. Main Dome:  [0,', (size[1] * 0.88).toFixed(3), ', 0]');
  console.log('2. Minaret:   [', (size[0] * 0.38).toFixed(3), ',', (size[1] * 0.6).toFixed(3), ',', (size[2] * 0.38).toFixed(3), ']');
  console.log('3. Pishtaq:    [0,', (size[1] * 0.44).toFixed(3), ',', (size[2] * 0.5).toFixed(3), ']');
  console.log('4. Garden:     [0,', (size[1] * 0.05).toFixed(3), ',', (size[2] * 0.7).toFixed(3), ']');
}
