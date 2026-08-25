import React, { useState } from 'react';
import { ArrowLeft, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import type { Monument, Hotspot } from '../types/monument';
import { ExperienceButtons } from '../components/ExperienceButtons';
import type { ExperienceMode } from '../components/ExperienceButtons';
import { ModelViewerContainer } from '../features/model-viewer/ModelViewerContainer';
import { ARContainer } from '../features/ar/ARContainer';
import { VRContainer } from '../features/vr/VRContainer';

interface MonumentDetailProps {
  monument: Monument;
  onBack: () => void;
}

export const MonumentDetail: React.FC<MonumentDetailProps> = ({ monument, onBack }) => {
  const [experienceMode, setExperienceMode] = useState<ExperienceMode>('3d');
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(
    monument.hotspots[0] || null
  );
  const [activeTab, setActiveTab] = useState<'hotspots' | 'timeline' | 'sources'>('hotspots');

  return (
    <div className="space-y-6 pb-16">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 px-3 py-2 rounded-xl border border-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore</span>
        </button>

        <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
          {monument.period}
        </span>
      </div>

      {/* Monument Title Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-100">{monument.name}</h1>
        <p className="text-xs text-slate-400 mt-1">{monument.location}</p>
      </div>

      {/* Experience Mode Toggle Buttons (3D / AR / VR) */}
      <ExperienceButtons
        currentMode={experienceMode}
        onModeChange={setExperienceMode}
      />

      {/* Main Experience Viewport */}
      <div>
        {experienceMode === '3d' && (
          <ModelViewerContainer
            hotspots={monument.hotspots}
            onSelectHotspot={setSelectedHotspot}
          />
        )}

        {experienceMode === 'ar' && (
          <ARContainer onBackTo3D={() => setExperienceMode('3d')} />
        )}

        {experienceMode === 'vr' && (
          <VRContainer onBackTo3D={() => setExperienceMode('3d')} />
        )}
      </div>

      {/* Interactive Information Drawer & Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 space-y-4">
        {/* Tab Selector */}
        <div className="flex border-b border-slate-800 pb-3 space-x-4">
          <button
            onClick={() => setActiveTab('hotspots')}
            className={`flex items-center space-x-2 text-xs font-bold pb-2 border-b-2 transition ${
              activeTab === 'hotspots'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Hotspots Details</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center space-x-2 text-xs font-bold pb-2 border-b-2 transition ${
              activeTab === 'timeline'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Timeline ({monument.timeline.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sources')}
            className={`flex items-center space-x-2 text-xs font-bold pb-2 border-b-2 transition ${
              activeTab === 'sources'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Sources & Attribution</span>
          </button>
        </div>

        {/* Tab Content 1: Hotspots */}
        {activeTab === 'hotspots' && (
          <div className="space-y-3">
            {selectedHotspot ? (
              <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-amber-300">{selectedHotspot.title}</h3>
                  <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                    Source: {selectedHotspot.sourceIds.join(', ')}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedHotspot.description}
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-400">Select a hotspot on the 3D model above.</p>
            )}
          </div>
        )}

        {/* Tab Content 2: Timeline */}
        {activeTab === 'timeline' && (
          <div className="space-y-3 relative pl-4 border-l-2 border-slate-800">
            {monument.timeline.map((event) => (
              <div key={event.id} className="relative group">
                <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-amber-500 border-2 border-slate-900" />
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-xs font-extrabold text-amber-400">{event.year}</span>
                  <h4 className="text-xs font-bold text-slate-200">{event.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content 3: Sources & Attribution */}
        {activeTab === 'sources' && (
          <div className="space-y-3 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-amber-300 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Historical Source Ledger</span>
              </h4>
              <p className="text-[11px] text-slate-400">
                Prepared by Research Lead (Manmath). Factual statements cite Archaeological Survey of India (ASI) and UNESCO documentation.
              </p>
              <ul className="space-y-1 text-[11px] text-slate-300 list-disc list-inside pt-1">
                <li><strong className="text-amber-200">TM-001:</strong> Archaeological Survey of India (ASI) Agra Circle Records</li>
                <li><strong className="text-amber-200">TM-002:</strong> UNESCO World Heritage Inscription Document (1983)</li>
                <li><strong className="text-amber-200">TM-003:</strong> Ebba Koch, "The Complete Taj Mahal" (Thames & Hudson)</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
