import React, { useState } from 'react';
import {
  Box,
  Camera,
  Sparkles,
  QrCode,
  Smartphone,
  Layers,
  Sun,
  CheckCircle2,
  X,
  Glasses,
} from 'lucide-react';
import { Badge } from '@/components/ui';

interface TajMahalExperienceCTAProps {
  onLaunch3D: () => void;
  onLaunchAR: () => void;
  onLaunchVR: () => void;
}

export const TajMahalExperienceCTA: React.FC<TajMahalExperienceCTAProps> = ({
  onLaunch3D,
  onLaunchAR,
  onLaunchVR,
}) => {
  const [showQRModal, setShowQRModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'tabletop' | 'fullscale'>('tabletop');

  return (
    <section className="space-y-8" id="spatial-experiences" aria-labelledby="experiences-heading">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-brass-500/20 pb-5">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs font-display uppercase tracking-[0.2em] text-brass-400 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-brass-400" />
            <span>Spatial Computing &amp; Immersive Gateways</span>
          </div>
          <h2
            id="experiences-heading"
            className="font-display text-2xl sm:text-4xl font-black text-parchment-100 tracking-tight"
          >
            Interactive 3D &amp; AR Gateways
          </h2>
        </div>
        <p className="font-editorial text-xs sm:text-sm text-sandstone-300 max-w-md leading-relaxed italic">
          Experience the Taj Mahal through hardware-accelerated 3D WebXR rendering and augmented reality spatial projections.
        </p>
      </div>

      {/* Dual Flagship Experience Cards Grid */}
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        {/* 1. Explore in 3D Card (Flagship Gold Theme) */}
        <div className="surface-museum rounded-3xl p-6 sm:p-8 border-2 border-brass-500/40 hover:border-brass-400 shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brass-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-brass-500/15 transition-colors duration-500" />

          <div className="space-y-5 relative z-10">
            {/* Badge & Mode Tag */}
            <div className="flex items-center justify-between">
              <Badge variant="brass">
                <span className="flex items-center space-x-1.5">
                  <Box className="w-3.5 h-3.5 text-charcoal-950" />
                  <span>3D / WebXR Engine</span>
                </span>
              </Badge>

              <span className="text-[10px] font-mono text-sandstone-400 bg-charcoal-950 px-2.5 py-1 rounded-md border border-charcoal-800 flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-brass-400 inline" />
                <span>WebGL 2.0 Ready</span>
              </span>
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h3 className="font-display text-xl sm:text-2xl font-black text-parchment-100 group-hover:text-brass-300 transition-colors">
                Explore in 3D Orbit Reconstruction
              </h3>
              <p className="font-editorial text-sm sm:text-base text-sandstone-200 leading-relaxed">
                Freely rotate, zoom, and inspect photogrammetric sub-millimeter marble reliefs, vaulted pishtaqs, and the 73-meter central bulbous dome in interactive 3D.
              </p>
            </div>

            {/* Feature List Checklist */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <div className="bg-charcoal-950/80 p-3 rounded-xl border border-charcoal-800 space-y-1">
                <div className="flex items-center space-x-1.5 text-brass-300 text-xs font-semibold">
                  <Layers className="w-3.5 h-3.5 text-brass-400" />
                  <span>Interactive Hotspots</span>
                </div>
                <p className="text-[11px] text-sandstone-400">
                  Citations mapped directly on the 3D model geometry.
                </p>
              </div>

              <div className="bg-charcoal-950/80 p-3 rounded-xl border border-charcoal-800 space-y-1">
                <div className="flex items-center space-x-1.5 text-brass-300 text-xs font-semibold">
                  <Sun className="w-3.5 h-3.5 text-brass-400" />
                  <span>Sunlight Simulator</span>
                </div>
                <p className="text-[11px] text-sandstone-400">
                  Simulate solar reflections across Makrana white marble.
                </p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="relative z-10 pt-4 border-t border-charcoal-800 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={onLaunch3D}
              className="w-full sm:flex-1 inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-xl font-display text-xs sm:text-sm font-bold text-charcoal-950 bg-gradient-to-r from-brass-400 via-brass-300 to-brass-500 hover:from-brass-300 hover:to-brass-200 shadow-xl shadow-brass-500/20 hover:shadow-brass-400/30 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-400"
            >
              <Box className="w-4 h-4 text-charcoal-950" />
              <span className="tracking-wider uppercase">Launch 3D Explorer</span>
            </button>

            <button
              type="button"
              onClick={onLaunchVR}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-3.5 rounded-xl font-display text-xs font-semibold text-sandstone-300 bg-charcoal-950 hover:bg-charcoal-850 border border-charcoal-700 hover:border-brass-500/40 transition-all duration-200 cursor-pointer"
              title="Enter WebXR VR Mode"
            >
              <Glasses className="w-4 h-4 text-brass-400" />
              <span>WebXR VR</span>
            </button>
          </div>
        </div>

        {/* 2. AR Experience Card (Terracotta / Mobile AR Theme) */}
        <div className="surface-museum rounded-3xl p-6 sm:p-8 border-2 border-terracotta-500/40 hover:border-terracotta-400 shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-terracotta-500/15 transition-colors duration-500" />

          <div className="space-y-5 relative z-10">
            {/* Badge & Mode Tag */}
            <div className="flex items-center justify-between">
              <Badge variant="terracotta">
                <span className="flex items-center space-x-1.5">
                  <Camera className="w-3.5 h-3.5 text-parchment-100" />
                  <span>Augmented Reality</span>
                </span>
              </Badge>

              <span className="text-[10px] font-mono text-terracotta-300 bg-charcoal-950 px-2.5 py-1 rounded-md border border-terracotta-500/30 flex items-center space-x-1">
                <Smartphone className="w-3 h-3 text-terracotta-400 inline" />
                <span>iOS &bull; Android WebXR</span>
              </span>
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h3 className="font-display text-xl sm:text-2xl font-black text-parchment-100 group-hover:text-terracotta-300 transition-colors">
                Project Taj Mahal in Augmented Reality
              </h3>
              <p className="font-editorial text-sm sm:text-base text-sandstone-200 leading-relaxed">
                Superimpose a 1:1 life-scale or miniature tabletop holographic model of the Taj Mahal onto your physical surroundings using WebXR camera tracking.
              </p>
            </div>

            {/* Feature Mode Toggle */}
            <div className="bg-charcoal-950/80 p-1.5 rounded-xl border border-charcoal-800 flex items-center space-x-1.5">
              <button
                type="button"
                onClick={() => setActiveTab('tabletop')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'tabletop'
                    ? 'bg-terracotta-500/20 text-terracotta-300 border border-terracotta-500/40 shadow-sm'
                    : 'text-sandstone-400 hover:text-parchment-100'
                }`}
              >
                Tabletop Hologram (1:100 Scale)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('fullscale')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'fullscale'
                    ? 'bg-terracotta-500/20 text-terracotta-300 border border-terracotta-500/40 shadow-sm'
                    : 'text-sandstone-400 hover:text-parchment-100'
                }`}
              >
                Life-Size Ground Scale (1:1)
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="relative z-10 pt-4 border-t border-charcoal-800 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={onLaunchAR}
              className="w-full sm:flex-1 inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-xl font-display text-xs sm:text-sm font-bold text-parchment-100 bg-gradient-to-r from-terracotta-500 via-terracotta-600 to-terracotta-500 hover:from-terracotta-400 hover:to-terracotta-500 shadow-xl shadow-terracotta-900/30 hover:shadow-terracotta-600/40 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-400"
            >
              <Camera className="w-4 h-4 text-parchment-100" />
              <span className="tracking-wider uppercase">Launch AR Mode</span>
            </button>

            <button
              type="button"
              onClick={() => setShowQRModal(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-3.5 rounded-xl font-display text-xs font-semibold text-terracotta-300 bg-charcoal-950 hover:bg-charcoal-850 border border-terracotta-500/30 hover:border-terracotta-400 transition-all duration-200 cursor-pointer"
              title="Scan QR Code to open AR on Phone"
            >
              <QrCode className="w-4 h-4 text-terracotta-400" />
              <span>Mobile QR</span>
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Modal for Mobile AR Preview */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-charcoal-900 rounded-3xl p-6 sm:p-8 max-w-sm w-full border-2 border-brass-500/40 shadow-2xl relative space-y-5">
            <button
              type="button"
              onClick={() => setShowQRModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-charcoal-800 text-sandstone-400 hover:text-parchment-100 hover:bg-charcoal-700 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 rounded-2xl bg-terracotta-500/15 border border-terracotta-500/30 flex items-center justify-center text-terracotta-400 mx-auto">
                <Camera className="w-6 h-6" />
              </div>
              <h4 className="font-display text-lg font-bold text-parchment-100">
                Launch AR on Mobile
              </h4>
              <p className="font-editorial text-xs text-sandstone-300">
                Scan this code with your smartphone camera to open the WebXR AR viewport directly in your mobile browser.
              </p>
            </div>

            {/* QR Code Mock Box */}
            <div className="p-5 bg-parchment-100 rounded-2xl flex flex-col items-center justify-center shadow-inner">
              <QrCode className="w-36 h-36 text-charcoal-950" />
              <span className="text-[10px] font-mono text-charcoal-800 mt-2 font-bold tracking-widest uppercase">
                PASTPORT.IN/AR/TAJ-MAHAL
              </span>
            </div>

            <div className="bg-charcoal-950 p-3 rounded-xl border border-charcoal-800 text-center text-xs text-sandstone-400">
              <span>Requires Safari (iOS 15+) or Chrome (Android 11+)</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TajMahalExperienceCTA;
