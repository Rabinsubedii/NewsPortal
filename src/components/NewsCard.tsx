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
          className="w-full h-48 object-cover rounded"
        />
      )}

      {/* ✅ Clickable title */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg font-semibold mb-2 hover:underline"
      >
        {title}
      </a>

      <p className="text-sm text-gray-600 mb-2">{description}</p>

      <p className="text-xs text-gray-400 mb-2">
        Source: {source.name} | {new Date(publishedAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default NewsCard;
