import { useNavigate } from "react-router-dom";

const trendingTopics = ["AI", "Bitcoin", "NASA", "Climate", "Elections", "Sports"];

const TrendingBadge = () => {
  const navigate = useNavigate();

  const handleClick = (topic: string) => {
    navigate(`/search?q=${encodeURIComponent(topic)}`);
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-2">Trending Topics</h2>
      <div className="flex flex-wrap gap-2">
        {trendingTopics.map((topic) => (
          <button
            key={topic}
            onClick={() => handleClick(topic)}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition"
          >
            #{topic}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrendingBadge;
