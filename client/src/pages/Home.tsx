import React, { useRef } from 'react';
import { CinematicHero } from '@/features/home/components/CinematicHero';
import { DiscoverySection } from '@/features/home/components/DiscoverySection';
import { HeritagePillars } from '@/features/home/components/HeritagePillars';

export const Home: React.FC = () => {
  const discoveryRef = useRef<HTMLDivElement>(null);

  const scrollToDiscovery = () => {
    discoveryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 1. Cinematic Atmospheric Hero with Interactive Historical Book */}
      <CinematicHero onScrollToDiscovery={scrollToDiscovery} />

      {/* 2. Heritage Discovery Gateways (Taj Mahal Flagship & Curated Portals) */}
      <div ref={discoveryRef} className="pt-2">
        <DiscoverySection />
      </div>

      {/* 3. Heritage & Architectural Pillars */}
      <HeritagePillars />
    </div>
  );
};

export default Home;
