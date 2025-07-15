import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NewsTable from "../components/NewsTable";
import type { NewsArticle } from "../type/NewsArticle";
import { fetchSearch } from "../api/newsApi";
import useSearchStore from "../store/searchStore";


const SearchResults: React.FC = () => {
  const addSearch = useSearchStore((state) => state.addSearch);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    addSearch(query);
    setLoading(true);
    setError(null);
    fetchSearch(query)
  .then(setArticles)
  .catch(console.error)
  .finally(() => setLoading(false));
  }, [addSearch, query]);

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && articles.length === 0 && <p>No articles found.</p>}
      {!loading && !error && articles.length > 0 && <NewsTable articles={articles} />}
    </div>
  );
};

export default SearchResults;
