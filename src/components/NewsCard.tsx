type NewsCardProps = {
  title: string;
  description: string;
  url: string;
  image: string | null;
  source: { name: string };
  publishedAt: string;
};

const NewsCard = ({
  title,
  description,
  url,
  image,
  source,
  publishedAt,
}: NewsCardProps) => {
  const fallbackImage = "/fallback.jpg"; // Place this in your public/ folder

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col">
      <img
        src={image || fallbackImage}
        alt={title}
        className="w-full h-48 object-cover rounded mb-3"
      />
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <p className="text-xs text-gray-400 mb-2">
        Source: {source.name} | {new Date(publishedAt).toLocaleDateString()}
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto text-blue-600 hover:underline text-sm"
      >
        Read More →
      </a>
    </div>
  );
};

export default NewsCard;
