import React, { useState } from 'react';
import {
  MapPin,
  Sparkles,
  Box,
  Camera,
  Clock,
  ShieldCheck,
  Compass,
  Volume2,
  VolumeX,
  Eye,
  Calendar,
  Layers,
  Award,
} from 'lucide-react';
import { TAJ_MAHAL_DATA, TAJ_MAHAL_PERSPECTIVES, type TajMahalPerspective } from '@/data/tajMahal';
import { Badge } from '@/components/ui';

interface TajMahalHeroProps {
  onExplore3DClick: () => void;
  onExploreARClick: () => void;
  onTimelineClick: () => void;
}

export const TajMahalHero: React.FC<TajMahalHeroProps> = ({
  onExplore3DClick,
  onExploreARClick,
  onTimelineClick,
}) => {
  const [selectedPerspective, setSelectedPerspective] = useState<TajMahalPerspective>(
    TAJ_MAHAL_PERSPECTIVES[0],
  );
  const [isAtmosphereActive, setIsAtmosphereActive] = useState(false);

  return (
    <section className="relative w-full rounded-3xl overflow-hidden bg-charcoal-950 border border-brass-500/30 shadow-2xl shadow-charcoal-950/90 transition-all duration-500">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,164,76,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,164,76,0.03)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

      {/* Ambient Lighting / Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-gradient-to-b from-brass-500/10 via-brass-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Main Hero Visual Area */}
      <div className="relative min-h-[480px] sm:min-h-[560px] lg:min-h-[640px] flex flex-col justify-between p-6 sm:p-10 lg:p-14">
        {/* Dynamic High-Resolution Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={selectedPerspective.imageUrl}
            alt={selectedPerspective.caption}
            key={selectedPerspective.id}
            className="w-full h-full object-cover object-center transition-all duration-1000 ease-out transform scale-100 animate-fadeIn"
          />
          {/* Multi-layer Cinematic Vignette & Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-charcoal-950/40" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-charcoal-950/30 to-charcoal-950/85 pointer-events-none" />
        </div>

        {/* Top Floating Utility Bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <Badge variant="brass">
              <span className="flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-charcoal-950 inline" />
                <span>Flagship Heritage Monument</span>
              </span>
            </Badge>

            <span className="bg-charcoal-950/90 backdrop-blur-md text-[11px] font-mono text-sandstone-300 px-3 py-1 rounded-full border border-brass-500/30 shadow-lg">
              ASI Inscription // TM-001 &bull; 27.1751° N, 78.0421° E
            </span>

            <span className="hidden md:inline-flex items-center space-x-1.5 bg-terracotta-500/20 backdrop-blur-md text-[11px] text-terracotta-300 px-3 py-1 rounded-full border border-terracotta-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-terracotta-400" />
              <span>UNESCO Inscribed 1983</span>
            </span>
          </div>

          {/* Perspective & Atmosphere Controls */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setIsAtmosphereActive(!isAtmosphereActive)}
              className={`flex items-center space-x-1.5 text-xs px-3 py-1.5 rounded-full border backdrop-blur-md transition-all duration-200 cursor-pointer ${
                isAtmosphereActive
                  ? 'bg-brass-500/25 border-brass-400 text-brass-300 ring-1 ring-brass-400/40'
                  : 'bg-charcoal-900/80 border-charcoal-700 text-sandstone-300 hover:bg-charcoal-800 hover:text-parchment-100'
              }`}
              title="Toggle Mughal Garden Ambient Audio"
            >
              {isAtmosphereActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-brass-400 animate-pulse" />
                  <span className="hidden sm:inline font-sans text-[11px]">Santoor Ambience ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-sandstone-400" />
                  <span className="hidden sm:inline font-sans text-[11px]">Ambience Muted</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Center Title & Monument Headline */}
        <div className="relative z-10 my-auto pt-10 sm:pt-14 pb-8 space-y-4 max-w-4xl">
          {/* Location Breadcrumb */}
          <div className="inline-flex items-center space-x-2 bg-charcoal-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-brass-500/25 shadow-md">
            <MapPin className="w-4 h-4 text-terracotta-400 animate-bounce" />
            <span className="text-xs sm:text-sm font-semibold text-brass-300 font-sans tracking-wide">
              {TAJ_MAHAL_DATA.location}
            </span>
            <span className="text-sandstone-500">&bull;</span>
            <span className="text-xs text-sandstone-300 font-editorial italic">
              Yamuna Riverfront Complex
            </span>
          </div>

          {/* Grand Monument Title */}
          <div className="space-y-2">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-parchment-100 tracking-wider text-gold-gradient drop-shadow-2xl">
              TAJ MAHAL
            </h1>
            <p className="font-editorial text-lg sm:text-2xl text-sandstone-200 font-normal leading-relaxed italic max-w-3xl">
              &ldquo;The Jewel of Muslim Art in India &amp; Universal Masterpiece of World
              Heritage&rdquo;
            </p>
          </div>

          {/* Concise Historical Hook */}
          <p className="font-sans text-xs sm:text-sm text-sandstone-300/90 max-w-2xl leading-relaxed">
            Commissioned in 1631 by Mughal Emperor <strong className="text-parchment-100">Shah Jahan</strong> to
            enshrine the memory of his beloved empress <strong className="text-parchment-100">Mumtaz Mahal</strong>.
            A monumental synthesis of Persian geometry, Islamic calligraphy, and luminous Makrana white marble.
          </p>

          {/* Key Quick Fact Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 max-w-3xl">
            <div className="bg-charcoal-950/85 backdrop-blur-md p-2.5 rounded-xl border border-brass-500/20 flex items-center space-x-2.5">
              <Calendar className="w-4 h-4 text-brass-400 shrink-0" />
              <div>
                <span className="text-[10px] text-sandstone-400 block uppercase tracking-wider font-semibold">Epoch</span>
                <span className="font-display text-xs font-bold text-parchment-100">1631–1653 CE</span>
              </div>
            </div>

            <div className="bg-charcoal-950/85 backdrop-blur-md p-2.5 rounded-xl border border-brass-500/20 flex items-center space-x-2.5">
              <Layers className="w-4 h-4 text-brass-400 shrink-0" />
              <div>
                <span className="text-[10px] text-sandstone-400 block uppercase tracking-wider font-semibold">Style</span>
                <span className="font-display text-xs font-bold text-parchment-100">Mughal Classical</span>
              </div>
            </div>

            <div className="bg-charcoal-950/85 backdrop-blur-md p-2.5 rounded-xl border border-brass-500/20 flex items-center space-x-2.5">
              <Award className="w-4 h-4 text-brass-400 shrink-0" />
              <div>
                <span className="text-[10px] text-sandstone-400 block uppercase tracking-wider font-semibold">Status</span>
                <span className="font-display text-xs font-bold text-parchment-100">UNESCO 1983</span>
              </div>
            </div>

            <div className="bg-charcoal-950/85 backdrop-blur-md p-2.5 rounded-xl border border-brass-500/20 flex items-center space-x-2.5">
              <Compass className="w-4 h-4 text-brass-400 shrink-0" />
              <div>
                <span className="text-[10px] text-sandstone-400 block uppercase tracking-wider font-semibold">Craftsmen</span>
                <span className="font-display text-xs font-bold text-parchment-100">20,000+ Artisans</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Action CTAs & Perspective Switcher */}
        <div className="relative z-10 pt-6 border-t border-brass-500/20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* 3D CTA Button */}
            <button
              type="button"
              onClick={onExplore3DClick}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-xl font-display text-xs sm:text-sm font-bold text-charcoal-950 bg-gradient-to-r from-brass-400 via-brass-300 to-brass-500 hover:from-brass-300 hover:to-brass-200 shadow-xl shadow-brass-500/25 hover:shadow-brass-400/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-300"
            >
              <Box className="w-4.5 h-4.5 text-charcoal-950" />
              <span className="tracking-wide uppercase">Explore in 3D (WebXR)</span>
            </button>

            {/* AR CTA Button */}
            <button
              type="button"
              onClick={onExploreARClick}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2.5 px-5 py-3.5 rounded-xl font-display text-xs sm:text-sm font-bold text-terracotta-200 bg-terracotta-500/20 hover:bg-terracotta-500/30 border border-terracotta-400/40 hover:border-terracotta-400 shadow-lg shadow-terracotta-900/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-400"
            >
              <Camera className="w-4.5 h-4.5 text-terracotta-400" />
              <span className="tracking-wide uppercase">Launch AR View</span>
            </button>

            {/* Timeline Shortcut */}
            <button
              type="button"
              onClick={onTimelineClick}
              className="hidden sm:inline-flex items-center space-x-2 px-4 py-3.5 rounded-xl font-display text-xs font-semibold text-sandstone-300 bg-charcoal-900/80 hover:bg-charcoal-800 border border-charcoal-700 hover:border-brass-500/40 transition-all duration-200 cursor-pointer"
            >
              <Clock className="w-4 h-4 text-brass-400" />
              <span>Timeline</span>
            </button>
          </div>

          {/* Interactive Perspective Selector */}
          <div className="flex items-center space-x-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
            <span className="text-[10px] uppercase font-display font-bold tracking-widest text-sandstone-400 shrink-0 hidden sm:inline flex items-center space-x-1">
              <Eye className="w-3 h-3 text-brass-400 mr-1" />
              <span>Perspectives:</span>
            </span>

            <div className="flex items-center space-x-1.5 bg-charcoal-950/90 p-1.5 rounded-xl border border-brass-500/25">
              {TAJ_MAHAL_PERSPECTIVES.map((persp) => (
                <button
                  type="button"
                  key={persp.id}
                  onClick={() => setSelectedPerspective(persp)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    selectedPerspective.id === persp.id
                      ? 'bg-brass-500/25 text-brass-300 border border-brass-500/50 shadow-sm font-semibold'
                      : 'text-sandstone-400 hover:text-parchment-100 hover:bg-charcoal-850'
                  }`}
                >
                  <span className="font-sans text-[11px]">{persp.tag}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TajMahalHero;
