import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Share2,
  Bookmark,
  Check,
} from 'lucide-react';
import { TAJ_MAHAL_DATA } from '@/data/tajMahal';
import type { ExperienceType } from '@/types/experience';
import type { Hotspot } from '@/types/monument';
import { ExperienceButtons } from '@/features/experience/ExperienceButtons';
import { ModelViewerContainer } from '@/features/3d-viewer/ModelViewerContainer';
import { ARContainer } from '@/features/ar/ARContainer';
import { VRContainer } from '@/features/vr/VRContainer';
import { TajMahalHero } from './TajMahalHero';
import { TajMahalFacts } from './TajMahalFacts';
import { TajMahalJourneyTimeline } from './TajMahalJourneyTimeline';
import { TajMahalExperienceCTA } from './TajMahalExperienceCTA';
import { TajMahalArchitecturalSecrets } from './TajMahalArchitecturalSecrets';
import { Surface } from '@/components/ui';

export const TajMahalDetail: React.FC = () => {
  const [experienceMode, setExperienceMode] = useState<ExperienceType>('web3d');
  const [showViewer, setShowViewer] = useState<boolean>(false);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(
    TAJ_MAHAL_DATA.hotspots[0] || null,
  );
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const viewerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const scrollToViewer = (mode: ExperienceType) => {
    setExperienceMode(mode);
    setShowViewer(true);
    setTimeout(() => {
      viewerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const scrollToTimeline = () => {
    const el = document.getElementById('journey-history');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Taj Mahal — PastPort India Digital Heritage',
          text: 'Explore the Taj Mahal in interactive 3D, AR, and historical timeline on PastPort India.',
          url: window.location.href,
        });
      } catch {
        // Fallback to clipboard
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-12 sm:space-y-16 pb-16">
      {/* Top Utility Nav Bar */}
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-xs font-semibold bg-charcoal-900/90 hover:bg-charcoal-800 text-sandstone-300 px-4 py-2.5 rounded-xl border border-brass-500/25 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-400 group"
        >
          <ArrowLeft className="w-4 h-4 text-brass-400 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center space-x-2">
          {/* Bookmark Button */}
          <button
            type="button"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
              isBookmarked
                ? 'bg-brass-500/20 border-brass-400 text-brass-300'
                : 'bg-charcoal-900/90 border-charcoal-800 text-sandstone-400 hover:text-parchment-100 hover:bg-charcoal-800'
            }`}
            title="Bookmark Monument"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-charcoal-900/90 border border-charcoal-800 text-sandstone-300 hover:text-parchment-100 hover:bg-charcoal-800 transition-all duration-200 text-xs font-semibold cursor-pointer"
            title="Share Flagship Experience"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-brass-400" />
                <span className="text-brass-300">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-brass-400" />
                <span className="hidden sm:inline">Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 1. Cinematic Hero Section */}
      <TajMahalHero
        onExplore3DClick={() => scrollToViewer('web3d')}
        onExploreARClick={() => scrollToViewer('ar')}
        onTimelineClick={scrollToTimeline}
      />

      {/* 2. Interactive Experience Viewport (Collapsible / Expandable) */}
      <div ref={viewerRef} className="space-y-4 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-charcoal-800 pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brass-400 animate-ping" />
            <h3 className="font-display text-lg sm:text-xl font-bold text-parchment-100 flex items-center space-x-2">
              <span>Interactive Spatial Viewport</span>
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setShowViewer(!showViewer)}
            className="text-xs text-brass-400 hover:text-brass-300 font-semibold cursor-pointer self-start sm:self-auto"
          >
            {showViewer ? 'Minimize Viewport ▲' : 'Open Full Spatial Viewport ▼'}
          </button>
        </div>

        {showViewer && (
          <div className="space-y-6 animate-fadeIn">
            {/* Experience Mode Toggle Buttons (3D / AR / VR) */}
            <ExperienceButtons
              currentMode={experienceMode}
              onModeChange={setExperienceMode}
              availability={TAJ_MAHAL_DATA.experience}
            />

            {/* Viewport Renderers */}
            <div>
              {experienceMode === 'web3d' && (
                <ModelViewerContainer
                  hotspots={TAJ_MAHAL_DATA.hotspots}
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

            {/* Selected Hotspot Deep Context Box */}
            {selectedHotspot && experienceMode === 'web3d' && (
              <div className="bg-charcoal-900/90 p-4 sm:p-5 rounded-2xl border border-brass-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-brass-400" />
                    <h4 className="font-display text-sm sm:text-base font-bold text-brass-300">
                      {selectedHotspot.title}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-sandstone-400 bg-charcoal-950 px-2.5 py-1 rounded border border-charcoal-700">
                    Source: {selectedHotspot.sourceIds.join(', ')}
                  </span>
                </div>
                <p className="font-editorial text-sm sm:text-base text-sandstone-200 leading-relaxed">
                  {selectedHotspot.description}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. Concise Historical Introduction & Key Facts Grid */}
      <TajMahalFacts />

      {/* 4. Prominent Explore in 3D & AR Experience CTA Gateways */}
      <TajMahalExperienceCTA
        onLaunch3D={() => scrollToViewer('web3d')}
        onLaunchAR={() => scrollToViewer('ar')}
        onLaunchVR={() => scrollToViewer('vr')}
      />

      {/* 5. Immersive "Journey Through History" Timeline */}
      <div ref={timelineRef}>
        <TajMahalJourneyTimeline />
      </div>

      {/* 6. Architectural Wonders & Hidden Secrets */}
      <TajMahalArchitecturalSecrets />

      {/* 7. Historical Sources & Archival Ledger */}
      <Surface variant="museum" className="p-6 sm:p-8 rounded-3xl border border-brass-500/25 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal-800 pb-4">
          <div className="flex items-center space-x-2 text-brass-300 font-display font-bold text-base sm:text-lg">
            <ShieldCheck className="w-5 h-5 text-brass-400" />
            <span>Archaeological Survey of India &amp; UNESCO Archival Ledger</span>
          </div>
          <span className="text-xs font-mono text-sandstone-500">
            Ledger Verified // Peer-Reviewed Documentation
          </span>
        </div>

        <p className="font-sans text-xs sm:text-sm text-sandstone-300 leading-relaxed">
          All architectural metrics, construction timelines, and structural descriptions featured in this PastPort reconstruction are derived from the official archives of the Archaeological Survey of India (Agra Circle) and the UNESCO World Heritage Inscription Document (1983).
        </p>

        <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs text-sandstone-300">
          <div className="bg-charcoal-950/80 p-3 rounded-xl border border-charcoal-800 space-y-1">
            <strong className="text-brass-300 block font-display">ASI Agra Circle Archives (TM-001):</strong>
            <span className="text-sandstone-400">
              Structural monitoring reports, riverbed foundation logs &amp; white marble conservation data.
            </span>
          </div>

          <div className="bg-charcoal-950/80 p-3 rounded-xl border border-charcoal-800 space-y-1">
            <strong className="text-brass-300 block font-display">UNESCO Inscription 252 (TM-002):</strong>
            <span className="text-sandstone-400">
              Universal Value dossier, Persian-Islamic synthesis evaluation &amp; buffer zone preservation.
            </span>
          </div>

          <div className="bg-charcoal-950/80 p-3 rounded-xl border border-charcoal-800 space-y-1">
            <strong className="text-brass-300 block font-display">Ebba Koch, &quot;The Complete Taj Mahal&quot; (TM-003):</strong>
            <span className="text-sandstone-400">
              Comprehensive architectural drawings, epigraphy, and biographical ledger of Mughal architects.
            </span>
          </div>

          <div className="bg-charcoal-950/80 p-3 rounded-xl border border-charcoal-800 space-y-1">
            <strong className="text-brass-300 block font-display">Abdul Hamid Lahori, &quot;Badshahnama&quot; (TM-004):</strong>
            <span className="text-sandstone-400">
              Primary court chronicle documenting the construction materials, expenses, and consecration.
            </span>
          </div>
        </div>
      </Surface>
    </div>
  );
};

export default TajMahalDetail;
