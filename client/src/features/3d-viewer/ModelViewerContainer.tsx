import React, { useState, Suspense, lazy } from 'react';
import { RotateCcw, Info, Sparkles } from 'lucide-react';
import type { Hotspot } from '@/types/monument';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

// Genuine lazy-loading boundary for Three.js / React Three Fiber
const LazySceneContainer = lazy(() => import('./SceneContainer'));

interface ModelViewerContainerProps {
  hotspots: Hotspot[];
  onSelectHotspot: (hotspot: Hotspot) => void;
}

export const ModelViewerContainer: React.FC<ModelViewerContainerProps> = ({
  hotspots,
  onSelectHotspot,
}) => {
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(
    hotspots[0]?.id ?? null,
  );

  const handleHotspotClick = (hotspot: Hotspot) => {
    setActiveHotspotId(hotspot.id);
    onSelectHotspot(hotspot);
  };

  return (
    <div className="relative min-h-[520px] w-full surface-cinematic rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between p-4 sm:p-6">
      {/* Top Controls Overlay */}
      <div className="flex items-center justify-between bg-charcoal-900/85 backdrop-blur-md p-3.5 rounded-xl border border-brass-500/20 z-10">
        <div className="flex items-center space-x-2.5">
          <Sparkles className="w-5 h-5 text-brass-400" />
          <span className="font-display font-bold text-parchment-100 text-sm tracking-wide">
            3D Interactive Monument Viewer
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-sandstone-300 bg-charcoal-800/90 px-3 py-1 rounded-md border border-charcoal-700 font-sans">
            Rotate &amp; Zoom Active
          </span>
        </div>
      </div>

      {/* 3D Canvas Viewport with Lazy Loading & Suspense */}
      <div className="relative my-4 flex-1 flex flex-col items-center justify-center min-h-[380px]">
        <Suspense
          fallback={
            <div className="h-[420px] w-full flex items-center justify-center bg-charcoal-950/80 rounded-xl border border-charcoal-800">
              <LoadingSpinner message="Initializing Web 3D viewport..." />
            </div>
          }
        >
          <LazySceneContainer
            hotspots={hotspots}
            activeHotspotId={activeHotspotId}
            onSelectHotspot={handleHotspotClick}
          />
        </Suspense>

        <p className="mt-3 text-xs text-sandstone-400 flex items-center space-x-1.5 font-sans">
          <RotateCcw className="w-3.5 h-3.5 text-brass-400" />
          <span>Drag to orbit &bull; Scroll to zoom &bull; Click numbered hotspots for historical facts</span>
        </p>
      </div>

      {/* Hotspots Quick Switch Bar */}
      <div className="bg-charcoal-900/90 backdrop-blur-md p-3.5 rounded-xl border border-brass-500/20 z-10">
        <div className="text-xs font-semibold text-brass-400 uppercase tracking-wider mb-2.5 flex items-center space-x-1.5 font-sans">
          <Info className="w-3.5 h-3.5" />
          <span>Interactive Hotspots ({hotspots.length})</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {hotspots.map((spot, idx) => (
            <button
              type="button"
              key={spot.id}
              onClick={() => handleHotspotClick(spot)}
              className={`text-left p-2.5 rounded-lg text-xs border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass-400 ${
                activeHotspotId === spot.id
                  ? 'bg-brass-500/20 border-brass-500/60 text-brass-300 shadow-sm'
                  : 'bg-charcoal-850/70 border-charcoal-700/60 text-sandstone-300 hover:bg-charcoal-800 hover:text-parchment-100 hover:border-brass-500/30'
              }`}
            >
              <div className="font-bold truncate text-brass-300 font-display">
                {idx + 1}. {spot.title}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelViewerContainer;
