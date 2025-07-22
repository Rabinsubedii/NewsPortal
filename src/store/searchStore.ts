// src/store/useRecentSearches.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Interface representing the shape of our Zustand store state.
 * - recentSearches: Array of last 5 unique search queries.
 * - addSearch: Function to add a new search query (removes duplicates).
 * - clearSearches: Function to clear all recent search queries.
 */
interface RecentSearchesState {
  recentSearches: string[];
  addSearch: (query: string) => void;
  clearSearches: () => void;
}

/**
 * Zustand store for managing recent search queries.
 * - Uses `persist` middleware to save data in localStorage (key: "recentSearches").
 * - Automatically keeps the most recent 5 unique search terms.
 */
export const useRecentSearches = create<RecentSearchesState>()(
  persist(
    (set) => ({
      // Initial empty state
      recentSearches: [],

      // Add a new search term, ensuring uniqueness and max length of 5
      addSearch: (query: string) =>
        set((state) => {
          const updated = [
            query,
            ...state.recentSearches.filter((q) => q !== query),
          ].slice(0, 5);
          return { recentSearches: updated };
        }),

      // Clear all stored searches
      clearSearches: () => set({ recentSearches: [] }),
    }),
    { name: "recentSearches" } // Key used in localStorage
  )
);
