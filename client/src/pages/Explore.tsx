import React, { useState } from 'react';
import { Search, Compass, MapPin } from 'lucide-react';
import { TAJ_MAHAL_DATA } from '../data/tajMahal';

interface ExploreProps {
  onSelectMonument: () => void;
}

export const Explore: React.FC<ExploreProps> = ({ onSelectMonument }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const monuments = [TAJ_MAHAL_DATA];
  const filteredMonuments = monuments.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.alternateNames.some((alt) => alt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h1 className="text-2xl font-black text-slate-100 flex items-center space-x-2">
          <Compass className="w-6 h-6 text-amber-400" />
          <span>Explore Heritage Catalogue</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Search for Indian monuments to launch 3D reconstructions and AR/VR experiences.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by monument name (e.g. Taj Mahal)..."
          className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition shadow-lg"
        />
      </div>

      {/* Monuments Catalogue Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredMonuments.map((monument) => (
          <div
            key={monument.id}
            onClick={onSelectMonument}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition duration-200 cursor-pointer group shadow-xl"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={monument.heroImage}
                alt={monument.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-300 bg-slate-900/80 px-2 py-0.5 rounded border border-amber-500/30">
                  {monument.period}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-300 transition">
                {monument.name}
              </h3>
              <p className="text-xs text-slate-400 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{monument.location}</span>
              </p>
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {monument.shortDescription}
              </p>
              <div className="pt-2 flex items-center justify-between text-xs text-amber-400 font-semibold">
                <span>View 3D / AR / VR →</span>
                <span className="text-[10px] text-slate-400">{monument.hotspots.length} Hotspots</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
