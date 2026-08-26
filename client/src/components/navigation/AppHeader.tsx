import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Sparkles, BookOpen } from 'lucide-react';

export const AppHeader: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isHome = currentPath === '/';
  const isExplore = currentPath === '/explore' || currentPath.startsWith('/monuments');

  return (
    <header className="sticky top-0 z-50 bg-charcoal-950/90 backdrop-blur-md border-b border-brass-500/20 px-4 py-3 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link
          to="/"
          className="flex items-center space-x-3 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-400 rounded-xl p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brass-600 via-brass-500 to-brass-300 flex items-center justify-center shadow-lg shadow-brass-500/20 group-hover:scale-105 transition-transform duration-300 border border-brass-300/40">
            <Compass className="w-5 h-5 text-charcoal-950 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold tracking-wider leading-none text-gold-gradient">
              PastPort <span className="text-brass-400 font-light">India</span>
            </h1>
            <p className="text-[10px] text-sandstone-400 font-medium tracking-widest uppercase mt-0.5 font-sans">
              Heritage Archive &bull; SIH26195
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-1.5 sm:space-x-2">
          <Link
            to="/"
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
              isHome
                ? 'bg-brass-500/15 text-brass-300 border border-brass-500/35 shadow-sm'
                : 'text-sandstone-300 hover:text-parchment-100 hover:bg-charcoal-850/80'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>

          <Link
            to="/explore"
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
              isExplore
                ? 'bg-brass-500/15 text-brass-300 border border-brass-500/35 shadow-sm'
                : 'text-sandstone-300 hover:text-parchment-100 hover:bg-charcoal-850/80'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Explore</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
