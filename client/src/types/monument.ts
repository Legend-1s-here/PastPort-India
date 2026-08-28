import type { ExperienceAvailability } from './experience';

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

/**
 * Historical highlight — a concise notable fact
 * displayed in monument overview sections.
 */
export interface HistoricalHighlight {
  id: string;
  label: string;
  value: string;
}

/**
 * Core monument data type.
 *
 * Every monument in PastPort India conforms to this shape.
 * In P1 the data is static/local. In future phases it can
 * be fetched from a backend or Supabase without changing
 * the component interfaces.
 */
export interface Monument {
  /** Unique identifier. */
  id: string;
  /** URL-friendly slug (used in routes like /monuments/taj-mahal). */
  slug: string;
  /** Display name. */
  name: string;
  /** Alternative/historical names for search. */
  alternateNames: string[];
  /** City, state, country. */
  location: string;
  /** Architectural/historical period label. */
  period: string;
  /** Who commissioned or built it. */
  builtBy: string;
  /** One-sentence summary. */
  shortDescription: string;
  /** Multi-paragraph historical summary. */
  historicalSummary: string;
  /** Longer description (existing field, preserved). */
  fullDescription: string;
  /** Hero image URL or local path. */
  heroImage: string;
  /** Alt text for the hero image. */
  heroImageAlt: string;
  /** Path to the 3D model file (GLB/GLTF). */
  modelUrl: string;
  /** Interactive 3D hotspots on the model. */
  hotspots: Hotspot[];
  /** Chronological timeline events. */
  timeline: TimelineEvent[];
  /** Cultural significance statements. */
  culturalSignificance: string[];
  /** Key historical facts shown in overview cards. */
  historicalHighlights: HistoricalHighlight[];
  /** Which experience modes are available for this monument. */
  experience: ExperienceAvailability;
  /** Catalogue categorization tags for filtering. */
  categories?: ('mughal' | 'maratha' | 'ancient' | 'temple' | 'fort' | 'unesco')[];
  /** Whether the monument is an official UNESCO World Heritage Site. */
  isUnesco?: boolean;
  /** Whether the monument is a flagship interactive experience. */
  isFlagship?: boolean;
}
