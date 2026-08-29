import React, { useRef, useEffect } from 'react';
import { Layers, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui';
import { gsap, isReducedMotion } from '@/lib/motion/motion';

export const HeritagePillars: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (principlesRef.current) {
        gsap.fromTo(
          principlesRef.current.children,
          { opacity: 0, x: 25 },
          {
            scrollTrigger: {
              trigger: principlesRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
          },
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="space-y-8 pt-6">
      {/* Editorial Layout: Left Intro / Right Numbered Principles */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column (5 cols): Exhibition Manifesto */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <Badge variant="brass">Exhibition Methodology</Badge>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-parchment-100 tracking-tight leading-tight">
              Engineered for Historical Rigor
            </h3>
            <p className="font-editorial text-sm sm:text-base text-sandstone-300 leading-relaxed">
              How PastPort India transforms centuries of architectural devotion into accessible,
              browser-native spatial explorations.
            </p>
          </div>

          {/* Mission Quote Parchment Block */}
          <div className="surface-parchment rounded-2xl p-6 shadow-xl space-y-3 relative overflow-hidden">
            <div className="flex items-center space-x-2 text-charcoal-700">
              <BookOpen className="w-4 h-4 text-brass-700" />
              <span className="text-[10px] font-display font-bold uppercase tracking-widest">
                ARCHIVAL MANIFESTO &bull; SIH26197
              </span>
            </div>
            <p className="font-editorial text-sm sm:text-base text-charcoal-950 leading-relaxed italic">
              &ldquo;Preserving India&apos;s monumental heritage through source-backed spatial
              technology, making centuries of sacred geometry tangible for the modern world.&rdquo;
            </p>
          </div>
        </div>

        {/* Right Column (7 cols): Numbered Archival Principles */}
        <div
          ref={principlesRef}
          className="lg:col-span-7 divide-y divide-brass-500/20 bg-charcoal-900/60 rounded-3xl p-6 sm:p-8 border border-brass-500/25 shadow-2xl"
        >
          {/* Principle 01 */}
          <div className="pb-6 space-y-2.5">
            <div className="flex items-center space-x-3">
              <span className="font-display text-2xl sm:text-3xl font-black text-brass-400">
                01
              </span>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-brass-400" />
                <h4 className="font-display text-base sm:text-lg font-bold text-parchment-100">
                  Verified Archaeological Source Ledger
                </h4>
              </div>
            </div>
            <p className="font-editorial text-sm text-sandstone-300 leading-relaxed pl-10">
              Every architectural hotspot, chronological milestone, and structural dimension
              directly cites certified Archaeological Survey of India (ASI) circles, UNESCO World
              Heritage documents, and peer-reviewed monument surveys.
            </p>
          </div>

          {/* Principle 02 */}
          <div className="py-6 space-y-2.5">
            <div className="flex items-center space-x-3">
              <span className="font-display text-2xl sm:text-3xl font-black text-brass-400">
                02
              </span>
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-brass-400" />
                <h4 className="font-display text-base sm:text-lg font-bold text-parchment-100">
                  Unified Spatial Reconstructive Core
                </h4>
              </div>
            </div>
            <p className="font-editorial text-sm text-sandstone-300 leading-relaxed pl-10">
              A single, precision-modeled 3D asset definition serves the standard interactive
              WebGL orbit viewer, mobile camera surface AR, and WebXR virtual reality sessions
              without requiring external software installations.
            </p>
          </div>

          {/* Principle 03 */}
          <div className="pt-6 space-y-2.5">
            <div className="flex items-center space-x-3">
              <span className="font-display text-2xl sm:text-3xl font-black text-brass-400">
                03
              </span>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-brass-400" />
                <h4 className="font-display text-base sm:text-lg font-bold text-parchment-100">
                  Universal Device Fallback Integrity
                </h4>
              </div>
            </div>
            <p className="font-editorial text-sm text-sandstone-300 leading-relaxed pl-10">
              Hardware capability detection runs in real-time. If an Android smartphone or desktop
              browser lacks AR camera sensors or VR headset sessions, the platform cleanly routes
              the user into the full-featured Web 3D interactive viewer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeritagePillars;
