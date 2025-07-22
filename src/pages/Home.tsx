import { useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard';
import type { NewsArticle } from '../type/NewsArticle'; 
// import TrendingBadge from "../components/TrendingBadge";
import CategoryFilter from "../components/CategoryFilter";
import { fetchCategoryHeadlines } from "../api/newsApi"; 
import CategorySection from "../components/CategorySection";
import { ClipLoader } from "react-spinners";




const Home = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("general");


  useEffect(() => {
    setLoading(true);
     const storedArticles = localStorage.getItem("latestNews");
    if (storedArticles) {
      setArticles(JSON.parse(storedArticles));
    }
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
      {/* Category Filter */}
      <CategoryFilter onSelect={(cat) => setCategory(cat)} />

      <section className="mt-12">
        {/* Category Section with Title */}
        <section className="mt-6">
          <h2 className="text-2xl font-bold mb-2">Featured News</h2>
          <CategorySection title="Technology" articles={articles} />
        </section>

        {/* News Cards Section with Title */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Latest News</h2>

          {loading ? (
            <div className="flex justify-center py-10">
              <ClipLoader color="#2563eb" size={40} />
            </div>
          ) : articles.length === 0 ? (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {articles.map((article, idx) => (
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




