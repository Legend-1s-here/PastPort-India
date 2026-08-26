import React from 'react';
import { Glasses, ArrowLeft, Info } from 'lucide-react';

interface VRContainerProps {
  onBackTo3D: () => void;
}

export const VRContainer: React.FC<VRContainerProps> = ({ onBackTo3D }) => {
  return (
    <div className="relative min-h-[500px] w-full bg-slate-950 rounded-2xl overflow-hidden border border-indigo-500/20 flex flex-col justify-between p-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-800">
        <div className="flex items-center space-x-3">
          <Glasses className="w-5 h-5 text-indigo-400" />
          <span className="font-semibold text-indigo-200">Virtual Reality Mode</span>
        </div>
        <button
          type="button"
          onClick={onBackTo3D}
          className="flex items-center space-x-2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit VR to 3D</span>
        </button>
      </div>

      {/* VR Viewport Boundary Placeholder */}
      <div className="my-8 flex flex-col items-center justify-center text-center p-8 bg-slate-900/40 rounded-xl border border-dashed border-indigo-500/30">
        <div className="w-24 h-24 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4 border border-indigo-500/20">
          <Glasses className="w-12 h-12 text-indigo-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-100 mb-2">VR Integration Boundary</h3>
        <p className="text-sm text-slate-400 max-w-md mb-6">
          Immersive 360° virtual reality exploration for WebXR-compatible browsers and VR headsets.
        </p>

        <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-lg p-4 text-left max-w-md">
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Info className="w-4 h-4" />
            <span>Architecture Integration Notice</span>
          </div>
          <p className="text-xs text-indigo-200/80">
            VR sessions will leverage WebXR runtime sessions and the shared 3D monument assets. If VR hardware is unavailable, the UI automatically offers the Web 3D interactive viewer.
          </p>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/80 p-3 rounded-xl">
        <span>Status: Integration Boundary Ready</span>
        <button
          type="button"
          onClick={onBackTo3D}
          className="text-indigo-400 hover:underline font-medium"
        >
          Return to 3D Viewer
        </button>
      </div>
    </div>
  );
};

export default VRContainer;
