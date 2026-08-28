import React, { useState, useCallback, useRef, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  RotateCcw,
  Maximize,
  Minimize,
  Sparkles,
  MapPin,
  MousePointer2,
  Smartphone,
  Move3D,
  ZoomIn,
  Box,
  Info,
  Camera,
} from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { TajMahalARViewer } from '@/features/ar/TajMahalARViewer';

// Lazy-load the heavy 3D scene to keep initial page load fast
const LazyTajMahal3DScene = lazy(() => import('../3d-viewer/TajMahal3DScene'));

export const TajMahal3DExperience: React.FC = () => {
  const [resetTrigger, setResetTrigger] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isARMode, setIsARMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleReset = useCallback(() => {
    setResetTrigger((prev) => prev + 1);
    setAutoRotate(true);
  }, []);

  const handleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      // Fullscreen not supported
    }
  }, []);

  // Listen for fullscreen exit via ESC key
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="w-full space-y-6 sm:space-y-8 pb-8">
      {/* Top Nav Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/monuments/taj-mahal"
          className="inline-flex items-center space-x-2 text-xs font-semibold bg-charcoal-900/90 hover:bg-charcoal-800 text-sandstone-300 px-4 py-2.5 rounded-xl border border-brass-500/25 transition-all duration-200 group"
        >
          <ArrowLeft className="w-4 h-4 text-brass-400 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Taj Mahal</span>
        </Link>

        <div className="flex items-center space-x-2.5">
          {/* Primary View in AR Button */}
          {!isARMode ? (
            <button
              type="button"
              onClick={() => setIsARMode(true)}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-display text-xs font-bold text-parchment-100 bg-gradient-to-r from-terracotta-500 via-terracotta-600 to-terracotta-500 hover:from-terracotta-400 hover:to-terracotta-500 shadow-xl shadow-terracotta-900/40 hover:shadow-terracotta-600/50 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer border border-terracotta-400/50"
            >
              <Camera className="w-4 h-4 text-parchment-100 animate-pulse" />
              <span className="tracking-wider uppercase">VIEW IN AR</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsARMode(false)}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl font-display text-xs font-bold text-brass-300 bg-charcoal-900 border border-brass-500/40 hover:bg-charcoal-850 transition cursor-pointer"
            >
              <Box className="w-4 h-4 text-brass-400" />
              <span>EXIT AR TO 3D</span>
            </button>
          )}

          <span className="bg-charcoal-900/90 backdrop-blur-md text-[11px] font-mono text-sandstone-300 px-3 py-2 rounded-xl border border-brass-500/25 hidden md:flex items-center space-x-1.5">
            <Box className="w-3.5 h-3.5 text-brass-400" />
            <span>WebGL &bull; WebXR</span>
          </span>
        </div>
      </div>

      {/* Main Experience Viewport Container */}
      {isARMode ? (
        /* AR Camera Viewport */
        <TajMahalARViewer onExitAR={() => setIsARMode(false)} />
      ) : (
        /* 3D Orbit Viewport Container */
        <div
          ref={containerRef}
          className={`relative rounded-3xl overflow-hidden border-2 border-brass-500/40 shadow-2xl shadow-charcoal-950/90 transition-all duration-300 ${
            isFullscreen ? 'rounded-none border-0' : ''
          }`}
        >
          {/* 3D Scene (Lazy-loaded) */}
          <Suspense
            fallback={
              <div className="h-[500px] sm:h-[600px] lg:h-[700px] w-full flex flex-col items-center justify-center bg-charcoal-950 rounded-2xl space-y-4">
                <LoadingSpinner message="Initializing 3D Taj Mahal experience..." />
                <div className="max-w-xs text-center space-y-1.5">
                  <p className="text-xs text-sandstone-400">
                    Loading monument geometry, lighting, and environment maps...
                  </p>
                  <div className="w-48 h-1 bg-charcoal-800 rounded-full overflow-hidden mx-auto">
                    <div className="h-full bg-gradient-to-r from-brass-500 to-brass-400 rounded-full animate-pulse" style={{ width: '60%' }} />
                  </div>
                </div>
              </div>
            }
          >
            <LazyTajMahal3DScene
              resetTrigger={resetTrigger}
              heightClass={
                isFullscreen
                  ? 'h-screen'
                  : 'h-[500px] sm:h-[600px] lg:h-[700px]'
              }
              autoRotate={autoRotate}
            />
          </Suspense>

          {/* ===== Floating UI Overlays ===== */}

          {/* Top-Left Title Badge */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none">
            <div className="bg-charcoal-950/85 backdrop-blur-xl px-4 py-3 rounded-2xl border border-brass-500/30 shadow-2xl space-y-1.5 pointer-events-auto">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-brass-400" />
                <h2 className="font-display text-lg sm:text-xl font-black text-parchment-100 tracking-wider text-gold-gradient">
                  TAJ MAHAL
                </h2>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-sandstone-300">
                <MapPin className="w-3 h-3 text-terracotta-400" />
                <span className="font-sans">Agra, Uttar Pradesh, India</span>
              </div>
              <div className="flex items-center space-x-2 pt-0.5">
                <span className="text-[10px] text-brass-400 font-display font-bold tracking-wide uppercase">
                  Explore in 3D
                </span>
                <span className="text-sandstone-500">&bull;</span>
                <button
                  type="button"
                  onClick={() => setIsARMode(true)}
                  className="text-[10px] text-terracotta-300 hover:text-terracotta-200 font-display font-bold uppercase tracking-wide hover:underline cursor-pointer"
                >
                  Switch to AR &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Top-Right Controls */}
          <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2">
            {/* View in AR Button inside Canvas */}
            <button
              type="button"
              onClick={() => setIsARMode(true)}
              className="flex items-center justify-center p-2.5 bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-parchment-100 hover:from-terracotta-400 hover:to-terracotta-500 rounded-xl border border-terracotta-400/60 transition-all duration-200 cursor-pointer shadow-xl"
              title="View in Augmented Reality"
            >
              <Camera className="w-4 h-4" />
            </button>

            {/* Reset View */}
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center justify-center w-10 h-10 bg-charcoal-950/85 backdrop-blur-xl rounded-xl border border-brass-500/30 text-sandstone-300 hover:text-brass-300 hover:bg-charcoal-900 hover:border-brass-400 transition-all duration-200 cursor-pointer shadow-lg"
              title="Reset Camera View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={handleFullscreen}
              className="flex items-center justify-center w-10 h-10 bg-charcoal-950/85 backdrop-blur-xl rounded-xl border border-brass-500/30 text-sandstone-300 hover:text-brass-300 hover:bg-charcoal-900 hover:border-brass-400 transition-all duration-200 cursor-pointer shadow-lg"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4" />
              ) : (
                <Maximize className="w-4 h-4" />
              )}
            </button>

            {/* Auto-Rotate Toggle */}
            <button
              type="button"
              onClick={() => setAutoRotate(!autoRotate)}
              className={`flex items-center justify-center w-10 h-10 backdrop-blur-xl rounded-xl border transition-all duration-200 cursor-pointer shadow-lg ${
                autoRotate
                  ? 'bg-brass-500/25 border-brass-400 text-brass-300 ring-1 ring-brass-400/30'
                  : 'bg-charcoal-950/85 border-brass-500/30 text-sandstone-400 hover:text-brass-300 hover:bg-charcoal-900'
              }`}
              title={autoRotate ? 'Stop Auto-Rotate' : 'Start Auto-Rotate'}
            >
              <Move3D className="w-4 h-4" />
            </button>

            {/* Toggle Controls Help */}
            <button
              type="button"
              onClick={() => setShowControls(!showControls)}
              className="flex items-center justify-center w-10 h-10 bg-charcoal-950/85 backdrop-blur-xl rounded-xl border border-brass-500/30 text-sandstone-300 hover:text-brass-300 hover:bg-charcoal-900 hover:border-brass-400 transition-all duration-200 cursor-pointer shadow-lg"
              title="Toggle Controls Guide"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom-Center Controls Help Overlay */}
          {showControls && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <div className="bg-charcoal-950/85 backdrop-blur-xl px-4 py-2.5 rounded-xl border border-brass-500/25 shadow-2xl flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 pointer-events-auto">
                {/* Desktop Controls */}
                <div className="hidden sm:flex items-center space-x-1.5 text-xs text-sandstone-300">
                  <MousePointer2 className="w-3.5 h-3.5 text-brass-400" />
                  <span className="font-sans">Drag to orbit</span>
                </div>
                <div className="hidden sm:flex items-center space-x-1.5 text-xs text-sandstone-300">
                  <ZoomIn className="w-3.5 h-3.5 text-brass-400" />
                  <span className="font-sans">Scroll to zoom</span>
                </div>
                <div className="hidden sm:flex items-center space-x-1.5 text-xs text-sandstone-300">
                  <Move3D className="w-3.5 h-3.5 text-brass-400" />
                  <span className="font-sans">Right-click to pan</span>
                </div>

                {/* Mobile Controls */}
                <div className="flex sm:hidden items-center space-x-1.5 text-xs text-sandstone-300">
                  <Smartphone className="w-3.5 h-3.5 text-brass-400" />
                  <span className="font-sans">One finger: rotate &bull; Two fingers: zoom & pan</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Monument Stats Bar (below viewport) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Imperial Patron', value: 'Shah Jahan', highlight: 'Mughal Emperor' },
          { label: 'Construction', value: '1631–1653 CE', highlight: '22 Years' },
          { label: 'Architecture', value: 'Mughal Classical', highlight: 'Persian Synthesis' },
          { label: 'UNESCO Status', value: 'Inscribed 1983', highlight: 'Criterion (i)' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-charcoal-900/90 p-3.5 rounded-2xl border border-brass-500/20 space-y-1 hover:border-brass-500/40 transition-colors"
          >
            <span className="text-[10px] text-sandstone-400 uppercase tracking-wider font-semibold block">
              {stat.label}
            </span>
            <span className="font-display text-sm font-bold text-parchment-100 block">
              {stat.value}
            </span>
            <span className="text-[10px] text-brass-400 font-mono block">{stat.highlight}</span>
          </div>
        ))}
      </div>

      {/* Architecture & Interaction Notes */}
      <div className="bg-charcoal-900/80 p-4 sm:p-5 rounded-2xl border border-brass-500/20 space-y-3">
        <div className="flex items-center space-x-2 text-xs text-brass-400 font-display font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Architectural Monument Geometry &amp; AR Technology</span>
        </div>
        <p className="text-xs sm:text-sm text-sandstone-300 leading-relaxed font-sans">
          This interactive 3D and WebXR AR reconstruction renders the Taj Mahal complex including the central octagonal mausoleum with
          its iconic bulbous dome, four 40-metre minarets with triple balcony rings, Charbagh paradise gardens with reflecting
          pool watercourses, the red sandstone mosque and jawab flanking structures, and the Great Gate (Darwaza-i Rauza).
          All geometry is built using mathematically precise procedural mesh generation for optimal WebGL rendering performance.
        </p>
      </div>
    </div>
  );
};

export default TajMahal3DExperience;
