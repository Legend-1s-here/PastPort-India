import React, { useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Compass, ArrowRight, Layers, MapPin, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { MONUMENTS } from '@/data/monuments';
import { Badge, Button } from '@/components/ui';
import { gsap, isReducedMotion } from '@/lib/motion/motion';

export const DiscoverySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tajImageRef = useRef<HTMLImageElement>(null);
  const tajContentRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const flagship = MONUMENTS[0]; // Taj Mahal

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Taj Mahal Image Parallax & Scale Scrub
      if (tajImageRef.current && sectionRef.current) {
        gsap.fromTo(
          tajImageRef.current,
          { scale: 1.16, y: -20 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              end: 'bottom 15%',
              scrub: 1.2,
            },
            scale: 1.0,
            y: 20,
            ease: 'none',
          },
        );
      }

      // 2. Taj Mahal Content Stagger Reveal
      if (tajContentRef.current) {
        gsap.fromTo(
          tajContentRef.current.children,
          { opacity: 0, y: 35 },
          {
            scrollTrigger: {
              trigger: tajContentRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power3.out',
          },
        );
      }

      // 3. Secondary Archival Section Reveal
      if (secondaryRef.current) {
        gsap.fromTo(
          secondaryRef.current,
          { opacity: 0, y: 40 },
          {
            scrollTrigger: {
              trigger: secondaryRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="space-y-12 sm:space-y-16">
      {/* Section Header with Archival Framing */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-brass-500/20 pb-5">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[10px] font-display font-semibold uppercase tracking-widest text-brass-400/90">
            <Compass className="w-3.5 h-3.5" />
            <span>ARCHIVAL SECTION &bull; 01 // MONUMENT EXPEDITIONS</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-black text-parchment-100 tracking-tight">
            Portals into Indian History
          </h2>
        </div>
        <p className="font-editorial text-sm sm:text-base text-sandstone-300 max-w-md leading-relaxed">
          Step inside verified spatial reconstructions complete with chronological ledgers,
          architectural annotations, and institutional citations.
        </p>
      </div>

      {/* Flagship Taj Mahal Editorial Showcase */}
      <div className="relative rounded-3xl overflow-hidden bg-charcoal-900 border-2 border-brass-500/35 shadow-2xl shadow-charcoal-950/80">
        {/* Subtle Architectural Grid Lines Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,164,76,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,164,76,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="grid lg:grid-cols-12 gap-0 relative z-10">
          {/* Visual Anchor (7 cols): Large Architectural Image Frame */}
          <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] overflow-hidden bg-charcoal-950">
            <img
              ref={tajImageRef}
              src={flagship.heroImage}
              alt={flagship.heroImageAlt || flagship.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t via-charcoal-950/20 from-charcoal-950/90 to-transparent" />

            {/* Architectural Coordinates Badge */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="bg-charcoal-950/90 backdrop-blur-md text-[10px] font-mono text-sandstone-300 px-2.5 py-1 rounded border border-brass-500/30">
                27°10&apos;30&quot;N 78°02&apos;31&quot;E &bull; ALT 171m
              </span>
              <Badge variant="terracotta">Flagship Experience &bull; MVP</Badge>
            </div>

            {/* Monument Name Overlay */}
            <div className="absolute bottom-5 left-5 right-5 space-y-1">
              <div className="flex items-center space-x-2 text-brass-300 text-xs font-semibold">
                <MapPin className="w-4 h-4 text-terracotta-400" />
                <span>{flagship.location}</span>
                <span className="text-sandstone-500">&bull;</span>
                <span>{flagship.period}</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-parchment-100 tracking-tight text-gold-gradient">
                {flagship.name}
              </h3>
            </div>
          </div>

          {/* Dossier & Architectural Highlights (5 cols) */}
          <div
            ref={tajContentRef}
            className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-charcoal-900/90 border-t lg:border-t-0 lg:border-l border-brass-500/20"
          >
            {/* Header / Inscription Note */}
            <div className="space-y-4">
              <div className="border-b border-charcoal-800 pb-3 flex items-center justify-between">
                <span className="text-[10px] font-display uppercase tracking-widest text-brass-400 font-bold">
                  ARCHIVAL DOSSIER // ASI-TM-01
                </span>
                <div className="flex items-center space-x-1 text-[11px] text-sandstone-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-brass-400" />
                  <span>UNESCO Inscribed 1983</span>
                </div>
              </div>

              <p className="font-editorial text-sm sm:text-base text-sandstone-200 leading-relaxed italic">
                &ldquo;{flagship.historicalSummary || flagship.shortDescription}&rdquo;
              </p>

              {/* Architectural Statistics Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {flagship.historicalHighlights.map((hl) => (
                  <div
                    key={hl.id}
                    className="bg-charcoal-950/80 p-3 rounded-xl border border-charcoal-700/80 space-y-0.5"
                  >
                    <span className="text-[10px] text-sandstone-400 uppercase tracking-wider font-semibold block">
                      {hl.label}
                    </span>
                    <span className="font-display text-sm font-bold text-brass-300 block">
                      {hl.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Verified Capabilities Checklist */}
              <div className="space-y-2 pt-2 border-t border-charcoal-800 text-xs text-sandstone-300">
                <span className="text-[11px] font-display uppercase tracking-wider text-sandstone-400 font-semibold block">
                  Included Spatial Features
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brass-400 shrink-0" />
                    <span>3D Orbit Reconstruct</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brass-400 shrink-0" />
                    <span>4 Verified Hotspots</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brass-400 shrink-0" />
                    <span>Chronological Timeline</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brass-400 shrink-0" />
                    <span>AR &amp; VR Fallbacks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Launch Action */}
            <div className="pt-2 space-y-2.5">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate(`/monuments/${flagship.slug}`)}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full shadow-xl shadow-brass-500/25"
              >
                Launch Taj Mahal Experience
              </Button>

              <div className="flex items-center justify-between text-[11px] text-sandstone-500 pt-1">
                <span>ASI Agra Circle Certified</span>
                <span className="text-brass-400 font-medium">UNESCO World Heritage</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Archival Docket: Shaniwar Wada & National Index */}
      <div ref={secondaryRef} className="grid md:grid-cols-12 gap-6 pt-2">
        {/* Shaniwar Wada Archival Docket (7 cols) */}
        <div className="md:col-span-7 bg-charcoal-900/70 rounded-2xl p-6 sm:p-7 border border-brass-500/20 shadow-lg space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-display font-bold uppercase tracking-widest text-sandstone-400">
                ARCHIVE DOCKET &bull; 02 // MARATHA CONFEDERACY
              </span>
              <span className="text-[10px] font-mono bg-charcoal-950 text-terracotta-400 px-2 py-0.5 rounded border border-terracotta-500/30">
                IN PRODUCTION
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="font-display text-2xl font-bold text-parchment-100">
                Shaniwar Wada Palace
              </h4>
              <p className="text-xs text-sandstone-400 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-terracotta-400" />
                <span>Pune, Maharashtra &bull; Built 1732 CE by Peshwa Baji Rao I</span>
              </p>
            </div>

            <p className="font-editorial text-sm text-sandstone-300 leading-relaxed">
              The seven-story fortified residence of the Peshwa rulers. Historic gateway to the
              Deccan, renowned for the teak Dilli Darwaza, lotus fountains, and five monumental
              bastion gates.
            </p>

            <div className="bg-charcoal-950/80 p-3 rounded-xl border border-charcoal-800 text-xs text-sandstone-400 flex items-center space-x-2.5">
              <Layers className="w-4 h-4 text-brass-400 shrink-0" />
              <span>3D photogrammetry and bastion hotspot mapping currently under archival compilation.</span>
            </div>
          </div>

          <div className="pt-3 border-t border-charcoal-800 flex items-center justify-between text-xs text-sandstone-500">
            <span>Archival Status: Phase 2 Ingestion</span>
            <span className="font-semibold text-brass-400/80">Coming in Future Release</span>
          </div>
        </div>

        {/* National Catalogue Index (5 cols) */}
        <div className="md:col-span-5 surface-parchment rounded-2xl p-6 sm:p-7 shadow-lg flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-charcoal-700">
              <FileText className="w-4 h-4 text-brass-700" />
              <span className="text-[10px] font-display font-bold uppercase tracking-widest">
                NATIONAL MONUMENTS CATALOGUE
              </span>
            </div>

            <h4 className="font-display text-xl sm:text-2xl font-bold text-charcoal-950 leading-tight">
              Explore All Archival Monuments
            </h4>

            <p className="font-editorial text-sm text-charcoal-800 leading-relaxed italic">
              Search our growing national database of Indian historical architecture, UNESCO
              inscriptions, and verified chronological timelines.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/monuments/taj-mahal"
              className="inline-flex items-center space-x-2 text-xs font-bold text-charcoal-950 bg-sandstone-300 hover:bg-brass-500 border border-charcoal-800/20 px-4 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              <span>Explore Flagship Heritage</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverySection;
