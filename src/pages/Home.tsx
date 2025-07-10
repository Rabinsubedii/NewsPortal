import { useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard';
import type { NewsArticle } from '../type/NewsArticle';
import { Link } from 'react-router-dom';
import useSearchStore from '../store/searchStore'; 
import TrendingBadge from "../components/TrendingBadge";
import CategoryFilter from "../components/CategoryFilter";
import { fetchCategoryHeadlines } from "../api/newsApi"; 

const Home = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("general");

  const recentSearches = useSearchStore((state) => state.recentSearches);

  useEffect(() => {
    setLoading(true);
    fetchCategoryHeadlines(category)
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching headlines:", err);
        setLoading(false);
      });
  }, [category]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {/* Top Headlines — {category.charAt(0).toUpperCase() + category.slice(1)} */}
      </h1>

      {/* <SearchBar /> */}

      {/* Category Filter */}
      <CategoryFilter onSelect={(cat) => setCategory(cat)} />

      {/* Trending Topics */}
      <TrendingBadge />

      {/* News Cards */}
      {loading ? (
        <p className="mt-4">Loading news...</p>
      ) : articles.length === 0 ? (
        <p className="mt-4">No news articles found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {articles.map((article, idx) => (
            <NewsCard key={idx} {...article} />
          ))}
        </div>
      )}

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="bg-white p-4 rounded shadow mt-10">
          <h2 className="text-xl font-semibold mb-2">Recent Searches</h2>
          <ul className="list-disc list-inside space-y-1">
            {recentSearches.map((query) => (
              <li key={query}>
                <Link
                  to={`/search?q=${encodeURIComponent(query)}`}
                  className="text-blue-600 hover:underline"
                >
                  {query}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;