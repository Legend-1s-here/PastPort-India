/**
 * Experience types and capability interfaces.
 *
 * These types define the contract between the normal website and
 * future AR/VR/3D experiences. No actual WebXR, camera, or
 * device API calls are made through these types — they are
 * architectural boundaries only.
 */

/** The three experience modes the product supports. */
export type ExperienceType = 'web3d' | 'ar' | 'vr';

/** Per-monument availability configuration for each experience mode. */
export interface ExperienceAvailability {
  /** Whether a Web 3D model is available for this monument. */
  web3d: boolean;
  /** Whether an AR experience is prepared for this monument. */
  ar: boolean;
  /** Whether a VR experience is prepared for this monument. */
  vr: boolean;
}

/**
 * What the current device/browser supports.
 *
 * Detection utilities populate this at runtime.
 * In P1, only `webgl` is actively detected.
 * AR and VR detection will be implemented when those
 * experiences are built.
 */
export interface DeviceCapabilities {
  /** Whether the browser supports WebGL (required for 3D). */
  webgl: boolean;
  /** Whether the browser/device supports AR sessions. */
  ar: boolean;
  /** Whether the browser/device supports VR sessions. */
  vr: boolean;
}

/**
 * Configuration returned by the experience launcher when
 * determining what experience to actually present to the user.
 */
export interface ExperienceLaunchConfig {
  /** The experience that will actually be launched. */
  resolvedMode: ExperienceType;
  /** Whether the resolved mode differs from what the user requested (fallback occurred). */
  isFallback: boolean;
  /** Human-readable reason if a fallback occurred. */
  fallbackReason?: string;
}

/**
 * Status of a running or loading experience.
 */
export type ExperienceStatus =
  | 'idle'
  | 'loading'
  | 'active'
  | 'error'
  | 'unsupported';
