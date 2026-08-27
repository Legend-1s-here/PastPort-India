import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, MapPin, Sparkles, ShieldCheck, Castle } from 'lucide-react';
import { MONUMENTS, SHANIWAR_WADA_DATA } from '@/data/monuments';
import { Badge } from '@/components/ui';
import { gsap, isReducedMotion } from '@/lib/motion/motion';

export const FeaturedDestinations: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isReduced = isReducedMotion();
  const tajMahal = MONUMENTS[0];
  const shaniwarWada = SHANIWAR_WADA_DATA;

  useEffect(() => {
    if (isReduced || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current!.children,
        { opacity: 0, y: 35 },
        {
          scrollTrigger: {
            trigger: cardsRef.current!,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isReduced]);

  return (
    <section ref={containerRef} className="space-y-10 sm:space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-brass-500/20 pb-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-display font-semibold uppercase tracking-[0.25em] text-brass-400">
            <Compass className="w-3.5 h-3.5 text-brass-400" />
            <span>Curated Heritage Index</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-parchment-100 tracking-tight">
            Featured Destinations
          </h2>
        </div>
        <p className="font-editorial text-sm sm:text-base text-sandstone-300 max-w-md leading-relaxed italic">
          Step inside verified spatial reconstructions of India&apos;s most iconic architectural wonders,
          crowned with peer-reviewed archaeological ledgers.
        </p>
      </div>

      {/* Featured Showcase Cards Container */}
      <div ref={cardsRef} className="space-y-8 sm:space-y-10">
        {/* 1. Flagship Hero Card: Taj Mahal */}
        {tajMahal && (
          <Link
            to={`/monuments/${tajMahal.slug}`}
            className="group block relative rounded-3xl overflow-hidden bg-charcoal-900 border-2 border-brass-500/40 hover:border-brass-400 shadow-2xl shadow-charcoal-950/90 transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-400"
          >
            {/* Subtle Architectural Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,164,76,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,164,76,0.04)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-0 relative z-10">
              {/* Visual Anchor (7 cols) */}
              <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[420px] lg:min-h-[480px] overflow-hidden bg-charcoal-950">
                <img
                  src={tajMahal.heroImage}
                  alt={tajMahal.heroImageAlt || tajMahal.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t via-charcoal-950/20 from-charcoal-950/95 to-transparent" />

                {/* Badges & Geographic Coordinates */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <Badge variant="terracotta">Flagship 3D Experience</Badge>
                  <span className="bg-charcoal-950/90 backdrop-blur-md text-[10px] font-mono text-sandstone-300 px-2.5 py-1 rounded-md border border-brass-500/30">
                    Agra &bull; 1631–1648 CE
                  </span>
                </div>

                {/* Title on Image */}
                <div className="absolute bottom-5 left-5 right-5 space-y-1">
                  <div className="flex items-center space-x-2 text-brass-300 text-xs font-semibold">
                    <MapPin className="w-4 h-4 text-terracotta-400" />
                    <span>{tajMahal.location}</span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-parchment-100 text-gold-gradient tracking-wide">
                    {tajMahal.name}
                  </h3>
                </div>
              </div>

              {/* Content Dossier (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-charcoal-900/95 border-t lg:border-t-0 lg:border-l border-brass-500/20">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
                    <span className="text-[10px] font-display uppercase tracking-widest text-brass-400 font-bold">
                      ARCHIVAL DOSSIER // ASI-TM-01
                    </span>
                    <div className="flex items-center space-x-1.5 text-[11px] text-sandstone-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-brass-400" />
                      <span>UNESCO Inscribed 1983</span>
                    </div>
                  </div>

                  <p className="font-editorial text-sm sm:text-base text-sandstone-200 leading-relaxed italic">
                    &ldquo;{tajMahal.shortDescription}&rdquo;
                  </p>

                  {/* Highlights Stats */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {tajMahal.historicalHighlights.map((hl) => (
                      <div
                        key={hl.id}
                        className="bg-charcoal-950/80 p-2.5 rounded-xl border border-charcoal-800 space-y-0.5"
                      >
                        <span className="text-[9px] text-sandstone-400 uppercase tracking-wider font-semibold block">
                          {hl.label}
                        </span>
                        <span className="font-display text-xs sm:text-sm font-bold text-brass-300 block">
                          {hl.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Prompt */}
                <div className="pt-2">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-brass-500/10 border border-brass-500/30 group-hover:bg-brass-500/20 group-hover:border-brass-400 transition-all duration-300">
                    <div className="flex items-center space-x-2.5">
                      <Sparkles className="w-4 h-4 text-brass-400" />
                      <span className="font-display text-xs sm:text-sm font-bold text-parchment-100">
                        Launch 3D Orbit Reconstruction
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-brass-400 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* 2. Large Premium Featured Card: Shaniwar Wada */}
        <Link
          to={`/monuments/${shaniwarWada.slug}`}
          className="group block relative rounded-3xl overflow-hidden bg-charcoal-900 border-2 border-brass-500/40 hover:border-brass-400 shadow-2xl shadow-charcoal-950/90 transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-400"
        >
          {/* Subtle Architectural Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,164,76,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,164,76,0.04)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-0 relative z-10">
            {/* Visual Anchor (7 cols) */}
            <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[420px] lg:min-h-[480px] overflow-hidden bg-charcoal-950">
              <img
                src={shaniwarWada.heroImage}
                alt={shaniwarWada.heroImageAlt || shaniwarWada.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t via-charcoal-950/20 from-charcoal-950/95 to-transparent" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <Badge variant="brass">
                  <span className="flex items-center space-x-1">
                    <Castle className="w-3 h-3 text-charcoal-950" />
                    <span>Maratha Citadel</span>
                  </span>
                </Badge>
                <span className="bg-charcoal-950/90 backdrop-blur-md text-[10px] font-mono text-sandstone-300 px-2.5 py-1 rounded-md border border-brass-500/30">
                  Pune &bull; Built 1732 CE
                </span>
              </div>

              {/* Title on Image */}
              <div className="absolute bottom-5 left-5 right-5 space-y-1">
                <div className="flex items-center space-x-2 text-brass-300 text-xs font-semibold">
                  <MapPin className="w-4 h-4 text-terracotta-400" />
                  <span>{shaniwarWada.location}</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-parchment-100 text-gold-gradient tracking-wide">
                  {shaniwarWada.name}
                </h3>
              </div>
            </div>

            {/* Content Dossier (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-charcoal-900/95 border-t lg:border-t-0 lg:border-l border-brass-500/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
                  <span className="text-[10px] font-display uppercase tracking-widest text-brass-400 font-bold">
                    ARCHIVAL DOSSIER // ASI-SW-02
                  </span>
                  <div className="flex items-center space-x-1.5 text-[11px] text-sandstone-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-brass-400" />
                    <span>ASI Protected Site</span>
                  </div>
                </div>

                <p className="font-editorial text-sm sm:text-base text-sandstone-200 leading-relaxed italic">
                  &ldquo;{shaniwarWada.shortDescription}&rdquo;
                </p>

                {/* Highlights Stats */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {shaniwarWada.historicalHighlights.map((hl) => (
                    <div
                      key={hl.id}
                      className="bg-charcoal-950/80 p-2.5 rounded-xl border border-charcoal-800 space-y-0.5"
                    >
                      <span className="text-[9px] text-sandstone-400 uppercase tracking-wider font-semibold block">
                        {hl.label}
                      </span>
                      <span className="font-display text-xs sm:text-sm font-bold text-brass-300 block">
                        {hl.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Prompt */}
              <div className="pt-2">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-brass-500/20 via-brass-500/10 to-brass-500/20 border border-brass-500/40 group-hover:border-brass-400 group-hover:from-brass-500/30 group-hover:to-brass-500/30 transition-all duration-300 shadow-lg shadow-brass-500/10">
                  <div className="flex items-center space-x-2.5">
                    <Sparkles className="w-4 h-4 text-brass-400" />
                    <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-brass-300 group-hover:text-parchment-100 transition-colors">
                      EXPLORE MONUMENT &rarr;
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-brass-400 group-hover:translate-x-1.5 transition-transform duration-200" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
