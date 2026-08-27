export interface Hotspot {
  id: string;
  title: string;
  position: [number, number, number];
  description: string;
  sourceIds: string[];
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  sourceIds: string[];
}

export interface Monument {
  id: string;
  name: string;
  alternateNames: string[];
  location: string;
  period: string;
  builtBy: string;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  modelUrl: string;
  hotspots: Hotspot[];
  timeline: TimelineEvent[];
  culturalSignificance: string[];
}
