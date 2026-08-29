import React, { useEffect } from 'react';

interface ARContainerProps {
  onBackTo3D?: () => void;
}

export const ARContainer: React.FC<ARContainerProps> = () => {
  useEffect(() => {
    window.location.href = '/ar/index.html';
  }, []);

  return (
    <div className="w-full h-[400px] flex flex-col items-center justify-center bg-charcoal-950 rounded-2xl border border-brass-500/20 text-center p-6 space-y-3">
      <div className="w-8 h-8 rounded-full border-2 border-brass-400 border-t-transparent animate-spin mx-auto" />
      <p className="text-sm font-display font-bold text-parchment-100">
        Launching WebXR Engine...
      </p>
    </div>
  );
};

export default ARContainer;
