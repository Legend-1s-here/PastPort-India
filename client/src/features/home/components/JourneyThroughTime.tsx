import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Layers, ShieldCheck, ArrowRight, Eye } from 'lucide-react';
import { Badge, Surface } from '@/components/ui';
import { gsap, isReducedMotion } from '@/lib/motion/motion';

export const JourneyThroughTime: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const isReduced = isReducedMotion();

  useEffect(() => {
    if (isReduced || !pillarsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        pillarsRef.current!.children,
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: pillarsRef.current!,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isReduced]);

  return (
    <section ref={containerRef} className="space-y-12 sm:space-y-16">
      {/* Editorial Mission Manifesto */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <Badge variant="brass">The PastPort Vision</Badge>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-parchment-100 tracking-tight leading-tight">
              A Journey Through Time
            </h2>
            <p className="font-editorial text-base sm:text-lg text-sandstone-300 leading-relaxed italic">
              History shouldn&apos;t just be read in textbooks—it should be walked through,
              examined in three dimensions, and experienced through the eyes of the master artisans who built it.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-sandstone-400 leading-relaxed font-sans">
            PastPort India bridges centuries of architectural genius with modern spatial computing.
            Every column proportion, dome curve, and fresco detail is reconstructed directly from
            the archives of the Archaeological Survey of India (ASI) and UNESCO World Heritage records.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              to="/monuments/taj-mahal"
              className="inline-flex items-center space-x-2.5 text-xs sm:text-sm font-display font-bold text-charcoal-950 bg-gradient-to-r from-brass-400 via-brass-300 to-brass-400 hover:from-brass-300 hover:to-brass-200 px-6 py-3.5 rounded-xl shadow-xl shadow-brass-500/25 transition-all duration-300"
            >
              <Compass className="w-4 h-4 text-charcoal-950" />
              <span>Explore Flagship Heritage</span>
            </Link>

            <Link
              to="/experience/taj-mahal-3d"
              className="inline-flex items-center space-x-2 text-xs sm:text-sm font-display font-bold text-parchment-100 bg-charcoal-900 hover:bg-charcoal-850 px-6 py-3.5 rounded-xl border border-brass-500/35 hover:border-brass-400 transition-all duration-300"
            >
              <span>Launch Taj Mahal 3D</span>
              <ArrowRight className="w-4 h-4 text-brass-400" />
            </Link>
          </div>
        </div>

        {/* Right Column (6 cols): Visual Parchment Manifesto */}
        <div className="lg:col-span-6">
          <Surface variant="parchment" className="p-6 sm:p-8 rounded-3xl shadow-2xl space-y-5 relative overflow-hidden">
            {/* Corner Filigree */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-sandstone-600/40" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-sandstone-600/40" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-sandstone-600/40" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-sandstone-600/40" />

            <div className="flex items-center justify-between border-b border-sandstone-400/50 pb-3">
              <span className="text-[10px] font-display font-bold uppercase tracking-widest text-charcoal-800">
                ARCHIVAL METHODOLOGY &bull; SIH26197
              </span>
              <Badge variant="charcoal" className="text-[9px] py-0.5">
                VERIFIED ARCHIVE
              </Badge>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-charcoal-950 leading-tight">
              &ldquo;Preserving India&apos;s sacred geometry and monumental devotion for the next thousand years.&rdquo;
            </h3>

            <p className="font-editorial text-xs sm:text-sm text-charcoal-800 leading-relaxed italic">
              From the 2,200-year-old rock-cut chaityas of Ajanta to the celestial solar chariot of Konark,
              our platform empowers students, travelers, and historians worldwide to step inside living history.
            </p>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-sandstone-400/50 text-center text-charcoal-900">
              <div className="p-2">
                <span className="font-display text-lg sm:text-xl font-bold text-brass-800 block">
                  5,000+
                </span>
                <span className="text-[9px] font-display uppercase tracking-wider text-charcoal-700">
                  Years of History
                </span>
              </div>
              <div className="p-2 border-x border-sandstone-400/50">
                <span className="font-display text-lg sm:text-xl font-bold text-brass-800 block">
                  100%
                </span>
                <span className="text-[9px] font-display uppercase tracking-wider text-charcoal-700">
                  Browser-Native 3D
                </span>
              </div>
              <div className="p-2">
                <span className="font-display text-lg sm:text-xl font-bold text-brass-800 block">
                  ASI &bull; UNESCO
                </span>
                <span className="text-[9px] font-display uppercase tracking-wider text-charcoal-700">
                  Citations
                </span>
              </div>
            </div>
          </Surface>
        </div>
      </div>

      {/* 4 Interactive Feature Pillars */}
      <div ref={pillarsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {/* Pillar 1 */}
        <div className="p-6 rounded-2xl bg-charcoal-900/80 border border-brass-500/25 space-y-3 shadow-xl hover:border-brass-400/60 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-brass-500/15 flex items-center justify-center text-brass-400 border border-brass-500/30">
            <Eye className="w-5 h-5" />
          </div>
          <h4 className="font-display text-base font-bold text-parchment-100">
            Spatial 3D Reconstruction
          </h4>
          <p className="text-xs text-sandstone-400 leading-relaxed font-sans">
            Explore millimeter-accurate 3D digital twins of historical monuments with smooth 360° orbit, zoom, and perspective controls.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="p-6 rounded-2xl bg-charcoal-900/80 border border-brass-500/25 space-y-3 shadow-xl hover:border-brass-400/60 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-brass-500/15 flex items-center justify-center text-brass-400 border border-brass-500/30">
            <Layers className="w-5 h-5" />
          </div>
          <h4 className="font-display text-base font-bold text-parchment-100">
            Architectural Hotspots
          </h4>
          <p className="text-xs text-sandstone-400 leading-relaxed font-sans">
            Interact with verified spatial hotspots highlighting structural innovations, minaret seismology, dome mathematics, and pietra dura inlays.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="p-6 rounded-2xl bg-charcoal-900/80 border border-brass-500/25 space-y-3 shadow-xl hover:border-brass-400/60 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-brass-500/15 flex items-center justify-center text-brass-400 border border-brass-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="font-display text-base font-bold text-parchment-100">
            AR &amp; VR Experience
          </h4>
          <p className="text-xs text-sandstone-400 leading-relaxed font-sans">
            Project monuments directly onto your physical tabletop using WebXR AR or step inside 1:1 scale virtual reality directly in the browser.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="p-6 rounded-2xl bg-charcoal-900/80 border border-brass-500/25 space-y-3 shadow-xl hover:border-brass-400/60 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-brass-500/15 flex items-center justify-center text-brass-400 border border-brass-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-display text-base font-bold text-parchment-100">
            Source-Backed Integrity
          </h4>
          <p className="text-xs text-sandstone-400 leading-relaxed font-sans">
            Every date, dimension, and historical statement is cross-referenced against ASI Circle records and UNESCO Inscription documentation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default JourneyThroughTime;
