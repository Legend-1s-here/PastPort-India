import type { Monument } from '../types/monument';
import { TAJ_MAHAL_DATA } from './tajMahal';

/**
 * Central monument collection.
 *
 * All available monuments are registered here. In P1 only the
 * Taj Mahal exists. Future monuments (e.g. Shaniwar Wada)
 * should be added to this array.
 *
 * When a backend/API is introduced, this file will be replaced
 * by an async data-fetching layer. The component interfaces
 * (which consume Monument[]) will not need to change.
 */
export const MONUMENTS: Monument[] = [TAJ_MAHAL_DATA];

/**
 * Look up a monument by its URL slug.
 * Returns undefined if no monument matches.
 */
export function getMonumentBySlug(slug: string): Monument | undefined {
  return MONUMENTS.find((m) => m.slug === slug);
}

/**
 * Look up a monument by its unique id.
 * Returns undefined if no monument matches.
 */
export function getMonumentById(id: string): Monument | undefined {
  return MONUMENTS.find((m) => m.id === id);
}
