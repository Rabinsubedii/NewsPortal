import { useState } from "react";

const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];  // list of categories

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
    <div className="overflow-x-auto px-2 my-6">
      <div className="flex gap-3 justify-center flex-wrap whitespace-nowrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleClick(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              active === cat
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
