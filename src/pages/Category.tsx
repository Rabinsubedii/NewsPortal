import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCategoryHeadlines } from "../api/newsApi";
import type { NewsArticle } from "../type/NewsArticle";
import NewsCard from "../components/NewsCard";
import { ClipLoader } from "react-spinners";

const CategoryPage = () => {
  const { category } = useParams();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;

    setLoading(true);
    fetchCategoryHeadlines(category)
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [category]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 capitalize">{category} News</h1>

      {loading ? (
         <div className="flex justify-center py-10">
              <ClipLoader color="#2563eb" size={40} />
          </div>
      ) : articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
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
