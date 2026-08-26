import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '@/components/navigation/AppHeader';

export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Shared Header Navigation */}
      <AppHeader />

      {/* Main Routed Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 pt-6 pb-12">
        <Outlet />
      </main>

      {/* Shared Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 px-4 text-center text-xs text-slate-500">
        <p>PastPort India — SIH26195 Heritage & Culture Prototype</p>
      </footer>
    </div>
  );
};

export default RootLayout;
