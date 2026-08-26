import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Compass, MapPin } from 'lucide-react';
import { MONUMENTS } from '@/data/monuments';
import { Badge, Surface } from '@/components/ui';

export const Explore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMonuments = MONUMENTS.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.alternateNames.some((alt) => alt.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-display text-2xl sm:text-3xl font-black text-parchment-100 flex items-center space-x-3">
          <Compass className="w-7 h-7 text-brass-400" />
          <span>Explore Heritage Catalogue</span>
        </h1>
        <p className="font-editorial text-sm sm:text-base text-sandstone-300">
          Search for Indian monuments to launch interactive 3D reconstructions, verified hotspots, and AR/VR experiences.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-sandstone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by monument name or region (e.g. Taj Mahal, Agra)..."
          className="w-full bg-charcoal-900/90 border border-brass-500/25 focus:border-brass-400 rounded-xl pl-12 pr-4 py-3.5 text-xs sm:text-sm text-parchment-100 placeholder-sandstone-500 focus:outline-none focus:ring-1 focus:ring-brass-400/50 transition-all duration-200 shadow-xl font-sans"
        />
      </div>

      {/* Monuments Catalogue Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {filteredMonuments.map((monument) => (
          <Link
            key={monument.id}
            to={`/monuments/${monument.slug}`}
            className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-400 rounded-2xl"
          >
            <Surface variant="museum" interactive className="h-full flex flex-col justify-between">
              <div>
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={monument.heroImage}
                    alt={monument.heroImageAlt || monument.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <Badge variant="brass">{monument.period}</Badge>
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <h3 className="font-display text-xl font-bold text-parchment-100 group-hover:text-brass-300 transition-colors duration-200">
                    {monument.name}
                  </h3>
                  <p className="text-xs text-sandstone-400 flex items-center space-x-1.5 font-sans">
                    <MapPin className="w-3.5 h-3.5 text-terracotta-400" />
                    <span>{monument.location}</span>
                  </p>
                  <p className="text-xs text-sandstone-300 line-clamp-2 leading-relaxed">
                    {monument.shortDescription}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs text-brass-400 font-semibold border-t border-charcoal-800/80">
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  Launch 3D &bull; AR &bull; VR &rarr;
                </span>
                <span className="text-[10px] text-sandstone-500 font-normal">
                  {monument.hotspots.length} Hotspots
                </span>
              </div>
            </Surface>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Explore;
