import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, Compass, ArrowRight, ShieldCheck, Layers, Sparkles, MapPin, ChevronRight } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { MONUMENTS } from '@/data/monuments';
import { isReducedMotion } from '@/lib/motion/motion';

export interface HistoricalBookProps {
  /**
   * Scroll progress from parent ScrollTrigger (0.0 to 1.0)
   * 0.00 - 0.10: Completely Closed 3D Codex
   * 0.10 - 0.22: Front Cover opens 3D (-180°) & Book expands to dual spread
   * 0.22 - 0.74: Rapid archival page flipping (10 physical pages turn sequentially!)
   * 0.74 - 1.00: Final Monument Discovery Spread (Taj Mahal Flagship)
   */
  progress?: number;
  className?: string;
}

// 10 Archival Pages that flip sequentially across the spine
interface PageLeaf {
  id: number;
  turnStart: number;
  turnEnd: number;
  folio: string;
  frontContent: {
    type: 'parchment_blank' | 'watermark' | 'sketch' | 'blueprint' | 'narrative';
    title?: string;
    body?: string;
    stamp?: string;
  };
  backContent: {
    type: 'parchment_blank' | 'watermark' | 'sketch' | 'blueprint' | 'narrative';
    title?: string;
    body?: string;
    stamp?: string;
  };
}

const FLIP_PAGES: PageLeaf[] = [
  {
    id: 1,
    turnStart: 0.23,
    turnEnd: 0.28,
    folio: 'Folio 01',
    frontContent: {
      type: 'parchment_blank',
      stamp: 'ASI ARCHIVAL REGISTRY // LIB-1631',
    },
    backContent: {
      type: 'watermark',
      title: 'ANCIENT MONUMENT RECORDS',
      body: 'Survey ledgers from the Archaeological Survey of India (Agra & Northern Circles).',
    },
  },
  {
    id: 2,
    turnStart: 0.28,
    turnEnd: 0.33,
    folio: 'Folio 02',
    frontContent: {
      type: 'watermark',
      title: 'IMPERIAL LEDGERS',
      stamp: 'MUGHAL EMPIRE // YAMUNA BASIN',
    },
    backContent: {
      type: 'parchment_blank',
      stamp: 'CERTIFIED MANUSCRIPT ENTRY',
    },
  },
  {
    id: 3,
    turnStart: 0.33,
    turnEnd: 0.38,
    folio: 'Folio 03',
    frontContent: {
      type: 'sketch',
      title: 'Preliminary Site Geometry',
      body: 'Compass survey lines of the southern riverbank and alluvial soil compaction.',
    },
    backContent: {
      type: 'parchment_blank',
      stamp: 'GEOMETRIC SURVEY',
    },
  },
  {
    id: 4,
    turnStart: 0.38,
    turnEnd: 0.43,
    folio: 'Folio 04',
    frontContent: {
      type: 'parchment_blank',
      stamp: 'MATERIAL SELECTION // MAKRANA MARBLE',
    },
    backContent: {
      type: 'sketch',
      title: 'Quarrying Records',
      body: 'White translucent marble transported over 300km from Makrana on carts.',
    },
  },
  {
    id: 5,
    turnStart: 0.43,
    turnEnd: 0.48,
    folio: 'Folio 05',
    frontContent: {
      type: 'sketch',
      title: 'Pietra Dura Inlay Studies',
      body: 'Lapis lazuli from Badakhshan, turquoise from Tibet, and carnelian from Yemen.',
    },
    backContent: {
      type: 'parchment_blank',
      stamp: 'LAPIDARY CRAFT',
    },
  },
  {
    id: 6,
    turnStart: 0.48,
    turnEnd: 0.53,
    folio: 'Folio 06',
    frontContent: {
      type: 'blueprint',
      title: 'Minaret Seismic Alignment',
      body: 'Four 40-meter minarets engineered to lean 1.5° outward to prevent falling on the dome during earthquakes.',
    },
    backContent: {
      type: 'watermark',
      title: 'STRUCTURAL CALCULATIONS',
      body: 'ASI Architectural Conservation Report, Plate IV.',
    },
  },
  {
    id: 7,
    turnStart: 0.53,
    turnEnd: 0.58,
    folio: 'Folio 07',
    frontContent: {
      type: 'blueprint',
      title: 'Central Onion Dome Section',
      body: 'Double-dome construction technique: 35m outer marble dome with an inner acoustic chamber.',
    },
    backContent: {
      type: 'sketch',
      title: 'Lotus Finial Elevation',
      body: 'Gilded brass finial ascending 10 meters above the marble crown.',
    },
  },
  {
    id: 8,
    turnStart: 0.58,
    turnEnd: 0.63,
    folio: 'Folio 08',
    frontContent: {
      type: 'blueprint',
      title: 'Four-Fold Charbagh Garden Grid',
      body: 'Cosmological Persian garden design representing paradise with 4 dividing water channels.',
    },
    backContent: {
      type: 'parchment_blank',
      stamp: 'GARDEN ARCHITECTURE',
    },
  },
  {
    id: 9,
    turnStart: 0.63,
    turnEnd: 0.68,
    folio: 'Folio 09',
    frontContent: {
      type: 'narrative',
      title: 'Padshahnama Chronicle Excerpt',
      body: '“A palace of paradise whose like the eye of time had never beheld, nor the ear of the world ever heard of.”',
      stamp: 'COURT RECORD // 1648 CE',
    },
    backContent: {
      type: 'narrative',
      title: 'The Artisans of Ind',
      body: 'Over 20,000 master sculptors, calligraphers, and stonemasons worked continuously for 22 years.',
    },
  },
  {
    id: 10,
    turnStart: 0.68,
    turnEnd: 0.74,
    folio: 'Folio 10',
    frontContent: {
      type: 'narrative',
      title: 'Final Consecration',
      body: 'Completed in 1653 CE. Dedicated as an eternal testament of pure architectural symmetry.',
      stamp: 'UNESCO INSCRIPTION 1983',
    },
    backContent: {
      type: 'watermark',
      title: 'ENTERING MONUMENT PORTALS',
      body: 'Opening the spatial reconstruction index...',
    },
  },
];

