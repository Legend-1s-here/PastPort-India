import { useState } from 'react';
import { AppHeader } from './components/AppHeader';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { MonumentDetail } from './pages/MonumentDetail';
import { TAJ_MAHAL_DATA } from './data/tajMahal';

export function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'detail'>('home');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Shared Header Navigation */}
      <AppHeader activeTab={activeTab} onNavigate={setActiveTab} />

      {/* Main View Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 pt-6">
        {activeTab === 'home' && (
          <Home onExploreMonument={() => setActiveTab('detail')} />
        )}

        {activeTab === 'explore' && (
          <Explore onSelectMonument={() => setActiveTab('detail')} />
        )}

        {activeTab === 'detail' && (
          <MonumentDetail
            monument={TAJ_MAHAL_DATA}
            onBack={() => setActiveTab('explore')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 px-4 text-center text-xs text-slate-500">
        <p>PastPort India — SIH26195 Heritage & Culture Prototype</p>
      </footer>
    </div>
  );
}

export default App;
