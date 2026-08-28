// Inspect node transforms in the GLB to detect any Y-axis rotations
import { readFileSync } from 'fs';

const buffer = readFileSync('./public/models/tajmahal.glb');
const jsonChunkLength = buffer.readUInt32LE(12);
const json = JSON.parse(buffer.slice(20, 20 + jsonChunkLength).toString('utf8'));

console.log('=== GLB Nodes ===');
for (const [i, node] of (json.nodes || []).entries()) {
  console.log(`\nNode ${i}: "${node.name || '(unnamed)'}"`);
  if (node.translation) console.log('  translation:', node.translation.map(v => v.toFixed(4)).join(', '));
  if (node.rotation)    console.log('  rotation (quat xyzw):', node.rotation.map(v => v.toFixed(4)).join(', '));
  if (node.scale)       console.log('  scale:', node.scale.map(v => v.toFixed(4)).join(', '));
  if (node.matrix)      console.log('  matrix:', node.matrix.map(v => v.toFixed(3)).join(', '));
  if (node.mesh != null) console.log('  mesh:', node.mesh, '→', json.meshes[node.mesh]?.name || '');
  if (node.children)    console.log('  children:', node.children);
}

// Also print root scene nodes
console.log('\n=== Scene root nodes ===');
for (const scene of (json.scenes || [])) {
  console.log('Scene:', scene.name, '→ root nodes:', scene.nodes);
}
