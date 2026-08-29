import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center } from '@react-three/drei';
import {
  Camera,
  ArrowLeft,
  RotateCw,
  Maximize2,
  Minimize2,
  Sparkles,
  RefreshCw,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';
import { TajMahalModel } from '@/features/3d-viewer/TajMahalModel';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface TajMahalARViewerProps {
  onExitAR: () => void;
}

export const TajMahalARViewer: React.FC<TajMahalARViewerProps> = ({ onExitAR }) => {
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [isPlaced, setIsPlaced] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(0.35); // Default tabletop scale
  const [rotationY, setRotationY] = useState<number>(0);
  const [position, setPosition] = useState<[number, number, number]>([0, -0.6, -2.5]);
  const [showHelp, setShowHelp] = useState<boolean>(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; distance?: number } | null>(null);

  // Initialize camera for AR passthrough
  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      setIsInitializing(true);
      setCameraError(null);

      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Camera access API is not supported on this browser/device.');
        }

        // Request rear/environment camera on mobile
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        setCameraStream(stream);
        setIsInitializing(false);
      } catch (err: unknown) {
        console.warn('AR camera initialization error:', err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Camera permission denied or camera not found.';
        setCameraError(errorMessage);
        setIsInitializing(false);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Handle tap-to-place or move on screen
  const handleViewportTap = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      // Don't trigger placement if clicking UI buttons
      if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('.ar-hud-control')) {
        return;
      }

      // Calculate relative tap position across viewport
      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as React.MouseEvent).clientX;
        clientY = (e as React.MouseEvent).clientY;
      }

      if (clientX && clientY && rect.width && rect.height) {
        const normX = (clientX - rect.left) / rect.width - 0.5;
        const normY = (clientY - rect.top) / rect.height - 0.5;
        // Map normalized coordinates to 3D space
        setPosition([normX * 2.0, -0.6 - normY * 1.5, -2.5]);
      }

      setIsPlaced(true);

      // Dismiss help after first placement
      if (showHelp) {
        setShowHelp(false);
      }
    },
    [showHelp],
  );

  // Touch gesture handling for rotation & pinch-to-scale on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchStartRef.current = {
        x: 0,
        y: 0,
        distance: Math.sqrt(dx * dx + dy * dy),
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    if (e.touches.length === 1 && touchStartRef.current.distance === undefined) {
      // Single finger swipe -> rotate model
      const deltaX = e.touches[0].clientX - touchStartRef.current.x;
      setRotationY((prev) => prev + deltaX * 0.015);
      touchStartRef.current.x = e.touches[0].clientX;
    } else if (e.touches.length === 2 && touchStartRef.current.distance) {
      // Two finger pinch -> scale model
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDistance = Math.sqrt(dx * dx + dy * dy);
      const factor = newDistance / touchStartRef.current.distance;

      setScale((prev) => Math.min(1.2, Math.max(0.1, prev * factor)));
      touchStartRef.current.distance = newDistance;
    }
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
  };

  // Scale presets
  const handleScaleUp = () => setScale((s) => Math.min(1.2, s + 0.08));
  const handleScaleDown = () => setScale((s) => Math.max(0.1, s - 0.08));
  const handleRotateStep = () => setRotationY((r) => r + Math.PI / 4);

  return (
    <div
      className="relative w-full h-[520px] sm:h-[620px] lg:h-[720px] rounded-3xl overflow-hidden bg-charcoal-950 border-2 border-terracotta-500/40 shadow-2xl flex flex-col justify-between select-none touch-none"
      onClick={handleViewportTap}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Live Background Video Feed for AR */}
      <video
        ref={videoRef}
        playsInline
        muted
        autoPlay
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Subtle overlay gradient to ensure 3D white marble remains crisp against any background */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/40 via-transparent to-charcoal-950/40 z-0 pointer-events-none" />

      {/* 2. Top Header Bar */}
      <div className="relative z-20 flex items-center justify-between p-4 sm:p-5 bg-charcoal-950/80 backdrop-blur-md border-b border-terracotta-500/30">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-terracotta-500/20 border border-terracotta-500/40 flex items-center justify-center text-terracotta-400">
            <Camera className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-display text-sm sm:text-base font-black text-parchment-100 tracking-wide">
                TAJ MAHAL &bull; AR EXPERIENCE
              </h3>
              <span className="bg-terracotta-500/20 text-terracotta-300 text-[10px] font-mono px-2 py-0.5 rounded border border-terracotta-500/30">
                Live AR
              </span>
            </div>
            <p className="text-[11px] text-sandstone-300 font-sans">
              {isPlaced ? 'Monument placed in environment' : 'Tap screen to place monument'}
            </p>
          </div>
        </div>

        {/* Exit AR Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onExitAR();
          }}
          className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-charcoal-900/90 hover:bg-charcoal-850 text-sandstone-200 border border-charcoal-700 hover:border-brass-500/40 text-xs font-semibold transition cursor-pointer shadow-lg"
          title="Exit Augmented Reality to standard 3D viewer"
        >
          <ArrowLeft className="w-4 h-4 text-brass-400" />
          <span>Exit AR</span>
        </button>
      </div>

      {/* 3. Loading State */}
      {isInitializing && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-charcoal-950/90 backdrop-blur-md space-y-4">
          <LoadingSpinner message="Initializing AR camera & spatial tracking..." />
          <p className="text-xs text-sandstone-400 max-w-xs text-center font-sans">
            Requesting camera permissions to project the Taj Mahal onto your surroundings...
          </p>
        </div>
      )}

      {/* Camera HTTP Notice Banner (Non-blocking fallback banner when camera is restricted by browser) */}
      {cameraError && !cameraStream && !isInitializing && (
        <div className="absolute top-16 left-4 right-4 z-30 bg-charcoal-900/95 border border-amber-500/40 rounded-2xl p-3.5 backdrop-blur-md shadow-2xl flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40 shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-display text-xs font-bold text-parchment-100">
                Spatial AR Preview Active
              </h5>
              <p className="text-[11px] text-sandstone-300 font-sans">
                Camera feed requires HTTPS on IP. Tap screen to place & rotate 3D monument!
              </p>
            </div>
          </div>
          <a
            href="/ar/index.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-brass-400 text-charcoal-950 text-[11px] font-bold hover:bg-brass-300 transition cursor-pointer shadow"
          >
            <span>WebXR Engine ↗</span>
          </a>
        </div>
      )}

      {/* 4. Placement Reticle (Animated Target Ring before placement) */}
      {!isPlaced && !isInitializing && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          <div className="relative flex items-center justify-center">
            {/* Pulsing Target Rings */}
            <div className="w-36 h-36 rounded-full border-2 border-dashed border-terracotta-400/70 animate-spin" style={{ animationDuration: '10s' }} />
            <div className="absolute w-24 h-24 rounded-full border-2 border-brass-400 animate-ping opacity-50" />
            <div className="absolute w-12 h-12 rounded-full bg-brass-400/30 border border-brass-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-brass-300 animate-pulse" />
            </div>
          </div>
          <p className="mt-4 text-xs font-bold font-display uppercase tracking-widest text-parchment-100 bg-charcoal-950/80 px-4 py-2 rounded-xl border border-brass-500/30 shadow-xl">
            TAP SCREEN TO PLACE MONUMENT
          </p>
        </div>
      )}

      {/* 5. 3D WebGL Canvas Layer */}
      {!isInitializing && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Canvas
            camera={{ position: [0, 1.2, 4], fov: 50 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
          >
            {/* Realistic Light Estimation aligned with camera */}
            <ambientLight intensity={0.9} color="#ffffff" />
            <directionalLight position={[5, 10, 5]} intensity={1.8} color="#fff8eb" castShadow />
            <directionalLight position={[-5, 5, -5]} intensity={0.6} color="#c0d8e8" />
            <pointLight position={[0, 3, 0]} intensity={0.8} color="#fef3c7" />

            {/* Placed Model with Transform state */}
            {isPlaced && (
              <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
                <Center>
                  <TajMahalModel />
                </Center>
              </group>
            )}
          </Canvas>
        </div>
      )}

      {/* 6. Floating AR Interaction HUD Controls */}
      <div className="relative z-20 p-4 sm:p-5 flex items-end justify-between gap-3 pointer-events-none">
        {/* Scale & Rotate HUD Tools */}
        {isPlaced && (
          <div className="flex flex-col space-y-2 pointer-events-auto ar-hud-control">
            <div className="bg-charcoal-950/85 backdrop-blur-md p-1.5 rounded-2xl border border-brass-500/30 shadow-2xl flex items-center space-x-1">
              {/* Scale Down */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleScaleDown();
                }}
                className="p-2.5 rounded-xl bg-charcoal-900 text-sandstone-300 hover:text-parchment-100 hover:bg-charcoal-800 border border-charcoal-700 transition cursor-pointer"
                title="Decrease Scale"
              >
                <Minimize2 className="w-4 h-4" />
              </button>

              {/* Current Scale Display */}
              <div className="px-2 text-center min-w-[54px]">
                <span className="text-[10px] text-sandstone-400 block font-mono">Scale</span>
                <span className="text-xs font-bold text-brass-300 font-mono">
                  {Math.round(scale * 100)}%
                </span>
              </div>

              {/* Scale Up */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleScaleUp();
                }}
                className="p-2.5 rounded-xl bg-charcoal-900 text-sandstone-300 hover:text-parchment-100 hover:bg-charcoal-800 border border-charcoal-700 transition cursor-pointer"
                title="Increase Scale"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Rotate */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRotateStep();
                }}
                className="p-2.5 rounded-xl bg-charcoal-900 text-sandstone-300 hover:text-parchment-100 hover:bg-charcoal-800 border border-charcoal-700 transition cursor-pointer ml-1"
                title="Rotate 45°"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              {/* Reset Placement */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaced(false);
                }}
                className="p-2.5 rounded-xl bg-charcoal-900 text-terracotta-300 hover:text-terracotta-200 hover:bg-charcoal-800 border border-terracotta-500/30 transition cursor-pointer"
                title="Reposition Monument"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Gestures Help Hint Bubble */}
        <div className="pointer-events-auto ar-hud-control">
          {showHelp && (
            <div className="bg-charcoal-950/90 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-brass-500/30 shadow-2xl max-w-xs space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-brass-300">
                <span className="flex items-center space-x-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-brass-400" />
                  <span>AR Gesture Controls</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowHelp(false)}
                  className="text-sandstone-400 hover:text-parchment-100 text-[11px]"
                >
                  Dismiss
                </button>
              </div>
              <ul className="text-[11px] text-sandstone-300 space-y-0.5 font-sans">
                <li>&bull; <strong>Tap:</strong> Place / Reposition</li>
                <li>&bull; <strong>1-Finger Swipe:</strong> Rotate model</li>
                <li>&bull; <strong>Pinch:</strong> Scale size</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TajMahalARViewer;
