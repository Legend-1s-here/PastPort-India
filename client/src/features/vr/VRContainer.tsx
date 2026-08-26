import React from 'react';
import { Glasses, ArrowLeft, Info } from 'lucide-react';

interface VRContainerProps {
  onBackTo3D: () => void;
}

export const VRContainer: React.FC<VRContainerProps> = ({ onBackTo3D }) => {
  return (
    <div className="relative min-h-[500px] w-full surface-cinematic rounded-2xl overflow-hidden flex flex-col justify-between p-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between bg-charcoal-900/85 backdrop-blur-md p-4 rounded-xl border border-burgundy-400/25">
        <div className="flex items-center space-x-3">
          <Glasses className="w-5 h-5 text-burgundy-400" />
          <span className="font-display font-bold text-burgundy-300">Virtual Reality Mode</span>
        </div>
        <button
          type="button"
          onClick={onBackTo3D}
          className="flex items-center space-x-2 text-xs bg-charcoal-800 hover:bg-charcoal-700 text-sandstone-200 px-3.5 py-2 rounded-lg transition border border-charcoal-700 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit VR to 3D</span>
        </button>
      </div>

      {/* VR Viewport Boundary Placeholder */}
      <div className="my-8 flex flex-col items-center justify-center text-center p-8 bg-charcoal-900/50 rounded-xl border border-dashed border-burgundy-400/30">
        <div className="w-24 h-24 rounded-full bg-burgundy-500/10 flex items-center justify-center mb-4 border border-burgundy-400/25">
          <Glasses className="w-12 h-12 text-burgundy-400" />
        </div>
        <h3 className="font-display text-lg font-bold text-parchment-100 mb-2">
          VR Integration Boundary
        </h3>
        <p className="font-editorial text-sm sm:text-base text-sandstone-300 max-w-md mb-6 leading-relaxed">
          Immersive 360° virtual reality exploration for WebXR-compatible browsers and VR headsets.
        </p>

        <div className="bg-charcoal-950/90 border border-burgundy-400/30 rounded-xl p-4 text-left max-w-md">
          <div className="flex items-center space-x-2 text-burgundy-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Info className="w-4 h-4" />
            <span>Architecture Integration Notice</span>
          </div>
          <p className="text-xs text-sandstone-300 leading-relaxed">
            VR sessions will leverage WebXR runtime sessions and the shared 3D monument assets. If VR hardware is unavailable, the UI automatically offers the Web 3D interactive viewer.
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
          Return to 3D Viewer
        </button>
      </div>
    </div>
  );
};

export default VRContainer;
