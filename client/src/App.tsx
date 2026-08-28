import { Routes, Route } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { Home } from './pages/Home';
import { MonumentDetail } from './pages/MonumentDetail';
import { TajMahal3DExperience } from './features/taj-mahal/TajMahal3DExperience';
import { ARView } from './pages/ARView';
import { NotFound } from './pages/NotFound';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="monuments/:slug" element={<MonumentDetail />} />
        <Route path="experience/taj-mahal-3d" element={<TajMahal3DExperience />} />
        <Route path="experience/taj-mahal-ar" element={<ARView />} />
        <Route path="ar" element={<ARView />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
