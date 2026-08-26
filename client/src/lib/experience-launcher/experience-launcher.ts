import type {
  ExperienceType,
  ExperienceAvailability,
  DeviceCapabilities,
  ExperienceLaunchConfig,
} from '@/types/experience';

/**
 * Resolve which experience mode to actually launch.
 *
 * Given a user's requested mode, the monument's availability,
 * and the device's capabilities, determine the best experience
 * to present — falling back gracefully when needed.
 *
 * Fallback chain: AR/VR → Web 3D → error.
 */
export function resolveExperience(
  requested: ExperienceType,
  availability: ExperienceAvailability,
  capabilities: DeviceCapabilities,
): ExperienceLaunchConfig {
  // Check if the monument has the requested experience AND the device supports it
  if (requested === 'ar') {
    if (availability.ar && capabilities.ar) {
      return { resolvedMode: 'ar', isFallback: false };
    }
    // Fallback to web3d
    if (availability.web3d && capabilities.webgl) {
      return {
        resolvedMode: 'web3d',
        isFallback: true,
        fallbackReason: !availability.ar
          ? 'AR experience is not yet available for this monument.'
          : 'Your device does not support AR sessions.',
      };
    }
  }

  if (requested === 'vr') {
    if (availability.vr && capabilities.vr) {
      return { resolvedMode: 'vr', isFallback: false };
    }
    // Fallback to web3d
    if (availability.web3d && capabilities.webgl) {
      return {
        resolvedMode: 'web3d',
        isFallback: true,
        fallbackReason: !availability.vr
          ? 'VR experience is not yet available for this monument.'
          : 'Your device does not support VR sessions.',
      };
    }
  }

  if (requested === 'web3d') {
    if (availability.web3d && capabilities.webgl) {
      return { resolvedMode: 'web3d', isFallback: false };
    }
    return {
      resolvedMode: 'web3d',
      isFallback: true,
      fallbackReason: !capabilities.webgl
        ? 'Your browser does not support WebGL.'
        : '3D experience is not yet available for this monument.',
    };
  }

  // Absolute fallback
  return {
    resolvedMode: 'web3d',
    isFallback: true,
    fallbackReason: 'The requested experience is not available.',
  };
}
