// src/store/useRecentSearches.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecentSearchesState {
  recentSearches: string[];
  addSearch: (query: string) => void;
  clearSearches: () => void;
}

export const useRecentSearches = create<RecentSearchesState>()(
  persist(
    (set) => ({
      recentSearches: [],
      addSearch: (query: string) =>
        set((state) => {
          const updated = [query, ...state.recentSearches.filter((q) => q !== query)].slice(0, 5);
          return { recentSearches: updated };
        }),
      clearSearches: () => set({ recentSearches: [] }),
    }),
    { name: "recentSearches" }
  )
);
