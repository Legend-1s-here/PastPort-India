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
import { Badge, Surface } from '@/components/ui';

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
        <div className="w-16 h-16 rounded-full bg-terracotta-500/15 flex items-center justify-center mx-auto border border-terracotta-500/30">
          <AlertCircle className="w-8 h-8 text-terracotta-400" />
        </div>
        <h2 className="font-display text-2xl font-bold text-parchment-100">Monument Not Found</h2>
        <p className="text-xs text-sandstone-400 max-w-sm mx-auto">
          The requested historical monument could not be located in our archives.
        </p>
        <Link
          to="/explore"
          className="inline-flex items-center space-x-2 text-xs font-semibold bg-brass-500 hover:bg-brass-400 text-charcoal-950 px-4 py-2.5 rounded-xl transition cursor-pointer"
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
          className="flex items-center space-x-2 text-xs font-semibold bg-charcoal-900 hover:bg-charcoal-800 text-sandstone-300 px-3.5 py-2 rounded-xl border border-brass-500/20 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore</span>
        </Link>

        <Badge variant="brass">{monument.period}</Badge>
      </div>

      {/* Monument Title Header */}
      <div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-parchment-100 tracking-wide">
          {monument.name}
        </h1>
        <p className="text-xs sm:text-sm text-sandstone-400 mt-1">{monument.location}</p>
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
      <Surface variant="museum" className="p-4 sm:p-6 space-y-6">
        {/* Tab Selector */}
        <div className="flex border-b border-charcoal-700/80 pb-3 space-x-6">
          <button
            type="button"
            onClick={() => setActiveTab('hotspots')}
            className={`flex items-center space-x-2 text-xs font-bold pb-2 border-b-2 transition cursor-pointer ${
              activeTab === 'hotspots'
                ? 'border-brass-400 text-brass-300'
                : 'border-transparent text-sandstone-400 hover:text-parchment-100'
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
                ? 'border-brass-400 text-brass-300'
                : 'border-transparent text-sandstone-400 hover:text-parchment-100'
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
                ? 'border-brass-400 text-brass-300'
                : 'border-transparent text-sandstone-400 hover:text-parchment-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Sources &amp; Attribution</span>
          </button>
        </div>

        {/* Tab Content 1: Hotspots */}
        {activeTab === 'hotspots' && (
          <div className="space-y-3">
            {selectedHotspot ? (
              <div className="bg-charcoal-950/80 p-4 sm:p-5 rounded-xl border border-brass-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-sm sm:text-base font-bold text-brass-300">
                    {selectedHotspot.title}
                  </h3>
                  <span className="text-[10px] text-sandstone-400 bg-charcoal-900 px-2 py-0.5 rounded border border-charcoal-700">
                    Source: {selectedHotspot.sourceIds.join(', ')}
                  </span>
                </div>
                <p className="font-editorial text-sm sm:text-base text-sandstone-200 leading-relaxed">
                  {selectedHotspot.description}
                </p>
              </div>
            ) : (
              <p className="text-xs text-sandstone-400">Select a hotspot on the 3D model above.</p>
            )}
          </div>
        )}

        {/* Tab Content 2: Timeline */}
        {activeTab === 'timeline' && (
          <div className="space-y-4 relative pl-5 border-l-2 border-brass-500/20 my-2">
            {monument.timeline.map((event) => (
              <div key={event.id} className="relative group">
                <div className="absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full bg-brass-500 border-2 border-charcoal-950 shadow-sm" />
                <div className="bg-charcoal-950/80 p-4 rounded-xl border border-charcoal-700/80 space-y-1">
                  <span className="text-xs font-black text-brass-400 font-display tracking-wider">
                    {event.year}
                  </span>
                  <h4 className="font-display text-xs sm:text-sm font-bold text-parchment-100">
                    {event.title}
                  </h4>
                  <p className="font-editorial text-xs sm:text-sm text-sandstone-300 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content 3: Sources & Attribution */}
        {activeTab === 'sources' && (
          <div className="space-y-3 text-xs text-sandstone-300">
            <div className="bg-charcoal-950/80 p-4 sm:p-5 rounded-xl border border-charcoal-700/80 space-y-2.5">
              <h4 className="font-display font-bold text-brass-300 flex items-center space-x-2 text-sm">
                <ShieldCheck className="w-4.5 h-4.5 text-brass-400" />
                <span>Historical Source Ledger</span>
              </h4>
              <p className="text-xs text-sandstone-400">
                Factual statements and archaeological records cite Archaeological Survey of India (ASI) and UNESCO documentation.
              </p>
              <ul className="space-y-1.5 text-xs text-sandstone-300 list-disc list-inside pt-1 font-sans">
                <li><strong className="text-brass-300">TM-001:</strong> Archaeological Survey of India (ASI) Agra Circle Records</li>
                <li><strong className="text-brass-300">TM-002:</strong> UNESCO World Heritage Inscription Document (1983)</li>
                <li><strong className="text-brass-300">TM-003:</strong> Ebba Koch, &quot;The Complete Taj Mahal&quot; (Thames &amp; Hudson)</li>
                <li><strong className="text-brass-300">TM-004:</strong> ASI National Monument Archival Database</li>
              </ul>
            </div>
          </div>
        )}
      </Surface>
    </div>
  );
};

export default MonumentDetail;
