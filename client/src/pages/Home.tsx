import React from 'react';
import { MuseumExperience } from '@/features/home/components/MuseumExperience';
import { FeaturedDestinations } from '@/features/home/components/FeaturedDestinations';
import { JourneyThroughTime } from '@/features/home/components/JourneyThroughTime';

export const Home: React.FC = () => {
  return (
    <div className="w-full space-y-16 sm:space-y-24 pb-20">
      {/* 1. Cinematic Intro Sequence (Museum → Table → Closed Codex → Top-View) */}
      <MuseumExperience />

      {/* 2. Main Homepage Container (After Intro) */}
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        {/* Featured Heritage Destinations (Taj Mahal, Ajanta, Red Fort, Hampi, Konark) */}
        <FeaturedDestinations />

        {/* "A Journey Through Time" Mission & Feature Pillars */}
        <JourneyThroughTime />
      </div>
    </div>
  );
};

export default Home;
