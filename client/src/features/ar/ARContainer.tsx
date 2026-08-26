import React from 'react';
import { Camera, AlertTriangle, ArrowLeft } from 'lucide-react';

interface ARContainerProps {
  onBackTo3D: () => void;
}

export const ARContainer: React.FC<ARContainerProps> = ({ onBackTo3D }) => {
  return (
    <div className="relative min-h-[500px] w-full bg-slate-950 rounded-2xl overflow-hidden border border-amber-500/20 flex flex-col justify-between p-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-800">
        <div className="flex items-center space-x-3">
          <Camera className="w-5 h-5 text-amber-400 animate-pulse" />
          <span className="font-semibold text-amber-200">Augmented Reality Mode</span>
        </div>
        <button
          type="button"
          onClick={onBackTo3D}
          className="flex items-center space-x-2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit AR to 3D</span>
        </button>
      </div>

      {/* Camera / AR Viewport Boundary Placeholder */}
      <div className="my-8 flex flex-col items-center justify-center text-center p-8 bg-slate-900/40 rounded-xl border border-dashed border-amber-500/30">
        <div className="w-24 h-24 rounded-full bg-amber-500/10 flex items-center justify-center mb-4 border border-amber-500/20">
          <Camera className="w-12 h-12 text-amber-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-100 mb-2">AR Integration Boundary</h3>
        <p className="text-sm text-slate-400 max-w-md mb-6">
          Augmented reality capabilities will project 3D monument reconstructions onto physical surfaces or image markers on supported mobile devices.
        </p>

        <div className="bg-amber-950/40 border border-amber-500/30 rounded-lg p-4 text-left max-w-md">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>Architecture Integration Notice</span>
          </div>
          <p className="text-xs text-amber-200/80">
            AR implementation is scheduled for subsequent phases. The frontend is decoupled from specific AR runtimes to allow flexible framework selection (WebXR, marker tracking, or native bridges).
          </p>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/80 p-3 rounded-xl">
        <span>Status: Integration Boundary Ready</span>
        <button
          type="button"
          onClick={onBackTo3D}
          className="text-amber-400 hover:underline font-medium"
        >
          Switch to Standard 3D Viewer
        </button>
      </div>
    </div>
  );
};

export default ARContainer;
