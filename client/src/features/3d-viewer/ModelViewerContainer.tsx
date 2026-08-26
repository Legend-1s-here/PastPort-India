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
    <div className="relative min-h-[520px] w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl flex flex-col justify-between p-4 sm:p-6">
      {/* Top Controls Overlay */}
      <div className="flex items-center justify-between bg-slate-900/80 backdrop-blur-md p-3.5 rounded-xl border border-slate-800 z-10">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="font-semibold text-slate-100 text-sm">
            3D Interactive Monument Viewer
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
            Rotate & Zoom Active
          </span>
        </div>
      </div>

      {/* 3D Canvas Viewport with Lazy Loading & Suspense */}
      <div className="relative my-4 flex-1 flex flex-col items-center justify-center min-h-[380px]">
        <Suspense
          fallback={
            <div className="h-[420px] w-full flex items-center justify-center bg-slate-950/60 rounded-xl border border-slate-800/60">
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

        <p className="mt-3 text-xs text-slate-400 flex items-center space-x-1">
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span>Drag to orbit • Scroll to zoom • Click numbered hotspots for historical facts</span>
        </p>
      </div>

      {/* Hotspots Quick Switch Bar */}
      <div className="bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 z-10">
        <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2 flex items-center space-x-1">
          <Info className="w-3.5 h-3.5" />
          <span>Interactive Hotspots ({hotspots.length})</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {hotspots.map((spot, idx) => (
            <button
              type="button"
              key={spot.id}
              onClick={() => handleHotspotClick(spot)}
              className={`text-left p-2 rounded-lg text-xs border transition ${
                activeHotspotId === spot.id
                  ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-slate-100'
              }`}
            >
              <div className="font-bold truncate text-amber-300">
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
