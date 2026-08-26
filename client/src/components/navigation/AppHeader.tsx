import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Sparkles, BookOpen, Menu, X, Landmark } from 'lucide-react';

export const AppHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const isHome = currentPath === '/';
  const isExplore = currentPath === '/explore' || currentPath.startsWith('/monuments');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-charcoal-950/90 backdrop-blur-md border-b border-brass-500/20 px-4 sm:px-6 py-3 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link
          to="/"
          onClick={closeMenu}
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

        {/* Desktop Navigation Links */}
        <nav className="hidden sm:flex items-center space-x-1.5 sm:space-x-2" aria-label="Main Navigation">
          <Link
            to="/"
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-400 ${
              isHome
                ? 'bg-brass-500/15 text-brass-300 border border-brass-500/35 shadow-sm'
                : 'text-sandstone-300 hover:text-parchment-100 hover:bg-charcoal-850/80 border border-transparent'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>

          <Link
            to="/explore"
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-400 ${
              isExplore
                ? 'bg-brass-500/15 text-brass-300 border border-brass-500/35 shadow-sm'
                : 'text-sandstone-300 hover:text-parchment-100 hover:bg-charcoal-850/80 border border-transparent'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Explore</span>
          </Link>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="flex sm:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-xl text-sandstone-300 hover:text-parchment-100 hover:bg-charcoal-850/80 border border-charcoal-700/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-400 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-brass-300" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-[61px] bg-charcoal-950/98 backdrop-blur-xl border-b border-brass-500/20 shadow-2xl p-5 space-y-3 animate-page-enter z-50">
          <nav className="flex flex-col space-y-2" aria-label="Mobile Navigation">
            <Link
              to="/"
              onClick={closeMenu}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all min-h-[48px] ${
                isHome
                  ? 'bg-brass-500/15 text-brass-300 border border-brass-500/35 shadow-sm'
                  : 'text-sandstone-300 hover:text-parchment-100 hover:bg-charcoal-850/80 border border-transparent'
              }`}
            >
              <Sparkles className="w-4 h-4 text-brass-400" />
              <span>Home</span>
            </Link>

            <Link
              to="/explore"
              onClick={closeMenu}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all min-h-[48px] ${
                isExplore
                  ? 'bg-brass-500/15 text-brass-300 border border-brass-500/35 shadow-sm'
                  : 'text-sandstone-300 hover:text-parchment-100 hover:bg-charcoal-850/80 border border-transparent'
              }`}
            >
              <BookOpen className="w-4 h-4 text-brass-400" />
              <span>Explore Catalogue</span>
            </Link>

            <Link
              to="/monuments/taj-mahal"
              onClick={closeMenu}
              className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide text-sandstone-300 hover:text-parchment-100 hover:bg-charcoal-850/80 border border-transparent min-h-[48px]"
            >
              <Landmark className="w-4 h-4 text-terracotta-400" />
              <span>Taj Mahal (Flagship 3D)</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default AppHeader;
