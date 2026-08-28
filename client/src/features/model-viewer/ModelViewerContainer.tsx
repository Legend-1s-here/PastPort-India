import React, { useState } from 'react';
import { RotateCcw, Info, Sparkles } from 'lucide-react';
import type { Hotspot } from '../../types/monument';

interface ModelViewerContainerProps {
  hotspots: Hotspot[];
  onSelectHotspot: (hotspot: Hotspot) => void;
}

export const ModelViewerContainer: React.FC<ModelViewerContainerProps> = ({
  hotspots,
  onSelectHotspot,
}) => {
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  const handleHotspotClick = (hotspot: Hotspot) => {
    setActiveHotspotId(hotspot.id);
    onSelectHotspot(hotspot);
  };

  return (
    <div className="relative min-h-[500px] w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl flex flex-col justify-between p-6">
      {/* Top Controls Overlay */}
      <div className="flex items-center justify-between bg-slate-900/80 backdrop-blur-md p-3.5 rounded-xl border border-slate-800 z-10">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="font-semibold text-slate-100 text-sm">3D Interactive Monument Viewer</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
            Rotate & Zoom Active
          </span>
        </div>
      </div>

      {/* 3D Canvas / Model Simulation Display */}
      <div className="relative my-6 flex-1 flex flex-col items-center justify-center min-h-[320px]">
        {/* Interactive 3D Taj Mahal Visual Artwork Simulation */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
          {/* Outer glowing halo */}
          <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
          
          {/* Main Dome Art Representation */}
          <div className="relative z-0 flex flex-col items-center cursor-grab active:cursor-grabbing transform hover:scale-105 transition-transform duration-300">
            {/* Top Crescent / Finial */}
            <div className="w-2 h-6 bg-gradient-to-t from-amber-400 to-amber-200 rounded-t-full mb-0.5 shadow-lg shadow-amber-500/50" />
            {/* Onion Dome */}
            <div className="w-24 h-28 bg-gradient-to-b from-slate-100 via-amber-50 to-slate-200 rounded-t-full border border-amber-200/50 shadow-2xl flex items-center justify-center relative">
              <span className="text-[10px] font-bold text-amber-800/60 uppercase tracking-widest">Taj Mahal</span>
            </div>
            {/* Main Arch Platform */}
            <div className="w-40 h-20 bg-slate-200 border border-slate-300 rounded-t-lg shadow-md flex items-center justify-center space-x-2 p-2">
              <div className="w-8 h-14 bg-slate-800 rounded-t-full border border-amber-400/40" />
              <div className="w-14 h-16 bg-slate-800 rounded-t-full border-2 border-amber-400/60 flex items-center justify-center">
                <div className="w-8 h-12 bg-slate-900 rounded-t-full" />
              </div>
              <div className="w-8 h-14 bg-slate-800 rounded-t-full border border-amber-400/40" />
            </div>
            {/* Base Plinth */}
            <div className="w-56 h-4 bg-slate-300 rounded-sm border-t border-slate-400 shadow-xl" />
          </div>

          {/* Render Clickable Hotspots overlay on 3D object */}
          {hotspots.map((spot, idx) => {
            // Calculate dynamic placement for hotspots on the model
            const placements = [
              { top: '15%', left: '50%' }, // Main Dome
              { top: '35%', left: '15%' }, // Left Minaret
              { top: '60%', left: '50%' }, // Archway
              { top: '85%', left: '75%' }, // Garden
            ];
            const pos = placements[idx % placements.length];

            const isActive = activeHotspotId === spot.id;

            return (
              <button
                key={spot.id}
                onClick={() => handleHotspotClick(spot)}
                style={{ top: pos.top, left: pos.left }}
                className={`absolute z-20 transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-200`}
                title={spot.title}
              >
                <span className="relative flex h-7 w-7 items-center justify-center">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isActive ? 'bg-amber-400 opacity-75' : 'bg-amber-500 opacity-40'}`} />
                  <span className={`relative inline-flex rounded-full h-6 w-6 border-2 ${isActive ? 'bg-amber-500 border-white text-slate-950 scale-110' : 'bg-slate-900 border-amber-400 text-amber-300'} text-xs font-bold items-center justify-center shadow-lg transition-transform group-hover:scale-125`}>
                    {idx + 1}
                  </span>
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/90 text-amber-200 text-[11px] font-medium px-2 py-1 rounded shadow-lg whitespace-nowrap absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none border border-slate-700">
                  {spot.title}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-xs text-slate-400 flex items-center space-x-1">
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span>Click numbered hotspots to explore architectural facts</span>
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
