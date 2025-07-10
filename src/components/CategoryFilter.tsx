import { useState } from "react";

const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

interface Props {
  onSelect: (category: string) => void;
}

const CategoryFilter = ({ onSelect }: Props) => {
  const [active, setActive] = useState("general");

  const handleClick = (cat: string) => {
    setActive(cat);
    onSelect(cat);
  };

  return (
    <div className="flex flex-wrap gap-2 my-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          className={`px-3 py-1 rounded-full text-sm ${
            active === cat
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
