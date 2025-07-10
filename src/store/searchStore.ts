import { create } from 'zustand';


interface SearchState {
  recentSearches: string[];
  addSearch: (query: string) => void;
  clearSearches: () => void;
}

const useSearchStore = create<SearchState>((set) => ({
  recentSearches: JSON.parse(localStorage.getItem("recentSearches") || "[]"),
  addSearch: (query) =>
    set((state) => {
      const newList = [query, ...state.recentSearches.filter(q => q !== query)].slice(0, 5);
      localStorage.setItem("recentSearches", JSON.stringify(newList));
      return { recentSearches: newList };
    }),
  clearSearches: () => {
    localStorage.removeItem("recentSearches");
    set({ recentSearches: [] });
  },
}));

export default useSearchStore;
