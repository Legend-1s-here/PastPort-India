import React from 'react';
import {
  Crown,
  Calendar,
  Compass,
  Award,
  Gem,
  Maximize2,
  Users,
  ShieldCheck,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { TAJ_MAHAL_DATA } from '@/data/tajMahal';

export const TajMahalFacts: React.FC = () => {
  const facts = [
    {
      id: 'fact-patron',
      icon: Crown,
      label: 'Imperial Patron',
      value: 'Emperor Shah Jahan',
      detail: 'Built in everlasting devotion for Empress Mumtaz Mahal (Arjumand Banu Begum).',
      highlight: '5th Mughal Emperor',
    },
    {
      id: 'fact-epoch',
      icon: Calendar,
      label: 'Construction Period',
      value: '1631 – 1653 CE (22 Years)',
      detail: 'Mausoleum completed 1648 CE; outer complex, mosque, and Charbagh by 1653 CE.',
      highlight: '22 Years of Labor',
    },
    {
      id: 'fact-style',
      icon: Compass,
      label: 'Architectural Style',
      value: 'Mughal Classical',
      detail: 'Bilateral symmetry synthesizing Persian Charbagh, Timurid domes, and Hindu stone craftsmanship.',
      highlight: 'Persian-Indo Synthesis',
    },
    {
      id: 'fact-unesco',
      icon: Award,
      label: 'World Heritage Status',
      value: 'UNESCO Site (1983)',
      detail: 'Inscribed under Criterion (i) as a masterpiece of human creative genius.',
      highlight: 'Criterion (i) Masterpiece',
    },
    {
      id: 'fact-materials',
      icon: Gem,
      label: 'Lapidary & Materials',
      value: 'Makrana Marble & 28 Gems',
      detail: 'Pure white crystalline marble inlaid with lapis lazuli, turquoise, jade, malachite, and carnelian.',
      highlight: 'Parchin Kari Inlay',
    },
    {
      id: 'fact-dimensions',
      icon: Maximize2,
      label: 'Dimensions & Scale',
      value: '73m Dome & 95m Plinth',
      detail: 'Central onion dome soars 73 metres (240 ft) above the plinth, flanked by 40-metre minarets.',
      highlight: 'Mathematical Precision',
    },
    {
      id: 'fact-artisan',
      icon: Users,
      label: 'Master Guild & Artisans',
      value: '20,000+ Master Craftsmen',
      detail: 'Led by chief architect Ustad Ahmad Lahori, calligrapher Amanat Khan, and master stonecarvers.',
      highlight: 'Guild of 20,000',
    },
    {
      id: 'fact-protection',
      icon: ShieldCheck,
      label: 'Statutory Protection',
      value: 'ASI Monument of National Importance',
      detail: 'Protected under the Ancient Monuments and Archaeological Sites and Remains Act (AMASR).',
      highlight: 'Agra Circle Records',
    },
  ];

  return (
    <section className="space-y-8" aria-labelledby="taj-facts-heading">
      {/* Historical Narrative Overview Card */}
      <div className="surface-museum rounded-3xl p-6 sm:p-8 lg:p-10 border border-brass-500/25 space-y-6 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brass-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-charcoal-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-display uppercase tracking-[0.2em] text-brass-400 font-bold">
              <BookOpen className="w-3.5 h-3.5 text-brass-400" />
              <span>Historical Introduction &amp; Provenance</span>
            </div>
            <h2
              id="taj-facts-heading"
              className="font-display text-2xl sm:text-3xl font-black text-parchment-100 tracking-tight"
            >
              The Pinnacle of Mughal Grandeur
            </h2>
          </div>

          <div className="flex items-center space-x-2 text-xs text-sandstone-400 bg-charcoal-950/80 px-3.5 py-1.5 rounded-full border border-brass-500/20 self-start md:self-auto">
            <Sparkles className="w-3.5 h-3.5 text-brass-400" />
            <span>ASI Document Ref: ASI-AGRA-TM-01</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <p className="font-editorial text-base sm:text-lg text-sandstone-200 leading-relaxed">
              {TAJ_MAHAL_DATA.historicalSummary}
            </p>
            <p className="font-sans text-xs sm:text-sm text-sandstone-400 leading-relaxed">
              The monument is conceived as an earthly replica of the celestial paradise house, designed along a rigid bilateral axis where every arch, garden watercourse, and decorative floral cartouche aligns with rigorous mathematical precision.
            </p>
          </div>

          <div className="lg:col-span-4 bg-charcoal-950/90 p-5 rounded-2xl border border-brass-500/30 space-y-3">
            <span className="text-[10px] font-display uppercase tracking-widest text-brass-400 font-bold block">
              IMPERIAL INSCRIPTION CITATION
            </span>
            <blockquote className="font-editorial text-xs sm:text-sm text-sandstone-200 italic border-l-2 border-brass-400 pl-3 leading-relaxed">
              &ldquo;Should guilty seek asylum here, like one pardoned, he becomes free from sin. Should a sinner make his way to this mansion, all his past sins are washed away.&rdquo;
            </blockquote>
            <span className="text-[11px] text-sandstone-500 block text-right font-sans">
              &mdash; Emperor Shah Jahan, <em>Badshahnama</em>
            </span>
          </div>
        </div>
      </div>

      {/* Key Facts & Architectural Specifications Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg sm:text-xl font-bold text-parchment-100 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-brass-400" />
            <span>Key Historical &amp; Architectural Facts</span>
          </h3>
          <span className="text-xs text-sandstone-400 font-sans hidden sm:inline">
            Verified Archaeological Standards
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {facts.map((fact) => {
            const Icon = fact.icon;
            return (
              <div
                key={fact.id}
                className="bg-charcoal-900/90 rounded-2xl p-5 border border-brass-500/20 hover:border-brass-500/50 hover:bg-charcoal-850/90 transition-all duration-300 shadow-lg group flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-brass-500/15 border border-brass-500/30 flex items-center justify-center text-brass-300 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] uppercase font-mono tracking-wider text-brass-400/90 bg-charcoal-950 px-2 py-0.5 rounded border border-charcoal-800">
                      {fact.highlight}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-sandstone-400 font-semibold uppercase tracking-wider block font-sans">
                      {fact.label}
                    </span>
                    <h4 className="font-display text-sm sm:text-base font-bold text-parchment-100 mt-0.5 group-hover:text-brass-300 transition-colors">
                      {fact.value}
                    </h4>
                  </div>
                </div>

                <p className="font-editorial text-xs text-sandstone-300 leading-relaxed border-t border-charcoal-800 pt-2.5">
                  {fact.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TajMahalFacts;
