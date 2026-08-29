import React, { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/motion/motion';
import { MuseumScene } from './MuseumScene';

export const MuseumExperience: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const reduced = isReducedMotion();

  // Directly map scroll progress (0 -> 1)
  const museumProgress = Math.min(1, Math.max(0, scrollProgress));

  // Title fades out as camera moves down the hall
  const titleOpacity = scrollProgress < 0.05
    ? 1
    : scrollProgress > 0.25
      ? 0
      : 1 - ((scrollProgress - 0.05) / 0.20);

  // Initial scroll indicator visible at top
  const scrollIndicatorOpacity = scrollProgress < 0.1 ? 1 - scrollProgress / 0.1 : 0;

  // GSAP ScrollTrigger Setup
  useEffect(() => {
    if (!trackRef.current || !viewportRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: trackRef.current!,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });

      // Entrance animation
      if (!reduced && titleRef.current && scrollIndicatorRef.current) {
        const entryTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        entryTl
          .fromTo(viewportRef.current, { opacity: 0 }, { opacity: 1, duration: 1.0 })
          .fromTo(
            titleRef.current,
            { opacity: 0, y: 20, filter: 'blur(6px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 },
            '-=0.6',
          )
          .fromTo(
            scrollIndicatorRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.6 },
            '-=0.4',
          );
      }
    }, trackRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={trackRef}
      className="relative w-full"
      style={{ minHeight: reduced ? '100vh' : '220vh' }}
    >
      {/* ===== STICKY FULL-SCREEN VIEWPORT ===== */}
      <div
        ref={viewportRef}
        className="sticky top-0 left-0 w-full overflow-hidden bg-charcoal-950"
        style={{ height: '100vh' }}
      >
        {/* ===== 3D Museum Gallery ===== */}
        <div className="absolute inset-0">
          {!reduced && (
            <MuseumScene
              progress={museumProgress}
              visible={true}
            />
          )}
        </div>

        {/* ===== Title Overlay ===== */}
        <div
          ref={titleRef}
          className="absolute inset-0 flex flex-col items-center justify-start pt-20 sm:pt-24 md:pt-28 pointer-events-none z-20"
          style={{ opacity: reduced ? 0 : titleOpacity }}
        >
          <div className="text-center space-y-2 sm:space-y-2.5 px-6 max-w-xl">
            <div className="flex items-center justify-center space-x-3 mb-1">
              <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-brass-400/40" />
              <span className="text-[9px] sm:text-[10px] font-display uppercase tracking-[0.3em] text-brass-400/80 font-semibold">
                Digital Heritage Archive
              </span>
              <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-brass-400/40" />
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gold-gradient tracking-[0.16em] leading-none select-none">
              PASTPORT
            </h1>

            <p className="font-editorial text-xs sm:text-sm md:text-base text-sandstone-300/80 italic tracking-wider max-w-md mx-auto">
              Journey through India&apos;s history.
            </p>
          </div>
        </div>

        {/* ===== Scroll Indicator ===== */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          style={{ opacity: reduced ? 0 : scrollIndicatorOpacity }}
        >
          <div className="flex flex-col items-center space-y-1.5">
            <span className="text-[9px] sm:text-[10px] font-display tracking-[0.25em] text-sandstone-400/80 uppercase font-semibold">
              Scroll to Begin
            </span>
            <div className="museum-scroll-pill">
              <div className="museum-scroll-dot" />
            </div>
          </div>
        </div>

        {/* Fallback for reduced motion */}
        {reduced && (
          <div className="absolute inset-0 bg-charcoal-950 flex items-center justify-center z-0">
            <div className="text-center space-y-3 px-6">
              <h1 className="font-display text-3xl sm:text-4xl font-black text-gold-gradient tracking-wider">
                PASTPORT
              </h1>
              <p className="font-editorial text-sm text-sandstone-300 italic">
                Journey through India&apos;s history.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MuseumExperience;
