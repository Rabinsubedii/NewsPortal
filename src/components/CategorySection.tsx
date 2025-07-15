import type { NewsArticle } from "../type/NewsArticle";

type Props = {
  title: string;
  articles: NewsArticle[];
};

const CategorySection = ({ title, articles }: Props) => {
  if (articles.length === 0) return null;

  // Pick a random featured article
  const randomIndex = Math.floor(Math.random() * articles.length);
  const featured = articles[randomIndex];

  // Show other articles excluding the featured one
  const otherArticles = articles.filter((_, i) => i !== randomIndex).slice(0, 6);

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold mb-6">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Featured News */}
        <div className="md:col-span-1 relative">
          <img
            src={featured.image || "/no-image.jpg"}
            alt={featured.title || "Featured Article"}
            className="rounded mb-3 object-cover w-full h-56"
          />
          <p className="text-xs text-gray-500 uppercase font-semibold">
            {featured.source.name}
          </p>
          <a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-lg mt-1 mb-2 hover:underline block"
          >
            {featured.title}
          </a>
        </div>

        {/* Other News */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {otherArticles.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <img
                src={item.image || "/no-image.jpg"}
                alt={item.title || "Article"}
                className="w-24 h-20 object-cover rounded"
              />
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">
                  {item.source.name}
                </p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-sm leading-snug hover:underline block"
                >
                  {item.title}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
