import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Compass, ShieldCheck, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { MONUMENTS } from '@/data/monuments';
import { Button, Badge, Surface } from '@/components/ui';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const flagshipMonument = MONUMENTS[0];

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden surface-cinematic p-6 sm:p-10 md:p-14">
        {/* Warm Ambient Heritage Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brass-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-terracotta-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <Badge variant="brass">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SIH26195 &bull; Heritage &amp; Culture Prototype</span>
          </Badge>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-parchment-100 tracking-tight leading-[1.15]">
            Step Into India&apos;s Rich Heritage in{' '}
            <span className="text-gold-gradient">3D, AR &amp; VR</span>
          </h1>

          <p className="font-editorial text-base sm:text-lg md:text-xl text-sandstone-300 leading-relaxed max-w-2xl">
            Experience source-backed historical monuments with 3D reconstructions, interactive
            hotspots, chronological timelines, and mobile AR/VR views.
          </p>

          {/* Quick Action Button */}
          <div className="pt-2">
            <Button
              size="lg"
              onClick={() => navigate(`/monuments/${flagshipMonument.slug}`)}
              leftIcon={<Search className="w-5 h-5" />}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Explore Flagship Monument: {flagshipMonument.name}
            </Button>
          </div>
        </div>
      </section>

      {/* Flagship Monument Highlight Card */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-parchment-100 flex items-center space-x-2.5">
            <Compass className="w-5 h-5 text-brass-400" />
            <span>Featured Heritage Monument</span>
          </h2>
          <Badge variant="terracotta">Flagship MVP</Badge>
        </div>

        <Surface variant="museum" interactive className="grid md:grid-cols-2">
          {/* Image Thumbnail */}
          <div className="relative h-64 md:h-full min-h-[260px] overflow-hidden">
            <img
              src={flagshipMonument.heroImage}
              alt={flagshipMonument.heroImageAlt || flagshipMonument.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 space-y-1">
              <Badge variant="brass">{flagshipMonument.period}</Badge>
              <h3 className="font-display text-2xl font-bold text-parchment-100 mt-1">
                {flagshipMonument.name}
              </h3>
              <p className="text-xs text-sandstone-300 font-sans">{flagshipMonument.location}</p>
            </div>
          </div>

          {/* Details & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <p className="text-sandstone-300 text-xs sm:text-sm leading-relaxed">
                {flagshipMonument.shortDescription}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-charcoal-900/80 p-3 rounded-xl border border-charcoal-700/60">
                  <span className="text-sandstone-400 block text-[10px] uppercase tracking-wider font-semibold">
                    Commissioned By
                  </span>
                  <span className="font-semibold text-brass-300 mt-0.5 block">
                    {flagshipMonument.builtBy}
                  </span>
                </div>
                <div className="bg-charcoal-900/80 p-3 rounded-xl border border-charcoal-700/60">
                  <span className="text-sandstone-400 block text-[10px] uppercase tracking-wider font-semibold">
                    3D Hotspots
                  </span>
                  <span className="font-semibold text-brass-300 mt-0.5 block">
                    {flagshipMonument.hotspots.length} Verified Spots
                  </span>
                </div>
              </div>
            </div>

            <Link
              to={`/monuments/${flagshipMonument.slug}`}
              className="w-full bg-charcoal-850 hover:bg-brass-500 hover:text-charcoal-950 text-brass-300 border border-brass-500/35 font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 text-xs sm:text-sm cursor-pointer shadow-md hover:shadow-brass-500/20"
            >
              <span>Open {flagshipMonument.name} Experience</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Surface>
      </section>

      {/* Product Architecture Pillars */}
      <section className="grid sm:grid-cols-3 gap-4 pt-2">
        <Surface variant="subtle" className="p-5 space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-brass-500/15 flex items-center justify-center text-brass-400 border border-brass-500/30">
            <Layers className="w-4.5 h-4.5" />
          </div>
          <h4 className="font-display text-sm font-bold text-parchment-100">Shared 3D Core</h4>
          <p className="text-xs text-sandstone-400 leading-relaxed">
            One 3D model definition powers standard 3D viewer, marker-based AR, and optional VR mode.
          </p>
        </Surface>

        <Surface variant="subtle" className="p-5 space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-brass-500/15 flex items-center justify-center text-brass-400 border border-brass-500/30">
            <ShieldCheck className="w-4.5 h-4.5" />
          </div>
          <h4 className="font-display text-sm font-bold text-parchment-100">Source Ledger</h4>
          <p className="text-xs text-sandstone-400 leading-relaxed">
            All facts, hotspots, and dates cite institutional sources (ASI, UNESCO, Research).
          </p>
        </Surface>

        <Surface variant="subtle" className="p-5 space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-brass-500/15 flex items-center justify-center text-brass-400 border border-brass-500/30">
            <Sparkles className="w-4.5 h-4.5" />
          </div>
          <h4 className="font-display text-sm font-bold text-parchment-100">Fallback Protection</h4>
          <p className="text-xs text-sandstone-400 leading-relaxed">
            If AR or VR is unsupported on a device, the app cleanly falls back to Web 3D mode.
          </p>
        </Surface>
      </section>
    </div>
  );
};

export default Home;
