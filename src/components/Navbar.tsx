import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { title: "BEAUTY", dropdown: ["Skincare", "Makeup", "Hair"] },
    { title: "WOHLBEFINDEN", dropdown: ["Fitness", "Meditation", "Nutrition"] },
    { title: "GESUNDHEIT", dropdown: ["Doctors", "Pharmacy", "Therapies"] },
    { title: "REVIEWS", dropdown: null },
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-300">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="block md:hidden p-2"
          aria-label="Toggle menu"
        >
          {/* Hamburger icon */}
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
          </div>
        </button>

        <Link to="/" className="font-bold text-2xl tracking-widest">
          NEWS
        </Link>
      </div>

      {/* Center/right: Menu items (hidden on small, flex on md+) */}
      <ul className="hidden md:flex space-x-8">
        {menuItems.map(({ title, dropdown }) => (
          <li key={title} className="relative group cursor-pointer">
            <div className="flex items-center space-x-1">
              <span>{title}</span>
              {dropdown && (
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                </svg>
              )}
            </div>

            {/* Dropdown menu */}
            {dropdown && (
              <ul className="absolute left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity">
                {dropdown.map((item) => (
                  <li
                    key={item}
                    className="px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Right: Search icon */}
      <button
        aria-label="Search"
        className="p-2"
        // You can toggle search input here if you want
      >
        <svg
          className="w-6 h-6 text-black"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;
