import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import type { NewsArticle } from "../type/NewsArticle";
import CategoryFilter from "../components/CategoryFilter";
import { fetchCategoryHeadlines } from "../api/newsApi";
import CategorySection from "../components/CategorySection";
import { ClipLoader } from "react-spinners";

/**
 * Home Component
 * - Serves as the main landing page of the app.
 * - Fetches and displays the latest news based on the selected category.
 * - Displays featured news and latest news sections.
 */
const Home = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]); // State to store fetched news articles
  const [loading, setLoading] = useState(true); // Loading state for API calls
  const [category, setCategory] = useState("general"); // Current selected category

  /**
   * useEffect:
   * - Runs whenever `category` changes.
   * - Loads cached news from localStorage (if available).
   * - Fetches fresh category headlines using `fetchCategoryHeadlines`.
   */
  useEffect(() => {
    setLoading(true);

    // Load cached articles from localStorage if any
    const storedArticles = localStorage.getItem("latestNews");
    if (storedArticles) {
      setArticles(JSON.parse(storedArticles));
    }

    // Fetch fresh news data for the selected category
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

  /**
   * Helper function to determine how many articles to display
   * - Show 12 articles if available
   * - Otherwise, show exactly 9 articles if available
   * - Otherwise, show all available articles (less than 9)
   */
  const getDisplayedArticles = (articles: NewsArticle[]) => {
    if (articles.length >= 12) return articles.slice(0, 12);
    if (articles.length >= 9) return articles.slice(0, 9);
    return articles; // less than 9, show all
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Category filter to allow switching between categories */}
      <CategoryFilter onSelect={(cat) => setCategory(cat)} />

      <section className="mt-12">
        {/* Featured News Section */}
        <section className="mt-6">
          <h2 className="text-2xl font-bold mb-2">Featured News</h2>
          <CategorySection title="Technology" articles={articles} />
        </section>

        {/* Latest News Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Latest News</h2>

          {loading ? (
            // Show loading spinner while fetching data
            <div className="flex justify-center py-10">
              <ClipLoader color="#2563eb" size={40} />
            </div>
          ) : articles.length === 0 ? (
            // Show "No News Found" message if no articles are available
            <div className="mt-10 flex flex-col items-center justify-center bg-gray-100 p-8 rounded-lg shadow-inner text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 10l-5 5-5-5"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700">
                No News Found
              </h3>
              <p className="text-gray-500 mt-2">
                Try changing the category or check back later.
              </p>
            </div>
          ) : (
            // Render a grid of news articles limited by getDisplayedArticles
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {getDisplayedArticles(articles).map((article, idx) => (
                <NewsCard key={idx} {...article} />
              ))}
            </div>
          )}
        </section>
      </section>
    </div>
  );
};

export default Home;
