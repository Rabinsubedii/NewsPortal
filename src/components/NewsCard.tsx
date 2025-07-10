type NewsCardProps = {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  source: { name: string };
  publishedAt: string;
};

const NewsCard = ({
  title,
  description,
  url,
  urlToImage,
  source,
  publishedAt,
}: NewsCardProps) => {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col">
      {urlToImage && (
        <img
            src={urlToImage || "/fallback.jpg"}
            alt={title}
            className="w-full h-48 object-cover rounded" />

      )}
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <p className="text-xs text-gray-400 mb-2">
        Source: {source.name} | {new Date(publishedAt).toLocaleDateString()}
      </p>
      <a
        href={url}
        target="_blank"
        className="mt-auto text-blue-600 hover:underline text-sm"
      >
        Read More →
      </a>
    </div>
  );
};

export default NewsCard;
