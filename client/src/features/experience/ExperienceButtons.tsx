import React from 'react';
import { Box, Camera, Glasses, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import type { ExperienceType, ExperienceAvailability } from '@/types/experience';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';

interface ExperienceButtonsProps {
  currentMode: ExperienceType;
  onModeChange: (mode: ExperienceType) => void;
  availability?: ExperienceAvailability;
}

export const ExperienceButtons: React.FC<ExperienceButtonsProps> = ({
  currentMode,
  onModeChange,
  availability = { web3d: true, ar: false, vr: false },
}) => {
  const capabilities = useDeviceCapabilities();

  // Helper to determine status label & badge
  const getExperienceStatus = (type: ExperienceType) => {
    if (type === 'web3d') {
      if (!capabilities?.webgl) return { label: 'WebGL Required', available: false, variant: 'warn' };
      return { label: 'Interactive 3D', available: true, variant: 'success' };
    }
    if (type === 'ar') {
      if (!availability.ar) return { label: 'Coming Soon', available: false, variant: 'soon' };
      if (!capabilities?.ar) return { label: 'Device Check', available: false, variant: 'warn' };
      return { label: 'Camera Ready', available: true, variant: 'success' };
    }
    if (type === 'vr') {
      if (!availability.vr) return { label: 'Coming Soon', available: false, variant: 'soon' };
      if (!capabilities?.vr) return { label: 'Headset Check', available: false, variant: 'warn' };
      return { label: 'WebXR Ready', available: true, variant: 'success' };
    }
    return { label: 'Available', available: true, variant: 'success' };
  };

  const web3dStatus = getExperienceStatus('web3d');
  const arStatus = getExperienceStatus('ar');
  const vrStatus = getExperienceStatus('vr');

  return (
    <div className="surface-subtle p-2 sm:p-2.5 rounded-2xl shadow-xl grid grid-cols-3 gap-2 sm:gap-3">
      {/* 3D Viewer Button */}
      <button
        type="button"
        onClick={() => onModeChange('web3d')}
        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-400 min-h-[72px] ${
          currentMode === 'web3d'
            ? 'bg-gradient-to-b from-brass-500/25 to-brass-600/10 border-brass-400/60 text-brass-300 shadow-lg shadow-brass-500/15 ring-1 ring-brass-400/30'
            : 'bg-charcoal-850/60 border-charcoal-700/60 text-sandstone-300 hover:bg-charcoal-800 hover:text-parchment-100 hover:border-brass-500/30'
        }`}
      >
        <div className="flex items-center space-x-1 mb-1">
          <Box className={`w-4.5 h-4.5 ${currentMode === 'web3d' ? 'text-brass-400' : 'text-sandstone-400'}`} />
          {web3dStatus.available && (
            <CheckCircle2 className="w-3 h-3 text-brass-400/80 hidden sm:inline" />
          )}
        </div>
        <span className="text-xs font-bold tracking-wide font-display">View in 3D</span>
        <span className="text-[10px] text-sandstone-400 mt-0.5 font-sans">
          {web3dStatus.label}
        </span>
      </button>

      {/* AR View Button */}
      <button
        type="button"
        onClick={() => onModeChange('ar')}
        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-400 min-h-[72px] ${
          currentMode === 'ar'
            ? 'bg-gradient-to-b from-terracotta-500/25 to-terracotta-600/10 border-terracotta-400/60 text-terracotta-300 shadow-lg shadow-terracotta-500/15 ring-1 ring-terracotta-400/30'
            : 'bg-charcoal-850/60 border-charcoal-700/60 text-sandstone-300 hover:bg-charcoal-800 hover:text-parchment-100 hover:border-terracotta-500/30'
        }`}
      >
        <div className="flex items-center space-x-1 mb-1">
          <Camera className={`w-4.5 h-4.5 ${currentMode === 'ar' ? 'text-terracotta-400 animate-pulse' : 'text-sandstone-400'}`} />
          <Clock className="w-3 h-3 text-terracotta-400/70 hidden sm:inline" />
        </div>
        <span className="text-xs font-bold tracking-wide font-display">View in AR</span>
        <span className="text-[10px] text-terracotta-300/80 mt-0.5 font-sans">
          {arStatus.label}
        </span>
      </button>

      {/* VR Mode Button */}
      <button
        type="button"
        onClick={() => onModeChange('vr')}
        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-400 min-h-[72px] ${
          currentMode === 'vr'
            ? 'bg-gradient-to-b from-burgundy-500/30 to-burgundy-600/10 border-burgundy-400/60 text-parchment-100 shadow-lg shadow-burgundy-900/30 ring-1 ring-burgundy-400/30'
            : 'bg-charcoal-850/60 border-charcoal-700/60 text-sandstone-300 hover:bg-charcoal-800 hover:text-parchment-100 hover:border-burgundy-400/30'
        }`}
      >
        <div className="flex items-center space-x-1 mb-1">
          <Glasses className={`w-4.5 h-4.5 ${currentMode === 'vr' ? 'text-burgundy-300' : 'text-sandstone-400'}`} />
          <AlertCircle className="w-3 h-3 text-burgundy-400/70 hidden sm:inline" />
        </div>
        <span className="text-xs font-bold tracking-wide font-display">Enter VR</span>
        <span className="text-[10px] text-sandstone-400 mt-0.5 font-sans">
          {vrStatus.label}
        </span>
      </button>
    </div>
  );
};

export default ExperienceButtons;
