import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Camera,
  ExternalLink,
  Smartphone,
  Sparkles,
  Layers,
  QrCode,
  ShieldCheck,
} from 'lucide-react';
import { TajMahalARViewer } from '@/features/ar/TajMahalARViewer';

export const ARView: React.FC = () => {
  const [arMode, setArMode] = useState<'camera' | 'webxr'>('camera');
  const [showQrModal, setShowQrModal] = useState(false);

  return (
    <div className="w-full space-y-8 pb-16">
      {/* Top Header & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/monuments/taj-mahal"
          className="inline-flex items-center space-x-2 text-xs font-semibold bg-charcoal-900/90 hover:bg-charcoal-800 text-sandstone-300 px-4 py-2.5 rounded-xl border border-brass-500/25 transition-all group"
        >
          <ArrowLeft className="w-4 h-4 text-brass-400 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Monument</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {/* Toggle between In-App Camera AR & Fullscreen WebXR Engine */}
          <button
            type="button"
            onClick={() => setArMode('camera')}
            className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              arMode === 'camera'
                ? 'bg-terracotta-500 text-parchment-100 shadow-lg shadow-terracotta-900/40 border border-terracotta-400/50'
                : 'bg-charcoal-900 text-sandstone-300 hover:text-parchment-100 border border-charcoal-700'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Interactive Camera AR</span>
          </button>

          <a
            href="/ar/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-brass-400 via-brass-300 to-brass-500 text-charcoal-950 hover:from-brass-300 hover:to-brass-200 transition-all shadow-md cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-charcoal-950" />
            <span>Launch WebXR Engine ↗</span>
          </a>

          <button
            type="button"
            onClick={() => setShowQrModal(!showQrModal)}
            className="p-2 rounded-xl bg-charcoal-900 border border-charcoal-700 text-sandstone-300 hover:text-parchment-100 hover:border-brass-500/30 transition cursor-pointer"
            title="Scan QR Code to open on Mobile"
          >
            <QrCode className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Title & Badge */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 bg-terracotta-500/15 border border-terracotta-500/30 text-terracotta-300 text-xs font-semibold px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Augmented Reality Spatial Heritage</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-black text-parchment-100">
          Taj Mahal <span className="text-gold-gradient font-light">in Augmented Reality</span>
        </h1>
        <p className="text-sandstone-300 text-xs sm:text-sm max-w-2xl font-editorial">
          Experience the monumental architecture of the Taj Mahal in your physical space. Use the camera passthrough to place, rotate, and examine structural details.
        </p>
      </div>

      {/* Main AR Display Window */}
      <div className="relative">
        <TajMahalARViewer onExitAR={() => window.history.back()} />
      </div>

      {/* Feature Guide & Compatibility Badges */}
      <div className="grid sm:grid-cols-3 gap-4 pt-2">
        <div className="bg-charcoal-900/80 p-5 rounded-2xl border border-charcoal-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-terracotta-500/15 flex items-center justify-center text-terracotta-400 border border-terracotta-500/30">
            <Smartphone className="w-4 h-4" />
          </div>
          <h4 className="font-display text-sm font-bold text-parchment-100">Mobile Camera Tracking</h4>
          <p className="text-xs text-sandstone-400 leading-relaxed font-sans">
            Rear camera passthrough with tap-to-place placement and 1-finger rotate gestures.
          </p>
        </div>

        <div className="bg-charcoal-900/80 p-5 rounded-2xl border border-charcoal-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-brass-500/15 flex items-center justify-center text-brass-400 border border-brass-500/30">
            <Layers className="w-4 h-4" />
          </div>
          <h4 className="font-display text-sm font-bold text-parchment-100">Shared 3D GLB Model</h4>
          <p className="text-xs text-sandstone-400 leading-relaxed font-sans">
            Uses the exact same high-detail GLB asset across standard 3D preview, AR, and VR.
          </p>
        </div>

        <div className="bg-charcoal-900/80 p-5 rounded-2xl border border-charcoal-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-terracotta-500/15 flex items-center justify-center text-terracotta-400 border border-terracotta-500/30">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h4 className="font-display text-sm font-bold text-parchment-100">WebXR Hit-Test Ready</h4>
          <p className="text-xs text-sandstone-400 leading-relaxed font-sans">
            Full floor and tabletop plane detection supported on Chrome Android and WebXR browsers.
          </p>
        </div>
      </div>

      {/* QR Code Scan Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-charcoal-900 border border-brass-500/40 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-brass-500/20 text-brass-400 border border-brass-500/30 flex items-center justify-center mx-auto">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-parchment-100">Open AR on Mobile</h3>
            <p className="text-xs text-sandstone-300">
              Scan this URL on your mobile phone to experience augmented reality directly with your camera.
            </p>
            <div className="bg-charcoal-950 p-4 rounded-2xl border border-charcoal-800 flex items-center justify-center">
              <a
                href="/ar/index.html"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-brass-400 hover:underline font-mono break-all"
              >
                {window.location.origin}/ar/index.html
              </a>
            </div>
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-xs font-bold text-parchment-100 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ARView;
