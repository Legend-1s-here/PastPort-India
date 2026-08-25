import React from 'react';
import { Box, Camera, Glasses } from 'lucide-react';

export type ExperienceMode = '3d' | 'ar' | 'vr';

interface ExperienceButtonsProps {
  currentMode: ExperienceMode;
  onModeChange: (mode: ExperienceMode) => void;
}

export const ExperienceButtons: React.FC<ExperienceButtonsProps> = ({
  currentMode,
  onModeChange,
}) => {
  return (
    <div className="bg-slate-900/90 backdrop-blur-md p-2 rounded-2xl border border-slate-800 shadow-xl grid grid-cols-3 gap-2">
      {/* 3D Viewer Button */}
      <button
        onClick={() => onModeChange('3d')}
        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
          currentMode === '3d'
            ? 'bg-gradient-to-b from-amber-500/20 to-amber-600/10 border-amber-500/50 text-amber-200 shadow-lg shadow-amber-500/10'
            : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
        }`}
      >
        <Box className={`w-5 h-5 mb-1 ${currentMode === '3d' ? 'text-amber-400' : 'text-slate-400'}`} />
        <span className="text-xs font-bold">View in 3D</span>
        <span className="text-[10px] text-slate-400 mt-0.5 hidden sm:inline">Interactive Model</span>
      </button>

      {/* AR View Button (Siddhant's isolated module) */}
      <button
        onClick={() => onModeChange('ar')}
        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
          currentMode === 'ar'
            ? 'bg-gradient-to-b from-amber-500/20 to-amber-600/10 border-amber-500/50 text-amber-200 shadow-lg shadow-amber-500/10'
            : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
        }`}
      >
        <Camera className={`w-5 h-5 mb-1 ${currentMode === 'ar' ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
        <span className="text-xs font-bold">View in AR</span>
        <span className="text-[10px] text-slate-400 mt-0.5 hidden sm:inline">Phone Camera AR</span>
      </button>

      {/* VR Mode Button (Future WebXR module) */}
      <button
        onClick={() => onModeChange('vr')}
        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
          currentMode === 'vr'
            ? 'bg-gradient-to-b from-indigo-500/20 to-indigo-600/10 border-indigo-500/50 text-indigo-200 shadow-lg shadow-indigo-500/10'
            : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
        }`}
      >
        <Glasses className={`w-5 h-5 mb-1 ${currentMode === 'vr' ? 'text-indigo-400' : 'text-slate-400'}`} />
        <span className="text-xs font-bold">Enter VR</span>
        <span className="text-[10px] text-slate-400 mt-0.5 hidden sm:inline">360° Immersive</span>
      </button>
    </div>
  );
};
