import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import type { Hotspot } from '@/types/monument';
import type { ExperienceType } from '@/types/experience';
import { getMonumentBySlug } from '@/data/monuments';
import { ExperienceButtons } from '@/features/experience/ExperienceButtons';
import { ModelViewerContainer } from '@/features/3d-viewer/ModelViewerContainer';
import { ARContainer } from '@/features/ar/ARContainer';
import { VRContainer } from '@/features/vr/VRContainer';

export const MonumentDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const monument = slug ? getMonumentBySlug(slug) : undefined;

  const [experienceMode, setExperienceMode] = useState<ExperienceType>('web3d');
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(
    monument?.hotspots[0] || null,
  );
  const [activeTab, setActiveTab] = useState<'hotspots' | 'timeline' | 'sources'>('hotspots');

  if (!monument) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto border border-amber-500/20">
          <AlertCircle className="w-8 h-8 text-amber-400" />
        </div>
        <h2 className="text-2xl font-black text-slate-100">Monument Not Found</h2>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          The requested historical monument could not be located in our archives.
        </p>
        <Link
          to="/explore"
          className="inline-flex items-center space-x-2 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalogue</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/explore"
          className="flex items-center space-x-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 px-3 py-2 rounded-xl border border-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore</span>
        </Link>

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
        {experienceMode === 'web3d' && (
          <ModelViewerContainer
            hotspots={monument.hotspots}
            onSelectHotspot={setSelectedHotspot}
          />
        )}

        {experienceMode === 'ar' && (
          <ARContainer onBackTo3D={() => setExperienceMode('web3d')} />
        )}

        {experienceMode === 'vr' && (
          <VRContainer onBackTo3D={() => setExperienceMode('web3d')} />
        )}
      </div>

      {/* Interactive Information Drawer & Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 space-y-4">
        {/* Tab Selector */}
        <div className="flex border-b border-slate-800 pb-3 space-x-4">
          <button
            type="button"
            onClick={() => setActiveTab('hotspots')}
            className={`flex items-center space-x-2 text-xs font-bold pb-2 border-b-2 transition cursor-pointer ${
              activeTab === 'hotspots'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Hotspots Details</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center space-x-2 text-xs font-bold pb-2 border-b-2 transition cursor-pointer ${
              activeTab === 'timeline'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Timeline ({monument.timeline.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sources')}
            className={`flex items-center space-x-2 text-xs font-bold pb-2 border-b-2 transition cursor-pointer ${
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
                Factual statements and archaeological records cite Archaeological Survey of India (ASI) and UNESCO documentation.
              </p>
              <ul className="space-y-1 text-[11px] text-slate-300 list-disc list-inside pt-1">
                <li><strong className="text-amber-200">TM-001:</strong> Archaeological Survey of India (ASI) Agra Circle Records</li>
                <li><strong className="text-amber-200">TM-002:</strong> UNESCO World Heritage Inscription Document (1983)</li>
                <li><strong className="text-amber-200">TM-003:</strong> Ebba Koch, &quot;The Complete Taj Mahal&quot; (Thames &amp; Hudson)</li>
                <li><strong className="text-amber-200">TM-004:</strong> ASI National Monument Archival Database</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonumentDetail;
