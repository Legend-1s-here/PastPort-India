import gsap from 'gsap';

/**
 * Standardized Motion Timing Constants (in seconds for GSAP).
 */
export const MOTION_DURATIONS = {
  FAST: 0.18,
  NORMAL: 0.35,
  CINEMATIC: 0.8,
  DRAMATIC: 1.2,
} as const;

/**
 * Standardized Easing Curves for Cinematic & UI Transitions.
 */
export const MOTION_EASES = {
  OUT: 'power2.out',
  IN_OUT: 'power2.inOut',
  CINEMATIC: 'power3.out',
  EXPRESSIVE: 'expo.out',
  SUBTLE: 'sine.out',
} as const;

/**
 * Check if the user has requested reduced motion at the OS/browser level.
 */
export function isReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Execute a GSAP animation that honors prefers-reduced-motion.
 * If reduced motion is requested, properties are applied immediately without animation.
 */
export function safeAnimate(
  target: gsap.TweenTarget,
  vars: gsap.TweenVars,
): gsap.core.Tween {
  if (isReducedMotion()) {
    return gsap.set(target, vars as gsap.TweenVars);
  }
  return gsap.to(target, {
    ease: MOTION_EASES.CINEMATIC,
    duration: MOTION_DURATIONS.NORMAL,
    ...vars,
  });
}
