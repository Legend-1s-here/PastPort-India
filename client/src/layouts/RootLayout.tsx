import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '@/components/navigation/AppHeader';

export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-charcoal-950 text-parchment-200 flex flex-col font-sans selection:bg-brass-500/30 selection:text-brass-300">
      {/* Shared Header Navigation */}
      <AppHeader />

      {/* Main Routed Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <Outlet />
      </main>

      {/* Editorial Footer */}
      <footer className="border-t border-brass-500/15 bg-charcoal-900/90 py-6 px-4 text-center text-xs text-sandstone-400">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-display tracking-wider text-sandstone-300 text-xs">
            PastPort India &bull; Digital Heritage Archive
          </p>
          <p className="text-[11px] text-charcoal-600 sm:text-sandstone-500">
            SIH26195 Heritage &amp; Culture Prototype &bull; Source-Backed Explorations
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;
