import React from 'react';
import { Camera, AlertTriangle, ArrowLeft } from 'lucide-react';

interface ARContainerProps {
  onBackTo3D: () => void;
}

export const ARContainer: React.FC<ARContainerProps> = ({ onBackTo3D }) => {
  return (
    <div className="relative min-h-[500px] w-full surface-cinematic rounded-2xl overflow-hidden flex flex-col justify-between p-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between bg-charcoal-900/85 backdrop-blur-md p-4 rounded-xl border border-terracotta-500/25">
        <div className="flex items-center space-x-3">
          <Camera className="w-5 h-5 text-terracotta-400 animate-pulse" />
          <span className="font-display font-bold text-terracotta-300">Augmented Reality Mode</span>
        </div>
        <button
          type="button"
          onClick={onBackTo3D}
          className="flex items-center space-x-2 text-xs bg-charcoal-800 hover:bg-charcoal-700 text-sandstone-200 px-3.5 py-2 rounded-lg transition border border-charcoal-700 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit AR to 3D</span>
        </button>
      </div>

      {/* Camera / AR Viewport Boundary Placeholder */}
      <div className="my-8 flex flex-col items-center justify-center text-center p-8 bg-charcoal-900/50 rounded-xl border border-dashed border-terracotta-500/30">
        <div className="w-24 h-24 rounded-full bg-terracotta-500/10 flex items-center justify-center mb-4 border border-terracotta-500/25">
          <Camera className="w-12 h-12 text-terracotta-400" />
        </div>
        <h3 className="font-display text-lg font-bold text-parchment-100 mb-2">
          AR Integration Boundary
        </h3>
        <p className="font-editorial text-sm sm:text-base text-sandstone-300 max-w-md mb-6 leading-relaxed">
          Augmented reality capabilities will project 3D monument reconstructions onto physical surfaces or image markers on supported mobile devices.
        </p>

        <div className="bg-charcoal-950/90 border border-terracotta-500/30 rounded-xl p-4 text-left max-w-md">
          <div className="flex items-center space-x-2 text-terracotta-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>Architecture Integration Notice</span>
          </div>
          <p className="text-xs text-sandstone-300 leading-relaxed">
            AR implementation is scheduled for subsequent phases. The frontend is decoupled from specific AR runtimes to allow flexible framework selection (WebXR, marker tracking, or native bridges).
          </p>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between text-xs text-sandstone-400 bg-charcoal-900/80 p-3.5 rounded-xl border border-charcoal-800">
        <span>Status: Integration Boundary Ready</span>
        <button
          type="button"
          onClick={onBackTo3D}
          className="text-brass-400 hover:text-brass-300 hover:underline font-medium cursor-pointer"
        >
          Switch to Standard 3D Viewer
        </button>
      </div>
    </div>
  );
};

export default ARContainer;
