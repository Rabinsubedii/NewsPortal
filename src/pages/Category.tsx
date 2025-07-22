import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCategoryHeadlines } from "../api/newsApi";
import type { NewsArticle } from "../type/NewsArticle";
import NewsCard from "../components/NewsCard";
import { ClipLoader } from "react-spinners"; // Loader for displaying a loading animation

/**
 * CategoryPage Component
 * - Displays news articles based on the selected category from the URL.
 * - Fetches data from the API using `fetchCategoryHeadlines`.
 * - Shows a loader while fetching and displays results or a "No articles found" message.
 */
const CategoryPage = () => {
  const { category } = useParams(); // Extract category from URL params
  const [articles, setArticles] = useState<NewsArticle[]>([]); // State to hold news articles
  const [loading, setLoading] = useState(true); // Loading state for fetch status

  /**
   * useEffect:
   * - Runs whenever the `category` in the URL changes.
   * - Fetches category-specific news articles from the API.
   */
  useEffect(() => {
    if (!category) return;

    setLoading(true); // Show loader while fetching
    fetchCategoryHeadlines(category)
      .then((data) => {
        setArticles(data); // Update state with fetched articles
        setLoading(false); // Hide loader
      })
      .catch((err) => {
        console.error("Error fetching category news:", err);
        setLoading(false);
      });
  }, [category]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Page title (category-based) */}
      <h1 className="text-2xl font-bold mb-4 capitalize">{category} News</h1>

      {/* Conditional Rendering */}
      {loading ? (
        // Show spinner while loading
        <div className="flex justify-center py-10">
          <ClipLoader color="#2563eb" size={40} />
        </div>
      ) : articles.length === 0 ? (
        // Show message if no articles are found
        <p>No articles found.</p>
      ) : (
        // Render grid of NewsCard components
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <NewsCard key={idx} {...article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
