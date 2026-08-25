import React from 'react';
import { Search, Compass, ShieldCheck, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { TAJ_MAHAL_DATA } from '../data/tajMahal';

interface HomeProps {
  onExploreMonument: () => void;
}

export const Home: React.FC<HomeProps> = ({ onExploreMonument }) => {
  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-amber-500/20 p-6 md:p-12 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold px-3 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SIH26195 — Student Innovation: Heritage & Culture</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-100 tracking-tight leading-tight">
            Step Into India's Rich Heritage in <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">3D, AR & VR</span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Experience source-backed historical monuments with 3D reconstructions, interactive hotspots, chronological timelines, and mobile AR/VR views.
          </p>

          {/* Quick Search Action Bar */}
          <div className="pt-2">
            <button
              onClick={onExploreMonument}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <Search className="w-5 h-5" />
              <span>Explore Flagship Monument: Taj Mahal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Flagship Monument Highlight Card */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <Compass className="w-5 h-5 text-amber-400" />
            <span>Featured Heritage Monument</span>
          </h2>
          <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
            Flagship MVP
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/40 transition duration-300 shadow-xl grid md:grid-cols-2">
          {/* Image Thumbnail */}
          <div className="relative h-64 md:h-full min-h-[240px]">
            <img
              src={TAJ_MAHAL_DATA.heroImage}
              alt={TAJ_MAHAL_DATA.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs font-semibold text-amber-300 bg-slate-900/80 px-2 py-1 rounded border border-amber-500/30">
                {TAJ_MAHAL_DATA.period}
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">{TAJ_MAHAL_DATA.name}</h3>
              <p className="text-xs text-slate-300">{TAJ_MAHAL_DATA.location}</p>
            </div>
          </div>

          {/* Details & Actions */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {TAJ_MAHAL_DATA.shortDescription}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
                  <span className="text-slate-400 block text-[10px]">Commissioned By</span>
                  <span className="font-semibold text-amber-200">{TAJ_MAHAL_DATA.builtBy}</span>
                </div>
                <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
                  <span className="text-slate-400 block text-[10px]">3D Hotspots</span>
                  <span className="font-semibold text-amber-200">{TAJ_MAHAL_DATA.hotspots.length} Verified Spots</span>
                </div>
              </div>
            </div>

            <button
              onClick={onExploreMonument}
              className="w-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-amber-500/30 font-semibold py-2.5 px-4 rounded-xl transition flex items-center justify-center space-x-2 text-xs sm:text-sm"
            >
              <span>Open Taj Mahal Experience</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Product Architecture Pillars */}
      <section className="grid sm:grid-cols-3 gap-4 pt-4">
        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
            <Layers className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-100">Shared 3D Core</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            One GLB model powers standard 3D viewer, marker-based AR, and optional VR mode.
          </p>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-100">Source Ledger</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            All facts, hotspots, and dates cite institutional sources (ASI, UNESCO, Research).
          </p>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-100">Fallback Protection</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            If AR or VR is unsupported on a device, the app cleanly falls back to 3D mode.
          </p>
        </div>
      </section>
    </div>
  );
};
