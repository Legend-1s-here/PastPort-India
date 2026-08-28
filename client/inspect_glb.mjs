// Run: node inspect_glb.mjs
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { readFileSync } from 'fs';

const loader = new GLTFLoader();
const buffer = readFileSync('./public/models/tajmahal.glb');
const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

loader.parse(arrayBuffer, '', (gltf) => {
  const scene = gltf.scene;
  const box = new THREE.Box3().setFromObject(scene);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  console.log('=== GLB Bounding Box ===');
  console.log('Min:', JSON.stringify(box.min));
  console.log('Max:', JSON.stringify(box.max));
  console.log('Size (W x H x D):', JSON.stringify(size));
  console.log('Center:', JSON.stringify(center));

  // After auto-centering (bottom at Y=0, X/Z centered):
  const centeredCenter = { x: 0, y: size.y / 2, z: 0 };
  console.log('\n=== After auto-centering (bottom at Y=0) ===');
  console.log('Model spans Y: 0 to', size.y.toFixed(3));
  console.log('Model spans X:', (-size.x/2).toFixed(3), 'to', (size.x/2).toFixed(3));
  console.log('Model spans Z:', (-size.z/2).toFixed(3), 'to', (size.z/2).toFixed(3));
  console.log('Visual center at Y:', (size.y / 2).toFixed(3));

  console.log('\n=== Suggested hotspot positions (after centering, bottom at Y=0) ===');
  console.log('1. Dome top:    [0,', (size.y * 0.9).toFixed(2), ', 0]');
  console.log('2. Minarets:    [', (size.x * 0.4).toFixed(2), ',', (size.y * 0.6).toFixed(2), ',', (size.z * 0.4).toFixed(2), ']');
  console.log('3. Pishtaq:     [0,', (size.y * 0.45).toFixed(2), ',', (size.z * 0.5).toFixed(2), ']');
  console.log('4. Garden:      [0,', (size.y * 0.05).toFixed(2), ',', (size.z * 0.8).toFixed(2), ']');
}, (err) => console.error('Error:', err));
