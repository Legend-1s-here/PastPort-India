import { useState } from 'react';
import type { DeviceCapabilities } from '@/types/experience';
import { detectCapabilities } from '@/lib/capabilities/capabilities';

/**
 * React hook that detects device capabilities.
 *
 * Returns the current device's support for WebGL, AR, and VR.
 * State is initialized via lazy initialization to avoid cascading effect renders.
 *
 * In P1 only WebGL is actively detected. AR/VR will return
 * false until those detection utilities are implemented.
 */
export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities] = useState<DeviceCapabilities>(() => detectCapabilities());

  return capabilities;
}
