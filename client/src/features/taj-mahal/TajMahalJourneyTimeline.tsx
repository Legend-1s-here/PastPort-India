import React, { useState } from 'react';
import {
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Play,
  Pause,
  Volume2,
  Calendar,
} from 'lucide-react';
import { TAJ_MAHAL_DATA } from '@/data/tajMahal';

export const TajMahalJourneyTimeline: React.FC = () => {
  const timelineEvents = TAJ_MAHAL_DATA.timeline;
  const [selectedEventId, setSelectedEventId] = useState<string>(timelineEvents[0].id);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const activeEvent = timelineEvents.find((e) => e.id === selectedEventId) || timelineEvents[0];

  return (
    <section className="space-y-8" id="journey-history" aria-labelledby="timeline-heading">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-brass-500/20 pb-5">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs font-display uppercase tracking-[0.2em] text-brass-400 font-bold">
            <Clock className="w-3.5 h-3.5 text-brass-400" />
            <span>Chronological Heritage Epoch</span>
          </div>
          <h2
            id="timeline-heading"
            className="font-display text-2xl sm:text-4xl font-black text-parchment-100 tracking-tight"
          >
            Journey Through History
          </h2>
        </div>

        <p className="font-editorial text-xs sm:text-sm text-sandstone-300 max-w-md leading-relaxed italic">
          From the grieving imperial vow of 1631 to modern digital photogrammetry preservation, witness the seven defining epochs of the Taj Mahal.
        </p>
      </div>

      {/* Interactive Timeline Master Container */}
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Timeline Navigation Rail (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-[11px] font-display uppercase tracking-widest text-sandstone-400 font-bold block mb-2">
            SELECT HISTORICAL MILESTONE
          </span>

          <div className="space-y-2.5 relative">
            {/* Connecting Vertical Line */}
            <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-brass-500/60 via-brass-500/30 to-brass-500/10 pointer-events-none" />

            {timelineEvents.map((event) => {
              const isSelected = event.id === selectedEventId;
              return (
                <button
                  type="button"
                  key={event.id}
                  onClick={() => setSelectedEventId(event.id)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 relative flex items-start space-x-3.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-400 ${
                    isSelected
                      ? 'bg-charcoal-900 border-brass-400/80 shadow-xl shadow-brass-500/10 ring-1 ring-brass-400/40 translate-x-1'
                      : 'bg-charcoal-950/70 border-charcoal-800/80 hover:bg-charcoal-900/80 hover:border-brass-500/30'
                  }`}
                >
                  {/* Glowing Node Dot */}
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 z-10 transition-all duration-300 ${
                      isSelected
                        ? 'bg-brass-400 text-charcoal-950 shadow-md shadow-brass-400/50 scale-110'
                        : 'bg-charcoal-850 border-2 border-brass-500/40 text-brass-400'
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? 'bg-charcoal-950' : 'bg-brass-400/80'
                      }`}
                    />
                  </div>

                  {/* Text Details */}
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-xs font-bold tracking-wider ${
                          isSelected ? 'text-brass-300' : 'text-sandstone-400'
                        }`}
                      >
                        {event.year}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] text-brass-400 font-sans uppercase font-bold flex items-center space-x-0.5">
                          <span>Active</span>
                          <ChevronRight className="w-3 h-3 inline" />
                        </span>
                      )}
                    </div>
                    <h4
                      className={`font-display text-xs sm:text-sm font-bold truncate ${
                        isSelected ? 'text-parchment-100' : 'text-sandstone-300'
                      }`}
                    >
                      {event.title}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Archival Event Dossier (7 cols) */}
        <div className="lg:col-span-7 bg-charcoal-900/95 rounded-3xl p-6 sm:p-8 lg:p-10 border border-brass-500/30 shadow-2xl relative space-y-6 overflow-hidden">
          {/* Subtle Glow Backdrop */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-brass-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Card Top Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-charcoal-800 pb-4">
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-xl bg-brass-500/15 border border-brass-500/30 flex items-center justify-center text-brass-400 font-mono font-bold text-xs">
                <Calendar className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[10px] text-sandstone-400 uppercase tracking-widest font-semibold block">
                  CHRONOLOGICAL ERA
                </span>
                <span className="font-display text-base sm:text-lg font-black text-brass-300">
                  {activeEvent.year}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {activeEvent.sourceIds?.map((src) => (
                <span
                  key={src}
                  className="bg-charcoal-950 text-[10px] font-mono text-sandstone-300 px-2.5 py-1 rounded-md border border-charcoal-700 flex items-center space-x-1"
                >
                  <ShieldCheck className="w-3 h-3 text-brass-400 inline" />
                  <span>{src}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Event Title */}
          <div className="space-y-3">
            <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-black text-parchment-100 tracking-wide text-gold-gradient">
              {activeEvent.title}
            </h3>
            <p className="font-editorial text-base sm:text-lg text-sandstone-200 leading-relaxed">
              {activeEvent.description}
            </p>
          </div>

          {/* Archival Context Callout */}
          <div className="bg-charcoal-950/90 rounded-2xl p-4 sm:p-5 border border-brass-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-display uppercase tracking-wider text-brass-400 font-bold flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Archival Annotation &amp; Historiography</span>
              </span>
              <span className="text-[10px] text-sandstone-500 font-mono">ASI Agra Circle Archives</span>
            </div>

            <p className="font-sans text-xs text-sandstone-300 leading-relaxed">
              Documented across contemporary Mughal court chronicles (<em>Badshahnama</em> of Abdul Hamid Lahori and <em>Amal-i-Salih</em> of Muhammad Salih Kambo), corroborating the exact timelines, materials sourced, and architectural appointments.
            </p>
          </div>

          {/* Historical Audio Commentary Preview */}
          <div className="pt-2 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-brass-400 to-brass-500 text-charcoal-950 flex items-center justify-center shadow-lg shadow-brass-500/20 hover:scale-105 transition-transform cursor-pointer shrink-0"
                title="Play Curated Audio Narration"
              >
                {isPlayingAudio ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>

              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center space-x-1.5 text-xs font-display font-bold text-parchment-100">
                  <Volume2 className="w-3.5 h-3.5 text-brass-400 inline shrink-0" />
                  <span className="truncate">Archival Audio Commentary</span>
                </div>
                <span className="text-[10px] text-sandstone-400 font-sans block truncate">
                  {isPlayingAudio ? 'Playing simulated narration...' : 'Duration: 1m 45s • Narrated by Heritage Archivists'}
                </span>
              </div>
            </div>

            {/* Audio Waveform Simulator */}
            <div className="flex items-center space-x-1 h-6 self-center">
              {[40, 75, 55, 90, 65, 30, 80, 95, 50, 85, 60, 45, 90, 70, 40].map((h, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isPlayingAudio
                      ? 'bg-brass-400 animate-pulse'
                      : 'bg-charcoal-700'
                  }`}
                  style={{
                    height: isPlayingAudio ? `${h}%` : '30%',
                    animationDelay: `${i * 70}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TajMahalJourneyTimeline;
