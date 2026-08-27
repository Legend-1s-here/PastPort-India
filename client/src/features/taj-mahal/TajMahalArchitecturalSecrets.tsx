import React, { useState } from 'react';
import {
  ShieldAlert,
  Eye,
  Waves,
  Volume2,
  Gem,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { TAJ_MAHAL_SECRETS, type TajMahalArchitecturalSecret } from '@/data/tajMahal';

export const TajMahalArchitecturalSecrets: React.FC = () => {
  const [selectedSecret, setSelectedSecret] = useState<TajMahalArchitecturalSecret>(
    TAJ_MAHAL_SECRETS[0],
  );

  const getSecretIcon = (type: TajMahalArchitecturalSecret['iconType']) => {
    switch (type) {
      case 'engineering':
        return ShieldAlert;
      case 'optics':
        return Eye;
      case 'acoustics':
        return Volume2;
      case 'pietraDura':
        return Gem;
      default:
        return Waves;
    }
  };

  return (
    <section className="space-y-8" aria-labelledby="secrets-heading">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-brass-500/20 pb-5">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs font-display uppercase tracking-[0.2em] text-brass-400 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-brass-400" />
            <span>Archaeological &amp; Engineering Secrets</span>
          </div>
          <h2
            id="secrets-heading"
            className="font-display text-2xl sm:text-4xl font-black text-parchment-100 tracking-tight"
          >
            Architectural Wonders &amp; Hidden Marvels
          </h2>
        </div>
        <p className="font-editorial text-xs sm:text-sm text-sandstone-300 max-w-md leading-relaxed italic">
          Discover the ingenious optical illusions, acoustic tuning, and seismic safeguards engineered by 17th-century Mughal architects.
        </p>
      </div>

      {/* Interactive Secrets Grid + Deep Dive Card */}
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Left Side: Secrets List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {TAJ_MAHAL_SECRETS.map((secret) => {
            const Icon = getSecretIcon(secret.iconType);
            const isSelected = secret.id === selectedSecret.id;
            return (
              <button
                type="button"
                key={secret.id}
                onClick={() => setSelectedSecret(secret)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start space-x-3.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-400 ${
                  isSelected
                    ? 'bg-charcoal-900 border-brass-400 shadow-xl shadow-brass-500/10 ring-1 ring-brass-400/40 translate-x-1'
                    : 'bg-charcoal-950/70 border-charcoal-800 hover:bg-charcoal-900/80 hover:border-brass-500/30'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-brass-400 text-charcoal-950 shadow-md shadow-brass-400/40'
                      : 'bg-charcoal-850 text-brass-400 border border-charcoal-700'
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                </div>

                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-brass-400 font-bold">
                      {secret.badge}
                    </span>
                    <span className="text-[10px] text-sandstone-500 font-mono">
                      {secret.sourceId}
                    </span>
                  </div>
                  <h4
                    className={`font-display text-xs sm:text-sm font-bold truncate ${
                      isSelected ? 'text-parchment-100' : 'text-sandstone-300'
                    }`}
                  >
                    {secret.title}
                  </h4>
                  <p className="text-[11px] text-sandstone-400 truncate">
                    {secret.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Deep Inspection Viewport (7 cols) */}
        <div className="lg:col-span-7 surface-museum rounded-3xl p-6 sm:p-8 lg:p-10 border border-brass-500/30 shadow-2xl relative space-y-6 flex flex-col justify-between overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute -top-16 -right-16 w-72 h-72 bg-brass-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
              <span className="text-[10px] font-display uppercase tracking-widest text-brass-400 font-bold flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Architectural Ledger</span>
              </span>
              <span className="bg-charcoal-950 text-[10px] font-mono text-sandstone-300 px-2.5 py-1 rounded-md border border-charcoal-700">
                Source Ref: {selectedSecret.sourceId}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-brass-400 font-editorial italic block">
                {selectedSecret.subtitle}
              </span>
              <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-black text-parchment-100 text-gold-gradient">
                {selectedSecret.title}
              </h3>
            </div>

            <p className="font-editorial text-base sm:text-lg text-sandstone-200 leading-relaxed">
              {selectedSecret.description}
            </p>
          </div>

          {/* Peer-Reviewed Provenance Ledger Footnote */}
          <div className="bg-charcoal-950/90 rounded-2xl p-4 border border-brass-500/20 space-y-2 relative z-10">
            <div className="flex items-center space-x-2 text-brass-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Scientific Documentation Reference</span>
            </div>
            <p className="text-xs text-sandstone-400 leading-relaxed font-sans">
              Recorded by the Archaeological Survey of India (ASI) Structural Health Monitoring Programme and corroborated by UNESCO World Heritage scientific evaluation dossiers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TajMahalArchitecturalSecrets;
