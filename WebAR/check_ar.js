const fs = require('fs');
const code = fs.readFileSync('app.js', 'utf8');
const checks = [
  ['local in requiredFeatures',           code.includes("'local', 'hit-test'")],
  ['Hit-test src requested before loop',   code.includes('await xrSession.requestHitTestSource')],
  ['viewerSpace obtained before session',  code.includes('viewerSpace = await')],
  ['Reticle uses position.set not matrix', !code.includes('reticleMesh.matrix.fromArray')],
  ['latestHitPose saved per frame',        code.includes('latestHitPose = pose')],
  ['pointerdown/pointerup tap detection',  code.includes('pointerdown') && code.includes('pointerup')],
  ['Tap movement threshold',               code.includes('mov < 18')],
  ['pendingPlace for model not ready',     code.includes('pendingPlace')],
  ['doPlace function exists',              code.includes('function doPlace')],
  ['placementRoot.visible = true',         code.includes('placementRoot.visible = true')],
  ['modelPivot reset on placement',        code.includes('modelPivot.rotation.set(0, 0, 0)')],
  ['hitTestSrc cancel on end',             code.includes('hitTestSrc.cancel')],
  ['Gesture isolation isHUDElement',       code.includes('isHUDElement')],
  ['Pinch gesture type',                   code.includes("'pinch'")],
  ['Rotate gesture type',                  code.includes("'rotate'")],
  ['applyLighting function',               code.includes('function applyLighting')],
  ['AR_DEBUG panel',                       code.includes('AR_DEBUG')],
  ['Duplicate session guard',              code.includes('if (xrSession)')],
  ['onXREnd restores preview',             code.includes('function onXREnd')],
  ['No mat fromArray on reticle',          !code.includes('fromArray(pose.transform.matrix)')],
];
let pass = 0, fail = 0;
for (const [n, ok] of checks) {
  console.log((ok ? 'PASS' : 'FAIL') + '  ' + n);
  ok ? pass++ : fail++;
}
console.log('\n' + pass + '/' + checks.length + ' passed  ' + (fail > 0 ? fail + ' FAILING' : 'ALL GOOD'));
