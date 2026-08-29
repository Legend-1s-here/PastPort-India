import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { isReducedMotion } from '@/lib/motion/motion';

export interface HistoricalBookProps {
  /**
   * Scroll progress from parent (0.0 to 1.0) controlling the book experience:
   * 0.00 – 0.10: Closed book
   * 0.10 – 0.40: Front cover opens directly
   * 0.40 – 0.70: Fully open book displayed
   * 0.70 – 1.00: Book translates down and fades out
   */
  progress?: number;
  className?: string;
}

export const HistoricalBook: React.FC<HistoricalBookProps> = ({
  progress = 0,
  className = '',
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const bookRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const isReduced = isReducedMotion();

  // --- Cover opening logic ---
  let openProgress = 0;
  let coverAngle = 0;

  if (isReduced) {
    openProgress = 1;
    coverAngle = -180;
  } else if (progress < 0.10) {
    openProgress = 0;
    coverAngle = 0;
  } else if (progress < 0.40) {
    openProgress = (progress - 0.10) / 0.30;
    // Cubic ease for cover swing
    const easedOpen = openProgress * openProgress * (3 - 2 * openProgress);
    coverAngle = -180 * easedOpen;
  } else {
    openProgress = 1;
    coverAngle = -180;
  }

  // --- Downward Translation & Fade Out logic ---
  let moveDownProgress = 0;
  if (progress > 0.70) {
    moveDownProgress = (progress - 0.70) / 0.30;
  }
  const easedMove = moveDownProgress * moveDownProgress; // smooth acceleration down
  const translateY = easedMove * 180;
  const opacity = 1 - easedMove;
  const scale = 1 - easedMove * 0.08;

  const isClosed = openProgress === 0;

  // --- Mouse parallax on closed book ---
  useEffect(() => {
    if (isReduced || !isClosed) return;

    const element = bookRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      setTilt({
        x: Math.max(-6, Math.min(6, -deltaY * 6)),
        y: Math.max(-6, Math.min(6, deltaX * 6)),
      });
    };

    const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

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
        maxWidth: openProgress === 0 ? '420px' : openProgress >= 0.95 ? '900px' : `${420 + openProgress * 480}px`,
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity: opacity,
        transition: isClosed
          ? 'max-width 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          : 'max-width 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.1s ease-out, opacity 0.1s ease-out',
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute -inset-12 bg-brass-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-700"
        style={{
          transform: `translate(${activeTilt.y * 2}px, ${activeTilt.x * -2}px)`,
          opacity: 0.18,
        }}
      />
      {/* Shadow underneath */}
      <div
        className="absolute -bottom-8 inset-x-6 h-14 bg-charcoal-950/90 rounded-full blur-2xl pointer-events-none"
        style={{ transform: `scale(${1 + Math.abs(activeTilt.y) * 0.015})` }}
      />

      {/* ===== BOOK CONTAINER ===== */}
      <div
        className="relative w-full transition-transform duration-300 ease-out"
        style={{
          perspective: '2200px',
          transform: `rotateX(${activeTilt.x}deg) rotateY(${activeTilt.y}deg)`,
        }}
      >
        {/* ===== CLOSED BOOK ===== */}
        {isClosed ? (
          <div className="relative w-full max-w-[400px] mx-auto min-h-[340px] sm:min-h-[420px] rounded-2xl bg-gradient-to-br from-charcoal-900 via-charcoal-850 to-charcoal-950 p-6 sm:p-8 border-2 border-brass-500/40 shadow-2xl shadow-charcoal-950/95 transform-style-3d">
            {/* Spine */}
            <div className="absolute left-0 inset-y-0 w-7 sm:w-9 bg-gradient-to-r from-charcoal-950 via-charcoal-800 to-charcoal-900 rounded-l-2xl border-r border-brass-500/40 flex flex-col justify-between py-6 items-center shadow-2xl">
              <div className="w-3.5 h-5 bg-brass-500/30 rounded-sm border-t border-b border-brass-400/50" />
              <span className="text-[8px] font-display text-brass-400/80 uppercase tracking-widest -rotate-90 whitespace-nowrap font-bold">
                INDIA • A JOURNEY THROUGH TIME
              </span>
              <div className="w-3.5 h-5 bg-brass-500/30 rounded-sm border-t border-b border-brass-400/50" />
            </div>

            {/* Page edge thickness (right) */}
            <div className="absolute -right-3 inset-y-3 w-3 bg-gradient-to-r from-sandstone-300 via-parchment-300 to-sandstone-400 rounded-r-sm border-y border-charcoal-900 opacity-90 shadow-md flex flex-col justify-around py-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full h-px bg-sandstone-500/40" />
              ))}
            </div>
            {/* Page edge thickness (bottom) */}
            <div className="absolute -bottom-3 inset-x-7 h-3 bg-gradient-to-b from-sandstone-300 via-parchment-300 to-sandstone-400 rounded-b-sm border-x border-charcoal-900 opacity-90 shadow-md" />

            {/* Corner ornaments */}
            <div className="absolute top-4 left-10 w-7 h-7 border-t-2 border-l-2 border-brass-400/60 rounded-tl" />
            <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-brass-400/60 rounded-tr" />
            <div className="absolute bottom-4 left-10 w-7 h-7 border-b-2 border-l-2 border-brass-400/60 rounded-bl" />
            <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-brass-400/60 rounded-br" />

            {/* Cover content */}
            <div className="ml-6 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[370px] text-center space-y-5">
              <div className="space-y-1">
                <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-brass-500/50 to-transparent mx-auto" />
                <span className="text-[9px] font-display tracking-[0.25em] text-brass-400/80 uppercase font-semibold block">
                  A Journey Through Time
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-3xl sm:text-4xl font-black text-gold-gradient tracking-wider leading-none">
                  INDIA
                </h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-brass-400/60 to-transparent mx-auto" />
              </div>

              <p className="font-editorial text-xs sm:text-sm text-sandstone-300 max-w-[220px] mx-auto leading-relaxed italic">
                Monuments, Sacred Geometry &amp; Living History
              </p>

              <div className="pt-2">
                <div className="w-10 h-0.5 bg-gradient-to-r from-transparent via-brass-400/40 to-transparent mx-auto" />
              </div>
            </div>
          </div>
        ) : (
          /* ===== OPEN BOOK SPREAD ===== */
          <div className="relative w-full min-h-[400px] sm:min-h-[470px] md:min-h-[520px] rounded-2xl bg-charcoal-950 border-2 border-brass-500/35 shadow-2xl shadow-charcoal-950/95 overflow-hidden transform-style-3d">
            {/* Page thickness edges */}
            <div className="absolute -bottom-2 inset-x-6 h-2.5 bg-gradient-to-b from-sandstone-300 via-parchment-300 to-sandstone-400 rounded-b-sm opacity-85 shadow-md" />
            <div className="absolute -right-2 inset-y-4 w-2.5 bg-gradient-to-r from-sandstone-300 via-parchment-300 to-sandstone-400 rounded-r-sm opacity-85 shadow-md" />
            <div className="absolute -left-2 inset-y-4 w-2.5 bg-gradient-to-l from-sandstone-300 via-parchment-300 to-sandstone-400 rounded-l-sm opacity-85 shadow-md" />

            {/* Center spine shadow */}
            <div className="absolute left-1/2 inset-y-0 w-6 -translate-x-1/2 bg-gradient-to-r from-charcoal-950/70 via-charcoal-900/90 to-charcoal-950/70 z-35 pointer-events-none shadow-inner" />

            {/* ===== BASE INNER SPREAD ===== */}
            <div className="grid md:grid-cols-2 gap-0 min-h-[400px] sm:min-h-[470px] md:min-h-[520px]">
              {/* Left page — Taj Mahal content */}
              <div className="surface-parchment p-5 sm:p-7 flex flex-col justify-center space-y-4 relative overflow-hidden border-r border-sandstone-400/50">
                {/* Corner decorations */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-sandstone-600/40" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-sandstone-600/40" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-sandstone-600/40" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-sandstone-600/40" />

                <div className="space-y-3 relative z-10">
                  <span className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-charcoal-700 block">
                    The Crown Jewel
                  </span>

                  <h3 className="font-display text-2xl sm:text-3xl font-black text-charcoal-950 leading-tight">
                    TAJ MAHAL
                  </h3>

                  <p className="font-editorial text-base sm:text-lg text-charcoal-800 leading-relaxed font-semibold italic">
                    A monument built from love.
                  </p>

                  <p className="font-editorial text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                    Discover the history, architecture and stories behind this timeless wonder.
                    Walk through the Charbagh gardens, examine the pietra dura inlays, and witness
                    the genius of Mughal architecture in stunning 3D.
                  </p>

                  {/* CTA Button */}
                  <button
                    type="button"
                    onClick={() => navigate('/monuments/taj-mahal')}
                    className="mt-3 inline-flex items-center space-x-2.5 text-sm font-display font-bold text-parchment-100 bg-charcoal-900 hover:bg-charcoal-800 px-6 py-3.5 rounded-xl border-2 border-brass-500/50 hover:border-brass-400 shadow-lg shadow-charcoal-950/40 transition-all duration-300 cursor-pointer group min-h-[48px] min-w-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-400 focus-visible:ring-offset-2 focus-visible:ring-offset-parchment-200"
                  >
                    <span>EXPLORE TAJ MAHAL</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>

                <div className="border-t border-sandstone-400/40 pt-2 text-[10px] text-charcoal-600 font-display tracking-wider relative z-10">
                  PASTPORT INDIA • INTERACTIVE ARCHIVE
                </div>
              </div>

              {/* Right page — Taj Mahal visual */}
              <div className="bg-charcoal-950 relative overflow-hidden flex items-center justify-center border-l border-brass-500/15">
                {/* Taj Mahal background image */}
                <img
                  src="https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop"
                  alt="The Taj Mahal at golden hour"
                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/95 via-charcoal-950/30 to-charcoal-950/50" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-charcoal-950/40" />

                {/* Typography overlay */}
                <div className="relative z-10 text-center space-y-3 p-6">
                  <span className="text-[10px] font-display tracking-[0.3em] text-brass-400/80 uppercase block">
                    Agra, India • 1631–1653 CE
                  </span>
                  <h4 className="font-display text-2xl sm:text-3xl font-black text-parchment-100 text-gold-gradient">
                    The Taj Mahal
                  </h4>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-brass-400/60 to-transparent mx-auto" />
                  <p className="font-editorial text-sm text-sandstone-300 max-w-[240px] mx-auto italic">
                    UNESCO World Heritage Site since 1983
                  </p>
                </div>

                {/* Bottom stats */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] text-sandstone-400 font-display tracking-wider">
                  <span>20,000+ ARTISANS</span>
                  <span>22 YEARS</span>
                  <span className="hidden sm:inline">35m DOME</span>
                </div>
              </div>
            </div>

            {/* ===== HARDCOVER FRONT COVER ===== */}
            <div
              className="absolute top-0 right-0 w-1/2 h-full origin-left-center transform-style-3d z-40"
              style={{
                transform: `rotateY(${coverAngle}deg)`,
                display: coverAngle <= -178 ? 'none' : 'block',
                transition: isReduced ? 'none' : undefined,
              }}
            >
              {/* Outer cover face */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-charcoal-900 via-charcoal-850 to-charcoal-950 p-5 sm:p-7 flex flex-col items-center justify-center text-center border-l-2 border-brass-500/35 backface-hidden shadow-2xl">
                {/* Corner ornaments */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-brass-400/60 rounded-tl" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-brass-400/60 rounded-tr" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-brass-400/60 rounded-bl" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-brass-400/60 rounded-br" />

                <div className="space-y-4">
                  <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-brass-500/50 to-transparent mx-auto" />

                  <h3 className="font-display text-2xl sm:text-3xl font-black text-gold-gradient tracking-wider leading-none">
                    INDIA
                  </h3>

                  <p className="font-editorial text-xs text-sandstone-300 max-w-[180px] mx-auto italic">
                    A Journey Through Time
                  </p>

                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-brass-400/40 to-transparent mx-auto" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoricalBook;
