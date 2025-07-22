// Type definition for the NewsCard component props
type NewsCardProps = {
  title: string;             // Title of the news article
  description: string;       // Brief description or summary of the news
  url: string;               // Link to the full news article
  image: string | null;      // Image URL for the article (fallback used if null)
  source: { name: string };  // Source object containing the publisher's name
  publishedAt: string;       // Publication date of the article
};

const NewsCard = ({
  title,
  description,
  url,
  image,
  source,
  publishedAt,
}: NewsCardProps) => {
  const fallbackImage = "/fallback.jpg"; // Default image path if article image is missing

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col">
      {/* Article image */}
      <img
        src={image || fallbackImage}
        alt={title}
        className="w-full h-48 object-cover rounded mb-3"
      />

      {/* Article title */}
      <h2 className="text-lg font-semibold mb-2">{title}</h2>

      {/* Article description */}
      <p className="text-sm text-gray-600 mb-2">{description}</p>

      {/* Source and publication date */}
      <p className="text-xs text-gray-400 mb-2">
        Source: {source.name} | {new Date(publishedAt).toLocaleDateString()}
      </p>

      {/* "Read More" link to the full article */}
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
