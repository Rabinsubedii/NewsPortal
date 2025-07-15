import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Article {
  url: string;
  title: string;
  description: string;
  image?: string;        // GNews uses 'image' for article image
  publishedAt?: string;
}

const API_KEY = import.meta.env.VITE_NEWS_API_KEY; // use env variable
const BASE_URL = "https://gnews.io/api/v4";

const RECENT_SEARCHES_KEY = "recentSearches";

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setSearchResults([]);
      setError(null);
      setLoading(false);
      setHasSearched(false);
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    // Load recent searches from localStorage
    const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (saved) setRecentSearches(JSON.parse(saved));

    fetchDefaultTopHeadlines();

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const saveSearch = (query: string) => {
    setRecentSearches((prev) => {
      // Remove duplicates and limit to 5
      const filtered = [query, ...prev.filter((q) => q !== query)].slice(0, 5);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(filtered));
      return filtered;
    });
  };

  const clearRecentSearches = () => {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
    setRecentSearches([]);
  };

  const fetchDefaultTopHeadlines = async () => {
    setLoading(true);
    setError(null);
    try {
      // GNews top headlines endpoint
      // max=5 for top 5 headlines, lang=en, country=us
      const url = `${BASE_URL}/top-headlines?lang=en&country=us&max=5&apikey=${API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch top headlines");
      const data = await response.json();

      // GNews returns articles in 'articles' array
      setSearchResults(data.articles || []);
    } catch {
      setError("Failed to load top headlines.");
    } finally {
      setLoading(false);
    }
  };

  const performSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    setSearchResults([]);
    setHasSearched(true);
    saveSearch(query);

    try {
      // GNews search endpoint: use 'q' param
      // max=30 for max 30 articles, lang=en
      const url = `${BASE_URL}/search?q=${encodeURIComponent(query)}&max=30&lang=en&apikey=${API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch search results");
      const data = await response.json();

      // Filter articles to those with title including query (case-insensitive)
      const filtered = (data.articles || []).filter((article: Article) =>
        article.title?.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(filtered);
    } catch {
      setError("Failed to fetch results");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 backdrop-blur-md z-10"
        style={{ backgroundColor: "rgba(0,0,0,0.57)" }}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 flex items-center justify-center px-6 z-50"
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-[80vh] p-8 flex flex-col overflow-hidden"
          style={{ minHeight: "500px" }}
        >
          <Formik
            initialValues={{ query: "" }}
            validationSchema={Yup.object({
              query: Yup.string()
                .required("Search cannot be empty")
                .matches(/^[a-zA-Z0-9\s]+$/, "Only alphanumeric characters allowed"),
            })}
            onSubmit={(values) => {
              performSearch(values.query);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  name="query"
                  type="text"
                  autoFocus
                  placeholder="Search articles, topics..."
                  className={`w-full px-6 py-4 pr-14 rounded-md text-lg placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500 transition border border-gray-300 ${
                    errors.query && touched.query ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="query"
                  component="div"
                  className="text-red-500 mt-2 ml-2 text-sm"
                />
              </Form>
            )}
          </Formik>

          {!hasSearched && recentSearches.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold text-gray-800 mb-2">Recent Searches</h3>
              <div className="flex gap-2 flex-wrap">
                {recentSearches.map((query, idx) => (
                  <button
                    key={idx}
                    onClick={() => performSearch(query)}
                    className="bg-gray-200 text-sm px-3 py-1 rounded-full hover:bg-gray-300 transition"
                  >
                    {query}
                  </button>
                ))}
                <button
                  onClick={clearRecentSearches}
                  className="text-red-500 text-sm underline ml-2"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 overflow-y-auto flex-grow border-t border-gray-300 pt-4">
            {loading && (
              <p className="text-center text-blue-600 font-semibold">Loading...</p>
            )}

            {error && (
              <p className="text-center text-red-600 font-semibold">{error}</p>
            )}

            {!loading && !error && (
              <>
                {searchResults.length === 0 && hasSearched && (
                  <div className="text-center mt-10 text-gray-600 text-lg font-medium">
                    No articles found. Try a different keyword.
                  </div>
                )}

                {searchResults.length > 0 && (
                  <>
                    {!hasSearched && (
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Top Articles for You
                      </h2>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                      {searchResults.map((article, idx) => (
                        <a
                          key={article.url || idx}
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 cursor-pointer"
                        >
                          {article.image && (
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-40 object-cover rounded-md mb-3"
                            />
                          )}
                          <h3 className="font-semibold text-lg mb-1">{article.title}</h3>
                          <p className="text-gray-600 text-sm line-clamp-3">
                            {article.description}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {article.publishedAt
                              ? new Date(article.publishedAt).toLocaleDateString()
                              : ""}
                          </p>
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-8 py-3 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

const SearchBar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-3">
        <button
          aria-label="Open search"
          onClick={() => setSearchOpen(true)}
          className="p-2 text-gray-700 hover:text-blue-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </nav>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default SearchBar;
