import type { DeviceCapabilities } from '@/types/experience';

/**
 * Detect whether the browser supports WebGL rendering.
 *
 * This is required for the React Three Fiber 3D viewer.
 * Tests by creating a temporary canvas and requesting a
 * WebGL2 (preferred) or WebGL1 context.
 */
export function detectWebGLSupport(): boolean {
  if (typeof document === 'undefined') return false;

  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') || canvas.getContext('webgl');
    return gl !== null;
  } catch {
    return false;
  }
}

/**
 * Detect AR support.
 *
 * Placeholder — returns `false` in P1.
 * Future implementation will check for WebXR AR session
 * support or platform-specific AR capabilities.
 */
export function detectARSupport(): boolean {
  // Will be implemented when AR experience is built.
  return false;
}

/**
 * Detect VR support.
 *
 * Placeholder — returns `false` in P1.
 * Future implementation will check for WebXR immersive-vr
 * session support.
 */
export function detectVRSupport(): boolean {
  // Will be implemented when VR experience is built.
  return false;
}

/**
 * Aggregate all device capability checks into a single result.
 */
export function detectCapabilities(): DeviceCapabilities {
  return {
    webgl: detectWebGLSupport(),
    ar: detectARSupport(),
    vr: detectVRSupport(),
  };
}
