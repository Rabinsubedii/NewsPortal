import { create } from "zustand";

interface SearchState {
  recentSearches: string[];
  addSearch: (query: string) => void;
  clearSearches: () => void;
  initializeSearches: () => void;
}

const useSearchStore = create<SearchState>((set) => ({
  recentSearches: [],

  addSearch: (query) =>
    set((state) => {
      const newList = [query, ...state.recentSearches.filter((q) => q !== query)].slice(0, 5);
      localStorage.setItem("recentSearches", JSON.stringify(newList));
      return { recentSearches: newList };
    }),

  clearSearches: () => {
    localStorage.removeItem("recentSearches");
    set({ recentSearches: [] });
  },

  initializeSearches: () => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      set({ recentSearches: JSON.parse(stored) });
    }
  },
}));

export default useSearchStore;
