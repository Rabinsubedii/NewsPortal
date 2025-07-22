import { useState } from "react";

// Predefined list of news categories for filtering
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
  // Callback function to notify parent component about the selected category
  onSelect: (category: string) => void;
}

const CategoryFilter = ({ onSelect }: Props) => {
  // Local state to keep track of the currently active category
  const [active, setActive] = useState("general");

  /**
   * Handles the category selection.
   * Updates the active category and notifies the parent component.
   */
  const handleClick = (cat: string) => {
    setActive(cat);
    onSelect(cat);
  };

  return (
    <div className="overflow-x-auto px-2 my-6">
      {/* Category buttons container */}
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
            {/* Capitalize first letter of category */}
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