export const HistoricalBook: React.FC<HistoricalBookProps> = ({
  progress = 0,
  className = '',
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const bookRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const flagship = MONUMENTS[0]; // Taj Mahal

  const isReduced = isReducedMotion();

  // 1. Cover Opening Progress (0 = closed, 1 = fully open)
  let openProgress = 0;
  let coverAngle = 0;

  if (isReduced) {
    openProgress = 1;
    coverAngle = -180;
  } else if (progress < 0.10) {
    openProgress = 0;
    coverAngle = 0;
  } else if (progress < 0.22) {
    openProgress = (progress - 0.10) / 0.12;
    coverAngle = -180 * Math.min(1, Math.max(0, openProgress));
  } else {
    openProgress = 1;
    coverAngle = -180;
  }

  // 2. Individual Page Angles
  const pageAngles = FLIP_PAGES.map((page) => {
    if (isReduced) return -180;
    if (progress < page.turnStart) return 0;
    if (progress >= page.turnEnd) return -180;
    const p = (progress - page.turnStart) / (page.turnEnd - page.turnStart);
    return -180 * Math.min(1, Math.max(0, p));
  });

  const isClosed = openProgress === 0;

  // Mouse Parallax on Desktop when closed
  useEffect(() => {
    if (isReduced || !isClosed) {
      return;
    }

    const element = bookRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      const rotateY = Math.max(-8, Math.min(8, deltaX * 8));
      const rotateX = Math.max(-8, Math.min(8, -deltaY * 8));

      setTilt({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isClosed, isReduced]);

  const activeTilt = isClosed && !isReduced ? tilt : { x: 0, y: 0 };

  return (
    <div
      ref={bookRef}
      className={`relative w-full mx-auto select-none flex items-center justify-center ${className}`}
      style={{
        maxWidth: openProgress === 0 ? '440px' : openProgress >= 0.95 ? '920px' : `${440 + openProgress * 480}px`,
        transition: 'max-width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Ambient Lighting & Dais Shadow */}
      <div
        className="absolute -inset-10 bg-brass-500/12 rounded-full blur-3xl pointer-events-none opacity-90 transition-all duration-700"
        style={{
          transform: `translate(${activeTilt.y * 2}px, ${activeTilt.x * -2}px)`,
        }}
      />
      <div
        className="absolute -bottom-10 inset-x-8 h-16 bg-charcoal-950/95 rounded-full blur-2xl pointer-events-none transition-all duration-500"
        style={{
          transform: `scale(${1 + Math.abs(activeTilt.y) * 0.02})`,
        }}
      />

      {/* =========================================================================
          STAGE: 3D BOOK CASING
          When openProgress == 0: Renders ONLY a closed 3D antique hardcover book
          When openProgress > 0: Front cover lifts and book unfolds to reveal inner folios
          ========================================================================= */}
      <div
        className="relative w-full transition-transform duration-300 ease-out"
        style={{
          perspective: '2200px',
          transform: `rotateX(${activeTilt.x}deg) rotateY(${activeTilt.y}deg)`,
        }}
      >
        {/* ==================== 1. PURE CLOSED 3D PHYSICAL CODEX (0% Scroll) ==================== */}
        {isClosed ? (
          <div className="relative w-full max-w-[420px] mx-auto min-h-[380px] sm:min-h-[440px] rounded-2xl bg-gradient-to-br from-charcoal-900 via-charcoal-850 to-charcoal-950 p-6 sm:p-8 border-2 border-brass-500/40 shadow-2xl shadow-charcoal-950/95 transform-style-3d cursor-pointer group hover:-translate-y-2 transition-all duration-300">
            
            {/* 3D Spine On Left Edge (Leather cylinder with raised ribs & gold typography) */}
            <div className="absolute left-0 inset-y-0 w-8 sm:w-10 bg-gradient-to-r from-charcoal-950 via-charcoal-800 to-charcoal-900 rounded-l-2xl border-r border-brass-500/40 flex flex-col justify-between py-6 items-center shadow-2xl">
              <div className="w-4 h-6 bg-brass-500/35 rounded-sm border-t border-b border-brass-400/60 shadow-sm" />
              <span className="text-[9px] font-display text-brass-400/90 uppercase tracking-widest -rotate-90 whitespace-nowrap font-bold">
                PASTPORT INDIA &bull; VOL. I
              </span>
              <div className="w-4 h-6 bg-brass-500/35 rounded-sm border-t border-b border-brass-400/60 shadow-sm" />
            </div>

            {/* Visible 3D Page Block Thickness on Right & Bottom Edges */}
            <div className="absolute -right-3.5 inset-y-3 w-3.5 bg-gradient-to-r from-sandstone-300 via-parchment-300 to-sandstone-400 rounded-r-sm border-y border-charcoal-900 opacity-95 shadow-md flex flex-col justify-around py-2">
              <div className="w-full h-px bg-sandstone-500/40" />
              <div className="w-full h-px bg-sandstone-500/40" />
              <div className="w-full h-px bg-sandstone-500/40" />
              <div className="w-full h-px bg-sandstone-500/40" />
              <div className="w-full h-px bg-sandstone-500/40" />
            </div>
            <div className="absolute -bottom-3.5 inset-x-8 h-3.5 bg-gradient-to-b from-sandstone-300 via-parchment-300 to-sandstone-400 rounded-b-sm border-x border-charcoal-900 opacity-95 shadow-md flex justify-around px-2">
              <div className="h-full w-px bg-sandstone-500/40" />
              <div className="h-full w-px bg-sandstone-500/40" />
              <div className="h-full w-px bg-sandstone-500/40" />
              <div className="h-full w-px bg-sandstone-500/40" />
            </div>

            {/* Brass Filigree Corners */}
            <div className="absolute top-4 left-12 w-8 h-8 border-t-2 border-l-2 border-brass-400/70 rounded-tl" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-brass-400/70 rounded-tr" />
            <div className="absolute bottom-4 left-12 w-8 h-8 border-b-2 border-l-2 border-brass-400/70 rounded-bl" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-brass-400/70 rounded-br" />

            {/* Front Cover Artwork & Inscription */}
            <div className="ml-7 flex flex-col items-center justify-between min-h-[330px] sm:min-h-[380px] text-center space-y-4">
              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] font-display tracking-widest text-brass-400/90 uppercase font-semibold block">
                  Archaeological Survey of India &bull; Archival Codex
                </span>
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-brass-500/50 to-transparent mx-auto" />
              </div>

              {/* Central Embossed Celestial Emblem */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-brass-600/25 via-charcoal-900 to-brass-800/20 border-2 border-brass-400/60 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-1.5 rounded-full border border-dashed border-brass-400/40 animate-[spin_40s_linear_infinite]" />
                <Compass className="w-10 h-10 text-brass-400 stroke-[1.75]" />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-parchment-100 tracking-wide text-gold-gradient">
                  THE CHRONICLES OF IND
                </h3>
                <p className="font-editorial text-xs sm:text-sm text-sandstone-300 max-w-[240px] mx-auto leading-snug">
                  Monuments, Sacred Geometry &amp; Living History
                </p>
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center space-x-1.5 text-xs font-semibold text-brass-300 bg-brass-500/15 border border-brass-500/40 px-4 py-1.5 rounded-full shadow-sm group-hover:bg-brass-500 group-hover:text-charcoal-950 transition-colors">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Scroll Down to Open Codex</span>
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* ==================== 2. OPEN DUAL-PAGE SPREAD & FLIPPING PAGES ==================== */
          <div className="relative w-full min-h-[440px] sm:min-h-[490px] md:min-h-[530px] rounded-2xl bg-charcoal-950 border-2 border-brass-500/40 shadow-2xl shadow-charcoal-950/95 overflow-hidden transform-style-3d">
            
            {/* Stacked Page Thickness Simulation */}
            <div className="absolute -bottom-2.5 inset-x-6 h-3 bg-gradient-to-b from-sandstone-300 via-parchment-300 to-sandstone-400 rounded-b-sm border-x border-charcoal-900 opacity-90 shadow-md" />
            <div className="absolute -right-2 inset-y-4 w-3 bg-gradient-to-r from-sandstone-300 via-parchment-300 to-sandstone-400 rounded-r-sm border-y border-charcoal-900 opacity-90 shadow-md" />
            <div className="absolute -left-2 inset-y-4 w-3 bg-gradient-to-l from-sandstone-300 via-parchment-300 to-sandstone-400 rounded-l-sm border-y border-charcoal-900 opacity-90 shadow-md" />

            {/* Center Spine Crease (Vertical Shadow Fold) */}
            <div className="absolute left-1/2 inset-y-0 w-8 -translate-x-1/2 bg-gradient-to-r from-charcoal-950/80 via-charcoal-900/95 to-charcoal-950/80 z-35 pointer-events-none shadow-inner" />

            {/* ================= BASE INNER SPREAD ================= */}
            <div className="grid md:grid-cols-2 gap-0 min-h-[440px] sm:min-h-[490px] md:min-h-[530px]">
              
              {/* ----------------- LEFT PAGE FOUNDATION (Chapter I Inscription) ----------------- */}
              <div className="surface-parchment p-6 sm:p-8 flex flex-col justify-between space-y-4 relative overflow-hidden border-r border-sandstone-400/50">
                <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-sandstone-600/50" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-sandstone-600/50" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-sandstone-600/50" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-sandstone-600/50" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between border-b border-sandstone-400/50 pb-2.5">
                    <div className="flex items-center space-x-2">
                      <Compass className="w-4 h-4 text-brass-700" />
                      <span className="text-[10px] font-display font-bold uppercase tracking-widest text-charcoal-800">
                        CHRONICLES OF IND &bull; VOL I
                      </span>
                    </div>
                    <Badge variant="charcoal" className="text-[9px] py-0.5">
                      ASI RECORD // TM-1631
                    </Badge>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs font-display font-semibold text-terracotta-700 tracking-wider uppercase">
                      Chapter I &bull; The Mughal Zenith
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-charcoal-950 leading-tight">
                      The Marble Sanctuary on the Yamuna
                    </h3>
                  </div>

                  <p className="font-editorial text-sm sm:text-base text-charcoal-800 leading-relaxed italic">
                    &ldquo;In 1631 CE, Emperor Shah Jahan commissioned an eternal monument of
                    flawless symmetry in memory of Mumtaz Mahal. Over twenty-two years, twenty thousand
                    master artisans carved pure Makrana marble and inlaid semi-precious lapis lazuli,
                    jade, and carnelian into sacred geometry.&rdquo;
                  </p>

                  <div className="bg-sandstone-200/80 p-3 rounded-lg border border-sandstone-400/60 text-xs text-charcoal-800 space-y-1">
                    <div className="flex items-center space-x-1.5 font-semibold text-charcoal-900">
                      <ShieldCheck className="w-3.5 h-3.5 text-brass-700" />
                      <span>Archaeological Survey of India &bull; Certified Record</span>
                    </div>
                    <p className="text-[11px] text-charcoal-700">
                      Verified dimensions, architectural orientation, and 4 spatial hotspots authenticated from UNESCO World Heritage archives.
                    </p>
                  </div>
                </div>

                <div className="border-t border-sandstone-400/50 pt-2.5 flex items-center justify-between text-[11px] text-charcoal-700 font-sans relative z-10">
                  <span>Folio 01 // Archival Inscription</span>
                  <span className="text-brass-800 font-bold font-display">PASTPORT ARCHIVE</span>
                </div>
              </div>

              {/* ----------------- RIGHT UNDER-PAGE (Spread 2: Monument Discovery Plate) ----------------- */}
              <div className="bg-charcoal-950 p-6 sm:p-8 flex flex-col justify-between space-y-5 relative overflow-hidden border-l border-brass-500/20">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-charcoal-800 pb-2.5">
                    <div>
                      <span className="text-[10px] font-display font-bold uppercase tracking-widest text-brass-400 block">
                        EXPLORE INDIA&apos;S HERITAGE
                      </span>
                      <span className="text-[11px] text-sandstone-400 font-editorial italic">
                        Choose a monument and step into its story.
                      </span>
                    </div>
                    <span className="text-[10px] text-sandstone-400 font-mono bg-charcoal-900 px-2 py-0.5 rounded border border-charcoal-800">
                      DISCOVERY SPREAD
                    </span>
                  </div>

                  {/* Primary Flagship Card: Taj Mahal */}
                  <div className="group/taj relative rounded-xl bg-charcoal-900 p-4 border-2 border-brass-500/50 shadow-xl space-y-3 hover:border-brass-400 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <Badge variant="terracotta">Flagship 3D Experience</Badge>
                      <span className="text-[11px] text-sandstone-300 font-mono">
                        Agra &bull; 1631&ndash;1648 CE
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-display text-xl sm:text-2xl font-black text-parchment-100 text-gold-gradient">
                        {flagship.name}
                      </h4>
                      <p className="text-xs text-sandstone-300 flex items-center space-x-1.5 font-sans">
                        <MapPin className="w-3.5 h-3.5 text-terracotta-400" />
                        <span>{flagship.location} &bull; Mughal Architecture</span>
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-charcoal-950 p-2 rounded-lg border border-charcoal-800 flex items-center space-x-2">
                        <Layers className="w-3.5 h-3.5 text-brass-400" />
                        <span className="text-[11px] text-sandstone-300">4 Hotspots</span>
                      </div>
                      <div className="bg-charcoal-950 p-2 rounded-lg border border-charcoal-800 flex items-center space-x-2">
                        <Sparkles className="w-3.5 h-3.5 text-terracotta-400" />
                        <span className="text-[11px] text-sandstone-300">AR &amp; VR Ready</span>
                      </div>
                    </div>

                    {/* Primary Interactive Clickable Button */}
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => navigate('/monuments/taj-mahal')}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      className="w-full shadow-lg shadow-brass-500/25 mt-1"
                    >
                      Enter Taj Mahal Experience
                    </Button>
                  </div>

                  {/* Secondary Monument Teaser: Shaniwar Wada */}
                  <div className="rounded-xl bg-charcoal-900/60 p-3.5 border border-charcoal-800 flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-display font-bold text-parchment-100">
                          Shaniwar Wada Palace
                        </span>
                        <span className="text-[9px] bg-charcoal-950 text-terracotta-400 px-1.5 py-0.5 rounded border border-terracotta-500/30">
                          IN PRODUCTION
                        </span>
                      </div>
                      <p className="text-[11px] text-sandstone-400">
                        Pune, Maharashtra &bull; Built 1732 CE
                      </p>
                    </div>
                    <Link
                      to="/explore"
                      className="text-[11px] text-brass-400 hover:text-brass-300 font-semibold underline flex items-center space-x-1 shrink-0 ml-2"
                    >
                      <span>Full Catalogue</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                <div className="border-t border-charcoal-800 pt-2 flex items-center justify-between text-[11px] text-sandstone-500 font-sans">
                  <span>Folio 12 // Monument Portal</span>
                  <span className="text-brass-400 font-medium">Click Taj Mahal to launch 3D</span>
                </div>
              </div>
            </div>

            {/* ================= FLIPPING PARCHMENT PAGES (10 SEQUENTIAL 3D LEAVES) ================= */}
            {FLIP_PAGES.map((page, idx) => {
              const angle = pageAngles[idx];
              const isFlipped = angle < -90;
              const zIndex = isFlipped ? 20 + idx : 30 - idx;

              if (angle <= -178) return null;

              return (
                <div
                  key={page.id}
                  className="absolute top-0 right-0 w-1/2 h-full origin-left-center transform-style-3d pointer-events-auto transition-transform duration-100 ease-linear"
                  style={{
                    transform: `rotateY(${angle}deg)`,
                    zIndex,
                  }}
                >
                  {/* FRONT FACE (Shown on the right before turning) */}
                  <div className="absolute inset-0 w-full h-full surface-parchment border-l border-sandstone-400/50 p-6 sm:p-8 flex flex-col justify-between backface-hidden shadow-2xl overflow-hidden">
                    <div className="space-y-3 relative z-10">
                      <div className="flex items-center justify-between border-b border-sandstone-400/50 pb-2">
                        <span className="text-[10px] font-display font-bold uppercase tracking-widest text-charcoal-800">
                          {page.folio} // ARCHIVAL MANUSCRIPT
                        </span>
                        {page.frontContent.stamp && (
                          <span className="text-[9px] font-mono text-sandstone-700 bg-sandstone-200 px-1.5 py-0.5 rounded">
                            {page.frontContent.stamp}
                          </span>
                        )}
                      </div>

                      {page.frontContent.title && (
                        <h4 className="font-display text-base sm:text-lg font-bold text-charcoal-950">
                          {page.frontContent.title}
                        </h4>
                      )}

                      {page.frontContent.body && (
                        <p className="font-editorial text-xs sm:text-sm text-charcoal-800 leading-relaxed italic">
                          {page.frontContent.body}
                        </p>
                      )}

                      {(page.frontContent.type === 'sketch' || page.frontContent.type === 'blueprint') && (
                        <div className="bg-sandstone-200/60 p-3 rounded-lg border border-sandstone-300 text-center space-y-1">
                          <Compass className="w-6 h-6 text-brass-700 mx-auto stroke-[1.5]" />
                          <span className="text-[10px] font-mono text-charcoal-700 block">
                            SURVEY COORDINATES // ELEVATION RECORD
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-sandstone-400/50 pt-2 flex items-center justify-between text-[10px] text-charcoal-700 font-sans">
                      <span>ARCHIVAL PLATE {idx + 1}</span>
                      <span className="text-brass-800 font-semibold font-display">PASTPORT</span>
                    </div>
                  </div>

                  {/* BACK FACE (Shown on the left after turning past 90deg) */}
                  <div
                    className="absolute inset-0 w-full h-full surface-parchment border-r border-sandstone-400/50 p-6 sm:p-8 flex flex-col justify-between backface-hidden shadow-2xl overflow-hidden"
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                    <div className="space-y-3 relative z-10">
                      <div className="flex items-center justify-between border-b border-sandstone-400/50 pb-2">
                        <span className="text-[10px] font-display font-bold uppercase tracking-widest text-charcoal-800">
                          {page.folio} (VERSO)
                        </span>
                        {page.backContent.stamp && (
                          <span className="text-[9px] font-mono text-sandstone-700 bg-sandstone-200 px-1.5 py-0.5 rounded">
                            {page.backContent.stamp}
                          </span>
                        )}
                      </div>

                      {page.backContent.title && (
                        <h4 className="font-display text-base sm:text-lg font-bold text-charcoal-950">
                          {page.backContent.title}
                        </h4>
                      )}

                      {page.backContent.body && (
                        <p className="font-editorial text-xs sm:text-sm text-charcoal-800 leading-relaxed italic">
                          {page.backContent.body}
                        </p>
                      )}
                    </div>

                    <div className="border-t border-sandstone-400/50 pt-2 flex items-center justify-between text-[10px] text-charcoal-700 font-sans">
                      <span>VERSO {idx + 1}</span>
                      <span className="text-brass-800 font-semibold font-display">CHRONICLES</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* ================= HARDCOVER FRONT COVER (Swings Open to Left at 0.10 -> 0.22) ================= */}
            <div
              className="absolute top-0 right-0 w-1/2 h-full origin-left-center transform-style-3d pointer-events-auto z-40 transition-transform duration-100 ease-linear"
              style={{
                transform: `rotateY(${coverAngle}deg)`,
                display: coverAngle <= -178 ? 'none' : 'block',
              }}
            >
              {/* Outer Leather Cover Face */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-charcoal-900 via-charcoal-850 to-charcoal-950 p-6 sm:p-8 flex flex-col items-center justify-between text-center border-l-2 border-brass-500/40 backface-hidden shadow-2xl">
                <div className="absolute top-3.5 left-3.5 w-7 h-7 border-t-2 border-l-2 border-brass-400/70 rounded-tl" />
                <div className="absolute top-3.5 right-3.5 w-7 h-7 border-t-2 border-r-2 border-brass-400/70 rounded-tr" />
                <div className="absolute bottom-3.5 left-3.5 w-7 h-7 border-b-2 border-l-2 border-brass-400/70 rounded-bl" />
                <div className="absolute bottom-3.5 right-3.5 w-7 h-7 border-b-2 border-r-2 border-brass-400/70 rounded-br" />

                <div className="space-y-1">
                  <span className="text-[9px] font-display tracking-widest text-brass-400/90 uppercase font-semibold">
                    Archaeological Survey of India &bull; Archival Codex
                  </span>
                  <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-brass-500/50 to-transparent mx-auto" />
                </div>

                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-brass-600/25 via-charcoal-900 to-brass-800/20 border-2 border-brass-400/60 flex items-center justify-center shadow-inner">
                  <div className="absolute inset-1.5 rounded-full border border-dashed border-brass-400/40 animate-[spin_40s_linear_infinite]" />
                  <Compass className="w-8 h-8 text-brass-400 stroke-[1.75]" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-display text-lg sm:text-xl font-extrabold text-parchment-100 tracking-wide text-gold-gradient">
                    THE CHRONICLES OF IND
                  </h3>
                  <p className="font-editorial text-xs text-sandstone-300 max-w-[200px] mx-auto">
                    Monuments, Architecture &amp; Living History
                  </p>
                </div>

                <span className="inline-flex items-center space-x-1.5 text-xs font-semibold text-brass-300 bg-brass-500/15 border border-brass-500/40 px-3.5 py-1.5 rounded-full shadow-sm">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Scroll Down to Open Codex</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoricalBook;
