import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, BookOpen, ArrowDown, Sparkles } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { HistoricalBook } from './HistoricalBook';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/motion/motion';

interface CinematicHeroProps {
  onScrollToDiscovery?: () => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({ onScrollToDiscovery }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const bgGlowRef = useRef<HTMLDivElement>(null);
  const headerContentRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Initial Mount Entrance Sequence on Page Load
      const entryTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      entryTl
        .fromTo(
          viewportRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.9 },
        )
        .fromTo(
          headerContentRef.current,
          { opacity: 0, y: -25 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.5',
        )
        .fromTo(
          titleLine1Ref.current,
          { opacity: 0, y: 40, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.75 },
          '-=0.35',
        )
        .fromTo(
          titleLine2Ref.current,
          { opacity: 0, y: 40, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.75 },
          '-=0.55',
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4',
        )
        .fromTo(
          actionsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.4',
        );

      // 2. ScrollTrigger Track Binding: Continuous scroll progress driving the 3D codex opening & 10 page turns
      if (trackRef.current && viewportRef.current) {
        ScrollTrigger.create({
          trigger: trackRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        });

        // Parallax & Fade for Typography as scroll progresses
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
          },
        });

        if (headerContentRef.current && actionsRef.current) {
          scrollTl.to(
            headerContentRef.current,
            {
              y: -75,
              opacity: 0,
              filter: 'blur(6px)',
              duration: 0.18,
              ease: 'power2.in',
            },
            0,
          );
          scrollTl.to(
            actionsRef.current,
            {
              y: 35,
              opacity: 0,
              duration: 0.15,
              ease: 'power2.in',
            },
            0,
          );
        }

        if (bgGlowRef.current) {
          scrollTl.to(
            bgGlowRef.current,
            {
              scale: 1.5,
              opacity: 0.45,
              y: 80,
              duration: 1.0,
              ease: 'none',
            },
            0,
          );
        }
      }
    }, trackRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={trackRef} className="relative w-full lg:min-h-[340vh] min-h-[1050px]">
      {/* Pinned / Sticky Cinematic Viewport */}
      <section
        ref={viewportRef}
        className="lg:sticky lg:top-12 lg:h-[calc(100vh-3.5rem)] relative rounded-3xl overflow-hidden surface-cinematic p-4 sm:p-6 md:p-8 text-center flex flex-col items-center justify-between min-h-[720px] border border-brass-500/20 shadow-2xl shadow-charcoal-950/90"
      >
        {/* Layered Atmospheric Ambient Glow */}
        <div
          ref={bgGlowRef}
          className="absolute -top-36 inset-x-0 mx-auto w-[560px] h-[560px] bg-gradient-to-b from-brass-500/20 via-brass-600/5 to-transparent rounded-full blur-3xl pointer-events-none"
        />
        <div className="absolute top-1/3 -left-40 w-[420px] h-[420px] bg-terracotta-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-40 w-[420px] h-[420px] bg-burgundy-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Hero Header & Sequential Typography */}
        <div ref={headerContentRef} className="relative z-10 max-w-3xl space-y-2 pt-1">
          <div className="inline-flex justify-center">
            <Badge variant="brass">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PastPort India &bull; Archival Codex Exploration</span>
            </Badge>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-parchment-100 tracking-tight leading-[1.1]">
            <span ref={titleLine1Ref} className="block">
              HISTORY SHOULD BE
            </span>
            <span ref={titleLine2Ref} className="text-gold-gradient block mt-0.5">
              EXPERIENCED.
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="font-editorial text-xs sm:text-base text-sandstone-300 max-w-2xl mx-auto leading-relaxed"
          >
            Scroll down to physically open the ancient codex, turn through archival pages, and discover India&apos;s monuments.
          </p>
        </div>

        {/* Central Visual Centerpiece: The Continuous 3D Scroll Codex */}
        <div className="relative z-10 w-full my-auto py-2">
          <HistoricalBook progress={scrollProgress} />
        </div>

        {/* Action Controls & Scroll Prompt */}
        <div
          ref={actionsRef}
          className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full pb-1"
        >
          <Button
            size="md"
            onClick={() => {
              if (onScrollToDiscovery) {
                onScrollToDiscovery();
              }
            }}
            leftIcon={<BookOpen className="w-4 h-4" />}
            className="w-full sm:w-auto shadow-lg shadow-brass-500/20"
          >
            Scroll to Open Archive
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={() => navigate('/monuments/taj-mahal')}
            leftIcon={<Compass className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Explore Flagship Monument
          </Button>

          {onScrollToDiscovery && (
            <button
              type="button"
              onClick={onScrollToDiscovery}
              className="sm:hidden text-xs text-sandstone-400 flex items-center space-x-1.5 pt-1 hover:text-brass-300 transition-colors cursor-pointer"
            >
              <span>Scroll to Explore</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default CinematicHero;
