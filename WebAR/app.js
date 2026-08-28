/* ============================================================
   TAJ MAHAL WEBAR — FULL PRODUCTION AR ENGINE v5
   
   Features:
     1. Robust WebXR Surface Detection (Hit-test + Plane Detection Fallback)
     2. Multi-frame Temporal Stability Filter & Smooth Horizontal Reticle
     3. Surface-Aware Adaptive Sizing (Tabletop vs Room Floor Footprint)
     4. 4-Tier Zero-Floating Grounding Hierarchy (Base at local Y=0)
     5. Ultra-Optimized 7-Mesh Render Pipeline (60 FPS Close-Camera Performance)
     6. Clean State Machine: SCANNING -> SURFACE_DETECTED -> PLACED -> MANIPULATING
   ============================================================ */
'use strict';

(function () {

  // ─── CONSTANTS & CONFIGURATION ───────────────────────────
  const AR_DEBUG = false;               // Toggle for internal developer telemetry
  const MIN_SCALE_M = 0.15;            // Minimum physical model width (15cm)
  const MAX_SCALE_M = 3.50;            // Maximum physical model width (3.5m)
  const DEFAULT_TABLE_SCALE_M = 0.40;  // Default tabletop width (40cm)
  const DEFAULT_FLOOR_SCALE_M = 1.20;  // Default floor room scale (1.2m)
  const STABILITY_FRAMES_REQUIRED = 3; // Consecutive valid surface hits before ready
  const RETICLE_SMOOTH_FACTOR = 0.25;  // Lerp smoothing factor for reticle preview

  // ─── THREE.JS CORE ───────────────────────────────────────
  let renderer, scene, camera, controls;
  let ambientLight, hemiLight, dirLight;

  // ─── SPATIAL HIERARCHY ───────────────────────────────────
  // scene -> placementRoot -> shadowMesh + modelPivot -> modelGroundOffset -> modelContainer
  let placementRoot     = null; // Physical world XYZ + surface orientation yaw
  let shadowMesh        = null; // Contact shadow (local Y=0.0005)
  let modelPivot        = null; // User rotation.y + uniform scale around base center
  let modelGroundOffset = null; // Internal base normalization (base at Y=0, center at X=0, Z=0)
  let modelContainer    = null; // 7-mesh consolidated Taj Mahal GLTF hierarchy

  // ─── MODEL METRICS ───────────────────────────────────────
  let modelBottomY      = 0;    // Raw lowest vertex Y
  let modelNativeW      = 1.20; // Raw maximum horizontal width (max(size.x, size.z))
  let modelLoaded       = false;
  let userScaleM        = DEFAULT_TABLE_SCALE_M; // Active real-world scale in metres

  // ─── WEBXR SESSION & TRACKING ────────────────────────────
  let xrSession         = null;
  let xrRefSpace        = null; // XRReferenceSpace ('local-floor' or 'local')
  let xrRefSpaceType    = 'local-floor';
  let viewerSpace       = null; // XRReferenceSpace ('viewer')
  let hitTestSrc        = null; // XRHitTestSource
  let activeAnchor      = null; // XRAnchor if supported
  let pendingPlace      = null; // Queued tap pose if tapped before model load

  // ─── SURFACE DETECTION STATE ─────────────────────────────
  let latestHitPose     = null; // Latest validated surface pose
  let latestHitResult   = null; // Latest XRHitTestResult
  let surfaceStability  = 0;    // Consecutive frame counter of stable hits
  let detectedPlaneArea = 0;    // Approximate usable surface area in m²
  let isTabletopSurface = true; // True for compact table/desk surfaces

  // ─── RETICLE ─────────────────────────────────────────────
  let reticleMesh       = null;
  let reticleTargetPos  = new THREE.Vector3();
  let reticleTargetQuat = new THREE.Quaternion();

  // ─── AR STATE MACHINE ────────────────────────────────────
  const S = {
    IDLE: 'IDLE',
    SCANNING: 'SCANNING',
    SURFACE_DETECTED: 'SURFACE_DETECTED',
    READY_TO_PLACE: 'READY_TO_PLACE',
    PLACED: 'PLACED',
    MANIPULATING: 'MANIPULATING'
  };
  let state = S.IDLE;

  // ─── GESTURES & INTERACTION ──────────────────────────────
  let tapPointer        = { id: -1, sx: 0, sy: 0, t: 0 };
  let gesture           = { active: false, type: null, startX: 0, startDist: 0, startScaleM: 0.4, startRotY: 0 };

  // ─── PREVIEW AUTO-ROTATION ───────────────────────────────
  let isAutoRotating    = true;
  let previewRotY       = 0;

  // ─── REUSABLE MATH OBJECTS (Zero GC allocations in loop) ─
  const _box  = new THREE.Box3();
  const _vecA = new THREE.Vector3();
  const _vecB = new THREE.Vector3();
  const _quat = new THREE.Quaternion();
  const _eul  = new THREE.Euler();
  const _mat  = new THREE.Matrix4();

  // ─── DOM REFERENCES ──────────────────────────────────────
  let D = {};

  // ═══════════════════════════════════════════════════════════
  // BOOTSTRAP
  // ═══════════════════════════════════════════════════════════
  document.addEventListener('DOMContentLoaded', () => {
    grabDOM();
    initThree();
    initHierarchy();
    loadModel();
    wireUI();
  });

  // ═══════════════════════════════════════════════════════════
  // 1. DOM BINDINGS
  // ═══════════════════════════════════════════════════════════
  function grabDOM() {
    const q = id => document.getElementById(id);
    D = {
      canvas:      q('canvasContainer'),
      loading:     q('loadingOverlay'),
      progress:    q('progressBar'),
      webHeader:   q('webHeader'),
      webFooter:   q('webFooter'),
      webArWrap:   q('webArLaunchContainer'),
      previewHint: q('previewHint'),
      startArBtn:  q('startArCameraBtn'),
      overlay:     q('arOverlay'),
      statusTxt:   q('arStatusText'),
      reticleUI:   q('arReticleGuide'),
      sizeSlider:  q('arSizeSlider'),
      sizeLabel:   q('arSizeLabel'),
      resetBtn:    q('arResetBtn'),
      rotLeft:     q('arRotateLeftBtn'),
      rotRight:    q('arRotateRightBtn'),
      exitBtn:     q('exitArBtn'),
      arLightBtns: document.querySelectorAll('[data-ar-light]'),
      resetCamBtn: q('resetCamBtn'),
      autoRotBtn:  q('autoRotateToggleBtn'),
      infoBtn:     q('infoBtn'),   infoModal:  q('infoModal'),  closeInfoBtn: q('closeInfoBtn'),
      qrBtn:       q('qrBtn'),     qrModal:    q('qrModal'),    closeQrBtn:   q('closeQrBtn'),
      qrcode:      q('qrcode'),
    };
  }

  // ═══════════════════════════════════════════════════════════
  // 2. THREE.JS INITIALIZATION (Close-Camera & Mobile Tuned)
  // ═══════════════════════════════════════════════════════════
  function initThree() {
    scene  = new THREE.Scene();
    
    // Near clipping at 0.05m (5cm) prevents clipping when approaching the Taj Mahal closely
    // Far clipping at 50m keeps full precision in depth buffer
    camera = new THREE.PerspectiveCamera(48, innerWidth / innerHeight, 0.05, 50.0);
    camera.position.set(0.9, 0.75, 1.35);

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      precision: 'highp'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.0));
    renderer.setSize(innerWidth, innerHeight);
    renderer.toneMapping         = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;
    renderer.outputEncoding      = THREE.sRGBEncoding;
    renderer.xr.enabled          = true;
    D.canvas.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping   = true;
    controls.dampingFactor   = 0.08;
    controls.target.set(0, 0.28, 0);
    controls.minDistance     = 0.25;
    controls.maxDistance     = 6.0;
    controls.maxPolarAngle   = Math.PI / 2 + 0.05;

    // Optimized studio & AR lighting setup (0 shadow maps = 60fps on mobile)
    ambientLight = new THREE.AmbientLight(0xffffff, 0.50);
    scene.add(ambientLight);
    hemiLight    = new THREE.HemisphereLight(0xdbeafe, 0x1e293b, 0.55);
    scene.add(hemiLight);
    dirLight     = new THREE.DirectionalLight(0xfffaed, 0.90);
    dirLight.position.set(3, 8, 4);
    scene.add(dirLight);

    makeReticle();

    window.addEventListener('resize', () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    });

    renderer.setAnimationLoop(onFrame);
  }

  // ═══════════════════════════════════════════════════════════
  // 3. ZERO-FLOATING SPATIAL HIERARCHY
  // ═══════════════════════════════════════════════════════════
  function initHierarchy() {
    // 1. Placement Root: receives physical floor XYZ and surface yaw
    placementRoot = new THREE.Group();
    placementRoot.name = 'TajMahalPlacementRoot';
    placementRoot.visible = false;
    scene.add(placementRoot);

    // 2. Contact Shadow: child of placementRoot, grounded at local Y = 0.0005
    makeContactShadow();
    placementRoot.add(shadowMesh);

    // 3. Pivot: handles user rotation around center and uniform scale around base
    modelPivot = new THREE.Group();
    modelPivot.name = 'TajMahalPivot';
    placementRoot.add(modelPivot);

    // 4. Ground Offset: shifts imported asset so base is at Y=0 and centered on X/Z
    modelGroundOffset = new THREE.Group();
    modelGroundOffset.name = 'ModelGroundOffset';
    modelPivot.add(modelGroundOffset);
  }

  // ═══════════════════════════════════════════════════════════
  // 4. LIGHTWEIGHT CONTACT SHADOW
  // ═══════════════════════════════════════════════════════════
  function makeContactShadow() {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(64, 64, 10, 64, 64, 62);
    g.addColorStop(0,   'rgba(0,0,0,0.58)');
    g.addColorStop(0.5, 'rgba(0,0,0,0.18)');
    g.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);

    const mat = new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(c),
      transparent: true,
      depthWrite: false
    });
    const geo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
    shadowMesh = new THREE.Mesh(geo, mat);
    shadowMesh.name = 'GroundContactShadow';
    shadowMesh.position.set(0, 0.0005, 0);
    shadowMesh.renderOrder = -1;
  }

  // ═══════════════════════════════════════════════════════════
  // 5. STABLE PLACEMENT RETICLE
  // ═══════════════════════════════════════════════════════════
  function makeReticle() {
    const g  = new THREE.Group();
    g.name = 'ARReticle';

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.08, 0.11, 32).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85, side: THREE.DoubleSide })
    );
    const dot = new THREE.Mesh(
      new THREE.CircleGeometry(0.018, 16).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.95, side: THREE.DoubleSide })
    );
    g.add(ring, dot);
    reticleMesh = g;
    reticleMesh.visible = false;
    scene.add(reticleMesh);
  }

  // ═══════════════════════════════════════════════════════════
  // 6. ACCURATE BOUNDS CALCULATION
  // ═══════════════════════════════════════════════════════════
  function computeAccurateHierarchyBounds(rootObject) {
    const box = new THREE.Box3();
    box.makeEmpty();
    rootObject.updateMatrixWorld(true);

    let meshCount = 0;
    rootObject.traverse(child => {
      if (child.isMesh && child.visible && child.geometry) {
        if (!child.geometry.boundingBox) child.geometry.computeBoundingBox();
        if (child.geometry.boundingBox) {
          const meshBox = child.geometry.boundingBox.clone();
          meshBox.applyMatrix4(child.matrixWorld);
          box.union(meshBox);
          meshCount++;
        }
      }
    });

    if (box.isEmpty() || meshCount === 0) box.setFromObject(rootObject);
    return box;
  }

  // ═══════════════════════════════════════════════════════════
  // 7. MODEL LOADING & ASSET NORMALIZATION
  // ═══════════════════════════════════════════════════════════
  function loadModel() {
    const loader = new THREE.GLTFLoader();
    loader.load(
      'tajmahal.glb',
      gltf => {
        modelContainer = gltf.scene;
        modelContainer.name = 'TajMahalGLTF';

        // Optimize materials for smooth close-camera mobile performance
        modelContainer.traverse(n => {
          if (n.isMesh && n.material) {
            n.frustumCulled = true;
            n.material.roughness = Math.max(n.material.roughness ?? 1.0, 0.45);
            n.material.metalness = Math.min(n.material.metalness ?? 0.0, 0.05);
            n.material.side = THREE.FrontSide;
            n.material.depthWrite = true;
            n.material.depthTest = true;
          }
        });

        // Reset transforms before measurement
        modelContainer.position.set(0, 0, 0);
        modelContainer.rotation.set(0, 0, 0);
        modelContainer.scale.set(1, 1, 1);
        modelContainer.updateMatrixWorld(true);

        // Compute true world bounds
        const rawBox = computeAccurateHierarchyBounds(modelContainer);
        const rawSize = new THREE.Vector3();
        const rawCenter = new THREE.Vector3();
        rawBox.getSize(rawSize);
        rawBox.getCenter(rawCenter);

        modelBottomY = rawBox.min.y;
        modelNativeW = Math.max(rawSize.x, rawSize.z) || 1.20;

        console.log('[TajMahal] 📐 Consolidated Asset Bounds:',
          `Width: ${modelNativeW.toFixed(3)}m, Height: ${rawSize.y.toFixed(3)}m, BaseY: ${modelBottomY.toFixed(3)}`
        );

        // Shift model so bottom is at local Y=0 and center is at (0, 0)
        modelContainer.position.set(-rawCenter.x, -modelBottomY, -rawCenter.z);
        modelGroundOffset.add(modelContainer);

        // Update matrices
        placementRoot.updateMatrixWorld(true);

        // Show in desktop preview
        setScale(userScaleM);
        placementRoot.position.set(0, 0, 0);
        placementRoot.visible = true;

        modelLoaded = true;
        hideLanding();

        // If tap was queued during loading, deploy immediately
        if (pendingPlace) {
          deployModelToSurface(pendingPlace.pose, pendingPlace.result);
          pendingPlace = null;
        }

        console.log('[TajMahal] ✅ 3D Asset loaded and grounded');
      },
      xhr => {
        if (xhr.lengthComputable && D.progress) {
          D.progress.style.width = `${(xhr.loaded / xhr.total * 100).toFixed(0)}%`;
        }
      },
      err => {
        console.error('[TajMahal] Load error:', err);
        if (D.loading) D.loading.innerHTML = '<p style="color:#ef4444;padding:30px;text-align:center">Failed to load 3D model. Please refresh.</p>';
      }
    );
  }

  function hideLanding() {
    if (D.loading) {
      D.loading.style.transition = 'opacity 0.4s ease';
      D.loading.style.opacity = '0';
      setTimeout(() => { if (D.loading) D.loading.remove(); }, 450);
    }
  }

  // ═══════════════════════════════════════════════════════════
  // 8. MATHEMATICAL SCALING (BASE NEVER ELEVATES)
  // ═══════════════════════════════════════════════════════════
  function setScale(wMetres) {
    userScaleM = Math.max(MIN_SCALE_M, Math.min(wMetres, MAX_SCALE_M));

    if (!modelPivot) return;

    // Scale on modelPivot (local origin at Y=0 -> scale * 0 = 0 -> zero float)
    const s = userScaleM / modelNativeW;
    modelPivot.scale.setScalar(s);

    // Scale contact shadow footprint
    if (shadowMesh) {
      const fp = userScaleM * 1.25;
      shadowMesh.scale.set(fp, 1, fp);
    }

    syncSizeUI();
  }

  function syncSizeUI() {
    if (D.sizeSlider) D.sizeSlider.value = userScaleM;
    if (D.sizeLabel) {
      const tag = userScaleM < 0.55 ? 'Tabletop' : userScaleM < 1.40 ? 'Room' : 'Landmark';
      D.sizeLabel.textContent = `${tag} (${userScaleM.toFixed(2)}m)`;
    }
  }

  // ═══════════════════════════════════════════════════════════
  // 9. SURFACE-AWARE ADAPTIVE SIZING
  // ═══════════════════════════════════════════════════════════
  function adaptScaleToDetectedSurface(hitPose, frame) {
    let chosenScale = DEFAULT_TABLE_SCALE_M;

    // Check if WebXR Plane Detection exposed detected planes
    if (frame && frame.detectedPlanes && frame.detectedPlanes.size > 0) {
      const p = hitPose.transform.position;
      let closestPlane = null;
      let minDistance = Infinity;

      frame.detectedPlanes.forEach(plane => {
        if (plane.orientation === 'horizontal') {
          const planePose = frame.getPose(plane.planeSpace, renderer.xr.getReferenceSpace() || xrRefSpace);
          if (planePose) {
            const pp = planePose.transform.position;
            const dist = Math.hypot(pp.x - p.x, pp.z - p.z);
            if (dist < minDistance) {
              minDistance = dist;
              closestPlane = plane;
            }
          }
        }
      });

      if (closestPlane && closestPlane.polygon && closestPlane.polygon.length >= 3) {
        // Calculate bounding extent of detected plane polygon
        let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
        for (const pt of closestPlane.polygon) {
          minX = Math.min(minX, pt.x);
          maxX = Math.max(maxX, pt.x);
          minZ = Math.min(minZ, pt.z);
          maxZ = Math.max(maxZ, pt.z);
        }
        const planeWidth = maxX - minX;
        const planeDepth = maxZ - minZ;
        detectedPlaneArea = planeWidth * planeDepth;

        // Apply 80% safety margin of detected surface
        const usableWidth = Math.min(planeWidth, planeDepth) * 0.80;
        
        if (usableWidth > 1.2) {
          isTabletopSurface = false;
          chosenScale = Math.min(DEFAULT_FLOOR_SCALE_M, usableWidth);
          console.log(`[Surface Area] Floor detected (${planeWidth.toFixed(2)}x${planeDepth.toFixed(2)}m) -> Scale: ${chosenScale.toFixed(2)}m`);
        } else {
          isTabletopSurface = true;
          chosenScale = Math.max(MIN_SCALE_M, Math.min(DEFAULT_TABLE_SCALE_M, usableWidth));
          console.log(`[Surface Area] Table detected (${planeWidth.toFixed(2)}x${planeDepth.toFixed(2)}m) -> Scale: ${chosenScale.toFixed(2)}m`);
        }
      }
    } else {
      // Graceful fallback when plane-detection is unsupported
      chosenScale = userScaleM || DEFAULT_TABLE_SCALE_M;
    }

    setScale(chosenScale);
  }

  // ═══════════════════════════════════════════════════════════
  // 10. SOLID SURFACE DEPLOYMENT
  // ═══════════════════════════════════════════════════════════
  function deployModelToSurface(pose, hitResult) {
    if (!placementRoot || !modelPivot || !pose) return;

    const p = pose.transform.position;

    // Validate horizontal surface normal
    _mat.fromArray(pose.transform.matrix);
    const normalY = _mat.elements[5];
    if (normalY < 0.55) {
      setStatus('Please point camera at a flat floor or table');
      return;
    }

    // Extract surface heading / yaw only (ensures model is strictly vertical)
    _quat.setFromRotationMatrix(_mat);
    _eul.setFromQuaternion(_quat, 'YXZ');

    // 1. Position placementRoot at exact detected surface coordinate
    placementRoot.position.set(p.x, p.y, p.z);
    placementRoot.rotation.set(0, _eul.y, 0);
    placementRoot.visible = true;

    // 2. Reset user rotation on fresh deployment
    modelPivot.rotation.set(0, 0, 0);

    // 3. Update world matrices
    placementRoot.updateMatrixWorld(true);

    // 4. Create WebXR Anchor if supported for long-term drift correction
    if (hitResult && typeof hitResult.createAnchor === 'function') {
      hitResult.createAnchor()
        .then(anchor => {
          activeAnchor = anchor;
          console.log('[Anchor] ✅ WebXR Anchor active at physical placement');
        })
        .catch(() => {
          activeAnchor = null;
        });
    }

    // 5. Transition state to PLACED
    reticleMesh.visible = false;
    setARState(S.PLACED);

    console.log(`[Deployment] ✅ Taj Mahal anchored: X=${p.x.toFixed(3)}, Y=${p.y.toFixed(3)}, Z=${p.z.toFixed(3)}`);
  }

  // ═══════════════════════════════════════════════════════════
  // 11. MAIN XR RENDER LOOP (Zero Memory Garbage Allocations)
  // ═══════════════════════════════════════════════════════════
  function onFrame(t, frame) {
    if (frame) {
      // In AR Mode
      if (state !== S.PLACED && state !== S.MANIPULATING) {
        tickSurfaceScanning(frame);
      } else {
        tickAnchorDrift(frame);
      }
    } else {
      // In Desktop/Mobile 3D Preview Mode
      if (isAutoRotating && modelPivot) {
        previewRotY += 0.004;
        modelPivot.rotation.y = previewRotY;
      }
      controls.update();
    }

    renderer.render(scene, camera);
  }

  // ═══════════════════════════════════════════════════════════
  // 12. REAL-TIME SURFACE SCANNING & HIT-TEST
  // ═══════════════════════════════════════════════════════════
  function tickSurfaceScanning(frame) {
    if (!hitTestSrc) return;

    const activeRef = renderer.xr.getReferenceSpace() || xrRefSpace;
    if (!activeRef) return;

    const results = frame.getHitTestResults(hitTestSrc);

    if (results.length === 0) {
      surfaceStability = 0;
      reticleMesh.visible = false;
      latestHitPose = null;
      latestHitResult = null;
      if (state === S.SURFACE_DETECTED || state === S.READY_TO_PLACE) {
        setARState(S.SCANNING);
      }
      return;
    }

    const hit = results[0];
    const pose = hit.getPose(activeRef);
    if (!pose) return;

    // Check normal (local Y column in WebXR hit pose matrix)
    _mat.fromArray(pose.transform.matrix);
    const normalY = _mat.elements[5];

    if (normalY < 0.55) {
      // Steep slope or vertical wall
      surfaceStability = 0;
      reticleMesh.visible = false;
      latestHitPose = null;
      latestHitResult = null;
      setStatus('Move phone over a flat floor or table');
      return;
    }

    // Temporal stability filter
    surfaceStability++;
    latestHitPose = pose;
    latestHitResult = hit;

    const p = pose.transform.position;
    reticleTargetPos.set(p.x, p.y, p.z);
    _quat.setFromRotationMatrix(_mat);
    reticleTargetQuat.copy(_quat);

    // Smooth reticle interpolation
    if (!reticleMesh.visible) {
      reticleMesh.position.copy(reticleTargetPos);
      reticleMesh.quaternion.copy(reticleTargetQuat);
      reticleMesh.visible = true;
    } else {
      reticleMesh.position.lerp(reticleTargetPos, RETICLE_SMOOTH_FACTOR);
      reticleMesh.quaternion.slerp(reticleTargetQuat, RETICLE_SMOOTH_FACTOR);
    }

    if (surfaceStability >= STABILITY_FRAMES_REQUIRED) {
      if (state === S.SCANNING) {
        // Automatically calculate surface-aware scale before placement
        adaptScaleToDetectedSurface(pose, frame);
        setARState(S.READY_TO_PLACE);
      }
    } else if (state === S.SCANNING) {
      setARState(S.SURFACE_DETECTED);
    }
  }

  function tickAnchorDrift(frame) {
    if (activeAnchor && activeAnchor.anchorSpace) {
      const activeRef = renderer.xr.getReferenceSpace() || xrRefSpace;
      if (activeRef) {
        const anchorPose = frame.getPose(activeAnchor.anchorSpace, activeRef);
        if (anchorPose) {
          const ap = anchorPose.transform.position;
          placementRoot.position.set(ap.x, ap.y, ap.z);
        }
      }
    }
  }

  // ═══════════════════════════════════════════════════════════
  // 13. TAP-TO-PLACE INPUT DISPATCHER
  // ═══════════════════════════════════════════════════════════
  function handleTap() {
    // If already placed, keep model solidly stationary on its physical surface
    if (state === S.PLACED || state === S.MANIPULATING) return;

    if (!latestHitPose) {
      setStatus('Move phone slowly across floor or table...');
      return;
    }

    if (!modelLoaded) {
      pendingPlace = { pose: latestHitPose, result: latestHitResult };
      setStatus('Loading Taj Mahal model... please wait');
      return;
    }

    deployModelToSurface(latestHitPose, latestHitResult);
  }

  // ═══════════════════════════════════════════════════════════
  // 14. WEBXR SESSION LIFECYCLE
  // ═══════════════════════════════════════════════════════════
  async function startAR() {
    if (xrSession) {
      console.warn('[AR] Session already active');
      return;
    }

    if (!navigator.xr) { showUnsupported(); return; }
    let supported = false;
    try { supported = await navigator.xr.isSessionSupported('immersive-ar'); } catch (_) {}
    if (!supported) { showUnsupported(); return; }

    try {
      xrSession = await navigator.xr.requestSession('immersive-ar', {
        requiredFeatures: ['local', 'hit-test'],
        optionalFeatures: ['local-floor', 'dom-overlay', 'anchors', 'plane-detection'],
        domOverlay:       D.overlay ? { root: D.overlay } : undefined,
      });
    } catch (err) {
      console.error('[AR] requestSession failed:', err);
      alert('AR session could not start.\n\n' + err.message);
      return;
    }

    // Determine reference space
    try {
      xrRefSpace = await xrSession.requestReferenceSpace('local-floor');
      xrRefSpaceType = 'local-floor';
    } catch (_) {
      xrRefSpace = await xrSession.requestReferenceSpace('local');
      xrRefSpaceType = 'local';
    }

    // Viewer space for raycast hit testing
    viewerSpace = await xrSession.requestReferenceSpace('viewer');

    try {
      hitTestSrc = await xrSession.requestHitTestSource({ space: viewerSpace });
    } catch (err) {
      console.error('[AR] Hit-test source creation error:', err);
      setStatus('Surface detection unavailable on this device');
    }

    // Pass verified reference space type to Three.js WebXR Manager
    renderer.xr.setReferenceSpaceType(xrRefSpaceType);
    await renderer.xr.setSession(xrSession);

    // Reset AR runtime state
    controls.enabled    = false;
    isAutoRotating      = false;
    latestHitPose       = null;
    latestHitResult     = null;
    surfaceStability    = 0;
    pendingPlace        = null;
    activeAnchor        = null;

    if (placementRoot) placementRoot.visible = false;
    reticleMesh.visible = false;

    setARState(S.SCANNING);
    showARUI(true);

    // Attach touch & pointer events
    D.overlay.addEventListener('pointerdown', onOverlayPointerDown, { passive: true });
    D.overlay.addEventListener('pointerup',   onOverlayPointerUp,   { passive: false });
    D.overlay.addEventListener('touchstart',  onTouchStart,         { passive: false });
    D.overlay.addEventListener('touchmove',   onTouchMove,          { passive: false });
    D.overlay.addEventListener('touchend',    onTouchEnd,           { passive: false });

    // XR controller select event (Cardboard / Controller trigger)
    const ctrl = renderer.xr.getController(0);
    ctrl.addEventListener('select', () => handleTap());
    scene.add(ctrl);

    xrSession.addEventListener('end', onXREnd);
    console.log('[AR] Session started — scanning physical floor');
  }

  function showUnsupported() {
    const isAndroid = /android/i.test(navigator.userAgent);
    if (isAndroid) {
      const url = new URL('tajmahal.glb', location.href).href;
      location.href = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(url)}&mode=ar_only&title=Taj+Mahal#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;`;
    } else {
      alert('WebAR is not supported on this browser.\n\nPlease use Google Chrome on an ARCore-compatible Android device.');
    }
  }

  function onXREnd() {
    console.log('[AR] Session ended — restoring 3D view');

    if (hitTestSrc) { try { hitTestSrc.cancel(); } catch (_) {} hitTestSrc = null; }
    if (activeAnchor && typeof activeAnchor.delete === 'function') {
      try { activeAnchor.delete(); } catch (_) {}
    }
    activeAnchor    = null;
    viewerSpace     = null;
    xrRefSpace      = null;
    xrSession       = null;
    latestHitPose   = null;
    latestHitResult = null;
    surfaceStability = 0;

    if (D.overlay) {
      D.overlay.removeEventListener('pointerdown', onOverlayPointerDown);
      D.overlay.removeEventListener('pointerup',   onOverlayPointerUp);
      D.overlay.removeEventListener('touchstart',  onTouchStart);
      D.overlay.removeEventListener('touchmove',   onTouchMove);
      D.overlay.removeEventListener('touchend',    onTouchEnd);
    }

    // Restore desktop 3D preview
    controls.enabled    = true;
    isAutoRotating      = true;
    previewRotY         = 0;
    if (modelPivot) modelPivot.rotation.set(0, 0, 0);
    if (placementRoot) {
      placementRoot.position.set(0, 0, 0);
      placementRoot.rotation.set(0, 0, 0);
      placementRoot.visible = modelLoaded;
    }
    reticleMesh.visible = false;

    setARState(S.IDLE);
    showARUI(false);
  }

  // ═══════════════════════════════════════════════════════════
  // 15. TOUCH & GESTURE INTERACTION (ROTATION / PINCH-SCALE)
  // ═══════════════════════════════════════════════════════════
  function isHUDElement(x, y) {
    const el = document.elementFromPoint(x, y);
    return el && (
      el.closest('#arBottomHud') ||
      el.closest('#exitArBtn')   ||
      el.closest('#arTopBar')
    );
  }

  function onOverlayPointerDown(e) {
    if (isHUDElement(e.clientX, e.clientY)) return;
    tapPointer = { id: e.pointerId, sx: e.clientX, sy: e.clientY, t: Date.now() };
  }

  function onOverlayPointerUp(e) {
    if (e.pointerId !== tapPointer.id) return;
    if (isHUDElement(e.clientX, e.clientY)) return;

    const dx  = e.clientX - tapPointer.sx;
    const dy  = e.clientY - tapPointer.sy;
    const dt  = Date.now() - tapPointer.t;
    const mov = Math.hypot(dx, dy);

    // Clean tap gesture (< 18px movement, < 450ms duration)
    if (mov < 18 && dt < 450) {
      e.preventDefault();
      handleTap();
    }

    tapPointer.id = -1;
  }

  function onTouchStart(e) {
    if (state !== S.PLACED && state !== S.MANIPULATING) return;
    if (isHUDElement(e.touches[0].clientX, e.touches[0].clientY)) return;

    const tc = e.touches;
    if (tc.length === 1) {
      setARState(S.MANIPULATING);
      gesture = {
        active: true,
        type: 'rotate',
        startX: tc[0].clientX,
        startDist: 0,
        startScaleM: userScaleM,
        startRotY: modelPivot ? modelPivot.rotation.y : 0
      };
    } else if (tc.length === 2) {
      setARState(S.MANIPULATING);
      const dx = tc[0].clientX - tc[1].clientX;
      const dy = tc[0].clientY - tc[1].clientY;
      gesture = {
        active: true,
        type: 'pinch',
        startX: 0,
        startDist: Math.hypot(dx, dy),
        startScaleM: userScaleM,
        startRotY: 0
      };
    }
  }

  function onTouchMove(e) {
    if (!gesture.active) return;
    if (state !== S.PLACED && state !== S.MANIPULATING) return;
    if (isHUDElement(e.touches[0].clientX, e.touches[0].clientY)) return;
    e.preventDefault();

    const tc = e.touches;
    if (gesture.type === 'rotate' && tc.length === 1) {
      const delta = (tc[0].clientX - gesture.startX) * 0.009;
      if (modelPivot) modelPivot.rotation.y = gesture.startRotY + delta;
    }
    if (gesture.type === 'pinch' && tc.length === 2 && gesture.startDist > 0) {
      const dx   = tc[0].clientX - tc[1].clientX;
      const dy   = tc[0].clientY - tc[1].clientY;
      const dist = Math.hypot(dx, dy);
      setScale(gesture.startScaleM * (dist / gesture.startDist));
    }
  }

  function onTouchEnd(e) {
    if (e.touches.length === 0) {
      gesture.active = false;
      if (state === S.MANIPULATING) setARState(S.PLACED);
    } else if (e.touches.length === 1 && gesture.type === 'pinch') {
      gesture.type   = 'rotate';
      gesture.startX = e.touches[0].clientX;
      gesture.startRotY = modelPivot ? modelPivot.rotation.y : 0;
    }
  }

  // ═══════════════════════════════════════════════════════════
  // 16. STATE MACHINE & UI MESSAGING
  // ═══════════════════════════════════════════════════════════
  function setARState(s) {
    state = s;
    const isReadyToPlace = (s === S.READY_TO_PLACE || s === S.SURFACE_DETECTED);
    if (D.reticleUI) D.reticleUI.style.display = isReadyToPlace ? 'flex' : 'none';

    switch (s) {
      case S.SCANNING:
        setStatus('Scan floor or table by moving phone slowly...');
        break;
      case S.SURFACE_DETECTED:
        setStatus('Surface found — keep phone steady...');
        break;
      case S.READY_TO_PLACE:
        setStatus('Surface detected — tap floor to place Taj Mahal');
        break;
      case S.PLACED:
      case S.MANIPULATING:
        setStatus('Taj Mahal Placed · Drag to rotate · Pinch to scale');
        break;
    }
  }

  function setStatus(msg) {
    if (D.statusTxt) D.statusTxt.textContent = msg;
  }

  // ═══════════════════════════════════════════════════════════
  // 17. ATMOSPHERE LIGHTING PRESETS
  // ═══════════════════════════════════════════════════════════
  function applyLighting(mode) {
    switch (mode) {
      case 'day':
        ambientLight.color.setHex(0xffffff); ambientLight.intensity = 0.50;
        hemiLight.color.setHex(0xdbeafe);    hemiLight.groundColor.setHex(0x1e293b); hemiLight.intensity = 0.55;
        dirLight.color.setHex(0xfffaed);     dirLight.intensity = 0.90; dirLight.position.set(3, 8, 4);
        renderer.toneMappingExposure = 0.95;
        D.canvas.style.background = 'radial-gradient(circle at 50% 60%, #151d32 0%, #07090e 100%)';
        break;
      case 'sunset':
        ambientLight.color.setHex(0xff9966); ambientLight.intensity = 0.45;
        hemiLight.color.setHex(0xffaa77);    hemiLight.groundColor.setHex(0x552211); hemiLight.intensity = 0.55;
        dirLight.color.setHex(0xff5500);     dirLight.intensity = 1.20; dirLight.position.set(6, 2.5, 2);
        renderer.toneMappingExposure = 1.00;
        D.canvas.style.background = 'radial-gradient(circle at 50% 60%, #3e1e12 0%, #08060a 100%)';
        break;
      case 'night':
        ambientLight.color.setHex(0x1a2240); ambientLight.intensity = 0.32;
        hemiLight.color.setHex(0x3355aa);    hemiLight.groundColor.setHex(0x050810); hemiLight.intensity = 0.32;
        dirLight.color.setHex(0x7799ee);     dirLight.intensity = 0.45; dirLight.position.set(-2, 7, -3);
        renderer.toneMappingExposure = 0.65;
        D.canvas.style.background = 'radial-gradient(circle at 50% 60%, #0c1224 0%, #030408 100%)';
        break;
    }
    document.querySelectorAll('.atmo-btn').forEach(p => p.classList.toggle('active', p.dataset.lighting === mode));
    D.arLightBtns.forEach(b => b.classList.toggle('active', b.dataset.arLight === mode));
  }

  // ═══════════════════════════════════════════════════════════
  // 18. UI EVENT WIRING & CLEAN RESET
  // ═══════════════════════════════════════════════════════════
  function wireUI() {
    // AR Launch
    if (D.startArBtn) D.startArBtn.addEventListener('click', startAR);

    // Atmosphere Lighting
    document.querySelectorAll('.atmo-btn').forEach(p => {
      p.addEventListener('click', e => {
        e.stopPropagation();
        applyLighting(p.dataset.lighting);
      });
    });
    D.arLightBtns.forEach(b => {
      b.addEventListener('click', e => {
        e.stopPropagation();
        applyLighting(b.dataset.arLight);
      });
    });

    // Preview Controls
    if (D.resetCamBtn) D.resetCamBtn.addEventListener('click', () => {
      camera.position.set(0.9, 0.75, 1.35);
      controls.target.set(0, 0.28, 0);
      controls.update();
      if (modelPivot) { modelPivot.rotation.y = 0; previewRotY = 0; }
    });
    if (D.autoRotBtn) D.autoRotBtn.addEventListener('click', () => {
      isAutoRotating = !isAutoRotating;
      D.autoRotBtn.classList.toggle('active', isAutoRotating);
    });

    // Size Slider
    if (D.sizeSlider) {
      D.sizeSlider.min = String(MIN_SCALE_M);
      D.sizeSlider.max = String(MAX_SCALE_M);
      D.sizeSlider.step = '0.05';
      D.sizeSlider.value = String(userScaleM);
      D.sizeSlider.addEventListener('input', e => {
        e.stopPropagation();
        setScale(parseFloat(e.target.value));
      });
    }

    // Step Rotation (+/- 15 deg)
    const ROT_STEP = Math.PI / 12;
    if (D.rotLeft)  D.rotLeft.addEventListener('click',  e => { e.stopPropagation(); if (modelPivot && (state === S.PLACED || state === S.MANIPULATING)) modelPivot.rotation.y -= ROT_STEP; });
    if (D.rotRight) D.rotRight.addEventListener('click', e => { e.stopPropagation(); if (modelPivot && (state === S.PLACED || state === S.MANIPULATING)) modelPivot.rotation.y += ROT_STEP; });

    // CLEAN RESET
    if (D.resetBtn) D.resetBtn.addEventListener('click', e => {
      e.stopPropagation();
      if (state !== S.PLACED && state !== S.MANIPULATING) return;

      if (placementRoot) placementRoot.visible = false;
      reticleMesh.visible = false;

      if (activeAnchor && typeof activeAnchor.delete === 'function') {
        try { activeAnchor.delete(); } catch (_) {}
      }
      activeAnchor     = null;
      latestHitPose    = null;
      latestHitResult  = null;
      surfaceStability = 0;

      if (modelPivot) modelPivot.rotation.set(0, 0, 0);

      setARState(S.SCANNING);
      console.log('[AR] 🔄 Placement reset — Scanning for new surface');
    });

    // AR Exit
    if (D.exitBtn) D.exitBtn.addEventListener('click', e => {
      e.stopPropagation();
      if (xrSession) xrSession.end();
    });

    // Modals
    if (D.infoBtn)      D.infoBtn.addEventListener('click',      () => D.infoModal.classList.add('show'));
    if (D.closeInfoBtn) D.closeInfoBtn.addEventListener('click',  () => D.infoModal.classList.remove('show'));
    if (D.infoModal)    D.infoModal.addEventListener('click',     e => { if (e.target === D.infoModal) D.infoModal.classList.remove('show'); });

    let qrBuilt = false;
    if (D.qrBtn) D.qrBtn.addEventListener('click', () => {
      D.qrModal.classList.add('show');
      if (!qrBuilt && D.qrcode) {
        new QRCode(D.qrcode, { text: location.href, width:180, height:180, colorDark:'#0a0e1a', colorLight:'#fff', correctLevel: QRCode.CorrectLevel.H });
        qrBuilt = true;
      }
    });
    if (D.closeQrBtn) D.closeQrBtn.addEventListener('click', () => D.qrModal.classList.remove('show'));
    if (D.qrModal)    D.qrModal.addEventListener('click',    e => { if (e.target === D.qrModal) D.qrModal.classList.remove('show'); });

    applyLighting('day');
    syncSizeUI();
  }

  function showARUI(show) {
    if (!D.overlay) return;
    D.overlay.classList.toggle('active', show);
    D.webHeader.style.display = show ? 'none' : 'flex';
    D.webFooter.style.display = show ? 'none' : 'flex';
    D.webArWrap.style.display = show ? 'none' : 'block';
    if (D.previewHint) D.previewHint.style.display = show ? 'none' : 'flex';
    if (!show && D.reticleUI) D.reticleUI.style.display = 'none';
  }

})();
