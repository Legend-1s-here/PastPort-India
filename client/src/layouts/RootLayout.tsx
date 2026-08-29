import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { AppHeader } from '@/components/navigation/AppHeader';
import { PageTransition } from '@/components/animation/PageTransition';
import { Compass, Sparkles } from 'lucide-react';

export const RootLayout: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Auto-hide header on scroll down (home page only) for cinematic effect
  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Always show at top
      if (currentScrollY < 80) {
        setHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 200) {
        // Scrolling down past threshold — hide
        setHeaderVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up — show
        setHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome, lastScrollY]);

  const isHeaderShown = isHome ? headerVisible : true;

  return (
    <div className="min-h-screen bg-charcoal-950 text-parchment-200 flex flex-col font-sans selection:bg-brass-500/30 selection:text-brass-300 antialiased">
      {/* Shared Header Navigation — auto-hides on home scroll */}
      <div
        className="transition-transform duration-500 ease-out z-50"
        style={{
          transform: isHeaderShown ? 'translateY(0)' : 'translateY(-100%)',
          position: isHome ? 'fixed' : 'relative',
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <AppHeader />
      </div>

      {/* Main Routed Content Area */}
      <main
        className={
          isHome
            ? 'flex-1 w-full'
            : 'flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-16'
        }
      >
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      {/* Refined Editorial Footer */}
      <footer className="border-t border-brass-500/15 bg-charcoal-900/90 py-8 px-4 sm:px-6 text-xs text-sandstone-400">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-lg bg-brass-500/15 flex items-center justify-center text-brass-400 border border-brass-500/25">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-display tracking-wider text-parchment-100 text-sm font-bold">
                PastPort India
              </span>
              <span className="text-[11px] text-sandstone-500 hidden sm:inline">&bull;</span>
              <span className="text-[11px] text-sandstone-400 hidden sm:inline">
                Digital Heritage Archive
              </span>
            </div>

            {/* Quick Navigation Links */}
            <nav className="flex items-center space-x-4 text-xs font-semibold text-sandstone-400" aria-label="Footer Navigation">
              <Link to="/" className="hover:text-brass-300 transition-colors">
                Home
              </Link>
              <Link to="/monuments/taj-mahal" className="hover:text-brass-300 transition-colors">
                Taj Mahal
              </Link>
              <Link to="/experience/taj-mahal-3d" className="hover:text-brass-300 transition-colors">
                3D Experience
              </Link>
            </nav>
          </div>

          <div className="border-t border-charcoal-800/80 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-sandstone-500">
            <p className="flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-brass-400/80 inline" />
              <span>SIH26197 Heritage &amp; Culture Prototype</span>
            </p>
            <p>Source-backed historical reconstructions &bull; UNESCO &amp; ASI citations</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;

