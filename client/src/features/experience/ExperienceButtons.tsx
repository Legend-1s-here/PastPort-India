import React from 'react';
import { Box, Camera, Glasses } from 'lucide-react';
import type { ExperienceType } from '@/types/experience';

interface ExperienceButtonsProps {
  currentMode: ExperienceType;
  onModeChange: (mode: ExperienceType) => void;
}

export const ExperienceButtons: React.FC<ExperienceButtonsProps> = ({
  currentMode,
  onModeChange,
}) => {
  return (
    <div className="surface-subtle p-2 rounded-2xl shadow-xl grid grid-cols-3 gap-2 sm:gap-3">
      {/* 3D Viewer Button */}
      <button
        type="button"
        onClick={() => onModeChange('web3d')}
        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-400 ${
          currentMode === 'web3d'
            ? 'bg-gradient-to-b from-brass-500/25 to-brass-600/10 border-brass-400/60 text-brass-300 shadow-lg shadow-brass-500/15 ring-1 ring-brass-400/30'
            : 'bg-charcoal-850/60 border-charcoal-700/60 text-sandstone-300 hover:bg-charcoal-800 hover:text-parchment-100 hover:border-brass-500/30'
        }`}
      >
        <Box className={`w-5 h-5 mb-1.5 ${currentMode === 'web3d' ? 'text-brass-400' : 'text-sandstone-400'}`} />
        <span className="text-xs font-bold tracking-wide">View in 3D</span>
        <span className="text-[10px] text-sandstone-400 mt-0.5 hidden sm:inline">Interactive Model</span>
      </button>

      {/* AR View Button */}
      <button
        type="button"
        onClick={() => onModeChange('ar')}
        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-400 ${
          currentMode === 'ar'
            ? 'bg-gradient-to-b from-terracotta-500/25 to-terracotta-600/10 border-terracotta-400/60 text-terracotta-300 shadow-lg shadow-terracotta-500/15 ring-1 ring-terracotta-400/30'
            : 'bg-charcoal-850/60 border-charcoal-700/60 text-sandstone-300 hover:bg-charcoal-800 hover:text-parchment-100 hover:border-terracotta-500/30'
        }`}
      >
        <Camera className={`w-5 h-5 mb-1.5 ${currentMode === 'ar' ? 'text-terracotta-400 animate-pulse' : 'text-sandstone-400'}`} />
        <span className="text-xs font-bold tracking-wide">View in AR</span>
        <span className="text-[10px] text-sandstone-400 mt-0.5 hidden sm:inline">Camera Marker AR</span>
      </button>

      {/* VR Mode Button */}
      <button
        type="button"
        onClick={() => onModeChange('vr')}
        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-400 ${
          currentMode === 'vr'
            ? 'bg-gradient-to-b from-burgundy-500/30 to-burgundy-600/10 border-burgundy-400/60 text-parchment-100 shadow-lg shadow-burgundy-900/30 ring-1 ring-burgundy-400/30'
            : 'bg-charcoal-850/60 border-charcoal-700/60 text-sandstone-300 hover:bg-charcoal-800 hover:text-parchment-100 hover:border-burgundy-400/30'
        }`}
      >
        <Glasses className={`w-5 h-5 mb-1.5 ${currentMode === 'vr' ? 'text-burgundy-300' : 'text-sandstone-400'}`} />
        <span className="text-xs font-bold tracking-wide">Enter VR</span>
        <span className="text-[10px] text-sandstone-400 mt-0.5 hidden sm:inline">360° Immersive</span>
      </button>
    </div>
  );
};

export default ExperienceButtons;
