import type { NewsArticle } from "../type/NewsArticle";

type Props = {
  title: string;
  articles: NewsArticle[];
};

const CategorySection = ({ articles }: Props) => {
  if (articles.length === 0) return null;

  const [main, ...rest] = articles;

  return (
    <section className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left big card */}
        <div className="md:col-span-1">
          <img
            src={main.urlToImage || "/no-image.jpg"}
            alt={main.title}
            className="rounded mb-3 object-cover w-full h-52"
          />
          <p className="text-xs text-gray-500 uppercase font-semibold">
            {main.source.name}
          </p>
          <a
            href={main.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-lg mt-1 mb-2 hover:underline block"
          >
            {main.title}
          </a>
        </div>

        {/* Right smaller list */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rest.slice(0, 6).map((item, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <img
                src={item.urlToImage || "/no-image.jpg"}
                alt={item.title}
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
